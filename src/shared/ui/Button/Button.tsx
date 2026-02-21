import { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

type Color = 'white' | 'black';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  children: React.ReactNode;
  ariaLabel?: string;
};

export const Button = ({
  color = 'white',
  disabled,
  className,
  children,
  ariaLabel,
  ...rest
}: Props) => {
  const isDisabled = disabled;

  return (
    <button
      className={clsx(styles['button'], styles[`button--${color}`], className)}
      aria-label={ariaLabel}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      {...rest}
    >
      {children}
    </button>
  );
};

Button.displayName = 'Button';
