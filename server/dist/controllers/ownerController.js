"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOwnerProfile = void 0;
const prisma_1 = require("../lib/prisma");
const getOwnerProfile = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const owner = await prisma_1.prisma.owner.findUnique({
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
exports.getOwnerProfile = getOwnerProfile;
//# sourceMappingURL=ownerController.js.map