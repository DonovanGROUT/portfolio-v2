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
- **CI/CD** : GitHub Actions + Vercel (configuration hybride)
- **Qualité** : ESLint + Prettier + Husky

### Architecture Git

```bash
main (production) ← Renommé de master
└── develop (intégration - branche par défaut)
    ├── feature/setup-environment
    ├── feature/design-system
    ├── feature/content-sections
    └── feature/performance-seo
```

## 🔧 Phase 1 : Configuration de l'environnement

### ✅ Étape 1.1 : Audit de la configuration actuelle - TERMINÉ

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

### 10/06/2025 - Configuration environnement de test et qualité code

**Phase Setup TDD terminée** :

**Commit TDD** : `d9aece9` - Setup environnement Vitest + Testing Library

- ✅ Configuration Vitest avec jsdom
- ✅ Mocks browser APIs (IntersectionObserver, ResizeObserver, matchMedia)
- ✅ Utilitaires de test personnalisés
- ✅ Premier test Home Page (5 tests passants)
- ✅ Couverture code 80% minimum
- ✅ Documentation complète environnement test

**Commit ESLint** : `9725aa5` - Configuration ESLint strict TypeScript + Prettier

- ✅ Conversion `eslint.config.mjs` → `eslint.config.ts`
- ✅ Règles strictes TypeScript + React + Accessibilité
- ✅ Intégration Prettier sans conflit
- ✅ Scripts npm : `lint:fix`, `lint:strict`, `check`
- ✅ Configuration spéciale pour tests

**Commit Tests** : `6a0b44e` - test: optimize coverage with 12 tests + config exclusions

- ✅ Optimisation tests : de 5 à 12 tests complets
- ✅ Configuration Vitest : exclusions intelligentes pour config files
- ✅ Package.json : ajout script `test:coverage:strict`
- ✅ Coverage améliorée : tests des mocks et utilitaires
- ✅ Tests robustes : matchMedia, IntersectionObserver, render custom

**Commit Husky** : `3feff41` - feat: configure Husky with pre-commit and pre-push quality gates

- ✅ Installation et configuration Husky
- ✅ Hook pre-commit : `npm run check` automatique
- ✅ Hook pre-push : vérifications complètes + couverture
- ✅ Sécurité qualité : impossible commit/push sans tests
- ✅ Scripts package.json : `prepare` hook automatique

**Commit Documentation** : `183354e` - docs: update technical documentation with completed setup phase

- ✅ Documentation technique mise à jour avec état complet Phase 1
- ✅ Journal des modifications avec tous les commits
- ✅ État final branche feature/setup-environment
- ✅ Préparation pour prochaine phase CI/CD

**Commit Procédures** : `9220192` - docs: add comprehensive code verification procedures and technical glossary

- ✅ Documentation complète workflow vérification code
- ✅ Glossaire technique 60+ termes TDD/Testing
- ✅ Standards qualité zero-warning définis
- ✅ Intégration VS Code documentée

**Commit Husky** : `3feff41` - Configuration hooks Git automatiques

- ✅ Installation et configuration Husky
- ✅ Hook pre-commit : `npm run check` automatique
- ✅ Hook pre-push : vérifications complètes + couverture
- ✅ Sécurité qualité : impossible commit/push sans tests
- ✅ Scripts package.json : `prepare` hook automatique

**État actuel branche `feature/setup-environment`** :

- 🎯 **Tests** : 12/12 passants, environnement TDD complet optimisé
- 🎯 **ESLint** : Configuration stricte, zéro warning
- 🎯 **Prettier** : 100% fichiers conformes
- 🎯 **TypeScript** : Mode strict activé
- 🎯 **Husky** : Hooks Git automatiques configurés et testés
- 🎯 **Coverage** : Configuration optimisée avec exclusions intelligentes
- 🎯 **Documentation** : Complète et à jour

---

**Commit initial** : `63ff92e` - Documentation technique complète

**GitFlow Setup** :

- ✅ Branche `master` → `main` renommée
- ✅ Branche `develop` créée (intégration)
- ✅ Feature `feature/setup-environment` créée
- ✅ **NOUVEAU** : Dépôt GitHub `portfolio-v2` connecté
- 🚧 **EN COURS** : Configuration de l'environnement de développement

**Actions terminées** :

