# Portfolio Donovan GROUT - Context Claude

> Ce fichier fournit du contexte technique à Claude Code. **Aucune donnée sensible**.

---

## 🎯 Objectif

Portfolio personnel professionnel (développeur full-stack) avec focus sur :

- **Accessibilité** : WCAG 2.1 AA
- **Performance** : Lighthouse 100/100
- **Sécurité** : CSP, XSS protection

---

## 🛠️ Stack Technique

### Frontend

- **Framework** : Next.js 16 (App Router, SSR/SSG)
- **UI** : React 19
- **Langage** : TypeScript 5 (strict mode)
- **Styling** : Tailwind CSS 3.4.17
- **Utilities** : clsx + tailwind-merge

### Testing

- **Runner** : Vitest 3.2.3
- **Library** : @testing-library/react 16
- **Coverage** : @vitest/coverage-v8
- **Méthodologie** : TDD (Red-Green-Refactor)

### Qualité

- **Linter** : ESLint 9 + @typescript-eslint
- **Formatter** : Prettier 3.5
- **Accessibilité** : eslint-plugin-jsx-a11y
- **Pre-commit** : Husky 9

### Performance

- **Lighthouse CI** : @lhci/cli
- **Bundle Analyzer** : webpack-bundle-analyzer
- **Sitemap** : next-sitemap

---

## 📁 Structure

```
portfolio-v2/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── about/
│   │   ├── projects/
│   │   ├── contact/
│   │   ├── services/
│   │   └── privacy-policy/
│   │
│   ├── components/
│   │   └── design-system/      # Design System
│   │       ├── Button/
│   │       ├── Card/
│   │       ├── Form/
│   │       ├── Hero/
│   │       ├── Modal/
│   │       ├── Navigation/
│   │       ├── PrivacyNotice/
│   │       ├── Skills/
│   │       └── Typography/
│   │
│   ├── data/                   # Données statiques
│   ├── hooks/                  # Hooks React custom
│   ├── lib/                    # Utilitaires (cn, colors)
│   └── test/                   # Setup tests
│
├── public/                     # Assets statiques
├── docs/                       # Documentation
└── scripts/                    # Scripts CI/CD
```

---

## 🎯 Skills Actifs

Suivre ces patterns pour ce projet :

- **TDD** : Appliquer ~/.claude/skills/tdd.md pour tout développement
- **Sécurité** : Appliquer ~/.claude/skills/security.md avant chaque PR
- **Code Style** : Respecter ~/.claude/skills/code-style.md

---

## 🔧 Commandes

```bash
# Développement
pnpm dev

# Tests
pnpm test                    # Watch mode
pnpm test:run:threads        # Run once (4 threads)
pnpm test:coverage:threads   # Coverage

# Qualité
pnpm lint                    # ESLint
pnpm lint:fix                # Auto-fix
pnpm format                  # Prettier

# Build
pnpm build
pnpm lighthouse              # Lighthouse CI
pnpm audit:security          # Audit sécurité
```

---

## ✅ Conventions

### Git

- **Convention** : Conventional Commits
- **Branches** : `main`, `feature/*`, `fix/*`
- **PR** : Code review obligatoire

### Code

- Variables : `camelCase`
- Composants : `PascalCase`
- Fichiers composants : `PascalCase.tsx`
- Tests : `ComponentName.test.tsx`

### Accessibilité (WCAG 2.1 AA)

- Contraste minimum 4.5:1
- Focus visible
- Touch targets 44x44px minimum
- ARIA labels sur éléments interactifs
- Navigation clavier complète

---

## ❌ Interdit

- `any` en TypeScript
- `console.log` en production
- Ignorer les warnings ESLint/a11y
- Commit sans tests
- Données sensibles dans le code

---

## 📊 Objectifs Qualité

- Coverage : > 80%
- Lighthouse Performance : 100
- Lighthouse Accessibility : 100
- Zero vulnérabilités critiques

---

**Dernière mise à jour** : 26 décembre 2025
