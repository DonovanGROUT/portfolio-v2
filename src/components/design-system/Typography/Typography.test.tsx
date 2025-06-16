// Test unitaires pour le composant Typography - Design System Portfolio
// Tests d'accessibilité, variants, responsive et sécurité
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Typography } from './Typography';

describe('Typography Component - Design System', () => {
  // ===================================================================
  // TESTS FONDAMENTAUX
  // ===================================================================

  it('devrait rendre le texte fourni', () => {
    render(<Typography>Texte de test</Typography>);

    const text = screen.getByText('Texte de test');
    expect(text).toBeInTheDocument();
  });

  it('devrait appliquer le variant h1 par défaut', () => {
    render(<Typography>Titre principal</Typography>);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-4xl', 'font-bold');
  });

  // ===================================================================
  // TESTS VARIANTS TYPOGRAPHIQUES
  // ===================================================================

  it('devrait supporter tous les variants de titres', () => {
    const { rerender } = render(<Typography variant="h1">Titre H1</Typography>);
    let heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-4xl', 'font-bold');

    rerender(<Typography variant="h2">Titre H2</Typography>);
    heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-3xl', 'font-semibold');

    rerender(<Typography variant="h3">Titre H3</Typography>);
    heading = screen.getByRole('heading', { level: 3 });
    expect(heading).toHaveClass('text-2xl', 'font-semibold');

    rerender(<Typography variant="h4">Titre H4</Typography>);
    heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toHaveClass('text-xl', 'font-medium');
  });

  it('devrait supporter les variants de corps de texte', () => {
    const { rerender } = render(
      <Typography variant="body">Corps de texte</Typography>
    );
    let text = screen.getByText('Corps de texte');
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-base', 'font-normal');

    rerender(<Typography variant="body-large">Corps large</Typography>);
    text = screen.getByText('Corps large');
    expect(text.tagName).toBe('P');
    expect(text).toHaveClass('text-lg', 'font-normal');

    rerender(<Typography variant="caption">Légende</Typography>);
    text = screen.getByText('Légende');
    expect(text.tagName).toBe('SPAN');
    expect(text).toHaveClass('text-sm', 'font-normal');
  });

  // ===================================================================
  // TESTS COULEURS ET STYLES
  // ===================================================================

  it('devrait supporter toutes les couleurs', () => {
    const { rerender } = render(
      <Typography color="primary">Texte primaire</Typography>
    );
    let text = screen.getByText('Texte primaire');
    expect(text).toHaveClass('text-sky-700');

    rerender(<Typography color="secondary">Texte secondaire</Typography>);
    text = screen.getByText('Texte secondaire');
    expect(text).toHaveClass('text-emerald-700');

    rerender(<Typography color="neutral">Texte neutre</Typography>);
    text = screen.getByText('Texte neutre');
    expect(text).toHaveClass('text-slate-700');

    rerender(<Typography color="muted">Texte atténué</Typography>);
    text = screen.getByText('Texte atténué');
    expect(text).toHaveClass('text-slate-500');
  });

  it('devrait supporter les alignements de texte', () => {
    const { rerender } = render(
      <Typography align="left">Texte à gauche</Typography>
    );
    let text = screen.getByText('Texte à gauche');
    expect(text).toHaveClass('text-left');

    rerender(<Typography align="center">Texte centré</Typography>);
    text = screen.getByText('Texte centré');
    expect(text).toHaveClass('text-center');

    rerender(<Typography align="right">Texte à droite</Typography>);
    text = screen.getByText('Texte à droite');
    expect(text).toHaveClass('text-right');
  });

  // ===================================================================
  // TESTS RESPONSIVE
  // ===================================================================

  it('devrait appliquer les classes responsive pour mobile', () => {
    render(
      <Typography variant="h1" responsive>
        Titre responsive
      </Typography>
    );

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveClass('text-2xl', 'md:text-4xl');
  });

  it('devrait adapter la taille selon le breakpoint', () => {
    const { rerender } = render(
      <Typography variant="h2" responsive>
        Titre H2 responsive
      </Typography>
    );
    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toHaveClass('text-xl', 'md:text-3xl');

    rerender(
      <Typography variant="body" responsive>
        Corps responsive
      </Typography>
    );
    const text = screen.getByText('Corps responsive');
    expect(text).toHaveClass('text-sm', 'md:text-base');
  });

  // ===================================================================
  // TESTS ACCESSIBILITÉ
  // ===================================================================

  it('devrait supporter les attributs ARIA personnalisés', () => {
    render(
      <Typography
        aria-label="Titre principal"
        aria-describedby="subtitle"
        role="heading"
      >
        Titre accessible
      </Typography>
    );

    const heading = screen.getByRole('heading');
    expect(heading).toHaveAttribute('aria-label', 'Titre principal');
    expect(heading).toHaveAttribute('aria-describedby', 'subtitle');
  });

  it('devrait avoir des contrastes WCAG 2.1 AA conformes', () => {
    const { rerender } = render(
      <Typography color="primary">Texte primaire</Typography>
    );
    let text = screen.getByText('Texte primaire');
    expect(text).toHaveClass('text-sky-700'); // Ratio 6.1:1

    rerender(<Typography color="secondary">Texte secondaire</Typography>);
    text = screen.getByText('Texte secondaire');
    expect(text).toHaveClass('text-emerald-700'); // Ratio 6.1:1
  });

  // ===================================================================
  // TESTS SÉCURITÉ ET VALIDATION
  // ===================================================================

  it('devrait échapper le contenu HTML dangereux', () => {
    const dangerousContent = '<script>alert("XSS")</script>Texte sécurisé';
    render(<Typography>{dangerousContent}</Typography>);

    const text = screen.getByText(dangerousContent);
    expect(text.innerHTML).not.toContain('<script>');
    expect(text.textContent).toBe(dangerousContent);
  });

  it('devrait accepter des classes CSS personnalisées', () => {
    render(
      <Typography className="custom-class">Texte personnalisé</Typography>
    );

    const text = screen.getByText('Texte personnalisé');
    expect(text).toHaveClass('custom-class');
    expect(text).toHaveClass('text-4xl'); // Garde les classes par défaut
  });

  it('devrait accepter des props HTML standards', () => {
    render(
      <Typography
        id="test-typography"
        data-testid="typography-component"
        title="Titre de test"
      >
        Texte avec props
      </Typography>
    );

    const text = screen.getByTestId('typography-component');
    expect(text).toHaveAttribute('id', 'test-typography');
    expect(text).toHaveAttribute('title', 'Titre de test');
  });

  // ===================================================================
  // TESTS COMPOSANTS SPÉCIALISÉS
  // ===================================================================

  it('devrait supporter un composant as personnalisé', () => {
    render(
      <Typography as="span" variant="h2">
        Titre en span
      </Typography>
    );

    const span = screen.getByText('Titre en span');
    expect(span.tagName).toBe('SPAN');
    expect(span).toHaveClass('text-3xl', 'font-semibold');
  });

  it('devrait gérer le truncate pour les textes longs', () => {
    render(
      <Typography truncate>
        Texte très long qui devrait être tronqué avec des points de suspension
      </Typography>
    );

    const text = screen.getByText(/Texte très long/);
    expect(text).toHaveClass('truncate');
  });

  // ===================================================================
  // TESTS PERFORMANCE ET OPTIMISATION
  // ===================================================================

  it('devrait avoir une taille de police lisible sur mobile', () => {
    render(<Typography variant="caption">Petite légende</Typography>);

    const caption = screen.getByText('Petite légende');
    expect(caption).toHaveClass('text-sm'); // Minimum 14px pour lisibilité
  });

  it('devrait maintenir la hiérarchie sémantique', () => {
    render(
      <div>
        <Typography variant="h1">Titre principal</Typography>
        <Typography variant="h2">Sous-titre</Typography>
        <Typography variant="body">Corps de texte</Typography>
      </div>
    );

    const h1 = screen.getByRole('heading', { level: 1 });
    const h2 = screen.getByRole('heading', { level: 2 });
    const p = screen.getByText('Corps de texte');

    expect(h1).toBeInTheDocument();
    expect(h2).toBeInTheDocument();
    expect(p.tagName).toBe('P');
  });
});
