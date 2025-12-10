import { supabase, requireCurrentUser } from "./supabaseClient";

const OWNER_TOKEN_KEY = "streeteats_owner_token";
const USER_TOKEN_KEY = "streeteats_user_token";
const canUseStorage = typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const bootstrapToken = (key: string) => {
  if (!canUseStorage) return null;
  return window.localStorage.getItem(key);
};

export const getStoredOwnerToken = () => bootstrapToken(OWNER_TOKEN_KEY);

export const setStoredOwnerToken = (token: string | null) => {
  if (!canUseStorage) return;
  if (token) {
    window.localStorage.setItem(OWNER_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(OWNER_TOKEN_KEY);
  }
};

export const getStoredUserToken = () => bootstrapToken(USER_TOKEN_KEY);

export const setStoredUserToken = (token: string | null) => {
  if (!canUseStorage) return;
  if (token) {
    window.localStorage.setItem(USER_TOKEN_KEY, token);
  } else {
    window.localStorage.removeItem(USER_TOKEN_KEY);
  }
};

export interface StatusUpdate {
  id: string;
  status: "OPEN" | "CLOSED" | "MOVED" | "UNKNOWN";
  note?: string | null;
  reporterName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  createdAt: string;
  source?: string;
  userId?: string | null;
  isFlagged?: boolean;
}

export interface MenuReview {
  id: string;
  rating: number;
  comment?: string | null;
  reporterName?: string | null;
  createdAt: string;
  userId?: string | null;
  isFlagged?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string | null;
  priceCents?: number | null;
  imageUrl?: string | null;
  averageRating?: number | null;
  isFeatured: boolean;
  truckId?: string;
}

export interface ScheduleEntry {
  day: string;
  open: string;
  close: string;
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
  typicalSchedule?: ScheduleEntry[] | null;
  latestStatus?: StatusUpdate | null;
  menuItems: MenuItem[];
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

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  strikeCount: number;
  isBanned: boolean;
}

const parseSchedule = (value: any): ScheduleEntry[] | null => {
  if (!value) return null;
  if (Array.isArray(value)) return value as ScheduleEntry[];
  try {
    return JSON.parse(value as string);
  } catch {
    return null;
  }
};

export const fetchTrucks = async (): Promise<FoodTruck[]> => {
  const { data: trucks, error } = await supabase
    .from("FoodTruck")
    .select("id, name, description, cuisineType, imageUrl, venmoHandle, defaultLocation, defaultLatitude, defaultLongitude, typicalSchedule")
    .order("name", { ascending: true });

  if (error) throw error;
  if (!trucks?.length) return [];

  const truckIds = trucks.map((t) => t.id);

  const [{ data: statusUpdates }, { data: menuItems }] = await Promise.all([
    supabase
      .from("StatusUpdate")
      .select("id, truckId, status, note, reporterName, latitude, longitude, createdAt, source, userId, isFlagged")
      .in("truckId", truckIds)
      .order("createdAt", { ascending: false }),
    supabase
      .from("MenuItem")
      .select("id, name, description, priceCents, imageUrl, truckId, isFeatured, MenuReview(rating)")
      .in("truckId", truckIds),
  ]);

  const latestStatusByTruck: Record<string, StatusUpdate> = {};
  statusUpdates?.forEach((status) => {
    if (status.isFlagged) return;
    const current = latestStatusByTruck[status.truckId];
    if (!current) {
      latestStatusByTruck[status.truckId] = status as StatusUpdate;
      return;
    }
    if (new Date(status.createdAt).getTime() > new Date(current.createdAt).getTime()) {
      latestStatusByTruck[status.truckId] = status as StatusUpdate;
    }
  });

  const itemsByTruck: Record<string, MenuItem[]> = {};
  menuItems?.forEach((item: any) => {
    const bucket = itemsByTruck[item.truckId] || [];
    const reviews = item.MenuReview || [];
    const averageRating = reviews.length
      ? reviews.reduce((sum: number, rev: any) => sum + (rev.rating || 0), 0) / reviews.length
      : null;
    bucket.push({
      id: item.id,
      name: item.name,
      description: item.description,
      priceCents: item.priceCents,
      imageUrl: item.imageUrl,
      averageRating,
      isFeatured: Boolean(item.isFeatured),
      truckId: item.truckId,
    });
    itemsByTruck[item.truckId] = bucket;
  });

  return trucks.map((truck) => ({
    id: truck.id,
    name: truck.name,
    description: truck.description,
    cuisineType: truck.cuisineType,
    imageUrl: truck.imageUrl,
    venmoHandle: truck.venmoHandle,
    defaultLocation: truck.defaultLocation,
    defaultLatitude: truck.defaultLatitude,
    defaultLongitude: truck.defaultLongitude,
    typicalSchedule: parseSchedule(truck.typicalSchedule),
    latestStatus: latestStatusByTruck[truck.id] ?? null,
    menuItems: itemsByTruck[truck.id] ?? [],
  }));
};

export const fetchTruck = async (truckId: string): Promise<FoodTruck> => {
  const trucks = await fetchTrucks();
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
  const user = await requireCurrentUser();
  const { data, error } = await supabase
    .from("StatusUpdate")
    .insert({
      truckId,
      status: payload.status,
      note: payload.note ?? null,
      reporterName: payload.reporterName ?? null,
      latitude: payload.latitude ?? null,
      longitude: payload.longitude ?? null,
      userId: user.id,
      source: "CROWD",
    })
    .select()
    .single();

  if (error) throw error;
  return data as StatusUpdate;
};

export const postMenuReview = async (
  truckId: string,
  payload: { menuItemId: string; rating: number; comment?: string; reporterName?: string }
): Promise<MenuReview> => {
  const user = await requireCurrentUser();
  const { data, error } = await supabase
    .from("MenuReview")
    .insert({
      menuItemId: payload.menuItemId,
      rating: payload.rating,
      comment: payload.comment ?? null,
      reporterName: payload.reporterName ?? null,
      userId: user.id,
    })
    .select()
    .single();

  if (error) throw error;
  return data as MenuReview;
};

export const loginOwner = async (payload: { email: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.email,
    password: payload.password,
  });

  if (error || !data.session || !data.user) {
    throw new Error(error?.message || "Invalid credentials");
  }

  const { data: owner, error: ownerError } = await supabase
    .from("Owner")
    .select("id, name, email")
    .eq("email", payload.email)
    .single();

  if (ownerError || !owner) {
    throw new Error(ownerError?.message || "Owner not found");
  }

  setStoredOwnerToken(data.session.access_token);

  return {
    token: data.session.access_token,
    owner: {
      id: owner.id,
      email: owner.email,
      name: owner.name,
    },
  };
};

