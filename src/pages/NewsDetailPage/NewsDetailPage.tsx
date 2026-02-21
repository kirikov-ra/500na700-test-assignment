import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getNewsById } from '@/entities/news/api';
import { NewsItem } from '@/entities/news/types';
import { Container } from '@/shared/ui/Container/Container';
import { NewsDetailSkeleton } from '@/entities/news/ui/NewsDetailSkeleton/NewsDetailSkeleton';
import styles from './NewsDetailPage.module.scss';

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [newItem, setNewItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('ID новости не указан');
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await getNewsById(id!);
        setNewItem(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();

    return () => controller.abort();
  }, [id]);

  if (error) {
    return (
      <Container>
        <div className={styles['news-detail__status-error']}>
          {error || 'Новость не найдена'}
        </div>
        <Link to="/" className={styles['news-detail__back-link']}>
          ← На главную
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      {loading ? (
        <NewsDetailSkeleton />
      ) : (
        <article className={styles['news-detail__article']}>
          <div className={styles['news-detail__image-wrapper']}>
            <img
              src={newItem?.image}
              alt={newItem?.title}
              className={styles['news-detail__image']}
            />
          </div>
          <div className={styles['news-detail__content']}>
            <h1 className={styles['news-detail__title']}>{newItem?.title}</h1>
            <div className={styles['news-detail__date']}>{newItem?.date}</div>
            <div className={styles['news-detail__description']}>
              {newItem?.description}
            </div>
            <div className={styles['news-detail__text']}>{newItem?.content}</div>
          </div>
        </article>
      )}
    </Container>
  );
};
