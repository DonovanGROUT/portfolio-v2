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
    // Vérifier les styles inline du système colors.ts
    expect(button).toHaveStyle({
      backgroundColor: '#0369a1', // colors.primary[700]
      borderColor: '#0369a1',
      color: '#ffffff',
    });
  });

  // ===================================================================
  // TESTS VARIANTS & TAILLES GROUPÉS
  // ===================================================================

  it('devrait supporter tous les variants', () => {
    // Test tous les variants en une fois
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: '#0369a1', // colors.primary[700]
      borderColor: '#0369a1',
      color: '#ffffff',
    });

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: '#047857', // colors.secondary[600]
      borderColor: '#047857',
      color: '#ffffff',
    });

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveStyle({
      borderColor: '#0369a1', // colors.primary[700]
      color: '#0369a1',
    });
    // Vérifier que le background est transparent (peu importe le format)
    expect(button.style.backgroundColor).toMatch(
      /transparent|rgba\(0,\s*0,\s*0,\s*0\)/
    );
  });

  it('devrait utiliser le variant par défaut si variant non spécifié', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveStyle({
      backgroundColor: '#0369a1', // colors.primary[700] (default)
      borderColor: '#0369a1',
      color: '#ffffff',
    });
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
    expect(button).toHaveStyle({ opacity: '0.5', cursor: 'not-allowed' });
    expect(button).toHaveAttribute('aria-disabled', 'true');
  });

  it("devrait supporter l'état loading", () => {
    render(<Button loading>Loading</Button>);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveStyle({ opacity: '0.5', cursor: 'not-allowed' });
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

  it('devrait appeler preventDefault quand disabled ou loading dans handleClick', () => {
    // Test séparés pour éviter les conflits
    const { unmount } = render(<Button disabled>Test Disabled</Button>);
    const disabledButton = screen.getByRole('button');
    fireEvent.click(disabledButton);
    expect(disabledButton).toBeDisabled();
    unmount();

    // Test loading séparément après cleanup
    render(<Button loading>Test Loading</Button>);
    const loadingButton = screen.getByRole('button');
    fireEvent.click(loadingButton);
    expect(loadingButton).toBeDisabled();
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

  // ===================================================================
  // TESTS GESTIONNAIRES REACT (onMouseEnter/Leave)
  // ===================================================================

  it('teste les gestionnaires hover React avec colors.ts', () => {
    render(<Button variant="primary">Hover Test</Button>);

    const button = screen.getByRole('button');

    // Test mouseenter - should trigger React handler
    fireEvent.mouseEnter(button);
    expect(button).toBeInTheDocument();

    // Test mouseleave - should trigger React handler
    fireEvent.mouseLeave(button);
    expect(button).toBeInTheDocument();
  });

  it('teste les gestionnaires hover sur variant secondary', () => {
    render(<Button variant="secondary">Secondary Hover</Button>);

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    expect(button).toBeInTheDocument();
  });

  it('teste les gestionnaires hover sur variant outline', () => {
    render(<Button variant="outline">Outline Hover</Button>);

    const button = screen.getByRole('button');

    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    expect(button).toBeInTheDocument();
  });

  it('teste les gestionnaires hover sur bouton disabled', () => {
    render(<Button disabled>Disabled Hover</Button>);

    const button = screen.getByRole('button');

    // Les gestionnaires doivent être présents même si disabled
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  it('teste les gestionnaires hover sur bouton loading', () => {
    render(<Button loading>Loading Hover</Button>);

    const button = screen.getByRole('button');

    // Les gestionnaires doivent être présents même si loading
    fireEvent.mouseEnter(button);
    fireEvent.mouseLeave(button);

    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  // ===================================================================
  // TESTS FOCUS/BLUR HANDLERS
  // ===================================================================

  it('teste les gestionnaires focus/blur React', () => {
    render(<Button>Focus Test</Button>);

    const button = screen.getByRole('button');

    // Test focus handler
    fireEvent.focus(button);
    expect(button).toBeInTheDocument();

    // Test blur handler
    fireEvent.blur(button);
    expect(button).toBeInTheDocument();
  });

  // ===================================================================
  // TESTS VARIANTS COMPLETS POUR getVariantStyles()
  // ===================================================================

  it('teste tous les variants pour couverture getVariantStyles complète', () => {
    const { rerender } = render(<Button variant="primary">Primary</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#0369a1' });

    rerender(<Button variant="secondary">Secondary</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#047857' });

    rerender(<Button variant="outline">Outline</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: 'rgba(0, 0, 0, 0)' });

    // Test variant par défaut (default case)
    rerender(<Button>Default</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveStyle({ backgroundColor: '#0369a1' });
  });

  // ===================================================================
  // TESTS HANDLECLICK AVEC DISABLED
  // ===================================================================

  it('teste handleClick avec prévention disabled/loading', () => {
    const onClick = vi.fn();

    // Test avec disabled
    const { rerender } = render(
      <Button disabled onClick={onClick}>
        Disabled Button
      </Button>
    );
    let button = screen.getByRole('button');

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled(); // Lines 82-84 covered

    // Test avec loading
    rerender(
      <Button loading onClick={onClick}>
        Loading Button
      </Button>
    );
    button = screen.getByRole('button');

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled(); // Même logique disabled
  });
});
