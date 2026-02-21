import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import styles from './NewsSkeleton.module.scss';

export const NewsCardSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageWrapper}>
        <Skeleton className={styles.image} />
      </div>
      <Skeleton className={styles.title} />
      <div className={styles.descWrapper}>
        <Skeleton className={styles.descLine} />
        <Skeleton className={styles.descLine} />
        <Skeleton className={styles.descLine} width="60%" />
      </div>
      <Skeleton className={styles.date} width="80px" />
    </div>
  );
};