export const fetchOwnerProfile = async (): Promise<OwnerProfile> => {
  const user = await requireCurrentUser();

  const { data: owner, error: ownerError } = await supabase
    .from("Owner")
    .select("id, name, email")
    .eq("email", user.email ?? "")
    .single();

  if (ownerError || !owner) {
    throw new Error(ownerError?.message || "Owner not found");
  }

  const { data: access, error: accessError } = await supabase
    .from("OwnerTruckAccess")
    .select("truckId, role")
    .eq("ownerId", owner.id);

  if (accessError) throw accessError;

  const truckIds = access?.map((a) => a.truckId) ?? [];
  const trucks: OwnerTruckSummary[] = [];

  if (truckIds.length) {
    const { data: truckData, error: truckError } = await supabase
      .from("FoodTruck")
      .select("id, name, defaultLocation, cuisineType, typicalSchedule, defaultLatitude, defaultLongitude")
      .in("id", truckIds);

    if (truckError) throw truckError;

    truckData?.forEach((truck) => {
      const accessRow = access?.find((a) => a.truckId === truck.id);
      trucks.push({
        id: truck.id,
        name: truck.name,
        defaultLocation: truck.defaultLocation,
        cuisineType: truck.cuisineType,
        role: (accessRow?.role as "OWNER" | "MANAGER") || "OWNER",
        typicalSchedule: parseSchedule(truck.typicalSchedule) || [],
        defaultLatitude: truck.defaultLatitude,
        defaultLongitude: truck.defaultLongitude,
      });
    });
  }

  return {
    id: owner.id,
    name: owner.name,
    email: owner.email,
    trucks,
  };
};

