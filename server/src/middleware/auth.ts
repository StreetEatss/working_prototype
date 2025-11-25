import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config";

type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export interface AuthenticatedRequest extends Request {
  user?: AuthUser | null;
}

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ message: "Missing authorization header" });
  }

  const [, token] = header.split(" ");
  if (!token) {
    return res.status(401).json({ message: "Invalid authorization header" });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthUser;
    req.user = decoded;
    return next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
