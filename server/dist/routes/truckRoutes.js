"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const truckController_1 = require("../controllers/truckController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/", truckController_1.listTrucks);
router.get("/:truckId", truckController_1.getTruckById);
router.post("/:truckId/status", truckController_1.addStatusUpdate);
router.post("/:truckId/reviews", truckController_1.addMenuReview);
router.post("/", auth_1.requireAuth, truckController_1.createTruck);
router.patch("/:truckId/hours", auth_1.requireAuth, truckController_1.updateTruckHours);
exports.default = router;
//# sourceMappingURL=truckRoutes.js.map