export const updateTruckHours = async (truckId: string, schedule: ScheduleEntry[]) => {
  const { error } = await supabase
    .from("FoodTruck")
    .update({ typicalSchedule: schedule })
    .eq("id", truckId);
  if (error) throw error;
  return { truckId, typicalSchedule: schedule };
};

export const updateTruckDescription = async (truckId: string, description: string) => {
  const { error } = await supabase
    .from("FoodTruck")
    .update({ description })
    .eq("id", truckId);
  if (error) throw error;
  return { truckId, description };
};

export const fetchTruckForOwner = async (truckId: string): Promise<FoodTruck> => {
  const { data: truck, error } = await supabase
    .from("FoodTruck")
    .select("id, name, description, cuisineType, imageUrl, venmoHandle, defaultLocation, defaultLatitude, defaultLongitude, typicalSchedule")
    .eq("id", truckId)
    .single();

  if (error || !truck) throw new Error(error?.message || "Truck not found");

  const { data: items, error: itemsError } = await supabase
    .from("MenuItem")
    .select("id, name, description, priceCents, imageUrl, isFeatured, MenuReview(rating)")
    .eq("truckId", truckId)
    .order("isFeatured", { ascending: false })
    .order("name", { ascending: true });

  if (itemsError) throw itemsError;

  const menuItems: MenuItem[] = (items ?? []).map((item: any) => {
    const reviews = item.MenuReview || [];
    const averageRating = reviews.length
      ? reviews.reduce((sum: number, rev: any) => sum + (rev.rating || 0), 0) / reviews.length
      : null;
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      priceCents: item.priceCents,
      imageUrl: item.imageUrl,
      isFeatured: Boolean(item.isFeatured),
      averageRating,
    };
  });

  return {
    id: truck.id,
    name: truck.name,
    description: truck.description,
    cuisineType: truck.cuisineType,
    imageUrl: truck.imageUrl,
    venmoHandle: truck.venmoHandle,
    defaultLocation: truck.defaultLocation,
    defaultLatitude: truck.defaultLatitude,
    defaultLongitude: truck.defaultLongitude,
    typicalSchedule: parseSchedule(truck.typicalSchedule),
    latestStatus: null,
    menuItems,
  };
};

