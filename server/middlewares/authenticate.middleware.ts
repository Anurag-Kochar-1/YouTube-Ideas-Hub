import jwt, { VerifyErrors } from "jsonwebtoken";
import { type Request, type Response, type NextFunction } from "express";
import { User } from "../types/user.type";


declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === null || authHeader === undefined) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, user: Object | undefined) => {
      if (err) {
        return res.status(401).json({ status: 401, message: "Unauthorized" });
      }
      req.user = user as User;
      next();
    }
  );
};

export default authMiddleware;
