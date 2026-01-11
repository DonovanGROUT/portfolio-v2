'use client';

// ===================================================================
// TYPES & INTERFACES
// ===================================================================

/**
 * Variants disponibles pour la card
 */
// Voir CardProps plus bas

// COMPOSANT CARD - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Carte modulaire, accessible, responsive, sécurisée, avec variants, tailles, états, composition, accessibilité WCAG 2.1 AA et sécurité XSS.
// ===================================================================

import React from 'react';
import Image, { ImageProps } from 'next/image';
import { colors } from '../../../lib/colors';
import { Typography } from '../Typography/Typography';

/**
 * Props du composant Card principal
 */

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Variante visuelle de la card */
  variant?:
    | 'default'
    | 'project'
    | 'skill'
    | 'experience'
    | 'testimonial'
    | 'skill-inline';
  /** Taille de la card */
  size?: 'sm' | 'md' | 'lg';
  /** Active l'effet hover */
  hover?: boolean;
  /** Active l'état clickable */
  clickable?: boolean;
  /** Désactive la card */
  disabled?: boolean;
  /** Affiche un état de chargement */
  loading?: boolean;
  /** Désactive la responsivité */
  responsive?: boolean;
  /** Classes CSS personnalisées */
  className?: string;
  /** Enfants de la card */
  children?: React.ReactNode;
  /** Couleur de bordure pour variant skill-inline */
  categoryColor?: string;
}

// Sous-composants Card
// -------------------------------------------------------------------
// HEADER
// -------------------------------------------------------------------
function CardHeader({
  /**
   * Header de la Card (section supérieure)
   */
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={`border-b border-slate-200 px-6 py-4 ${className}`}
      {...props}
    >
      <Typography variant="h3" color="neutral" as="span">
        {children}
      </Typography>
    </header>
  );
}

function CardBody({
  // -------------------------------------------------------------------
  // BODY
  // -------------------------------------------------------------------
  /**
   * Body de la Card (contenu principal)
   */
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`px-6 py-4 ${className}`} {...props}>
      <Typography variant="body" color="neutral" as="div">
        {children}
      </Typography>
    </section>
  );
}

function CardFooter({
  // -------------------------------------------------------------------
  // FOOTER
  // -------------------------------------------------------------------
  /**
   * Footer de la Card (section inférieure)
   */
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer
      className={`border-t border-slate-200 px-6 py-4 ${className}`}
      {...props}
    >
      <Typography variant="caption" color="muted" as="span">
        {children}
      </Typography>
    </footer>
  );
}

function CardImage({
  // -------------------------------------------------------------------
  // IMAGE
  // -------------------------------------------------------------------
  /**
   * Image optimisée Next.js pour la Card
   */
  src,
  alt,
  className = '',
  ...props
}: Omit<ImageProps, 'src' | 'alt'> & {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      className={`h-48 object-cover ${className}`}
      width={600}
      height={192}
      style={{ width: 'auto', height: 'auto' }}
      {...props}
    />
  );
}

/**
 * Props du sous-composant Header
 */
export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Props du sous-composant Body
 */
export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Props du sous-composant Footer
 */
export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Props du sous-composant Image
 */
export interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

// -------------------------------------------------------------------
// COMPOSANT PRINCIPAL CARD
// -------------------------------------------------------------------
/**
 * Composant Card principal
 *
 * Fonctionnalités :
 * - Variants visuels (project, skill, experience, testimonial)
 * - Tailles multiples (sm, md, lg)
 * - États interactifs (hover, clickable, disabled, loading)
 * - Composition modulaire (Header, Body, Footer, Image)
 * - Accessibilité WCAG 2.1 AA
 * - Sécurité XSS intégrée
 */

