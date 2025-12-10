const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const generateId = () => crypto.randomUUID();

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error(
    "Missing Supabase configuration. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY for compatibility).",
  );
}

const headers = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json",
};

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

async function supabaseRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Supabase request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
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

export interface ScheduleEntry {
  day: string;
  open: string;
  close: string;
}

export interface User {
  id: string;
  username: string;
  email: string;
  phoneNumber: string;
  strikeCount: number;
  isBanned: boolean;
  createdAt: string;
}

function ensureTokenDecoded(token: string): { id: string } {
  try {
    return JSON.parse(atob(token));
  } catch (error) {
    console.error("Token decode failed", error);
    throw new Error("Invalid token");
  }
}

const seedTrucks = [
    {
      name: "Tacos Don Memo",
      description: "Authentic Mexican tacos, burritos, and more. West side of 38th between Spruce & Locust, under Locust Walk bridge.",
      cuisineType: "Mexican",
      imageUrl: "https://images.unsplash.com/photo-1608039829574-358155f866f5?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "270 S 38th St, Philadelphia, PA 19104 (west side of 38th between Spruce & Locust, under Locust Walk bridge)",
      defaultLatitude: 39.9534,
      defaultLongitude: -75.1981,
      venmoHandle: null,
      menuItems: [
        { name: "Taco (asada / pollo / pastor / carnitas, single)", priceCents: 500 },
        { name: "Burrito (choice of meat or veggie)", priceCents: 1350 },
        { name: "Quesadilla", priceCents: 1350 },
        { name: "Torta (Mexican sandwich)", priceCents: 1350 },
        { name: "Birria Tacos (3)", priceCents: 1800, isFeatured: true },
        { name: "Guacamole & Chips", priceCents: 1200 },
      ],
    },
    {
      name: "Tyson Bees",
      description: "Korean BBQ and Thai fusion. Korean BBQ beef short rib tacos, Thai basil chicken, and more.",
      cuisineType: "Korean",
      imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "33rd St & Spruce St, Philadelphia, PA 19104 (near Franklin Field / Penn Museum side)",
      defaultLatitude: 39.9524,
      defaultLongitude: -75.1931,
      venmoHandle: null,
      menuItems: [
        { name: "Korean BBQ Beef Short Rib Tacos (per taco)", priceCents: 425 },
        { name: "Thai Basil Chicken Tacos (per taco)", priceCents: 425 },
        { name: "Korean BBQ Beef Short Rib & Kimchi Burrito", priceCents: 1000 },
        { name: "BBQ Lemongrass Pork over Rice", priceCents: 950 },
        { name: "Thai Basil Chicken over Rice", priceCents: 950 },
        { name: "O.G. Dog (beef hot dog w/ short rib & kimchi)", priceCents: 700, isFeatured: true },
        { name: "Kimchi Dog / Beef Dog", priceCents: 700 },
      ],
    },
    {
      name: "Hemo's",
      description: "Breakfast sandwiches, shawarma, and cheesesteaks. South side of Spruce just below the 37th St entrance to the Quad.",
      cuisineType: "Middle Eastern",
      imageUrl: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15c?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "37th & Spruce St, Philadelphia, PA 19104 (south side of Spruce just below the 37th St entrance to the Quad)",
      defaultLatitude: 39.9524,
      defaultLongitude: -75.1931,
      venmoHandle: null,
      menuItems: [
        { name: "Egg & Cheese Sandwich (roll)", priceCents: 450 },
        { name: "Chicken Sausage, Egg & Cheese Sandwich", priceCents: 575 },
        { name: "Grilled Chicken \"Hemo's Shawarma\" Sandwich", priceCents: 900, isFeatured: true },
        { name: "Shawarma Combo (sandwich + fries / drink)", priceCents: 1300 },
        { name: "Cheesesteak (standard)", priceCents: 950 },
      ],
    },
  ];

