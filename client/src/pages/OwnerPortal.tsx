import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { ScheduleEntry, MenuItem } from "../lib/api";
import {
  fetchOwnerProfile,
  getStoredOwnerToken,
  loginOwner,
  setStoredOwnerToken,
  updateTruckHours,
  updateTruckDescription,
  fetchTruckForOwner,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  fetchTruckStatusUpdates,
  fetchTruckMenuReviews,
  flagStatusUpdate,
  flagMenuReview,
} from "../lib/api";
import { supabase } from "../lib/supabaseClient";

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
  
  // Description editing
  const [descriptionDraft, setDescriptionDraft] = useState("");
  const [savingDescription, setSavingDescription] = useState(false);
  const [descriptionError, setDescriptionError] = useState<string | null>(null);
  
  // Menu item editing
  const [editingMenuItemId, setEditingMenuItemId] = useState<string | null>(null);
  const [menuItemDraft, setMenuItemDraft] = useState({ name: "", description: "", priceCents: "", isFeatured: false });
  const [savingMenuItem, setSavingMenuItem] = useState(false);
  const [menuItemError, setMenuItemError] = useState<string | null>(null);
  const [showAddMenuItem, setShowAddMenuItem] = useState(false);
  
  // Flagging
  const [showFlaggingSection, setShowFlaggingSection] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState<any[]>([]);
  const [menuReviews, setMenuReviews] = useState<any[]>([]);
  const [loadingFlags, setLoadingFlags] = useState(false);

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

  const {
    data: currentTruck,
    isLoading: truckLoading,
    refetch: refetchTruck,
  } = useQuery({
    queryKey: ["truck-for-owner", editingTruckId],
    queryFn: () => editingTruckId ? fetchTruckForOwner(editingTruckId) : null,
    enabled: Boolean(editingTruckId),
  });

  const ownerTrucks = ownerProfile?.trucks ?? [];
  const isOwnerAuthenticated = Boolean(ownerToken);

  const handleOwnerLogout = useCallback(() => {
    setStoredOwnerToken(null);
    setOwnerToken(null);
    setEditingTruckId(null);
    setHoursDraft(createEmptyHours());
    setDescriptionDraft("");
    setEditingMenuItemId(null);
    setShowAddMenuItem(false);
    queryClient.removeQueries({ queryKey: ["owner-profile"] });
    queryClient.removeQueries({ queryKey: ["truck-for-owner"] });
    supabase.auth.signOut();
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
      setDescriptionDraft("");
      return;
    }
    const current = ownerTrucks.find((truck) => truck.id === editingTruckId);
    if (current) {
      setHoursDraft(draftFromSchedule(current.typicalSchedule));
    }
  }, [editingTruckId, ownerTrucks]);

  useEffect(() => {
    if (currentTruck) {
      setDescriptionDraft(currentTruck.description || "");
    }
  }, [currentTruck]);

  useEffect(() => {
    if (feedback) {
      const timeout = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  useEffect(() => {
    const channel = supabase
      .channel("owner-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "FoodTruck" }, () => {
        queryClient.invalidateQueries({ queryKey: ["owner-profile"] });
        queryClient.invalidateQueries({ queryKey: ["truck-for-owner"] });
        queryClient.invalidateQueries({ queryKey: ["trucks"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "MenuItem" }, () => {
        queryClient.invalidateQueries({ queryKey: ["truck-for-owner"] });
        queryClient.invalidateQueries({ queryKey: ["trucks"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "StatusUpdate" }, () => {
        queryClient.invalidateQueries({ queryKey: ["trucks"] });
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "MenuReview" }, () => {
        if (editingTruckId) {
          queryClient.invalidateQueries({ queryKey: ["truck-for-owner"] });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [editingTruckId, queryClient]);

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
      setLoginError(err instanceof Error ? err.message : "Unable to sign in. Please try again.");
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
      setFeedback("Hours updated successfully.");
      await Promise.all([refetchOwnerProfile(), refetchTruck(), queryClient.invalidateQueries({ queryKey: ["trucks"] })]);
    } catch (err) {
      setHoursError(err instanceof Error ? err.message : "Couldn't save hours. Please try again.");
    } finally {
      setSavingHours(false);
    }
  };

  const handleDescriptionSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingTruckId) return;
    setDescriptionError(null);
    setSavingDescription(true);
    try {
      await updateTruckDescription(editingTruckId, descriptionDraft);
      setFeedback("Description updated successfully.");
      await Promise.all([refetchTruck(), queryClient.invalidateQueries({ queryKey: ["trucks"] })]);
    } catch (err) {
      setDescriptionError(err instanceof Error ? err.message : "Couldn't save description. Please try again.");
    } finally {
      setSavingDescription(false);
    }
  };

  const handleMenuItemEdit = (item: MenuItem) => {
    setEditingMenuItemId(item.id);
    setMenuItemDraft({
      name: item.name,
      description: item.description || "",
      priceCents: item.priceCents ? (item.priceCents / 100).toFixed(2) : "",
      isFeatured: item.isFeatured,
    });
    setShowAddMenuItem(false);
  };

  const handleMenuItemCancel = () => {
    setEditingMenuItemId(null);
    setMenuItemDraft({ name: "", description: "", priceCents: "", isFeatured: false });
    setShowAddMenuItem(false);
  };

  const handleMenuItemSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingTruckId) return;
    setMenuItemError(null);
    setSavingMenuItem(true);
    try {
      const priceCents = menuItemDraft.priceCents ? Math.round(parseFloat(menuItemDraft.priceCents) * 100) : undefined;
      
      if (editingMenuItemId) {
        // Update existing
        await updateMenuItem(editingMenuItemId, {
          name: menuItemDraft.name,
          description: menuItemDraft.description || undefined,
          priceCents,
          isFeatured: menuItemDraft.isFeatured,
        });
        setFeedback("Menu item updated successfully.");
      } else {
        // Create new
        await createMenuItem(editingTruckId, {
          name: menuItemDraft.name,
          description: menuItemDraft.description || undefined,
          priceCents,
          isFeatured: menuItemDraft.isFeatured,
        });
        setFeedback("Menu item added successfully.");
      }
      await Promise.all([refetchTruck(), queryClient.invalidateQueries({ queryKey: ["trucks"] })]);
      handleMenuItemCancel();
    } catch (err) {
      setMenuItemError(err instanceof Error ? err.message : "Couldn't save menu item. Please try again.");
    } finally {
      setSavingMenuItem(false);
    }
  };

  const handleMenuItemDelete = async (itemId: string) => {
    if (!confirm("Are you sure you want to delete this menu item?")) return;
    try {
      await deleteMenuItem(itemId);
      setFeedback("Menu item deleted successfully.");
      await Promise.all([refetchTruck(), queryClient.invalidateQueries({ queryKey: ["trucks"] })]);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : "Couldn't delete menu item.");
    }
  };

  return (
    <div className="owner-page">
      <header className="owner-header">
        <div>
          <p className="eyebrow owner-eyebrow">Owner Portal</p>
          <h1>StreetEats</h1>
          <p className="subtitle">Manage your food truck</p>
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
            <h3>Manage your truck</h3>
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

                {editingTruckId && (
                  <>
                    {/* Description Section */}
                    <div className="owner-section">
                      <h4 className="owner-section-title">Truck Description</h4>
                      <form onSubmit={handleDescriptionSubmit}>
                        <textarea
                          value={descriptionDraft}
                          onChange={(e) => setDescriptionDraft(e.target.value)}
                          placeholder="Describe your food truck..."
                          rows={4}
                          style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                        />
                        {descriptionError && <p className="error-inline">{descriptionError}</p>}
                        <button type="submit" className="submit-button" disabled={savingDescription}>
                          {savingDescription ? "Saving..." : "Save Description"}
                        </button>
                      </form>
                    </div>

                    {/* Menu Items Section */}
                    <div className="owner-section">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h4 className="owner-section-title">Menu Items</h4>
                        {!showAddMenuItem && !editingMenuItemId && (
                          <button
                            type="button"
                            className="cta-button"
                            onClick={() => {
                              setShowAddMenuItem(true);
                              setEditingMenuItemId(null);
                              setMenuItemDraft({ name: "", description: "", priceCents: "", isFeatured: false });
                            }}
                          >
                            + Add Item
                          </button>
                        )}
                      </div>

                      {(showAddMenuItem || editingMenuItemId) && (
                        <form onSubmit={handleMenuItemSubmit} style={{ marginBottom: "1rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "4px" }}>
                          <label className="form-label">Item Name</label>
                          <input
                            type="text"
                            value={menuItemDraft.name}
                            onChange={(e) => setMenuItemDraft({ ...menuItemDraft, name: e.target.value })}
                            required
                            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                          />
                          <label className="form-label">Description (optional)</label>
                          <textarea
                            value={menuItemDraft.description}
                            onChange={(e) => setMenuItemDraft({ ...menuItemDraft, description: e.target.value })}
                            rows={2}
                            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                          />
                          <label className="form-label">Price ($)</label>
                          <input
                            type="number"
                            step="0.01"
                            min="0"
                            value={menuItemDraft.priceCents}
                            onChange={(e) => setMenuItemDraft({ ...menuItemDraft, priceCents: e.target.value })}
                            style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
                          />
                          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
                            <input
                              type="checkbox"
                              checked={menuItemDraft.isFeatured}
                              onChange={(e) => setMenuItemDraft({ ...menuItemDraft, isFeatured: e.target.checked })}
                            />
                            Featured item
                          </label>
                          {menuItemError && <p className="error-inline">{menuItemError}</p>}
                          <div style={{ display: "flex", gap: "0.5rem" }}>
                            <button type="submit" className="submit-button" disabled={savingMenuItem}>
                              {savingMenuItem ? "Saving..." : editingMenuItemId ? "Update Item" : "Add Item"}
                            </button>
                            <button type="button" className="cta-button ghost" onClick={handleMenuItemCancel}>
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}

                      {truckLoading && <p>Loading menu items...</p>}
                      {!truckLoading && currentTruck && (
                        <div>
                          {currentTruck.menuItems.length === 0 ? (
                            <p>No menu items yet. Add your first item above.</p>
                          ) : (
                            <ul style={{ listStyle: "none", padding: 0 }}>
                              {currentTruck.menuItems.map((item) => (
                                <li
                                  key={item.id}
                                  style={{
                                    padding: "1rem",
                                    marginBottom: "0.5rem",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                      <strong>{item.name}</strong>
                                      {item.isFeatured && <span style={{ fontSize: "0.75rem", background: "#ffd700", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>Featured</span>}
                                    </div>
                                    {item.description && <p style={{ margin: "0.25rem 0", color: "#666" }}>{item.description}</p>}
                                    {item.priceCents && (
                                      <p style={{ margin: "0.25rem 0", fontWeight: "bold" }}>
                                        ${(item.priceCents / 100).toFixed(2)}
                                      </p>
                                    )}
                                  </div>
                                  <div style={{ display: "flex", gap: "0.5rem" }}>
                                    <button
                                      type="button"
                                      className="cta-button ghost"
                                      onClick={() => handleMenuItemEdit(item)}
                                      disabled={editingMenuItemId !== null || showAddMenuItem}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      type="button"
                                      className="cta-button ghost"
                                      onClick={() => handleMenuItemDelete(item.id)}
                                      disabled={editingMenuItemId !== null || showAddMenuItem}
                                      style={{ color: "#d32f2f" }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Flagging Section */}
                    <div className="owner-section">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <h4 className="owner-section-title">User Posts & Flagging</h4>
                        <button
                          type="button"
                          className="cta-button"
                          onClick={async () => {
                            if (!showFlaggingSection) {
                              setLoadingFlags(true);
                              try {
                                const token = getStoredOwnerToken();
                                if (token && editingTruckId) {
                                  const [updates, reviews] = await Promise.all([
                                    fetchTruckStatusUpdates(editingTruckId),
                                    fetchTruckMenuReviews(editingTruckId),
                                  ]);
                                  setStatusUpdates(updates);
                                  setMenuReviews(reviews);
                                  setShowFlaggingSection(true);
                                }
                              } catch (err) {
                                setFeedback(err instanceof Error ? err.message : "Couldn't load posts.");
                              } finally {
                                setLoadingFlags(false);
                              }
                            } else {
                              setShowFlaggingSection(false);
                            }
                          }}
                        >
                          {loadingFlags ? "Loading..." : showFlaggingSection ? "Hide Posts" : "View User Posts"}
                        </button>
                      </div>

                      {showFlaggingSection && (
                        <div>
                          <h5 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>Status Updates</h5>
                          {statusUpdates.length === 0 ? (
                            <p>No user status updates yet.</p>
                          ) : (
                            <ul style={{ listStyle: "none", padding: 0 }}>
                              {statusUpdates.map((update) => (
                                <li
                                  key={update.id}
                                  style={{
                                    padding: "0.75rem",
                                    marginBottom: "0.5rem",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    opacity: update.isFlagged ? 0.5 : 1,
                                  }}
                                >
                                  <div>
                                    <strong>{update.status}</strong>
                                    {update.note && <p style={{ margin: "0.25rem 0" }}>{update.note}</p>}
                                    {update.reporterName && <p style={{ fontSize: "0.85rem", color: "#666" }}>by {update.reporterName}</p>}
                                    <p style={{ fontSize: "0.75rem", color: "#999" }}>
                                      {new Date(update.createdAt).toLocaleString()}
                                    </p>
                                    {update.isFlagged && <span style={{ color: "#d32f2f" }}>⚠️ Flagged</span>}
                                  </div>
                                  {!update.isFlagged && (
                                    <button
                                      type="button"
                                      className="cta-button ghost"
                                      onClick={async () => {
                                        if (confirm("Flag this update as incorrect? This will give the user a strike.")) {
                                          try {
                                            await flagStatusUpdate(update.id);
                                            setFeedback("Update flagged. User strike count increased.");
                                            const updates = await fetchTruckStatusUpdates(editingTruckId!);
                                            setStatusUpdates(updates);
                                            await refetchTruck();
                                            queryClient.invalidateQueries({ queryKey: ["trucks"] });
                                          } catch (err) {
                                            setFeedback(err instanceof Error ? err.message : "Couldn't flag update.");
                                          }
                                        }
                                      }}
                                      style={{ color: "#d32f2f" }}
                                    >
                                      Flag
                                    </button>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}

                          <h5 style={{ marginTop: "1.5rem", marginBottom: "0.5rem" }}>Menu Reviews</h5>
                          {menuReviews.length === 0 ? (
                            <p>No user reviews yet.</p>
                          ) : (
                            <ul style={{ listStyle: "none", padding: 0 }}>
                              {menuReviews.map((review) => (
                                <li
                                  key={review.id}
                                  style={{
                                    padding: "0.75rem",
                                    marginBottom: "0.5rem",
                                    border: "1px solid #ddd",
                                    borderRadius: "4px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    opacity: review.isFlagged ? 0.5 : 1,
                                  }}
                                >
                                  <div>
                                    <strong>⭐ {review.rating}/5</strong>
                                    {review.comment && <p style={{ margin: "0.25rem 0" }}>{review.comment}</p>}
                                    {review.reporterName && <p style={{ fontSize: "0.85rem", color: "#666" }}>by {review.reporterName}</p>}
                                    <p style={{ fontSize: "0.75rem", color: "#999" }}>
                                      {new Date(review.createdAt).toLocaleString()}
                                    </p>
                                    {review.isFlagged && <span style={{ color: "#d32f2f" }}>⚠️ Flagged</span>}
                                  </div>
                                  {!review.isFlagged && (
                                    <button
                                      type="button"
                                      className="cta-button ghost"
                                      onClick={async () => {
                                        if (confirm("Flag this review as incorrect? This will give the user a strike.")) {
                                          try {
                                            await flagMenuReview(review.id);
                                            setFeedback("Review flagged. User strike count increased.");
                                            const reviews = await fetchTruckMenuReviews(editingTruckId!);
                                            setMenuReviews(reviews);
                                            await refetchTruck();
                                            queryClient.invalidateQueries({ queryKey: ["trucks"] });
                                          } catch (err) {
                                            setFeedback(err instanceof Error ? err.message : "Couldn't flag review.");
                                          }
                                        }
                                      }}
                                      style={{ color: "#d32f2f" }}
                                    >
                                      Flag
                                    </button>
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Hours Section */}
                    <div className="owner-section">
                      <h4 className="owner-section-title">Operating Hours</h4>
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
                          {savingHours ? "Saving..." : "Save Hours"}
                        </button>
                      </form>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
