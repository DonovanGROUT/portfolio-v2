'use client';

// ===================================================================
// COMPOSANT BUTTON - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Accessible, responsive, sécurisé, variants, tailles, états, WCAG 2.1 AA
// ===================================================================

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { colors } from '../../../lib/colors';

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
    // CONSTRUCTION DES STYLES INLINE - SYSTÈME COLORS.TS
    // ===================================================================

    // Styles de base selon les variants
    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            backgroundColor: colors.primary[700],
            borderColor: colors.primary[700],
            color: '#ffffff',
          };
        case 'secondary':
          return {
            backgroundColor: colors.secondary[600],
            borderColor: colors.secondary[600],
            color: '#ffffff',
          };
        case 'outline':
          return {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: colors.primary[700],
            color: colors.primary[700],
          };
        default:
          return {
            backgroundColor: colors.primary[700],
            borderColor: colors.primary[700],
            color: '#ffffff',
          };
      }
    };

    // Gestion des états hover et focus
    const handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      const button = event.currentTarget;
      switch (variant) {
        case 'primary':
          button.style.backgroundColor = colors.primary[800];
          button.style.borderColor = colors.primary[800];
          break;
        case 'secondary':
          button.style.backgroundColor = colors.secondary[700];
          button.style.borderColor = colors.secondary[700];
          break;
        case 'outline':
          button.style.backgroundColor = colors.primary[50];
          button.style.color = colors.primary[800];
          break;
      }
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement>) => {
      if (isDisabled) return;

      const button = event.currentTarget;
      const baseStyles = getVariantStyles();
      button.style.backgroundColor = baseStyles.backgroundColor;
      button.style.borderColor = baseStyles.borderColor;
      button.style.color = baseStyles.color;
    };

    const handleFocus = (event: React.FocusEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      button.style.boxShadow = `0 0 0 2px ${colors.primary[500]}40`;
    };

    const handleBlur = (event: React.FocusEvent<HTMLButtonElement>) => {
      const button = event.currentTarget;
      button.style.boxShadow = 'none';
    };

    const baseStyles: React.CSSProperties = getVariantStyles();

    // Styles disabled
    if (isDisabled) {
      baseStyles.opacity = '0.5';
      baseStyles.cursor = 'not-allowed';
    }

    const sizeClasses: Record<string, string> = {
      small: 'px-3 py-1.5 text-sm leading-5',
      medium: 'px-4 py-2 text-base leading-6',
      large: 'px-6 py-3 text-lg leading-7',
    };

    const classes = [
      'inline-flex items-center justify-center border border-solid rounded-lg font-medium text-center whitespace-nowrap transition-all duration-200 ease-in-out focus:outline-none active:scale-[0.98] min-h-[44px] min-w-[44px] transform-gpu',
      sizeClasses[size],
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
        style={baseStyles}
        disabled={isDisabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
