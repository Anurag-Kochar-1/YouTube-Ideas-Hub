"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const port = process.env.PORT || 8000;
const api_1 = __importDefault(require("./routes/api"));
const zod_middleware_1 = require("./middlewares/zod.middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(zod_middleware_1.zodMiddleware);
app.use("/api/v1", api_1.default);
app.get("/", (req, res) => {
    res.json({ data: 1 });
});
app.listen(port, () => {
    console.log(`🚗 now listening on port ${port}`);
});
