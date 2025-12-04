import initSqlJs from "sql.js";
import type { Database } from "sql.js";

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

let db: Database | null = null;
let dbInitialized = false;

const DB_STORAGE_KEY = "streeteats_db";
const DB_VERSION_KEY = "streeteats_db_version";
const CURRENT_VERSION = 3; // Incremented to add individual owner accounts per truck

async function initDatabase(): Promise<Database> {
  if (db && dbInitialized) {
    return db;
  }

  const SQL = await initSqlJs({
    locateFile: (file: string) => {
      // Use CDN for production, local for dev
      if (import.meta.env.PROD) {
        return `https://sql.js.org/dist/${file}`;
      }
      return `https://sql.js.org/dist/${file}`;
    },
  });

  // Check database version - if outdated, clear and recreate
  const storedVersion = localStorage.getItem(DB_VERSION_KEY);
  if (storedVersion && parseInt(storedVersion) < CURRENT_VERSION) {
    console.log(`Database version ${storedVersion} is outdated. Updating to version ${CURRENT_VERSION}...`);
    localStorage.removeItem(DB_STORAGE_KEY);
    localStorage.removeItem(DB_VERSION_KEY);
  }

  // Try to load from localStorage
  const stored = localStorage.getItem(DB_STORAGE_KEY);
  if (stored) {
    try {
      const uint8Array = new Uint8Array(JSON.parse(stored));
      db = new SQL.Database(uint8Array);
      // Verify version matches
      const currentStoredVersion = localStorage.getItem(DB_VERSION_KEY);
      if (currentStoredVersion && parseInt(currentStoredVersion) === CURRENT_VERSION) {
        dbInitialized = true;
        return db;
      } else {
        // Version mismatch, recreate database
        console.log("Database version mismatch, recreating...");
        localStorage.removeItem(DB_STORAGE_KEY);
        localStorage.removeItem(DB_VERSION_KEY);
        db = null;
      }
    } catch (e) {
      console.warn("Failed to load database from storage, creating new one", e);
      localStorage.removeItem(DB_STORAGE_KEY);
      localStorage.removeItem(DB_VERSION_KEY);
    }
  }

  // Create new database
  db = new SQL.Database();
  await createTables(db);
  await seedDatabase(db);
  saveDatabase();
  dbInitialized = true;
  return db;
}

function saveDatabase() {
  if (!db) return;
  try {
    const data = db.export();
    const array = Array.from(data);
    localStorage.setItem(DB_STORAGE_KEY, JSON.stringify(array));
    localStorage.setItem(DB_VERSION_KEY, CURRENT_VERSION.toString());
  } catch (e) {
    console.error("Failed to save database", e);
  }
}

async function createTables(db: Database) {
  db.run(`
    CREATE TABLE IF NOT EXISTS FoodTruck (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      cuisineType TEXT,
      imageUrl TEXT,
      venmoHandle TEXT,
      defaultLocation TEXT,
      defaultLatitude REAL,
      defaultLongitude REAL,
      typicalSchedule TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS Owner (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT NOT NULL,
      createdAt TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS OwnerTruckAccess (
      id TEXT PRIMARY KEY,
      ownerId TEXT NOT NULL,
      truckId TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'OWNER',
      createdAt TEXT NOT NULL,
      FOREIGN KEY (ownerId) REFERENCES Owner(id) ON DELETE CASCADE,
      FOREIGN KEY (truckId) REFERENCES FoodTruck(id) ON DELETE CASCADE,
      UNIQUE(ownerId, truckId)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS MenuItem (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      priceCents INTEGER,
      imageUrl TEXT,
      truckId TEXT NOT NULL,
      isFeatured INTEGER NOT NULL DEFAULT 0,
      FOREIGN KEY (truckId) REFERENCES FoodTruck(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS MenuReview (
      id TEXT PRIMARY KEY,
      menuItemId TEXT NOT NULL,
      rating INTEGER NOT NULL,
      tasteRating INTEGER,
      valueRating INTEGER,
      comment TEXT,
      photoUrl TEXT,
      reporterName TEXT,
      createdAt TEXT NOT NULL,
      locationSource TEXT,
      FOREIGN KEY (menuItemId) REFERENCES MenuItem(id) ON DELETE CASCADE
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS StatusUpdate (
      id TEXT PRIMARY KEY,
      truckId TEXT NOT NULL,
      status TEXT NOT NULL,
      latitude REAL,
      longitude REAL,
      note TEXT,
      reporterName TEXT,
      reliability REAL,
      photoUrl TEXT,
      createdAt TEXT NOT NULL,
      source TEXT NOT NULL DEFAULT 'CROWD',
      FOREIGN KEY (truckId) REFERENCES FoodTruck(id) ON DELETE CASCADE
    )
  `);

  db.run(`CREATE INDEX IF NOT EXISTS idx_status_truck ON StatusUpdate(truckId, createdAt DESC)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_review_item ON MenuReview(menuItemId, createdAt DESC)`);
}

