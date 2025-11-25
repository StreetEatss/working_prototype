import { Router } from "express";
import { loginOwner, registerOwner } from "../controllers/authController";

const router = Router();

router.post("/register", registerOwner);
router.post("/login", loginOwner);

export default router;
