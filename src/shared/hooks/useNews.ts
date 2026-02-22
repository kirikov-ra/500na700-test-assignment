import { useState, useEffect, useCallback } from 'react';
import { getNews } from '@/entities/news/api';
import { NewsItem } from '@/entities/news/types';

interface UseNewsResult {
  data: NewsItem[];
  isLoading: boolean;
  error: string | null;
  hasMore: boolean;
  fetchNextPage: () => void;
}

export const useNews = (limit: number = 9): UseNewsResult => {
  const [data, setData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        setIsLoading(true);
        const result = await getNews(page, limit);

        if (isMounted) {
          setData((prev) => (page === 1 ? result : [...prev, ...result]));
          setHasMore(result.length === limit);
        }
      } catch (e) {
        if (isMounted) {
          setError(e instanceof Error ? e.message : 'Неизвестная ошибка');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    if (hasMore) {
      fetchNews();
    }

    return () => {
      isMounted = false;
    };
  }, [page, limit, hasMore]);

  const fetchNextPage = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [isLoading, hasMore]);

  return { data, isLoading, error, hasMore, fetchNextPage };
};
