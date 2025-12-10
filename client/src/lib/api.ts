import { createClient } from "@supabase/supabase-js";
import type {
  FoodTruck,
  MenuItem,
  MenuReview,
  OwnerProfile,
  OwnerTruckSummary,
  ScheduleEntry,
  StatusUpdate,
  User,
} from "../types";

export type { FoodTruck, MenuItem, MenuReview, OwnerProfile, OwnerTruckSummary, ScheduleEntry, StatusUpdate, User } from "../types";

const OWNER_TOKEN_KEY = "streeteats_owner_token";
const USER_TOKEN_KEY = "streeteats_user_token";
const canUseStorage = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const toCamelSchedule = (raw: any): ScheduleEntry[] => {
  if (!raw) return [];
  try {
    return Array.isArray(raw) ? raw.map((item) => ({ day: item.day, open: item.open, close: item.close })) : [];
  } catch {
    return [];
  }
};

const mapStatusUpdate = (row: any): StatusUpdate => ({
  id: row.id,
  truckId: row.truck_id ?? row.truckId,
  userId: row.user_id ?? row.userId ?? null,
  status: row.status,
  note: row.note ?? null,
  reporterName: row.reporter_name ?? row.reporterName ?? null,
  latitude: row.latitude ?? null,
  longitude: row.longitude ?? null,
  reliability: row.reliability ?? null,
  source: row.source ?? null,
  isFlagged: row.is_flagged ?? row.isFlagged ?? null,
  createdAt: row.created_at ?? row.createdAt,
});

const mapMenuItem = (row: any): MenuItem => ({
  id: row.id,
  truckId: row.truck_id ?? row.truckId,
  name: row.name,
  description: row.description ?? null,
  priceCents: row.price_cents ?? row.priceCents ?? null,
  imageUrl: row.image_url ?? row.imageUrl ?? null,
  averageRating: row.average_rating ?? row.averageRating ?? null,
  isFeatured: Boolean(row.is_featured ?? row.isFeatured),
});

const mapTruck = (row: any): FoodTruck => {
  const menuItems = (row.menu_items ?? []).map(mapMenuItem);
  const statusUpdates = (row.status_updates ?? []).map(mapStatusUpdate);
  const latestStatus = statusUpdates.sort(
    (a: StatusUpdate, b: StatusUpdate) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0];

  return {
    id: row.id,
    name: row.name,
    description: row.description ?? null,
    cuisineType: row.cuisine_type ?? row.cuisineType ?? null,
    imageUrl: row.image_url ?? row.imageUrl ?? null,
    defaultLocation: row.default_location ?? row.defaultLocation ?? null,
    defaultLatitude: row.default_latitude ?? row.defaultLatitude ?? null,
    defaultLongitude: row.default_longitude ?? row.defaultLongitude ?? null,
    venmoHandle: row.venmo_handle ?? row.venmoHandle ?? null,
    typicalSchedule: toCamelSchedule(row.typical_schedule ?? row.typicalSchedule),
    menuItems,
    latestStatus: latestStatus ?? null,
  };
};

const mapOwnerTruckSummary = (row: any): OwnerTruckSummary => ({
  id: row.id,
  name: row.name,
  defaultLocation: row.default_location ?? row.defaultLocation ?? null,
  cuisineType: row.cuisine_type ?? row.cuisineType ?? null,
  role: (row.role ?? "OWNER") as OwnerTruckSummary["role"],
  typicalSchedule: toCamelSchedule(row.typical_schedule ?? row.typicalSchedule),
  defaultLatitude: row.default_latitude ?? row.defaultLatitude ?? null,
  defaultLongitude: row.default_longitude ?? row.defaultLongitude ?? null,
});

const mapUser = (row: any): User => ({
  id: row.id,
  username: row.username,
  email: row.email,
  phoneNumber: row.phone_number ?? row.phoneNumber,
  strikeCount: row.strike_count ?? row.strikeCount ?? 0,
  isBanned: row.is_banned ?? row.isBanned ?? null,
});

const getAuthUserId = async (token: string | null) => {
  if (!token) return null;
  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data?.user) return null;
  return data.user.id;
};

export const getStoredOwnerToken = () => (canUseStorage ? window.localStorage.getItem(OWNER_TOKEN_KEY) : null);

