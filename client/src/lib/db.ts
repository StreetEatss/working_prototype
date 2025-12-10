// client/src/lib/db.ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// ---------- Supabase client setup ----------

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.error(
    "Supabase URL or key is missing. Check your VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY env vars."
  );
}

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export async function getDatabase(): Promise<SupabaseClient> {
  // Kept the name/signature for compatibility with old code.
  return supabase;
}

// ---------- Helpers ----------

// Simple password hashing for client-side (not secure, but works for demo)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const newHash = await hashPassword(password);
  return newHash === hash;
}

function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ---------- Shared interfaces ----------

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
  typicalSchedule?: any;
  latestStatus?: StatusUpdate | null;
  menuItems: MenuItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string | null;
  priceCents?: number | null;
  imageUrl?: string | null;
  averageRating?: number | null;
  isFeatured: boolean;
}

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

// ---------- Public API functions ----------

// Fetch all trucks with latest status + menu items + average ratings
export async function fetchTrucks(): Promise<FoodTruck[]> {
  // 1) Fetch trucks
  const { data: trucksData, error: trucksError } = await supabase
    .from("foodtruck")
    .select(
      "id, name, description, cuisinetype, imageurl, venmohandle, defaultlocation, defaultlatitude, defaultlongitude, typicalschedule"
    )
    .order("name", { ascending: true });

  if (trucksError) {
    console.error(trucksError);
    throw new Error("Failed to fetch food trucks");
  }

  if (!trucksData || trucksData.length === 0) return [];

  const truckIds = trucksData.map((t) => t.id as string);

  // 2) Fetch status updates (latest non-flagged per truck)
  const { data: statusesData, error: statusesError } = await supabase
    .from("statusupdate")
    .select(
      "id, truckid, status, note, reportername, latitude, longitude, createdat, source, userid, isflagged"
    )
    .in("truckid", truckIds)
    .order("createdat", { ascending: false });

  if (statusesError) {
    console.error(statusesError);
    throw new Error("Failed to fetch status updates");
  }

  const latestStatusByTruck: Record<string, StatusUpdate | null> = {};
  if (statusesData) {
    for (const row of statusesData as any[]) {
      const truckId = row.truckid as string;
      if (latestStatusByTruck[truckId]) continue; // already have most recent
      if (row.isflagged) continue;

      latestStatusByTruck[truckId] = {
        id: row.id,
        status: row.status,
        note: row.note,
        reporterName: row.reportername,
        latitude: row.latitude,
        longitude: row.longitude,
        createdAt: row.createdat,
        source: row.source,
        userId: row.userid ?? null,
        isFlagged: row.isflagged ?? false,
      };
    }
  }

  // 3) Fetch menu items with reviews to compute avg ratings
  const { data: menuData, error: menuError } = await supabase
    .from("menuitem")
    .select(
      "id, name, description, pricecents, imageurl, isfeatured, truckid, menureview(rating, isflagged)"
    )
    .in("truckid", truckIds);

  if (menuError) {
    console.error(menuError);
    throw new Error("Failed to fetch menu items");
  }

  const itemsByTruck: Record<string, MenuItem[]> = {};
  if (menuData) {
    for (const row of menuData as any[]) {
      const reviews =
        (row.menureview || []) as { rating: number; isflagged: boolean }[];

      const validRatings = reviews
        .filter((r) => !r.isflagged)
        .map((r) => r.rating);
      const avgRating =
        validRatings.length > 0
          ? validRatings.reduce((a, b) => a + b, 0) / validRatings.length
          : null;

      const item: MenuItem = {
        id: row.id,
        name: row.name,
        description: row.description,
        priceCents: row.pricecents,
        imageUrl: row.imageurl,
        isFeatured: row.isfeatured === true || row.isfeatured === 1,
        averageRating: avgRating,
      };

      const truckId = row.truckid as string;
      if (!itemsByTruck[truckId]) itemsByTruck[truckId] = [];
      itemsByTruck[truckId].push(item);
    }
  }

  // 4) Build FoodTruck objects
  const trucks: FoodTruck[] = trucksData.map((t: any) => {
    let typicalSchedule: any = null;
    if (t.typicalschedule) {
      try {
        typicalSchedule =
          typeof t.typicalschedule === "string"
            ? JSON.parse(t.typicalschedule)
            : t.typicalschedule;
      } catch {
        typicalSchedule = null;
      }
    }

    return {
      id: t.id,
      name: t.name,
      description: t.description,
      cuisineType: t.cuisinetype,
      imageUrl: t.imageurl,
      venmoHandle: t.venmohandle,
      defaultLocation: t.defaultlocation,
      defaultLatitude: t.defaultlatitude,
      defaultLongitude: t.defaultlongitude,
      typicalSchedule,
      latestStatus: latestStatusByTruck[t.id] || null,
      menuItems: itemsByTruck[t.id] || [],
    };
  });

  return trucks;
}

