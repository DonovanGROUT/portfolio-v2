# Portfolio Donovan GROUT

<!-- DEPLOY-LINK-START -->
<!-- Pas encore déployé -->
<!-- DEPLOY-LINK-END -->

Refonte complète de mon portfolio avec une approche moderne, TDD-driven et respectueuse des meilleures pratiques de développement.

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
├── GLOSSARY.md      # Glossaire des termes techniques
└── TESTING_SETUP.md # Guide de configuration des tests
```

## 📚 Documentation

- [📋 Documentation Technique](TECHNICAL_DOCUMENTATION.md)
- [🧪 Configuration Tests](docs/TESTING_SETUP.md)
- [📖 Glossaire](docs/GLOSSARY.md)

## 🤝 Contribution

### Workflow GitFlow

```bash
main          # Production
└── develop   # Intégration
    ├── feature/setup-environment    # ✅ Terminé
    ├── feature/ci-cd-pipeline      # 🚧 En cours
    ├── feature/design-system       # ⏳ À venir
    └── feature/content-sections    # ⏳ À venir
```

### Standards de Commit

Format : `type: description`

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `test:` - Tests
- `config:` - Configuration

## 🌐 Déploiement

- **Production** : PlanetHoster (donovan-grout.com)
- **Staging** : Vercel (previews automatiques)
- **CI/CD** : GitHub Actions

---

_Développé par [Donovan GROUT](https://github.com/DonovanGROUT)_
