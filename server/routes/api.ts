import { Router, type Request, type Response } from "express";
import { AuthController } from "../controllers/authController";
import authMiddleware from "../middlewares/authenticate.middleware";
import { IdeaController } from "../controllers/ideaController";

const router = Router();
router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// router.get("/auth/google/callback",  AuthController.googleCallback);
// router.get("/auth/google",  AuthController.fowardToGoogleAuthServer);
// router.get("/auth/login/success",  AuthController.googleAuthSavingInDb);
// router.get("/auth/login/failed",  AuthController.googleAuthFailed);
// router.get("/auth/logout",  AuthController.logoutGoogle);

// router.get(`/auth/login/success`, AuthController.googleLoginSuccess)
// router.get(`/auth/login/failed`, AuthController.googleLoginFail)
// router.get(`/auth/google`, AuthController.googleAuth)
// router.get(`/auth/google/callback`, AuthController.googleCallback)
// router.get(`/auth/google/logout`, AuthController.googleLogout)

router.post("/idea", authMiddleware, IdeaController.create);
router.get("/idea", IdeaController.fetchAll);
router.get("/idea/", IdeaController.fetch);
router.get("/idea/my", authMiddleware, IdeaController.fetchByUser);
router.delete("/idea", authMiddleware, IdeaController.delete);
export default router;
