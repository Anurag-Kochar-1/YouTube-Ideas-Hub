import { Router, type Request, type Response } from "express";
import { AuthController } from "../controllers/authController";

const router = Router();
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

export default router;
