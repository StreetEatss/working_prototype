import type { Request, Response } from "express";
import { z } from "zod";
import type { Prisma } from "../generated/prisma/client";
import { prisma } from "../lib/prisma";
import type { AuthenticatedRequest } from "../middleware/auth";

type TruckWithSnapshot = Prisma.FoodTruckGetPayload<{
  include: {
    statusUpdates: { orderBy: { createdAt: "desc" }; take: 1 };
    menuItems: { include: { reviews: true } };
  };
}>;

type TruckDetailPayload = Prisma.FoodTruckGetPayload<{
  include: {
    statusUpdates: { orderBy: { createdAt: "desc" }; take: 10 };
    menuItems: { include: { reviews: { orderBy: { createdAt: "desc" }; take: 10 } } };
  };
}>;

const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
const HOURS_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

const scheduleEntrySchema = z.object({
  day: z.enum(dayNames),
  open: z
    .string()
    .regex(HOURS_PATTERN, "Use 24-hour time, e.g., 10:30")
    .max(5, "Format HH:MM"),
  close: z
    .string()
    .regex(HOURS_PATTERN, "Use 24-hour time, e.g., 15:00")
    .max(5, "Format HH:MM"),
  note: z.string().max(160).optional(),
});

const scheduleSchema = z.array(scheduleEntrySchema).max(21);

const schedulePayloadSchema = z.object({
  schedule: scheduleSchema,
});

const truckSchema = z.object({
  name: z.string().min(2),
  description: z.string().optional(),
  cuisineType: z.string().optional(),
  imageUrl: z.string().url().optional(),
  venmoHandle: z.string().optional(),
  defaultLocation: z.string().optional(),
  defaultLatitude: z.number().optional(),
  defaultLongitude: z.number().optional(),
  typicalSchedule: scheduleSchema.optional(),
});

const statusSchema = z.object({
  status: z.enum(["OPEN", "CLOSED", "MOVED", "UNKNOWN"]),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  note: z.string().max(280).optional(),
  reporterName: z.string().optional(),
  reliability: z.number().min(0).max(1).optional(),
  photoUrl: z.string().url().optional(),
  source: z.enum(["CROWD", "OWNER", "ADMIN", "AUTOMATION"]).optional(),
});

const reviewSchema = z.object({
  menuItemId: z.string().uuid(),
  rating: z.number().min(1).max(5),
  tasteRating: z.number().min(1).max(5).optional(),
  valueRating: z.number().min(1).max(5).optional(),
  comment: z.string().max(500).optional(),
  reporterName: z.string().optional(),
  photoUrl: z.string().url().optional(),
});

const ensureTruckId = (params: Request["params"]) => {
  const truckId = params.truckId;
  if (!truckId) {
    throw new Error("MISSING_TRUCK_ID");
  }
  return truckId;
};

const toTruckCreateInput = (input: z.infer<typeof truckSchema>): Prisma.FoodTruckCreateInput => {
  const payload: Prisma.FoodTruckCreateInput = {
    name: input.name,
    description: input.description ?? null,
    cuisineType: input.cuisineType ?? null,
    imageUrl: input.imageUrl ?? null,
    venmoHandle: input.venmoHandle ?? null,
    defaultLocation: input.defaultLocation ?? null,
    defaultLatitude: input.defaultLatitude ?? null,
    defaultLongitude: input.defaultLongitude ?? null,
  };

  if (input.typicalSchedule) {
    payload.typicalSchedule = input.typicalSchedule as Prisma.InputJsonValue;
  }

  return payload;
};

const toStatusCreateInput = (truckId: string, input: z.infer<typeof statusSchema>): Prisma.StatusUpdateCreateInput => ({
  status: input.status,
  latitude: input.latitude ?? null,
  longitude: input.longitude ?? null,
  note: input.note ?? null,
  reporterName: input.reporterName ?? null,
  reliability: input.reliability ?? null,
  photoUrl: input.photoUrl ?? null,
  source: input.source ?? "CROWD",
  truck: { connect: { id: truckId } },
});

