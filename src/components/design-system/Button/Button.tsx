'use client';

// Composant Button - Design System Portfolio
// Accessible, responsive, sécurisé avec variants et états
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

// ===================================================================
// TYPES & INTERFACES
// ===================================================================

/**
 * Variants disponibles pour le bouton
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

/**
 * Tailles disponibles pour le bouton
 */
export type ButtonSize = 'small' | 'medium' | 'large';

/**
 * Props du composant Button
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Variant du bouton (style visuel) */
  variant?: ButtonVariant;
  /** Taille du bouton */
  size?: ButtonSize;
  /** État de chargement - désactive le bouton et affiche un indicateur */
  loading?: boolean;
  /** Classe CSS personnalisée */
  className?: string;
  /** Contenu du bouton */
  children: React.ReactNode;
}

// ===================================================================
// VARIANTES DE STYLES (CSS Classes)
// ===================================================================

const buttonVariants = {
  // Styles de base communs - Design System Donovan GROUT
  base: [
    // Layout et dimensionnement
    'inline-flex items-center justify-center',
    'border border-solid rounded-lg', // radius moderne (8px)
    'font-medium text-center whitespace-nowrap',
    'transition-all duration-200 ease-in-out', // transition plus fluide

    // Accessibilité et UX améliorée
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'active:scale-[0.98]', // Micro feedback au clic (dynamisme sportif)

    // Touch targets (minimum 44px pour mobile)
    'min-h-[44px] min-w-[44px]',

    // États hover et focus optimisés
    'transform-gpu', // Optimisation performances
  ].join(' '),

  // Variants visuels - Palette "Tech & Nature"
  variants: {
    primary: [
      // Couleur principale - Bleu océan normand
      'bg-sky-700 border-sky-700 text-white',
      'hover:bg-sky-800 hover:border-sky-800 hover:shadow-md',
      'focus:ring-sky-500',
      'active:bg-sky-900',
      'disabled:bg-sky-300 disabled:border-sky-300',
      'shadow-sm', // Ombrage subtil pour profondeur
    ].join(' '),

    secondary: [
      // Couleur secondaire - Vert éco-conception (WCAG AA compliant)
      'bg-emerald-700 border-emerald-700 text-white',
      'hover:bg-emerald-800 hover:border-emerald-800 hover:shadow-md',
      'focus:ring-emerald-500',
      'active:bg-emerald-900',
      'disabled:bg-emerald-300 disabled:border-emerald-300',
      'shadow-sm',
    ].join(' '),

    outline: [
      // Variante outline - Moderne et épurée
      'bg-transparent border-sky-700 text-sky-700',
      'hover:bg-sky-50 hover:border-sky-800 hover:text-sky-800',
      'focus:ring-sky-500',
      'active:bg-sky-100',
      'disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-400',
      // Pas d'ombre pour style épuré
    ].join(' '),
  },

  // Tailles optimisées pour l'accessibilité
  sizes: {
    small: 'px-3 py-1.5 text-sm leading-5', // Compact mais accessible
    medium: 'px-4 py-2 text-base leading-6', // Taille standard confortable
    large: 'px-6 py-3 text-lg leading-7', // Prominente et impactante
  },
};

// ===================================================================
// COMPOSANT BUTTON
// ===================================================================

/**
 * Composant Button accessible et responsive
 *
 * Fonctionnalités :
 * - Variants visuels (primary, secondary, outline)
 * - Tailles multiples (small, medium, large)
 * - États (normal, disabled, loading)
 * - Accessibilité complète (WCAG 2.1 AA)
 * - Touch-friendly (44px minimum)
 * - Sécurité XSS (échappement automatique)
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      loading = false,
      disabled = false,
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    // ===================================================================
    // LOGIQUE DE GESTION DES ÉTATS
    // ===================================================================

    const isDisabled = disabled || loading;

    // Gestion sécurisée des événements
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      // Prévention XSS : ne pas exécuter si disabled/loading
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      // Appel sécurisé du handler
      onClick?.(event);
    };

    // Gestion clavier accessible
    const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) {
        event.preventDefault();
        return;
      }

      // Support Enter et Space (standards d'accessibilité)
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        handleClick(event as unknown as React.MouseEvent<HTMLButtonElement>);
      }
    };

    // ===================================================================
    // CONSTRUCTION DES CLASSES CSS
    // ===================================================================

    const buttonClasses = cn(
      // Classes de base
      'btn',
      buttonVariants.base,

      // Variant principal
      `btn-${variant}`,
      buttonVariants.variants[variant],

      // Taille
      `btn-${size}`,
      buttonVariants.sizes[size],

      // États conditionnels
      {
        'btn-disabled': isDisabled,
        'btn-loading': loading,
      },

      // Classes personnalisées
      className
    );

    // ===================================================================
    // RENDU DU COMPOSANT
    // ===================================================================

    return (
      <button
        ref={ref}
        type="button"
        className={buttonClasses}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        // Accessibilité ARIA
        aria-disabled={isDisabled}
        aria-busy={loading}
        tabIndex={isDisabled ? -1 : 0}
        // Props HTML additionnelles
        {...props}
      >
        {/* Indicateur de chargement */}
        {loading && (
          <span
            className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
            aria-hidden="true"
          />
        )}

        {/* Contenu du bouton (échappé automatiquement par React) */}
        {children}
      </button>
    );
  }
);

// Nom d'affichage pour les DevTools
Button.displayName = 'Button';
