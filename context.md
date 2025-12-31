# Portfolio Donovan GROUT - Context Claude

## 📋 Informations Projet

### Identité

- **Nom**: Portfolio Donovan GROUT (Refonte v2)
- **Type**: Portfolio personnel professionnel (développeur full-stack)
- **URL Production**: [donovan-grout.com](https://donovan-grout.com)
- **Repository GitHub**: [https://github.com/DonovanGROUT/portfolio-v2](https://github.com/DonovanGROUT/portfolio-v2)
- **Visibilité**: Repository PUBLIC
- **Chemin local**: `/home/donovan-grout/SyncVM/Freelance/portfolio-v2`

### Statut Actuel

- **Phase**: Phase 4 - Contenu & Sections (**EN COURS** - 16.67% complété)
- **Branche active**: `feature/content-sections`
- **Dernier composant terminé**: Hero Component (26 tests, 100% coverage, 100/100 Lighthouse)
- **Prochains composants**: Skills, Timeline, ProjectCard, Testimonial, Footer

---

## 🏗️ Stack Technique

### Framework & Langage

- **Framework**: Next.js 15 (App Router, SSR/SSG)
- **Langage**: TypeScript 5 (strict mode activé)
- **Runtime**: Node.js 20+
- **Package Manager**: npm

### Frontend

- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4.17 (configuration optimisée CI/CD)
- **Utility**: `clsx` + `tailwind-merge` (gestion classes conditionnelles)
- **Plugins Tailwind**: `@tailwindcss/typography`

### Testing (TDD Strict)

- **Test Runner**: Vitest 3.2.3
- **Test Library**: @testing-library/react 16.3.0 + @testing-library/jest-dom 6.6.3
- **Coverage Tool**: @vitest/coverage-v8 3.2.3
- **User Interactions**: @testing-library/user-event 14.6.1
- **Méthodologie**: **Red → Green → Refactor** (TDD strict appliqué)

### Qualité & Linting

- **Linter**: ESLint 9 + @typescript-eslint 8.34.0
- **Formatter**: Prettier 3.5.3
- **Plugins ESLint**:
  - `eslint-plugin-jsx-a11y` (accessibilité)
  - `eslint-plugin-react` + `eslint-plugin-react-hooks`
  - `eslint-plugin-import`
  - `eslint-config-prettier` (intégration)
- **Pre-commit Hooks**: Husky 9.1.7

### CI/CD & Déploiement

- **CI**: GitHub Actions (tests automatisés, linting, build)
- **Preview**: Vercel (déploiements branches feature)
- **Production**: PlanetHoster (déploiement `main` automatique)
- **Quality Gates**: Tests + Linting + Build validation obligatoires

### Performance & SEO

- **Bundle Analyzer**: webpack-bundle-analyzer 4.10.2
- **Lighthouse CI**: @lhci/cli 0.15.0
- **Sitemap**: next-sitemap 4.2.3 (génération automatique)
- **Security Audit**: audit-ci 7.1.0

### Utilities

- **UUID**: uuid 13.0.0 (génération IDs uniques)
- **PostCSS**: autoprefixer 10.4.21
- **Dev Server**: wait-on 8.0.3, ngrok 5.0.0-beta.2

---

## 📁 Structure Projet

```
portfolio-v2/
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Layout principal
│   │   ├── page.tsx                # Page d'accueil
│   │   ├── globals.css             # Styles globaux
│   │   ├── about/                  # Page À propos
│   │   ├── projects/               # Page Projets
│   │   ├── contact/                # Page Contact
│   │   ├── privacy-policy/         # Politique confidentialité
│   │   ├── services/               # Page Services
│   │   └── *-demo/                 # Pages démo composants (dev)
│   │
│   ├── components/
│   │   └── design-system/          # Composants Design System (Phase 3 ✅)
│   │       ├── Button/             # ✅ 26 tests, 94% coverage
│   │       ├── Typography/         # ✅ 17 tests, 100% coverage
│   │       ├── Card/               # ✅ 34 tests, 98% coverage
│   │       ├── Navigation/         # ✅ 39 tests, 100% coverage
│   │       ├── Modal/              # ✅ 29 tests, 96% coverage
│   │       ├── Form/               # ✅ 47 tests, 96% coverage
│   │       ├── PrivacyNotice/      # ✅ 11 tests, 100% coverage
│   │       └── Hero/               # ✅ 26 tests, 100% coverage (Phase 4)
│   │
│   ├── lib/                        # Utilitaires
│   │   ├── colors.ts               # Palette couleurs "Tech & Nature"
│   │   └── utils.ts                # Helpers (cn, etc.)
│   │
│   └── test/                       # Test utilities
│       └── utils.tsx               # Custom render, helpers tests
│
├── docs/                           # 📚 Documentation complète
│   ├── README.md                   # Index navigation docs
│   ├── core/
│   │   └── TECHNICAL_DOCUMENTATION.md  # Doc technique complète
│   ├── phases/
│   │   ├── PHASE_1_TDD_SETUP.md
│   │   ├── PHASE_2_CI_CD_SETUP.md
│   │   └── PHASE_3_TDD_DEVELOPMENT.md
│   ├── design/
│   │   └── CHARTE_GRAPHIQUE.md     # Design System "Tech & Nature"
│   ├── guides/                     # Checklists validation composants
│   │   ├── BUTTON_TESTING_CHECKLIST.md
│   │   ├── HERO_TESTING_CHECKLIST.md
│   │   └── ...
│   ├── scripts/                    # Scripts DevTools (F12 Console)
│   │   ├── BUTTON_TEST_SCRIPT.js
│   │   ├── HERO_TEST_SCRIPT.js
│   │   └── ...
│   ├── reference/
│   │   ├── GLOSSARY.md
│   │   └── PORTFOLIO_CONTENT_STRUCTURE.md
│   └── templates/
│       ├── TDD_TEMPLATE_REUSABLE.md
│       └── DOMAIN_DNS_SETUP_TEMPLATE.md
│
├── public/                         # Assets statiques
│   ├── images/                     # Images portfolio
│   ├── documents/                  # Fichiers téléchargeables
│   ├── sitemap*.xml                # Générés automatiquement
│   └── robots.txt                  # Généré automatiquement
│
├── coverage/                       # Rapports coverage (ignoré git)
├── analyze/                        # Bundle analysis (ignoré git)
│
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD pipeline
│
├── next.config.ts                  # Config Next.js + CSP + Bundle Analyzer
├── tsconfig.json                   # Config TypeScript strict
├── tailwind.config.js              # Config Tailwind + palette "Tech & Nature"
├── vitest.config.ts                # Config Vitest
├── eslint.config.ts                # Config ESLint
├── postcss.config.js               # Config PostCSS
├── next-sitemap.config.js          # Config sitemap
├── middleware.ts                   # Middleware Next.js (CSP headers)
├── package.json                    # Dépendances
└── .gitignore                      # Fichiers ignorés
```

---

## 🎨 Design System "Tech & Nature"

### Palette Couleurs Principales

- **Bleu Océan**: `#0066CC` (tech, moderne)
- **Vert Éco**: `#2ECC71` (nature, durable)
- **Gradients**:
  - Bleu océan → Vert éco (hero, CTA)
  - Variations subtiles pour cards

### Typographie

- **Variants**: h1, h2, h3, h4, body, body-large, caption
- **Responsive**: Breakpoints adaptatifs mobile-first
- **Accessibilité**: Contraste WCAG 2.1 AA garanti

### Composants Design System (✅ Phase 3 Terminée)

- **Button**: 3 variants (primary, secondary, outline), 3 tailles
- **Typography**: 7 variants sémantiques
- **Card**: 5 variants portfolio (default, project, skill, experience, testimonial)
- **Navigation**: Responsive, menu mobile/desktop
- **Modal**: Overlay, focus trap, multi-tailles
- **Form**: Input, Textarea, Select, validation HTML5
- **PrivacyNotice**: RGPD compliant, expansion, consentement
- **Hero**: (Phase 4) Gradient, CTA, responsive, animations

---

## 🎯 Règles de Développement Strictes Phase 4

### 📦 Composants Design System Disponibles (RÉUTILISATION OBLIGATOIRE)

```typescript
// ✅ TOUJOURS utiliser ces composants, JAMAIS coder en HTML brut
import { Typography } from "@/components/design-system/Typography/Typography";
import { Button } from "@/components/design-system/Button/Button";
import { Card } from "@/components/design-system/Card/Card";
import { Navigation } from "@/components/design-system/Navigation/Navigation";
import { Modal } from "@/components/design-system/Modal/Modal";
import {
  Form,
  Input,
  Textarea,
  Select,
} from "@/components/design-system/Form/Form";
import { PrivacyNotice } from "@/components/design-system/PrivacyNotice/PrivacyNotice";
import { Hero } from "@/components/design-system/Hero/Hero";
```

### 🚫 RÈGLES OBLIGATOIRES À RESPECTER

#### 1. Réutilisation Composants Design System

```typescript
// ❌ INTERDIT - HTML brut
<h2 className="text-3xl font-bold">Titre</h2>
<button className="bg-blue-600 px-4 py-2">Clic</button>

// ✅ CORRECT - Composants Design System
<Typography variant="h2">Titre</Typography>
<Button variant="primary">Clic</Button>
```

#### 2. Accessibilité Clavier (WCAG 2.1 AA)

```typescript
// ❌ INTERDIT - Élément non focusable
<li className="skill-item" onClick={handleClick}>Compétence</li>

// ✅ CORRECT - Focusable au clavier
<li>
  <button
    onClick={handleClick}
    onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    className="focus:ring-2 focus:ring-sky-400"
  >
    Compétence
  </button>
</li>
```

**Exigences accessibilité**:

- Tous éléments interactifs DOIVENT être focusables (Tab/Shift+Tab)
- Focus visible OBLIGATOIRE (`focus:ring-2 focus:ring-sky-400`)
- Support clavier complet (Enter/Space/Escape selon contexte)
- Tests accessibilité OBLIGATOIRES dans `.test.tsx`

#### 3. TDD - Analyser Composants Existants Avant Coder

```bash
# ✅ ÉTAPE OBLIGATOIRE avant créer nouveau composant
@explore-codebase "Analyser Hero.tsx patterns composition, props, tests"
@snipper "Extraire structure Hero.test.tsx pour template Skills.test.tsx"
```

**Workflow TDD Phase 4**:

1. Analyser `Hero.tsx` + `Hero.test.tsx` (patterns de référence)
2. Copier structure tests (minimal render, props, ARIA, responsive, keyboard)
3. RED: Écrire tests qui échouent
4. GREEN: Implémenter composant minimal
5. REFACTOR: Optimiser avec composants Design System

#### 4. Contraintes Visuelles Phase 4

```typescript
// ❌ INTERDIT pour Phase 4 Skills
- Badges de niveau (beginner/intermediate/advanced/expert)
- Jauges de progression (<ProgressBar />)
- Étoiles de notation (<StarRating />)
- Graphiques complexes

// ✅ AUTORISÉ Phase 4 Skills
- Affichage simple nom compétence uniquement
- Groupement par catégorie (Frontend, Backend, etc.)
- Style minimal avec Card + Typography
```

#### 5. Pages Demo - Limite 100 Lignes

```typescript
// ❌ INTERDIT - Demo verbose 321 lignes
const skillsData = [
  /* 65 compétences */
];

// ✅ CORRECT - Demo concise max 100 lignes
const skillsData = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  // 5-10 exemples MAX
];
```

### 🔍 Checklist Validation Avant Commit

- [ ] **Composants Design System utilisés** (pas HTML brut)
- [ ] **Accessibilité clavier complète** (Tab, Enter, Space, focus visible)
- [ ] **Tests TDD complets** (render, props, ARIA, responsive, keyboard)
- [ ] **Coverage >90%** (vérifier avec `npm run test:coverage`)
- [ ] **Page demo <100 lignes** (5-10 exemples max)
- [ ] **Pas de features non demandées** (badges, jauges, etc.)
- [ ] **Code analysé avec agents Haiku** (@explore-codebase, @snipper)

### 📋 Agents Claude Code - Usage Obligatoire

**⚡ Agents Haiku Disponibles** (15x moins cher que Sonnet)

```bash
# 🔍 Exploration & Recherche
@explore-codebase "chercher patterns Hero.tsx composition Typography/Card"
@explore-docs "React Server Components best practices Next.js 15"
@websearch "WCAG 2.1 AA keyboard navigation requirements"
@quick-search "find all Card variant implementations"

# 🛠️ Génération & Actions
@snipper "générer Skills.tsx minimal avec Typography/Card"
@action "vérifier dépendances inutilisées package.json"
@fix-grammar "corriger orthographe fichier documentation"
```

**🚫 RÈGLE CRITIQUE** : TOUJOURS utiliser agents Haiku AVANT outils directs

- ❌ Ne PAS utiliser Bash/Read/Grep direct sauf si agents insuffisants
- ✅ Lancer agents en PARALLÈLE quand possible (gain temps/tokens)
- ✅ Analyser Hero.tsx avec @explore-codebase AVANT coder Skills.tsx

**⚙️ Commands Custom Disponibles** (workflows optimisés)

```bash
/apex          # APEX workflow (Analyze-Plan-Execute-eXamine) systématique
/oneshot       # Implémentation ultra-rapide (Explore-Code-Test, <10min)
/quick-search  # Recherche lightning <30s (Grep/Glob direct, pas agents)
/run-tasks     # Exécuter GitHub issues avec EPCT workflow + PR auto
/commit        # Commit atomique rapide (git add -A + message + push)
/explain       # Expliquer code/architecture existante
/review        # Review code qualité avant merge
```

**💡 Quand Utiliser Quoi**

- **Développement TDD Phase 4** : Utiliser agents @explore-codebase + @snipper
- **Implémentation rapide** : `/oneshot` (si simple, <10min)
- **Implémentation complexe** : `/apex` (APEX workflow systématique)
- **Recherche info** : `@quick-search` (lightning) ou `@explore-codebase` (approfondi)
- **Docs externes** : `@explore-docs` (Context7 + WebFetch)
- **Commit** : `/commit` (atomique, message auto)

---

## 🧪 Méthodologie TDD

### Cycle Red-Green-Refactor Appliqué

1. **RED**: Écrire test qui échoue (feature non implémentée)
2. **GREEN**: Implémenter code minimal pour passer le test
3. **REFACTOR**: Optimiser sans changer comportement

### Métriques Qualité Exigées

- **Coverage**: >90% statements, >85% branches, 100% functions
- **Performance**: <1000ms tests composants, bundle optimisé
- **Accessibilité**: WCAG 2.1 AA, Lighthouse 100/100
- **Sécurité**: XSS protection systématique, sanitization inputs

### Scripts Tests

```bash
npm test                          # Mode watch
npm run test:run                  # Run once
npm run test:coverage             # Coverage report
npm run test:coverage:strict      # Coverage + verbose
```

---

## 🔒 Sécurité & Standards

### Content Security Policy (CSP)

- Gestion via `middleware.ts` (tous environnements)
- Nonce dynamique pour scripts/styles inline
- Protection XSS, clickjacking, MIME sniffing

### RGPD / GDPR

- **PrivacyNotice Component**: Consentement explicite
- **Privacy Policy**: Page dédiée `/privacy-policy`
- **Privacy by Design**: Données minimales, pas de tracking tiers

### Accessibilité (WCAG 2.1 AA)

- **Tests**: ARIA attributes, keyboard navigation, focus management
- **Scripts DevTools**: ARIA_TEST_SCRIPT.js pour validation manuelle
- **Touch Targets**: Minimum 44x44px (mobile)

---

## 📊 Métriques Actuelles

### Tests (Phase 3 + Hero)

- **Total tests**: 261 tests passés ✅
- **Coverage Design System**: 98.24% statements, 95.06% branches
- **Coverage Projet Global**: 86.55% statements

### Performance

- **Button**: 533ms
- **Typography**: 216ms
- **Card**: 568ms
- **Navigation**: 907ms
- **Modal**: 961ms
- **Form**: 1818ms
- **PrivacyNotice**: 664ms
- **Hero**: <100ms ✅

### Lighthouse Scores

- **Desktop**: 100/100 (tous composants)
- **Mobile**: 94-100/100 (optimisations responsives)

---

## 🎯 Phases Projet

### ✅ Phase 1 - Setup Environnement (TERMINÉ)

- Configuration Next.js 15 + TypeScript strict
- Migration Tailwind v4 → v3 (stabilité CI/CD)
- Setup Vitest + Testing Library
- Structure projet modulaire

### ✅ Phase 2 - CI/CD Pipeline (TERMINÉ)

- GitHub Actions (tests auto PR)
- Vercel Preview (branches feature)
- PlanetHoster Production (main)
- Quality Gates (lint + tests + build)

### ✅ Phase 3 - TDD Design System (TERMINÉ)

- 7 composants core (Button, Typography, Card, Navigation, Modal, Form, PrivacyNotice)
- 234 tests, 98.24% coverage
- Tous composants WCAG 2.1 AA + XSS protection
- Checklists validation + scripts DevTools

### 🚧 Phase 4 - Contenu & Sections (EN COURS - 16.67%)

- **✅ Hero Component** (26 tests, 100% coverage)
- **⏳ Skills**: Technologies par catégories
- **⏳ Timeline**: Formation + Expérience
- **⏳ ProjectCard**: Projets enrichis
- **⏳ Testimonial**: Recommandations
- **⏳ Footer**: Pied de page
- **Pages à intégrer**: Accueil, À propos, Projets, Contact

---

## 🔄 Workflow Git

### Branches Principales

```
main (production)          # Stable, déployé PlanetHoster
└── develop (intégration)  # Branche par défaut, intégration features
    └── feature/*          # Branches features individuelles
```

### Workflow Standard

1. **Feature branch** depuis `develop`: `git checkout -b feature/nom-feature`
2. **Développement TDD**: Red → Green → Refactor
3. **Commits conventionnels**: `feat:`, `test:`, `fix:`, `refactor:`, `docs:`
4. **PR vers `develop`**: Tests CI/CD obligatoires
5. **Merge `develop` → `main`**: Déploiement production automatique

---

## 📝 Scripts Principaux

### Développement

```bash
npm run dev                    # Serveur dev Next.js (http://localhost:3000)
npm run build                  # Build production
npm run start                  # Serveur production local
```

### Tests

```bash
npm test                       # Tests mode watch
npm run test:ui                # Interface Vitest UI
npm run test:run               # Run tests once
npm run test:coverage          # Coverage report
npm run test:coverage:strict   # Coverage + warnings strict
```

### Qualité Code

```bash
npm run lint                   # ESLint check
npm run lint:fix               # ESLint auto-fix
npm run lint:strict            # ESLint avec max-warnings 0
npm run format                 # Prettier format
npm run format:check           # Prettier check only
npm run check                  # Format + Lint + Tests (pre-commit)
```

### Déploiement

```bash
npm run postbuild              # Génère sitemap automatiquement
npm run lighthouse             # Audit Lighthouse CI
npm run audit:security         # Audit sécurité npm
```

### Analyse

```bash
ANALYZE=true npm run build     # Bundle analysis (génère JSON)
```

---

## 🚫 Fichiers Ignorés (.gitignore)

### Build & Dependencies

- `node_modules/`, `.next/`, `out/`, `build/`
- `.pnp.*`, `.yarn/` (Yarn PnP)

### Tests & Coverage

- `coverage/`

### Analyse & Reports

- `analyze/` (bundle analyzer)
- `docs/reference/COHERENCE_ANALYSIS_REPORT.md`

### Environnement

- `.env*` (variables environnement)
- `.vercel/`

### Fichiers Générés

- `public/sitemap*.xml`
- `public/robots.txt`
- `*.tsbuildinfo`
- `next-env.d.ts`

### Système

- `.DS_Store`, `*.pem`
- `npm-debug.log*`, `yarn-debug.log*`, `.pnpm-debug.log*`

---

## 📚 Documentation Clés

### Pour Développeurs

1. **[docs/core/TECHNICAL_DOCUMENTATION.md](docs/core/TECHNICAL_DOCUMENTATION.md)** → Vue d'ensemble technique complète (1119 lignes)
2. **[docs/phases/PHASE_3_TDD_DEVELOPMENT.md](docs/phases/PHASE_3_TDD_DEVELOPMENT.md)** → Méthodologie TDD appliquée
3. **[docs/README.md](docs/README.md)** → Index navigation documentation

### Pour Designers/UX

1. **[docs/design/CHARTE_GRAPHIQUE.md](docs/design/CHARTE_GRAPHIQUE.md)** → Design System "Tech & Nature"
2. **[docs/guides/HERO_TESTING_CHECKLIST.md](docs/guides/HERO_TESTING_CHECKLIST.md)** → Validation visuelle Hero
3. **Checklists** → Un fichier par composant (Button, Card, Navigation, etc.)

### Pour QA/Testeurs

1. **[docs/guides/ADVANCED_TESTING_GUIDE.md](docs/guides/ADVANCED_TESTING_GUIDE.md)** → Guide tests approfondis
2. **[docs/scripts/ARIA_TEST_SCRIPT.js](docs/scripts/ARIA_TEST_SCRIPT.js)** → Tests accessibilité DevTools
3. **Scripts DevTools** → Un fichier par composant (à coller dans F12 Console)

---

## 🔧 Configuration Clés

### TypeScript (strict mode)

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true
}
```

### Tailwind (Palette "Tech & Nature")

- **Bleu Océan**: Custom utilities générées
- **Vert Éco**: Custom utilities générées
- **Responsive**: Mobile-first breakpoints

### Next.js

- **App Router**: Activé (Next.js 15)
- **SSR/SSG**: Support mixte
- **Images**: Remote patterns configurables
- **CSP Headers**: Gérés par `middleware.ts`
- **Bundle Analyzer**: Mode JSON (ANALYZE=true)

---

## 🧪 Scripts NPM & Validation

### 🚀 Scripts Tests Optimisés (UTILISER EN PRIORITÉ)

**Scripts avec Threads** (4 workers parallèles - RECOMMANDÉ)

```bash
npm run test:coverage:threads          # Coverage + 4 threads ✅ UTILISER
npm run test:coverage:threads:verbose  # Idem + mode verbose
npm run test:run:threads               # Tests seuls + 4 threads
npm run test:run:threads:verbose       # Idem + mode verbose
```

**Scripts Standards**

```bash
npm test                     # Mode watch (développement interactif)
npm run test:ui              # Interface graphique Vitest
npm run test:run             # Run once (1 thread - plus lent)
npm run test:coverage        # Coverage (1 thread - plus lent)
```

**Validation Complète**

```bash
npm run check                # Format + Lint + Tests threads (pre-push hook)
npm run format               # Prettier auto-format
npm run format:check         # Vérifier format sans modifier
npm run lint                 # ESLint
npm run lint:fix             # ESLint auto-fix
npm run lint:strict          # ESLint max-warnings 0
```

**⚡ RÈGLE CRITIQUE** : TOUJOURS utiliser `*:threads` pour validation

- Plus rapide : 4 workers parallèles vs 1 thread séquentiel
- Utilisé par pre-push hook Git automatique
- Résultats identiques mais exécution optimisée

### 🔄 Workflow TDD

1. **RED** : Écrire test qui échoue → `npm test` (watch mode)
2. **GREEN** : Code minimal pour passer → Tests passent
3. **REFACTOR** : Optimiser → `npm run test:coverage:threads` (validation complète)
4. **COMMIT** : `/commit` ou `git push` (pre-push hook valide auto)

---

## 🎯 Objectifs Finaux Phase 4

### Composants Restants (5/6)

- [ ] **Skills**: Grille technologies catégorisées (Frontend, Backend, DevOps, etc.)
- [ ] **Timeline**: Formation académique + Expériences professionnelles
- [ ] **ProjectCard**: Cards projets enrichis (image, tags, liens GitHub/démo)
- [ ] **Testimonial**: Recommandations clients/collègues
- [ ] **Footer**: Liens réseaux, mentions légales, copyright

### Pages Complètes (4)

- [ ] **Accueil (/)**: Hero + Skills + Projets featured + Testimonials
- [ ] **À propos (/about)**: Présentation personnelle + Timeline
- [ ] **Projets (/projects)**: Grille complète ProjectCards
- [ ] **Contact (/contact)**: Formulaire contact (Form component réutilisé)

### Métriques Cibles Phase 4

- **Tests**: >250 tests (vs 261 actuels)
- **Coverage**: Maintenir >90% statements
- **Performance**: Tous composants <1000ms
- **Lighthouse**: 100/100 Desktop, >95/100 Mobile
- **Accessibilité**: WCAG 2.1 AA sur toutes pages

---

## 💡 Points d'Attention

### Bonnes Pratiques Établies

- **TDD obligatoire**: Red → Green → Refactor systématique
- **XSS Protection**: Sanitization props sur tous composants
- **Accessibilité First**: ARIA, keyboard nav, focus management
- **Mobile-First**: Responsive design prioritaire
- **RGPD compliant**: Privacy by design, consentement explicite

### Pièges Connus Évités

- **Tailwind v4**: Revenu à v3 pour stabilité PostCSS/CI/CD
- **CSP stricte**: Gestion nonce dynamique via middleware
- **Tests asynchrones**: Utilisation `waitFor` pour interactions user-event
- **Bundle size**: Monitoring via webpack-bundle-analyzer

### Améliorations Continues

- **Performance**: Bundle analysis régulière (ANALYZE=true)
- **Accessibilité**: Scripts DevTools validation manuelle
- **Sécurité**: Audits npm réguliers (`npm run audit:security`)
- **SEO**: Sitemap automatique, structured data JSON-LD

---

## 🔗 Liens Utiles

- **Production**: [https://donovan-grout.com](https://donovan-grout.com)
- **GitHub**: [https://github.com/DonovanGROUT/portfolio-v2](https://github.com/DonovanGROUT/portfolio-v2)
- **Vercel Dashboard**: (Previews branches feature)
- **PlanetHoster**: (Production main)

---

## 📧 Contact Projet

- **Développeur**: Donovan GROUT
- **Type**: Portfolio professionnel (développeur full-stack)
- **Stack**: Next.js 15 + React 19 + TypeScript + Tailwind CSS
- **Méthodologie**: TDD strict + CI/CD automatisé
- **Standards**: WCAG 2.1 AA + RGPD/GDPR + XSS Protection

---

_Dernière mise à jour: 18 novembre 2025_
_Document généré pour optimiser le contexte Claude sur le projet portfolio-v2_