async function seedDefaultData() {
  try {
    const trucks = await supabaseRequest<any[]>("FoodTruck?select=id&limit=1");
    if (trucks.length > 0) return;

    const now = new Date().toISOString();

    for (const truck of seedTrucks) {
      const truckId = generateId();
      await supabaseRequest("FoodTruck", {
        method: "POST",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({
          id: truckId,
          name: truck.name,
          description: truck.description,
          cuisineType: truck.cuisineType,
          imageUrl: truck.imageUrl,
          venmoHandle: truck.venmoHandle,
          defaultLocation: truck.defaultLocation,
          defaultLatitude: truck.defaultLatitude,
          defaultLongitude: truck.defaultLongitude,
          typicalSchedule: null,
          createdAt: now,
          updatedAt: now,
        }),
      });

      for (const item of truck.menuItems) {
        await supabaseRequest("MenuItem", {
          method: "POST",
          headers: { ...headers, Prefer: "return=minimal" },
          body: JSON.stringify({
            id: generateId(),
            name: item.name,
            description: (item as any).description ?? null,
            priceCents: item.priceCents ?? null,
            imageUrl: null,
            truckId,
            isFeatured: (item as any).isFeatured ? 1 : 0,
          }),
        });
      }

      await supabaseRequest("StatusUpdate", {
        method: "POST",
        headers: { ...headers, Prefer: "return=minimal" },
        body: JSON.stringify({
          id: generateId(),
          truckId,
          status: "OPEN",
          note: "Serving lunch until 3pm",
          reporterName: "StreetEats Team",
          latitude: truck.defaultLatitude,
          longitude: truck.defaultLongitude,
          reliability: 0.9,
          source: "ADMIN",
          createdAt: now,
          isFlagged: 0,
        }),
      });
    }
  } catch (error) {
    console.warn("Supabase seeding skipped; using local demo data instead.", error);
  }
}

function buildDemoTrucks(): FoodTruck[] {
  return seedTrucks.map((truck) => ({
    id: generateId(),
    name: truck.name,
    description: truck.description,
    cuisineType: truck.cuisineType,
    imageUrl: truck.imageUrl,
    venmoHandle: truck.venmoHandle,
    defaultLocation: truck.defaultLocation,
    defaultLatitude: truck.defaultLatitude,
    defaultLongitude: truck.defaultLongitude,
    typicalSchedule: null,
    latestStatus: {
      id: generateId(),
      status: "OPEN",
      note: "Serving lunch until 3pm",
      reporterName: "StreetEats Team",
      latitude: truck.defaultLatitude,
      longitude: truck.defaultLongitude,
      createdAt: new Date().toISOString(),
      source: "ADMIN",
      isFlagged: false,
    },
    menuItems: (truck.menuItems || []).map((item) => ({
      id: generateId(),
      name: item.name,
      description: (item as any).description ?? null,
      priceCents: item.priceCents ?? null,
      imageUrl: null,
      isFeatured: Boolean((item as any).isFeatured),
      averageRating: null,
    })),
  }));
}

function buildMenuItems(rawItems: any[]): MenuItem[] {
  return (rawItems || []).map((item) => {
    const reviews = (item.MenuReview || []) as any[];
    const ratings = reviews.filter((r) => !r.isFlagged).map((r) => r.rating as number);
    const averageRating = ratings.length ? ratings.reduce((a, b) => a + b, 0) / ratings.length : null;
    return {
      id: item.id,
      name: item.name,
      description: item.description,
      priceCents: item.priceCents,
      imageUrl: item.imageUrl,
      isFeatured: Boolean(item.isFeatured),
      averageRating,
    } as MenuItem;
  });
}

export async function fetchTrucks(): Promise<FoodTruck[]> {
  try {
    await seedDefaultData();

    const trucks = await supabaseRequest<any[]>(
      "FoodTruck?select=id,name,description,cuisineType,imageUrl,venmoHandle,defaultLocation,defaultLatitude,defaultLongitude,typicalSchedule,StatusUpdate(*),MenuItem(*,MenuReview(*))&order=name.asc"
    );

    return trucks.map((truck) => {
      const statuses = (truck.StatusUpdate || []) as any[];
      const latestStatus = statuses
        .filter((s) => !s.isFlagged)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

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
        typicalSchedule: truck.typicalSchedule,
        latestStatus: latestStatus
          ? {
              id: latestStatus.id,
              status: latestStatus.status,
              note: latestStatus.note,
              reporterName: latestStatus.reporterName,
              latitude: latestStatus.latitude,
              longitude: latestStatus.longitude,
              createdAt: latestStatus.createdAt,
              source: latestStatus.source,
              userId: latestStatus.userId,
              isFlagged: Boolean(latestStatus.isFlagged),
            }
          : null,
        menuItems: buildMenuItems(truck.MenuItem || []),
      } as FoodTruck;
    });
  } catch (error) {
    console.error("Falling back to demo data; Supabase fetch failed", error);
    return buildDemoTrucks();
  }
}

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
  const banned = await supabaseRequest<any[]>(`User?select=isBanned&id=eq.${userId}&limit=1`);
  if (banned[0]?.isBanned) {
    throw new Error("Your account has been banned. You cannot post updates.");
  }

  const id = generateId();
  const now = new Date().toISOString();

  await supabaseRequest("StatusUpdate", {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      id,
      truckId,
      userId,
      status: payload.status,
      note: payload.note ?? null,
      reporterName: payload.reporterName ?? null,
      latitude: payload.latitude ?? null,
      longitude: payload.longitude ?? null,
      source: "CROWD",
      createdAt: now,
      isFlagged: 0,
    }),
  });

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

