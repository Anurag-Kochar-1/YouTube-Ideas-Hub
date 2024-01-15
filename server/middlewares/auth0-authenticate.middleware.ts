import "dotenv/config";

import { GetVerificationKey, expressjwt as jwt } from "express-jwt";
import jwksRsa from "jwks-rsa";
const issuerBaseUrl = process.env.AUTH0_ISSUER_BASE_URL;
const audience = process.env.AUTH0_AUDIENCE || "http://localhost:3000/";

export const check0AuthJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuerBaseUrl}/.well-known/jwks.json`,
  }) as GetVerificationKey,
  audience: audience,
  issuer: `${issuerBaseUrl}/`,
  algorithms: ["RS256"],
}).unless({
  path: [],
});
