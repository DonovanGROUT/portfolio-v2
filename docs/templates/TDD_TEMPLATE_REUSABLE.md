# 🔄 TEMPLATE TDD RÉUTILISABLE - MÉTHODOLOGIE COMPLÈTE

## 🎯 **OBJECTIF**

Template complet pour développer n'importe quel projet web avec la méthodologie TDD stricte (Red → Green → Refactor) utilisée avec succès sur le portfolio Donovan GROUT.

**Résultats prouvés :**

- ✅ **Button Component** : Score Lighthouse 100/100, 13 tests unitaires, production ready
- ✅ **Pipeline CI/CD** : Déploiement automatique, quality gates
- ✅ **Architecture scalable** : Design System modulaire

---

## 📁 **STRUCTURE PROJET RECOMMANDÉE**

```bash
project-name/
├── docs/                           # 📚 Documentation
│   ├── PHASE_1_SETUP.md           # Configuration environnement
│   ├── PHASE_2_CICD.md            # Pipeline CI/CD
│   ├── PHASE_3_TDD.md             # Développement TDD
│   ├── CHARTE_GRAPHIQUE.md        # Design System
│   ├── TESTING_CHECKLIST.md       # Validation qualité
│   └── scripts/                   # Scripts de test
│       ├── aria-test.js           # Tests accessibilité
│       ├── devtools-test.js       # Validation technique
│       └── animation-test.js      # Tests animations
├── src/
│   ├── components/
│   │   └── design-system/         # 🎨 Composants réutilisables
│   │       ├── Button/
│   │       │   ├── Button.test.tsx    # ← TDD: Tests d'abord
│   │       │   └── Button.tsx         # ← Implémentation après
│   │       └── [Autres composants]/
│   ├── lib/                       # 🛠️ Utilitaires
│   │   ├── colors.ts              # Charte graphique centralisée
│   │   ├── utils.ts               # Fonctions + sécurité
│   │   └── types.ts               # Types TypeScript
│   └── app/                       # 📄 Pages/Routes
└── [Config files...]              # Package.json, tailwind, etc.
```

---

## 🔴🟢🔵 **MÉTHODOLOGIE TDD - 3 PHASES**

### **🔴 PHASE RED - TESTS FIRST**

#### **1. Analyse du Besoin**

```markdown
# Exemple: Button Component

- Quels variants ? (primary, secondary, outline)
- Quelles tailles ? (small, medium, large)
- Quels états ? (loading, disabled, hover)
- Accessibilité ? (ARIA, keyboard, touch targets)
- Sécurité ? (XSS protection, sanitization)
```

#### **2. Écriture des Tests (AVANT code)**

```typescript
// ComponentName.test.tsx - CRÉÉ EN PREMIER
describe('ComponentName - TDD Red Phase', () => {
  // 🔴 RED 1: Rendu basique
  test('should render with text content', () => {
    render(<ComponentName>Hello</ComponentName>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  // 🔴 RED 2: Variants
  test('should apply primary variant', () => {
    render(<ComponentName variant="primary">Text</ComponentName>);
    expect(screen.getByText('Text')).toHaveClass('bg-primary');
  });

  // 🔴 RED 3: Accessibilité
  test('should be keyboard accessible', () => {
    render(<ComponentName>Button</ComponentName>);
    const element = screen.getByRole('button');
    expect(element).toHaveAttribute('tabIndex', '0');
  });

  // ... 15-25 tests couvrant TOUS les cas
});
```

#### **3. Définition des Types**

```typescript
// Types d'abord, avant implémentation
export type ComponentVariant = "primary" | "secondary" | "outline";
export type ComponentSize = "small" | "medium" | "large";

export interface ComponentProps {
  variant?: ComponentVariant;
  size?: ComponentSize;
  children: React.ReactNode;
  className?: string;
  // ... props complètes
}
```

#### **4. Validation RED**

```bash
npm test ComponentName.test.tsx
# ❌ TOUS les tests DOIVENT échouer (pas de composant encore)
# ✅ C'est normal et attendu en phase RED
```

---

### **🟢 PHASE GREEN - IMPLÉMENTATION MINIMALE**

#### **1. Création du Composant**

```typescript
// ComponentName.tsx - CRÉÉ APRÈS les tests
export const ComponentName = ({ children, variant = 'primary', ...props }) => {
  // ⚠️ IMPLÉMENTATION MINIMALE pour faire passer les tests
  // Pas d'optimisation, focus sur la fonctionnalité

  const baseClasses = 'component-base';
  const variantClasses = {
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white',
    outline: 'border border-primary text-primary'
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]}`}
      {...props}
    >
      {children}
    </div>
  );
};
```

#### **2. Développement Itératif**

```bash
# Mode watch pour feedback continu
npm test ComponentName.test.tsx --watch

