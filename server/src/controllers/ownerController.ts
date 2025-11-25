import type { Response } from "express";
import { prisma } from "../lib/prisma";
import type { AuthenticatedRequest } from "../middleware/auth";

export const getOwnerProfile = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const owner = await prisma.owner.findUnique({
    where: { id: req.user.id },
    include: {
      trucks: {
        include: {
          truck: true,
        },
      },
    },
  });

  if (!owner) {
    return res.status(404).json({ message: "Owner not found" });
  }

  return res.json({
    id: owner.id,
    name: owner.name,
    email: owner.email,
    trucks: owner.trucks.map((access) => ({
      id: access.truck.id,
      name: access.truck.name,
      defaultLocation: access.truck.defaultLocation,
      cuisineType: access.truck.cuisineType,
      typicalSchedule: Array.isArray(access.truck.typicalSchedule) ? access.truck.typicalSchedule : [],
      role: access.role,
      defaultLatitude: access.truck.defaultLatitude,
      defaultLongitude: access.truck.defaultLongitude,
    })),
  });
};

