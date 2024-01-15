"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check0AuthJwt = void 0;
require("dotenv/config");
const express_jwt_1 = require("express-jwt");
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:3000/";
exports.check0AuthJwt = (0, express_jwt_1.expressjwt)({
    secret: jwks_rsa_1.default.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
    }),
    audience: audience,
    issuer: `${issuerBaseUrl}/`,
    algorithms: ["RS256"],
}).unless({
    path: ["/api/v1/idea-category"],
    method: ["GET", "POST"],
});
