import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // IGNORER les fichiers générés automatiquement
  {
    ignores: [
      '.next/**/*',
      'out/**/*',
      'build/**/*',
      'dist/**/*',
      'coverage/**/*',
      'node_modules/**/*',
    ],
  },

  // Configuration de base Next.js (garde la compatibilité)
  ...compat.extends('next/core-web-vitals', 'next/typescript'),

  // Configuration Prettier (désactive les conflits de formatage)
  ...compat.extends('eslint-config-prettier'),

  // Nos règles strictes personnalisées
  {
    files: ['**/*.{js,ts,tsx}'],
    rules: {
      // TypeScript strict
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-as-const': 'error',

      // Qualité de code - console.log autorisé en développement
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // React/Next.js
      'react/jsx-key': 'error',
      'react/jsx-no-target-blank': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Accessibilité de base
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/anchor-is-valid': 'error',
    },
  },

  // Configuration spéciale pour les pages de démo/développement
  {
    files: [
      '**/button-demo/**/*.{ts,tsx}',
      '**/demo/**/*.{ts,tsx}',
      '**/dev/**/*.{ts,tsx}',
    ],
    rules: {
      'no-console': 'off', // Console.log autorisé dans les pages de démo
      'no-alert': 'off', // Alert autorisé pour les demos
    },
  },

  // Configuration spéciale pour les tests
  {
    files: ['**/*.{test,spec}.{ts,tsx}'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'no-console': 'off',
    },
  },
];

export default eslintConfig;
