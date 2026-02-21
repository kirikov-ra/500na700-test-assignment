import { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './button.module.scss';

type Color = 'white' | 'black';
type Size = 'normal' | 'large';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  color?: Color;
  size?: Size;
  children: React.ReactNode;
  ariaLabel?: string;
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      color = 'white',
      size = 'normal',
      disabled,
      className,
      children,
      ariaLabel,
      ...rest
    },
    ref,
  ) => {
    const isDisabled = disabled;

    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          styles.button,
          styles[`button--${color}`],
          styles[`button--${size}`],
          className,
        )}
        aria-label={ariaLabel}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
