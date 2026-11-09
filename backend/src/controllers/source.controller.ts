import { Request, Response } from "express";
import { prisma } from "../services/database.service";

export async function getSources(
  req: Request,
  res: Response
) {
  try {
    const sources = await prisma.newsSource.findMany({
      include: {
        language: true,
      },
    });

    res.json({
      total: sources.length,
      sources,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch news sources",
    });
  }
}