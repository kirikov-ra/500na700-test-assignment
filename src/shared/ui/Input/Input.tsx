import { InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  const id = useId();

  const fieldClass = clsx(styles.input, error ? styles['input-error'] : undefined);

  return (
    <div className={styles['input-wrapper']}>
      <input
        id={id}
        className={fieldClass}
        placeholder={label}
        aria-label={label}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />

      {error && (
        <span className={styles.error} id={`${id}-error`}>
          {error}
        </span>
      )}
    </div>
  );
};
