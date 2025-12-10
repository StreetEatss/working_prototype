import type { QueryClient } from "@tanstack/react-query";
import { supabase } from "./api";

export const startRealtimeListeners = (queryClient: QueryClient) => {
  const channel = supabase.channel("streeteats-realtime");
  const tables = ["food_trucks", "menu_items", "status_updates"] as const;

  tables.forEach((table) => {
    channel.on(
      "postgres_changes",
      { event: "*", schema: "public", table },
      () => {
        queryClient.invalidateQueries({ queryKey: ["trucks"] });
        queryClient.invalidateQueries({ queryKey: ["truck-for-owner"] });
        queryClient.invalidateQueries({ queryKey: ["owner-profile"] });
      }
    );
  });

  channel.subscribe();

  return () => {
    channel.unsubscribe();
  };
};
