import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import styles from './NewsDetailSkeleton.module.scss';

const BODY_LINES_COUNT = 5;

export const NewsDetailSkeleton = () => {
  return (
    <div className={styles['news-detail-skeleton']}>
      <div className={styles['news-detail-skeleton__image-wrapper']}>
        <Skeleton className={styles['news-detail-skeleton__image']} />
      </div>

      <div className={styles['news-detail-skeleton__header']}>
        <Skeleton className={styles['news-detail-skeleton__title']} height="48px" />

        <Skeleton
          className={styles['news-detail-skeleton__date']}
          height="18px"
          width="140px"
        />

        <Skeleton className={styles['news-detail-skeleton__description']} height="24px" />

        <Skeleton
          className={styles['news-detail-skeleton__description']}
          height="24px"
          width="85%"
        />
      </div>

      <div className={styles['news-detail-skeleton__body']}>
        {Array.from({ length: BODY_LINES_COUNT }).map((_, i) => (
          <Skeleton
            key={i}
            className={styles['news-detail-skeleton__text-line']}
            height="18px"
          />
        ))}
      </div>
    </div>
  );
};
