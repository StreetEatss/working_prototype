import express from "express";
import cors from "cors";
import { env } from "./config";
import authRoutes from "./routes/authRoutes";
import truckRoutes from "./routes/truckRoutes";
import ownerRoutes from "./routes/ownerRoutes";

const app = express();

app.use(cors({ origin: /localhost/, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRoutes);
app.use("/api/trucks", truckRoutes);
app.use("/api/owners", ownerRoutes);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled error", err);
  res.status(500).json({ message: "Unexpected error" });
});

app.listen(env.PORT, () => {
  console.log(`🚚 StreetEats API running on port ${env.PORT}`);
});