// Post a status update (crowd-sourced)
export async function postStatusUpdate(
  truckId: string,
  userId: string,
  payload: {
    status: "OPEN" | "CLOSED" | "MOVED" | "UNKNOWN";
    note?: string;
    reporterName?: string;
    latitude?: number;
    longitude?: number;
  }
): Promise<StatusUpdate> {
  // Check if user is banned
  const { data: userRow, error: userError } = await supabase
    .from("user")
    .select("isbanned")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to check user status");
  }
  if (userRow && userRow.isbanned) {
    throw new Error("Your account has been banned. You cannot post updates.");
  }

  const id = generateUUID();
  const now = new Date().toISOString();

const { error: insertError } = await supabase.from("statusupdate").insert({
  id,
  truckid: truckId,
  userid: userId,
  status: payload.status,
  note: payload.note ?? null,
  reportername: payload.reporterName ?? null,
  latitude: payload.latitude ?? null,
  longitude: payload.longitude ?? null,
  source: "CROWD",
  createdat: now,
  isflagged: 0,
});


  if (insertError) {
    console.error(insertError);
    throw new Error("Failed to post status update");
  }

  return {
    id,
    status: payload.status,
    note: payload.note ?? null,
    reporterName: payload.reporterName ?? null,
    latitude: payload.latitude ?? null,
    longitude: payload.longitude ?? null,
    createdAt: now,
    source: "CROWD",
    userId,
    isFlagged: false,
  };
}

// Post a menu review
export async function postMenuReview(
  _truckId: string,
  userId: string,
  payload: {
    menuItemId: string;
    rating: number;
    comment?: string;
    reporterName?: string;
  }
): Promise<MenuReview> {
  // Check if user is banned
  const { data: userRow, error: userError } = await supabase
    .from("user")
    .select("isbanned")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to check user status");
  }
  if (userRow && userRow.isbanned) {
    throw new Error("Your account has been banned. You cannot post reviews.");
  }

  const id = generateUUID();
  const now = new Date().toISOString();

const { error: insertError } = await supabase.from("menureview").insert({
  id,
  menuitemid: payload.menuItemId,
  userid: userId,
  rating: payload.rating,
  comment: payload.comment ?? null,
  reportername: payload.reporterName ?? null,
  createdat: now,
  isflagged: 0,
});


  if (insertError) {
    console.error(insertError);
    throw new Error("Failed to post review");
  }

  return {
    id,
    rating: payload.rating,
    comment: payload.comment ?? null,
    reporterName: payload.reporterName ?? null,
    createdAt: now,
    userId,
    isFlagged: false,
  };
}

// ---------- Owner login & profile ----------

export interface OwnerTruckSummary {
  id: string;
  name: string;
  defaultLocation?: string | null;
  cuisineType?: string | null;
  role: "OWNER" | "MANAGER";
  typicalSchedule: any[];
  defaultLatitude?: number | null;
  defaultLongitude?: number | null;
}

export interface OwnerProfile {
  id: string;
  name: string;
  email: string;
  trucks: OwnerTruckSummary[];
}

