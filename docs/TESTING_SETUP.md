# Documentation des Tests - Portfolio TDD

## 🎯 Vue d'ensemble

Cette documentation décrit la configuration complète de l'environnement de test du portfolio, suivant une approche **Test-Driven Development (TDD)** stricte avec des outils modernes et performants.

## 📚 Stack de Test

### Outils Principaux

- **[Vitest](https://vitest.dev/)** : Test runner moderne et rapide (alternative à Jest)
- **[Testing Library](https://testing-library.com/)** : Utilitaires pour tester les composants React
- **[jsdom](https://github.com/jsdom/jsdom)** : Simulation du DOM pour les tests unitaires
- **[@testing-library/jest-dom](https://github.com/testing-library/jest-dom)** : Matchers personnalisés pour le DOM

### Dépendances Installées

```bash
npm install --save-dev vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/jest
```

## ⚙️ Configuration

### Vitest Config (`vitest.config.ts`)

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Points clés de la configuration :**

- ✅ **Globals activés** : `describe`, `it`, `expect` disponibles sans import
- ✅ **Environnement jsdom** : Simulation complète du navigateur
- ✅ **Setup automatique** : Configuration globale dans `src/test/setup.ts`
- ✅ **Couverture de code** : Seuil minimal de 80% requis
- ✅ **Alias de paths** : Support de `@/` pour les imports relatifs

### Setup Global (`src/test/setup.ts`)

```typescript
import "@testing-library/jest-dom";

// Configuration globale pour tous les tests
beforeEach(() => {
  // Reset de l'état global avant chaque test
  document.body.innerHTML = "";
});

// Mock des APIs du navigateur
Object.defineProperty(window, "matchMedia", {
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

// Mock d'IntersectionObserver (pour les animations, lazy loading)
global.IntersectionObserver = class MockIntersectionObserver {
  root: Element | null = null;
  rootMargin: string = "0px";
  thresholds: ReadonlyArray<number> = [];

  constructor(
    _callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.root = (options?.root as Element) || null;
    this.rootMargin = options?.rootMargin || "0px";
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

// Mock de ResizeObserver (pour le responsive design)
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
```

**Fonctionnalités du setup :**

- 🧹 **Reset automatique** : DOM nettoyé avant chaque test
- 🎭 **Mocks des APIs** : `matchMedia`, `IntersectionObserver`, `ResizeObserver`
- 🔧 **Extensions jest-dom** : Matchers comme `toBeInTheDocument()`

### Utilitaires de Test (`src/test/utils.tsx`)

```typescript
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement } from "react";
import { vi } from "vitest";
import React from "react";

// Interface pour les options personnalisées de rendu
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  // Réservé pour de futurs providers (context, theme, etc.)
  providers?: React.ComponentType<{ children: React.ReactNode }>[];
}

// Fonction de rendu personnalisée
const customRender = (ui: ReactElement, options?: CustomRenderOptions) => {
  return render(ui, options);
};

// Re-export de tout ce dont on a besoin
export * from "@testing-library/react";
export { customRender as render };

// Utilitaires de test personnalisés
export const createMockIntersectionObserver = () => {
  const mockIntersectionObserver = vi.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null,
  });
  window.IntersectionObserver = mockIntersectionObserver;
  return mockIntersectionObserver;
};

export const createMockMatchMedia = (matches = false) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
      matches,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};
```

**Avantages des utilitaires :**

- 🎨 **Render personnalisé** : Prêt pour les providers (Context, Theme, etc.)
- 🔧 **Mocks dynamiques** : Créer des mocks spécifiques par test
- 📦 **Export centralisé** : Un seul import pour tous les outils de test

## 🧪 Scripts Package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run",
    "test:coverage": "vitest run --coverage",
    "test:watch": "vitest --watch"
  }
}
```

**Commandes disponibles :**

- `npm test` : Mode watch interactif
- `npm run test:ui` : Interface graphique pour les tests
- `npm run test:run` : Exécution unique (CI/CD)
- `npm run test:coverage` : Rapport de couverture
- `npm run test:watch` : Mode surveillance explicite

## 📝 Exemple de Test

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "../test/utils";
import Home from "./page";

describe("Home Page", () => {
  it("renders the Next.js logo", () => {
    render(<Home />);

    const logo = screen.getByAltText("Next.js logo");
    expect(logo).toBeInTheDocument();
  });

  it("displays the getting started text", () => {
    render(<Home />);

    const gettingStartedText = screen.getByText(/Get started by editing/i);
    expect(gettingStartedText).toBeInTheDocument();
  });

  it("has proper structure with main element", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toBeInTheDocument();
    expect(main).toHaveClass("flex", "flex-col", "gap-[32px]");
  });
});
```

## 🎯 Approche TDD

### Red-Green-Refactor Cycle

1. **🔴 RED** : Écrire un test qui échoue
2. **🟢 GREEN** : Écrire le code minimal pour faire passer le test
3. **🔵 REFACTOR** : Améliorer le code sans casser les tests

### Bonnes Pratiques

#### Structure des Tests

```typescript
describe("ComponentName", () => {
  // Tests de rendu de base
  it("renders without crashing", () => {});

  // Tests de contenu
  it("displays expected content", () => {});

  // Tests d'interactions
  it("handles user interactions", () => {});

  // Tests d'accessibilité
  it("is accessible", () => {});

  // Tests de responsive
  it("adapts to different screen sizes", () => {});
});
```

#### Nommage des Tests

- ✅ `it("renders the navigation menu")`
- ✅ `it("opens modal when button is clicked")`
- ✅ `it("validates form inputs correctly")`
- ❌ `it("test 1")` ou `it("works")`

#### Sélecteurs Recommandés (par ordre de priorité)

1. **Par rôle** : `getByRole('button', { name: /submit/i })`
2. **Par label** : `getByLabelText(/username/i)`
3. **Par texte** : `getByText(/hello world/i)`
4. **Par display value** : `getByDisplayValue(/john/i)`
5. **Par alt text** : `getByAltText(/logo/i)`
6. **Par test id** : `getByTestId('submit-button')` (en dernier recours)

## 🎛️ Configuration Avancée

### Mocks Spécialisés

```typescript
// Mock Next.js Image
vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) =>
    <img src={src} alt={alt} {...props} />
}));

// Mock Next.js Router
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: vi.fn(),
    forward: vi.fn(),
    refresh: vi.fn(),
  }),
  usePathname: () => '/current-path',
}));
```

### Tests d'Intégration

```typescript
describe("Component Integration", () => {
  it("communicates correctly with API", async () => {
    // Mock API response
    global.fetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ data: 'test' }),
    });

    render(<ComponentWithAPI />);

    await waitFor(() => {
      expect(screen.getByText('test')).toBeInTheDocument();
    });
  });
});
```

## 📊 Métriques de Qualité

### Couverture de Code (80% minimum)

- **Branches** : 80%+
- **Functions** : 80%+
- **Lines** : 80%+
- **Statements** : 80%+

### Performance des Tests

- ⚡ **< 500ms** par suite de tests
- 🚀 **< 5s** pour l'ensemble des tests
- 💾 **< 100MB** d'utilisation mémoire

## 🔧 Dépannage

### Erreurs Communes

#### "ReferenceError: document is not defined"

```bash
# Vérifier que l'environnement jsdom est configuré
environment: "jsdom"
```

#### "IntersectionObserver is not defined"

```bash
# S'assurer que le mock est dans setup.ts
setupFiles: ["./src/test/setup.ts"]
```

#### Tests qui ne se lancent pas

```bash
# Vérifier l'inclusion des fichiers
include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"]
```

### Commandes de Debug

```bash
# Debug avec verbose
npm test -- --reporter=verbose

# Debug d'un seul fichier
npm test -- page.test.tsx

# Debug avec couverture détaillée
npm run test:coverage -- --reporter=detailed
```

## 🎯 Prochaines Étapes

1. **ESLint strict** : Configuration avec intégration Prettier
2. **Husky hooks** : Pre-commit avec tests automatiques
3. **GitHub Actions** : CI/CD avec tests et déploiement
4. **Tests E2E** : Playwright pour les tests d'intégration complète
5. **Visual Testing** : Chromatic pour les tests de régression visuelle

---

## 📚 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Best Practices](https://testing-library.com/docs/guiding-principles)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)
- [TDD Red-Green-Refactor](https://www.codecademy.com/article/tdd-red-green-refactor)

---

✅ **Configuration des tests complétée** - Environnement TDD prêt pour le développement !

## 🔧 Vérification et Qualité du Code

### Scripts de Vérification

Le projet utilise une approche multicouche pour garantir la qualité du code :

```json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "lint": "next lint",
    "lint:fix": "next lint --fix",
    "lint:strict": "next lint --max-warnings 0",
    "check": "npm run format:check && npm run lint:strict && npm run test:run"
  }
}
```

### Configuration ESLint Strict

**Fichier** : `eslint.config.ts` (TypeScript pour cohérence)

```typescript
const eslintConfig = [
  // Configuration de base Next.js
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Intégration Prettier (désactive les conflits)
  ...compat.extends("eslint-config-prettier"),

  // Règles strictes personnalisées
  {
    files: ["**/*.{js,ts,tsx}"],
    rules: {
      // TypeScript strict
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/prefer-as-const": "error",

      // Qualité de code
      "no-console": "warn",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-var": "error",

      // React/Next.js
      "react/jsx-key": "error",
      "react/jsx-no-target-blank": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Accessibilité de base
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
    },
  },

  // Configuration spéciale pour les tests
  {
    files: ["**/*.{test,spec}.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-console": "off",
    },
  },
];
```

**Avantages de cette configuration :**

- ✅ **Étend Next.js** : Garde la compatibilité totale
- ✅ **Intègre Prettier** : Aucun conflit de formatage
- ✅ **TypeScript strict** : Détection d'erreurs avancée
- ✅ **Accessibilité** : Respect WCAG de base
- ✅ **Tests adaptés** : Règles moins strictes pour les tests

### Commandes de Vérification

#### 1. Vérification du Formatage

```bash
# Vérifier le formatage (sans modifier)
npm run format:check

# Corriger automatiquement le formatage
npm run format
```

**Exemple de sortie :**

```bash
> npm run format:check
Checking formatting...
All matched files use Prettier code style! ✅

# Ou si problèmes détectés :
[warn] src/app/page.tsx
Code style issues found in 1 file. Run Prettier with --write to fix.
```

#### 2. Vérification ESLint

```bash
# Linting standard (autorise avertissements)
npm run lint

# Linting strict (zéro avertissement toléré)
npm run lint:strict

# Correction automatique des erreurs ESLint
npm run lint:fix
```

**Exemple de sortie :**

```bash
> npm run lint:strict
✔ No ESLint warnings or errors ✅

# Ou si problèmes détectés :
./src/app/page.tsx
4:7  Warning: 'unusedVar' is assigned but never used  @typescript-eslint/no-unused-vars
```

#### 3. Vérification Complète

```bash
# Vérification complète : formatage + linting + tests
npm run check
```

**Cette commande exécute dans l'ordre :**

1. **Format check** : Vérifie le style de code
2. **Lint strict** : Vérifie la qualité sans avertissements
3. **Test run** : Exécute tous les tests

**Exemple de sortie complète :**

```bash
> npm run check

> npm run format:check
All matched files use Prettier code style! ✅

> npm run lint:strict
✔ No ESLint warnings or errors ✅

> npm run test:run
✓ src/app/page.test.tsx (5 tests) 172ms
Test Files  1 passed (1)
Tests  5 passed (5) ✅
```

### Workflow de Développement Recommandé

#### Avant chaque commit

```bash
# 1. Corriger automatiquement le formatage
npm run format

# 2. Vérification complète
npm run check

# 3. Si tout passe, commit
git add .
git commit -m "feat: nouvelle fonctionnalité"
```

#### En cas d'erreurs

**Problèmes de formatage :**

```bash
# Correction automatique
npm run format
```

**Erreurs ESLint :**

```bash
# Tentative de correction automatique
npm run lint:fix

# Si ça ne suffit pas, correction manuelle nécessaire
```

**Tests qui échouent :**

```bash
# Tests en mode watch pour debug
npm run test:watch

# Tests avec interface graphique
npm run test:ui
```

### Intégration avec l'Éditeur

**VS Code Settings** (`.vscode/settings.json`) :

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

**Cela garantit :**

- ✅ Formatage automatique à la sauvegarde
- ✅ Correction ESLint automatique
- ✅ Feedback immédiat dans l'éditeur

### Métriques de Qualité

#### Objectifs Zero-Warning

Le projet vise **zéro avertissement** en production :

- 🎯 **Format** : 100% des fichiers respectent Prettier
- 🎯 **ESLint** : Zéro warning/error en mode strict
- 🎯 **Tests** : 100% de réussite + 80% couverture minimum
- 🎯 **TypeScript** : Aucune erreur de compilation

#### Monitoring Continu

```bash
# Dashboard complet de la qualité
npm run check

# Couverture de tests détaillée
npm run test:coverage

# Rapport ESLint détaillé
npm run lint -- --format=detailed
```

---
