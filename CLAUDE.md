# CLAUDE.md

Ce fichier guide Claude Code lors du développement dans ce portfolio.

## 🎯 Phase Actuelle : Phase 4 - Contenu & Sections (40%)

**Dernier composant terminé** : Skills intégré dans page.tsx (production ready)
**Prochain composant** : Timeline (Formation + Expériences) ou ProjectCard

## ⚙️ Commandes Développement

### Scripts Tests (UTILISER THREADS)

```bash
npm run test:coverage:threads          # ✅ RECOMMANDÉ - Coverage + 4 threads
npm run test:coverage:threads:verbose  # Idem + mode verbose
npm test                               # Mode watch développement
```

### Validation Complète

```bash
npm run check      # Format + Lint + Tests threads (pre-push hook auto)
npm run lint:fix   # Auto-fix ESLint
npm run format     # Auto-format Prettier
```

### Build & Dev

```bash
npm run dev        # Dev server Next.js (port 3000)
npm run build      # Build production Next.js
npm start          # Start production server
```

### Audit & Performance

```bash
# ⚠️ IMPORTANT: Lighthouse doit tourner sur BUILD PRODUCTION
npm run build && npm start  # Build + start prod (port 3000)
npm run lighthouse          # Audit Lighthouse Desktop (3 runs)
npm run lighthouse:mobile   # Audit Lighthouse Mobile (3 runs, émulation Moto G)
npm run audit:security      # Audit dépendances npm (audit-ci)

# ℹ️ Lighthouse teste toujours http://localhost:3000 (hardcodé)
# → Si npm run dev tourne : teste version dev (❌ faux résultats)
# → Si npm start tourne : teste version prod (✅ vrais résultats)
# → Si aucun serveur : ❌ Lighthouse échoue (connexion refusée)
```

**Configuration Lighthouse** :

- **Desktop** : `.lighthouserc.json` (preset: desktop, throttlingMethod: "provided" - mesures réelles)
- **Mobile** : `.lighthouserc.mobile.json` (émulation Moto G Power, 3G lent, CPU 4x, simulated throttling)
- **URL** : `http://localhost:3000` (hardcodé dans les deux configs)
- **Runs** : 3 exécutions pour médiane
- **Upload** : Stockage temporaire public (liens rapports générés)
- **⚠️ IMPORTANT** : Desktop utilise `throttlingMethod: "provided"` pour aligner avec Chrome DevTools (pas de simulation)

**Résultats Lighthouse attendus (production)** :

| Catégorie      | Desktop | Mobile | Niveau Erreur |
| -------------- | ------- | ------ | ------------- |
| Performance    | ≥90     | ≥85    | warn          |
| Accessibility  | ≥95     | ≥95    | error         |
| Best Practices | ≥90     | ≥90    | error         |
| SEO            | ≥90     | ≥90    | error         |
| PWA            | ≥80     | ≥80    | warn          |

**Audit Sécurité npm (audit-ci)** :

- **Config** : `audit-ci.json` (vérifie low, moderate, high, critical)
- **Commande** : `npm run audit:security`
- **État actuel** : 4 low vulnérabilités (CVSS 2.5, allowlistées) ✅
  - `GHSA-52f5-9888-hmc6` (tmp package) : Symbolic link write (devDeps `@lhci/cli`)
  - 3 dépendances transitives (inquirer, external-editor, tmp)
  - **Impact production** : Aucun (dev dependencies uniquement)
- **Action** : Allowlist ajoutée dans `audit-ci.json` (sécurité OK)

**CI/CD - GitHub Actions** :

✅ **DÉJÀ INTÉGRÉ** (`.github/workflows/ci.yml` et `deploy.yml`) :

1. **Quality Job** (bloquant) :
   - Format check (Prettier)
   - Lint strict (ESLint)
   - Tests unitaires (Vitest threads)
   - Build production

2. **Security Job** (bloquant) :
   - `npm run audit:security` (fail si high/critical en prod deps)

3. **Lighthouse Job** (non-bloquant) :
   - Desktop : `npm run lighthouse` (perf ≥90)
   - Mobile : `npm run lighthouse:mobile` (perf ≥85)
   - Reports upload automatique (public storage)

4. **Deploy Job** (Vercel) :
   - Quality gate obligatoire
   - Preview sur PR
   - Production auto sur push `main`

