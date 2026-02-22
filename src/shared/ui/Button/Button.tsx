import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

type Color = 'white' | 'black';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  children: React.ReactNode;
  ariaLabel?: string;
};

export const Button = ({ color = 'white', children, ariaLabel, ...rest }: Props) => {
  return (
    <button
      className={clsx(styles.button, styles[`button-${color}`])}
      aria-label={ariaLabel}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
