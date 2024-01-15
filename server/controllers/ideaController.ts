import { type Request, type Response } from "express";
import { ideaSchema } from "../validations/ideaValidation";
import { prisma } from "../db/db.config";


export class IdeaController {
  static async create(req: Request, res: Response) {
    const body = req.body;
    try {
      ideaSchema.parse(body);
    } catch (error) {
      return res.json(error);
    }

    try {
      const idea = await prisma.idea.create({
        data: {
          ...body,
          createdBy: {
            connect: {
              id: body.createdBy,
            },
          },
        },
      });

      return res.json({ status: 201, message: "Idea created", idea });
    } catch (error) {}
  }

  static async fetchAll(req: Request, res: Response) {
    console.log
    try {
      const data = await prisma.idea.findMany({
        include: {
          createdBy: true,
        },
      });
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  }
  static async fetch(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const data = await prisma.idea.findFirstOrThrow({
        where: {
          id: id?.toString(),
        },
        include: {
          createdBy: true,
        },
      });
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  }
  static async fetchByUser(req: any, res: Response) {
    (`fetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAllfetchAll`)
    console.log(req.session)
    console.log(req.user)
    return res.json(req.session)
    // try {
    //   const userId: any = req.user;
    //   const data = await prisma.idea.findMany({
    //     where: {
    //       createdById: userId.id ,
    //     },
    //   });
    //   return res.json(data);
    // } catch (error) {
    //   return res.json(error);
    // }
  }
  static async delete(req: Request, res: Response) {
    try {
      const id = req.query.id;
      const data = await prisma.idea.delete({
        where: {
          id: id?.toString(),
        },
      });
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  }
}