export async function postMenuReview(
  _truckId: string,
  userId: string,
  payload: { menuItemId: string; rating: number; comment?: string; reporterName?: string }
): Promise<MenuReview> {
  const banned = await supabaseRequest<any[]>(`User?select=isBanned&id=eq.${userId}&limit=1`);
  if (banned[0]?.isBanned) {
    throw new Error("Your account has been banned. You cannot post reviews.");
  }

  const id = generateId();
  const now = new Date().toISOString();

  await supabaseRequest("MenuReview", {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      id,
      menuItemId: payload.menuItemId,
      userId,
      rating: payload.rating,
      comment: payload.comment ?? null,
      reporterName: payload.reporterName ?? null,
      createdAt: now,
      isFlagged: 0,
    }),
  });

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

export async function loginOwner(payload: { email: string; password: string }): Promise<{
  token: string;
  owner: { id: string; email: string; name?: string };
}> {
  const owners = await supabaseRequest<any[]>(`Owner?select=id,name,email,passwordHash&email=eq.${encodeURIComponent(payload.email)}&limit=1`);
  if (!owners.length) {
    throw new Error("Invalid credentials");
  }

  const owner = owners[0];
  const isValid = await verifyPassword(payload.password, owner.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = btoa(JSON.stringify({ id: owner.id, email: owner.email }));
  return { token, owner: { id: owner.id, email: owner.email, name: owner.name } };
}

export async function fetchOwnerProfile(token: string): Promise<OwnerProfile> {
  const decoded = ensureTokenDecoded(token);
  const owners = await supabaseRequest<any[]>(`Owner?select=id,name,email&id=eq.${decoded.id}&limit=1`);
  if (!owners.length) {
    throw new Error("Owner not found");
  }

  const trucks = await supabaseRequest<any[]>(
    `OwnerTruckAccess?select=role,truck:FoodTruck(id,name,defaultLocation,cuisineType,typicalSchedule,defaultLatitude,defaultLongitude)&ownerId=eq.${decoded.id}`
  );

  return {
    id: owners[0].id,
    name: owners[0].name,
    email: owners[0].email,
    trucks: trucks.map((t) => ({
      id: t.truck.id,
      name: t.truck.name,
      defaultLocation: t.truck.defaultLocation,
      cuisineType: t.truck.cuisineType,
      typicalSchedule: t.truck.typicalSchedule ?? [],
      defaultLatitude: t.truck.defaultLatitude,
      defaultLongitude: t.truck.defaultLongitude,
      role: t.role,
    })),
  };
}

export async function updateTruckHours(truckId: string, schedule: ScheduleEntry[]) {
  await supabaseRequest(`FoodTruck?id=eq.${truckId}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ typicalSchedule: schedule }),
  });
}

export async function updateTruckDescription(truckId: string, description: string) {
  await supabaseRequest(`FoodTruck?id=eq.${truckId}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ description }),
  });
}

export async function fetchTruckForOwner(truckId: string): Promise<FoodTruck> {
  const trucks = await supabaseRequest<FoodTruck[]>(`FoodTruck?select=*&id=eq.${truckId}&limit=1`);
  if (!trucks.length) {
    throw new Error("Truck not found");
  }
  return { ...trucks[0], menuItems: [] };
}

