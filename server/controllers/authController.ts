import { type Request, type Response } from "express";
import { prisma } from "../db/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validations/authValidation";

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const payload = req.body;
      const body = req.body;
      try {
        registerSchema.parse(body);
      } catch (error) {
        return res.json(error);
      }
      const findUser = await prisma.user.findUnique({
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

      const salt = bcrypt.genSaltSync(10);
      payload.password = bcrypt.hashSync(payload.password, salt);

      const user = await prisma.user.create({
        data: payload,
      });
      return res.json({
        status: 200,
        message: "User created successfully",
        user,
      });
    } catch (error: any) {
      console.log("The error is", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const payload = req.body;
      const body = req.body;
      try {
        loginSchema.parse(body);
      } catch (error) {
        return res.json(error);
      }

      const findUser = await prisma.user.findUnique({
        where: {
          email: payload.email,
        },
      });

      if (findUser) {
        if (!bcrypt.compareSync(payload.password, findUser.password)) {
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
        const token = jwt.sign(payloadData, process.env.JWT_SECRET as string, {
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
    } catch (error) {
      console.log("The error is", error);
      return res.status(500).json({
        status: 500,
        message: "Something went wrong.Please try again.",
      });
    }
  }
}
