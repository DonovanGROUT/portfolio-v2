import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { vi } from 'vitest';
import React from 'react';

// Interface pour les options personnalisées de rendu
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  // Réservé pour de futurs providers (context, theme, etc.)
  providers?: React.ComponentType<{ children: React.ReactNode }>[];
}

// Fonction de rendu personnalisée qui wrapper les composants avec les providers nécessaires
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  // Pour l'instant, rendu simple, mais on pourra ajouter des wrappers plus tard
  return render(ui, options);
};

// Re-export de tout ce dont on a besoin
export * from '@testing-library/react';
export { customRender as render };

// Utilitaires de test personnalisés
export const createMockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

export const createMockMatchMedia = (matches = false) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};
