import Parser from "rss-parser";
import { saveArticle } from "./article.service";

const parser = new Parser();

export async function fetchRssFeed(feedUrl: string) {
  try {
    const feed = await parser.parseURL(feedUrl);

    return feed;
  } catch (error) {
    console.error(`Failed to fetch RSS feed: ${feedUrl}`);
    throw error;
  }
}

export async function importRssFeed(
  feedUrl: string,
  sourceId: number,
  languageId: number
) {
  const feed = await fetchRssFeed(feedUrl);

  let savedCount = 0;

  for (const item of feed.items) {
    const article = await saveArticle(
      item,
      sourceId,
      languageId
    );

    if (article) {
      savedCount++;
    }
  }

  return {
    feedTitle: feed.title,
    totalItems: feed.items.length,
    savedCount,
  };
}