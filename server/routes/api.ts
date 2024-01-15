import { Router } from "express";
import { AuthController } from "../controllers/authController";
import authMiddleware from "../middlewares/authenticate.middleware";
import { IdeaController } from "../controllers/ideaController";

const router = Router();
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

router.post("/idea", authMiddleware, IdeaController.create);
router.get("/idea", IdeaController.fetchAll);
router.get("/idea/", IdeaController.fetch);
router.get("/idea/my", IdeaController.fetchByUser);
router.delete("/idea", authMiddleware, IdeaController.delete);
export default router;
