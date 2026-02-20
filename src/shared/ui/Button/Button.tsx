import { ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonProps = {
    children: ReactNode;
    ariaLabel: string;
    onClick: (arg: boolean) => void;
}

export const Button = ({ children, onClick, ariaLabel } : ButtonProps) => {
  return (
    <button 
        className={styles.button} 
        aria-label={ariaLabel}
        onClick={() => onClick(true)}
    >
        <span className={styles.text}>
            { children }
        </span>
    </button>
  )
};