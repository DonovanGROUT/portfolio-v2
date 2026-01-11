'use client';

import Link from 'next/link';
import { AnchorHTMLAttributes, forwardRef } from 'react';
import type { ButtonVariant, ButtonSize } from '../Button/Button';

export interface LinkButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  'href'
> {
  href: string;
  variant?: ButtonVariant | 'outline-white';
  size?: ButtonSize;
  disabled?: boolean;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const LinkButton = forwardRef<HTMLAnchorElement, LinkButtonProps>(
  (
    {
      href,
      variant = 'primary',
      size = 'medium',
      disabled = false,
      external = false,
      className = '',
      children,
      onClick,
      'aria-label': ariaLabel,
      ...props
    },
    ref
  ) => {
    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
      if (disabled) {
        event.preventDefault();
        return;
      }
      onClick?.(event);
    };

    const variantClasses: Record<ButtonVariant | 'outline-white', string> = {
      primary:
        'bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800',
      secondary: 'bg-sky-700 border-sky-700 text-white hover:bg-sky-800',
      outline: 'bg-transparent border-sky-700 text-sky-700 hover:bg-sky-50',
      'outline-white':
        'bg-transparent border-white text-white hover:bg-white/10',
    };

    const sizeClasses: Record<ButtonSize, string> = {
      small: 'px-3 py-1.5 text-sm leading-5',
      medium: 'px-4 py-2 text-base leading-6',
      large: 'px-6 py-3 text-lg leading-7',
    };

    const stateClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

    const classes = [
      'inline-flex items-center justify-center border border-solid rounded-lg font-medium text-center whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-2 focus:outline-offset-2 focus:outline-primary-700 active:scale-[0.98] min-h-[44px] min-w-[44px] transform-gpu',
      variantClasses[variant],
      sizeClasses[size],
      stateClasses,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    if (external) {
      return (
        <a
          ref={ref}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={handleClick}
          aria-label={ariaLabel}
          {...(disabled && { 'aria-disabled': true })}
          {...props}
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        ref={ref}
        href={href}
        className={classes}
        onClick={handleClick}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
      >
        {children}
      </Link>
    );
  }
);

LinkButton.displayName = 'LinkButton';