# Développer progressivement jusqu'à :
# ✅ TOUS les tests verts (100% pass rate)
```

#### **3. Validation GREEN**

```bash
npm test ComponentName.test.tsx
# ✅ 100% des tests doivent passer
# ✅ Couverture de code complète
# ⚠️ Code pas optimisé (normal en GREEN)
```

---

### **🔵 PHASE REFACTOR - OPTIMISATION**

#### **1. Amélioration sans Casser les Tests**

```typescript
// Optimisation du code précédent
const buttonVariants = {
  base: [
    'inline-flex items-center justify-center',
    'font-medium transition-colors duration-200',
    'focus:outline-none focus:ring-2',
    // ... classes optimisées
  ].join(' '),

  variants: {
    primary: 'bg-primary-700 hover:bg-primary-800 text-white',
    // ... variants optimisés
  }
};

export const ComponentName = forwardRef<HTMLElement, ComponentProps>(
  ({ variant = 'primary', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(buttonVariants.base, buttonVariants.variants[variant], className)}
        {...props}
      />
    );
  }
);
```

#### **2. Intégration Design System**

```typescript
// /src/lib/colors.ts - Charte centralisée
export const colors = {
  primary: { 700: "#yourcolor" },
  // ... palette complète
};

// Utilisation cohérente dans composants
const variantClasses = {
  primary: `bg-[${colors.primary[700]}] text-white`,
  // ... ou classes Tailwind correspondantes
};
```

#### **3. Tests de Régression**

```bash
# Validation que RIEN n'est cassé
npm test                        # Tous tests
npm run build                   # Build production
npm run lint                    # Qualité code

# ✅ Tous doivent passer sans régression
```

---

## 🧪 **TESTING STRATEGY COMPLÈTE**

### **1. Tests Automatisés**

```bash
# Tests unitaires (Vitest + Testing Library)
npm test [Component].test.tsx

# Tests d'intégration
npm test -- --coverage

# Quality gates
npm run lint
npm run type-check
npm run build
```

### **2. Tests Manuels**

```bash
# Checklist par composant
□ Visual testing (layout, couleurs)
□ Interaction testing (mouse, keyboard)
□ Responsive testing (mobile, tablet, desktop)
□ Accessibility testing (ARIA, contrast)
□ Performance testing (Lighthouse)
```

### **3. Scripts d'Aide (Copiables)**

```javascript
// aria-test.js - À coller dans Console DevTools
const elements = document.querySelectorAll("[role], button, input, a");
console.log("🔍 ARIA Test Results:");
elements.forEach((el, i) => {
  console.log(`Element ${i + 1}:`, {
    role: el.getAttribute("role") || el.tagName.toLowerCase(),
    "aria-label": el.getAttribute("aria-label"),
    "aria-disabled": el.getAttribute("aria-disabled"),
    tabIndex: el.tabIndex,
  });
});
```

---

## ♿ **ACCESSIBILITÉ WCAG 2.1 AA**

### **Standards à Respecter**

```typescript
// Checklist obligatoire par composant
const accessibilityChecklist = {
  contrast: "Minimum 4.5:1 (AA) ou 7:1 (AAA)",
  keyboard: "Tab, Enter, Space, Arrow keys",
  aria: "Roles, states, properties appropriés",
  touchTargets: "Minimum 44px × 44px",
  focusManagement: "Visible et logique",
  semantics: "HTML sémantique correct",
};
```

### **Tests Accessibilité**

```bash
# Lighthouse audit
# F12 > Lighthouse > Accessibility only
# Target: Score 95+ minimum

# Tests manuels
□ Navigation clavier uniquement
□ Mode contraste élevé
□ Zoom 200% (lisibilité)
□ Screen reader (optionnel)
```

---

## 🔒 **SÉCURITÉ WEB**

### **Protections Obligatoires**

```typescript
// /src/lib/security.ts
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, "") // HTML injection
    .replace(/javascript:/gi, "") // JS injection
    .replace(/on\w+=/gi, "") // Event handlers
    .trim();
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// CSP Headers (Next.js config)
const cspHeader = `
  default-src 'self';
  script-src 'self';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: blob:;
  connect-src 'self';
`;
```

---

## 🎨 **DESIGN SYSTEM SCALABLE**

### **1. Charte Graphique Centralisée**

```typescript
// /src/lib/design-system.ts
export const designSystem = {
  colors: {
    primary: { 700: "#primary-color" },
    secondary: { 700: "#secondary-color" },
    neutral: { 700: "#text-color" },
  },

  typography: {
    h1: "text-4xl font-bold leading-tight",
    h2: "text-3xl font-semibold leading-snug",
    body: "text-base leading-relaxed",
    caption: "text-sm leading-normal",
  },

  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
  },

  breakpoints: {
    mobile: "320px",
    tablet: "768px",
    desktop: "1024px",
  },
};
```

### **2. Composants Modulaires**

```typescript
// Pattern de composant réutilisable
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  variant?: string;
  size?: string;
}

