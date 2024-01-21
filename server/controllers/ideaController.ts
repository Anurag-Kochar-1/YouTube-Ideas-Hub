import { type Request, type Response } from "express";
import { ideaSchema } from "../validations/ideaValidation";
import { prisma } from "../db/db.config";
import { User } from "../types/user.type";
import axios from "axios";
import { Prisma } from "@prisma/client";

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

  static async fetchAll(req: Request, res: Response) {
    console.log(`🥶 fetchAll method from ideaController called`);
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

      let posts = await prisma.idea.findMany({
        where: categoryName
          ? {
              categories: {
                some: {
                  name: categoryName,
                },
              },
            }
          : undefined,
        skip: skip,
        take: limit,
        include: {
          createdBy: true,
          categories: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      for (let post of posts) {
        if (post.suggestedFor && Array.isArray(post.suggestedFor)) {
          for (let i = 0; i < post.suggestedFor.length; i++) {
            if (typeof post.suggestedFor[i] === "string") {
              try {
                const id = post.suggestedFor[i];
                const youtubeKey = process.env.YOUTUBE_KEY;
                const { data } = await axios.get(
                  `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${id}&key=${youtubeKey}`
                );
                const channelData = {
                  channelName: data?.items[0]?.snippet?.title,
                  channelId: data?.items[0]?.id,
                  channelLogo: data?.items[0]?.snippet?.thumbnails?.medium?.url,
                  statistics: {
                    subscriberCount: data?.items[0]?.statistics?.subscriberCount  
                  }

                }
                post.suggestedFor[i] = channelData as Prisma.JsonValue;
              } catch (error) {
                console.log(error);
              }
            }
          }
        }
      }

      const totalPosts: number = await prisma.idea.count({
        where: categoryName
          ? {
              categories: {
                some: {
                  name: categoryName,
                },
              },
            }
          : undefined,
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
      const user = req.user as User;
      const id = req.query.id;
  
      const data = await prisma.idea.delete({
        where: {
          id: id?.toString(),
          createdBy: {
            email: user.email,
          },
        },
      });
  
      return res.json(data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2016') {
        return res.status(403).json({ error: 'User is not authorized to delete this idea' });
      }
      return res.json(error);
    }
  }
  
}
