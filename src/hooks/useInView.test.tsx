import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useInView } from './useInView';

// Component de test pour utiliser le hook
function TestComponent({
  threshold,
  rootMargin,
  triggerOnce,
}: {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}) {
  const options: {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
  } = {};
  if (threshold !== undefined) options.threshold = threshold;
  if (rootMargin !== undefined) options.rootMargin = rootMargin;
  if (triggerOnce !== undefined) options.triggerOnce = triggerOnce;

  const { ref, isInView, hasBeenInView } = useInView(options);

  return (
    <div ref={ref} data-testid="observed-element">
      <div data-testid="in-view">{isInView ? 'visible' : 'hidden'}</div>
      <div data-testid="has-been-in-view">
        {hasBeenInView ? 'was-visible' : 'never-visible'}
      </div>
    </div>
  );
}

describe('useInView', () => {
  let mockIntersectionObserver: {
    observe: ReturnType<typeof vi.fn>;
    disconnect: ReturnType<typeof vi.fn>;
    unobserve: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    // Mock IntersectionObserver
    mockIntersectionObserver = {
      observe: vi.fn(),
      disconnect: vi.fn(),
      unobserve: vi.fn(),
    };

    global.IntersectionObserver = vi.fn(callback => ({
      ...mockIntersectionObserver,
      // Stocker le callback pour le déclencher manuellement
      callback,
    })) as unknown as typeof IntersectionObserver;

    // Mock matchMedia pour prefers-reduced-motion
    global.matchMedia = vi.fn(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof matchMedia;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  // ===========================================
  // 1. BASIC FUNCTIONALITY
  // ===========================================
  describe('Basic Functionality', () => {
    it('should return ref, isInView, and hasBeenInView', () => {
      render(<TestComponent />);

      expect(screen.getByTestId('observed-element')).toBeInTheDocument();
      expect(screen.getByTestId('in-view')).toHaveTextContent('hidden');
      expect(screen.getByTestId('has-been-in-view')).toHaveTextContent(
        'never-visible'
      );
    });

    it('should create IntersectionObserver with default options', () => {
      render(<TestComponent />);

      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        {
          threshold: 0.1,
          rootMargin: '0px',
        }
      );
    });

    it('should observe the element', () => {
      render(<TestComponent />);

      expect(mockIntersectionObserver.observe).toHaveBeenCalled();
    });
  });

  // ===========================================
  // 2. INTERSECTION DETECTION
  // ===========================================
  describe('Intersection Detection', () => {
    it('should set isInView to true when element enters viewport', async () => {
      const { rerender } = render(<TestComponent />);

      // Simuler l'entrée dans le viewport
      const observerCallback = (global.IntersectionObserver as any).mock
        .calls[0][0];
      observerCallback([{ isIntersecting: true }]);

      rerender(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('in-view')).toHaveTextContent('visible');
        expect(screen.getByTestId('has-been-in-view')).toHaveTextContent(
          'was-visible'
        );
      });
    });

    it('should keep hasBeenInView true even after leaving viewport', async () => {
      const { rerender } = render(<TestComponent triggerOnce={false} />);

      const observerCallback = (global.IntersectionObserver as any).mock
        .calls[0][0];

      // Entrer dans le viewport
      observerCallback([{ isIntersecting: true }]);
      rerender(<TestComponent triggerOnce={false} />);

      await waitFor(() => {
        expect(screen.getByTestId('has-been-in-view')).toHaveTextContent(
          'was-visible'
        );
      });

      // Sortir du viewport
      observerCallback([{ isIntersecting: false }]);
      rerender(<TestComponent triggerOnce={false} />);

      await waitFor(() => {
        expect(screen.getByTestId('in-view')).toHaveTextContent('hidden');
        expect(screen.getByTestId('has-been-in-view')).toHaveTextContent(
          'was-visible'
        ); // Reste true
      });
    });
  });

  // ===========================================
  // 3. OPTIONS
  // ===========================================
  describe('Options', () => {
    it('should accept custom threshold', () => {
      render(<TestComponent threshold={0.5} />);

      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        {
          threshold: 0.5,
          rootMargin: '0px',
        }
      );
    });

    it('should accept custom rootMargin', () => {
      render(<TestComponent rootMargin="-100px" />);

      expect(global.IntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        {
          threshold: 0.1,
          rootMargin: '-100px',
        }
      );
    });

    it('should disconnect observer when triggerOnce is true', async () => {
      const { rerender } = render(<TestComponent triggerOnce={true} />);

      const observerCallback = (global.IntersectionObserver as any).mock
        .calls[0][0];
      observerCallback([{ isIntersecting: true }]);

      rerender(<TestComponent triggerOnce={true} />);

      await waitFor(() => {
        expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
      });
    });

    it('should not disconnect when triggerOnce is false', async () => {
      const { rerender } = render(<TestComponent triggerOnce={false} />);

      const observerCallback = (global.IntersectionObserver as any).mock
        .calls[0][0];
      observerCallback([{ isIntersecting: true }]);

      rerender(<TestComponent triggerOnce={false} />);

      await waitFor(() => {
        expect(mockIntersectionObserver.disconnect).not.toHaveBeenCalled();
      });
    });
  });

  // ===========================================
  // 4. ACCESSIBILITY (prefers-reduced-motion)
  // ===========================================
  describe('Accessibility', () => {
    it('should respect prefers-reduced-motion and show immediately', () => {
      // Mock prefers-reduced-motion: reduce
      global.matchMedia = vi.fn(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })) as unknown as typeof matchMedia;

      render(<TestComponent />);

      // Devrait afficher immédiatement (pas d'observer créé)
      expect(screen.getByTestId('in-view')).toHaveTextContent('visible');
      expect(screen.getByTestId('has-been-in-view')).toHaveTextContent(
        'was-visible'
      );
      expect(mockIntersectionObserver.observe).not.toHaveBeenCalled();
    });
  });

  // ===========================================
  // 5. CLEANUP
  // ===========================================
  describe('Cleanup', () => {
    it('should disconnect observer on unmount', () => {
      const { unmount } = render(<TestComponent />);

      unmount();

      expect(mockIntersectionObserver.disconnect).toHaveBeenCalled();
    });
  });
});
