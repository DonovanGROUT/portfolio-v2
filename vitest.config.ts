// Configuration Vitest pour tests unitaires et d'intégration
// Support Next.js + React + TypeScript avec couverture de code
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Plugin React pour supporter JSX/TSX dans les tests
  plugins: [react()],
  test: {
    // Variables globales Vitest (describe, it, expect)
    globals: true,
    // Environnement DOM simulé pour tester les composants React
    environment: 'jsdom',
    // Fichier de configuration des tests (mocks, setup)
    setupFiles: ['./src/test/setup.ts'],
    // Pattern des fichiers de test à inclure
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    // Dossiers/fichiers à exclure des tests
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
    ],
    // Configuration de la couverture de code
    coverage: {
      provider: 'v8', // Moteur de couverture V8 (plus rapide que c8)
      reporter: ['text', 'json', 'html'], // Formats de rapport : console + JSON + HTML
      exclude: [
        // Fichiers exclus de la couverture
        'coverage/**', // Dossier de rapport coverage
        'dist/**', // Dossier de build
        'packages/*/test{,s}/**', // Tests dans packages monorepo
        '**/*.d.ts', // Typescript types
        'cypress/**', // E2E tests Cypress
        'test{,s}/**', // Dossier de tests utilitaires
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}', // Fichiers de test utilitaires
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}', // Tous les fichiers de test
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}', // Tous les fichiers de spec
        '**/__tests__/**', // Dossier __tests__
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*', // Fichiers de config outils
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}', // Fichiers de config linter/test
        '.next/**', // Build Next.js
        'next.config.js', // Config Next.js
        'next-sitemap.config.js', // Config sitemap (ajouté)
        'tailwind.config.js', // Config Tailwind
        'postcss.config.*', // Config PostCSS
        'eslint.config.ts', // Config ESLint
        'next.config.ts', // Config Next.js
        'vitest.config.ts', // Config Vitest
        'docs/scripts/**', // Scripts de documentation
        // Pages de démo et exemples
        'src/app/button-demo/**',
        'src/app/typography-demo/**',
        'src/app/navigation-demo/**',
        'src/app/card-demo/**',
        'src/app/modal-demo/**',
        'src/app/form-demo/**',
        'src/app/privacy-notice-demo/**',
        'src/app/hero-demo/page.tsx', // Page de démo Hero (ajouté)
        // Pages statiques sans logique métier
        'src/app/about/page.tsx',
        'src/app/projects/page.tsx',
        'src/app/contact/page.tsx',
        'src/app/politique-confidentialite/page.tsx',
        // Layout global
        'src/app/layout.tsx',
        // Hooks Husky
        '.husky/**',
      ],
      // Seuils de couverture obligatoires (CI échoue si non atteints)
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
  // Résolution des alias de chemins (@ = ./src)
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
