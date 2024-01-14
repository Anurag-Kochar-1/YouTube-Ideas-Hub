import { type Request, type Response } from "express";
import { prisma } from "../db/db.config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema, registerSchema } from "../validations/authValidation";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

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

  // static async googleCallback(req: Request, res: Response) {
  //   passport.authenticate("google", {
  //     successRedirect: process.env.CLIENT_URL_DEV,
  //     failureRedirect: `${process.env.CLIENT_URL_DEV}/login/failed`,
  //     scope: ["email", "profile"],
  //   });
  // }
  // static async fowardToGoogleAuthServer(req: Request, res: Response) {
  //   try {
  //     const response = await axios.get("https://accounts.google.com/o/oauth2/v2/auth", {
  //       params: req.query,
  //     });
  //     res.send(response);
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // }
  // static async googleAuthSavingInDb(req: Request, res: Response) {
  //   const user = req.user;
  //   console.log(user);
  // }
  // static async googleAuthFailed(req: Request, res: Response) {
  //   res.status(401);
  //   throw new Error("Login Failed");
  // }
  // static async logoutGoogle(req: Request, res: Response) {
  //   req.logout((err) => {
  //     if (err) {
  //       console.log(err);
  //     }
  //     res.redirect("/");
  //   });
  // }

  static async googleAuth(req: Request, res: Response) {
    return passport.authenticate("google", ["profile", "email"] as any);
  }

  static async googleCallback(req: Request, res: Response) {
    return passport.authenticate("google", {
      successRedirect: `http://localhost:3000/`,
      failureRedirect: "/login/failed",
    });
  }
  static async googleLoginFail(req: Request, res: Response) {
    return res.status(401).json({
      error: true,
      message: "Log in failure",
    });
  }
  static async googleLoginSuccess(req: Request, res: Response) {
    return res.status(401).json({
      error: true,
      message: "Log in failure",
    });
  }
  static async googleLogout(req: any, res: Response) {
    req.logout();
    return res.redirect(`http://localhost:3000/`);
  }
}
