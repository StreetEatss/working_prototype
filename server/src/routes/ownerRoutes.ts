import { Router } from "express";
import { getOwnerProfile } from "../controllers/ownerController";
import { requireAuth } from "../middleware/auth";

const router = Router();

router.get("/me", requireAuth, getOwnerProfile);

export default router;


