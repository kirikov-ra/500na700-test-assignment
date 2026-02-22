import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container/Container';
import styles from './NewsPage.module.scss';
import { NewsCardSkeleton } from '@/entities/news/ui/NewsCardSkeleton/NewsCardSkeleton';
import { useNews } from '@/shared/hooks/useNews';

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
        <div className={styles.list}>
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <NewsCardSkeleton key={i} />)
          ) : news.length > 0 ? (
            news.map((item) => (
              <Link to={`news/${item.id}`} key={item.id} className={styles['item']}>
                <div className={styles['item-image-wrapper']}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles['item-image']}
                  />
                </div>
                <h2 className={styles['item-title']}>{item.title}</h2>
                <p className={styles['item-description']}>{item.description}</p>
                <div className={styles['item-date']}>{item.date}</div>
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