📋 **Fichiers CI/CD** :

- `.github/workflows/ci.yml` : Tests qualité, sécurité, performance
- `.github/workflows/deploy.yml` : Déploiement Vercel
- `vercel.json` : Config build Vercel + headers sécurité

**GitHub Token Lighthouse** :

✅ **TON TOKEN "Push to repos" EST DÉJÀ BON** :

- Scope `repo` : Contrôle complet repositories (✅ requis)
- Scope `workflow` : Update GitHub Actions (✅ bonus)

**Activation dans GitHub Actions** :

1. Copier le token depuis https://github.com/settings/tokens
2. Aller dans Settings du repo → Secrets and variables → Actions
3. Créer secret : `LHCI_GITHUB_TOKEN` = ton token
4. Le workflow l'utilisera automatiquement (déjà configuré dans `ci.yml`)

**Impact si absent** :

- ✅ Upload public fonctionne (liens temporaires générés)
- ❌ Pas de badge GitHub ni historique dans PR

**PWA (Progressive Web App)** :

❌ **Pas nécessaire pour ce portfolio** :

- Portfolio statique sans fonctionnalités offline
- Pas de notifications push requises
- Pas de cache applicatif complexe
- Next.js gère déjà l'optimisation (pre-rendering, cache HTTP)
- Score PWA 0 = normal et acceptable

✅ **Si PWA souhaité plus tard** :

- Ajouter `next-pwa` (service worker Next.js)
- Créer `manifest.json` (icônes, couleurs, nom app)
- Activer cache offline pour pages statiques

## 🏗️ Architecture Projet

### Tech Stack

- **Next.js 15** avec App Router (React 19)
- **TypeScript 5** en mode strict
- **Tailwind CSS v3** (palette "Tech & Nature")
- **Vitest** pour tests unitaires (threads: 4 workers)
- **ESLint + Prettier** (validation automatique)

### Design System Complet (7 composants testés)

```typescript
// ✅ TOUJOURS utiliser ces composants (JAMAIS HTML brut)
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

### Structure Répertoires Clés

- **src/app/** : Pages Next.js (App Router)
- **src/components/design-system/** : Composants réutilisables testés
- **src/lib/** : Utilitaires (colors, utils, cn)
- **src/test/** : Helpers tests (custom render)
- **docs/** : Documentation complète projet
  - **docs/phases/** : PHASE*1-4*\*.md (documentation phases)
  - **docs/guides/** : Checklists validation composants
  - **docs/scripts/** : Scripts DevTools (F12 Console)

## 🎨 Design System "Tech & Nature"

### Palette Couleurs

- **Bleu Océan** : `#0066CC` (tech, moderne)
- **Vert Éco** : `#2ECC71` (nature, durable)
- **Gradients** : Bleu → Vert (hero, CTA)

### Typography Variants

```typescript
<Typography variant="h1">      // 48px/60px, font-bold
<Typography variant="h2">      // 36px/44px, font-bold
<Typography variant="h3">      // 30px/38px, font-semibold
<Typography variant="h4">      // 24px/32px, font-semibold
<Typography variant="body">    // 16px/24px, font-normal
<Typography variant="body-large"> // 18px/28px
<Typography variant="caption">  // 14px/20px, text-gray-600
```

### Button Variants

```typescript
<Button variant="primary">   // Bleu océan, bold
<Button variant="secondary"> // Vert éco, outlined
<Button variant="outline">   // Transparent, border
<Button size="small">        // px-3 py-1.5, text-sm
<Button size="medium">       // px-4 py-2
<Button size="large">        // px-6 py-3, text-lg
```

### Card Variants

```typescript
<Card variant="default">      // Carte standard
<Card variant="project">      // Projet portfolio
<Card variant="skill">        // Compétence technique
<Card variant="experience">   // Expérience pro
<Card variant="testimonial">  // Témoignage client
```

## 🚫 Règles CRITIQUES Phase 4

### 1. Réutilisation Design System (OBLIGATOIRE)

```typescript
// ❌ INTERDIT
<h2 className="text-3xl font-bold">Titre</h2>
<button className="bg-blue-600">Clic</button>

// ✅ CORRECT
<Typography variant="h2">Titre</Typography>
<Button variant="primary">Clic</Button>
```

