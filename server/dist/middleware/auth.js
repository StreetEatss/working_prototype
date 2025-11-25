"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const requireAuth = (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) {
        return res.status(401).json({ message: "Missing authorization header" });
    }
    const [, token] = header.split(" ");
    if (!token) {
        return res.status(401).json({ message: "Invalid authorization header" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.env.JWT_SECRET);
        req.user = decoded;
        return next();
    }
    catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};
exports.requireAuth = requireAuth;
//# sourceMappingURL=auth.js.map