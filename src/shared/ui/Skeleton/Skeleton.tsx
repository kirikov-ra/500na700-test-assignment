import { CSSProperties } from 'react';
import styles from './Skeleton.module.scss';
import clsx from 'clsx';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  style?: CSSProperties;
}

export const Skeleton = ({
  className,
  width,
  height,
  borderRadius,
  style,
}: SkeletonProps) => {
  return (
    <div
      aria-hidden="true"
      className={clsx(styles['skeleton'], className)}
      style={{ width, height, borderRadius, ...style }}
    />
  );
};
