"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const zod_middleware_1 = require("./middlewares/zod.middleware");
const body_parser_1 = __importDefault(require("body-parser"));
const baseUrl = process.env.AUTH0_BASE_URL;
const port = process.env.PORT || 8000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: baseUrl }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(zod_middleware_1.zodMiddleware);
// app.use(check0AuthJwt);
app.use("/api/v1", api_1.default);
// app.get(`/api/v1/test`, addAuth0User, (req: any, res: any) => {
//   res.json(req.user);
// });
app.listen(port, () => {
    console.log(`🚗 now listening on port ${port}`);
});