### 2. Accessibilité Clavier (WCAG 2.1 AA)

```typescript
// ❌ INTERDIT - Non focusable
<li onClick={handleClick}>Item</li>

// ✅ CORRECT - Focusable + visible
<button
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
  className="focus:ring-2 focus:ring-sky-400"
>
  Item
</button>
```

**Exigences** :

- Tous éléments interactifs focusables (Tab/Shift+Tab)
- Focus visible OBLIGATOIRE (`focus:ring-2 focus:ring-sky-400`)
- Support clavier (Enter/Space/Escape)
- Tests accessibilité dans `.test.tsx`

### 3. TDD Workflow (RED-GREEN-REFACTOR)

```bash
# 1️⃣ ANALYSER composants existants
@explore-codebase "Analyser Hero.tsx patterns composition"

# 2️⃣ RED - Tests qui échouent
npm test Skills.test.tsx  # Watch mode

# 3️⃣ GREEN - Code minimal
# Implémenter Skills.tsx

# 4️⃣ REFACTOR - Validation complète
npm run test:coverage:threads

# 5️⃣ COMMIT
/commit "feat(skills): add Skills component TDD"
```

### 4. Contraintes Visuelles Phase 4

```typescript
// ❌ INTERDIT Skills component
- Badges niveau (beginner/advanced/expert)
- Jauges progression
- Étoiles notation

// ✅ AUTORISÉ
- Nom compétence simple
- Groupement par catégorie
- Style minimal Card + Typography
```

### 5. Pages Demo Max 100 Lignes

```typescript
// ❌ INTERDIT - 65 skills
const skills = [
  /* ... 65 items */
];

// ✅ CORRECT - 5-10 exemples
const skills = [
  { name: "React", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Docker", category: "DevOps" },
  // Max 5-10 items
];
```

## 🤖 Agents Haiku Disponibles (15x moins cher)

**Ces agents utilisent le workspace `.claude` configuré dans `~/.claude/agents/`**

```bash
# 🔍 Exploration Codebase
@explore-codebase "chercher patterns Hero.tsx composition"
  → Utilise Grep/Glob pour analyser fichiers projet
  → Retourne snippets code pertinents avec chemins/lignes

@quick-search "find Card variant implementations"
  → Recherche lightning <30s (Grep direct)
  → Max 3-5 fichiers lus

# 📚 Documentation Externe
@explore-docs "React Server Components Next.js 15"
  → Context7 + WebFetch pour docs officielles
  → Retourne exemples code + API specs

@websearch "WCAG 2.1 keyboard navigation requirements"
  → Recherche web sources fiables
  → Synthèse concise avec références

# 🛠️ Génération Code
@snipper "générer Skills.tsx avec Typography/Card"
  → Génère code suivant patterns existants
  → Utilise templates Haiku (économique)

@action "vérifier dépendances inutilisées package.json"
  → Actions conditionnelles rapides
  → Validation/vérification automatisée

@fix-grammar "corriger orthographe docs/README.md"
  → Corrections grammaire/orthographe
  → Préserve formatage Markdown
```

**RÈGLE CRITIQUE** : TOUJOURS utiliser agents Haiku AVANT outils directs (Bash/Read/Grep)

- Agents = 15x moins cher que Sonnet
- Parallélisation possible pour gain temps
- Résultats structurés et pertinents

## ⚙️ Commands Custom Workflows

**Ces commands utilisent le workspace `.claude` configuré dans `~/.claude/commands/`**

```bash
# 🎯 Workflows Systématiques
/apex "développer Skills component"
  → APEX: Analyze (agents) → Plan (détaillé) → Execute (code) → eXamine (tests)
  → Utilise agents parallèles phase Analyze
  → Demande validation avant Execute
  → Workflow complet pour features complexes

/oneshot "ajouter bouton export CSV"
  → Ultra-rapide: Explore (5-10min) → Code (patterns) → Test (lint/typecheck)
  → Pas de planning, action directe
  → Idéal features simples <10min

# 🔍 Recherche & Analyse
/quick-search "où est défini handleSubmit?"
  → Recherche lightning <30s (Grep/Glob direct, pas agents)
  → Réponse concise avec fichier:ligne
  → Max 3-5 fichiers lus

/explain "expliquer architecture Design System"
  → Analyse approfondie code/patterns
  → Diagrammes si pertinent
  → Explications pédagogiques

# 🚀 Automation
/run-tasks "feature/issue-123"
  → EPCT workflow avec GitHub integration
  → Fetch issue → Explore → Plan → Code → Test → PR
  → Label "processing" auto sur issue

/commit "feat(skills): add Skills TDD"
  → Commit atomique: git add -A + message + push
  → Message <50 chars convention
  → Pre-push hooks validés auto

/review
  → Review code qualité avant merge
  → Vérifie: patterns, tests, accessibilité, perf
  → Suggestions amélioration
```

