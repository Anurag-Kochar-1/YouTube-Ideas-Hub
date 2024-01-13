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
exports.AuthController = void 0;
// import { registerSchema } from "../validations/authValidation";
const db_config_1 = require("../db/db.config");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                // const validator = vine.compile(registerSchema);
                // const payload = await validator.validate(body);
                //   * Check if email exist
                const findUser = yield db_config_1.prisma.user.findUnique({
                    where: {
                        email: payload.email,
                    },
                });
                if (findUser) {
                    return res.status(400).json({
                        errors: {
                            email: "Email already taken.please use another one.",
                        },
                    });
                }
                //   * Encrypt the password
                const salt = bcryptjs_1.default.genSaltSync(10);
                payload.password = bcryptjs_1.default.hashSync(payload.password, salt);
                const user = yield db_config_1.prisma.user.create({
                    data: payload,
                });
                return res.json({
                    status: 200,
                    message: "User created successfully",
                    user,
                });
            }
            catch (error) {
                console.log("The error is", error);
                return res.status(500).json({
                    status: 500,
                    message: "Something went wrong.Please try again.",
                });
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payload = req.body;
                const findUser = yield db_config_1.prisma.user.findUnique({
                    where: {
                        email: payload.email,
                    },
                });
                if (findUser) {
                    if (!bcryptjs_1.default.compareSync(payload.password, findUser.password)) {
                        return res.status(400).json({
                            errors: {
                                email: "Invalid Credentials.",
                            },
                        });
                    }
                    const payloadData = {
                        id: findUser.id,
                        firstName: findUser.firstName,
                        lastName: findUser.lastName,
                        email: findUser.email,
                    };
                    const token = jsonwebtoken_1.default.sign(payloadData, process.env.JWT_SECRET, {
                        expiresIn: "30d",
                    });
                    return res.json({
                        message: "Logged in",
                        access_token: token,
                    });
                }
                return res.status(400).json({
                    errors: {
                        email: "No user found with this email.",
                    },
                });
            }
            catch (error) {
                console.log("The error is", error);
                return res.status(500).json({
                    status: 500,
                    message: "Something went wrong.Please try again.",
                });
            }
        });
    }
}
exports.AuthController = AuthController;
