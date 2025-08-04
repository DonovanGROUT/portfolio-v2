// ===================================================================
// TESTS UNITAIRES POUR LA PAGE D'ACCUEIL DU PORTFOLIO
// ===================================================================
// Tests de rendu, interaction, responsivité, sécurité, mocks
// ===================================================================
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  render,
  screen,
  createMockMatchMedia,
  createMockIntersectionObserver,
} from '../test/utils';
import Home from './page';

describe("Page d'accueil", () => {
  beforeEach(() => {
    // Réinitialisation des mocks avant chaque test
    createMockMatchMedia(false);
    createMockIntersectionObserver();
  });

  // ============= TESTS DE RENDU GROUPÉS =============

  it('affiche tous les éléments principaux de la page', () => {
    render(<Home />);

    // Tests groupés pour éviter plusieurs renders
    const logo = screen.getByAltText('Next.js logo');
    const deployButton = screen.getByRole('link', { name: /Deploy now/i });
    const main = screen.getByRole('main');

    expect(logo).toBeInTheDocument();
    expect(deployButton).toBeInTheDocument();
    expect(deployButton).toHaveAttribute(
      'href',
      expect.stringContaining('vercel')
    );
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('flex', 'flex-col', 'gap-[32px]');
  });

  it('affiche toutes les icônes et liens avec sécurité appropriée', () => {
    render(<Home />);

    // Tests d'icônes groupés
    const icons = [
      screen.getByAltText('Vercel logomark'),
      screen.getByAltText('File icon'),
      screen.getByAltText('Window icon'),
      screen.getByAltText('Globe icon'),
    ];

    icons.forEach(icon => {
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('src');
    });

    // Tests de sécurité des liens groupés
    const externalLinks = screen.getAllByRole('link', {
      name: /vercel|docs|nextjs/i,
    });

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  // ============= TESTS DE RESPONSIVITÉ =============

  it("s'affiche correctement sur les appareils mobiles", () => {
    // Test avec breakpoint mobile
    createMockMatchMedia(true);
    render(<Home />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('items-center');
  });

  // ============= TESTS D'INTERACTION ET MOCKS =============

  it("gère les mocks d'intersection observer et matchMedia", () => {
    const mockObserver = createMockIntersectionObserver();
    render(<Home />);

    // Tests IntersectionObserver groupés
    expect(window.IntersectionObserver).toBeDefined();
    expect(mockObserver).toBeDefined();

    const callback = vi.fn();
    const observer = new window.IntersectionObserver(callback);
    expect(() => observer.observe(document.body)).not.toThrow();
    expect(() => observer.unobserve(document.body)).not.toThrow();
    expect(() => observer.disconnect()).not.toThrow();

    // Tests matchMedia groupés
    createMockMatchMedia(true);
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    expect(mediaQuery.matches).toBe(true);
    expect(mediaQuery.media).toBe('(max-width: 768px)');
    expect(() => mediaQuery.addListener(vi.fn())).not.toThrow();
    expect(() => mediaQuery.removeListener(vi.fn())).not.toThrow();
  });

  it('teste la fonction de rendu personnalisée', () => {
    // Test de notre utilitaire de rendu personnalisé directement
    const { container } = render(<div data-testid="test">Contenu de test</div>);

    expect(screen.getByTestId('test')).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Contenu de test');
  });
});
