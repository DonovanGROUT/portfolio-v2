# Documentation Technique - Portfolio Donovan GROUT

## 📋 Vue d'ensemble du projet

### Objectifs

Refonte complète du portfolio avec approche TDD, intégration CI/CD, et respect des meilleures pratiques :

- **Accessibilité** (WCAG)
- **Éco-conception**
- **Sécurité** (XSS, CSRF, CSP)
- **SEO optimisé**
- **RGPD compliant**
- **Performance** (Core Web Vitals)

### Stack technique choisie

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript (strict mode)
- **Styling** : Tailwind CSS 4
- **Testing** : Vitest + Testing Library (TDD)
- **CI/CD** : GitHub Actions + Vercel
- **Qualité** : ESLint + Prettier + Husky

### Architecture Git

```bash
main (production)
└── develop (intégration)
    ├── feature/setup-environment
    ├── feature/design-system
    ├── feature/content-sections
    └── feature/performance-seo
```

## 🔧 Phase 1 : Configuration de l'environnement

### Étape 1.1 : Audit de la configuration actuelle

**Date** : 09/06/2025

**Constat initial** :

- ✅ Next.js 15.3.3 avec TypeScript
- ✅ Tailwind CSS 4 configuré
- ⚠️ Fichiers `.mjs` pour ESLint et PostCSS (incohérent avec approche TypeScript)
- ⚠️ Configuration minimale (pas de tests, linting basique)

**Décisions prises** :

1. ✅ Convertir `postcss.config.mjs` → `postcss.config.ts` (simple et bénéfique)
2. ⚠️ Garder `eslint.config.mjs` temporairement (éviter complications ESLint 9)
3. ✅ Activer TypeScript strict mode complet (aide TDD + Clean Code)
4. ✅ Setup Vitest + Testing Library (TDD-friendly, plus rapide que Jest)
5. ✅ Configuration CI/CD GitHub Actions

### Étape 1.2 : Stratégie de conversion des fichiers de configuration

**Objectif** : Standardiser progressivement sur TypeScript

**Approche hybride choisie** :

- ✅ `postcss.config.mjs` → `postcss.config.ts` (simple, bénéfique)
- ⚠️ `eslint.config.mjs` reste en .mjs temporairement

**Justification** :

- **PostCSS** : Configuration simple, conversion sans risque
- **ESLint** : FlatConfig + TypeScript peut créer des problèmes de résolution de modules
- **Cohérence** : On garde la cohérence TypeScript pour les configs simples

### Étape 1.3 : Configuration TypeScript strict mode

**Règles strictes activées pour le TDD** :

```typescript
{
  "strict": true,                        // Déjà activé
  "noUncheckedIndexedAccess": true,     // Force tests cas undefined
  "exactOptionalPropertyTypes": true,   // Props optionnelles strictes  
  "noImplicitReturns": true,           // Return explicites
  "noFallthroughCasesInSwitch": true   // Switch exhaustifs
}
```

**Justification TDD** : Ces règles nous guident vers un code plus robuste et testable.

### Étape 1.4 : Setup environnement de test (Vitest)

**Choix technique** : Vitest + Testing Library + jsdom

**Note importante** : Next.js utilise Webpack/Turbopack, pas Vite. Vitest fonctionne en parallèle avec sa propre configuration pour les tests.

---

## 📝 Journal des modifications

### 09/06/2025 - Initialisation

- Création de la documentation technique
- Analyse de l'existant
- Définition du plan d'action

---

## 🎯 Prochaines étapes

1. [ ] Conversion configurations .mjs → .ts
2. [ ] Setup environnement de test (Vitest)
3. [ ] Configuration ESLint strict + Prettier
4. [ ] Setup Husky pour les hooks Git
5. [ ] Configuration GitHub Actions CI/CD
