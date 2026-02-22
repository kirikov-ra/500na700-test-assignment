import { InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  const id = useId();

  const fieldClass = clsx(styles.field, error ? styles['field--error'] : undefined);

  return (
    <div className={styles.input}>
      {label && (
        <label htmlFor={id} className={styles['label--hidden']}>
          {label}
        </label>
      )}

      <input
        id={id}
        placeholder={label}
        className={fieldClass}
        aria-invalid={!!error}
        {...props}
      />

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};