- ✅ **TERMINÉ** : Conversion PostCSS en TypeScript (commit: `d3f914e`)
- ✅ **TERMINÉ** : Configuration Prettier + EditorConfig (commit: `311c3aa`)
- ✅ **TERMINÉ** : TypeScript strict mode activé (commit: `f542767`)
- ✅ **TERMINÉ** : Configuration Prettier intelligente (commit: `32a164f`)
- ✅ **TERMINÉ** : Setup environnement de test Vitest (commit: `d9aece9`)
- ✅ **TERMINÉ** : Configuration ESLint strict + Prettier (commit: `9725aa5`)
- ✅ **TERMINÉ** : Documentation procédures de vérification (commit: `9220192`)
- ✅ **TERMINÉ** : Documentation technique mise à jour (commit: `183354e`)
- ✅ **TERMINÉ** : Configuration Husky avec hooks Git (commit: `3feff41`)
- ✅ **TERMINÉ** : Tests optimisés 12 tests + config exclusions (commit: `6a0b44e`)

### Phase 1 Setup Environnement : TERMINÉE ✅

**Résumé réalisations** :

- ✅ **Configuration complète TDD** : TypeScript strict + Vitest + Testing Library
- ✅ **Qualité code automatisée** : ESLint strict + Prettier + Husky hooks
- ✅ **Tests robustes** : 12 tests avec mocks browser APIs complets
- ✅ **Documentation technique** : Workflow complet + Glossaire 60+ termes
- ✅ **Standards zéro-warning** : Impossible de commit/push sans tests

**Prochaine étape** :

- 🚧 **EN COURS** : Configuration GitHub Actions CI/CD

---

## 🚀 Phase 2 : Configuration CI/CD Pipeline

### Étape 2.1 : Architecture du pipeline automatisé

**Date** : 10/06/2025

**Objectifs** :

- ✅ Automatisation complète des tests et vérifications qualité
- ✅ Déploiement automatique avec previews sur PR
- ✅ Monitoring de performance (Lighthouse)
- ✅ Audit de sécurité automatisé
- ✅ Tests multi-plateforme (Ubuntu, Windows, macOS)

**Stack CI/CD choisie** :

- **GitHub Actions** : Pipeline principal (CI/CD)
- **Vercel** : Déploiement optimisé Next.js avec preview branches
- **PlanetHoster** : Redirection domaine personnalisé (donovan-grout.com)
- **Lighthouse CI** : Tests de performance automatisés
- **audit-ci** : Audit de sécurité des dépendances

### Étape 2.2 : Pipeline CI (Intégration Continue)

**Workflow** : `.github/workflows/ci.yml`

**Déclencheurs** :

- Push sur `main` et `develop`
- Pull Requests vers `main` et `develop`
- Déclenchement manuel (`workflow_dispatch`)

**Jobs configurés** :

#### 1. **Quality Job** 🧪

- **Formatage** : Vérification Prettier strict
- **Linting** : ESLint avec zéro warning
- **Build** : Compilation TypeScript + Next.js
- **Tests** : Exécution complète avec couverture
- **Coverage** : Upload automatique vers couverture locale

#### 2. **Build Matrix** 🏗️

- **OS** : Ubuntu, Windows, macOS
- **Node.js** : v18.x, v20.x
- **Compatibilité** : Tests sur 6 environnements différents

#### 3. **Security Audit** 🔒

- **npm audit** : Vulnérabilités modérées+
- **audit-ci** : Audit automatisé des dépendances
- **Fail-fast** : Bloque si vulnérabilités critiques

#### 4. **Lighthouse Performance** 🚦

- **Performance** : Score minimum 90%
- **Accessibilité** : Score minimum 95%
- **SEO** : Score minimum 90%
- **Best Practices** : Score minimum 90%
- **PWA** : Score minimum 80% (warning)

### Étape 2.3 : Pipeline CD (Déploiement Continu)

**Workflow** : `.github/workflows/deploy.yml`

#### **Quality Gate** 🚨

- Validation complète avant tout déploiement
- Bloque si tests/qualité échouent

#### **Deploy Production** 🌟 (sur main)

- Build automatique Next.js
- Déploiement optimisé sur Vercel
- Preview branches automatiques sur PR
- Redirection domaine personnalisé via PlanetHoster

### Étape 2.4 : Configuration Lighthouse

**Fichier** : `.lighthouserc.json`

**Standards définis** :

- **Performance** : 90%+ (warning si échec)
- **Accessibilité** : 95%+ (erreur si échec)
- **SEO** : 90%+ (erreur si échec)
- **Best Practices** : 90%+ (erreur si échec)
- **PWA** : 80%+ (warning si échec)