export async function loginOwner(payload: {
  email: string;
  password: string;
}): Promise<{
  token: string;
  owner: { id: string; email: string; name?: string };
}> {
  const { data, error } = await supabase
    .from("owner")
    .select("id, name, email, passwordhash")
    .eq("email", payload.email)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Failed to login");
  }
  if (!data) {
    throw new Error("Invalid credentials");
  }

  const isValid = await verifyPassword(payload.password, data.passwordhash);
  if (!isValid) throw new Error("Invalid credentials");

  const token = btoa(JSON.stringify({ id: data.id, email: data.email }));

  return {
    token,
    owner: {
      id: data.id,
      email: data.email,
      name: data.name,
    },
  };
}

export async function fetchOwnerProfile(token: string): Promise<OwnerProfile> {
  let ownerId: string;
  try {
    const decoded = JSON.parse(atob(token));
    ownerId = decoded.id;
  } catch {
    throw new Error("Invalid token");
  }

  const { data: ownerRow, error: ownerError } = await supabase
    .from("owner")
    .select("id, name, email")
    .eq("id", ownerId)
    .maybeSingle();

  if (ownerError) {
    console.error(ownerError);
    throw new Error("Failed to fetch owner");
  }
  if (!ownerRow) throw new Error("Owner not found");

  const { data: accessRows, error: accessError } = await supabase
    .from("ownertruckaccess")
    .select(
      "role, foodtruck:truckid(id, name, defaultlocation, cuisinetype, typicalschedule, defaultlatitude, defaultlongitude)"
    )
    .eq("ownerid", ownerId);

  if (accessError) {
    console.error(accessError);
    throw new Error("Failed to fetch owner trucks");
  }

  const trucks: OwnerTruckSummary[] =
    (accessRows || []).map((row: any) => {
      let typicalSchedule: any[] = [];
      if (row.foodtruck.typicalschedule) {
        try {
          typicalSchedule =
            typeof row.foodtruck.typicalschedule === "string"
              ? JSON.parse(row.foodtruck.typicalschedule)
              : row.foodtruck.typicalschedule;
        } catch {
          typicalSchedule = [];
        }
      }

      return {
        id: row.foodtruck.id,
        name: row.foodtruck.name,
        defaultLocation: row.foodtruck.defaultlocation,
        cuisineType: row.foodtruck.cuisinetype,
        role: row.role as "OWNER" | "MANAGER",
        typicalSchedule,
        defaultLatitude: row.foodtruck.defaultlatitude,
        defaultLongitude: row.foodtruck.defaultlongitude,
      };
    }) ?? [];

  return {
    id: ownerRow.id,
    name: ownerRow.name,
    email: ownerRow.email,
    trucks,
  };
}

// ---------- Truck updates (owner) ----------

export interface ScheduleEntry {
  day: string;
  open: string;
  close: string;
}

export async function updateTruckHours(
  truckId: string,
  schedule: ScheduleEntry[]
): Promise<{ truckId: string; typicalSchedule: ScheduleEntry[] }> {
  const scheduleJson = JSON.stringify(schedule);

  const { error } = await supabase
    .from("foodtruck")
    .update({
      typicalschedule: scheduleJson,
      updatedat: new Date().toISOString(),
    })
    .eq("id", truckId);

  if (error) {
    console.error(error);
    throw new Error("Failed to update truck hours");
  }

  return {
    truckId,
    typicalSchedule: schedule,
  };
}

export async function updateTruckDescription(
  truckId: string,
  description: string
): Promise<{ truckId: string; description: string }> {
  const { error } = await supabase
    .from("foodtruck")
    .update({
      description,
      updatedat: new Date().toISOString(),
    })
    .eq("id", truckId);

  if (error) {
    console.error(error);
    throw new Error("Failed to update truck description");
  }

  return {
    truckId,
    description,
  };
}

