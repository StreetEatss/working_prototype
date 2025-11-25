import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useQuery } from "@tanstack/react-query";
import L from "leaflet";
import type { FoodTruck } from "../lib/api";
import { fetchTrucks, postMenuReview, postStatusUpdate } from "../lib/api";

const statusCopy: Record<string, string> = {
  OPEN: "Open now",
  CLOSED: "Closed",
  MOVED: "Moved",
  UNKNOWN: "Status unknown",
};

const defaultCenter: [number, number] = [39.9522, -75.1932];

function getTruckBadgeLabel(name: string) {
  const safeName = name?.replace(/[^a-z0-9 ]/gi, " ").trim() ?? "";
  if (!safeName) return "FT";
  const words = safeName.split(/\s+/).filter(Boolean);
  if (words.length === 0) return "FT";
  if (words.length === 1) {
    return words[0].slice(0, 2).toUpperCase() || "FT";
  }
  const label = `${words[0][0] ?? ""}${words[1][0] ?? ""}`.toUpperCase();
  return label || "FT";
}

function createTruckIcon(label: string, isActive: boolean) {
  return L.divIcon({
    className: `truck-marker${isActive ? " truck-marker-active" : ""}`,
    html: `<span class="truck-marker-inner">${label}</span>`,
    iconSize: [44, 54],
    iconAnchor: [22, 50],
    popupAnchor: [0, -42],
  });
}

function formatCurrency(value?: number | null) {
  if (!value && value !== 0) return "";
  return `$${(value / 100).toFixed(2)}`;
}