**Tests** :

- 3 runs par URL pour moyenne fiable
- Preset desktop pour cohérence
- Flags Chrome pour environnement CI

---

## 🚀 Phase 2 : Configuration CI/CD Pipeline (TERMINÉE)

**Période** : 10/06/2025 - 11/06/2025 (TERMINÉE)

**Objectif** : Mise en place pipeline CI/CD complet avec GitHub Actions et déploiement hybride Vercel + domaine personnalisé

### Étape 2.1 : Architecture Pipeline CI/CD

**Pipeline d'Intégration Continue (.github/workflows/ci.yml)** :

1. **Job Quality** (Ubuntu) :

   - ✅ Vérification formatage Prettier
   - ✅ Linting ESLint strict
   - ✅ Build production Next.js
   - ✅ Tests Vitest avec coverage
   - ✅ Upload métriques coverage local

2. **Job Build Matrix** (Multi-OS/Multi-Node) :

   - ✅ Test Ubuntu/Windows/macOS
   - ✅ Test Node.js 18.x/20.x
   - ✅ Validation compatibilité cross-platform

3. **Job Security Audit** :

   - ✅ npm audit (vulnérabilités dépendances)
   - ✅ audit-ci avec seuils automatiques
   - ✅ Scanning sécurité avancé

4. **Job Performance** (Lighthouse) :
   - ✅ Audit performance ≥ 90%
   - ✅ Audit accessibilité ≥ 95%
   - ✅ Audit SEO ≥ 90%
   - ✅ Audit bonnes pratiques ≥ 90%

**Pipeline de Déploiement Continu (.github/workflows/deploy.yml)** :

1. **Quality Gate** : Prérequis qualité avant déploiement
2. **Deploy Production** : Déploiement automatique vers Vercel avec domaine personnalisé

### Étape 2.2 : Configuration Lighthouse CI

**Métriques surveillées** (.lighthouserc.json) :

- Performance : ≥ 90% (warn)
- Accessibilité : ≥ 95% (error - bloque CI)
- Best Practices : ≥ 90% (error - bloque CI)
- SEO : ≥ 90% (error - bloque CI)
- PWA : ≥ 80% (warn)

**Configuration avancée** :

- 3 runs pour moyenne fiable
- Preset desktop
- Flags Chrome optimisés pour CI
- Upload temporary-public-storage

### Étape 2.3 : Scripts NPM et Dépendances CI

**Nouveaux scripts package.json** :

```json
{
  "check": "npm run format:check && npm run lint:strict && npm run build && npm run test:run",
  "lighthouse": "lhci autorun",
  "audit:security": "audit-ci --config audit-ci.json"
}
```

**Dépendances CI ajoutées** :

- `@lhci/cli` : Lighthouse CI automation
- `audit-ci` : Audit sécurité automatisé
- `wait-on` : Attente serveur pour tests E2E

### Étape 2.4 : Documentation CI/CD Complète

**Guides créés** :

1. `docs/CI_CD_README.md` : Guide principal CI/CD simplifié
2. `docs/PHASE_2_FINALIZATION_REPORT.md` : Rapport de finalisation
3. `docs/FINAL_ACTIONS_GUIDE.md` : Guide des actions de déploiement
4. Mise à jour `docs/GLOSSARY.md` : +20 termes CI/CD

**Documentation technique** :

- Workflows GitHub Actions commentés
- Secrets et variables d'environnement
- Troubleshooting et debugging
- Métriques et monitoring
- Optimisations futures

### Étape 2.5 : Configuration Domaine Personnalisé avec Vercel

**Architecture de déploiement optimisée** :

```bash
🌍 donovan-grout.com (domaine principal)
├── DNS A Record → Vercel Edge Network
├── SSL automatique Let's Encrypt
└── CDN mondial Vercel

🚀 Vercel (hébergement optimisé)
├── Production: main branch → donovan-grout.com
├── Preview: PR branches → deploy-preview-xyz.vercel.app
└── Analytics: Core Web Vitals automatiques
```

**Configuration DNS PlanetHoster** :

```dns
# Enregistrements DNS requis
@ A [IP-Vercel-fournie]
www CNAME cname.vercel-dns.com
```

**Secrets GitHub configurés** :

- `VERCEL_TOKEN` - Token d'authentification Vercel
- `VERCEL_ORG_ID` - ID organisation Vercel
- `VERCEL_PROJECT_ID` - ID projet Vercel

