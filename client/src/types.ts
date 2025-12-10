export interface StatusUpdate {
  id: string;
  truckId: string;
  userId?: string | null;
  status: "OPEN" | "CLOSED" | "MOVED" | "UNKNOWN";
  note?: string | null;
  reporterName?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  reliability?: number | null;
  source?: string | null;
  isFlagged?: boolean | null;
  createdAt: string;
}

export interface MenuItem {
  id: string;
  truckId: string;
  name: string;
  description?: string | null;
  priceCents?: number | null;
  imageUrl?: string | null;
  averageRating?: number | null;
  isFeatured: boolean;
}

export interface MenuReview {
  id: string;
  menuItemId: string;
  userId?: string | null;
  rating: number;
  tasteRating?: number | null;
  valueRating?: number | null;
  comment?: string | null;
  reporterName?: string | null;
  photoUrl?: string | null;
  locationSource?: string | null;
  isFlagged?: boolean | null;
  createdAt: string;
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
  isBanned?: boolean | null;
}
