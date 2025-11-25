"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ownerController_1 = require("../controllers/ownerController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
router.get("/me", auth_1.requireAuth, ownerController_1.getOwnerProfile);
exports.default = router;
//# sourceMappingURL=ownerRoutes.js.map