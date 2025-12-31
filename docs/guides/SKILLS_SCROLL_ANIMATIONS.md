# 🎬 Skills Scroll Animations - Documentation

## 📋 Vue d'ensemble

Implémentation d'animations d'apparition au scroll pour les catégories du composant Skills.  
Chaque catégorie (Frontend, Backend, Qualité & Sécurité, Outils & Méthodologie) apparaît avec une animation **fade-in + slide-up** lorsqu'elle entre dans le viewport.

---

## 🎯 Objectifs

- ✅ **UX dynamique** : Animations fluides au scroll
- ✅ **Performance** : IntersectionObserver natif (pas de librairie externe)
- ✅ **Accessibilité** : Respect de `prefers-reduced-motion` (WCAG 2.1 AA)
- ✅ **Stagger effect** : Décalage progressif entre catégories
- ✅ **TDD** : 11 tests pour le hook `useInView`
- ✅ **Cleanup** : Disconnect des observers au démontage

---

## 🛠️ Implémentation

### 1. Hook Custom `useInView`

**Fichier** : `src/hooks/useInView.ts`

```typescript
export function useInView<T extends HTMLElement = HTMLDivElement>(
  options: UseInViewOptions = {}
) {
  const { threshold = 0.1, rootMargin = "0px", triggerOnce = true } = options;

  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Respecter prefers-reduced-motion (WCAG)
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Si reduced-motion, afficher immédiatement
      setIsInView(true);
      setHasBeenInView(true);
      return;
    }

    // Créer l'observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry?.isIntersecting ?? false;

        if (inView) {
          setIsInView(true);
          setHasBeenInView(true);

          // Si triggerOnce, arrêter d'observer
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsInView(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    // Cleanup
    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isInView, hasBeenInView };
}
```

**Options** :

- `threshold` : Seuil de visibilité (0 = 1px visible, 1 = 100% visible)
- `rootMargin` : Marge avant déclenchement (ex: `-50px` = 50px avant viewport)
- `triggerOnce` : Déclencher une seule fois (défaut: `true`)

---

### 2. Composant `SkillCategory`

**Fichier** : `src/components/design-system/Skills/Skills.tsx`

```typescript
const SkillCategory: React.FC<SkillCategoryProps> = ({
  category,
  skills,
  emoji,
  customColor,
  index,
  onSkillClick,
  onKeyDown,
}) => {
  const { ref, isInView } = useInView({
    threshold: 0.1,
    rootMargin: '-50px',
    triggerOnce: true,
  });

  // Stagger delay: 100ms par catégorie (0ms, 100ms, 200ms, 300ms)
  const delay = index * 100;

  return (
    <div
      ref={ref}
      aria-label={`Compétences ${category}`}
      className={cn(
        'space-y-6 transition-all duration-700 ease-out',
        isInView
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-8'
      )}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {/* Contenu de la catégorie */}
    </div>
  );
};
```

**Animations** :

- **Fade-in** : `opacity-0` → `opacity-100`
- **Slide-up** : `translate-y-8` → `translate-y-0` (32px vers le haut)
- **Durée** : `700ms` avec `ease-out`
- **Stagger** : Délai progressif de 100ms entre catégories

---

## 🎨 Comportement

### Chronologie d'apparition

```
0ms   : Frontend apparaît (delay: 0ms)
100ms : Backend apparaît (delay: 100ms)
200ms : Qualité & Sécurité apparaît (delay: 200ms)
300ms : Outils & Méthodologie apparaît (delay: 300ms)
```

### Seuils de déclenchement

- **`threshold: 0.1`** : Animation déclenchée quand 10% de la catégorie est visible
- **`rootMargin: '-50px'`** : Animation déclenchée 50px avant que la catégorie entre dans le viewport
- **`triggerOnce: true`** : Animation jouée une seule fois (pas de re-déclenchement au scroll)

---

## ♿ Accessibilité

### `prefers-reduced-motion`

Le hook `useInView` respecte automatiquement la préférence utilisateur :

```typescript
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
  // Afficher immédiatement sans animation
  setIsInView(true);
  setHasBeenInView(true);
  return;
}
```

**Comportement** :

- ✅ Si `prefers-reduced-motion: reduce` → Pas d'animation, affichage immédiat
- ✅ Sinon → Animations normales au scroll

---

## 🧪 Tests

**Fichier** : `src/hooks/useInView.test.tsx`

**11 tests couvrant** :

1. **Basic Functionality** (3 tests)
   - Retourne `ref`, `isInView`, `hasBeenInView`
   - Crée IntersectionObserver avec options
   - Observe l'élément

2. **Intersection Detection** (2 tests)
   - `isInView` devient `true` quand élément entre dans viewport
   - `hasBeenInView` reste `true` après sortie du viewport

3. **Options** (4 tests)
   - Accepte `threshold` custom
   - Accepte `rootMargin` custom
   - Disconnect observer si `triggerOnce: true`
   - Ne disconnect pas si `triggerOnce: false`

4. **Accessibility** (1 test)
   - Respecte `prefers-reduced-motion` et affiche immédiatement

5. **Cleanup** (1 test)
   - Disconnect observer au démontage

**Résultat** : ✅ 11/11 tests passent

---

## 📊 Performance

### Avantages IntersectionObserver

- **GPU-accelerated** : Transitions CSS `transform` et `opacity`
- **Natif** : Pas de dépendance externe (0 KB ajouté au bundle)
- **Efficient** : Observer natif du navigateur (pas de scroll listeners)
- **Cleanup automatique** : Disconnect au démontage du composant

### Impact Bundle

- **useInView.ts** : ~2 KB (minifié + gzippé)
- **Skills.tsx** : +~1 KB (SkillCategory component)
- **Total** : ~3 KB ajoutés

---

## 🎓 Références

- [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
- [WCAG 2.1 AA - Animation](https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions)

---

## ✅ Checklist Validation

- [x] Hook `useInView` implémenté avec IntersectionObserver
- [x] Respect de `prefers-reduced-motion` (WCAG 2.1 AA)
- [x] 11 tests unitaires pour le hook
- [x] Animations fade-in + slide-up
- [x] Stagger effect (100ms entre catégories)
- [x] Cleanup des observers au démontage
- [x] 0 dépendance externe ajoutée
- [x] 294 tests passent (dont 11 nouveaux)
- [x] Build compile sans erreur
- [x] Lint et format OK

---

## 🚀 Test Visuel

Pour tester visuellement :

```bash
npm run dev
# Ouvrir http://localhost:3000
# Scroller vers la section Skills
# Observer les animations d'apparition progressive
```

**Astuce** : Activer `prefers-reduced-motion` dans DevTools pour tester l'accessibilité :

1. Ouvrir DevTools → Rendering
2. Cocher "Emulate CSS media feature prefers-reduced-motion"
3. Rafraîchir la page
4. ✅ Les catégories apparaissent immédiatement sans animation
