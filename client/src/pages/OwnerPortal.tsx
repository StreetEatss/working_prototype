import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import type { ScheduleEntry } from "../lib/api";
import {
  fetchOwnerProfile,
  getStoredOwnerToken,
  loginOwner,
  setStoredOwnerToken,
  updateTruckHours,
} from "../lib/api";

const ownerDays: ScheduleEntry["day"][] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

type HoursDraft = Record<ScheduleEntry["day"], { open: string; close: string }>;

const createEmptyHours = (): HoursDraft =>
  ownerDays.reduce((acc, day) => {
    acc[day] = { open: "", close: "" };
    return acc;
  }, {} as HoursDraft);

const draftFromSchedule = (schedule?: ScheduleEntry[] | null): HoursDraft => {
  const base = createEmptyHours();
  if (!schedule) return base;
  schedule.forEach((entry) => {
    if (ownerDays.includes(entry.day)) {
      base[entry.day] = {
        open: entry.open ?? "",
        close: entry.close ?? "",
      };
    }
  });
  return base;
};

export default function OwnerPortalPage() {
  const queryClient = useQueryClient();
  const [ownerToken, setOwnerToken] = useState<string | null>(() => getStoredOwnerToken());
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [hoursDraft, setHoursDraft] = useState<HoursDraft>(createEmptyHours());
  const [editingTruckId, setEditingTruckId] = useState<string | null>(null);
  const [savingHours, setSavingHours] = useState(false);
  const [hoursError, setHoursError] = useState<string | null>(null);

  const {
    data: ownerProfile,
    isLoading: ownerLoading,
    error: ownerError,
    refetch: refetchOwnerProfile,
  } = useQuery({
    queryKey: ["owner-profile", ownerToken],
    queryFn: fetchOwnerProfile,
    enabled: Boolean(ownerToken),
  });

  const ownerTrucks = ownerProfile?.trucks ?? [];
  const isOwnerAuthenticated = Boolean(ownerToken);

  const handleOwnerLogout = useCallback(() => {
    setStoredOwnerToken(null);
    setOwnerToken(null);
    setEditingTruckId(null);
    setHoursDraft(createEmptyHours());
    queryClient.removeQueries({ queryKey: ["owner-profile"] });
  }, [queryClient]);

  useEffect(() => {
    if (!ownerTrucks.length) {
      setEditingTruckId(null);
      return;
    }
    setEditingTruckId((prev) => {
      if (prev && ownerTrucks.some((truck) => truck.id === prev)) {
        return prev;
      }
      return ownerTrucks[0].id;
    });
  }, [ownerTrucks]);

  useEffect(() => {
    if (!editingTruckId) {
      setHoursDraft(createEmptyHours());
      return;
    }
    const current = ownerTrucks.find((truck) => truck.id === editingTruckId);
    if (current) {
      setHoursDraft(draftFromSchedule(current.typicalSchedule));
    }
  }, [editingTruckId, ownerTrucks]);

  useEffect(() => {
    if (ownerError && isAxiosError(ownerError) && ownerError.response?.status === 401) {
      setFeedback("Session expired. Please sign in again.");
      handleOwnerLogout();
    }
  }, [ownerError, handleOwnerLogout]);

  useEffect(() => {
    if (feedback) {
      const timeout = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  const handleOwnerLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    setLoggingIn(true);
    try {
      const response = await loginOwner({ email: loginEmail, password: loginPassword });
      setStoredOwnerToken(response.token);
      setOwnerToken(response.token);
      setFeedback(`Signed in as ${response.owner.name ?? response.owner.email}`);
      setLoginPassword("");
      await refetchOwnerProfile();
    } catch (err) {
      if (isAxiosError(err)) {
        setLoginError(err.response?.data?.message ?? "Unable to sign in. Please try again.");
      } else {
        setLoginError("Something went wrong. Please try again.");
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleHoursChange = (day: ScheduleEntry["day"], field: "open" | "close", value: string) => {
    setHoursDraft((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));
  };

  const handleHoursSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingTruckId) return;
    setHoursError(null);
    setSavingHours(true);
    try {
      const schedulePayload = ownerDays
        .map((day) => {
          const { open, close } = hoursDraft[day];
          if (!open || !close) {
            return null;
          }
          return { day, open, close };
        })
        .filter(Boolean) as Array<Pick<ScheduleEntry, "day" | "open" | "close">>;

      await updateTruckHours(editingTruckId, schedulePayload);
      setFeedback("Hours updated. Your card will refresh shortly.");
      await Promise.all([refetchOwnerProfile(), queryClient.invalidateQueries({ queryKey: ["trucks"] })]);
    } catch (err) {
      if (isAxiosError(err)) {
        setHoursError(err.response?.data?.message ?? "Couldn't save hours. Please try again.");
      } else {
        setHoursError("Couldn't save hours. Please try again.");
      }
    } finally {
      setSavingHours(false);
    }
  };

  return (
    <div className="owner-page">
      <header className="owner-header">
        <div>
          <p className="eyebrow owner-eyebrow">Owner Portal</p>
          <h1>StreetEats</h1>
          <p className="subtitle">Update your truck hours anytime</p>
        </div>
        <Link to="/" className="owner-link-button ghost-button">
          ← Back to map
        </Link>
      </header>

      {feedback && <div className="toast">{feedback}</div>}

      <section className="owner-console owner-page-panel">
        <div className="owner-console-head">
          <div>
            <p className="eyebrow owner-eyebrow">Owner Tools</p>
            <h3>Manage your truck hours</h3>
          </div>
          {isOwnerAuthenticated && (
            <button className="cta-button ghost" onClick={handleOwnerLogout}>
              Sign out
            </button>
          )}
        </div>

        {!isOwnerAuthenticated && (
          <form className="owner-form" onSubmit={handleOwnerLogin}>
            <label className="form-label" htmlFor="owner-email">
              Owner email
            </label>
            <input
              id="owner-email"
              type="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              placeholder="owner@truck.com"
              required
            />
            <label className="form-label" htmlFor="owner-password">
              Password
            </label>
            <input
              id="owner-password"
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              placeholder="••••••••"
              required
            />
            {loginError && <p className="error-inline">{loginError}</p>}
            <button type="submit" className="submit-button" disabled={loggingIn}>
              {loggingIn ? "Signing in..." : "Sign in"}
            </button>
          </form>
        )}

        {isOwnerAuthenticated && (
          <div className="owner-panel">
            {ownerLoading && <p>Loading your trucks...</p>}
            {!ownerLoading && ownerTrucks.length === 0 && <p>You don't have any trucks yet. Contact StreetEats to link one.</p>}
            {ownerError && !ownerLoading && <p className="error-inline">Couldn't load your trucks. Try refreshing.</p>}

            {!ownerLoading && ownerTrucks.length > 0 && (
              <>
                <label className="form-label" htmlFor="owner-truck-select">
                  Select truck
                </label>
                <select
                  id="owner-truck-select"
                  value={editingTruckId ?? ""}
                  onChange={(event) => setEditingTruckId(event.target.value || null)}
                >
                  {ownerTrucks.map((truck) => (
                    <option key={truck.id} value={truck.id}>
                      {truck.name}
                    </option>
                  ))}
                </select>

                <form className="hours-form" onSubmit={handleHoursSubmit}>
                  <div className="hours-grid">
                    {ownerDays.map((day) => (
                      <div key={day} className="hours-row">
                        <span className="hours-day">{day.slice(0, 3)}</span>
                        <input
                          type="time"
                          value={hoursDraft[day].open}
                          onChange={(event) => handleHoursChange(day, "open", event.target.value)}
                        />
                        <span className="hours-divider">–</span>
                        <input
                          type="time"
                          value={hoursDraft[day].close}
                          onChange={(event) => handleHoursChange(day, "close", event.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                  {hoursError && <p className="error-inline">{hoursError}</p>}
                  <button type="submit" className="submit-button" disabled={savingHours}>
                    {savingHours ? "Saving..." : "Save hours"}
                  </button>
                </form>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}


