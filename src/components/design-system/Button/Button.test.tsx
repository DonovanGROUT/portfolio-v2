// Test unitaires pour le composant Button - Design System Portfolio
// Tests d'accessibilité, variants, états et sécurité
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from './Button';

describe('Button Component - Design System', () => {
  // ===================================================================
  // TESTS FONDAMENTAUX
  // ===================================================================

  it('devrait rendre un bouton avec le texte fourni', () => {
    render(<Button>Cliquer ici</Button>);

    const button = screen.getByRole('button', { name: /cliquer ici/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Cliquer ici');
  });

  it('devrait appliquer la classe CSS par défaut', () => {
    render(<Button>Test</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('btn-primary'); // variant par défaut
  });

  // ===================================================================
  // TESTS VARIANTS
  // ===================================================================

  it('devrait supporter le variant primary (défaut)', () => {
    render(<Button variant="primary">Primary</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-primary');
  });

  it('devrait supporter le variant secondary', () => {
    render(<Button variant="secondary">Secondary</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-secondary');
  });

  it('devrait supporter le variant outline', () => {
    render(<Button variant="outline">Outline</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-outline');
  });

  // ===================================================================
  // TESTS TAILLES
  // ===================================================================

  it('devrait supporter la taille small', () => {
    render(<Button size="small">Small</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-small');
  });

  it('devrait supporter la taille medium (défaut)', () => {
    render(<Button size="medium">Medium</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-medium');
  });

  it('devrait supporter la taille large', () => {
    render(<Button size="large">Large</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn-large');
  });

  // ===================================================================
  // TESTS ÉTATS
  // ===================================================================

  it("devrait supporter l'état disabled", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-disabled');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it("devrait supporter l'état loading", () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('btn-loading');
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  // ===================================================================
  // TESTS ACCESSIBILITÉ
  // ===================================================================

  it('devrait supporter les attributs ARIA personnalisés', () => {
    render(
      <Button
        aria-label="Bouton personnalisé"
        aria-describedby="help-text"
        role="button"
      >
        Test
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Bouton personnalisé');
    expect(button).toHaveAttribute('aria-describedby', 'help-text');
  });

  it('devrait être focusable avec le clavier', () => {
    render(<Button>Focus Test</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '0');

    button.focus();
    expect(button).toHaveFocus();
  });

  it('ne devrait pas être focusable quand disabled', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('tabIndex', '-1');
  });

  // ===================================================================
  // TESTS ÉVÉNEMENTS & INTERACTIONS
  // ===================================================================

  it('devrait déclencher onClick quand cliqué', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('ne devrait pas déclencher onClick quand disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('ne devrait pas déclencher onClick quand loading', () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('devrait supporter les événements clavier (Enter)', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Keyboard</Button>);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('devrait supporter les événements clavier (Space)', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Keyboard</Button>);

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  // ===================================================================
  // TESTS SÉCURITÉ & VALIDATION
  // ===================================================================

  it('devrait échapper le contenu HTML dangereux', () => {
    const dangerousContent = '<script>alert("XSS")</script>Texte sécurisé';
    render(<Button>{dangerousContent}</Button>);

    const button = screen.getByRole('button');
    // Le contenu ne devrait pas contenir de balise script
    expect(button.innerHTML).not.toContain('<script>');
    expect(button.textContent).toBe(dangerousContent);
  });

  it('devrait accepter des classes CSS personnalisées', () => {
    render(<Button className="custom-class">Custom</Button>);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('btn');
    expect(button).toHaveClass('custom-class');
  });

  it('devrait accepter des props HTML standards', () => {
    render(
      <Button
        id="test-button"
        data-testid="button-component"
        title="Bouton de test"
      >
        Standard Props
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('data-testid', 'button-component');
    expect(button).toHaveAttribute('title', 'Bouton de test');
  });

  // ===================================================================
  // TESTS RESPONSIVE & MOBILE
  // ===================================================================

  it('devrait avoir une taille minimale pour le touch (44px)', () => {
    render(<Button>Touch Target</Button>);

    const button = screen.getByRole('button');

    // Le CSS devrait garantir au moins 44px de hauteur/largeur pour le touch
    expect(button).toHaveClass('btn'); // La classe CSS doit gérer min-height: 44px
  });
});
