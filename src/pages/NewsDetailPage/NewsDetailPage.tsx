import { useParams, Link } from 'react-router-dom';
import { Container } from '@/shared/ui/Container/Container';
import { NewsDetailSkeleton } from '@/entities/news/ui/NewsDetailSkeleton/NewsDetailSkeleton';
import styles from './NewsDetailPage.module.scss';
import { useNewsDetail } from '@/shared/hooks/useNewsDetail';

export const NewsDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { item: newItem, isLoading: loading, error } = useNewsDetail(id);

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
          <div className={styles['news-detail__header']}>
            <h1 className={styles['news-detail__title']}>{newItem?.title}</h1>
            <div className={styles['news-detail__date']}>{newItem?.date}</div>
            <div className={styles['news-detail__description']}>
              {newItem?.description}
            </div>
          </div>
          <div className={styles['news-detail__body']}>
            <div className={styles['news-detail__text']}>{newItem?.content}</div>
          </div>
        </article>
      )}
    </Container>
  );
};