export async function fetchTruckForOwner(truckId: string): Promise<FoodTruck> {
  const { data: truck, error: truckError } = await supabase
    .from("foodtruck")
    .select(
      "id, name, description, cuisinetype, imageurl, venmohandle, defaultlocation, defaultlatitude, defaultlongitude, typicalschedule"
    )
    .eq("id", truckId)
    .maybeSingle();

  if (truckError) {
    console.error(truckError);
    throw new Error("Failed to fetch truck");
  }
  if (!truck) {
    throw new Error("Truck not found");
  }

  const { data: items, error: itemsError } = await supabase
    .from("menuitem")
    .select(
      "id, name, description, pricecents, imageurl, isfeatured, menureview(rating)"
    )
    .eq("truckid", truck.id)
    .order("isfeatured", { ascending: false })
    .order("name", { ascending: true });

  if (itemsError) {
    console.error(itemsError);
    throw new Error("Failed to fetch menu items");
  }

  const menuItems: MenuItem[] =
    (items || []).map((row: any) => {
      const reviews = (row.menureview || []) as { rating: number }[];
      const ratings = reviews.map((r) => r.rating);
      const avgRating =
        ratings.length > 0
          ? ratings.reduce((a, b) => a + b, 0) / ratings.length
          : null;

      return {
        id: row.id,
        name: row.name,
        description: row.description,
        priceCents: row.pricecents,
        imageUrl: row.imageurl,
        isFeatured: row.isfeatured === true || row.isfeatured === 1,
        averageRating: avgRating,
      };
    }) ?? [];

  let typicalSchedule: any = null;
  if (truck.typicalschedule) {
    try {
      typicalSchedule =
        typeof truck.typicalschedule === "string"
          ? JSON.parse(truck.typicalschedule)
          : truck.typicalschedule;
    } catch {
      typicalSchedule = null;
    }
  }

  return {
    id: truck.id,
    name: truck.name,
    description: truck.description,
    cuisineType: truck.cuisinetype,
    imageUrl: truck.imageurl,
    venmoHandle: truck.venmohandle,
    defaultLocation: truck.defaultlocation,
    defaultLatitude: truck.defaultlatitude,
    defaultLongitude: truck.defaultlongitude,
    typicalSchedule,
    latestStatus: null,
    menuItems,
  };
}

export async function createMenuItem(
  truckId: string,
  payload: {
    name: string;
    description?: string;
    priceCents?: number;
    isFeatured?: boolean;
  }
): Promise<MenuItem> {
  const id = generateUUID();

  const { error } = await supabase.from("menuitem").insert({
    id,
    name: payload.name,
    description: payload.description ?? null,
    pricecents: payload.priceCents ?? null,
    imageurl: null,
    truckid: truckId,
    isfeatured: payload.isFeatured ? 1 : 0,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to create menu item");
  }

  return {
    id,
    name: payload.name,
    description: payload.description ?? null,
    priceCents: payload.priceCents ?? null,
    imageUrl: null,
    averageRating: null,
    isFeatured: payload.isFeatured || false,
  };
}

export async function updateMenuItem(
  menuItemId: string,
  payload: {
    name?: string;
    description?: string;
    priceCents?: number;
    isFeatured?: boolean;
  }
): Promise<MenuItem> {
  const { data: current, error: currentError } = await supabase
    .from("menuitem")
    .select("name, description, pricecents, isfeatured")
    .eq("id", menuItemId)
    .maybeSingle();

  if (currentError) {
    console.error(currentError);
    throw new Error("Failed to fetch menu item");
  }
  if (!current) {
    throw new Error("Menu item not found");
  }

  const name = payload.name ?? (current.name as string);
  const description =
    payload.description !== undefined
      ? payload.description
      : (current.description as string | null);
  const priceCents =
    payload.priceCents !== undefined
      ? payload.priceCents
      : (current.pricecents as number | null);
  const isFeatured =
    payload.isFeatured !== undefined
      ? payload.isFeatured
      : current.isfeatured === 1 || current.isfeatured === true;

  const { error: updateError } = await supabase
    .from("menuitem")
    .update({
      name,
      description,
      pricecents: priceCents,
      isfeatured: isFeatured ? 1 : 0,
    })
    .eq("id", menuItemId);

  if (updateError) {
    console.error(updateError);
    throw new Error("Failed to update menu item");
  }

  return {
    id: menuItemId,
    name,
    description,
    priceCents,
    imageUrl: null,
    averageRating: null,
    isFeatured,
  };
}

export async function deleteMenuItem(menuItemId: string): Promise<void> {
  const { error } = await supabase
    .from("menuitem")
    .delete()
    .eq("id", menuItemId);

  if (error) {
    console.error(error);
    throw new Error("Failed to delete menu item");
  }
}

// ---------- User registration & login ----------

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  strikeCount: number;
  isBanned: boolean;
}

