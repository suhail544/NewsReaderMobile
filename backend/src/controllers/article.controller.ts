import { Request, Response } from "express";
import { prisma } from "../services/database.service";

export const getArticles = async (req: Request, res: Response) => {
  try {
    const page = Math.max(
      1,
      Number.parseInt(String(req.query.page ?? "1"), 10) || 1,
    );

    const limit = Math.min(
      100,
      Math.max(1, Number.parseInt(String(req.query.limit ?? "10"), 10) || 10),
    );

    const skip = (page - 1) * limit;

    const languageCode =
      typeof req.query.language === "string" ? req.query.language : undefined;

    const searchTerm =
      typeof req.query.search === "string" ? req.query.search : undefined;

    const where = {
      ...(languageCode
        ? {
            language: {
              code: languageCode,
            },
          }
        : {}),

      ...(searchTerm
        ? {
            title: {
              contains: searchTerm,
              mode: "insensitive" as const,
            },
          }
        : {}),
    };

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,

        include: {
          source: true,
          language: true,
          category: true,
        },

        orderBy: {
          publishedAt: "desc",
        },

        skip,
        take: limit,
      }),

      prisma.article.count({
        where,
      }),
    ]);

    res.json({
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      articles,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch articles",
    });
  }
};
