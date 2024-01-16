"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdeaController = void 0;
const ideaValidation_1 = require("../validations/ideaValidation");
const db_config_1 = require("../db/db.config");
class IdeaController {
    static create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.user;
            const body = req.body;
            try {
                ideaValidation_1.ideaSchema.parse(body);
            }
            catch (error) {
                return res.json(error);
            }
            const upgradedBody = Object.assign({ createdBy: user.id, status: "LISTED" }, body);
            for (const categoryId of body.categories) {
                const category = yield db_config_1.prisma.ideaCategory.findUnique({
                    where: { id: categoryId },
                });
                if (!category) {
                    return res.status(400).json({ error: `Invalid category ID: ${categoryId}` });
                }
            }
            try {
                const idea = yield db_config_1.prisma.idea.create({
                    data: Object.assign(Object.assign({}, upgradedBody), { createdBy: {
                            connect: {
                                id: user.id,
                            },
                        }, categories: {
                            connect: body.categories.map((categoryId) => ({ id: categoryId })),
                        } }),
                    include: {
                        categories: true,
                    },
                });
                return res.json({ status: 201, message: "Idea created", idea });
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    static fetchAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log;
            try {
                const data = yield db_config_1.prisma.idea.findMany({
                    include: {
                        createdBy: true,
                        categories: true,
                    },
                });
                return res.json(data);
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    static fetch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const data = yield db_config_1.prisma.idea.findFirstOrThrow({
                    where: {
                        id: id === null || id === void 0 ? void 0 : id.toString(),
                    },
                    include: {
                        createdBy: true,
                        categories: true,
                    },
                });
                return res.json(data);
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    static fetchByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                console.log(`🍎 user`);
                console.log(user);
                const data = yield db_config_1.prisma.idea.findMany({
                    where: {
                        createdById: user.id,
                    },
                    include: {
                        categories: true,
                    },
                });
                return res.json(data);
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
    static delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.query.id;
                const data = yield db_config_1.prisma.idea.delete({
                    where: {
                        id: id === null || id === void 0 ? void 0 : id.toString(),
                    },
                });
                return res.json(data);
            }
            catch (error) {
                return res.json(error);
            }
        });
    }
}
exports.IdeaController = IdeaController;
