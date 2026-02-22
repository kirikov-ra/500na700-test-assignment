import { NewsItem } from './types';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const getNews = async (): Promise<NewsItem[]> => {
  await delay(800);
  const response = await fetch('/data/news.json');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: NewsItem[] = await response.json();
  return data;
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
