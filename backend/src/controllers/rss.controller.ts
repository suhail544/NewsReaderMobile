import { Request, Response } from "express";
import { prisma } from "../services/database.service";
import { importRssFeed } from "../services/rss.service";

export async function importRss(
  req: Request,
  res: Response
) {
  try {
    const sourceId = Number(req.params.sourceId);

    if (!Number.isInteger(sourceId) || sourceId <= 0) {
      return res.status(400).json({
        message: "Invalid source ID",
      });
    }

    const source = await prisma.newsSource.findUnique({
      where: {
        id: sourceId,
      },
    });

    if (!source) {
      return res.status(404).json({
        message: "RSS source not found",
      });
    }

    const result = await importRssFeed(
      source.rssUrl,
      source.id,
      source.languageId
    );

    res.json(result);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to import RSS feed",
    });
  }
}