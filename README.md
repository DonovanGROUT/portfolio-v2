# Portfolio Donovan GROUT

<!-- DEPLOY-LINK-START -->

🌐 **Production**: [donovan-grout.com](https://donovan-grout.com)  
🎯 **Status**: ✅ Pipeline CI/CD opérationnel - Portfolio en cours de développement TDD

<!-- DEPLOY-LINK-END -->

Refonte complète de mon portfolio avec une approche moderne, TDD-driven et avec un pipeline CI/CD.

> **🚧 Statut actuel** : Design System en cours - Button ✅ et Typography ✅ terminés avec méthodologie TDD exemplaire (99.34% coverage globale).

## 🎯 Phase 3 - Design System TDD - EN COURS

**Date de début**: 12 juin 2025  
**Statut**: 🚧 40% COMPLÉTÉ (Button ✅ Typography ✅ - 16 juin 2025)  
**Méthode**: TDD strict (Red → Green → Refactor)

### 🏆 Composants Terminés

#### ✅ **Button Component** - SUCCÈS TOTAL

- **Tests**: 13 tests (97.32% statements, 91.66% branches)
- **WCAG**: Score 100/100, touch targets 44px+
- **Performance**: Tests 253ms, bundle optimisé
- **Sécurité**: XSS protection intégrée

#### ✅ **Typography Component** - SUCCÈS TOTAL

- **Tests**: 17 tests (100% statements, branches, functions)
- **WCAG**: ARIA compliant, semantic HTML
- **Responsive**: Mobile-first, breakpoints optimisés
- **Sémantique**: Tags dynamiques h1-h4, p, span

### 📊 Métriques Actuelles Phase 3

- **Couverture globale**: **99.34%** statements ✅
- **Tests totaux**: **59 tests** sur 5 fichiers ✅
- **Performance**: Tous <300ms ✅
- **Quality**: 0 warning/error ✅

### 🎨 Prochains Composants

- **Card** → Conteneurs portfolio sections
- **Navigation** → Menu responsive
- **Form** → Inputs et validation

## ✅ Phase 2 CI/CD - TERMINÉE

**Date de completion**: 11 juin 2025  
**Statut**: ✅ TERMINÉE  
**Déploiement production**: ✅ OPÉRATIONNEL

### 🚀 Pipeline CI/CD Opérationnel

- ✅ **CI Pipeline**: 4 jobs (Quality, Security, Performance, Summary)
- ✅ **Quality Gates**: 12/12 tests + ESLint + Prettier + TypeScript
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

- ✅ **Coverage** : 100% (Statements, Branches, Functions, Lines)
- ✅ **Linting** : Zero warnings/errors
- ✅ **Format** : Prettier strict
- ✅ **Types** : TypeScript strict mode

## 📁 Structure du Projet

```bash
src/
├── app/              # Pages Next.js (App Router)
├── components/       # Composants réutilisables
├── lib/             # Utilitaires et configurations
└── test/            # Configuration et utilitaires de test

docs/                 # Documentation technique
├── GLOSSARY.md              # Glossaire des termes techniques
├── PHASE_1_TDD_SETUP.md     # Configuration TDD et environnement test
├── PHASE_2_CI_CD_SETUP.md   # Pipeline CI/CD et déploiement
└── TECHNICAL_DOCUMENTATION.md  # Documentation technique complète
```

## 📚 Documentation

- [📋 Documentation Technique](docs/TECHNICAL_DOCUMENTATION.md)
- [🧪 Configuration TDD](docs/PHASE_1_TDD_SETUP.md)
- [🚀 Pipeline CI/CD](docs/PHASE_2_CI_CD_SETUP.md)
- [📖 Glossaire](docs/GLOSSARY.md)

### Workflow GitFlow

```bash
main          # Production
└── develop   # Intégration
    ├── feature/setup-environment      # ✅ Terminé - Phase 1
    ├── feature/ci-cd-pipeline        # ✅ Terminé - Phase 2
    ├── feature/portfolio-components  # 🚧 EN COURS - Phase 3 (40%)
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
