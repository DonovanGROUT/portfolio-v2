import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LinkButton } from './LinkButton';

describe('LinkButton', () => {
  describe('Rendering', () => {
    it('renders as Next.js Link for internal URLs', () => {
      render(<LinkButton href="/about">About</LinkButton>);
      const link = screen.getByRole('link', { name: 'About' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/about');
    });

    it('renders as anchor tag for external URLs', () => {
      render(
        <LinkButton href="https://example.com" external>
          External
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'External' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', 'https://example.com');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('renders children correctly', () => {
      render(<LinkButton href="/test">Click Me</LinkButton>);
      expect(screen.getByText('Click Me')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies primary variant styling', () => {
      render(
        <LinkButton href="/test" variant="primary">
          Primary
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Primary' });
      expect(link).toHaveClass('bg-emerald-700');
    });

    it('applies secondary variant styling', () => {
      render(
        <LinkButton href="/test" variant="secondary">
          Secondary
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Secondary' });
      expect(link).toHaveClass('bg-sky-700');
    });

    it('applies outline variant styling', () => {
      render(
        <LinkButton href="/test" variant="outline">
          Outline
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Outline' });
      expect(link).toHaveClass('bg-transparent');
      expect(link).toHaveClass('border-sky-700');
    });

    it('applies outline-white variant styling', () => {
      render(
        <LinkButton href="/test" variant="outline-white">
          Outline White
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Outline White' });
      expect(link).toHaveClass('bg-transparent');
      expect(link).toHaveClass('border-white');
    });
  });

  describe('Sizes', () => {
    it('applies small size', () => {
      render(
        <LinkButton href="/test" size="small">
          Small
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Small' });
      expect(link).toHaveClass('px-3');
      expect(link).toHaveClass('py-1.5');
    });

    it('applies medium size by default', () => {
      render(<LinkButton href="/test">Medium</LinkButton>);
      const link = screen.getByRole('link', { name: 'Medium' });
      expect(link).toHaveClass('px-4');
      expect(link).toHaveClass('py-2');
    });

    it('applies large size', () => {
      render(
        <LinkButton href="/test" size="large">
          Large
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Large' });
      expect(link).toHaveClass('px-6');
      expect(link).toHaveClass('py-3');
    });
  });

  describe('Accessibility', () => {
    it('has proper role="link"', () => {
      render(<LinkButton href="/test">Link</LinkButton>);
      expect(screen.getByRole('link')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(
        <LinkButton href="/test" aria-label="Go to page">
          Go
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Go to page' });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('aria-label', 'Go to page');
    });

    it('meets minimum touch target size (44px)', () => {
      render(<LinkButton href="/test">Touch</LinkButton>);
      const link = screen.getByRole('link', { name: 'Touch' });
      expect(link).toHaveClass('min-h-[44px]');
      expect(link).toHaveClass('min-w-[44px]');
    });

    it('has visible focus ring', () => {
      render(<LinkButton href="/test">Focus</LinkButton>);
      const link = screen.getByRole('link', { name: 'Focus' });
      expect(link).toHaveClass('focus:outline-2');
      expect(link).toHaveClass('focus:outline-primary-700');
    });
  });

  describe('Security', () => {
    it('adds security attributes to external links', () => {
      render(
        <LinkButton href="https://evil.com" external>
          External
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'External' });
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('does not add target="_blank" to internal links', () => {
      render(<LinkButton href="/internal">Internal</LinkButton>);
      const link = screen.getByRole('link', { name: 'Internal' });
      expect(link).not.toHaveAttribute('target', '_blank');
    });
  });

  describe('Custom className', () => {
    it('merges custom className with default classes', () => {
      render(
        <LinkButton href="/test" className="custom-class">
          Custom
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Custom' });
      expect(link).toHaveClass('custom-class');
      expect(link).toHaveClass('inline-flex');
    });
  });

  describe('Disabled state', () => {
    it('applies disabled styling', () => {
      render(
        <LinkButton href="/test" disabled>
          Disabled
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Disabled' });
      expect(link).toHaveClass('opacity-50');
      expect(link).toHaveClass('cursor-not-allowed');
    });

    it('prevents navigation when disabled', () => {
      const handleClick = vi.fn();
      render(
        <LinkButton href="/test" disabled onClick={handleClick}>
          Disabled
        </LinkButton>
      );
      const link = screen.getByRole('link', { name: 'Disabled' });
      link.click();
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
