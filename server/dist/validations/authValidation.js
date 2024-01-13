"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerSchema = zod_1.default.object({
    firstName: zod_1.default.string().min(1).max(150),
    lastName: zod_1.default.string().min(1).max(150),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().max(6).max(50),
});
exports.loginSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().max(6).max(50),
});