async function seedDatabase(db: Database) {
  // Check if already seeded
  const result = db.exec("SELECT COUNT(*) as count FROM FoodTruck");
  if (result.length > 0 && result[0].values.length > 0) {
    const count = result[0].values[0][0];
    if (typeof count === "number" && count > 0) {
      return; // Already seeded
    }
  }

  const now = new Date().toISOString();
  const trucks = [
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
    {
      name: "Lyn's",
      description: "Breakfast classics and campus-favorite cheesesteaks. South side of Spruce at 36th St, near CHOP / Lower Quad.",
      cuisineType: "Breakfast",
      imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "3600 Spruce St, Philadelphia, PA 19104 (south side of Spruce at 36th St, near CHOP / Lower Quad)",
      defaultLatitude: 39.9516,
      defaultLongitude: -75.1949,
      venmoHandle: null,
      menuItems: [
        { name: "Bacon, Egg & Cheese (long roll)", priceCents: 600 },
        { name: "Sausage, Egg & Cheese (long roll or potato bread)", priceCents: 600 },
        { name: "Mixed Veggie, Egg & Cheese w/ avocado (+$0.50)", priceCents: 700 },
        { name: "Cheesesteak Special", priceCents: 950, isFeatured: true },
      ],
    },
    {
      name: "Sopoong",
      description: "Korean lunch plates including kimbap, bulgogi, and spicy pork. Near 298 S University Ave / 38th & Spruce area (by the Wawa).",
      cuisineType: "Korean",
      imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "Near 298 S University Ave / 38th & Spruce area (by the Wawa)",
      defaultLatitude: 39.9520,
      defaultLongitude: -75.1970,
      venmoHandle: null,
      menuItems: [
        { name: "Kimbap (Korean rolls, various fillings)", priceCents: 900 },
        { name: "Bulgogi over Rice", priceCents: 900 },
        { name: "Spicy Pork over Rice", priceCents: 900, isFeatured: true },
        { name: "Other Korean lunch plates (e.g., chicken, tofu)", priceCents: 900 },
      ],
    },
    {
      name: "Kami",
      description: "Korean bibimbap and noodles. In front of Drexel's Hagerty Library (short walk from Penn).",
      cuisineType: "Korean",
      imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "33rd & Market St, Philadelphia, PA 19104 (in front of Drexel's Hagerty Library)",
      defaultLatitude: 39.9555,
      defaultLongitude: -75.1910,
      venmoHandle: null,
      menuItems: [
        { name: "Bibimbap (various meats or veggie)", priceCents: 950 },
        { name: "Bulgogi Beef w/ Udon Noodles", priceCents: 950 },
        { name: "Spicy Pork Bibimbap", priceCents: 950, isFeatured: true },
        { name: "Vegetable Bibimbap (meat-free)", priceCents: 850 },
      ],
    },
    {
      name: "Caribbean Feast",
      description: "Jamaican and Caribbean cuisine. West side of 38th St between Spruce & Locust (same block as Don Memo).",
      cuisineType: "Caribbean",
      imageUrl: "https://images.unsplash.com/photo-1528832992873-5bb578167d94?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "West side of 38th St between Spruce & Locust (same block as Don Memo)",
      defaultLatitude: 39.9532,
      defaultLongitude: -75.1980,
      venmoHandle: null,
      menuItems: [
        { name: "Jerk Chicken Plate (with rice & peas + sides)", priceCents: 1300, isFeatured: true },
        { name: "Curry Chicken Plate", priceCents: 1300 },
        { name: "Jerk Chicken Sandwich / Wrap", priceCents: 1000 },
        { name: "Beef or Chicken Patty", priceCents: 425 },
      ],
    },
  ];

  const truckIds: Record<string, string> = {};

  for (const truck of trucks) {
    const truckId = generateUUID();
    truckIds[truck.name] = truckId;

    db.run(
      `INSERT INTO FoodTruck (id, name, description, cuisineType, imageUrl, venmoHandle, defaultLocation, defaultLatitude, defaultLongitude, typicalSchedule, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        truckId,
        truck.name,
        truck.description || null,
        truck.cuisineType || null,
        truck.imageUrl || null,
        truck.venmoHandle || null,
        truck.defaultLocation || null,
        truck.defaultLatitude || null,
        truck.defaultLongitude || null,
        null,
        now,
        now,
      ]
    );

    for (const item of truck.menuItems) {
      const itemId = generateUUID();
      db.run(
        `INSERT INTO MenuItem (id, name, description, priceCents, imageUrl, truckId, isFeatured)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          itemId,
          item.name,
          (item as any).description || null,
          item.priceCents || null,
          null,
          truckId,
          (item as any).isFeatured ? 1 : 0,
        ]
      );
    }

    const statusId = generateUUID();
    db.run(
      `INSERT INTO StatusUpdate (id, truckId, status, note, reporterName, latitude, longitude, reliability, source, createdAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        statusId,
        truckId,
        "OPEN",
        "Serving lunch until 3pm",
        "StreetEats Team",
        truck.defaultLatitude || null,
        truck.defaultLongitude || null,
        0.9,
        "ADMIN",
        now,
      ]
    );
  }

  // Create one owner account for each truck
  const ownerCredentials: Array<{ truckName: string; email: string; password: string }> = [
    { truckName: "Tacos Don Memo", email: "tacosdonmemo@streeteats.test", password: "tacos1234" },
    { truckName: "Tyson Bees", email: "tysonbees@streeteats.test", password: "tyson1234" },
    { truckName: "Hemo's", email: "hemos@streeteats.test", password: "hemos1234" },
    { truckName: "Lyn's", email: "lyns@streeteats.test", password: "lyns1234" },
    { truckName: "Sopoong", email: "sopoong@streeteats.test", password: "sopoong1234" },
    { truckName: "Kami", email: "kami@streeteats.test", password: "kami1234" },
    { truckName: "Caribbean Feast", email: "caribbeanfeast@streeteats.test", password: "caribbean1234" },
  ];

  for (const cred of ownerCredentials) {
    if (truckIds[cred.truckName]) {
      const ownerId = generateUUID();
      const passwordHash = await hashPassword(cred.password);
      const ownerName = cred.truckName + " Owner";
      
      db.run(
        `INSERT INTO Owner (id, name, email, passwordHash, createdAt)
         VALUES (?, ?, ?, ?, ?)`,
        [ownerId, ownerName, cred.email, passwordHash, now]
      );

      const accessId = generateUUID();
      db.run(
        `INSERT INTO OwnerTruckAccess (id, ownerId, truckId, role, createdAt)
         VALUES (?, ?, ?, ?, ?)`,
        [accessId, ownerId, truckIds[cred.truckName], "OWNER", now]
      );
    }
  }
}

// API replacement functions
export async function getDatabase(): Promise<Database> {
  return await initDatabase();
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
}

export interface MenuReview {
  id: string;
  rating: number;
  comment?: string | null;
  reporterName?: string | null;
  createdAt: string;
}

export async function fetchTrucks(): Promise<FoodTruck[]> {
  const database = await getDatabase();
  const trucksResult = database.exec(`
    SELECT id, name, description, cuisineType, imageUrl, venmoHandle, defaultLocation, 
           defaultLatitude, defaultLongitude, typicalSchedule
    FROM FoodTruck
    ORDER BY name ASC
  `);

  if (trucksResult.length === 0) return [];

  const trucks: FoodTruck[] = [];
  const rows = trucksResult[0].values;

  for (const row of rows) {
    const truckId = row[0] as string;
    
    // Get latest status
    const statusResult = database.exec(`
      SELECT id, status, note, reporterName, latitude, longitude, createdAt, source
      FROM StatusUpdate
      WHERE truckId = ?
      ORDER BY createdAt DESC
      LIMIT 1
    `, [truckId]);

    let latestStatus: StatusUpdate | null = null;
    if (statusResult.length > 0 && statusResult[0].values.length > 0) {
      const s = statusResult[0].values[0];
      latestStatus = {
        id: s[0] as string,
        status: s[1] as any,
        note: s[2] as string | null,
        reporterName: s[3] as string | null,
        latitude: s[4] as number | null,
        longitude: s[5] as number | null,
        createdAt: s[6] as string,
        source: s[7] as string,
      };
    }

    // Get menu items with average ratings
    const itemsResult = database.exec(`
      SELECT m.id, m.name, m.description, m.priceCents, m.imageUrl, m.isFeatured,
             AVG(r.rating) as avgRating
      FROM MenuItem m
      LEFT JOIN MenuReview r ON m.id = r.menuItemId
      WHERE m.truckId = ?
      GROUP BY m.id
    `, [truckId]);

    const menuItems: MenuItem[] = [];
    if (itemsResult.length > 0) {
      for (const itemRow of itemsResult[0].values) {
        menuItems.push({
          id: itemRow[0] as string,
          name: itemRow[1] as string,
          description: itemRow[2] as string | null,
          priceCents: itemRow[3] as number | null,
          imageUrl: itemRow[4] as string | null,
          isFeatured: (itemRow[5] as number) === 1,
          averageRating: itemRow[6] ? Number(itemRow[6]) : null,
        });
      }
    }

    let typicalSchedule = null;
    if (row[9]) {
      try {
        typicalSchedule = JSON.parse(row[9] as string);
      } catch (e) {
        // Ignore parse errors
      }
    }

    trucks.push({
      id: truckId,
      name: row[1] as string,
      description: row[2] as string | null,
      cuisineType: row[3] as string | null,
      imageUrl: row[4] as string | null,
      venmoHandle: row[5] as string | null,
      defaultLocation: row[6] as string | null,
      defaultLatitude: row[7] as number | null,
      defaultLongitude: row[8] as number | null,
      typicalSchedule,
      latestStatus,
      menuItems,
    });
  }

  saveDatabase();
  return trucks;
}

export async function postStatusUpdate(
  truckId: string,
  payload: {
    status: "OPEN" | "CLOSED" | "MOVED" | "UNKNOWN";
    note?: string;
    reporterName?: string;
    latitude?: number;
    longitude?: number;
  }
): Promise<StatusUpdate> {
  const database = await getDatabase();
  const id = generateUUID();
  const now = new Date().toISOString();

  database.run(
    `INSERT INTO StatusUpdate (id, truckId, status, note, reporterName, latitude, longitude, source, createdAt)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      truckId,
      payload.status,
      payload.note || null,
      payload.reporterName || null,
      payload.latitude || null,
      payload.longitude || null,
      "CROWD",
      now,
    ]
  );

  saveDatabase();

  return {
    id,
    status: payload.status,
    note: payload.note || null,
    reporterName: payload.reporterName || null,
    latitude: payload.latitude || null,
    longitude: payload.longitude || null,
    createdAt: now,
    source: "CROWD",
  };
}

