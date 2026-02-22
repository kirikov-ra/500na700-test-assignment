import { NewsItem } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNews = async (
  page: number = 1,
  limit: number = 9,
): Promise<NewsItem[]> => {
  await delay(1500);
  const response = await fetch('/data/news.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: NewsItem[] = await response.json();

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return data.slice(startIndex, endIndex);
};

export const getNewsById = async (id: string): Promise<NewsItem | null> => {
  await delay(700);
  const response = await fetch('/data/news.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: NewsItem[] = await response.json();
  return data.find((news) => news.id === id) || null;
};
