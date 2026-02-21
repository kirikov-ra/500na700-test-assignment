import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import styles from './NewsDetailSkeleton.module.scss';

export const NewsDetailSkeleton = () => {
  return (
    <div className={styles.articleSkeleton}>
      <div className={styles.imageWrapper}>
        <Skeleton className={styles.image} />
      </div>
      <div className={styles.contentWrapper}>
        <Skeleton className={styles.titleLine} />
        <Skeleton className={styles.titleLine} width="60%" />
        <Skeleton className={styles.date} width="100px" />

        <div className={styles.textBlock}>
          <Skeleton className={styles.descLine} />
          <Skeleton className={styles.descLine} width="90%" />
        </div>

        <div className={styles.textBlock}>
          <Skeleton className={styles.contentLine} />
          <Skeleton className={styles.contentLine} />
          <Skeleton className={styles.contentLine} width="80%" />
        </div>
      </div>
    </div>
  );
};