export async function registerUser(payload: {
  username: string;
  email: string;
  phoneNumber: string;
  password: string;
}): Promise<{
  token: string;
  user: User;
}> {
  // Check unique constraints manually (or rely on DB unique + catch error)
  const [
    { data: existingUsername, error: userNameError },
    { data: existingEmail, error: emailError },
    { data: existingPhone, error: phoneError },
  ] = await Promise.all([
    supabase.from("user").select("id").eq("username", payload.username),
    supabase.from("user").select("id").eq("email", payload.email),
    supabase.from("user").select("id").eq("phonenumber", payload.phoneNumber),
  ]);

  if (userNameError || emailError || phoneError) {
    console.error(userNameError || emailError || phoneError);
    throw new Error("Failed to check user uniqueness");
  }

  if (existingUsername && existingUsername.length > 0) {
    throw new Error("Username already taken");
  }
  if (existingEmail && existingEmail.length > 0) {
    throw new Error("Email already registered");
  }
  if (existingPhone && existingPhone.length > 0) {
    throw new Error("Phone number already registered");
  }

  const id = generateUUID();
  const passwordHash = await hashPassword(payload.password);
  const now = new Date().toISOString();

  const { error: insertError } = await supabase.from("user").insert({
    id,
    username: payload.username,
    email: payload.email,
    phonenumber: payload.phoneNumber,
    passwordhash: passwordHash,
    strikecount: 0,
    isbanned: 0,
    createdat: now,
  });

  if (insertError) {
    console.error(insertError);
    throw new Error("Failed to register user");
  }

  const token = btoa(JSON.stringify({ id, username: payload.username }));

  return {
    token,
    user: {
      id,
      username: payload.username,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      strikeCount: 0,
      isBanned: false,
    },
  };
}

export async function loginUser(payload: {
  emailOrPhone: string;
  password: string;
}): Promise<{
  token: string;
  user: User;
}> {
  const { data, error } = await supabase
    .from("user")
    .select(
      "id, username, email, phonenumber, passwordhash, strikecount, isbanned"
    )
    .or(
      `email.eq.${payload.emailOrPhone},phonenumber.eq.${payload.emailOrPhone}`
    )
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Failed to login");
  }
  if (!data) {
    throw new Error("Invalid credentials");
  }

  const isValid = await verifyPassword(payload.password, data.passwordhash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  if (data.isbanned) {
    throw new Error("Your account has been banned");
  }

  const token = btoa(JSON.stringify({ id: data.id, username: data.username }));

  return {
    token,
    user: {
      id: data.id,
      username: data.username,
      email: data.email,
      phoneNumber: data.phonenumber,
      strikeCount: data.strikecount,
      isBanned: !!data.isbanned,
    },
  };
}

export async function fetchUserProfile(token: string): Promise<User> {
  let userId: string;
  try {
    const decoded = JSON.parse(atob(token));
    userId = decoded.id;
  } catch {
    throw new Error("Invalid token");
  }

  const { data, error } = await supabase
    .from("user")
    .select("id, username, email, phonenumber, strikecount, isbanned")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch user profile");
  }
  if (!data) {
    throw new Error("User not found");
  }

  return {
    id: data.id,
    username: data.username,
    email: data.email,
    phoneNumber: data.phonenumber,
    strikeCount: data.strikecount,
    isBanned: !!data.isbanned,
  };
}

// ---------- Flagging & moderation (owners) ----------

