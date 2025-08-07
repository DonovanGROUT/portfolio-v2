# Portfolio Donovan GROUT

<!-- DEPLOY-LINK-START -->

🌐 **Production**: [donovan-grout.com](https://donovan-grout.com)  
🎯 **Status**: ✅ Pipeline CI/CD opérationnel - Portfolio en cours de développement TDD

<!-- DEPLOY-LINK-END -->

Refonte complète de mon portfolio avec une approche moderne, TDD-driven et avec un pipeline CI/CD.

> **🏆 Statut actuel** : Design System en cours - Button ✅ Typography ✅ Card ✅ Navigation ✅ Modal ✅ (88% terminé, reste Form Controls) avec méthodologie TDD exemplaire (98.24% coverage globale).

## 🎯 Phase 3 - Design System TDD - EN COURS

**Date de début**: 12 juin 2025  
**Statut**: 🚧 88% TERMINÉ (Button ✅ Typography ✅ Card ✅ Navigation ✅ Modal ✅ - reste Form Controls)  
**Méthode**: TDD strict (Red → Green → Refactor)  
**Commits documentés**: Phase 3 complètement tracée dans TECHNICAL_DOCUMENTATION.md

### 🏆 Composants Terminés

#### ✅ **Button Component** - SUCCÈS TOTAL

- **Tests**: 26 tests (94.28% statements, 89.28% branches, 100% functions, 94.28% lines)
- **WCAG**: Score 100/100, touch targets 44px+
- **Performance**: 317ms, bundle 2.48kB
- **Optimisation**: Classes CSS statiques (cn() → concatenation directe)
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 98/100

#### ✅ **Typography Component** - SUCCÈS TOTAL

- **Tests**: 17 tests (100% statements, branches, functions, lines)
- **WCAG**: Score 100/100, semantic HTML, ARIA
- **Performance**: 164ms, bundle 135B
- **Optimisation**: Classes CSS statiques (cn() → concatenation directe)
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 98/100

#### ✅ **Card Component** - SUCCÈS TOTAL

- **Tests**: 34 tests (98.07% statements, 95.83% branches, 100% functions, 98.07% lines)
- **WCAG**: Score 100/100 - Animation pulse supprimée, états accessibles
- **Performance**: 421ms, bundle 2.86kB
- **Optimisation**: Classes CSS statiques (Record Lookups optimisés)
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 94/100

#### ✅ **Navigation Component** - SUCCÈS TOTAL

- **Tests**: 39 tests (100% statements, branches, functions, lines)
- **WCAG**: Score 100/100, ARIA compliant, nav landmark
- **Performance**: 625ms, bundle 6.57kB
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 95/100

#### ✅ **Modal Component** - SUCCÈS TOTAL

- **Tests**: 29 tests (96.62% statements, 91.8% branches, 100% functions, 96.62% lines)
- **WCAG**: Score 100/100, ARIA, focus trap, restoration
- **Performance**: 761ms, bundle 5.61kB
- **Sécurité**: XSS protection intégrée
- **Lighthouse**: Desktop 100/100, Mobile 95/100

### 📊 Métriques Actuelles Phase 3

- **Couverture globale**: **98.24%** statements ✅
- **Tests totaux**: **174 tests** sur 8 fichiers ✅
- **Performance**: Button 378ms, Typography 225ms, Card 453ms, Navigation 625ms, Modal 761ms ✅
- **Quality**: 0 warning/error ✅

### 🎨 Prochains Composants

- **Form Controls** → Inputs et validation

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
- **Styling** : Tailwind CSS 4
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
│   └── modal-demo/          # Démo composant Modal
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
│   ├── NAVIGATION_TESTING_CHECKLIST.md
│   ├── MODAL_TESTING_CHECKLIST.md
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
    ├── MODAL_TEST_SCRIPT.js
    ├── NAVIGATION_TEST_SCRIPT.js
    └── TYPOGRAPHY_TEST_SCRIPT.js

└── templates/               # Templates réutilisables
    └── DOMAIN_DNS_SETUP_TEMPLATE.md
    └── TDD_TEMPLATE_REUSABLE.md
```

## 📚 Documentation (liens rapides)

- [📋 Documentation Technique](docs/core/TECHNICAL_DOCUMENTATION.md)
- [🎨 Charte Graphique](docs/design/CHARTE_GRAPHIQUE.md)
- [🔄 Template TDD Réutilisable](docs/templates/TDD_TEMPLATE_REUSABLE.md)
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
    ├── feature/portfolio-components  # 🚧 EN COURS - Phase 3 (88%)
    └── feature/content-sections      # ⏳ À venir - Phase 4
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
