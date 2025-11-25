import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { env } from "../config";

const credentialsSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerOwner = async (req: Request, res: Response) => {
  const parsed = credentialsSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
  }

  const { email, password, name } = parsed.data;

  const existing = await prisma.owner.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ message: "Owner already exists" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const ownerName = (name ?? email.split("@")[0]) as string;
  const owner = await prisma.owner.create({ data: { email, passwordHash, name: ownerName } });

  const token = jwt.sign({ id: owner.id, email: owner.email, name: owner.name }, env.JWT_SECRET, { expiresIn: "7d" });

  return res.status(201).json({ token, owner: { id: owner.id, email: owner.email, name: owner.name } });
};

export const loginOwner = async (req: Request, res: Response) => {
  const parsed = credentialsSchema.pick({ email: true, password: true }).safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
  }

  const { email, password } = parsed.data;
  const owner = await prisma.owner.findUnique({ where: { email } });
  if (!owner) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, owner.passwordHash);
  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: owner.id, email: owner.email, name: owner.name }, env.JWT_SECRET, { expiresIn: "7d" });
  return res.json({ token, owner: { id: owner.id, email: owner.email, name: owner.name } });
};
