import { Router } from "express";
import authMiddleware from "../middlewares/authenticate.middleware";
import { IdeaController } from "../controllers/ideaController";
import { addAuth0User } from "../middlewares/add-auth0-user.middleware";
import { IdeaCategoryController } from "../controllers/ideaCategoryController";
import { YoutubeController } from "./youtubeController";

const router = Router();
// router.post("/auth/register", AuthController.register);
// router.post("/auth/login", AuthController.login);

// ============ Idea category routes ============
router.post("/idea-category", IdeaCategoryController.create);
router.get("/idea-category", IdeaCategoryController.fetchAll);

// ============ Idea routes ============
router.get("/idea", IdeaController.fetchAll);
router.post("/idea", addAuth0User, IdeaController.create);
router.get("/idea/my", addAuth0User, IdeaController.fetchByUser);
router.get("/idea/:id", IdeaController.fetch);
router.delete("/idea", IdeaController.delete);

// ============ YouTube routes ============
router.get(`/youtube/search/channel`, YoutubeController.searchYoutubeChannel);
router.get(`/youtube/channel`, YoutubeController.getYoutubeChannelByChanneldId);

export default router;
