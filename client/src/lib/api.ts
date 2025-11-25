import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:4000",
});

const OWNER_TOKEN_KEY = "streeteats_owner_token";
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
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    window.localStorage.removeItem(OWNER_TOKEN_KEY);
    delete api.defaults.headers.common.Authorization;
  }
};

const initialToken = bootstrapToken();
if (initialToken) {
  api.defaults.headers.common.Authorization = `Bearer ${initialToken}`;
}

export interface StatusUpdate {
  id: string;
  status: "OPEN" | "CLOSED" | "MOVED" | "UNKNOWN";
  note?: string | null;
  reporterName?: string | null;
  reliability?: number | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
  source?: string;
}

export interface MenuReview {
  id: string;
  rating: number;
  tasteRating?: number | null;
  valueRating?: number | null;
  comment?: string | null;
  reporterName?: string | null;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string | null;
  priceCents?: number | null;
  imageUrl?: string | null;
  averageRating?: number | null;
  isFeatured: boolean;
  reviews?: MenuReview[];
}

export type DayName = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";

export interface ScheduleEntry {
  day: DayName;
  open: string;
  close: string;
  note?: string | null;
}

export interface FoodTruck {
  id: string;
  name: string;
  description?: string | null;
  cuisineType?: string | null;
  imageUrl?: string | null;
  defaultLocation?: string | null;
  defaultLatitude?: number | null;
  defaultLongitude?: number | null;
  venmoHandle?: string | null;
  latestStatus?: StatusUpdate | null;
  statusUpdates?: StatusUpdate[];
  menuItems: MenuItem[];
  typicalSchedule?: ScheduleEntry[] | null;
}

export interface OwnerTruckSummary {
  id: string;
  name: string;
  defaultLocation?: string | null;
  cuisineType?: string | null;
  role: "OWNER" | "MANAGER";
  typicalSchedule: ScheduleEntry[];
  defaultLatitude?: number | null;
  defaultLongitude?: number | null;
}

export interface OwnerProfile {
  id: string;
  name: string;
  email: string;
  trucks: OwnerTruckSummary[];
}

export const fetchTrucks = async () => {
  const { data } = await api.get<FoodTruck[]>("/api/trucks");
  return data;
};

export const fetchTruck = async (truckId: string) => {
  const { data } = await api.get<FoodTruck>(`/api/trucks/${truckId}`);
  return data;
};

export const postStatusUpdate = async (
  truckId: string,
  payload: Omit<StatusUpdate, "id" | "createdAt">
) => {
  const { data } = await api.post(`/api/trucks/${truckId}/status`, payload);
  return data;
};

export const postMenuReview = async (
  truckId: string,
  payload: { menuItemId: string; rating: number; comment?: string; reporterName?: string }
) => {
  const { data } = await api.post(`/api/trucks/${truckId}/reviews`, payload);
  return data;
};

export const loginOwner = async (payload: { email: string; password: string }) => {
  const { data } = await api.post<{ token: string; owner: { id: string; email: string; name?: string } }>("/api/auth/login", payload);
  return data;
};

export const fetchOwnerProfile = async () => {
  const { data } = await api.get<OwnerProfile>("/api/owners/me");
  return data;
};

export const updateTruckHours = async (truckId: string, schedule: ScheduleEntry[]) => {
  const { data } = await api.patch<{ truckId: string; typicalSchedule: ScheduleEntry[] }>(`/api/trucks/${truckId}/hours`, {
    schedule,
  });
  return data;
};

export default api;
