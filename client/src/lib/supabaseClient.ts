import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  console.error("Supabase URL or key is missing. Check your .env.");
}

let supabase: SupabaseClient | null = null;

// client/src/lib/supabaseClient.ts
console.log("VITE_SUPABASE_URL =", import.meta.env.VITE_SUPABASE_URL);
console.log(
  "VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY =",
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY ? "[present]" : "[missing]"
);

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(supabaseUrl, supabaseKey);
  }
  return supabase;
}
