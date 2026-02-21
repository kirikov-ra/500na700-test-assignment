import { InputHTMLAttributes, useId } from 'react';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({ label, error, ...props }: InputProps) => {
  const fieldClass = `${styles.field} ${error ? styles['field--error'] : ''}`;
  const id = useId();
  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={id} className={styles.visuallyHidden}>
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
      {error && <span className={styles.errorMsg}>{error}</span>}
    </div>
  );
};
