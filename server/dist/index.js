"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const truckRoutes_1 = __importDefault(require("./routes/truckRoutes"));
const ownerRoutes_1 = __importDefault(require("./routes/ownerRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: /localhost/, credentials: true }));
app.use(express_1.default.json({ limit: "1mb" }));
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/trucks", truckRoutes_1.default);
app.use("/api/owners", ownerRoutes_1.default);
app.use((err, _req, res, _next) => {
    console.error("Unhandled error", err);
    res.status(500).json({ message: "Unexpected error" });
});
app.listen(config_1.env.PORT, () => {
    console.log(`🚚 StreetEats API running on port ${config_1.env.PORT}`);
});
//# sourceMappingURL=index.js.map