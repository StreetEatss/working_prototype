// client/src/pages/TruckDetailPage.tsx
import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { FoodTruck } from "../lib/api";
import { fetchTrucks } from "../lib/api";

const statusCopy: Record<string, string> = {
  OPEN: "Open now",
  CLOSED: "Closed",
  MOVED: "Moved",
  UNKNOWN: "Status unknown",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span className={`status-badge status-${status.toLowerCase()}`}>
      {statusCopy[status] ?? status}
    </span>
  );
}

function formatCurrency(value?: number | null) {
  if (!value && value !== 0) return "";
  return `$${(value / 100).toFixed(2)}`;
}

export default function TruckDetailPage() {
  const { truckId } = useParams<{ truckId: string }>();
  const navigate = useNavigate();

  const {
    data: trucks,
    isLoading,
    error,
  } = useQuery<FoodTruck[]>({
    queryKey: ["trucks"],
    queryFn: fetchTrucks,
  });

  const truck: FoodTruck | undefined = useMemo(() => {
    if (!trucks || !truckId) return undefined;
    return trucks.find((t) => t.id === truckId);
  }, [trucks, truckId]);

  const notFound = !isLoading && !error && truckId && !truck;

  return (
    <div className="app-shell truck-detail-page">
      <header className="app-header">
        <div>
          <p className="eyebrow">Penn Campus · University City</p>
          <h1>StreetEats</h1>
          <p className="subtitle">
            {truck ? `${truck.name} · Menu & Reviews` : "Menu & reviews"}
          </p>
        </div>
        <div className="header-actions">
          <button
            className="cta-button ghost"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>
      </header>

     <section className="sheet" style={{ marginTop: "1.5rem" }}>
        {isLoading && <p>Loading truck data…</p>}
        {error && (
          <p className="error">Could not load data. Check API connection.</p>
        )}
        {notFound && (
          <p className="error">
            Could not find that truck. It may have been removed.
          </p>
        )}

        {truck && (
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Top card: truck hero/info */}
            <div className="detail-panel">
              <div
                className="detail-header"
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: "1rem",
                }}
              >
                <div>
                  <h2 style={{ margin: 0 }}>{truck.name}</h2>
                  <p
                    className="truck-meta"
                    style={{ marginTop: "0.2rem", marginBottom: 0 }}
                  >
                    {truck.cuisineType ?? "Multi-cuisine"}
                  </p>
                  <p
                    className="truck-location"
                    style={{ marginTop: "0.35rem" }}
                  >
                    {truck.defaultLocation ?? "Location varies around campus"}
                  </p>
                  {truck.description && (
                    <p
                      style={{
                        margin: "0.4rem 0 0",
                        fontSize: "0.9rem",
                        color: "#4c556b",
                      }}
                    >
                      {truck.description}
                    </p>
                  )}
                </div>

                {truck.latestStatus && (
                  <div className="status-block">
                    <StatusBadge status={truck.latestStatus.status} />
                    <p className="status-meta">
                      updated{" "}
                      {new Date(
                        truck.latestStatus.createdAt
                      ).toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    {truck.latestStatus.note && (
                      <p
                        className="truck-note"
                        style={{ marginTop: "0.4rem" }}
                      >
                        “{truck.latestStatus.note}”
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Second card: menu + reviews */}
            <div className="detail-panel">
              <h3 style={{ marginTop: 0, marginBottom: "0.75rem" }}>
                Menu items & reviews
              </h3>

              {truck.menuItems.length === 0 && (
                <p className="truck-note">
                  No menu items recorded yet. Check back soon!
                </p>
              )}

              <div className="menu-row">
                {truck.menuItems.map((item) => {
                  // If you later add item.reviews from the backend,
                  // this will render them here.
                  const reviews = item.reviews;


                  return (
                    <div key={item.id} className="menu-card">
                      <div>
                        <p className="menu-name">
                          {item.name}
                          {item.isFeatured && (
                            <span
                              style={{
                                marginLeft: "0.4rem",
                                padding: "0.1rem 0.4rem",
                                borderRadius: "999px",
                                fontSize: "0.7rem",
                                background:
                                  "linear-gradient(90deg,#ffb74d,#ff9800)",
                                color: "#050914",
                                verticalAlign: "middle",
                              }}
                            >
                              Featured
                            </span>
                          )}
                        </p>
                        {item.description && (
                          <p className="menu-desc">{item.description}</p>
                        )}

                        {/* Reviews for this menu item */}
                        <div
                          style={{
                            marginTop: "0.45rem",
                            paddingTop: "0.4rem",
                            borderTop: "1px solid rgba(5, 9, 20, 0.05)",
                          }}
                        >
                          {reviews && reviews.length > 0 ? (
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.35rem",
                              }}
                            >
                              {reviews.map((review) => (
                                <div
                                  key={review.id}
                                  style={{ fontSize: "0.8rem" }}
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "space-between",
                                      marginBottom: "0.05rem",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        marginRight: 4,
                                      }}
                                    >
                                      {review.reporterName ||
                                        "Anonymous eater"}
                                    </span>
                                    <span style={{ opacity: 0.8 }}>
                                      ⭐ {review.rating}/5
                                    </span>
                                  </div>
                                  {review.comment && (
                                    <p
                                      style={{
                                        margin: 0,
                                        color: "#4c556b",
                                        lineHeight: 1.35,
                                      }}
                                    >
                                      “{review.comment}”
                                    </p>
                                  )}
                                  <p
                                    style={{
                                      margin: "0.1rem 0 0",
                                      opacity: 0.65,
                                    }}
                                  >
                                    {new Date(
                                      review.createdAt
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p
                              style={{
                                margin: 0,
                                fontSize: "0.8rem",
                                color: "#6b738a",
                              }}
                            >
                              No written reviews yet. You can leave one from the
                              main StreetEats page.
                            </p>
                          )}
                        </div>
                      </div>

                      <div style={{ textAlign: "right" }}>
                        {typeof item.averageRating === "number" && (
                          <span className="pill" style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
                            <span>⭐</span>
                            <span>{item.averageRating.toFixed(1)}</span>
                          </span>
                        )}
                        {item.priceCents != null && (
                          <p className="menu-price">
                            {formatCurrency(item.priceCents)}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
