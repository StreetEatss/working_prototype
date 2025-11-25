"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOwner = exports.registerOwner = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const zod_1 = require("zod");
const prisma_1 = require("../lib/prisma");
const config_1 = require("../config");
const credentialsSchema = zod_1.z.object({
    name: zod_1.z.string().min(2).optional(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(8),
});
const registerOwner = async (req, res) => {
    const parsed = credentialsSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
    }
    const { email, password, name } = parsed.data;
    const existing = await prisma_1.prisma.owner.findUnique({ where: { email } });
    if (existing) {
        return res.status(409).json({ message: "Owner already exists" });
    }
    const passwordHash = await bcryptjs_1.default.hash(password, 10);
    const ownerName = (name ?? email.split("@")[0]);
    const owner = await prisma_1.prisma.owner.create({ data: { email, passwordHash, name: ownerName } });
    const token = jsonwebtoken_1.default.sign({ id: owner.id, email: owner.email, name: owner.name }, config_1.env.JWT_SECRET, { expiresIn: "7d" });
    return res.status(201).json({ token, owner: { id: owner.id, email: owner.email, name: owner.name } });
};
exports.registerOwner = registerOwner;
const loginOwner = async (req, res) => {
    const parsed = credentialsSchema.pick({ email: true, password: true }).safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ message: "Invalid payload", issues: parsed.error.flatten() });
    }
    const { email, password } = parsed.data;
    const owner = await prisma_1.prisma.owner.findUnique({ where: { email } });
    if (!owner) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const valid = await bcryptjs_1.default.compare(password, owner.passwordHash);
    if (!valid) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jsonwebtoken_1.default.sign({ id: owner.id, email: owner.email, name: owner.name }, config_1.env.JWT_SECRET, { expiresIn: "7d" });
    return res.json({ token, owner: { id: owner.id, email: owner.email, name: owner.name } });
};
exports.loginOwner = loginOwner;
//# sourceMappingURL=authController.js.map