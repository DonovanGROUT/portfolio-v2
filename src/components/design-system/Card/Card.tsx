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

/**
 * Props du composant Card principal
 */

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Variante visuelle de la card */
  variant?: 'default' | 'project' | 'skill' | 'experience' | 'testimonial';
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
      className={`border-b border-slate-200 px-6 py-4 font-semibold ${className}`}
      {...props}
    >
      {children}
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
      {children}
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
      className={`border-t border-slate-200 px-6 py-4 text-sm text-slate-500 ${className}`}
      {...props}
    >
      {children}
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
  role = 'article',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...rest
}: CardProps) {
  // Classes de base selon la charte graphique
  const variantClasses: Record<string, string> = {
    default: 'bg-white border-slate-200',
    project:
      'bg-gradient-to-br from-sky-50 to-emerald-50 border-sky-200 hover:border-sky-300',
    skill: 'bg-emerald-50 border-emerald-200 hover:border-emerald-300',
    experience: 'bg-slate-50 border-slate-300 hover:border-slate-400',
    testimonial:
      'bg-gradient-to-r from-emerald-50 to-sky-50 border-sky-200 hover:border-emerald-300',
  };
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
    disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '',
    loading ? 'bg-slate-200 text-slate-800 cursor-wait' : '',
  ]
    .filter(Boolean)
    .join(' ');
  const responsiveClass = responsive !== false ? 'w-full' : '';
  const contrastClass =
    variant === 'project' || variant === 'default' ? 'text-slate-800' : '';

  const classes = [
    'border',
    variantClasses[variant],
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
