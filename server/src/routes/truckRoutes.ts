import { Router } from "express";
import {
  addMenuReview,
  addStatusUpdate,
  createTruck,
  getTruckById,
  listTrucks,
  updateTruckHours,
} from "../controllers/truckController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/", listTrucks);
router.get("/:truckId", getTruckById);
router.post("/:truckId/status", addStatusUpdate);
router.post("/:truckId/reviews", addMenuReview);
router.post("/", requireAuth, createTruck);
router.patch("/:truckId/hours", requireAuth, updateTruckHours);

export default router;
