import { getNewsById } from '@/entities/news/api';
import { NewsItem } from '@/entities/news/types';
import { useEffect, useState } from 'react';

interface UseNewsDetailResult {
  item: NewsItem | null;
  isLoading: boolean;
  error: string | null;
}

export const useNewsDetail = (id?: string): UseNewsDetailResult => {
  const [item, setItem] = useState<NewsItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    if (!id) {
      if (isMounted) {
        setIsLoading(false);
        setError('ID новости не указан');
      }
      return;
    }

    const fetchDetail = async () => {
      try {
        setIsLoading(true);
        const result = await getNewsById(id);
        if (isMounted) {
          if (result) setItem(result);
          else setError('Новость не найдена');
        }
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

    fetchDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  return { item, isLoading, error };
};