export async function flagStatusUpdate(
  statusUpdateId: string,
  ownerToken: string
): Promise<void> {
  let ownerId: string;
  try {
    const decoded = JSON.parse(atob(ownerToken));
    ownerId = decoded.id;
  } catch {
    throw new Error("Invalid owner token");
  }

  // Get the status update and its truck
  const { data: statusRow, error: statusError } = await supabase
    .from("statusupdate")
    .select("userid, truckid")
    .eq("id", statusUpdateId)
    .maybeSingle();

  if (statusError) {
    console.error(statusError);
    throw new Error("Failed to fetch status update");
  }
  if (!statusRow) {
    throw new Error("Status update not found");
  }

  const userId = statusRow.userid as string | null;
  const truckId = statusRow.truckid as string;

  // Verify owner has access to this truck
  const { data: access, error: accessError } = await supabase
    .from("ownertruckaccess")
    .select("id")
    .eq("ownerid", ownerId)
    .eq("truckid", truckId);

  if (accessError) {
    console.error(accessError);
    throw new Error("Failed to verify permissions");
  }
  if (!access || access.length === 0) {
    throw new Error("You don't have permission to flag updates for this truck");
  }

  if (!userId) {
    throw new Error("Cannot flag anonymous updates");
  }

  // Flag the status update
const { error: updateStatusError } = await supabase
  .from("statusupdate")
  .update({ isflagged: 1 })
  .eq("id", statusUpdateId);


  if (updateStatusError) {
    console.error(updateStatusError);
    throw new Error("Failed to flag status update");
  }

  // Increment user strike count & possibly ban
  const { data: userRow, error: userError } = await supabase
    .from("user")
    .select("strikecount")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to fetch user for strike update");
  }

  if (userRow) {
    const currentStrikes = userRow.strikecount as number;
    const newStrikes = currentStrikes + 1;
    const { error: updateUserError } = await supabase
      .from("user")
      .update({
        strikecount: newStrikes,
        isbanned: newStrikes >= 3 ? 1 : 0,
      })
      .eq("id", userId);

    if (updateUserError) {
      console.error(updateUserError);
      throw new Error("Failed to update user strike count");
    }
  }
}

export async function flagMenuReview(
  reviewId: string,
  ownerToken: string
): Promise<void> {
  let ownerId: string;
  try {
    const decoded = JSON.parse(atob(ownerToken));
    ownerId = decoded.id;
  } catch {
    throw new Error("Invalid owner token");
  }

  // Get the review and its menu item's truck
  const { data: reviewRow, error: reviewError } = await supabase
    .from("menureview")
    .select("userid, menuitemid")
    .eq("id", reviewId)
    .maybeSingle();

  if (reviewError) {
    console.error(reviewError);
    throw new Error("Failed to fetch review");
  }
  if (!reviewRow) {
    throw new Error("Review not found");
  }

  const userId = reviewRow.userid as string | null;
  const menuItemId = reviewRow.menuitemid as string;

  const { data: menuItemRow, error: menuItemError } = await supabase
    .from("menuitem")
    .select("truckid")
    .eq("id", menuItemId)
    .maybeSingle();

  if (menuItemError) {
    console.error(menuItemError);
    throw new Error("Failed to fetch menu item for review");
  }
  if (!menuItemRow) {
    throw new Error("Menu item for review not found");
  }

  const truckId = menuItemRow.truckid as string;

  // Verify owner has access to this truck
  const { data: access, error: accessError } = await supabase
    .from("ownertruckaccess")
    .select("id")
    .eq("ownerid", ownerId)
    .eq("truckid", truckId);

  if (accessError) {
    console.error(accessError);
    throw new Error("Failed to verify permissions");
  }
  if (!access || access.length === 0) {
    throw new Error("You don't have permission to flag reviews for this truck");
  }

  if (!userId) {
    throw new Error("Cannot flag anonymous reviews");
  }

  // Flag the review
const { error: updateReviewError } = await supabase
  .from("menureview")
  .update({ isflagged: 1 })
  .eq("id", reviewId);

  if (updateReviewError) {
    console.error(updateReviewError);
    throw new Error("Failed to flag review");
  }

  // Increment user strike count & possibly ban
  const { data: userRow, error: userError } = await supabase
    .from("user")
    .select("strikecount")
    .eq("id", userId)
    .maybeSingle();

  if (userError) {
    console.error(userError);
    throw new Error("Failed to fetch user for strike update");
  }

  if (userRow) {
    const currentStrikes = userRow.strikecount as number;
    const newStrikes = currentStrikes + 1;
    const { error: updateUserError } = await supabase
      .from("user")
      .update({
        strikecount: newStrikes,
        isbanned: newStrikes >= 3 ? 1 : 0,
      })
      .eq("id", userId);

    if (updateUserError) {
      console.error(updateUserError);
      throw new Error("Failed to update user strike count");
    }
  }
}