function CardBase({
  // -------------------------------------------------------------------
  // LOGIQUE DE CLASSE CSS & ACCESSIBILITÉ
  // -------------------------------------------------------------------
  children,
  variant = 'default',
  size = 'md',
  hover = false,
  clickable = false,
  disabled = false,
  loading = false,
  responsive = true,
  className = '',
  categoryColor,
  role = 'article',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...rest
}: CardProps) {
  // ===================================================================
  // STYLES AVEC SYSTÈME COLORS.TS
  // ===================================================================

  // Fonction pour obtenir les styles selon la variante
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'default':
        return {
          backgroundColor: '#ffffff',
          borderColor: colors.neutral[200],
        };
      case 'project':
        return {
          background: `linear-gradient(to bottom right, ${colors.primary[50]}, ${colors.secondary[50]})`,
          borderColor: colors.primary[200],
        };
      case 'skill':
        return {
          backgroundColor: colors.secondary[50],
          borderColor: colors.secondary[200],
        };
      case 'skill-inline':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          borderLeftColor: categoryColor || colors.neutral[300],
        };
      case 'experience':
        return {
          backgroundColor: colors.neutral[50],
          borderColor: colors.neutral[300],
        };
      case 'testimonial':
        return {
          background: `linear-gradient(to right, ${colors.secondary[50]}, ${colors.primary[50]})`,
          borderColor: colors.primary[200],
        };
      default:
        return {
          backgroundColor: '#ffffff',
          borderColor: colors.neutral[200],
        };
    }
  };

  // Gestion des événements hover
  const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
    if (!hover || disabled) return;

    const element = event.currentTarget;
    switch (variant) {
      case 'project':
        element.style.borderColor = colors.primary[300];
        break;
      case 'skill':
        element.style.borderColor = colors.secondary[300];
        break;
      case 'skill-inline':
        if (categoryColor) {
          element.style.borderLeftWidth = '8px';
        }
        break;
      case 'experience':
        element.style.borderColor = colors.neutral[400];
        break;
      case 'testimonial':
        element.style.borderColor = colors.secondary[300];
        break;
    }
  };

  const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
    if (!hover || disabled) return;

    const element = event.currentTarget;
    const baseStyles = getVariantStyles();
    if (variant === 'skill-inline') {
      element.style.borderLeftWidth = '4px';
    } else {
      element.style.borderColor = baseStyles.borderColor as string;
    }
  };

  const baseStyles = getVariantStyles();

  // Styles disabled
  if (disabled) {
    baseStyles.opacity = '0.5';
    baseStyles.cursor = 'not-allowed';
  }
  // Padding responsive pour toutes les tailles
  const paddingResponsive = 'p-4 md:p-6 lg:p-8';
  const sizeClasses: Record<string, string> = {
    sm: 'rounded-lg text-sm',
    md: 'rounded-xl text-base',
    lg: 'rounded-2xl text-lg',
  };
  const interactiveClasses = [
    hover ? 'transition-all duration-300 hover:scale-105 hover:shadow-lg' : '',
    clickable
      ? 'cursor-pointer transition-transform hover:scale-102 active:scale-98'
      : '',
    loading ? 'cursor-wait' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const responsiveClass = responsive !== false ? 'w-full' : '';
  const contrastClass =
    variant === 'project' || variant === 'default' ? 'text-slate-800' : '';
  const skillInlineClasses =
    variant === 'skill-inline'
      ? 'border-l-4 backdrop-blur-sm shadow-md'
      : 'border';

  const classes = [
    skillInlineClasses,
    paddingResponsive,
    sizeClasses[size],
    interactiveClasses,
    responsiveClass,
    contrastClass,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  // Filtrage XSS strict : autoriser uniquement data-testid, id, aria-*, tabIndex, style, on*, role
  const allowedProps = Object.fromEntries(
    Object.entries(rest).filter(([key]) =>
      /^((data-testid)|id|tabIndex|style|on[A-Z].*|role|aria-[a-z-]+)$/i.test(
        key
      )
    )
  );
  // Gestion accessibilité clavier pour les cards interactives
  const isInteractive = clickable;
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isInteractive) return;
    if (e.key === 'Enter' || e.key === ' ') {
      // Simuler un clic si la card est clickable
      (e.target as HTMLElement).click();
      e.preventDefault();
    }
  };

  return (
    <article
      className={classes}
      style={baseStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role={role}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      aria-busy={loading ? 'true' : undefined}
      aria-disabled={disabled ? 'true' : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      {...allowedProps}
    >
      {children}
    </article>
  );
}

// Attacher les sous-composants à Card
// -------------------------------------------------------------------
// EXPORTS
// -------------------------------------------------------------------
export const Card = Object.assign(CardBase, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
});
