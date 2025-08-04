// ===================================================================
// TESTS UNITAIRES POUR LE COMPOSANT BUTTON - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Tests d'accessibilité, variants, états, sécurité, interactions, validation
// ===================================================================
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
    expect(button).toHaveClass('inline-flex'); // classe de base optimisée
    expect(button).toHaveClass('bg-sky-700'); // variant primary par défaut
  });

  // ===================================================================
  // TESTS VARIANTS & TAILLES GROUPÉS
  // ===================================================================

  it('devrait supporter tous les variants', () => {
    // Test tous les variants en une fois
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('bg-sky-700'); // primary optimisé

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-emerald-700'); // secondary optimisé

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('bg-transparent'); // outline optimisé
  });

  it('devrait supporter toutes les tailles', () => {
    // Test toutes les tailles en une fois
    const { rerender } = render(<Button size="small">Small</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('px-3'); // small optimisé

    rerender(<Button size="medium">Medium</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('px-4'); // medium optimisé

    rerender(<Button size="large">Large</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('px-6'); // large optimisé
  });

  // ===================================================================
  // TESTS ÉTATS
  // ===================================================================

  it("devrait supporter l'état disabled", () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-not-allowed'); // disabled optimisé
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it("devrait supporter l'état loading", () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('cursor-wait'); // loading optimisé
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
  // TESTS ÉVÉNEMENTS & INTERACTIONS GROUPÉS
  // ===================================================================

  it('devrait gérer tous les événements click et clavier correctement', () => {
    const handleClick = vi.fn();
    const { rerender } = render(
      <Button onClick={handleClick}>Click me</Button>
    );

    // Test click normal
    let button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test clavier Enter
    handleClick.mockClear();
    fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test clavier Space
    handleClick.mockClear();
    fireEvent.keyDown(button, { key: ' ', code: 'Space' });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test disabled état - ne déclenche pas onClick
    handleClick.mockClear();
    rerender(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );
    button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();

    // Test loading état - ne déclenche pas onClick
    rerender(
      <Button loading onClick={handleClick}>
        Loading
      </Button>
    );
    button = screen.getByRole('button');
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();

    // Test touches ignorées
    handleClick.mockClear();
    rerender(<Button onClick={handleClick}>Other Keys</Button>);
    button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Tab', code: 'Tab' });
    fireEvent.keyDown(button, { key: 'Escape', code: 'Escape' });
    fireEvent.keyDown(button, { key: 'ArrowDown', code: 'ArrowDown' });
    expect(handleClick).not.toHaveBeenCalled();
  });

  // ===================================================================
  // TESTS SÉCURITÉ & VALIDATION GROUPÉS
  // ===================================================================

  it('devrait accepter des classes CSS et props HTML personnalisées', () => {
    render(
      <Button
        className="custom-class"
        id="test-button"
        data-testid="button-component"
        title="Bouton de test"
      >
        Test Props
      </Button>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('inline-flex'); // classe de base optimisée
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveAttribute('id', 'test-button');
    expect(button).toHaveAttribute('data-testid', 'button-component');
    expect(button).toHaveAttribute('title', 'Bouton de test');
  });

  // Test combiné loading + disabled pour une couverture optimale
  it('devrait gérer correctement un bouton à la fois loading et disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button loading disabled onClick={handleClick}>
        Bouton loading et disabled
      </Button>
    );

    const button = screen.getByRole('button');

    // Vérifier les attributs ARIA combinés
    expect(button).toHaveAttribute('aria-busy', 'true');
    expect(button).toHaveAttribute('aria-disabled', 'true');
    expect(button).toHaveAttribute('tabIndex', '-1');
    expect(button).toBeDisabled();

    // Vérifier que les événements sont bien ignorés
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Test spécifique pour couvrir la prévention clavier sur disabled

  it('ne devrait pas déclencher onClick via clavier quand disabled', () => {
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Disabled Keyboard
      </Button>
    );

    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });

    expect(handleClick).not.toHaveBeenCalled();
  });

  it('couvre le bloc preventDefault/return clavier sur loading', () => {
    const handleClick = vi.fn();
    render(
      <Button loading onClick={handleClick}>
        Loading Keyboard
      </Button>
    );
    const button = screen.getByRole('button');
    fireEvent.keyDown(button, { key: 'Enter' });
    fireEvent.keyDown(button, { key: ' ' });
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('ne doit pas appeler onClick si disabled', () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Test
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('ne doit pas appeler onClick si loading', () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Test
      </Button>
    );
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
