"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ideaSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.ideaSchema = zod_1.default.object({
    title: zod_1.default.string().min(1).max(200),
    description: zod_1.default.string().max(1000).optional(),
    categories: zod_1.default.array(zod_1.default.string()).min(1),
    suggestedFor: zod_1.default.array(zod_1.default.string()).optional(),
});
