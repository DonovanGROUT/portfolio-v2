# Portfolio Donovan GROUT

<!-- DEPLOY-LINK-START -->

Pas encore déployé

<!-- DEPLOY-LINK-END -->

Refonte complète de mon portfolio avec une approche moderne, TDD-driven et avec un pipeline CI/CD.

## ✅ Phase 2 CI/CD - TERMINÉE

**Date de completion**: 11 juin 2025
**Statut**: ✅ TERMINÉE

### 🚀 Pipeline Automatisé

- ✅ **CI Tests**: 12/12 tests passent (100%)
- ✅ **Quality Gates**: ESLint + Prettier + TypeScript
- ✅ **Déploiement**: Vercel automatisé (optimisé Next.js)
- ✅ **Performance**: Monitoring Lighthouse
- ✅ **Sécurité**: Audit automatisé des vulnérabilités

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
    ├── feature/setup-environment    # ✅ Terminé - Phase 1
    ├── feature/ci-cd-pipeline      # ✅ TERMINÉE - Phase 2
    ├── feature/design-system       # ⏳ À venir - Phase 3
    └── feature/content-sections    # ⏳ À venir - Phase 3
```

### Standards de Commit

Format : `type: description`

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `test:` - Tests
- `config:` - Configuration

## 🌐 Déploiement

- **Production** : Vercel (performance optimisée)
- **Domaine** : donovan-grout.com → redirection vers Vercel
- **CI/CD** : GitHub Actions → Déploiement automatique
- **Monitoring** : Lighthouse CI + Vercel Analytics

---

_Développé par [Donovan GROUT](https://github.com/DonovanGROUT)_
