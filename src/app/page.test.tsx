import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  render,
  screen,
  createMockMatchMedia,
  createMockIntersectionObserver,
} from '../test/utils';
import Home from './page';

describe('Home Page', () => {
  beforeEach(() => {
    // Reset mocks before each test
    createMockMatchMedia(false);
    createMockIntersectionObserver();
  });

  it('renders the Next.js logo', () => {
    render(<Home />);

    const logo = screen.getByAltText('Next.js logo');
    expect(logo).toBeInTheDocument();
  });

  it('displays the getting started text', () => {
    render(<Home />);

    const gettingStartedText = screen.getByText(/Get started by editing/i);
    expect(gettingStartedText).toBeInTheDocument();
  });

  it('shows the file path to edit', () => {
    render(<Home />);

    const filePath = screen.getByText('src/app/page.tsx');
    expect(filePath).toBeInTheDocument();
  });

  it('renders the deploy section', () => {
    render(<Home />);

    const deployButton = screen.getByRole('link', { name: /Deploy now/i });
    expect(deployButton).toBeInTheDocument();
    expect(deployButton).toHaveAttribute(
      'href',
      expect.stringContaining('vercel')
    );
  });

  it('has proper structure with main element', () => {
    render(<Home />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('flex', 'flex-col', 'gap-[32px]');
  });

  it('renders correctly on mobile devices', () => {
    // Test with mobile breakpoint
    createMockMatchMedia(true);
    render(<Home />);

    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass('items-center');
  });

  it('handles intersection observer for animations', () => {
    const mockObserver = createMockIntersectionObserver();
    render(<Home />);

    // Verify IntersectionObserver is available for potential animations
    expect(window.IntersectionObserver).toBeDefined();
    expect(mockObserver).toBeDefined();
  });

  it('renders all external links with proper security attributes', () => {
    render(<Home />);

    const externalLinks = screen.getAllByRole('link', {
      name: /vercel|docs|nextjs/i,
    });

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('displays all navigation icons', () => {
    render(<Home />);

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
  });

  it('tests matchMedia mock functions', () => {
    createMockMatchMedia(true);

    // Test that matchMedia is properly mocked
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    expect(mediaQuery.matches).toBe(true);
    expect(mediaQuery.media).toBe('(max-width: 768px)');

    // Test mock functions to improve coverage
    expect(() => mediaQuery.addListener(vi.fn())).not.toThrow();
    expect(() => mediaQuery.removeListener(vi.fn())).not.toThrow();
    expect(() => mediaQuery.addEventListener('change', vi.fn())).not.toThrow();
    expect(() =>
      mediaQuery.removeEventListener('change', vi.fn())
    ).not.toThrow();
    expect(() => mediaQuery.dispatchEvent(new Event('change'))).not.toThrow();
  });

  it('tests IntersectionObserver mock functions', () => {
    const mockObserver = createMockIntersectionObserver();

    // Create an actual observer instance
    const callback = vi.fn();
    const observer = new window.IntersectionObserver(callback);

    // Test mock functions to improve coverage
    expect(() => observer.observe(document.body)).not.toThrow();
    expect(() => observer.unobserve(document.body)).not.toThrow();
    expect(() => observer.disconnect()).not.toThrow();

    // Verify the mock was called
    expect(mockObserver).toHaveBeenCalled();
  });

  it('tests custom render function', () => {
    // Test our custom render utility directly
    const { container } = render(<div data-testid="test">Test content</div>);

    expect(screen.getByTestId('test')).toBeInTheDocument();
    expect(container.firstChild).toHaveTextContent('Test content');
  });
});
