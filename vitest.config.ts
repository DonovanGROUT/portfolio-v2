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
      // Moteur de couverture V8 (plus rapide que c8)
      provider: 'v8',
      // Formats de rapport : console + JSON + HTML
      reporter: ['text', 'json', 'html'],
      // Fichiers exclus de la couverture
      exclude: [
        'coverage/**',
        'dist/**',
        'packages/*/test{,s}/**',
        '**/*.d.ts',
        'cypress/**',
        'test{,s}/**',
        'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
        '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
        '**/__tests__/**',
        '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
        '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
        '.next/**',
        'next.config.js',
        'tailwind.config.js',
        'postcss.config.*', // Configuration PostCSS
        // Configuration files
        'eslint.config.ts',
        'next.config.ts',
        'vitest.config.ts',
        // Scripts de documentation et debug
        'docs/scripts/**',
        // Pages de démo - exemples pour développement
        'src/app/button-demo/**',
        'src/app/typography-demo/**',
        'src/app/simple-test/**',
        'src/app/card-demo/**',
        // Layout is difficult to test in isolation
        'src/app/layout.tsx',
        // Husky hooks are shell scripts
        '.husky/**',
      ],
      // Seuils de couverture obligatoires (CI échoue si non atteints)
      thresholds: {
        global: {
          branches: 80, // 80% des branches conditionnelles
          functions: 80, // 80% des fonctions
          lines: 80, // 80% des lignes de code
          statements: 80, // 80% des instructions
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
