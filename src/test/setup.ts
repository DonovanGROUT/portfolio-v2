// ===================================================================
// SETUP GLOBAL POUR LES TESTS - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Configure les mocks et l'état global avant chaque test
// ===================================================================

import '@testing-library/jest-dom';

import { vi } from 'vitest';

beforeEach(() => {
  // Reset de l'état global avant chaque test
  document.body.innerHTML = '';
});

afterEach(() => {
  // Nettoyage global des mocks et timers pour éviter les fuites de contexte
  vi.clearAllMocks();
  vi.useRealTimers();
});

// Mock des APIs du navigateur si nécessaire
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});

// Mock d'IntersectionObserver
global.IntersectionObserver = class MockIntersectionObserver {
  root: Element | null = null;
  rootMargin: string = '0px';
  thresholds: ReadonlyArray<number> = [];

  constructor(
    _callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.root = (options?.root as Element) || null;
    this.rootMargin = options?.rootMargin || '0px';
    this.thresholds = options?.threshold
      ? Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold]
      : [];
  }

  observe(): void {
    // Mock implementation - no operation needed
  }
  disconnect(): void {}
  unobserve(): void {
    // Mock implementation - no operation needed
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
} as unknown as typeof IntersectionObserver;

// Mock de ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};
