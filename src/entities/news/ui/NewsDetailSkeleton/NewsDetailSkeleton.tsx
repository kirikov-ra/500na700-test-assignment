import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import styles from './NewsDetailSkeleton.module.scss';

const BODY_LINES_COUNT = 5;

export const NewsDetailSkeleton = () => {
  return (
    <div className={styles['news-detail-skeleton']}>
      <div className={styles['image-wrapper']}>
        <Skeleton className={styles.image} />
      </div>

      <div className={styles.header}>
        <Skeleton className={styles.title} height="48px" />

        <Skeleton className={styles['date']} height="18px" width="140px" />

        <Skeleton className={styles.description} height="24px" />

        <Skeleton className={styles.description} height="24px" width="85%" />
      </div>

      <div className={styles.body}>
        {Array.from({ length: BODY_LINES_COUNT }).map((_, i) => (
          <Skeleton key={i} className={styles['text-line']} height="18px" />
        ))}
      </div>
    </div>
  );
};
