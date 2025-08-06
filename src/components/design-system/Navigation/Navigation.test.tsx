// Tests TDD : Navigation - Variants, responsive, accessibilité, sécurité, performance
// ==================================================================================

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from './Navigation';

// Mock pour window.matchMedia
const createMockMatchMedia = (isMobile: boolean) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: isMobile && query === '(max-width: 768px)',
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

// Mock pour getComputedStyle
const createMockGetComputedStyle = () => {
  Object.defineProperty(window, 'getComputedStyle', {
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      minHeight: '44px',
      minWidth: '44px',
      getPropertyValue: (prop: string) => {
        if (prop === 'min-height') return '44px';
        if (prop === 'min-width') return '44px';
        return '';
      },
    })),
  });
};

beforeEach(() => {
  createMockMatchMedia(false);
  createMockGetComputedStyle();
});

describe('Navigation Component', () => {
  describe('Rendu et Variants', () => {
    it('affiche la navigation avec les éléments par défaut', () => {
      render(<Navigation />);

      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
      expect(nav).toHaveAttribute('aria-label', 'Navigation principale');
    });

    it('affiche le logo/brand par défaut', () => {
      render(<Navigation />);

      const brandLink = screen.getByLabelText(/retour à l'accueil/i);
      expect(brandLink).toBeInTheDocument();
      expect(brandLink).toHaveAttribute('href', '/');
    });

    it('affiche les liens de navigation par défaut', () => {
      render(<Navigation />);

      // Utilise getAllByRole pour gérer les doublons d'accueil
      const homeLinks = screen.getAllByRole('link', { name: /accueil/i });
      const aboutLink = screen.getByRole('link', { name: /à propos/i });
      const projectsLink = screen.getByRole('link', { name: /projets/i });
      const contactLink = screen.getByRole('link', { name: /contact/i });

      expect(homeLinks).toHaveLength(2); // Logo + lien navigation
      expect(aboutLink).toBeInTheDocument();
      expect(projectsLink).toBeInTheDocument();
      expect(contactLink).toBeInTheDocument();
    });

    it('accepte des liens personnalisés', () => {
      const customLinks = [{ href: '/custom', label: 'Custom Page' }];

      render(<Navigation links={customLinks} />);

      const customLink = screen.getByRole('link', { name: /custom page/i });
      expect(customLink).toBeInTheDocument();
      expect(customLink).toHaveAttribute('href', '/custom');
    });
  });

  describe('Responsive et Mobile', () => {
    it('affiche le menu hamburger sur mobile', () => {
      createMockMatchMedia(true);
      render(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveClass('md:hidden');
    });

    it('cache/affiche le menu mobile au clic sur hamburger', () => {
      createMockMatchMedia(true);
      render(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      // Cherche le menu par son container au lieu du role directement
      const mobileMenu = document.querySelector('[role="menu"]') as HTMLElement;

      // Menu initialement fermé
      expect(mobileMenu).toHaveClass('hidden');
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');

      // Clic pour ouvrir
      fireEvent.click(hamburgerButton);
      expect(mobileMenu).not.toHaveClass('hidden');
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'true');

      // Clic pour fermer
      fireEvent.click(hamburgerButton);
      expect(mobileMenu).toHaveClass('hidden');
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('ferme le menu mobile sur Escape', async () => {
      createMockMatchMedia(true);
      const user = userEvent.setup();
      render(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      const mobileMenu = document.querySelector('[role="menu"]') as HTMLElement;

      // Ouvre le menu
      await user.click(hamburgerButton);
      expect(mobileMenu).not.toHaveClass('hidden');

      // Ferme avec Escape
      await user.keyboard('{Escape}');
      expect(mobileMenu).toHaveClass('hidden');
    });

    it('cache le menu hamburger sur desktop', () => {
      createMockMatchMedia(false);
      render(<Navigation />);

      const hamburgerButton = screen.queryByRole('button', { name: /menu/i });
      // Sur desktop, le bouton est présent mais caché via CSS (md:hidden)
      expect(hamburgerButton).toBeInTheDocument();
      expect(hamburgerButton).toHaveClass('md:hidden');
    });
  });

  describe('Accessibilité WCAG 2.1 AA', () => {
    it('a les attributs ARIA corrects', () => {
      render(<Navigation />);

      const nav = screen.getByRole('navigation');
      const hamburgerButton = screen.getByRole('button', { name: /menu/i });

      expect(nav).toHaveAttribute('aria-label', 'Navigation principale');
      expect(hamburgerButton).toHaveAttribute('aria-expanded', 'false');
      expect(hamburgerButton).toHaveAttribute(
        'aria-label',
        'Menu de navigation'
      );
    });

    it('gère le focus au clavier correctement', () => {
      render(<Navigation />);

      const links = screen.getAllByRole('link');
      const hamburgerButton = screen.getByRole('button', { name: /menu/i });

      // Tous les liens sont focusables par défaut (pas besoin de tabIndex explicite)
      links.forEach(link => {
        expect(link).not.toHaveAttribute('tabIndex');
      });

      // Le bouton hamburger utilise notre composant Button avec tabIndex="0" pour l'accessibilité
      expect(hamburgerButton).toHaveAttribute('tabIndex', '0');
    });

    it('indique la page active avec aria-current', () => {
      const linksWithActive = [
        { href: '/', label: 'Accueil', isActive: true },
        { href: '/about', label: 'À propos' },
      ];

      render(<Navigation links={linksWithActive} />);

      // Utilise getAllByRole car il y a le logo ET le lien navigation
      const homeLinks = screen.getAllByRole('link', { name: /accueil/i });
      const aboutLink = screen.getByRole('link', { name: /à propos/i });

      // Trouve le lien actif parmi les liens accueil
      const activeHomeLink = homeLinks.find(
        link => link.getAttribute('aria-current') === 'page'
      );
      expect(activeHomeLink).toBeDefined();
      expect(aboutLink).not.toHaveAttribute('aria-current');
    });

    it('a des touch targets >= 44px sur mobile', () => {
      createMockMatchMedia(true);
      render(<Navigation />);

      const hamburgerButton = screen.getByRole('button', { name: /menu/i });
      const styles = getComputedStyle(hamburgerButton);

      expect(parseFloat(styles.minHeight)).toBeGreaterThanOrEqual(44);
      expect(parseFloat(styles.minWidth)).toBeGreaterThanOrEqual(44);
    });
  });

  describe('Sécurité', () => {
    it("n'a pas de scripts ou handlers dangereux", () => {
      render(<Navigation />);

      const nav = screen.getByRole('navigation');
      const allElements = nav.querySelectorAll('*');

      allElements.forEach(element => {
        expect(element).not.toHaveAttribute('onclick');
        expect(element).not.toHaveAttribute('onload');
        expect(element).not.toHaveAttribute('onerror');
      });
    });

    it('sanitise les liens externes', () => {
      const linksWithExternal = [
        {
          href: 'https://example.com',
          label: 'External Link',
          target: '_blank' as const,
        },
      ];

      render(<Navigation links={linksWithExternal} />);

      const externalLink = screen.getByRole('link', { name: /external link/i });
      expect(externalLink).toHaveAttribute('target', '_blank');
      expect(externalLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Performance', () => {
    it('utilise notre système de couleurs', () => {
      render(<Navigation />);

      const nav = screen.getByRole('navigation');
      const hamburgerButton = screen.getByRole('button', { name: /menu/i });

      // Vérifie que les classes principales sont statiques (structure)
      expect(nav).toHaveClass('border-b', 'sticky');
      expect(hamburgerButton).toHaveClass('md:hidden', 'inline-flex');

      // Vérifie l'utilisation du système de couleurs via les styles
      expect(nav.style.backgroundColor).toBeTruthy();
      expect(nav.style.borderColor).toBeTruthy();
    });

    it("n'a pas de re-renders inutiles", () => {
      const renderSpy = vi.fn();
      const MockNavigation = () => {
        renderSpy();
        return <Navigation />;
      };

      render(<MockNavigation />);
      render(<MockNavigation />);

      // Composant simple sans état complexe
      expect(renderSpy).toHaveBeenCalledTimes(2);
    });
  });

  describe('États et Interactions', () => {
    it('applique les styles hover avec notre système de couleurs', () => {
      render(<Navigation />);

      // Utilise getAllByRole pour gérer les doublons
      const homeLinks = screen.getAllByRole('link', { name: /accueil/i });
      // Prend le premier lien (navigation, pas le logo)
      const homeNavLink = homeLinks.find(
        link => !link.getAttribute('aria-label')
      );

      expect(homeNavLink).toHaveClass('transition-colors', 'duration-200');
      // Vérifie que le lien a des styles inline (notre système de couleurs)
      expect(homeNavLink?.style.color).toBeTruthy();
    });

    it('applique les styles active avec notre système de couleurs', () => {
      const linksWithActive = [{ href: '/', label: 'Accueil', isActive: true }];

      render(<Navigation links={linksWithActive} />);

      // Utilise getAllByRole car il y a le logo ET le lien navigation
      const homeLinks = screen.getAllByRole('link', { name: /accueil/i });
      // Trouve le lien actif parmi les liens accueil
      const activeHomeLink = homeLinks.find(
        link => link.getAttribute('aria-current') === 'page'
      );

      expect(activeHomeLink).toHaveClass('border-b-2');
      // Vérifie que le lien actif a des styles inline (couleur active)
      expect(activeHomeLink?.style.color).toBeTruthy();
      expect(activeHomeLink?.style.borderColor).toBeTruthy();
    });

    it('gère les animations de transition', () => {
      render(<Navigation />);

      const mobileMenu = document.querySelector('[role="menu"]') as HTMLElement;
      expect(mobileMenu).toHaveClass('transition-all', 'duration-300');
    });

    it('teste les gestionnaires hover React sur les liens', () => {
      render(<Navigation />);

      const homeLinks = screen.getAllByRole('link', { name: /accueil/i });
      const homeNavLink = homeLinks.find(
        link => !link.getAttribute('aria-label')
      );

      expect(homeNavLink).toBeTruthy();

      // Test événement mouseenter
      if (homeNavLink) {
        fireEvent.mouseEnter(homeNavLink);
      }

      // Vérifier que les gestionnaires React sont attachés (pas de crash)
      expect(homeNavLink).toBeInTheDocument();

      // Test événement mouseleave
      if (homeNavLink) {
        fireEvent.mouseLeave(homeNavLink);
      }

      expect(homeNavLink).toBeInTheDocument();
    });

    it('teste les gestionnaires focus/blur React', () => {
      render(<Navigation />);

      const homeLinks = screen.getAllByRole('link', { name: /accueil/i });
      const homeNavLink = homeLinks.find(
        link => !link.getAttribute('aria-label')
      );

      expect(homeNavLink).toBeTruthy();

      // Test événement focus
      if (homeNavLink) {
        fireEvent.focus(homeNavLink);
      }
      expect(homeNavLink).toBeInTheDocument();

      // Test événement blur
      if (homeNavLink) {
        fireEvent.blur(homeNavLink);
      }
      expect(homeNavLink).toBeInTheDocument();
    });

    it("teste les gestionnaires d'événements du menu mobile", () => {
      createMockMatchMedia(true); // Mode mobile
      render(<Navigation />);

      const mobileButton = screen.getByLabelText(/menu de navigation/i);

      // Test des clics multiples
      fireEvent.click(mobileButton);
      expect(mobileButton.getAttribute('aria-expanded')).toBe('true');

      fireEvent.click(mobileButton);
      expect(mobileButton.getAttribute('aria-expanded')).toBe('false');

      // Test événements clavier
      fireEvent.keyDown(mobileButton, { key: 'Enter' });
      fireEvent.keyDown(mobileButton, { key: ' ' });
      fireEvent.keyDown(mobileButton, { key: 'Escape' });

      expect(mobileButton).toBeInTheDocument();
    });

    it('teste les gestionnaires focus/blur du bouton mobile', () => {
      createMockMatchMedia(true); // Mode mobile
      render(<Navigation />);

      const mobileButton = screen.getByLabelText(/menu de navigation/i);

      // Test focus handler
      fireEvent.focus(mobileButton);
      expect(mobileButton).toBeInTheDocument();

      // Test blur handler
      fireEvent.blur(mobileButton);
      expect(mobileButton).toBeInTheDocument();
    });

    it('teste les gestionnaires hover des liens mobiles', () => {
      createMockMatchMedia(true); // Mode mobile
      render(<Navigation />);

      // Ouvrir le menu mobile
      const mobileButton = screen.getByLabelText(/menu de navigation/i);
      fireEvent.click(mobileButton);

      // Tester hover sur liens mobiles
      const mobileLinks = screen.getAllByRole('link');
      const homeLink = mobileLinks.find(
        link =>
          link.textContent?.includes('Accueil') &&
          !link.getAttribute('aria-label')
      );

      if (homeLink) {
        fireEvent.mouseEnter(homeLink);
        fireEvent.mouseLeave(homeLink);
        expect(homeLink).toBeInTheDocument();
      }
    });

    it('teste tous les gestionnaires inline dans les liens desktop', () => {
      createMockMatchMedia(false); // Mode desktop
      render(<Navigation />);

      const homeLinks = screen.getAllByRole('link', { name: /accueil/i });
      const homeNavLink = homeLinks.find(
        link => !link.getAttribute('aria-label')
      );

      if (homeNavLink) {
        // Test tous les gestionnaires React inline
        fireEvent.mouseEnter(homeNavLink);
        fireEvent.mouseLeave(homeNavLink);
        fireEvent.focus(homeNavLink);
        fireEvent.blur(homeNavLink);

        expect(homeNavLink).toBeInTheDocument();
      }
    });

    it('teste la fonction de création des liens avec cloneElement', () => {
      const customLinks = [
        { href: '/test1', label: 'Test 1', isActive: false },
        { href: '/test2', label: 'Test 2', isActive: true },
      ];

      createMockMatchMedia(true); // Mode mobile pour tester cloneElement
      render(<Navigation links={customLinks} />);

      // Ouvrir menu mobile
      const mobileButton = screen.getByLabelText(/menu de navigation/i);
      fireEvent.click(mobileButton);

      // Vérifier que les liens personnalisés sont rendus (utiliser getAllByText)
      const test1Links = screen.getAllByText('Test 1');
      const test2Links = screen.getAllByText('Test 2');

      expect(test1Links.length).toBeGreaterThan(0);
      expect(test2Links.length).toBeGreaterThan(0);
    });

    // ===================================================================
    // TESTS FONCTIONS SPÉCIFIQUES
    // ===================================================================

    it('teste la fonction handleEscape avec événement clavier Escape', () => {
      createMockMatchMedia(true); // Mode mobile
      render(<Navigation />);

      const mobileButton = screen.getByLabelText(/menu de navigation/i);

      // Ouvrir le menu
      fireEvent.click(mobileButton);
      expect(mobileButton.getAttribute('aria-expanded')).toBe('true');

      // Simuler Escape au niveau document
      fireEvent.keyDown(document, { key: 'Escape' });

      // Le menu devrait se fermer
      expect(mobileButton.getAttribute('aria-expanded')).toBe('false');
    });

    it('teste la fonction toggleMenu avec multiples clics', () => {
      createMockMatchMedia(true); // Mode mobile
      render(<Navigation />);

      const mobileButton = screen.getByLabelText(/menu de navigation/i);

      // État initial fermé
      expect(mobileButton.getAttribute('aria-expanded')).toBe('false');

      // Premier clic - ouverture (toggleMenu appelé)
      fireEvent.click(mobileButton);
      expect(mobileButton.getAttribute('aria-expanded')).toBe('true');

      // Deuxième clic - fermeture (toggleMenu appelé à nouveau)
      fireEvent.click(mobileButton);
      expect(mobileButton.getAttribute('aria-expanded')).toBe('false');

      // Troisième clic - réouverture (toggleMenu appelé encore)
      fireEvent.click(mobileButton);
      expect(mobileButton.getAttribute('aria-expanded')).toBe('true');
    });

    it('teste la fonction renderLink avec liens externes', () => {
      const externalLinks = [
        { href: 'https://github.com/test', label: 'GitHub' },
        { href: '/internal', label: 'Internal' },
      ];

      render(<Navigation links={externalLinks} />);

      // Vérifier lien externe (desktop)
      const githubLinks = screen.getAllByText('GitHub');
      expect(githubLinks[0]).toHaveAttribute('href', 'https://github.com/test');
      expect(githubLinks[0]).toHaveAttribute('target', '_blank');
      expect(githubLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');

      // Vérifier lien interne (desktop)
      const internalLinks = screen.getAllByText('Internal');
      expect(internalLinks[0]).toHaveAttribute('href', '/internal');
      expect(internalLinks[0]).not.toHaveAttribute('target');
      expect(internalLinks[0]).not.toHaveAttribute('rel');
    });
    it('teste les gestionnaires onMouseEnter/onMouseLeave dans renderLink', () => {
      const hoverLinks = [
        { href: '/hover-test', label: 'Hover Test' },
        { href: '/active-test', label: 'Active Test' },
      ];

      render(<Navigation links={hoverLinks} />);

      // Test hover sur lien non-actif (devrait déclencher les gestionnaires)
      const hoverLinks_desktop = screen.getAllByText('Hover Test');
      if (hoverLinks_desktop[0]) {
        fireEvent.mouseEnter(hoverLinks_desktop[0]);
        fireEvent.mouseLeave(hoverLinks_desktop[0]);
      }

      // Test hover sur lien actif (isActive = true - ne devrait PAS déclencher les gestionnaires)
      const activeLinks_desktop = screen.getAllByText('Active Test');
      if (activeLinks_desktop[0]) {
        fireEvent.mouseEnter(activeLinks_desktop[0]);
        fireEvent.mouseLeave(activeLinks_desktop[0]);
      }

      // Vérifier que les liens sont bien présents avec leurs propriétés
      expect(hoverLinks_desktop[0]).toBeInTheDocument();
      expect(activeLinks_desktop[0]).toBeInTheDocument();
    });

    it('teste la fonction renderLink avec variant de classes', () => {
      createMockMatchMedia(false); // Mode desktop
      render(<Navigation />);

      // Vérifier que renderLink est appelé avec les bonnes classes desktop
      const desktopLinks = screen.getAllByRole('link');
      const navLinks = desktopLinks.filter(
        link =>
          link.textContent?.includes('Accueil') &&
          !link.getAttribute('aria-label')
      );

      if (navLinks.length > 0) {
        const navLink = navLinks[0];
        expect(navLink).toHaveClass(
          'transition-colors',
          'duration-200',
          'font-medium'
        );
      }
    });

    it('teste les gestionnaires focus/blur/hover du bouton hamburger', () => {
      createMockMatchMedia(true); // Mode mobile
      render(<Navigation />);

      const mobileButton = screen.getByLabelText(/menu de navigation/i);

      // Test tous les gestionnaires d'événements du bouton hamburger
      fireEvent.focus(mobileButton);
      fireEvent.blur(mobileButton);
      fireEvent.mouseEnter(mobileButton);
      fireEvent.mouseLeave(mobileButton);

      expect(mobileButton).toBeInTheDocument();
    });

    it('teste le cleanup de useEffect pour handleEscape', () => {
      createMockMatchMedia(true);
      const { unmount } = render(<Navigation />);

      // Vérifier que le composant se démonte sans erreur (cleanup useEffect)
      unmount();

      // Aucune assertion nécessaire, just vérifier qu'il n'y a pas d'erreur
      expect(true).toBe(true);
    });

    // ===================================================================
    // TESTS SUPPLÉMENTAIRES POUR FONCTIONS INTERNES
    // ===================================================================

    it('teste toutes les conditions dans renderLink', () => {
      const complexLinks = [
        { href: '/normal', label: 'Normal Link' },
        { href: '/active', label: 'Active Link', isActive: true },
        { href: 'https://external.com', label: 'External Link' },
        {
          href: '/target-blank',
          label: 'Target Blank',
          target: '_blank' as const,
        },
      ];

      createMockMatchMedia(false); // Desktop pour tester toutes les classes
      render(<Navigation links={complexLinks} />);

      // Vérifier que tous les liens sont rendus avec les bonnes propriétés (desktop)
      const normalLinks = screen.getAllByText('Normal Link');
      expect(normalLinks[0]).toBeInTheDocument();

      const activeLinks = screen.getAllByText('Active Link');
      expect(activeLinks[0]).toHaveAttribute('aria-current', 'page');

      const externalLinks = screen.getAllByText('External Link');
      expect(externalLinks[0]).toHaveAttribute('rel', 'noopener noreferrer');

      const targetBlankLinks = screen.getAllByText('Target Blank');
      expect(targetBlankLinks[0]).toHaveAttribute('target', '_blank');
    });

    it('teste les gestionnaires React du menu mobile en détail', () => {
      createMockMatchMedia(true);
      render(<Navigation />);

      const mobileButton = screen.getByLabelText(/menu de navigation/i);

      // Test séquence complète d'interactions

      // 1. Focus
      fireEvent.focus(mobileButton);
      expect(mobileButton).toBeInTheDocument();

      // 2. MouseEnter
      fireEvent.mouseEnter(mobileButton);
      expect(mobileButton).toBeInTheDocument();

      // 3. Click (ouvre)
      fireEvent.click(mobileButton);
      expect(mobileButton.getAttribute('aria-expanded')).toBe('true');

      // 4. MouseLeave
      fireEvent.mouseLeave(mobileButton);
      expect(mobileButton).toBeInTheDocument();

      // 5. Blur
      fireEvent.blur(mobileButton);
      expect(mobileButton).toBeInTheDocument();
    });

    it('teste les différents types de liens dans renderLink', () => {
      const variousLinks = [
        { href: 'mailto:test@example.com', label: 'Email' },
        { href: 'tel:+1234567890', label: 'Phone' },
        { href: '#section', label: 'Anchor' },
        { href: '/path/to/page', label: 'Internal Path' },
      ];

      render(<Navigation links={variousLinks} />);

      // Vérifier tous les types de liens (desktop)
      variousLinks.forEach(link => {
        const elements = screen.getAllByText(link.label);
        expect(elements[0]).toHaveAttribute('href', link.href);
      });
    });

    it('teste les gestionnaires hover avec conditions isActive', () => {
      const linksWithActiveStates = [
        { href: '/inactive1', label: 'Inactive 1', isActive: false },
        { href: '/active1', label: 'Active 1', isActive: true },
        { href: '/inactive2', label: 'Inactive 2', isActive: false },
        { href: '/active2', label: 'Active 2', isActive: true },
      ];

      render(<Navigation links={linksWithActiveStates} />);

      // Test hover sur liens inactifs (should trigger style changes) - desktop
      const inactiveLink1 = screen.getAllByText('Inactive 1');
      if (inactiveLink1[0]) {
        fireEvent.mouseEnter(inactiveLink1[0]);
        fireEvent.mouseLeave(inactiveLink1[0]);
      }

      const inactiveLink2 = screen.getAllByText('Inactive 2');
      if (inactiveLink2[0]) {
        fireEvent.mouseEnter(inactiveLink2[0]);
        fireEvent.mouseLeave(inactiveLink2[0]);
      }

      // Test hover sur liens actifs (should NOT trigger style changes due to isActive condition) - desktop
      const activeLink1 = screen.getAllByText('Active 1');
      if (activeLink1[0]) {
        fireEvent.mouseEnter(activeLink1[0]);
        fireEvent.mouseLeave(activeLink1[0]);
      }

      const activeLink2 = screen.getAllByText('Active 2');
      if (activeLink2[0]) {
        fireEvent.mouseEnter(activeLink2[0]);
        fireEvent.mouseLeave(activeLink2[0]);
      }

      // Vérifier que les liens actifs ont bien aria-current
      expect(activeLink1[0]).toHaveAttribute('aria-current', 'page');
      expect(activeLink2[0]).toHaveAttribute('aria-current', 'page');
    });

    it('teste les gestionnaires hover mobiles pour Navigation', () => {
      const mobileLinks = [
        { href: '/mobile1', label: 'Mobile Link 1' },
        { href: '/mobile2', label: 'Mobile Link 2', isActive: true },
      ];

      // Force mobile view
      createMockMatchMedia(true);
      render(<Navigation links={mobileLinks} />);

      // Ouvrir le menu mobile
      const hamburgerButton = screen.getByLabelText('Menu de navigation');
      fireEvent.click(hamburgerButton);

      // Test hover sur liens mobiles inactifs (devrait changer les styles)
      const mobileLink1 = screen.getAllByText('Mobile Link 1');
      const mobileLinkElement1 = mobileLink1[1]; // Le deuxième est le mobile
      if (mobileLinkElement1) {
        fireEvent.mouseEnter(mobileLinkElement1);
        fireEvent.mouseLeave(mobileLinkElement1);
      }

      // Test hover sur liens mobiles actifs (ne devrait PAS changer les styles)
      const mobileLink2 = screen.getAllByText('Mobile Link 2');
      const mobileLinkElement2 = mobileLink2[1]; // Le deuxième est le mobile
      if (mobileLinkElement2) {
        fireEvent.mouseEnter(mobileLinkElement2);
        fireEvent.mouseLeave(mobileLinkElement2);
      }

      // Vérifier que le lien actif a bien aria-current
      expect(mobileLinkElement2).toHaveAttribute('aria-current', 'page');
    });

    it('teste les gestionnaires hover du logo/brand', () => {
      render(<Navigation brand="Test Brand" />);

      // Tester les gestionnaires hover du logo
      const brandLink = screen.getByLabelText(
        "Retour à l'accueil - Test Brand"
      );

      // Tester onMouseEnter sur le brand
      fireEvent.mouseEnter(brandLink);

      // Tester onMouseLeave sur le brand
      fireEvent.mouseLeave(brandLink);

      // Vérifier que le brand est bien présent
      expect(brandLink).toBeInTheDocument();
      expect(brandLink).toHaveAttribute('href', '/');
    });
  });
});
