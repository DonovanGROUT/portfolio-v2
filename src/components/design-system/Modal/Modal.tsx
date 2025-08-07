// ===================================================================
// COMPOSANT MODAL - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Interface modale accessible, responsive, sécurisée, avec gestion focus,
// variants de taille, intégration Button/Typography, WCAG 2.1 AA
// ===================================================================

'use client';

import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { modalColors } from '../../../lib/colors';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

/**
 * Interface des propriétés du composant Modal
 */
export interface ModalProps {
  /** Contrôle la visibilité du modal */
  isOpen: boolean;

  /** Callback appelé lors de la fermeture du modal */
  onClose: () => void;

  /** Titre du modal (optionnel) */
  title?: string;

  /** Description du modal pour l'accessibilité (optionnel) */
  description?: string;

  /** Taille du modal */
  size?: 'small' | 'medium' | 'large' | 'full';

  /** Afficher le bouton de fermeture */
  showCloseButton?: boolean;

  /** Permettre la fermeture par la touche Escape */
  closeOnEscape?: boolean;

  /** Permettre la fermeture par clic sur l'overlay */
  closeOnOverlay?: boolean;

  /** Classes CSS personnalisées */
  className?: string;

  /** Contenu du modal */
  children: React.ReactNode;

  /** Callback appelé après l'ouverture */
  onAfterOpen?: () => void;

  /** Callback appelé après la fermeture */
  onAfterClose?: () => void;
}

type ModalSize = 'small' | 'medium' | 'large' | 'full';

/**
 * Hook personnalisé pour la gestion du piège de focus
 * Maintient le focus à l'intérieur du modal quand il est ouvert
 */
const useFocusTrap = (
  isOpen: boolean,
  containerRef: React.RefObject<HTMLDivElement | null>
) => {
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Sauvegarder l'élément actuellement focalisé
    previousFocusRef.current = document.activeElement as HTMLElement;

    // Fonction pour obtenir tous les éléments focusables
    const getFocusableElements = (): HTMLElement[] => {
      if (!containerRef.current) return [];

      const selector = [
        'button:not([disabled])',
        'input:not([disabled])',
        'textarea:not([disabled])',
        'select:not([disabled])',
        'a[href]',
        '[tabindex]:not([tabindex="-1"])',
      ].join(', ');

      return Array.from(containerRef.current.querySelectorAll(selector));
    };

    // Fonction de gestion des touches
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab : aller vers l'élément précédent
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab : aller vers l'élément suivant
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Ajouter l'écouteur d'événements
    document.addEventListener('keydown', handleKeyDown);

    // Focuser le premier élément focusable au montage avec un délai
    const focusTimer = setTimeout(() => {
      const focusableElements = getFocusableElements();
      if (focusableElements.length > 0) {
        focusableElements[0]?.focus();
      }
    }, 100); // Délai pour laisser le modal se rendre

    // Cleanup : retirer l'écouteur et restaurer le focus
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);

      // Restaurer le focus à l'élément précédent
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [isOpen, containerRef]);
};

/**
 * Hook personnalisé pour la gestion de la touche Escape
 */
const useEscapeKey = (
  isOpen: boolean,
  onClose: () => void,
  closeOnEscape: boolean
) => {
  useEffect(() => {
    if (!isOpen || !closeOnEscape) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);
};

/**
 * Hook personnalisé pour bloquer le scroll du body
 */
const useBodyScrollLock = (isOpen: boolean) => {
  useEffect(() => {
    if (!isOpen) return;

    // Sauvegarder la valeur actuelle
    const originalOverflow = document.body.style.overflow;

    // Bloquer le scroll
    document.body.style.overflow = 'hidden';

    // Restaurer au démontage
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);
};

/**
 * Composant Modal principal
 */
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  size = 'medium',
  showCloseButton = true,
  closeOnEscape = true,
  closeOnOverlay = true,
  className = '',
  children,
  onAfterOpen,
  onAfterClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleId = useMemo(
    () => `modal-title-${Math.random().toString(36).substr(2, 9)}`,
    []
  );
  const descriptionId = useMemo(
    () => `modal-description-${Math.random().toString(36).substr(2, 9)}`,
    []
  );

  // Hooks personnalisés
  useFocusTrap(isOpen, modalRef);
  useEscapeKey(isOpen, onClose, closeOnEscape);
  useBodyScrollLock(isOpen);

  // Callback pour la fermeture après animation
  useEffect(() => {
    if (isOpen && onAfterOpen) {
      const timer = setTimeout(onAfterOpen, 100);
      return () => clearTimeout(timer);
    } else if (!isOpen && onAfterClose) {
      const timer = setTimeout(onAfterClose, 300);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [isOpen, onAfterOpen, onAfterClose]);

  // Gestion du clic sur l'overlay
  const handleOverlayClick = useCallback(
    (event: React.MouseEvent) => {
      if (closeOnOverlay && event.target === overlayRef.current) {
        onClose();
      }
    },
    [onClose, closeOnOverlay]
  );

  // Gestion du clic sur le bouton fermer
  const handleCloseClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // Calcul des classes CSS selon la taille
  const getSizeClasses = (size: ModalSize) => {
    const sizeMap = {
      small: 'max-w-md',
      medium: 'max-w-lg',
      large: 'max-w-4xl',
      full: 'max-w-full',
    };
    return sizeMap[size];
  };

  const sizeClasses = getSizeClasses(size);
  const responsiveClasses = 'mx-4 sm:mx-auto';
  const animationClasses = 'animate-in fade-in-0 zoom-in-95 duration-200';

  // Filtrage des props pour la sécurité
  const sanitizedProps = useMemo(() => {
    const allowedProps = ['id', 'data-testid'] as const;
    const filtered: Record<string, string | undefined> = {};

    // Type-safe property access - exclusion de className qui est gérée séparément
    const propMap: Record<string, string | undefined> = {
      id: undefined, // Modal doesn't have id prop
      'data-testid': undefined, // Modal doesn't have data-testid prop
    };

    allowedProps.forEach(prop => {
      const value = propMap[prop];
      if (value !== undefined) {
        filtered[prop] = value;
      }
    });

    return filtered;
  }, []);

  // Ne pas rendre si le modal n'est pas ouvert
  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{
        backgroundColor: modalColors.overlay,
      }}
      onClick={handleOverlayClick}
      data-testid="modal-overlay"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        className={[
          'relative w-full max-h-[90vh] overflow-hidden',
          animationClasses,
          sizeClasses,
          responsiveClasses,
          className || '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{
          backgroundColor: modalColors.background,
          borderRadius: modalColors.borderRadius,
          boxShadow: modalColors.shadow,
        }}
        onClick={e => e.stopPropagation()}
        {...sanitizedProps}
      >
        {/* En-tête du modal */}
        {(title || showCloseButton) && (
          <div
            className="flex items-center justify-between p-6"
            style={{
              borderBottom: `1px solid ${modalColors.border}`,
            }}
          >
            {title && (
              <Typography variant="h2" id={titleId} color="neutral">
                {title}
              </Typography>
            )}

            {showCloseButton && (
              <Button
                variant="outline"
                size="small"
                onClick={handleCloseClick}
                className="p-2 rounded-lg"
                aria-label="Fermer le modal"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            )}
          </div>
        )}

        {/* Description (si fournie) */}
        {description && (
          <div className="px-6 pt-4">
            <Typography variant="body" id={descriptionId} color="muted">
              {description}
            </Typography>
          </div>
        )}

        {/* Contenu du modal */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Export par défaut
export default Modal;
