// ===================================================================
// COMPOSANT TYPOGRAPHY - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Système typographique accessible, variants, couleurs, responsive, alignements, WCAG 2.1 AA
// ===================================================================
import React from 'react';

// -------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------

type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'body-large'
  | 'caption';
type TypographyColor =
  | 'primary'
  | 'secondary'
  | 'neutral'
  | 'muted'
  | 'inherit';
type TypographyAlign = 'left' | 'center' | 'right' | 'justify';
type AllowedElements = 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';

export interface TypographyProps {
  /** Contenu du composant */
  children: React.ReactNode;

  /** Variant typographique qui détermine la balise HTML et les styles */
  variant?: TypographyVariant;

  /** Couleur du texte selon la charte graphique */
  color?: TypographyColor;

  /** Alignement du texte */
  align?: TypographyAlign;

  /** Active les classes responsive (mobile-first) */
  responsive?: boolean;

  /** Tronque le texte avec ellipsis */
  truncate?: boolean;

  /** Balise HTML personnalisée (override le variant) */
  as?: AllowedElements;

  /** Classes CSS personnalisées */
  className?: string;

  /** Attributs HTML standards */
  id?: string;
  'data-testid'?: string;
  title?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  role?: string;
}

// -------------------------------------------------------------------
// CONFIGURATION DES VARIANTS
// -------------------------------------------------------------------

const variantConfig = {
  h1: {
    element: 'h1' as AllowedElements,
    baseClasses: 'text-4xl font-bold leading-tight',
    responsiveClasses: 'text-2xl md:text-4xl',
  },
  h2: {
    element: 'h2' as AllowedElements,
    baseClasses: 'text-3xl font-semibold leading-tight',
    responsiveClasses: 'text-xl md:text-3xl',
  },
  h3: {
    element: 'h3' as AllowedElements,
    baseClasses: 'text-2xl font-semibold leading-tight',
    responsiveClasses: 'text-lg md:text-2xl',
  },
  h4: {
    element: 'h4' as AllowedElements,
    baseClasses: 'text-xl font-medium leading-tight',
    responsiveClasses: 'text-base md:text-xl',
  },
  body: {
    element: 'p' as AllowedElements,
    baseClasses: 'text-base font-normal leading-relaxed',
    responsiveClasses: 'text-sm md:text-base',
  },
  'body-large': {
    element: 'p' as AllowedElements,
    baseClasses: 'text-lg font-normal leading-relaxed',
    responsiveClasses: 'text-base md:text-lg',
  },
  caption: {
    element: 'span' as AllowedElements,
    baseClasses: 'text-sm font-normal leading-normal',
    responsiveClasses: 'text-xs md:text-sm',
  },
} as const;

const colorConfig = {
  primary: 'text-sky-700',
  secondary: 'text-emerald-700',
  neutral: 'text-slate-700',
  muted: 'text-slate-500',
  inherit: 'text-inherit',
} as const;

const alignConfig = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
} as const;

// -------------------------------------------------------------------
// COMPOSANT PRINCIPAL TYPOGRAPHY
// -------------------------------------------------------------------

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  (
    {
      children,
      variant = 'h1',
      color = 'inherit',
      align,
      responsive = false,
      truncate = false,
      as,
      className,
      ...props
    },
    ref
  ) => {
    // Détermine la balise HTML à utiliser
    const Element = as || variantConfig[variant].element;

    // Configuration du variant
    const config = variantConfig[variant];

    // Construction des classes CSS - OPTIMISÉE PERFORMANCE
    const baseClasses = responsive
      ? config.responsiveClasses
      : config.baseClasses;
    const colorClass = colorConfig[color];
    const alignClass = align ? alignConfig[align] : '';
    const truncateClass = truncate ? 'truncate' : '';

    const classes = [
      baseClasses,
      colorClass,
      alignClass,
      truncateClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return React.createElement(
      Element,
      {
        ref,
        className: classes,
        ...props,
      },
      children
    );
  }
);

Typography.displayName = 'Typography';
