import { InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.scss';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  const id = useId();

  const fieldClass = clsx(
    styles['input__field'],
    error ? styles['input__field--error'] : undefined,
  );

  return (
    <div className={styles.input}>
      {label && (
        <label htmlFor={id} className={styles['input__label--hidden']}>
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

      {error && <span className={styles['input__error']}>{error}</span>}
    </div>
  );
};
