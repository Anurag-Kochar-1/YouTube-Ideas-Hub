"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const auth0_authenticate_middleware_1 = require("./middlewares/auth0-authenticate.middleware");
const axios_1 = __importDefault(require("axios"));
app.use((0, cors_1.default)({ origin: baseUrl }));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(zod_middleware_1.zodMiddleware);
app.use("/api/v1", api_1.default);
app.use(auth0_authenticate_middleware_1.check0AuthJwt);
app.get(`/api/v1/test`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
    const response = yield axios_1.default.get(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log(response.data);
    res.json(response.data);
}));
app.listen(port, () => {
    console.log(`🚗 now listening on port ${port}`);
});
