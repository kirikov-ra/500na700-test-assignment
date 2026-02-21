import { useState, useEffect } from 'react';
import { getNews } from '@/entities/news/api';
import { NewsItem } from '@/entities/news/types';

interface UseNewsResult {
  data: NewsItem[];
  isLoading: boolean;
  error: string | null;
}

export const useNews = (): UseNewsResult => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const result = await getNews();
        if (isMounted) setData(result);
      } catch (e) {
        if (isMounted) {
          if (e instanceof Error) {
            setError(e.message);
          } else {
            setError('Неизвестная ошибка');
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, isLoading, error };
};
