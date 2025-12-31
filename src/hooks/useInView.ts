/**
 * Hook useInView - Détecte quand un élément entre dans le viewport
 * Basé sur IntersectionObserver API
 * Respecte prefers-reduced-motion (WCAG)
 */

import { useEffect, useRef, useState } from 'react';

export interface UseInViewOptions {
  /** Seuil de visibilité (0 = dès 1px visible, 1 = 100% visible) */
  threshold?: number;
  /** Marge avant déclenchement (ex: '-100px' = 100px avant viewport) */
  rootMargin?: string;
  /** Déclencher une seule fois ? */
  triggerOnce?: boolean;
}

export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respecter prefers-reduced-motion (WCAG)
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      // Si reduced-motion, afficher immédiatement
      setIsInView(true);
      setHasBeenInView(true);
      return;
    }

    // Créer l'observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry?.isIntersecting ?? false;

        if (inView) {
          setIsInView(true);
          setHasBeenInView(true);

          // Si triggerOnce, arrêter d'observer
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, hasBeenInView };
}
