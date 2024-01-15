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
exports.addAuth0User = void 0;
const axios_1 = __importDefault(require("axios"));
const db_config_1 = require("../db/db.config");
const addAuth0User = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log(`addAuth0User running`);
    try {
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
        const response = yield axios_1.default.get(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const user = response.data;
        const existingUser = yield db_config_1.prisma.user.findFirst({ where: { email: user.email } });
        if (!existingUser) {
            const newUser = yield db_config_1.prisma.user.create({
                data: {
                    email: user.email,
                    firstName: user.given_name,
                    lastName: user.family_name,
                    password: new Date().toString(),
                },
            });
            console.log(`🍎 creating new user with email - ${user.email}`);
            req.user = newUser;
            next();
        }
        else {
            console.log(`🍎 existing user - ${user.email}`);
            req.user = existingUser;
            next();
        }
    }
    catch (error) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
    }
});
exports.addAuth0User = addAuth0User;
