// ===================================================================
// TESTS UNITAIRES POUR LE COMPOSANT PRIVACY NOTICE - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Tests d'accessibilité, interactions, états d'expansion
// ===================================================================

import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PrivacyNotice } from './PrivacyNotice';
import type { TypographyProps } from '../Typography/Typography';

// Mock du composant Typography avec types appropriés
vi.mock('../Typography/Typography', () => ({
  Typography: ({ variant, children, ...props }: TypographyProps) => (
    <div data-testid="typography" data-variant={variant} {...props}>
      {children}
    </div>
  ),
}));

describe('PrivacyNotice Component - Design System', () => {
  const defaultProps = {
    contactEmail: 'test@example.com',
  };

  describe('Basic Rendering', () => {
    test('should render with required props', () => {
      render(<PrivacyNotice {...defaultProps} />);

      expect(screen.getByText('Protection de vos données')).toBeInTheDocument();
      expect(
        screen.getByText(/Vos données restent privées/)
      ).toBeInTheDocument();
    });

    test('should render contact email link in expanded details', async () => {
      const user = userEvent.setup();
      render(<PrivacyNotice {...defaultProps} />);

      // Email link should not be visible initially
      expect(
        screen.queryByRole('link', { name: /test@example.com/ })
      ).not.toBeInTheDocument();

      // Expand details
      const toggleButton = screen.getByRole('button', {
        name: /Détails complets/,
      });
      await user.click(toggleButton);

      // Now email link should be visible
      const emailLink = screen.getByRole('link', { name: /test@example.com/ });
      expect(emailLink).toHaveAttribute('href', 'mailto:test@example.com');
    });
  });

  describe('Expansion Functionality', () => {
    test('should toggle details on button click', async () => {
      const user = userEvent.setup();
      render(<PrivacyNotice {...defaultProps} />);

      const toggleButton = screen.getByRole('button', {
        name: /Détails complets/,
      });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      // Details should not be visible initially
      expect(
        screen.queryByText(/collectées dans le cadre strict/)
      ).not.toBeInTheDocument();

      // Click to expand
      await user.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'true');
      expect(
        screen.getByText(/collectées dans le cadre strict/)
      ).toBeInTheDocument();

      // Click to collapse
      await user.click(toggleButton);
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
      expect(
        screen.queryByText(/collectées dans le cadre strict/)
      ).not.toBeInTheDocument();
    });
  });

  describe('Policy Link', () => {
    test('should render policy link when provided', () => {
      render(
        <PrivacyNotice
          {...defaultProps}
          policyUrl="https://example.com/policy"
          policyLinkText="Privacy Policy"
        />
      );

      const policyLink = screen.getByRole('link', { name: /Privacy Policy/ });
      expect(policyLink).toHaveAttribute('href', 'https://example.com/policy');
      expect(policyLink).toHaveAttribute('target', '_blank');
      expect(policyLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    test('should not render policy link when not provided', () => {
      render(<PrivacyNotice {...defaultProps} />);

      expect(
        screen.queryByRole('link', { name: /Politique complète/ })
      ).not.toBeInTheDocument();
    });
  });

  describe('Acceptance Checkbox', () => {
    test('should handle controlled acceptance state', async () => {
      const mockOnAccept = vi.fn();
      const user = userEvent.setup();

      const { rerender } = render(
        <PrivacyNotice
          {...defaultProps}
          accepted={false}
          onAccept={mockOnAccept}
        />
      );

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);
      expect(mockOnAccept).toHaveBeenCalledWith(true);

      // Simulate parent component updating the state
      rerender(
        <PrivacyNotice
          {...defaultProps}
          accepted={true}
          onAccept={mockOnAccept}
        />
      );

      expect(checkbox).toBeChecked();
    });

    test('should have required attribute', () => {
      render(<PrivacyNotice {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox');
      expect(checkbox).toBeRequired();
    });
  });

  describe('Accessibility', () => {
    test('should have proper ARIA attributes', () => {
      render(<PrivacyNotice {...defaultProps} />);

      const toggleButton = screen.getByRole('button', {
        name: /Détails complets/,
      });
      expect(toggleButton).toHaveAttribute('aria-expanded', 'false');

      // Vérifier que l'ID aria-controls est bien présent et commence par 'privacy-details-'
      const ariaControls = toggleButton.getAttribute('aria-controls');
      expect(ariaControls).toMatch(/^privacy-details-/);
    });

    test('should have accessible checkbox label', () => {
      render(<PrivacyNotice {...defaultProps} />);

      const checkbox = screen.getByRole('checkbox', {
        name: /J'accepte les conditions de confidentialité/,
      });
      expect(checkbox).toBeInTheDocument();
    });
  });

  describe('Custom Styling', () => {
    test('should accept custom className', () => {
      const { container } = render(
        <PrivacyNotice {...defaultProps} className="custom-class" />
      );

      // The custom class is applied to the root container div
      const rootDiv = container.firstChild as HTMLElement;
      expect(rootDiv).toHaveClass('custom-class');
    });

    test('should use custom heading level', () => {
      render(<PrivacyNotice {...defaultProps} headingLevel="h2" />);

      const heading = screen.getByText('Protection de vos données');
      expect(heading.closest('[data-testid="typography"]')).toHaveAttribute(
        'data-variant',
        'h2'
      );
    });
  });
});
