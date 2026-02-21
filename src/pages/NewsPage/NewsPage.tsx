import { getNews } from '@/entities/news/api';
import { NewsItem } from '@/entities/news/types';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container/Container';
import styles from './NewsPage.module.scss';
import { NewsCardSkeleton } from '@/entities/news/ui/NewsCardSkeleton/NewsCardSkeleton';

export const NewsPage = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data = await getNews();
        setNews(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  if (error)
    return (
      <Container>
        <div className={styles.container}>Ошибка: {error}</div>
      </Container>
    );

  return (
    <Container>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Новости</h1>
        <div className={styles.news}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
          ) : news.length > 0 ? (
            news.map((item) => (
              <Link to={`news/${item.id}`} key={item.id} className={styles.newWrapper}>
                <div className={styles.imageWrapper}>
                  <img src={item.image} alt={item.title} className={styles.image} />
                </div>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.description}>{item.description}</p>
                <div className={styles.date}>{item.date}</div>
              </Link>
            ))
          ) : (
            <div>Список новостей пуст.</div>
          )}
        </div>
      </div>
    </Container>
  );
};
