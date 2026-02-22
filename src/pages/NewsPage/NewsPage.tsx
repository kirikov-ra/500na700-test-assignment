import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container/Container';
import styles from './NewsPage.module.scss';
import { NewsCardSkeleton } from '@/entities/news/ui/NewsCardSkeleton/NewsCardSkeleton';
import { useNews } from '@/shared/hooks/useNews';

const SKELETON_COUNT = 6;

export const NewsPage = () => {
  const { data: news, isLoading: loading, error } = useNews();

  if (error)
    return (
      <Container>
        <div className={styles.container}>Ошибка: {error}</div>
      </Container>
    );

  return (
    <Container>
      <div className={styles.container}>
        <h1 className={styles.title}>Новости</h1>
        <ul className={styles.list}>
          {loading ? (
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <NewsCardSkeleton key={i} />
            ))
          ) : news.length > 0 ? (
            news.map((item) => (
              <li key={item.id}>
                <Link to={`news/${item.id}`} className={styles.item}>
                  <div className={styles['item-image-wrapper']}>
                    <img
                      src={item.image}
                      alt={item.title}
                      className={styles['item-image']}
                    />
                  </div>
                  <h2 className={styles['item-title']}>{item.title}</h2>
                  <p className={styles['item-description']}>{item.description}</p>
                  <time className={styles['item-date']}>{item.date}</time>
                </Link>
              </li>
            ))
          ) : (
            <div>Список новостей пуст.</div>
          )}
        </ul>
      </div>
    </Container>
  );
};