**Guide détaillé** : `docs/PLANETHOSTER_DNS_SETUP.md`

### Étape 2.6 : Historique détaillé des commits Phase 2

**Commits de configuration infrastructure CI/CD** :

#### `e902bd6` - feat: add GitHub Actions CI/CD pipeline with Lighthouse

**Date** : 10/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `.github/workflows/ci.yml` (174 lignes) - Pipeline CI complet 4 jobs
- ✅ `.github/workflows/deploy.yml` (81 lignes) - Pipeline CD Vercel
- ✅ `.lighthouserc.json` (24 lignes) - Configuration Lighthouse
- ✅ `vercel.json` (9 lignes) - Configuration Next.js optimisée

**Description** : Création infrastructure CI/CD complète avec GitHub Actions, incluant jobs qualité, sécurité, performance et déploiement automatique Vercel.

#### `04e294c` - deps: add CI/CD dependencies

**Date** : 10/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `package.json` - Ajout dépendances CI/CD

**Dépendances ajoutées** :

- `@lhci/cli@^0.14.0` - Lighthouse CI automation
- `audit-ci@^7.1.0` - Audit sécurité automatisé
- `wait-on@^8.0.1` - Attente serveur pour tests

**Scripts ajoutés** :

- `check` - Validation complète (format + lint + build + test)
- `lighthouse` - Audit Lighthouse local
- `audit:security` - Audit sécurité avec seuils

#### `c3f54f9` - docs: restructure documentation into logical phases

**Date** : 10/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `docs/PHASE_1_TDD_SETUP.md` (154 lignes) - Guide Phase 1 structuré
- ✅ `docs/PHASE_2_CI_CD_SETUP.md` (200+ lignes) - Guide Phase 2 CI/CD
- ✅ `docs/GLOSSARY.md` (350+ lignes) - Glossaire enrichi (+20 termes CI/CD)
- ✅ Migration `TECHNICAL_DOCUMENTATION.md` → `docs/`

**Description** : Restructuration complète documentation en phases logiques avec guides détaillés pour chaque étape du développement.

#### `0ef30eb` - feat: enhance code documentation and finalize Vercel deployment

**Date** : 10/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `src/app/page.tsx` - Commentaires français complets
- ✅ `src/app/layout.tsx` - Documentation metadata et structure
- ✅ `src/test/utils.tsx` - Commentaires utilitaires test français
- ✅ `vitest.config.ts` - Configuration commentée français
- ✅ `next.config.ts` - Configuration Next.js documentée

**Description** : Finalisation documentation code source avec commentaires français exhaustifs et préparation déploiement Vercel.

#### `a4a34ad` - docs: update technical documentation to reflect Vercel hybrid deployment

**Date** : 10/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `docs/TECHNICAL_DOCUMENTATION.md` - Mise à jour architecture hybride
- ✅ `README.md` - Correction approche déploiement Vercel

**Description** : Mise à jour documentation technique pour refléter l'architecture hybride Vercel + domaine personnalisé au lieu de l'approche SSH/SFTP initiale.

#### `02eebfe` - fix(ci): update deprecated upload-artifact action from v3 to v4

**Date** : 11/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `.github/workflows/ci.yml` - Correction action dépréciée

**Description** : Correction action GitHub Actions `upload-artifact` de v3 vers v4 pour compatibilité et sécurité.

#### `896f840` - fix(ci): resolve Lighthouse artifact upload issue

**Date** : 11/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `.github/workflows/ci.yml` - Configuration Lighthouse
- ✅ Résolution `uploadArtifacts: false` pour éviter erreurs naming

**Description** : Résolution problème upload artifacts Lighthouse CI avec configuration `uploadArtifacts: false` et `temporaryPublicStorage: true`.

#### `1cb7db5` - Merge pull request #3 from DonovanGROUT/feature/ci-cd-pipeline

**Date** : 11/06/2025  
**Auteur** : Donovan GROUT  
**Description** : Merge complet feature branch CI/CD vers develop avec validation pipeline.

#### `62edebd` - fix(vercel): remove deprecated name property

**Date** : 11/06/2025  
**Auteur** : Donovan GROUT  
**Fichiers modifiés** :

- ✅ `vercel.json` - Suppression propriété `name` dépréciée

**Description** : Correction warning Vercel par suppression propriété `name` dépréciée dans configuration.

#### `154643a` - Merge pull request #4 from DonovanGROUT/develop (PRODUCTION)

