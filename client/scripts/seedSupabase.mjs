import { createClient } from "@supabase/supabase-js";
import crypto from "node:crypto";
import { trucks } from "./seedData.js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before running this script.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const upsertTruck = async (truck) => {
  const now = new Date().toISOString();
  const { data: existingTruck, error: truckLookupError } = await supabase
    .from("FoodTruck")
    .select("id")
    .eq("name", truck.name)
    .maybeSingle();

  if (truckLookupError) throw truckLookupError;

  const truckId = existingTruck?.id || crypto.randomUUID();
  if (existingTruck) {
    const { error } = await supabase
      .from("FoodTruck")
      .update({
        description: truck.description,
        cuisineType: truck.cuisineType,
        imageUrl: truck.imageUrl,
        venmoHandle: truck.venmoHandle,
        defaultLocation: truck.defaultLocation,
        defaultLatitude: truck.defaultLatitude,
        defaultLongitude: truck.defaultLongitude,
        updatedAt: now,
      })
      .eq("id", truckId);
    if (error) throw error;
  } else {
    const { error } = await supabase.from("FoodTruck").insert({
      id: truckId,
      name: truck.name,
      description: truck.description,
      cuisineType: truck.cuisineType,
      imageUrl: truck.imageUrl,
      venmoHandle: truck.venmoHandle,
      defaultLocation: truck.defaultLocation,
      defaultLatitude: truck.defaultLatitude,
      defaultLongitude: truck.defaultLongitude,
      createdAt: now,
      updatedAt: now,
    });
    if (error) throw error;
  }

  for (const item of truck.menuItems) {
    const { data: existingItem, error: itemLookupError } = await supabase
      .from("MenuItem")
      .select("id")
      .eq("truckId", truckId)
      .eq("name", item.name)
      .maybeSingle();

    if (itemLookupError) throw itemLookupError;

    if (existingItem) {
      const { error } = await supabase
        .from("MenuItem")
        .update({
          description: item.description ?? null,
          priceCents: item.priceCents ?? null,
          isFeatured: Boolean(item.isFeatured),
        })
        .eq("id", existingItem.id);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("MenuItem").insert({
        truckId,
        name: item.name,
        description: item.description ?? null,
        priceCents: item.priceCents ?? null,
        isFeatured: Boolean(item.isFeatured),
      });
      if (error) throw error;
    }
  }

  const { data: latestStatus, error: statusError } = await supabase
    .from("StatusUpdate")
    .select("id")
    .eq("truckId", truckId)
    .order("createdAt", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (statusError) throw statusError;

  if (!latestStatus) {
    const { error } = await supabase.from("StatusUpdate").insert({
      truckId,
      status: "OPEN",
      note: "Serving lunch until 3pm",
      reporterName: "StreetEats Team",
      latitude: truck.defaultLatitude ?? null,
      longitude: truck.defaultLongitude ?? null,
      reliability: 0.9,
      source: "ADMIN",
    });
    if (error) throw error;
  }
};

const run = async () => {
  for (const truck of trucks) {
    await upsertTruck(truck);
    console.log(`Seeded ${truck.name}`);
  }
  console.log("Seeding complete.");
};

run().catch((error) => {
  console.error("Seeding failed:", error.message || error);
  process.exit(1);
});