function getMapsUrl(truck: FoodTruck) {
  if (truck.defaultLatitude && truck.defaultLongitude) {
    return `https://www.google.com/maps/dir/?api=1&destination=${truck.defaultLatitude},${truck.defaultLongitude}`;
  }
  if (truck.defaultLocation) {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(truck.defaultLocation)}`;
  }
  return null;
}

const statusOptions: Array<{ label: string; value: "OPEN" | "CLOSED" | "MOVED" | "UNKNOWN" }> = [
  { label: "Open", value: "OPEN" },
  { label: "Closed", value: "CLOSED" },
  { label: "Moved", value: "MOVED" },
  { label: "Unsure", value: "UNKNOWN" },
];

function StatusBadge({ status }: { status: string }) {
  return <span className={`status-badge status-${status.toLowerCase()}`}>{statusCopy[status] ?? status}</span>;
}

export default function HomePage() {
  const { data, isLoading, error, refetch } = useQuery({ queryKey: ["trucks"], queryFn: fetchTrucks });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [statusNote, setStatusNote] = useState("");
  const [statusReporter, setStatusReporter] = useState("");
  const [statusValue, setStatusValue] = useState<"OPEN" | "CLOSED" | "MOVED" | "UNKNOWN">("OPEN");
  const [reviewMenuItemId, setReviewMenuItemId] = useState<string>("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState("");
  const [reviewReporter, setReviewReporter] = useState("");
  const [submittingStatus, setSubmittingStatus] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const trucks = data ?? [];
  const selectedTruck: FoodTruck | undefined = useMemo(() => {
    const active = selectedId ? trucks.find((truck) => truck.id === selectedId) : undefined;
    return active ?? trucks[0];
  }, [selectedId, trucks]);

  useEffect(() => {
    if (selectedTruck?.menuItems?.length) {
      setReviewMenuItemId(selectedTruck.menuItems[0].id);
    }
  }, [selectedTruck?.id, selectedTruck?.menuItems]);

  useEffect(() => {
    if (feedback) {
      const timeout = setTimeout(() => setFeedback(null), 4000);
      return () => clearTimeout(timeout);
    }
  }, [feedback]);

  const handleStatusSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedTruck) return;
    setSubmittingStatus(true);
    try {
      await postStatusUpdate(selectedTruck.id, {
        status: statusValue,
        note: statusNote,
        reporterName: statusReporter,
        latitude: selectedTruck.defaultLatitude ?? undefined,
        longitude: selectedTruck.defaultLongitude ?? undefined,
      });
      setStatusNote("");
      setStatusReporter("");
      setFeedback("Thanks! Your update helps everyone grab lunch faster.");
      await refetch();
    } catch (err) {
      console.error(err);
      setFeedback("We couldn't save that update. Try again?");
    } finally {
      setSubmittingStatus(false);
    }
  };

  const handleReviewSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedTruck || !reviewMenuItemId) return;
    setSubmittingReview(true);
    try {
      await postMenuReview(selectedTruck.id, {
        menuItemId: reviewMenuItemId,
        rating: reviewRating,
        comment: reviewComment,
        reporterName: reviewReporter,
      });
      setReviewComment("");
      setReviewReporter("");
      setFeedback("Review shared! Others will see it in the menu tab.");
      await refetch();
    } catch (err) {
      console.error(err);
      setFeedback("Couldn't submit review. Check your connection and try again.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const mapCenter: [number, number] = selectedTruck?.defaultLatitude && selectedTruck?.defaultLongitude
    ? [selectedTruck.defaultLatitude, selectedTruck.defaultLongitude]
    : defaultCenter;

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">Penn Campus · University City</p>
          <h1>StreetEats</h1>
          <p className="subtitle">Live, crowd-verified food truck intel</p>
        </div>
        <div className="header-actions">
          <button className="cta-button" onClick={() => refetch()}>
            Refresh
          </button>
          <Link to="/owners" className="owner-link-button">
            Owner login
          </Link>
        </div>
      </header>

      {feedback && <div className="toast">{feedback}</div>}

      <section className="map-section">
        <MapContainer center={mapCenter} zoom={15} scrollWheelZoom={false} className="map-container">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {trucks.map((truck) => (
            <Marker
              key={truck.id}
              position={[
                truck.defaultLatitude ?? defaultCenter[0],
                truck.defaultLongitude ?? defaultCenter[1],
              ]}
              icon={createTruckIcon(
                getTruckBadgeLabel(truck.name),
                selectedTruck?.id === truck.id,
              )}
              eventHandlers={{
                click: () => setSelectedId(truck.id),
              }}
            >
              <Popup>
                <strong>{truck.name}</strong>
                <p>{truck.defaultLocation}</p>
                {truck.latestStatus && <StatusBadge status={truck.latestStatus.status} />}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </section>

      <section className="sheet">
        {isLoading && <p>Loading trucks...</p>}
        {error && <p className="error">Could not load data. Check API connection.</p>}

        <div className="truck-scroll">
          {trucks.map((truck) => (
            <article
              key={truck.id}
              className={`truck-card ${selectedTruck?.id === truck.id ? "active" : ""}`}
              onClick={() => setSelectedId(truck.id)}
            >
              <div className="truck-card-header">
                <div>
                  <h3>{truck.name}</h3>
                  <p className="truck-meta">{truck.cuisineType ?? "Multi-cuisine"}</p>
                </div>
                {truck.latestStatus && <StatusBadge status={truck.latestStatus.status} />}
              </div>
              <p className="truck-location">{truck.defaultLocation ?? "Location varies"}</p>
              {truck.latestStatus?.note && <p className="truck-note">“{truck.latestStatus.note}”</p>}
              {getMapsUrl(truck) && (
                <a
                  className="directions-link small"
                  href={getMapsUrl(truck)!}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(event) => event.stopPropagation()}
                >
                  Open in Google Maps
                </a>
              )}
            </article>
          ))}
        </div>

        {selectedTruck && (
          <div className="detail-panel">
            <div className="detail-header">
              <div>
                <h2>{selectedTruck.name}</h2>
                <p>{selectedTruck.description}</p>
              </div>
              {selectedTruck.latestStatus && (
                <div className="status-block">
                  <StatusBadge status={selectedTruck.latestStatus.status} />
                  <p className="status-meta">
                    updated {new Date(selectedTruck.latestStatus.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </p>
                </div>
              )}
            </div>

            <div className="detail-grid">
              <div>
                <h4>Menu Intel</h4>
                {getMapsUrl(selectedTruck) && (
                  <a className="directions-link" href={getMapsUrl(selectedTruck)!} target="_blank" rel="noreferrer">
                    Directions in Google Maps
                  </a>
                )}
                <div className="menu-row">
                  {selectedTruck.menuItems.map((item) => (
                    <div key={item.id} className="menu-card">
                      <div>
                        <p className="menu-name">{item.name}</p>
                        {item.description && <p className="menu-desc">{item.description}</p>}
                      </div>
                      <div>
                        {item.averageRating && <span className="pill">⭐ {item.averageRating.toFixed(1)}</span>}
                        {item.priceCents && <p className="menu-price">{formatCurrency(item.priceCents)}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4>Quick Status Check</h4>
                <form className="inline-form" onSubmit={handleStatusSubmit}>
                  <label className="form-label">Current status</label>
                  <div className="status-options">
                    {statusOptions.map((option) => (
                      <button
                        type="button"
                        key={option.value}
                        className={`pill ${statusValue === option.value ? "pill-active" : ""}`}
                        onClick={() => setStatusValue(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <label className="form-label">Notes (optional)</label>
                  <textarea
                    value={statusNote}
                    onChange={(event) => setStatusNote(event.target.value)}
                    placeholder="Line getting long? Truck moved across Spruce?"
                  />
                  <label className="form-label">Name or handle</label>
                  <input
                    value={statusReporter}
                    onChange={(event) => setStatusReporter(event.target.value)}
                    placeholder="ex: @pennfoodie"
                  />
                  <button type="submit" className="submit-button" disabled={submittingStatus}>
                    {submittingStatus ? "Sending..." : "Share update"}
                  </button>
                </form>
              </div>

              <div>
                <h4>Menu Review</h4>
                <form className="inline-form" onSubmit={handleReviewSubmit}>
                  <label className="form-label">Dish</label>
                  <select value={reviewMenuItemId} onChange={(event) => setReviewMenuItemId(event.target.value)}>
                    {selectedTruck.menuItems.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <label className="form-label">Rating</label>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    value={reviewRating}
                    onChange={(event) => setReviewRating(Number(event.target.value))}
                  />
                  <div className="range-value">{reviewRating} / 5</div>
                  <label className="form-label">Comment</label>
                  <textarea
                    value={reviewComment}
                    onChange={(event) => setReviewComment(event.target.value)}
                    placeholder="Portions, spice level, crowd tips..."
                  />
                  <label className="form-label">Name or handle</label>
                  <input
                    value={reviewReporter}
                    onChange={(event) => setReviewReporter(event.target.value)}
                    placeholder="ex: Jess from Huntsman"
                  />
                  <button type="submit" className="submit-button" disabled={submittingReview}>
                    {submittingReview ? "Posting..." : "Post review"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

