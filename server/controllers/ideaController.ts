import { type Request, type Response } from "express";
import { ideaSchema } from "../validations/ideaValidation";
import { prisma } from "../db/db.config";
import { User } from "../types/user.type";

export class IdeaController {
  static async create(req: Request, res: Response) {
    const user: User = req.user as User;
    const body = req.body;
    try {
      ideaSchema.parse(body);
    } catch (error) {
      return res.json(error);
    }
    const upgradedBody = {
      createdBy: user.id,
      status: "LISTED",
      ...body,
    };

    for (const categoryId of body.categories) {
      const category = await prisma.ideaCategory.findUnique({
        where: { id: categoryId },
      });
      if (!category) {
        return res.status(400).json({ error: `Invalid category ID: ${categoryId}` });
      }
    }

    try {
      const idea = await prisma.idea.create({
        data: {
          ...upgradedBody,
          createdBy: {
            connect: {
              id: user.id,
            },
          },
          categories: {
            connect: body.categories.map((categoryId: string) => ({ id: categoryId })),
          },
        },
        include: {
          categories: true,
        },
      });

      return res.json({ status: 201, message: "Idea created", idea });
    } catch (error) {
      return res.json(error);
    }
  }
  // static async fetchAll(req: Request, res: Response) {
  //   try {
  //     let page: number = Number(req.query.page) || 1;
  //     let limit: number = Number(req.query.limit) || 10;
  //     if (page <= 0) {
  //       page = 1;
  //     }
  //     if (limit <= 0 || limit > 100) {
  //       limit = 10;
  //     }
  //     const skip = (page - 1) * limit;
  //     const posts = await prisma.idea.findMany({
  //       skip: skip,
  //       take: limit,
  //       include: {
  //         createdBy: true,
  //         categories: true,
  //       },
  //     });

  //     const totalPosts: number = await prisma.idea.count();
  //     const totalPages: number = Math.ceil(totalPosts / limit);
  //     return res.json({
  //       data: posts,
  //       meta: {
  //         totalPages,
  //         currentPage: page,
  //         limit: limit,
  //       },
  //     });
  //   } catch (error) {
  //     return res.json(error);
  //   }
  // }
  static async fetchAll(req: Request, res: Response) {
    try {
      let page: number = Number(req.query.page) || 1;
      let limit: number = Number(req.query.limit) || 10;
      let categoryName: string | undefined = req.query.categoryName as string;
  
      if (page <= 0) {
        page = 1;
      }
      if (limit <= 0 || limit > 100) {
        limit = 10;
      }
      const skip = (page - 1) * limit;
  
      const posts = await prisma.idea.findMany({
        where: categoryName ? {
          categories: {
            some: {
              name: categoryName,
            },
          },
        } : undefined,
        skip: skip,
        take: limit,
        include: {
          createdBy: true,
          categories: true,
        },
      });
  
      const totalPosts: number = await prisma.idea.count({
        where: categoryName ? {
          categories: {
            some: {
              name: categoryName,
            },
          },
        } : undefined,
      });
  
      const totalPages: number = Math.ceil(totalPosts / limit);
      return res.json({
        data: posts,
        meta: {
          totalPages,
          currentPage: page,
          limit: limit,
        },
      });
    } catch (error) {
      return res.json(error);
    }
  }
  
  static async fetch(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const data = await prisma.idea.findFirstOrThrow({
        where: {
          id: id?.toString(),
        },
        include: {
          createdBy: true,
          categories: true,
        },
      });
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
  }
  static async fetchByUser(req: any, res: Response) {
    try {
      const user = req.user as User;
      console.log(`🍎 user`);
      console.log(user);
      const data = await prisma.idea.findMany({
        where: {
          createdById: user.id,
        },
        include: {
          categories: true,
        },
      });
      return res.json(data);
    } catch (error) {
      return res.json(error);
    }
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
