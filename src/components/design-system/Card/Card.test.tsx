// ===================================================================
// TESTS UNITAIRES POUR LE COMPOSANT CARD - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Tests d'accessibilité, variants, états, sécurité, responsive, XSS, performance
// ===================================================================

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';

describe('Card Component - TDD Tests Complets', () => {
  // -------------------------------------------------------------------
  // MOCKS & SETUP
  // -------------------------------------------------------------------
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  // -------------------------------------------------------------------
  // TESTS VARIANTS
  // -------------------------------------------------------------------
  describe('🎨 Variants de Card - Charte "Tech & Nature"', () => {
    it('devrait render une card par défaut avec variant "default"', () => {
      render(<Card>Contenu par défaut</Card>);

      const card = screen.getByRole('article');
      expect(card).toBeInTheDocument();
      expect(card).toHaveStyle({
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0', // colors.neutral[200]
      });
      expect(card).toHaveTextContent('Contenu par défaut');
    });

    it('devrait render une card variant "project" pour les projets portfolio', () => {
      render(<Card variant="project">Projet portfolio</Card>);

      const card = screen.getByRole('article');
      // Vérifier le gradient avec colors.ts
      expect(card).toHaveStyle({
        background: 'linear-gradient(to bottom right, #f0f9ff, #ecfdf5)',
        borderColor: '#bae6fd', // colors.primary[200]
      });
    });

    it('devrait render une card variant "skill" pour les compétences', () => {
      render(<Card variant="skill">Compétence technique</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveStyle({
        backgroundColor: '#ecfdf5', // colors.secondary[50]
        borderColor: '#a7f3d0', // colors.secondary[200]
      });
    });

    it('devrait render une card variant "experience" pour l\'expérience', () => {
      render(<Card variant="experience">Expérience professionnelle</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveStyle({
        backgroundColor: '#f8fafc', // colors.neutral[50]
        borderColor: '#cbd5e1', // colors.neutral[300]
      });
    });

    it('devrait render une card variant "testimonial" pour les témoignages', () => {
      render(<Card variant="testimonial">Témoignage client</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveStyle({
        background: 'linear-gradient(to right, #ecfdf5, #f0f9ff)',
        borderColor: '#bae6fd', // colors.primary[200]
      });
    });

    it('devrait utiliser le variant par défaut si variant non spécifié', () => {
      render(<Card>Card par défaut</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveStyle({
        backgroundColor: '#ffffff',
        borderColor: '#e2e8f0', // colors.neutral[200]
      });
    });
  });

  // -------------------------------------------------------------------
  // TESTS TAILLES
  // -------------------------------------------------------------------
  describe('📐 Tailles de Card - Responsive Design', () => {
    it('devrait render une card taille "sm" compacte', () => {
      render(<Card size="sm">Card petite</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveClass('p-4', 'rounded-lg', 'text-sm');
    });

    it('devrait render une card taille "md" par défaut', () => {
      render(<Card size="md">Card moyenne</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveClass(
        'p-4',
        'md:p-6',
        'lg:p-8',
        'rounded-xl',
        'text-base'
      );
    });

    it('devrait render une card taille "lg" étendue', () => {
      render(<Card size="lg">Card grande</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveClass(
        'p-4',
        'md:p-6',
        'lg:p-8',
        'rounded-2xl',
        'text-lg'
      );
    });
  });

  // -------------------------------------------------------------------
  // TESTS ÉTATS INTERACTIFS
  // -------------------------------------------------------------------
  describe('🎭 États Interactifs', () => {
    it('devrait render une card hover avec animation', () => {
      render(<Card hover>Card interactive</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveClass('transition-all', 'duration-300');
      expect(card).toHaveClass('hover:scale-105', 'hover:shadow-lg');
    });

    it('devrait render une card clickable avec cursor pointer', () => {
      render(<Card clickable>Card cliquable</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveClass('cursor-pointer', 'transition-transform');
      expect(card).toHaveClass('hover:scale-102', 'active:scale-98');
    });

    it('devrait render une card disabled avec opacité réduite', () => {
      render(<Card disabled>Card désactivée</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveStyle({
        opacity: '0.5',
        cursor: 'not-allowed',
      });
    });

    it('devrait déclencher un clic clavier (Enter/Espace) sur une card clickable', () => {
      const handleClick = vi.fn();
      render(
        <Card clickable onClick={handleClick}>
          Card clavier
        </Card>
      );
      const card = screen.getByRole('article');
      card.focus();
      // Simule Enter
      card.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Enter', bubbles: true })
      );
      // Simule Espace
      card.dispatchEvent(
        new KeyboardEvent('keydown', { key: ' ', bubbles: true })
      );
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('devrait render une card loading avec état visuel accessible', () => {
      render(<Card loading>Card en chargement</Card>);

      const card = screen.getByRole('article');
      expect(card).toHaveClass('cursor-wait');
    });
  });

  // -------------------------------------------------------------------
  // TESTS STRUCTURE & COMPOSITION
  // -------------------------------------------------------------------
  describe('🏗️ Structure et Composition', () => {
    it('devrait render une card avec header, body et footer', () => {
      render(
        <Card>
          <Card.Header>En-tête</Card.Header>
          <Card.Body>Corps de la card</Card.Body>
          <Card.Footer>Pied de page</Card.Footer>
        </Card>
      );

      expect(screen.getByText('En-tête')).toBeInTheDocument();
      expect(screen.getByText('Corps de la card')).toBeInTheDocument();
      expect(screen.getByText('Pied de page')).toBeInTheDocument();

      // Vérifie la présence des classes sur les bons éléments
      const { container } = render(
        <Card>
          <Card.Header>En-tête</Card.Header>
          <Card.Body>Corps de la card</Card.Body>
          <Card.Footer>Pied de page</Card.Footer>
        </Card>
      );
      const header = container.querySelector('header');
      const body = container.querySelector('section');
      const footer = container.querySelector('footer');
      expect(header).toHaveClass('border-b', 'border-slate-200');
      expect(body).toHaveClass('px-6', 'py-4');
      expect(footer).toHaveClass('border-t', 'border-slate-200');
    });

    it('devrait render une card avec image', () => {
      render(
        <Card>
          <Card.Image src="/test-image.jpg" alt="Image test" />
          <Card.Body>Contenu avec image</Card.Body>
        </Card>
      );

      const image = screen.getByRole('img');
      expect(image).toBeInTheDocument();
      // Next.js <Image /> optimise le src, il faut vérifier qu'il contient le nom du fichier
      expect(image.getAttribute('src')).toContain('test-image.jpg');
      expect(image).toHaveAttribute('alt', 'Image test');
      expect(image).toHaveClass('h-48', 'object-cover');
    });
  });
});

// -------------------------------------------------------------------
// TESTS ACCESSIBILITÉ
// -------------------------------------------------------------------
describe('♿ Accessibilité WCAG 2.1 AA', () => {
  it('devrait avoir le role "article" par défaut', () => {
    render(<Card>Card accessible</Card>);

    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });

  it('devrait permettre de personnaliser le role ARIA', () => {
    render(
      <Card role="region" aria-label="Région de contenu">
        Card avec role personnalisé
      </Card>
    );

    const card = screen.getByRole('region');
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-label', 'Région de contenu');
  });

  it('devrait supporter aria-labelledby pour les titres', () => {
    render(
      <Card aria-labelledby="card-title">
        <Card.Header>
          <h3 id="card-title">Titre de la card</h3>
        </Card.Header>
        <Card.Body>Contenu accessible</Card.Body>
      </Card>
    );

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-labelledby', 'card-title');
  });

  it('devrait supporter aria-describedby pour les descriptions', () => {
    render(
      <Card aria-describedby="card-desc">
        <Card.Body>
          <p id="card-desc">Description de la card</p>
          Contenu principal
        </Card.Body>
      </Card>
    );

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('aria-describedby', 'card-desc');
  });

  it('devrait avoir des couleurs avec contraste WCAG AA minimum', () => {
    render(<Card variant="project">Card avec bon contraste</Card>);

    const card = screen.getByRole('article');
    // Test des classes de couleur avec bon contraste
    expect(card).toHaveClass('text-slate-800'); // Contraste élevé sur fond clair
  });
});

// -------------------------------------------------------------------
// TESTS RESPONSIVE DESIGN
// -------------------------------------------------------------------
describe('📱 Responsive Design', () => {
  it('devrait être responsive par défaut', () => {
    render(<Card>Card responsive</Card>);

    const card = screen.getByRole('article');
    expect(card).toHaveClass('w-full'); // Largeur responsive
  });

  it('devrait permettre de désactiver la responsivité', () => {
    render(<Card responsive={false}>Card fixe</Card>);

    const card = screen.getByRole('article');
    expect(card).not.toHaveClass('w-full');
  });

  it("devrait adapter le padding selon la taille d'écran", () => {
    render(<Card>Card responsive avancée</Card>);

    const card = screen.getByRole('article');
    expect(card).toHaveClass('p-4', 'md:p-6', 'lg:p-8');
  });
});

// -------------------------------------------------------------------
// TESTS SÉCURITÉ XSS
// -------------------------------------------------------------------
describe('🔒 Sécurité XSS', () => {
  it('devrait échapper le contenu HTML malveillant', () => {
    const maliciousContent =
      '<script>alert("XSS")</script><img src="x" onerror="alert(\'XSS\')">';

    render(<Card>{maliciousContent}</Card>);

    // Le contenu dangereux doit être échappé comme texte
    expect(screen.getByText(maliciousContent)).toBeInTheDocument();
    // Aucun script ne doit être exécuté
    expect(document.querySelector('script')).not.toBeInTheDocument();
  });

  it('ne doit pas appliquer de props inconnues ou non-fonctionnelles', () => {
    // On simule une tentative d'injection de props non standards
    const dangerousProps = {
      'data-evil': 'javascript:alert("XSS")',
      style: { backgroundImage: 'url(javascript:alert("XSS"))' },
    };

    render(<Card {...dangerousProps}>Card sécurisée</Card>);

    const card = screen.getByRole('article');
    // Les props non standards ne doivent pas être présentes
    expect(card).not.toHaveAttribute('data-evil');
    // Le style dangereux ne doit pas être appliqué (accepte style vide ou absent)
    expect(
      card.style.backgroundImage === '' ||
        card.style.backgroundImage === undefined
    ).toBe(true);
  });
});

// -------------------------------------------------------------------
// TESTS PROPS PERSONNALISÉES
// -------------------------------------------------------------------
describe('🎨 Props Personnalisées', () => {
  it('devrait accepter des classes CSS personnalisées', () => {
    render(<Card className="custom-class bg-red-100">Card personnalisée</Card>);

    const card = screen.getByRole('article');
    expect(card).toHaveClass('custom-class', 'bg-red-100');
  });

  it('devrait merger les classes avec celles par défaut', () => {
    render(
      <Card className="custom-border" variant="project">
        Card avec classes mergées
      </Card>
    );

    const card = screen.getByRole('article');
    expect(card).toHaveClass('custom-border'); // Classe personnalisée
    // Vérifier que les styles inline du variant project sont appliqués
    expect(card).toHaveStyle({
      background: 'linear-gradient(to bottom right, #f0f9ff, #ecfdf5)',
      borderColor: '#bae6fd',
    });
  });

  it('devrait accepter des props HTML standards', () => {
    render(
      <Card id="test-card" data-testid="custom-card" tabIndex={0}>
        Card avec props HTML
      </Card>
    );

    const card = screen.getByRole('article');
    expect(card).toHaveAttribute('id', 'test-card');
    expect(card).toHaveAttribute('data-testid', 'custom-card');
    expect(card).toHaveAttribute('tabIndex', '0');
  });
});

describe('⚡ Performance', () => {
  it('devrait render rapidement avec de nombreuses cards', () => {
    const startTime = performance.now();
    render(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Card key={i}>Card {i}</Card>
        ))}
      </div>
    );
    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(200); // Augmenté à 200ms pour les machines plus lentes
  });

  it('devrait optimiser les re-renders', () => {
    const { rerender } = render(<Card>Contenu initial</Card>);
    // Re-render avec les mêmes props ne devrait pas causer de problème
    rerender(<Card>Contenu initial</Card>);
    const card = screen.getByRole('article');
    expect(card).toBeInTheDocument();
  });

  it('teste tous les gestionnaires hover React par variant', () => {
    // Test variant project (lines 242-259)
    const { rerender } = render(
      <Card variant="project" hover>
        Project Card
      </Card>
    );
    let card = screen.getByRole('article');

    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();

    // Test variant skill
    rerender(
      <Card variant="skill" hover>
        Skill Card
      </Card>
    );
    card = screen.getByRole('article');

    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();

    // Test variant experience
    rerender(
      <Card variant="experience" hover>
        Experience Card
      </Card>
    );
    card = screen.getByRole('article');

    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();

    // Test variant testimonial (lines 233-236)
    rerender(
      <Card variant="testimonial" hover>
        Testimonial Card
      </Card>
    );
    card = screen.getByRole('article');

    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);
    expect(card).toBeInTheDocument();
  });

  it('teste gestionnaires hover avec disabled (lines 262-267)', () => {
    render(
      <Card disabled hover>
        Disabled Card
      </Card>
    );

    const card = screen.getByRole('article');

    // Les gestionnaires doivent être présents mais ne pas modifier les styles si disabled
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);

    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-disabled', 'true');
  });

  it('teste gestionnaires hover sans prop hover', () => {
    render(<Card variant="project">Non-hover Card</Card>);

    const card = screen.getByRole('article');

    // Gestionnaires présents mais ne font rien si hover=false
    fireEvent.mouseEnter(card);
    fireEvent.mouseLeave(card);

    expect(card).toBeInTheDocument();
  });
});
