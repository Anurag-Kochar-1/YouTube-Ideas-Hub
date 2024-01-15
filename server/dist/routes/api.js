"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authenticate_middleware_1 = __importDefault(require("../middlewares/authenticate.middleware"));
const ideaController_1 = require("../controllers/ideaController");
const router = (0, express_1.Router)();
router.post("/auth/register", authController_1.AuthController.register);
router.post("/auth/login", authController_1.AuthController.login);
router.post("/idea", authenticate_middleware_1.default, ideaController_1.IdeaController.create);
router.get("/idea", ideaController_1.IdeaController.fetchAll);
router.get("/idea/", ideaController_1.IdeaController.fetch);
router.get("/idea/my", ideaController_1.IdeaController.fetchByUser);
router.delete("/idea", authenticate_middleware_1.default, ideaController_1.IdeaController.delete);
exports.default = router;
