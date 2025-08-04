# Portfolio Donovan GROUT

<!-- DEPLOY-LINK-START -->

🌐 **Production**: [donovan-grout.com](https://donovan-grout.com)  
🎯 **Status**: ✅ Pipeline CI/CD opérationnel - Portfolio en cours de développement TDD

<!-- DEPLOY-LINK-END -->

Refonte complète de mon portfolio avec une approche moderne, TDD-driven et avec un pipeline CI/CD.

> **🚧 Statut actuel** : Design System en cours - Button ✅ Typography ✅ Card ✅ terminés avec méthodologie TDD exemplaire (99.5% coverage globale).

## 🎯 Phase 3 - Design System TDD - EN COURS

**Date de début**: 12 juin 2025  
**Statut**: 🚧 50% COMPLÉTÉ (Button ✅ Typography ✅ Card ✅ - 3 août 2025)  
**Méthode**: TDD strict (Red → Green → Refactor)  
**Commits documentés**: Phase 3 complètement tracée dans TECHNICAL_DOCUMENTATION.md

### 🏆 Composants Terminés

#### ✅ **Button Component** - SUCCÈS TOTAL

- **Tests**: 16 tests (100% statements, branches, functions, lines)
- **WCAG**: Score 100/100, touch targets 44px+
- **Performance**: Tests 315ms (-36% optimisé), bundle 2.36kB
- **Sécurité**: XSS protection intégrée
- **Optimisation**: Classes CSS statiques (cn() → concatenation directe)
- **Lighthouse**: Desktop 100/100, Mobile 98/100

#### ✅ **Typography Component** - SUCCÈS TOTAL

- **Tests**: 17 tests (100% statements, branches, functions, lines)
- **WCAG**: Score 100/100, semantic HTML, ARIA
- **Performance**: Tests 184ms (-40% optimisé), bundle 135B
- **Sécurité**: XSS protection intégrée
- **Optimisation**: Classes CSS statiques (cn() → concatenation directe)
- **Lighthouse**: Desktop 100/100, Mobile 98/100

#### ✅ **Card Component** - SUCCÈS TOTAL

- **Tests**: 32 tests (100% statements, 96.87% branches, 100% functions, 100% lines)
- **WCAG**: Score 100/100 - Animation pulse supprimée, états accessibles
- **Performance**: Tests 328ms, bundle 2.78kB
- **Sécurité**: XSS protection intégrée
- **Optimisation**: Classes CSS statiques (Record lookups optimisés)
- **Lighthouse**: Desktop 100/100, Mobile 94/100

### 📊 Métriques Actuelles Phase 3

- **Couverture globale**: **99.5%** statements ✅
- **Tests totaux**: **94 tests** sur 6 fichiers ✅
- **Performance**: Button 493ms, Typography 307ms, Card 438ms ✅
- **Quality**: 0 warning/error ✅

### 🎨 Prochains Composants

- **Navigation** → Menu responsive
- **Modal** → Contact forms, image zoom
- **Form Controls** → Inputs et validation

## ✅ Phase 2 CI/CD - TERMINÉE

**Date de completion**: 11 juin 2025  
**Statut**: ✅ TERMINÉE  
**Déploiement production**: ✅ OPÉRATIONNEL

### 🚀 Pipeline CI/CD Opérationnel

- ✅ **CI Pipeline**: 4 jobs (Quality, Security, Performance, Summary)
- ✅ **Quality Gates**: 94/94 tests + ESLint + Prettier + TypeScript
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

- ✅ **Coverage** : 99.5% statements, 97.14% branches, 100% functions, 99.5% lines
- ✅ **Linting** : Zero warnings/errors
- ✅ **Format** : Prettier strict
- ✅ **Types** : TypeScript strict mode

## 📁 Structure du Projet

```bash
src/
├── app/                     # Pages Next.js (App Router)
│   ├── button-demo/         # Démo composant Button
│   ├── card-demo/           # Démo composant Card
│   └── typography-demo/     # Démo composant Typography
├── components/              # Composants réutilisables
│   └── design-system/       # Design System (Button, Typography, Card)
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
    ├── feature/portfolio-components  # 🚧 EN COURS - Phase 3 (50%)
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
