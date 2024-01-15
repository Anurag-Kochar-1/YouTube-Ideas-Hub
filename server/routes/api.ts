import { Router } from "express";
import authMiddleware from "../middlewares/authenticate.middleware";
import { IdeaController } from "../controllers/ideaController";
import { addAuth0User } from "../middlewares/add-auth0-user.middleware";
import { IdeaCategoryController } from "../controllers/ideaCategoryController";

const router = Router();
// router.post("/auth/register", AuthController.register);
// router.post("/auth/login", AuthController.login);

// ============ Idea category routes ============
router.post("/idea-category", IdeaCategoryController.create);
router.get("/idea-category", IdeaCategoryController.fetchAll);


// ============ Idea routes ============
router.get("/idea", IdeaController.fetchAll);
router.get("/idea/", IdeaController.fetch);
router.get("/idea/my", addAuth0User, IdeaController.fetchByUser);
router.delete("/idea", IdeaController.delete);


export default router;