export const createComponent = <T extends BaseComponentProps>(
  displayName: string,
  defaultClasses: string,
  variants: Record<string, string>
) => {
  const Component = ({ variant = 'default', className, ...props }: T) => {
    return (
      <div
        className={cn(defaultClasses, variants[variant], className)}
        {...props}
      />
    );
  };

  Component.displayName = displayName;
  return Component;
};
```

---

## 🚀 **CI/CD PIPELINE**

### **GitHub Actions Template**

```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: "18"
          cache: "npm"

      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm test -- --coverage
      - run: npm run build

  deploy-preview:
    if: github.event_name == 'pull_request'
    needs: test
    # Déploiement preview (Vercel/Netlify)

  deploy-production:
    if: github.ref == 'refs/heads/main'
    needs: test
    # Déploiement production
```

### **Quality Gates**

```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "vitest",
    "test:coverage": "vitest --coverage",
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "check": "npm run lint && npm run type-check && npm test && npm run build"
  }
}
```

---

## 📊 **MÉTRIQUES DE QUALITÉ**

### **Targets par Composant**

```bash
✅ Tests unitaires : 95%+ couverture
✅ Lighthouse Accessibility : 95+ score
✅ Lighthouse Performance : 90+ score
✅ Bundle size : <10kB par composant
✅ Build time : <30s total
✅ Zero console errors : Production clean
```

### **Validation Continue**

```bash
# Scripts de monitoring
npm run test:watch              # TDD feedback loop
npm run build:analyze           # Bundle analysis
npm run lighthouse:ci           # Performance monitoring
```

---

## 🎯 **CHECKLIST PROJET COMPLET**

### **Setup Initial (Phase 1)**

- [ ] ✅ Next.js + TypeScript + Tailwind
- [ ] ✅ Vitest + Testing Library setup
- [ ] ✅ ESLint + Prettier configuration
- [ ] ✅ Git hooks + pre-commit validation

### **CI/CD (Phase 2)**

- [ ] ✅ GitHub Actions pipeline
- [ ] ✅ Automated testing on PR
- [ ] ✅ Preview deployments
- [ ] ✅ Production deployment

### **Development (Phase 3)**

- [ ] ✅ Design System foundations
- [ ] ✅ TDD methodology per component
- [ ] ✅ Accessibility WCAG compliance
- [ ] ✅ Security best practices
- [ ] ✅ Performance optimization

### **Production (Phase 4)**

- [ ] ✅ Content integration
- [ ] ✅ SEO optimization
- [ ] ✅ Analytics setup
- [ ] ✅ Monitoring & maintenance

---

## 💡 **CONSEILS POUR RÉUTILISATION**

### **1. Adaptation du Template**

```bash
# Customiser selon le projet
1. Modifier /src/lib/colors.ts → Votre charte graphique
2. Adapter /docs/CHARTE_GRAPHIQUE.md → Votre concept
3. Configurer CI/CD → Vos environnements
4. Ajuster tests → Vos requirements spécifiques
```

### **2. Components Prioritaires**

```bash
# Ordre de développement recommandé
1. Button → Base interactions
2. Typography → Système textuel
3. Card → Conteneurs layouts
4. Navigation → UX globale
5. Forms → Interactions utilisateur
```

### **3. Gains de Temps Estimés**

```bash
✅ Setup environnement : 2-3h → 30min
✅ Pipeline CI/CD : 1-2 jours → 2h
✅ Methodologie TDD : 1 semaine → 1 jour
✅ Design System : 1 semaine → 2-3 jours
✅ Tests automatisés : 2-3 jours → 1 jour

=> Gain total : ~2 semaines sur projet 1 mois
```

---

## 🏆 **RÉSULTATS PROUVÉS - PORTFOLIO DONOVAN**

### **Button Component (Référence)**

- ✅ **TDD Complet** : Red → Green → Refactor
- ✅ **13 tests unitaires** : 100% pass rate
- ✅ **48 tests intégration** : Validation complète
- ✅ **Lighthouse 100/100** : Accessibilité parfaite
- ✅ **9.84kB optimisé** : Performance excellente
- ✅ **Production ready** : Déployé sans bugs

### **Architecture Validée**

- ✅ **Scalable** : Ajout composants simple
- ✅ **Maintenable** : Code modulaire et testé
- ✅ **Performant** : Bundle optimisé automatiquement
- ✅ **Sécurisé** : Protections intégrées
- ✅ **Accessible** : WCAG 2.1 AA by design

**🚀 Ce template est prêt pour n'importe quel projet web moderne !**
