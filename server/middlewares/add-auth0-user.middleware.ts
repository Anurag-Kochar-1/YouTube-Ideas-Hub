import axios from "axios";
import { type Request, type Response, type NextFunction } from "express";
import { prisma } from "../db/db.config";

export const addAuth0User = async (req: Request, res: Response, next: NextFunction) => {
  console.log(`addAuth0User running`);
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const response = await axios.get(`${process.env.AUTH0_ISSUER_BASE_URL}/userinfo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const user = response.data;
    const existingUser = await prisma.user.findFirst({ where: { email: user.email } });
    if (!existingUser) {
      const newUser = await prisma.user.create({
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
    } else {
      console.log(`🍎 existing user - ${user.email}`);
      req.user = existingUser;
      next();
    }
  } catch (error) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }
};
