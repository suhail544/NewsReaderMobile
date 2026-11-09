import { Item } from "rss-parser";
import { prisma } from "./database.service";

export function normalizeArticle(item: Item) {
  return {
    title: item.title ?? "Untitled",
    description: item.contentSnippet ?? item.content ?? null,
    url: item.link ?? "",
    imageUrl: null,
    publishedAt: item.pubDate
      ? new Date(item.pubDate)
      : null,
  };
}

export async function saveArticle(
  item: Item,
  sourceId: number,
  languageId: number
) {
  const article = normalizeArticle(item);

  if (!article.url) {
    return null;
  }

  const existingArticle = await prisma.article.findUnique({
    where: {
      url: article.url,
    },
  });

  if (existingArticle) {
    return null;
  }

  return prisma.article.create({
    data: {
      ...article,
      sourceId,
      languageId,
    },
  });
}