**Date** : 11/06/2025  
**Auteur** : Donovan GROUT  
**Description** : **DÉPLOIEMENT PRODUCTION** - Merge develop vers main déclenchant pipeline CD complet et déploiement Vercel production.

### Étape 2.7 : Résultats et Métriques Finales

**Pipeline CI validé** :

- ✅ 4 jobs exécutés avec succès (Quality, Security, Performance, Summary)
- ✅ Tests : 12/12 passent (100% coverage)
- ✅ Sécurité : 0 vulnérabilité critique/importante
- ✅ Performance : Lighthouse opérationnel (warning PWA attendu)
- ✅ Build : Next.js compilation < 5s

**Pipeline CD opérationnel** :

- ✅ Preview deployments automatiques sur PR
- ✅ Production deployment sur merge vers main
- ✅ URL production : `portfolio-v2-eight-tan.vercel.app`
- ✅ Monitoring Core Web Vitals activé

---

## 🎯 État d'avancement du projet

### ✅ Phase 1 : Configuration environnement - TERMINÉE

1. [x] Conversion configurations .mjs → .ts
2. [x] Setup environnement de test (Vitest)
3. [x] Configuration ESLint strict + Prettier
4. [x] Setup Husky pour les hooks Git

### ✅ Phase 2 : Pipeline CI/CD - TERMINÉE

1. [x] Configuration GitHub Actions CI/CD
2. [x] Pipeline de déploiement Vercel
3. [x] Tests de performance Lighthouse
4. [x] Audit de sécurité automatisé
5. [x] Documentation complète CI/CD

### 🚧 Phase 3 : Développement TDD - PROCHAINE

1. [ ] Tests composants avancés (React Testing Library)
2. [ ] Tests E2E (Playwright)
3. [ ] Développement guidé par les tests
4. [ ] Fonctionnalités portfolio principales

---

## 📊 Statut Final Phase 2

**Date de completion** : 11/06/2025  
**Durée totale** : 2 jours de développement  
**État** : 🎯 **SUCCÈS COMPLET - DÉPLOYÉ EN PRODUCTION**

### Métriques finales

- **Tests** : 12/12 passent (100%)
- **ESLint** : 0 warning, 0 erreur
- **Build** : ✅ Succès en <5s
- **Pipeline** : ✅ CI/CD opérationnel
- **Documentation** : ✅ 4 guides créés
- **Production** : ✅ Déployé sur Vercel

### Livrables validés

- ✅ `.github/workflows/ci.yml` - Pipeline CI 4 jobs (174 lignes)
- ✅ `.github/workflows/deploy.yml` - Déploiement Vercel (81 lignes)
- ✅ `.lighthouserc.json` - Configuration performance (24 lignes)
- ✅ `vercel.json` - Configuration Next.js optimisée (8 lignes)
- ✅ Configuration secrets Vercel + URL production active

### URLs de production

- **Production** : `donovan-grout.com` ✅ LIVE avec domaine personnalisé
- **Redirection automatique** : `www.donovan-grout.com` → `donovan-grout.com`
- **Preview branches** : Automatiques sur chaque PR
- **SSL** : ✅ Certificat HTTPS Let's Encrypt automatique

**🎉 La Phase 2 CI/CD hybride avec domaine personnalisé est maintenant entièrement terminée, documentée et déployée en production !**

### Étape 2.8 : Configuration Domaine Personnalisé Finalisée

**Date** : 11/06/2025  
**Status** : ✅ **DOMAINE CONFIGURÉ AVEC SUCCÈS**

**Configuration finale validée** :

- ✅ Configuration domaine personnalisé `donovan-grout.com` sur Vercel
- ✅ Configuration DNS automatique par Vercel (A Records + CNAME)
- ✅ Redirection www automatique : `www.donovan-grout.com` → `donovan-grout.com`
- ✅ Certificat SSL Let's Encrypt actif et renouvelé automatiquement
- ✅ CDN Vercel Edge Network mondial pour performance optimale

**Architecture de production finalisée** :

```bash
🌍 donovan-grout.com (domaine principal)
├── ✅ Portfolio TDD Next.js 15 (portfolio-v2)
├── ✅ SSL HTTPS automatique
├── ✅ CDN Edge Network mondial
└── ✅ www.donovan-grout.com → redirection automatique

🔄 Preview Environment
├── ✅ deploy-preview-[pr].vercel.app (branches PR)
└── ✅ Core Web Vitals monitoring actif
```