// Get status updates for a truck (for owners to view & flag)
export async function fetchTruckStatusUpdates(
  truckId: string,
  ownerToken: string
): Promise<StatusUpdate[]> {
  let ownerId: string;
  try {
    const decoded = JSON.parse(atob(ownerToken));
    ownerId = decoded.id;
  } catch {
    throw new Error("Invalid owner token");
  }

  // Verify owner has access
  const { data: access, error: accessError } = await supabase
    .from("ownertruckaccess")
    .select("id")
    .eq("ownerid", ownerId)
    .eq("truckid", truckId);

  if (accessError) {
    console.error(accessError);
    throw new Error("Failed to verify permissions");
  }
  if (!access || access.length === 0) {
    throw new Error("You don't have permission to view updates for this truck");
  }

  const { data, error } = await supabase
    .from("statusupdate")
    .select(
      "id, status, note, reportername, latitude, longitude, createdat, source, userid, isflagged"
    )
    .eq("truckid", truckId)
    .order("createdat", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch status updates");
  }

  const updates: StatusUpdate[] =
    (data || []).map((row: any) => ({
      id: row.id,
      status: row.status,
      note: row.note,
      reporterName: row.reportername,
      latitude: row.latitude,
      longitude: row.longitude,
      createdAt: row.createdat,
      source: row.source,
      userId: row.userid ?? null,
      isFlagged: row.isflagged === 1 || row.isflagged === true,
    })) ?? [];

  return updates;
}

// Get menu reviews for a truck (for owners to view & flag)
export async function fetchTruckMenuReviews(
  truckId: string,
  ownerToken: string
): Promise<MenuReview[]> {
  let ownerId: string;
  try {
    const decoded = JSON.parse(atob(ownerToken));
    ownerId = decoded.id;
  } catch {
    throw new Error("Invalid owner token");
  }

  // Verify owner has access
  const { data: access, error: accessError } = await supabase
    .from("ownertruckaccess")
    .select("id")
    .eq("ownerid", ownerId)
    .eq("truckid", truckId);

  if (accessError) {
    console.error(accessError);
    throw new Error("Failed to verify permissions");
  }
  if (!access || access.length === 0) {
    throw new Error("You don't have permission to view reviews for this truck");
  }

  // Get menu item IDs for this truck
  const { data: menuItems, error: menuError } = await supabase
    .from("menuitem")
    .select("id")
    .eq("truckid", truckId);

  if (menuError) {
    console.error(menuError);
    throw new Error("Failed to fetch menu items for truck");
  }

  const menuItemIds = (menuItems || []).map((m: any) => m.id as string);
  if (menuItemIds.length === 0) return [];

  const { data, error } = await supabase
    .from("menureview")
    .select("id, rating, comment, reportername, createdat, userid, isflagged")
    .in("menuitemid", menuItemIds)
    .order("createdat", { ascending: false });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch reviews");
  }

  const reviews: MenuReview[] =
    (data || []).map((row: any) => ({
      id: row.id,
      rating: row.rating,
      comment: row.comment,
      reporterName: row.reportername,
      createdAt: row.createdat,
      userId: row.userid ?? null,
      isFlagged: row.isflagged === 1 || row.isflagged === true,
    })) ?? [];

  return reviews;
}