**Quand Utiliser Quoi**

- **Feature complexe** (>30min) : `/apex` (systématique, validation user)
- **Feature simple** (<10min) : `/oneshot` (rapide, pas de planning)
- **Question rapide** : `/quick-search` (lightning <30s)
- **Comprendre code** : `/explain` (pédagogique)
- **GitHub issue** : `/run-tasks` (EPCT + PR auto)
- **Commit rapide** : `/commit` (atomique + hooks)

## ✅ Checklist Validation Avant Commit

- [ ] **Composants Design System utilisés** (pas HTML brut)
- [ ] **Accessibilité clavier complète** (Tab, focus visible)
- [ ] **Tests TDD complets** (render, props, ARIA, keyboard)
- [ ] **Coverage >90%** (`npm run test:coverage:threads`)
- [ ] **Page demo <100 lignes** (5-10 exemples)
- [ ] **Pas features non demandées** (badges, jauges)
- [ ] **Code analysé avec agents** (@explore-codebase, @snipper)

## 📊 Métriques Actuelles

- **Tests** : 294 tests passés ✅ (Skills 22 + useInView 11 tests)
- **Coverage** : 100% Skills component, ~87% global
- **Performance** : Hero <100ms, Skills <20ms TBT (desktop)
- **Lighthouse Desktop** : 89/100/100/100 (homepage), 90-100/100 autres pages ✅
- **Lighthouse Mobile** : 77/100/95/95/95 (homepage) ⚠️ (-8 vs objectif 85)
- **Security** : 4 low vulns allowlistées (dev deps uniquement) ✅
- **Bundle Size** : 119 kB First Load JS (Skills + useInView +17 kB)
- **Pre-push hook** : Format + Lint + Tests threads automatique

## 🎯 Objectifs Phase 4 Restants

- [x] **Skills** : Grille compétences catégorisées (✅ TDD terminé, Option 3 Enrichi, 22 tests, 100% coverage)
- [x] **Animations Scroll Skills** : useInView hook avec fade-in/slide-up + stagger delays (✅ WCAG prefers-reduced-motion)
- [x] **Intégration Skills** : Skills intégré dans src/app/page.tsx après Hero (✅ production ready)
- [x] **Data centralisée** : src/data/portfolioSkills.ts créé (32 compétences réelles)
- [x] **Lighthouse fix** : throttlingMethod "provided" ajouté (✅ aligné Chrome DevTools 89-100/100)
- [ ] **Optimisation Mobile** : Améliorer Lighthouse Mobile 77→85+ (lazy load ou simplifier animations)
- [ ] **Timeline** : Formation + Expériences
- [ ] **ProjectCard** : Cards projets enrichis
- [ ] **Testimonial** : Recommandations clients
- [ ] **Footer** : Liens réseaux, mentions légales

## 🔗 Références Rapides

- **docs/phases/PHASE_4_TDD_CONTENT_SECTIONS.md** : Checklist Phase 4 détaillée
- **docs/design/CHARTE_GRAPHIQUE.md** : Design System complet (couleurs, typographie, composants)
- **docs/guides/** : Checklists validation par composant (BUTTON_TESTING_CHECKLIST.md, HERO_TESTING_CHECKLIST.md, etc.)
- **docs/scripts/** : Scripts DevTools F12 pour validation manuelle (BUTTON_TEST_SCRIPT.js, HERO_TEST_SCRIPT.js, etc.)
- **docs/core/TECHNICAL_DOCUMENTATION.md** : Documentation technique architecture complète

---

**NOTE** : Ce fichier CLAUDE.md contient TOUTES les règles essentielles. Pour détails approfondis, consulter `docs/` ci-dessus.
