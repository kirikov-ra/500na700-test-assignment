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
        <div className={styles['status-error']}>{error || 'Новость не найдена'}</div>
        <Link to="/" className={styles['back-link']}>
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
        <article className={styles.article}>
          <figure className={styles['image-wrapper']}>
            <img src={newItem?.image} alt={newItem?.title} className={styles.image} />
          </figure>
          <div className={styles.header}>
            <h1 className={styles.title}>{newItem?.title}</h1>
            <time className={styles.date}>{newItem?.date}</time>
            <p className={styles.description}>{newItem?.description}</p>
          </div>
          <div className={styles.body}>
            <p className={styles.text}>{newItem?.content}</p>
          </div>
        </article>
      )}
    </Container>
  );
};