export async function postMenuReview(
  _truckId: string,
  payload: {
    menuItemId: string;
    rating: number;
    comment?: string;
    reporterName?: string;
  }
): Promise<MenuReview> {
  const database = await getDatabase();
  const id = generateUUID();
  const now = new Date().toISOString();

  database.run(
    `INSERT INTO MenuReview (id, menuItemId, rating, comment, reporterName, createdAt)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, payload.menuItemId, payload.rating, payload.comment || null, payload.reporterName || null, now]
  );

  saveDatabase();

  return {
    id,
    rating: payload.rating,
    comment: payload.comment || null,
    reporterName: payload.reporterName || null,
    createdAt: now,
  };
}

export async function loginOwner(payload: { email: string; password: string }): Promise<{
  token: string;
  owner: { id: string; email: string; name?: string };
}> {
  const database = await getDatabase();
  const result = database.exec(`SELECT id, name, email, passwordHash FROM Owner WHERE email = ?`, [payload.email]);

  if (result.length === 0 || result[0].values.length === 0) {
    throw new Error("Invalid credentials");
  }

  const row = result[0].values[0];
  const passwordHash = row[3] as string;
  const isValid = await verifyPassword(payload.password, passwordHash);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  // Simple token (in production, use proper JWT)
  const token = btoa(JSON.stringify({ id: row[0], email: row[2] }));

  return {
    token,
    owner: {
      id: row[0] as string,
      email: row[2] as string,
      name: row[1] as string,
    },
  };
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

export async function fetchOwnerProfile(token: string): Promise<OwnerProfile> {
  const database = await getDatabase();
  
  let ownerId: string;
  try {
    const decoded = JSON.parse(atob(token));
    ownerId = decoded.id;
  } catch {
    throw new Error("Invalid token");
  }

  const ownerResult = database.exec(`SELECT id, name, email FROM Owner WHERE id = ?`, [ownerId]);
  if (ownerResult.length === 0 || ownerResult[0].values.length === 0) {
    throw new Error("Owner not found");
  }

  const ownerRow = ownerResult[0].values[0];
  const accessResult = database.exec(`
    SELECT t.id, t.name, t.defaultLocation, t.cuisineType, t.typicalSchedule, 
           t.defaultLatitude, t.defaultLongitude, a.role
    FROM OwnerTruckAccess a
    JOIN FoodTruck t ON a.truckId = t.id
    WHERE a.ownerId = ?
  `, [ownerId]);

  const trucks: OwnerTruckSummary[] = [];
  if (accessResult.length > 0) {
    for (const row of accessResult[0].values) {
      let typicalSchedule: any[] = [];
      if (row[4]) {
        try {
          typicalSchedule = JSON.parse(row[4] as string);
        } catch (e) {
          // Ignore
        }
      }

      trucks.push({
        id: row[0] as string,
        name: row[1] as string,
        defaultLocation: row[2] as string | null,
        cuisineType: row[3] as string | null,
        role: row[7] as "OWNER" | "MANAGER",
        typicalSchedule,
        defaultLatitude: row[5] as number | null,
        defaultLongitude: row[6] as number | null,
      });
    }
  }

  return {
    id: ownerRow[0] as string,
    name: ownerRow[1] as string,
    email: ownerRow[2] as string,
    trucks,
  };
}

export interface ScheduleEntry {
  day: string;
  open: string;
  close: string;
}

export async function updateTruckHours(
  truckId: string,
  schedule: ScheduleEntry[]
): Promise<{ truckId: string; typicalSchedule: ScheduleEntry[] }> {
  const database = await getDatabase();
  const scheduleJson = JSON.stringify(schedule);

  database.run(`UPDATE FoodTruck SET typicalSchedule = ?, updatedAt = ? WHERE id = ?`, [
    scheduleJson,
    new Date().toISOString(),
    truckId,
  ]);

  saveDatabase();

  return {
    truckId,
    typicalSchedule: schedule,
  };
}

export async function updateTruckDescription(
  truckId: string,
  description: string
): Promise<{ truckId: string; description: string }> {
  const database = await getDatabase();

  database.run(`UPDATE FoodTruck SET description = ?, updatedAt = ? WHERE id = ?`, [
    description,
    new Date().toISOString(),
    truckId,
  ]);

  saveDatabase();

  return {
    truckId,
    description,
  };
}

export async function fetchTruckForOwner(truckId: string): Promise<FoodTruck> {
  const database = await getDatabase();
  const truckResult = database.exec(`
    SELECT id, name, description, cuisineType, imageUrl, venmoHandle, defaultLocation, 
           defaultLatitude, defaultLongitude, typicalSchedule
    FROM FoodTruck
    WHERE id = ?
  `, [truckId]);

  if (truckResult.length === 0 || truckResult[0].values.length === 0) {
    throw new Error("Truck not found");
  }

  const row = truckResult[0].values[0];
  const truckIdFromDb = row[0] as string;

  // Get menu items
  const itemsResult = database.exec(`
    SELECT m.id, m.name, m.description, m.priceCents, m.imageUrl, m.isFeatured,
           AVG(r.rating) as avgRating
    FROM MenuItem m
    LEFT JOIN MenuReview r ON m.id = r.menuItemId
    WHERE m.truckId = ?
    GROUP BY m.id
    ORDER BY m.isFeatured DESC, m.name ASC
  `, [truckIdFromDb]);

  const menuItems: MenuItem[] = [];
  if (itemsResult.length > 0) {
    for (const itemRow of itemsResult[0].values) {
      menuItems.push({
        id: itemRow[0] as string,
        name: itemRow[1] as string,
        description: itemRow[2] as string | null,
        priceCents: itemRow[3] as number | null,
        imageUrl: itemRow[4] as string | null,
        isFeatured: (itemRow[5] as number) === 1,
        averageRating: itemRow[6] ? Number(itemRow[6]) : null,
      });
    }
  }

  let typicalSchedule = null;
  if (row[9]) {
    try {
      typicalSchedule = JSON.parse(row[9] as string);
    } catch (e) {
      // Ignore parse errors
    }
  }

  return {
    id: truckIdFromDb,
    name: row[1] as string,
    description: row[2] as string | null,
    cuisineType: row[3] as string | null,
    imageUrl: row[4] as string | null,
    venmoHandle: row[5] as string | null,
    defaultLocation: row[6] as string | null,
    defaultLatitude: row[7] as number | null,
    defaultLongitude: row[8] as number | null,
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
  const database = await getDatabase();
  const id = generateUUID();

  database.run(
    `INSERT INTO MenuItem (id, name, description, priceCents, imageUrl, truckId, isFeatured)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      payload.name,
      payload.description || null,
      payload.priceCents || null,
      null,
      truckId,
      payload.isFeatured ? 1 : 0,
    ]
  );

  saveDatabase();

  return {
    id,
    name: payload.name,
    description: payload.description || null,
    priceCents: payload.priceCents || null,
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
  const database = await getDatabase();

  // Get current item to merge updates
  const currentResult = database.exec(
    `SELECT name, description, priceCents, isFeatured FROM MenuItem WHERE id = ?`,
    [menuItemId]
  );

  if (currentResult.length === 0 || currentResult[0].values.length === 0) {
    throw new Error("Menu item not found");
  }

  const current = currentResult[0].values[0];
  const name = payload.name ?? (current[0] as string);
  const description = payload.description !== undefined ? payload.description : (current[1] as string | null);
  const priceCents = payload.priceCents !== undefined ? payload.priceCents : (current[2] as number | null);
  const isFeatured = payload.isFeatured !== undefined ? payload.isFeatured : ((current[3] as number) === 1);

  database.run(
    `UPDATE MenuItem SET name = ?, description = ?, priceCents = ?, isFeatured = ? WHERE id = ?`,
    [name, description, priceCents, isFeatured ? 1 : 0, menuItemId]
  );

  saveDatabase();

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
  const database = await getDatabase();
  database.run(`DELETE FROM MenuItem WHERE id = ?`, [menuItemId]);
  saveDatabase();
}