export async function createMenuItem(
  truckId: string,
  payload: { name: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> {
  const id = generateId();
  await supabaseRequest("MenuItem", {
    method: "POST",
    headers: { ...headers, Prefer: "return=representation" },
    body: JSON.stringify({
      id,
      truckId,
      name: payload.name,
      description: payload.description ?? null,
      priceCents: payload.priceCents ?? null,
      isFeatured: payload.isFeatured ? 1 : 0,
    }),
  });
  return {
    id,
    name: payload.name,
    description: payload.description ?? null,
    priceCents: payload.priceCents ?? null,
    imageUrl: null,
    isFeatured: Boolean(payload.isFeatured),
    averageRating: null,
  };
}

export async function updateMenuItem(
  menuItemId: string,
  payload: { name?: string; description?: string; priceCents?: number; isFeatured?: boolean }
): Promise<MenuItem> {
  await supabaseRequest(`MenuItem?id=eq.${menuItemId}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      ...payload,
      isFeatured: payload.isFeatured === undefined ? undefined : payload.isFeatured ? 1 : 0,
    }),
  });

  const items = await supabaseRequest<any[]>(`MenuItem?select=id,name,description,priceCents,imageUrl,isFeatured&id=eq.${menuItemId}&limit=1`);
  const item = items[0];
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    priceCents: item.priceCents,
    imageUrl: item.imageUrl,
    isFeatured: Boolean(item.isFeatured),
    averageRating: null,
  };
}

export async function deleteMenuItem(menuItemId: string): Promise<void> {
  await supabaseRequest(`MenuItem?id=eq.${menuItemId}`, {
    method: "DELETE",
    headers: { ...headers, Prefer: "return=minimal" },
  });
}

export async function registerUser(payload: { username: string; email: string; phoneNumber: string; password: string }) {
  const passwordHash = await hashPassword(payload.password);
  const id = generateId();
  const createdAt = new Date().toISOString();

  await supabaseRequest("User", {
    method: "POST",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({
      id,
      username: payload.username,
      email: payload.email,
      phoneNumber: payload.phoneNumber,
      passwordHash,
      strikeCount: 0,
      isBanned: 0,
      createdAt,
    }),
  });

  const token = btoa(JSON.stringify({ id, email: payload.email }));
  return { id, token };
}

export async function loginUser(payload: { emailOrPhone: string; password: string }) {
  const users = await supabaseRequest<any[]>(
    `User?select=id,username,email,phoneNumber,passwordHash&or=(email.eq.${encodeURIComponent(payload.emailOrPhone)},phoneNumber.eq.${encodeURIComponent(payload.emailOrPhone)})&limit=1`
  );
  if (!users.length) {
    throw new Error("Invalid credentials");
  }

  const user = users[0];
  const isValid = await verifyPassword(payload.password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = btoa(JSON.stringify({ id: user.id, email: user.email }));
  return { token };
}

export async function fetchUserProfile(token: string): Promise<User> {
  const decoded = ensureTokenDecoded(token);
  const users = await supabaseRequest<any[]>(`User?select=id,username,email,phoneNumber,strikeCount,isBanned,createdAt&id=eq.${decoded.id}&limit=1`);
  if (!users.length) {
    throw new Error("User not found");
  }

  const user = users[0];
  return {
    id: user.id,
    username: user.username,
    email: user.email,
    phoneNumber: user.phoneNumber,
    strikeCount: user.strikeCount,
    isBanned: Boolean(user.isBanned),
    createdAt: user.createdAt,
  };
}

export async function flagStatusUpdate(statusUpdateId: string): Promise<void> {
  await supabaseRequest(`StatusUpdate?id=eq.${statusUpdateId}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ isFlagged: 1 }),
  });
}

export async function flagMenuReview(reviewId: string): Promise<void> {
  await supabaseRequest(`MenuReview?id=eq.${reviewId}`, {
    method: "PATCH",
    headers: { ...headers, Prefer: "return=minimal" },
    body: JSON.stringify({ isFlagged: 1 }),
  });
}

export async function fetchTruckStatusUpdates(_truckId: string): Promise<StatusUpdate[]> {
  const updates = await supabaseRequest<any[]>(`StatusUpdate?truckId=eq.${_truckId}&isFlagged=eq.0&order=createdAt.desc`);
  return updates.map((u) => ({
    id: u.id,
    status: u.status,
    note: u.note,
    reporterName: u.reporterName,
    latitude: u.latitude,
    longitude: u.longitude,
    createdAt: u.createdAt,
    source: u.source,
    userId: u.userId,
    isFlagged: Boolean(u.isFlagged),
  }));
}

export async function fetchTruckMenuReviews(truckId: string): Promise<MenuReview[]> {
  const items = await supabaseRequest<any[]>(`MenuItem?select=id,MenuReview(*)&truckId=eq.${truckId}`);
  const reviews: MenuReview[] = [];
  for (const item of items) {
    for (const r of item.MenuReview || []) {
      if (r.isFlagged) continue;
      reviews.push({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        reporterName: r.reporterName,
        createdAt: r.createdAt,
        userId: r.userId,
        isFlagged: Boolean(r.isFlagged),
      });
    }
  }
  return reviews.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}
