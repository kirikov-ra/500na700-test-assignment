import { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container/Container';
import styles from './NewsPage.module.scss';
import { NewsCardSkeleton } from '@/entities/news/ui/NewsCardSkeleton/NewsCardSkeleton';
import { useNews } from '@/shared/hooks/useNews';

const SKELETON_COUNT = 9;

export const NewsPage = () => {
  const { data: news, isLoading, error, hasMore, fetchNextPage } = useNews();
  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLLIElement | null) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, fetchNextPage],
  );

  if (error) {
    return (
      <Container>
        <div className={styles.container}>Ошибка: {error}</div>
      </Container>
    );
  }

  return (
    <Container>
      <div className={styles.container}>
        <h1 className={styles.title}>Новости</h1>

        <ul className={styles.list}>
          {news.map((item, index) => {
            const isLastElement = index === news.length - 1;
            return (
              <li key={item.id} ref={isLastElement ? lastElementRef : null}>
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
            );
          })}

          {/* Показываем скелетоны во время первичной загрузки и при подгрузке новых данных */}
          {isLoading &&
            Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <NewsCardSkeleton key={`skeleton-${i}`} />
            ))}
        </ul>

        {!isLoading && news.length === 0 && <div>Список новостей пуст.</div>}
      </div>
    </Container>
  );
};
