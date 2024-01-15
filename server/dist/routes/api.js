"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ideaController_1 = require("../controllers/ideaController");
const add_auth0_user_middleware_1 = require("../middlewares/add-auth0-user.middleware");
const ideaCategoryController_1 = require("../controllers/ideaCategoryController");
const router = (0, express_1.Router)();
// router.post("/auth/register", AuthController.register);
// router.post("/auth/login", AuthController.login);
// ============ Idea category routes ============
router.post("/idea-category", ideaCategoryController_1.IdeaCategoryController.create);
router.get("/idea-category", ideaCategoryController_1.IdeaCategoryController.fetchAll);
// ============ Idea routes ============
router.get("/idea", ideaController_1.IdeaController.fetchAll);
router.get("/idea/", ideaController_1.IdeaController.fetch);
router.get("/idea/my", add_auth0_user_middleware_1.addAuth0User, ideaController_1.IdeaController.fetchByUser);
router.delete("/idea", ideaController_1.IdeaController.delete);
exports.default = router;
