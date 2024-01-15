import { type Response, type Request } from "express";
import { prisma } from "../db/db.config";

export class IdeaCategoryController {
  static async create(req: Request, res: Response) {
    try {
      const data = await prisma.ideaCategory.create({
        data: {
          name: req.body.name,
        },
      });
      res.json(data);
    } catch (error) {
      res.send(error);
    }
  }

  static async fetchAll(req: Request, res: Response) {
    const data = await prisma.ideaCategory.findMany();
    res.json(data);
  }
}
