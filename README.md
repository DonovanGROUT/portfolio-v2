# Portfolio Donovan GROUT

<!-- DEPLOY-LINK-START -->

🌐 **Production**: [donovan-grout.com](https://donovan-grout.com)
🎯 **Status**: ✅ Pipeline CI/CD opérationnel - Portfolio en cours de développement TDD

<!-- DEPLOY-LINK-END -->

Refonte complète de mon portfolio avec une approche moderne, TDD-driven et avec un pipeline CI/CD.

> **🏆 Statut actuel** : **Design System — TERMINÉ ✅**. Actuellement : **Phase 4 — Hero Component TERMINÉ (1/6) — EN COURS (branche: feature/content-sections)**.

## 🎯 Phase 4 - Contenu & Sections - EN COURS (16.67%)

**Objectif**: Intégrer les sections principales du portfolio (Hero, Compétences, Timeline, Projets, Recommandations, Contact) en s'appuyant sur le Design System existant et en respectant la méthodologie TDD.
**Branche de travail**: `feature/content-sections`

### ✅ Hero Component - TERMINÉ (05 novembre 2025)

#### ✅ Hero Component - SUCCÈS TOTAL

- **Tests** : 26 tests (100% statements, 96% branches, 71.42% fonctions, 100% lignes)
- **Performance** : <100ms, bundle optimisé
- **Accessibilité** : WCAG 2.1 AA, score Lighthouse 100/100
- **Sécurité** : XSS protection, validation URL
- **Responsive** : Mobile-first, desktop optimisé
- **Charte** : "Tech & Nature" (gradient bleu océan, vert éco)
- **Scripts DevTools** : HERO_TEST_SCRIPT.js, ARIA_TEST_SCRIPT.js, ANIMATION_TEST_SCRIPT.js
- **Checklist** : [HERO_TESTING_CHECKLIST.md](docs/guides/HERO_TESTING_CHECKLIST.md)

### ⏳ Composants à développer

- ⏳ **Skills**: Technologies par catégories
- ⏳ **Timeline**: Formation + Expérience
- ⏳ **ProjectCard**: Projets enrichis
- ⏳ **Testimonial**: Recommandations
- ⏳ **Footer**: Pied de page

### ⏳ Pages à intégrer

- ⏳ **Accueil (/)**: Hero + Skills + Projets + Testimonials
- ⏳ **À propos (/about)**: Présentation + Timeline
- ⏳ **Projets (/projects)**: Grille ProjectCards
- ⏳ **Contact (/contact)**: Formulaire

**Livrables**:

- **Composants** : Hero ✅, Skills, Timeline (Formation/Expérience), ProjectCard, Testimonial, Footer
- **Pages** : Accueil (hero + featured), À propos (présentation + timeline), Projets (grille projets), Contact (formulaire)

### 📊 Métriques Phase 4 (Hero inclus)

- **Hero** : 26 tests, 100% coverage, 100/100 accessibilité, <100ms, XSS, responsive

## 🎯 Phase 3 - Design System TDD - TERMINÉE ✅

**Date de début**: 12 juin 2025
**Date de fin**: 8 août 2025
**Statut**: ✅ 100% TERMINÉ - Tous composants validés
**Méthode**: TDD strict (Red → Green → Refactor)
**Commits documentés**: Phase 3 complètement tracée dans TECHNICAL_DOCUMENTATION.md

### 🏆 Composants Terminés (7/7) ✅

#### ✅ **Button Component** - SUCCÈS TOTAL

- **Tests**: 26 tests (94.28% statements, 89.28% branches, 100% functions, 94.28% lines)
- **WCAG**: Score 100/100, touch targets 44px+
- **Performance**: 533ms, bundle optimisé
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 98/100

#### ✅ **Typography Component** - SUCCÈS TOTAL

- **Tests**: 17 tests (100% statements, branches, functions, lines)
- **WCAG**: Score 100/100, semantic HTML, ARIA
- **Performance**: 216ms, bundle optimisé
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 98/100

#### ✅ **Card Component** - SUCCÈS TOTAL

- **Tests**: 34 tests (98.07% statements, 95.83% branches, 100% functions, 98.07% lines)
- **WCAG**: Score 100/100, états accessibles
- **Performance**: 568ms, bundle optimisé
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 94/100

#### ✅ **Navigation Component** - SUCCÈS TOTAL

- **Tests**: 39 tests (100% statements, branches, functions, lines)
- **WCAG**: Score 100/100, ARIA compliant, nav landmark
- **Performance**: 907ms, responsive optimisé
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 95/100

#### ✅ **Modal Component** - SUCCÈS TOTAL

- **Tests**: 29 tests (96.62% statements, 91.8% branches, 100% functions, 96.62% lines)
- **WCAG**: Score 100/100, ARIA, focus trap, restoration
- **Performance**: 961ms, accessibility optimisé
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 95/100

#### ✅ **Form Component** - SUCCÈS TOTAL

- **Tests**: 47 tests (96.15% statements, 92.94% branches, 100% functions, 96.15% lines)
- **WCAG**: Score 100/100, validation accessible
- **Performance**: 1818ms, fonctionnalité complète
- **Sécurité**: XSS protection, validation sécurisée
- **RGPD**: Intégration PrivacyNotice complète

#### ✅ **PrivacyNotice Component** - SUCCÈS TOTAL

- **Tests**: 11 tests (100% statements, branches, functions, lines)
- **WCAG**: Score 100/100, RGPD compliant
- **Performance**: 664ms, expansion optimisée
- **Sécurité**: RGPD/GDPR conforme
- **Legal**: Droits utilisateurs intégrés

### 📊 Métriques Finales Phase 3

- **Couverture globale**: **97.82%** statements ✅
- **Tests totaux**: **232 tests** sur 10 fichiers ✅
- **Performance**: Tous composants optimisés ✅
- **Quality**: 0 warning/error ✅
- **Standards**: WCAG 2.1 AA + RGPD/GDPR ✅

## ✅ Phase 2 CI/CD - TERMINÉE

**Date de completion**: 11 juin 2025
**Statut**: ✅ TERMINÉE
**Déploiement production**: ✅ OPÉRATIONNEL

### 🚀 Pipeline CI/CD Opérationnel

- ✅ **CI Pipeline**: 4 jobs (Quality, Security, Performance, Summary)
- ✅ **Quality Gates**: 145/145 tests + ESLint + Prettier + TypeScript
- ✅ **Déploiement**: Vercel automatisé avec preview branches
- ✅ **Performance**: Lighthouse CI + Core Web Vitals monitoring
- ✅ **Sécurité**: Audit automatisé des vulnérabilités critiques
- ✅ **GitFlow**: Workflow professionnel (feature → develop → main)

### 🌐 Architecture Déploiement

- **Production**: Vercel optimisé Next.js avec domaine personnalisé
- **Preview**: Déploiements automatiques sur PR
- **Monitoring**: Analytics et performance tracking
- **DNS**: Configuration hybride Vercel + domaine personnalisé

## 🚧 Phase 4 - Développement Contenu - EN COURS

**Date de début**: 31 octobre 2025
**Statut**: 🚧 EN COURS
**Méthode**: TDD strict (Red → Green → Refactor)
**Branche**: feature/content-sections

### 🎯 Objectif Phase 4

Développement des composants de contenu et intégration dans les pages du portfolio pour créer un site production-ready complet.

### 📋 Composants à développer

- ✅ **Hero Component - TERMINÉ** - Section d'accueil avec présentation (21 tests, 100% coverage)
- ⏳ **Skills Component** - Affichage des compétences par catégories
- ⏳ **Timeline Component** - Chronologie Formation/Expérience
- ⏳ **ProjectCard Component** - Cartes de projets enrichies
- ⏳ **Testimonial Component** - Recommandations professionnelles
- ⏳ **Footer Component** - Pied de page avec liens

### 📄 Pages à intégrer

- ⏳ **Page d'accueil (/)** - Hero + Skills + Projets featured + Testimonials
- ⏳ **Page À propos (/about)** - Présentation + Timeline Formation/Expérience
- ⏳ **Page Projets (/projects)** - Grille de ProjectCards
- ⏳ **Page Contact (/contact)** - Formulaire de contact (composant Form existant)

### 🎯 Standards Phase 4

- **TDD strict**: Red → Green → Refactor pour chaque composant
- **Coverage**: > 95% sur tous les nouveaux composants
- **WCAG 2.1 AA**: Lighthouse Accessibility 100/100
- **Performance**: Lighthouse Performance > 90
- **SEO**: Meta tags + Open Graph + Sitemap

**Durée estimée**: 4-6 semaines

## 🎯 Objectifs

- **Accessibilité** (WCAG 2.1 AA)
- **Éco-conception** (Green IT)
- **Sécurité** (XSS/CSRF/CSP)
- **Performance** (Core Web Vitals)
- **SEO optimisé**
- **RGPD compliant**

## 🛠️ Stack Technique

- **Framework** : Next.js 15 (App Router)
- **Langage** : TypeScript (strict mode)
- **Styling** : Tailwind CSS 3
- **Testing** : Vitest + Testing Library
- **CI/CD** : GitHub Actions + Vercel
- **Qualité** : ESLint + Prettier + Husky

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm 9+

### Installation

```bash
# Cloner le projet
git clone https://github.com/DonovanGROUT/portfolio-v2.git
cd portfolio-v2

# Installer les dépendances
npm install

# Configurer les hooks Git
npm run prepare
```

### Développement

```bash
# Démarrer le serveur de développement
npm run dev

# Lancer les tests en mode watch
npm run test

# Vérifier la qualité du code
npm run check

# Corriger automatiquement le formatage
npm run lint:fix
```

## 🧪 Tests & Qualité

### Commandes de Test

```bash
npm run test           # Tests en mode watch
npm run test:run       # Tests une seule fois
npm run test:coverage  # Rapport de couverture
```

### Hooks Git Automatiques

- **pre-commit** : Format + Lint + Tests
- **pre-push** : Vérifications complètes + Coverage

### Standards

- ✅ **Coverage** : 98.24% statements, 96.45% branches, 100% functions, 98.24% lines
- ✅ **Linting** : Zero warnings/errors
- ✅ **Format** : Prettier strict
- ✅ **Types** : TypeScript strict mode

## 📁 Structure du Projet

```bash
src/
├── app/                     # Pages Next.js (App Router)
│   ├── button-demo/         # Démo composant Button
│   ├── card-demo/           # Démo composant Card
│   ├── typography-demo/     # Démo composant Typography
│   ├── navigation-demo/     # Démo composant Navigation
│   ├── modal-demo/          # Démo composant Modal
│   ├── form-demo/           # Démo composant Form
│   └── privacy-notice-demo/ # Démo composant PrivacyNotice
├── components/              # Composants réutilisables
│   └── design-system/       # Design System (Button, Typography, Card, Navigation, Modal)
├── lib/                     # Utilitaires et configurations
│   ├── colors.ts (et colors.test.ts)            # Système de couleurs unifié
│   └── utils.ts (et utils.test.ts)             # Fonctions utilitaires
└── test/                    # Configuration et utilitaires de test (setup.ts et utils.tsx)

docs/                        # Documentation technique complète
├── core/                    # Documentation technique centrale
│   └── TECHNICAL_DOCUMENTATION.md
├── design/                  # Charte graphique et design
│   └── CHARTE_GRAPHIQUE.md
├── guides/                  # Guides détaillés par composant
│   ├── ADVANCED_TESTING_GUIDE.md
│   ├── BUTTON_TESTING_CHECKLIST.md
│   ├── CARD_TESTING_CHECKLIST.md
│   ├── FORM_TESTING_CHECKLIST.md
│   ├── NAVIGATION_TESTING_CHECKLIST.md
│   ├── MODAL_TESTING_CHECKLIST.md
│   ├── PRIVACYNOTICE_TESTING_CHECKLIST.md
│   └── TYPOGRAPHY_TESTING_CHECKLIST.md
├── phases/                  # Documentation phases du projet
│   ├── PHASE_1_TDD_SETUP.md
│   ├── PHASE_2_CI_CD_SETUP.md
│   └── PHASE_3_TDD_DEVELOPMENT.md
├── reference/               # Références et contenus
│   ├── GLOSSARY.md
│   └── PORTFOLIO_CONTENT_STRUCTURE.md
├── scripts/                 # Scripts de test et validation
    ├── ANIMATION_TEST_SCRIPT.js
    ├── ARIA_TEST_SCRIPT.js
    ├── BUTTON_TEST_SCRIPT.js
    ├── CARD_TEST_SCRIPT.js
    ├── FORM_TEST_SCRIPT.js
    ├── MODAL_TEST_SCRIPT.js
    ├── NAVIGATION_TEST_SCRIPT.js
    ├── PRIVACYNOTICE_TEST_SCRIPT.js
    └── TYPOGRAPHY_TEST_SCRIPT.js

└── templates/               # Templates réutilisables
    └── DOMAIN_DNS_SETUP_TEMPLATE.md
    └── TDD_TEMPLATE_REUSABLE.md
```

## 📚 Documentation (liens rapides)

- [📋 Documentation Technique](docs/core/TECHNICAL_DOCUMENTATION.md)
- [🎨 Charte Graphique](docs/design/CHARTE_GRAPHIQUE.md)
- [🧪 Configuration TDD](docs/phases/PHASE_1_TDD_SETUP.md)
- [🚀 Pipeline CI/CD](docs/phases/PHASE_2_CI_CD_SETUP.md)
- [🔴🟢🔵 Phase 3 TDD](docs/phases/PHASE_3_TDD_DEVELOPMENT.md)
- [📖 Glossaire](docs/reference/GLOSSARY.md)

### Workflow GitFlow

```bash
main          # Production
└── develop   # Intégration
    ├── feature/setup-environment      # ✅ Terminé - Phase 1
    ├── feature/ci-cd-pipeline        # ✅ Terminé - Phase 2
    ├── feature/portfolio-components  # ✅ Terminé - Phase 3
    └── feature/content-sections      # 🚧 En cours - Phase 4
```

### Standards de Commit

Format : `type: description`

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `test:` - Tests
- `config:` - Configuration

## 🌐 Déploiement

- **Production** : [donovan-grout.com](https://donovan-grout.com) (Vercel optimisé)
- **Preview** : Déploiements automatiques sur chaque PR
- **CI/CD** : GitHub Actions → Déploiement automatique
- **Monitoring** : Lighthouse CI + Vercel Analytics

---

_Développé par [Donovan GROUT](https://github.com/DonovanGROUT)_
