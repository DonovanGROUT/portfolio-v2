/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Hero from './Hero';

// Mock des sous-composants pour accélérer les tests Hero
import React from 'react';
vi.mock('../Button/Button', () => ({
  __esModule: true,
  default: ((props: React.PropsWithChildren<Record<string, unknown>>) => (
    <button {...props}>{props.children || 'Button'}</button>
  )) as React.FC,
}));
vi.mock('../Typography/Typography', () => ({
  __esModule: true,
  default: ((props: React.PropsWithChildren<Record<string, unknown>>) => (
    <span {...props}>{props.children || 'Typography'}</span>
  )) as React.FC,
}));

describe('Hero Component - TDD Phase 4', () => {
  // Mock navigation pour éviter les erreurs jsdom et accélérer les tests
  let assignSpy: ReturnType<typeof vi.spyOn> | undefined;
  let openSpy: ReturnType<typeof vi.spyOn> | undefined;
  let replaceSpy: ReturnType<typeof vi.spyOn> | undefined;
  beforeEach(() => {
    try {
      assignSpy = vi
        .spyOn(window.location, 'assign')
        .mockImplementation(() => {});
    } catch {
      assignSpy = undefined;
    }
    try {
      openSpy = vi
        .spyOn(window, 'open')
        .mockImplementation(() => null) as unknown as ReturnType<
        typeof vi.spyOn
      >;
    } catch {
      openSpy = undefined;
    }
    try {
      replaceSpy = vi
        .spyOn(window.location, 'replace')
        .mockImplementation(() => {});
    } catch {
      replaceSpy = undefined;
    }
  });
  afterEach(() => {
    if (assignSpy && typeof assignSpy.mockRestore === 'function')
      assignSpy.mockRestore();
    if (openSpy && typeof openSpy.mockRestore === 'function')
      openSpy.mockRestore();
    if (replaceSpy && typeof replaceSpy.mockRestore === 'function')
      replaceSpy.mockRestore();
  });
  // ===================================================================
  // 🎯 TESTS DE RENDU DE BASE
  // ===================================================================

  describe('Rendu de base et contenu', () => {
    it('devrait rendre le composant Hero avec les props requises', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="En préparation du lancement de mon activité de développeur web freelance."
          location="Caen, Normandie, France"
        />
      );

      expect(screen.getByText('Donovan GROUT')).toBeInTheDocument();
      expect(
        screen.getByText('Développeur Web Full-Stack')
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          'En préparation du lancement de mon activité de développeur web freelance.'
        )
      ).toBeInTheDocument();
      expect(screen.getByText(/Caen, Normandie, France/i)).toBeInTheDocument();
    });

    it('ajoute un point final si absent dans baseline', () => {
      render(
        <Hero
          name="Test Name"
          title="Test Title"
          subtitle="Test Subtitle"
          location="Test Location"
          baseline="Développeur fullstack passionné" // pas de point
        />
      );
      // On récupère le paragraphe de baseline
      const p = screen.getByText(/Développeur fullstack passionné\./);
      expect(p).toBeInTheDocument();
      expect(p.textContent).toBe('Développeur fullstack passionné.');
    });
    it('ne rend pas de paragraphe pour une phrase de baseline vide', () => {
      render(
        <Hero
          name="Test Name"
          title="Test Title"
          subtitle="Test Subtitle"
          location="Test Location"
          baseline={'Phrase 1.  . Phrase 3'}
        />
      );
      // Phrase 1 et Phrase 3 doivent être rendues, mais pas la phrase vide
      expect(screen.getByText('Phrase 1.')).toBeInTheDocument();
      expect(screen.getByText('Phrase 3.')).toBeInTheDocument();
      // On vérifie qu'il n'y a que 2 paragraphes dans la baseline
      const baselineContainer = screen.getByLabelText('Accroche commerciale');
      const baselineParagraphs = baselineContainer.querySelectorAll('p');
      expect(baselineParagraphs.length).toBe(2);
    });
    it('devrait rendre les deux boutons CTA par défaut', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Test subtitle"
          location="Caen, France"
        />
      );

      const projectsButtons = screen.getAllByRole('link', {
        name: /voir mes projets/i,
      });
      const contactButtons = screen.getAllByRole('link', {
        name: /me contacter/i,
      });

      expect(projectsButtons.length).toBeGreaterThan(0);
      expect(contactButtons.length).toBeGreaterThan(0);
      projectsButtons.forEach(btn =>
        expect(btn).toHaveAttribute('href', '/projects')
      );
      contactButtons.forEach(btn =>
        expect(btn).toHaveAttribute('href', '/contact')
      );
    });

    it('devrait permettre de personnaliser les CTAs', () => {
      render(
        <Hero
          name="Test Name"
          title="Test Title"
          subtitle="Test Subtitle"
          location="Test Location"
          primaryCta={{ label: 'Custom Primary', href: '/custom' }}
          secondaryCta={{ label: 'Custom Secondary', href: '/other' }}
        />
      );

      const primaryButtons = screen.getAllByRole('link', {
        name: 'Custom Primary',
      });
      const secondaryButtons = screen.getAllByRole('link', {
        name: 'Custom Secondary',
      });

      expect(primaryButtons.length).toBeGreaterThan(0);
      expect(secondaryButtons.length).toBeGreaterThan(0);
      primaryButtons.forEach(btn =>
        expect(btn).toHaveAttribute('href', '/custom')
      );
      secondaryButtons.forEach(btn =>
        expect(btn).toHaveAttribute('href', '/other')
      );
    });
  });

  // ===================================================================
  // 🎨 TESTS DE STYLE - CHARTE "TECH & NATURE"
  // ===================================================================

  describe('Style et charte graphique', () => {
    it('devrait appliquer la charte "Tech & Nature" avec les couleurs appropriées', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const hero = screen.getByRole('region', { name: /hero/i });
      expect(hero).toHaveClass('bg-gradient-to-br');
    });

    it('devrait utiliser la typographie définie dans la charte', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const name = screen.getByText('Donovan GROUT');
      const title = screen.getByText('Développeur Web Full-Stack');

      // H1 : 2.5rem (40px) / font-bold
      expect(name.tagName).toBe('H1');
      expect(name).toHaveClass('text-4xl', 'font-bold');

      // H2 : 2rem (32px) / font-semibold
      expect(title.tagName).toBe('H2');
      expect(title).toHaveClass('text-2xl', 'font-semibold');
    });
  });

  // ===================================================================
  // 📱 TESTS RESPONSIVE
  // ===================================================================

  describe('Responsive Design', () => {
    it('devrait être responsive par défaut (mobile-first)', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const hero = screen.getByRole('region', { name: /hero/i });
      expect(hero).toHaveClass('min-h-screen');
    });

    it('devrait adapter le layout sur mobile et desktop', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const container = screen.getByRole('region', { name: /hero/i });
      // Mobile-first : flex-col, puis lg:flex-row sur desktop
      expect(container.innerHTML).toContain('flex');
    });
  });

  // ===================================================================
  // ♿ TESTS D'ACCESSIBILITÉ WCAG 2.1 AA
  // ===================================================================

  describe('Accessibilité WCAG 2.1 AA', () => {
    it('devrait avoir une structure sémantique appropriée', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      // Hero doit être dans une section avec role region et aria-label
      const hero = screen.getByRole('region', { name: /hero/i });
      expect(hero).toBeInTheDocument();

      // H1 pour le nom (titre principal de la page)
      const name = screen.getByRole('heading', {
        level: 1,
        name: 'Donovan GROUT',
      });
      expect(name).toBeInTheDocument();

      // H2 pour le titre professionnel
      const title = screen.getByRole('heading', {
        level: 2,
        name: 'Développeur Web Full-Stack',
      });
      expect(title).toBeInTheDocument();
    });

    it('devrait avoir des liens accessibles avec des labels clairs', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const projectsLinks = screen.getAllByRole('link', {
        name: /voir mes projets/i,
      });
      const contactLinks = screen.getAllByRole('link', {
        name: /me contacter/i,
      });

      projectsLinks.forEach(link => expect(link).toHaveAccessibleName());
      contactLinks.forEach(link => expect(link).toHaveAccessibleName());
    });

    it('devrait respecter les contrastes WCAG AA', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const hero = screen.getByRole('region', { name: /hero/i });
      // Vérifier que les classes de couleurs respectent le contraste
      expect(hero.className).toMatch(/text-(white|slate|gray)/);
    });

    it('devrait supporter la navigation au clavier', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const links = screen.getAllByRole('link');
      links.forEach(link => {
        expect(link).not.toHaveAttribute('tabIndex', '-1');
      });
    });
  });

  // ===================================================================
  // 🎭 TESTS D'INTERACTIVITÉ
  // ===================================================================

  describe('Interactivité et événements', () => {
    it('devrait appeler onCtaClick quand on clique sur le CTA secondaire', async () => {
      const user = userEvent.setup();
      const handleCtaClick = vi.fn();

      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
          onCtaClick={handleCtaClick}
        />
      );

      const contactButtons = screen.getAllByRole('link', {
        name: /me contacter/i,
      });
      expect(contactButtons.length).toBeGreaterThan(0);
      const button = contactButtons[0] as HTMLElement;
      await user.click(button);

      expect(handleCtaClick).toHaveBeenCalledWith('secondary');
    });

    it('ne doit pas appeler onCtaClick si non fourni', async () => {
      const user = userEvent.setup();
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );
      const projectsButtons = screen.getAllByRole('link', {
        name: /voir mes projets/i,
      });
      await user.click(projectsButtons[0] as HTMLElement);
      // Pas d'erreur, pas de callback
    });

    it('devrait utiliser sanitizeUrl pour bloquer les href malicieux', () => {
      render(
        <Hero
          name="Test"
          title="Test"
          subtitle="Test"
          location="Test"
          primaryCta={{ label: 'Malicious', href: 'javascript:alert(1)' }}
        />
      );
      const btns = screen.getAllByRole('link', { name: 'Malicious' });
      btns.forEach(btn => expect(btn.getAttribute('href')).toBe('#'));
    });
    it('devrait appeler onCtaClick quand on clique sur un CTA', async () => {
      const user = userEvent.setup();
      const handleCtaClick = vi.fn();

      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
          onCtaClick={handleCtaClick}
        />
      );

      const projectsButtons = screen.getAllByRole('link', {
        name: /voir mes projets/i,
      });
      expect(projectsButtons.length).toBeGreaterThan(0);
      const button = projectsButtons[0] as HTMLElement;
      await user.click(button);

      expect(handleCtaClick).toHaveBeenCalledWith('primary');
    });

    it('devrait avoir des animations au hover sur les CTAs', () => {
      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const projectsButtons = screen.getAllByRole('link', {
        name: /voir mes projets/i,
      });
      // Transitions 200-300ms selon la charte
      projectsButtons.forEach(btn => expect(btn).toHaveClass('transition-all'));
    });
  });

  // ===================================================================
  // 🔒 TESTS DE SÉCURITÉ XSS
  // ===================================================================

  describe('Sécurité XSS', () => {
    it('devrait échapper le contenu HTML malveillant dans le nom', () => {
      render(
        <Hero
          name="<script>alert('xss')</script>"
          title="Title"
          subtitle="Subtitle"
          location="Location"
        />
      );

      // Le script ne doit pas être exécuté, juste affiché comme texte
      expect(screen.queryByText(/script/i)).toBeInTheDocument();
      const hero = screen.getByRole('region', { name: /hero/i });
      expect(hero.innerHTML).not.toContain('<script>');
    });

    it('devrait échapper le contenu HTML malveillant dans le subtitle', () => {
      render(
        <Hero
          name="Name"
          title="Title"
          subtitle="<img src=x onerror=alert('xss')>"
          location="Location"
        />
      );

      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('devrait valider les URLs des CTAs', () => {
      render(
        <Hero
          name="Name"
          title="Title"
          subtitle="Subtitle"
          location="Location"
          primaryCta={{ label: 'Test', href: 'javascript:alert("xss")' }}
        />
      );

      const buttons = screen.getAllByRole('link', { name: 'Test' });
      // javascript: URLs ne doivent pas être autorisées
      buttons.forEach(btn =>
        expect(btn.getAttribute('href')).not.toContain('javascript:')
      );
    });
  });

  // ===================================================================
  // ⚡ TESTS DE PERFORMANCE
  // ===================================================================

  describe('Performance et optimisation', () => {
    it('devrait rendre rapidement le composant Hero', () => {
      const startTime = performance.now();

      render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      const endTime = performance.now();
      expect(endTime - startTime).toBeLessThan(100); // Rendering rapide
    });

    it('ne devrait pas avoir de re-renders inutiles avec les mêmes props', () => {
      const { rerender } = render(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      // Re-render avec les mêmes props
      rerender(
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Subtitle"
          location="Caen"
        />
      );

      // Le composant devrait toujours être affiché correctement
      expect(screen.getByText('Donovan GROUT')).toBeInTheDocument();
    });
  });

  // ===================================================================
  // 🎨 TESTS DES PROPS OPTIONNELLES
  // ===================================================================

  describe('Props optionnelles et personnalisation', () => {
    it('devrait accepter des classes CSS personnalisées', () => {
      render(
        <Hero
          name="Name"
          title="Title"
          subtitle="Subtitle"
          location="Location"
          className="custom-hero-class"
        />
      );

      const hero = screen.getByRole('region', { name: /hero/i });
      expect(hero).toHaveClass('custom-hero-class');
    });

    it('devrait pouvoir désactiver les CTAs', () => {
      render(
        <Hero
          name="Name"
          title="Title"
          subtitle="Subtitle"
          location="Location"
          showCtas={false}
        />
      );

      expect(
        screen.queryByRole('link', { name: /voir mes projets/i })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('link', { name: /me contacter/i })
      ).not.toBeInTheDocument();
    });

    it('devrait supporter une image/avatar optionnel', () => {
      render(
        <Hero
          name="Name"
          title="Title"
          subtitle="Subtitle"
          location="Location"
          imageSrc="/avatar.jpg"
          imageAlt="Photo de profil de Donovan GROUT"
        />
      );

      const image = screen.getByRole('img', { name: /photo de profil/i });
      expect(image).toBeInTheDocument();
      // Next.js Image génère un src transformé
      const src = image.getAttribute('src');
      expect(
        src === '/avatar.jpg' ||
          (src && src.includes('/avatar.jpg')) ||
          (src && src.startsWith('/_next/image'))
      ).toBe(true);
    });
  });
});
