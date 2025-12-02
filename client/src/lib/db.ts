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
const CURRENT_VERSION = 1;

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

  // Try to load from IndexedDB
  const stored = localStorage.getItem(DB_STORAGE_KEY);
  if (stored) {
    try {
      const uint8Array = new Uint8Array(JSON.parse(stored));
      db = new SQL.Database(uint8Array);
      dbInitialized = true;
      return db;
    } catch (e) {
      console.warn("Failed to load database from storage, creating new one", e);
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
      name: "Cucina Zapata",
      description: "Thai-Mex fusion staples with huge portions",
      cuisineType: "Thai-Mex",
      imageUrl: "https://images.unsplash.com/photo-1528832992873-5bb578167d94?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "Spruce & 37th",
      defaultLatitude: 39.9524,
      defaultLongitude: -75.1931,
      venmoHandle: "@cucinazapata",
      menuItems: [
        { name: "Captain Crunch Burrito", description: "Crispy chicken, avocado, captain crunch", priceCents: 1400, isFeatured: true },
        { name: "Thai Short Rib Tacos", description: "Slow cooked ribs with fresh slaw", priceCents: 1200 },
      ],
    },
    {
      name: "Magic Carpet",
      description: "Vegetarian staples on the go",
      cuisineType: "Vegetarian",
      imageUrl: "https://images.unsplash.com/photo-1504753793650-d4a2b783c15c?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "Locust Walk",
      defaultLatitude: 39.9512,
      defaultLongitude: -75.1975,
      venmoHandle: "@magiccarpet",
      menuItems: [
        { name: "Falafel Platter", priceCents: 1100, description: "Falafel with tabouli and hummus" },
        { name: "Tempeh Wrap", priceCents: 1000 },
      ],
    },
    {
      name: "Korean BBQ Express",
      description: "Fast bulgogi bowls and kimchi fries",
      cuisineType: "Korean",
      imageUrl: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "33rd & Arch",
      defaultLatitude: 39.9555,
      defaultLongitude: -75.1910,
      venmoHandle: "@kbbqexpress",
      menuItems: [
        { name: "Bulgogi Bowl", priceCents: 1300 },
        { name: "Kimchi Fries", priceCents: 900, isFeatured: true },
      ],
    },
    {
      name: "Lynn's",
      description: "Breakfast classics and campus-favorite cheesesteaks",
      cuisineType: "Breakfast",
      imageUrl: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "3600 Spruce St, Philadelphia, PA 19104",
      defaultLatitude: 39.9516,
      defaultLongitude: -75.1949,
      venmoHandle: "@lynnsfoodtruck",
      menuItems: [
        { name: "Bacon Egg and Cheese", priceCents: 600, description: "Griddled bacon, fluffy eggs, melted cheese" },
        { name: "Cheesesteak", priceCents: 1100, description: "Sliced ribeye, onions, melted provolone" },
      ],
    },
    {
      name: "Taco's Don Memo",
      description: "Neighborhood staple for hefty tacos and burritos",
      cuisineType: "Mexican",
      imageUrl: "https://images.unsplash.com/photo-1608039829574-358155f866f5?auto=format&fit=crop&w=1200&q=80",
      defaultLocation: "270 S 38th St, Philadelphia, PA 19104",
      defaultLatitude: 39.9534,
      defaultLongitude: -75.1981,
      venmoHandle: "@donnemotacos",
      menuItems: [
        { name: "Chicken Tacos", priceCents: 1400, description: "Three tacos with cilantro, onion, house salsa" },
        { name: "Beef Burrito", priceCents: 1400, description: "Flour tortilla loaded with rice, beans, and beef" },
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

  // Create default owner
  const ownerId = generateUUID();
  const passwordHash = await hashPassword("owner1234");
  db.run(
    `INSERT INTO Owner (id, name, email, passwordHash, createdAt)
     VALUES (?, ?, ?, ?, ?)`,
    [ownerId, "Demo Owner", "owner@streeteats.test", passwordHash, now]
  );

  // Link owner to Lynn's and Taco's Don Memo
  for (const truckName of ["Lynn's", "Taco's Don Memo"]) {
    if (truckIds[truckName]) {
      const accessId = generateUUID();
      db.run(
        `INSERT INTO OwnerTruckAccess (id, ownerId, truckId, role, createdAt)
         VALUES (?, ?, ?, ?, ?)`,
        [accessId, ownerId, truckIds[truckName], "OWNER", now]
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

