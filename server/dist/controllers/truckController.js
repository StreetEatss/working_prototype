"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTruckHours = exports.addMenuReview = exports.addStatusUpdate = exports.createTruck = exports.getTruckById = exports.listTrucks = void 0;
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOURS_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;
const scheduleEntrySchema = zod_1.z.object({
    day: zod_1.z.enum(dayNames),
    open: zod_1.z
        .string()
        .regex(HOURS_PATTERN, "Use 24-hour time, e.g., 10:30")
        .max(5, "Format HH:MM"),
    close: zod_1.z
        .string()
        .regex(HOURS_PATTERN, "Use 24-hour time, e.g., 15:00")
        .max(5, "Format HH:MM"),
    note: zod_1.z.string().max(160).optional(),
});
const scheduleSchema = zod_1.z.array(scheduleEntrySchema).max(21);
const schedulePayloadSchema = zod_1.z.object({
    schedule: scheduleSchema,
});
const truckSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    description: zod_1.z.string().optional(),
    cuisineType: zod_1.z.string().optional(),
    imageUrl: zod_1.z.string().url().optional(),
    venmoHandle: zod_1.z.string().optional(),
    defaultLocation: zod_1.z.string().optional(),
    defaultLatitude: zod_1.z.number().optional(),
    defaultLongitude: zod_1.z.number().optional(),
    typicalSchedule: scheduleSchema.optional(),
});
const statusSchema = zod_1.z.object({
    status: zod_1.z.enum(["OPEN", "CLOSED", "MOVED", "UNKNOWN"]),
    latitude: zod_1.z.number().optional(),
    longitude: zod_1.z.number().optional(),
    note: zod_1.z.string().max(280).optional(),
    reporterName: zod_1.z.string().optional(),
    reliability: zod_1.z.number().min(0).max(1).optional(),
    photoUrl: zod_1.z.string().url().optional(),
    source: zod_1.z.enum(["CROWD", "OWNER", "ADMIN", "AUTOMATION"]).optional(),
});
const reviewSchema = zod_1.z.object({
    menuItemId: zod_1.z.string().uuid(),
    rating: zod_1.z.number().min(1).max(5),
    tasteRating: zod_1.z.number().min(1).max(5).optional(),
    valueRating: zod_1.z.number().min(1).max(5).optional(),
    comment: zod_1.z.string().max(500).optional(),
    reporterName: zod_1.z.string().optional(),
    photoUrl: zod_1.z.string().url().optional(),
});
const ensureTruckId = (params) => {
    const truckId = params.truckId;
    if (!truckId) {
        throw new Error("MISSING_TRUCK_ID");
    }
    return truckId;
};
const toTruckCreateInput = (input) => {
    const payload = {
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
        payload.typicalSchedule = input.typicalSchedule;
    }
    return payload;
};
const toStatusCreateInput = (truckId, input) => ({
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
const toReviewCreateInput = (input) => ({
    rating: input.rating,
    tasteRating: input.tasteRating ?? null,
    valueRating: input.valueRating ?? null,
    comment: input.comment ?? null,
    reporterName: input.reporterName ?? null,
    photoUrl: input.photoUrl ?? null,
    menuItem: { connect: { id: input.menuItemId } },
});
const listTrucks = async (_req, res) => {
    const trucks = (await prisma_1.prisma.foodTruck.findMany({
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
    }));
    return res.json(trucks.map((truck) => ({
        ...truck,
        latestStatus: truck.statusUpdates[0] ?? null,
        menuItems: truck.menuItems.map((item) => ({
            ...item,
            averageRating: item.reviews.length > 0
                ? item.reviews.reduce((sum, review) => sum + review.rating, 0) / item.reviews.length
                : null,
        })),
    })));
};
exports.listTrucks = listTrucks;
const getTruckById = async (req, res) => {
    let truckId;
    try {
        truckId = ensureTruckId(req.params);
    }
    catch {
        return res.status(400).json({ message: "Missing truck id" });
    }
    const truck = (await prisma_1.prisma.foodTruck.findUnique({
        where: { id: truckId },
        include: {
            statusUpdates: { orderBy: { createdAt: "desc" }, take: 10 },
            menuItems: {
                include: {
                    reviews: { orderBy: { createdAt: "desc" }, take: 10 },
                },
            },
        },
    }));
    if (!truck) {
        return res.status(404).json({ message: "Truck not found" });
    }
    return res.json({
        ...truck,
        latestStatus: truck.statusUpdates[0] ?? null,
        reviewCount: truck.menuItems.reduce((count, item) => count + item.reviews.length, 0),
    });
};
exports.getTruckById = getTruckById;
const createTruck = async (req, res) => {
    const parsed = truckSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
    }
    const truck = await prisma_1.prisma.foodTruck.create({ data: toTruckCreateInput(parsed.data) });
    if (req.user) {
        await prisma_1.prisma.ownerTruckAccess.create({
            data: {
                ownerId: req.user.id,
                truckId: truck.id,
                role: "OWNER",
            },
        });
    }
    return res.status(201).json(truck);
};
exports.createTruck = createTruck;
const addStatusUpdate = async (req, res) => {
    const parsed = statusSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
    }
    let truckId;
    try {
        truckId = ensureTruckId(req.params);
    }
    catch {
        return res.status(400).json({ message: "Missing truck id" });
    }
    const truck = await prisma_1.prisma.foodTruck.findUnique({ where: { id: truckId } });
    if (!truck) {
        return res.status(404).json({ message: "Truck not found" });
    }
    const status = await prisma_1.prisma.statusUpdate.create({
        data: toStatusCreateInput(truck.id, parsed.data),
    });
    return res.status(201).json(status);
};
exports.addStatusUpdate = addStatusUpdate;
const addMenuReview = async (req, res) => {
    const parsed = reviewSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
    }
    const menuItem = await prisma_1.prisma.menuItem.findUnique({ where: { id: parsed.data.menuItemId } });
    if (!menuItem) {
        return res.status(404).json({ message: "Menu item not found" });
    }
    const review = await prisma_1.prisma.menuReview.create({ data: toReviewCreateInput(parsed.data) });
    return res.status(201).json(review);
};
exports.addMenuReview = addMenuReview;
const updateTruckHours = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const parsed = schedulePayloadSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
    }
    let truckId;
    try {
        truckId = ensureTruckId(req.params);
    }
    catch {
        return res.status(400).json({ message: "Missing truck id" });
    }
    const access = await prisma_1.prisma.ownerTruckAccess.findFirst({
        where: { ownerId: req.user.id, truckId },
    });
    if (!access) {
        return res.status(403).json({ message: "You do not have access to this truck" });
    }
    const updated = await prisma_1.prisma.foodTruck.update({
        where: { id: truckId },
        data: { typicalSchedule: parsed.data.schedule },
        select: { id: true, typicalSchedule: true, updatedAt: true },
    });
    return res.json({
        truckId: updated.id,
        typicalSchedule: updated.typicalSchedule ?? [],
        updatedAt: updated.updatedAt,
    });
};
exports.updateTruckHours = updateTruckHours;
//# sourceMappingURL=truckController.js.map