export const setStoredOwnerToken = (token: string | null) => {
  if (!canUseStorage) return;
  if (token) {
    window.localStorage.setItem(OWNER_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(OWNER_TOKEN_KEY);
  }
};

export const getStoredUserToken = () => (canUseStorage ? window.localStorage.getItem(USER_TOKEN_KEY) : null);

export const setStoredUserToken = (token: string | null) => {
  if (!canUseStorage) return;
  if (token) {
    window.localStorage.setItem(USER_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(USER_TOKEN_KEY);
  }
};

export const fetchTrucks = async (): Promise<FoodTruck[]> => {
  const { data, error } = await supabase
    .from("food_trucks")
    .select("*, menu_items(*), status_updates(*)")
    .order("name", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(mapTruck);
};

export const fetchTruck = async (truckId: string): Promise<FoodTruck> => {
  const { data, error } = await supabase
    .from("food_trucks")
    .select("*, menu_items(*), status_updates(*)")
    .eq("id", truckId)
    .single();
  if (error) throw error;
  return mapTruck(data);
};

export const postStatusUpdate = async (
  truckId: string,
  payload: Omit<StatusUpdate, "id" | "createdAt" | "source" | "userId" | "isFlagged" | "truckId">
): Promise<StatusUpdate> => {
  const token = getStoredUserToken();
  const userId = await getAuthUserId(token);
  if (!userId) {
    throw new Error("You must be logged in to post status updates");
  }

  const { data, error } = await supabase
    .from("status_updates")
    .insert({
      truck_id: truckId,
      user_id: userId,
      status: payload.status,
      note: payload.note,
      reporter_name: payload.reporterName,
      latitude: payload.latitude,
      longitude: payload.longitude,
      source: "USER",
    })
    .select()
    .single();

  if (error) throw error;
  return mapStatusUpdate(data);
};

export const postMenuReview = async (
  truckId: string,
  payload: { menuItemId: string; rating: number; comment?: string; reporterName?: string }
): Promise<MenuReview> => {
  const token = getStoredUserToken();
  const userId = await getAuthUserId(token);
  if (!userId) {
    throw new Error("You must be logged in to post reviews");
  }

  const { data, error } = await supabase
    .from("menu_reviews")
    .insert({
      truck_id: truckId,
      menu_item_id: payload.menuItemId,
      user_id: userId,
      rating: payload.rating,
      comment: payload.comment,
      reporter_name: payload.reporterName,
    })
    .select()
    .single();

  if (error) throw error;
  return {
    id: data.id,
    menuItemId: data.menu_item_id ?? data.menuItemId,
    userId: data.user_id ?? data.userId,
    rating: data.rating,
    comment: data.comment ?? null,
    reporterName: data.reporter_name ?? data.reporterName ?? null,
    createdAt: data.created_at ?? data.createdAt,
    isFlagged: data.is_flagged ?? data.isFlagged ?? null,
  };
};

export const loginOwner = async (payload: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email: payload.email, password: payload.password });
  if (error || !data.session) throw error || new Error("Unable to sign in");
  return { token: data.session.access_token, owner: { id: data.user?.id ?? "", email: payload.email, name: payload.email } };
};

export const fetchOwnerProfile = async (): Promise<OwnerProfile> => {
  const token = getStoredOwnerToken();
  const userId = await getAuthUserId(token);
  if (!userId) throw new Error("Not authenticated");

  const { data: ownerRow, error: userError } = await supabase.from("users").select("*").eq("id", userId).single();
  if (userError) throw userError;

  const { data: trucks, error: truckError } = await supabase
    .from("food_trucks")
    .select("id, name, default_location, cuisine_type, typical_schedule, default_latitude, default_longitude")
    .eq("owner_id", userId);
  if (truckError) throw truckError;

  return {
    id: ownerRow.id,
    name: ownerRow.username ?? ownerRow.email,
    email: ownerRow.email,
    trucks: (trucks ?? []).map(mapOwnerTruckSummary),
  };
};

export const updateTruckHours = async (truckId: string, schedule: ScheduleEntry[]) => {
  const { error } = await supabase
    .from("food_trucks")
    .update({ typical_schedule: schedule })
    .eq("id", truckId);
  if (error) throw error;
};

export const updateTruckDescription = async (truckId: string, description: string) => {
  const { error } = await supabase.from("food_trucks").update({ description }).eq("id", truckId);
  if (error) throw error;
};

export const fetchTruckForOwner = async (truckId: string): Promise<FoodTruck> => fetchTruck(truckId);

export const createMenuItem = async (
  truckId: string,
  payload: { name: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> => {
  const { data, error } = await supabase
    .from("menu_items")
    .insert({
      truck_id: truckId,
      name: payload.name,
      description: payload.description,
      price_cents: payload.priceCents,
      is_featured: payload.isFeatured ?? false,
    })
    .select()
    .single();
  if (error) throw error;
  return mapMenuItem(data);
};

export const updateMenuItem = async (
  menuItemId: string,
  payload: { name?: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> => {
  const { data, error } = await supabase
    .from("menu_items")
    .update({
      name: payload.name,
      description: payload.description,
      price_cents: payload.priceCents,
      is_featured: payload.isFeatured,
    })
    .eq("id", menuItemId)
    .select()
    .single();
  if (error) throw error;
  return mapMenuItem(data);
};

export const deleteMenuItem = async (menuItemId: string): Promise<void> => {
  const { error } = await supabase.from("menu_items").delete().eq("id", menuItemId);
  if (error) throw error;
};

export const registerUser = async (payload: { username: string; email: string; phoneNumber: string; password: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: { username: payload.username, phone_number: payload.phoneNumber },
    },
  });
  if (error || !data.user) throw error || new Error("Unable to register");

  await supabase.from("users").upsert({
    id: data.user.id,
    username: payload.username,
    email: payload.email,
    phone_number: payload.phoneNumber,
  });

  return { token: data.session?.access_token ?? "", user: mapUser({ ...payload, id: data.user.id, strike_count: 0 }) };
};

export const loginUser = async (payload: { emailOrPhone: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email: payload.emailOrPhone, password: payload.password });
  if (error || !data.session || !data.user) throw error || new Error("Unable to log in");

  return { token: data.session.access_token, user: mapUser({ ...data.user.user_metadata, id: data.user.id, email: data.user.email }) };
};

export const fetchUserProfile = async (): Promise<User> => {
  const token = getStoredUserToken();
  const userId = await getAuthUserId(token);
  if (!userId) throw new Error("Not authenticated");

  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single();
  if (error) throw error;
  return mapUser(data);
};

export const flagStatusUpdate = async (statusUpdateId: string): Promise<void> => {
  const token = getStoredOwnerToken();
  const userId = await getAuthUserId(token);
  if (!userId) throw new Error("You must be logged in as an owner to flag content");

  const { error } = await supabase.from("status_updates").update({ is_flagged: true }).eq("id", statusUpdateId);
  if (error) throw error;
};

export const flagMenuReview = async (reviewId: string): Promise<void> => {
  const token = getStoredOwnerToken();
  const userId = await getAuthUserId(token);
  if (!userId) throw new Error("You must be logged in as an owner to flag content");

  const { error } = await supabase.from("menu_reviews").update({ is_flagged: true }).eq("id", reviewId);
  if (error) throw error;
};

export const fetchTruckStatusUpdates = async (truckId: string): Promise<StatusUpdate[]> => {
  const token = getStoredOwnerToken();
  const userId = await getAuthUserId(token);
  if (!userId) throw new Error("You must be logged in as an owner");

  const { data, error } = await supabase
    .from("status_updates")
    .select("*")
    .eq("truck_id", truckId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapStatusUpdate);
};

export const fetchTruckMenuReviews = async (truckId: string): Promise<MenuReview[]> => {
  const token = getStoredOwnerToken();
  const userId = await getAuthUserId(token);
  if (!userId) throw new Error("You must be logged in as an owner");

  const { data, error } = await supabase
    .from("menu_reviews")
    .select("*")
    .eq("truck_id", truckId)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id,
    menuItemId: row.menu_item_id ?? row.menuItemId,
    userId: row.user_id ?? row.userId,
    rating: row.rating,
    comment: row.comment ?? null,
    reporterName: row.reporter_name ?? row.reporterName ?? null,
    createdAt: row.created_at ?? row.createdAt,
    isFlagged: row.is_flagged ?? row.isFlagged ?? null,
  }));
};