const toReviewCreateInput = (input: z.infer<typeof reviewSchema>): Prisma.MenuReviewCreateInput => ({
  rating: input.rating,
  tasteRating: input.tasteRating ?? null,
  valueRating: input.valueRating ?? null,
  comment: input.comment ?? null,
  reporterName: input.reporterName ?? null,
  photoUrl: input.photoUrl ?? null,
  menuItem: { connect: { id: input.menuItemId } },
});

export const listTrucks = async (_req: Request, res: Response) => {
  const trucks = (await prisma.foodTruck.findMany({
    include: {
      statusUpdates: {
        orderBy: { createdAt: "desc" },
        take: 1,
      },
      menuItems: {
        include: { reviews: true },
      },
    },
    orderBy: { name: "asc" },
  })) as TruckWithSnapshot[];

  return res.json(
    trucks.map((truck) => ({
      ...truck,
      latestStatus: truck.statusUpdates[0] ?? null,
      menuItems: truck.menuItems.map((item) => ({
        ...item,
        averageRating:
          item.reviews.length > 0
            ? item.reviews.reduce((sum, review) => sum + review.rating, 0) / item.reviews.length
            : null,
      })),
    }))
  );
};

export const getTruckById = async (req: Request, res: Response) => {
  let truckId: string;
  try {
    truckId = ensureTruckId(req.params);
  } catch {
    return res.status(400).json({ message: "Missing truck id" });
  }

  const truck = (await prisma.foodTruck.findUnique({
    where: { id: truckId },
    include: {
      statusUpdates: { orderBy: { createdAt: "desc" }, take: 10 },
      menuItems: {
        include: {
          reviews: { orderBy: { createdAt: "desc" }, take: 10 },
        },
      },
    },
  })) as TruckDetailPayload | null;

  if (!truck) {
    return res.status(404).json({ message: "Truck not found" });
  }

  return res.json({
    ...truck,
    latestStatus: truck.statusUpdates[0] ?? null,
    reviewCount: truck.menuItems.reduce((count, item) => count + item.reviews.length, 0),
  });
};

export const createTruck = async (req: AuthenticatedRequest, res: Response) => {
  const parsed = truckSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
  }

  const truck = await prisma.foodTruck.create({ data: toTruckCreateInput(parsed.data) });

  if (req.user) {
    await prisma.ownerTruckAccess.create({
      data: {
        ownerId: req.user.id,
        truckId: truck.id,
        role: "OWNER",
      },
    });
  }

  return res.status(201).json(truck);
};

export const addStatusUpdate = async (req: Request, res: Response) => {
  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
  }

  let truckId: string;
  try {
    truckId = ensureTruckId(req.params);
  } catch {
    return res.status(400).json({ message: "Missing truck id" });
  }

  const truck = await prisma.foodTruck.findUnique({ where: { id: truckId } });
  if (!truck) {
    return res.status(404).json({ message: "Truck not found" });
  }

  const status = await prisma.statusUpdate.create({
    data: toStatusCreateInput(truck.id, parsed.data),
  });

  return res.status(201).json(status);
};

export const addMenuReview = async (req: Request, res: Response) => {
  const parsed = reviewSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
  }

  const menuItem = await prisma.menuItem.findUnique({ where: { id: parsed.data.menuItemId } });
  if (!menuItem) {
    return res.status(404).json({ message: "Menu item not found" });
  }

  const review = await prisma.menuReview.create({ data: toReviewCreateInput(parsed.data) });
  return res.status(201).json(review);
};

export const updateTruckHours = async (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const parsed = schedulePayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
  }

  let truckId: string;
  try {
    truckId = ensureTruckId(req.params);
  } catch {
    return res.status(400).json({ message: "Missing truck id" });
  }

  const access = await prisma.ownerTruckAccess.findFirst({
    where: { ownerId: req.user.id, truckId },
  });

  if (!access) {
    return res.status(403).json({ message: "You do not have access to this truck" });
  }

  const updated = await prisma.foodTruck.update({
    where: { id: truckId },
    data: { typicalSchedule: parsed.data.schedule as Prisma.InputJsonValue },
    select: { id: true, typicalSchedule: true, updatedAt: true },
  });

  return res.json({
    truckId: updated.id,
    typicalSchedule: updated.typicalSchedule ?? [],
    updatedAt: updated.updatedAt,
  });
};
