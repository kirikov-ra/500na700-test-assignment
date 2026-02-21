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
  }, [id]);

  if (error || (!loading && !newItem)) {
    return (
      <Container>
        <div className={styles.statusError}>{error || 'Новость не найдена'}</div>
        <Link to="/" className={styles.backLink}>
          На главную
        </Link>
      </Container>
    );
  }

  return (
    <Container>
      {loading ? (
        <NewsDetailSkeleton />
      ) : (
        <article className={styles.article}>
          <div className={styles.imageWrapper}>
            <img src={newItem?.image} alt={newItem?.title} className={styles.image} />
          </div>
          <div className={styles.contentWrapper}>
            <h1 className={styles.title}>{newItem?.title}</h1>
            <div className={styles.date}>{newItem?.date}</div>
            <div className={styles.description}>{newItem?.description}</div>
            <div className={styles.content}>{newItem?.content}</div>
          </div>
        </article>
      )}
    </Container>
  );
};
