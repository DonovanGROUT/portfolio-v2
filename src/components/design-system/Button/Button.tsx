'use client';

// ===================================================================
// COMPOSANT BUTTON - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Accessible, responsive, sécurisé, variants, tailles, états, WCAG 2.1 AA
// ===================================================================

import { ButtonHTMLAttributes, forwardRef } from 'react';

// -------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------

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

// -------------------------------------------------------------------
// COMPOSANT PRINCIPAL BUTTON
// -------------------------------------------------------------------

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
 * - Performance optimisée (classes CSS statiques)
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
    // CONSTRUCTION DES CLASSES CSS - OPTIMISÉE PERFORMANCE
    // ===================================================================

    // Classes de base selon l'approche optimisée Card
    const variantClasses: Record<string, string> = {
      primary:
        'bg-sky-700 border-sky-700 text-white hover:bg-sky-800 hover:border-sky-800 hover:shadow-md focus:ring-sky-500 active:bg-sky-900 disabled:bg-sky-300 disabled:border-sky-300 shadow-sm',
      secondary:
        'bg-emerald-700 border-emerald-700 text-white hover:bg-emerald-800 hover:border-emerald-800 hover:shadow-md focus:ring-emerald-500 active:bg-emerald-900 disabled:bg-emerald-300 disabled:border-emerald-300 shadow-sm',
      outline:
        'bg-transparent border-sky-700 text-sky-700 hover:bg-sky-50 hover:border-sky-800 hover:text-sky-800 focus:ring-sky-500 active:bg-sky-100 disabled:bg-transparent disabled:border-slate-300 disabled:text-slate-400',
    };

    const sizeClasses: Record<string, string> = {
      small: 'px-3 py-1.5 text-sm leading-5',
      medium: 'px-4 py-2 text-base leading-6',
      large: 'px-6 py-3 text-lg leading-7',
    };

    const disabledClass = isDisabled ? 'cursor-not-allowed opacity-50' : '';
    const loadingClass = loading ? 'cursor-wait' : '';

    const classes = [
      'inline-flex items-center justify-center border border-solid rounded-lg font-medium text-center whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] min-h-[44px] min-w-[44px] transform-gpu',
      variantClasses[variant],
      sizeClasses[size],
      disabledClass,
      loadingClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    // ===================================================================
    // RENDU DU COMPOSANT
    // ===================================================================

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
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
