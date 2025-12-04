// Client-side API using SQLite in the browser
import * as db from "./db";

const OWNER_TOKEN_KEY = "streeteats_owner_token";
const USER_TOKEN_KEY = "streeteats_user_token";
const canUseStorage = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const bootstrapToken = () => {
  if (!canUseStorage) return null;
  return window.localStorage.getItem(OWNER_TOKEN_KEY);
};

export const getStoredOwnerToken = () => bootstrapToken();

export const setStoredOwnerToken = (token: string | null) => {
  if (!canUseStorage) return;
  if (token) {
    window.localStorage.setItem(OWNER_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(OWNER_TOKEN_KEY);
  }
};

export const getStoredUserToken = () => {
  if (!canUseStorage) return null;
  return window.localStorage.getItem(USER_TOKEN_KEY);
};

export const setStoredUserToken = (token: string | null) => {
  if (!canUseStorage) return;
  if (token) {
    window.localStorage.setItem(USER_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(USER_TOKEN_KEY);
  }
};

// Re-export types from db
export type StatusUpdate = db.StatusUpdate;
export type MenuReview = db.MenuReview;
export type MenuItem = db.MenuItem;
export type FoodTruck = db.FoodTruck;
export type OwnerTruckSummary = db.OwnerTruckSummary;
export type OwnerProfile = db.OwnerProfile;
export type ScheduleEntry = db.ScheduleEntry;
export type User = db.User;

export const fetchTrucks = async (): Promise<FoodTruck[]> => {
  return await db.fetchTrucks();
};

export const fetchTruck = async (truckId: string): Promise<FoodTruck> => {
  const trucks = await db.fetchTrucks();
  const truck = trucks.find((t) => t.id === truckId);
  if (!truck) {
    throw new Error("Truck not found");
  }
  return truck;
};

export const postStatusUpdate = async (
  truckId: string,
  payload: Omit<StatusUpdate, "id" | "createdAt" | "source" | "userId" | "isFlagged">
): Promise<StatusUpdate> => {
  const token = getStoredUserToken();
  if (!token) {
    throw new Error("You must be logged in to post status updates");
  }
  let userId: string;
  try {
    const decoded = JSON.parse(atob(token));
    userId = decoded.id;
  } catch {
    throw new Error("Invalid session. Please log in again.");
  }
  return await db.postStatusUpdate(truckId, userId, {
    status: payload.status,
    note: payload.note ?? undefined,
    reporterName: payload.reporterName ?? undefined,
    latitude: payload.latitude ?? undefined,
    longitude: payload.longitude ?? undefined,
  });
};

export const postMenuReview = async (
  truckId: string,
  payload: { menuItemId: string; rating: number; comment?: string; reporterName?: string }
): Promise<MenuReview> => {
  const token = getStoredUserToken();
  if (!token) {
    throw new Error("You must be logged in to post reviews");
  }
  let userId: string;
  try {
    const decoded = JSON.parse(atob(token));
    userId = decoded.id;
  } catch {
    throw new Error("Invalid session. Please log in again.");
  }
  return await db.postMenuReview(truckId, userId, payload);
};

export const loginOwner = async (payload: { email: string; password: string }) => {
  return await db.loginOwner(payload);
};

export const fetchOwnerProfile = async (): Promise<OwnerProfile> => {
  const token = getStoredOwnerToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  return await db.fetchOwnerProfile(token);
};

export const updateTruckHours = async (truckId: string, schedule: ScheduleEntry[]) => {
  return await db.updateTruckHours(truckId, schedule);
};

export const updateTruckDescription = async (truckId: string, description: string) => {
  return await db.updateTruckDescription(truckId, description);
};

export const fetchTruckForOwner = async (truckId: string): Promise<FoodTruck> => {
  return await db.fetchTruckForOwner(truckId);
};

export const createMenuItem = async (
  truckId: string,
  payload: { name: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> => {
  return await db.createMenuItem(truckId, payload);
};

export const updateMenuItem = async (
  menuItemId: string,
  payload: { name?: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> => {
  return await db.updateMenuItem(menuItemId, payload);
};

export const deleteMenuItem = async (menuItemId: string): Promise<void> => {
  return await db.deleteMenuItem(menuItemId);
};

// User functions
export const registerUser = async (payload: { username: string; password: string }) => {
  return await db.registerUser(payload);
};

export const loginUser = async (payload: { username: string; password: string }) => {
  return await db.loginUser(payload);
};

export const fetchUserProfile = async (): Promise<User> => {
  const token = getStoredUserToken();
  if (!token) {
    throw new Error("Not authenticated");
  }
  return await db.fetchUserProfile(token);
};

// Flagging functions
export const flagStatusUpdate = async (statusUpdateId: string): Promise<void> => {
  const token = getStoredOwnerToken();
  if (!token) {
    throw new Error("You must be logged in as an owner to flag content");
  }
  return await db.flagStatusUpdate(statusUpdateId, token);
};

export const flagMenuReview = async (reviewId: string): Promise<void> => {
  const token = getStoredOwnerToken();
  if (!token) {
    throw new Error("You must be logged in as an owner to flag content");
  }
  return await db.flagMenuReview(reviewId, token);
};

export const fetchTruckStatusUpdates = async (truckId: string): Promise<StatusUpdate[]> => {
  const token = getStoredOwnerToken();
  if (!token) {
    throw new Error("You must be logged in as an owner");
  }
  return await db.fetchTruckStatusUpdates(truckId, token);
};

export const fetchTruckMenuReviews = async (truckId: string): Promise<MenuReview[]> => {
  const token = getStoredOwnerToken();
  if (!token) {
    throw new Error("You must be logged in as an owner");
  }
  return await db.fetchTruckMenuReviews(truckId, token);
};