export const createMenuItem = async (
  truckId: string,
  payload: { name: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> => {
  const { data, error } = await supabase
    .from("MenuItem")
    .insert({
      truckId,
      name: payload.name,
      description: payload.description ?? null,
      priceCents: payload.priceCents ?? null,
      isFeatured: payload.isFeatured ?? false,
    })
    .select()
    .single();

  if (error) throw error;
  return {
    id: data.id,
    name: data.name,
    description: data.description,
    priceCents: data.priceCents,
    imageUrl: data.imageUrl,
    isFeatured: Boolean(data.isFeatured),
  };
};

export const updateMenuItem = async (
  menuItemId: string,
  payload: { name?: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> => {
  const { data, error } = await supabase
    .from("MenuItem")
    .update({
      name: payload.name,
      description: payload.description,
      priceCents: payload.priceCents,
      isFeatured: payload.isFeatured,
    })
    .eq("id", menuItemId)
    .select()
    .single();

  if (error) throw error;

  return {
    id: data.id,
    name: data.name,
    description: data.description,
    priceCents: data.priceCents,
    imageUrl: data.imageUrl,
    isFeatured: Boolean(data.isFeatured),
  };
};

export const deleteMenuItem = async (menuItemId: string): Promise<void> => {
  const { error } = await supabase.from("MenuItem").delete().eq("id", menuItemId);
  if (error) throw error;
};

export const registerUser = async (payload: { username: string; email: string; phoneNumber: string; password: string }) => {
  const { data, error } = await supabase.auth.signUp({
    email: payload.email,
    password: payload.password,
    options: {
      data: {
        username: payload.username,
        phoneNumber: payload.phoneNumber,
        role: "diner",
      },
    },
  });

  if (error || !data.user || !data.session) {
    throw new Error(error?.message || "Unable to create account");
  }

  await supabase.from("User").upsert({
    id: data.user.id,
    username: payload.username,
    email: payload.email,
    phoneNumber: payload.phoneNumber,
    strikeCount: 0,
    isBanned: false,
  });

  setStoredUserToken(data.session.access_token);

  return {
    token: data.session.access_token,
    user: {
      id: data.user.id,
      username: payload.username,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      strikeCount: 0,
      isBanned: false,
    },
  };
};

export const loginUser = async (payload: { emailOrPhone: string; password: string }) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: payload.emailOrPhone,
    password: payload.password,
  });

  if (error || !data.user || !data.session) {
    throw new Error(error?.message || "Invalid credentials");
  }

  const { data: profile } = await supabase
    .from("User")
    .select("id, username, email, phoneNumber, strikeCount, isBanned")
    .or(`email.eq.${payload.emailOrPhone},phoneNumber.eq.${payload.emailOrPhone}`)
    .single();

  if (!profile) {
    throw new Error("User profile not found");
  }

  if (profile.isBanned) {
    throw new Error("Your account has been banned");
  }

  setStoredUserToken(data.session.access_token);

  return {
    token: data.session.access_token,
    user: {
      id: profile.id,
      username: profile.username,
      email: profile.email,
      phoneNumber: profile.phoneNumber,
      strikeCount: profile.strikeCount,
      isBanned: profile.isBanned,
    },
  };
};

export const fetchUserProfile = async (): Promise<User> => {
  const user = await requireCurrentUser();
  const { data: profile, error } = await supabase
    .from("User")
    .select("id, username, email, phoneNumber, strikeCount, isBanned")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    throw new Error(error?.message || "User not found");
  }

  return {
    id: profile.id,
    username: profile.username,
    email: profile.email,
    phoneNumber: profile.phoneNumber,
    strikeCount: profile.strikeCount,
    isBanned: profile.isBanned,
  };
};

export const flagStatusUpdate = async (statusUpdateId: string): Promise<void> => {
  const { error } = await supabase
    .from("StatusUpdate")
    .update({ isFlagged: true })
    .eq("id", statusUpdateId);
  if (error) throw error;
};

export const flagMenuReview = async (reviewId: string): Promise<void> => {
  const { error } = await supabase
    .from("MenuReview")
    .update({ isFlagged: true })
    .eq("id", reviewId);
  if (error) throw error;
};

export const fetchTruckStatusUpdates = async (truckId: string): Promise<StatusUpdate[]> => {
  const { data, error } = await supabase
    .from("StatusUpdate")
    .select("id, status, note, reporterName, latitude, longitude, createdAt, source, userId, isFlagged")
    .eq("truckId", truckId)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return data as StatusUpdate[];
};

export const fetchTruckMenuReviews = async (truckId: string): Promise<MenuReview[]> => {
  const { data, error } = await supabase
    .from("MenuReview")
    .select("id, rating, comment, reporterName, createdAt, userId, isFlagged, MenuItem(truckId)")
    .eq("MenuItem.truckId", truckId)
    .order("createdAt", { ascending: false });

  if (error) throw error;
  return (data ?? []).map((review: any) => ({
    id: review.id,
    rating: review.rating,
    comment: review.comment,
    reporterName: review.reporterName,
    createdAt: review.createdAt,
    userId: review.userId,
    isFlagged: review.isFlagged,
  }));
};
