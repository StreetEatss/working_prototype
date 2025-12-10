import { StrictMode, useEffect, type ReactNode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import "./index.css";
import App from "./App";
import { startRealtimeListeners } from "./lib/realtime";

const queryClient = new QueryClient();

const RealtimeProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const stop = startRealtimeListeners(queryClient);
    return () => {
      stop?.();
    };
  }, []);

  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RealtimeProvider>
        <App />
      </RealtimeProvider>
    </QueryClientProvider>
  </StrictMode>
);
