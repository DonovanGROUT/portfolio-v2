# 🎨 CHARTE GRAPHIQUE PORTFOLIO DONOVAN GROUT

## 🎯 Concept Créatif

### **"Tech & Nature" - L'équilibre entre innovation technologique et respect environnemental**

Inspiration :

- 🌊 Côtes normandes (bleus océan, verts nature)
- 🏃‍♂️ Dynamisme sportif (lignes fluides, animations subtiles)
- ✨ Fantastique/SF (touches futuristes discrètes)
- 🔒 Fiabilité technique (contrastes nets, géométrie)

---

## 🎨 PALETTE DE COULEURS

### Couleurs Primaires

- **Bleu Océan Principal** : `#0369a1` (blue-700) - Confiance, tech, océan normand
- **Bleu Profond** : `#075985` (blue-800) - Sérieux, expertise
- **Bleu Clair** : `#0ea5e9` (blue-500) - Innovation, dynamisme

### Couleurs Secondaires

- **Vert Éco** : `#047857` (emerald-700) - Éco-conception, nature **WCAG AA**
- **Vert Clair** : `#10b981` (emerald-500) - Succès, validation
- **Vert Foncé** : `#064e3b` (emerald-800) - Stabilité naturelle

### Couleurs Neutres

- **Gris Slate Principal** : `#374151` (gray-700) - Texte principal, modernité
- **Gris Clair** : `#6b7280` (gray-500) - Texte secondaire
- **Gris Très Clair** : `#f3f4f6` (gray-100) - Arrière-plans
- **Blanc Pur** : `#ffffff` - Clarté, espaces

### Couleurs d'État

- **Rouge Erreur** : `#dc2626` (red-600) - Erreurs, alertes
- **Orange Attention** : `#ea580c` (orange-600) - Warnings
- **Violet Accent** : `#7c3aed` (violet-600) - Touches créatives (SF/Fantasy)

---

## 🔤 TYPOGRAPHIE

### Police Principale : **Inter** (Google Fonts)

- Moderne, lisible, tech-friendly
- Support excellent des caractères spéciaux
- Optimisée pour les écrans

### Hiérarchie

- **H1** : 2.5rem (40px) / font-bold / leading-tight
- **H2** : 2rem (32px) / font-semibold / leading-snug
- **H3** : 1.5rem (24px) / font-medium / leading-relaxed
- **Body** : 1rem (16px) / font-normal / leading-relaxed
- **Caption** : 0.875rem (14px) / font-medium / leading-normal

---

## 🎭 STYLE VISUEL

### Formes & Géométrie

- **Radius** : Coins arrondis modérés (8px standard, 12px pour cartes)
- **Ombres** : Subtiles, évoquant la profondeur sans lourdeur
- **Lignes** : Nettes pour la tech, courbes pour l'humain

### Animations

- **Transitions** : 200-300ms ease-in-out (fluidité sportive)
- **Hover effects** : Élévation douce, changements de couleur progressifs
- **Loading states** : Animations circulaires rappelant le mouvement

### Iconographie

- **Style** : Line icons (Lucide/Heroicons)
- **Cohérence** : Stroke width uniforme (1.5px)
- **Taille** : 24px standard, 20px pour inline, 32px pour highlights

---

## 📱 RESPONSIVE & ACCESSIBILITÉ

### Breakpoints

- **Mobile** : 320px-768px (mobile-first)
- **Tablet** : 768px-1024px
- **Desktop** : 1024px+

### Contraste WCAG 2.1 AA

- ✅ Bleu principal (#0369a1) sur blanc : 8.2:1
- ✅ Gris texte (#374151) sur blanc : 10.7:1
- ✅ Vert éco (#047857) sur blanc : 6.1:1

### Touch Targets

- **Minimum** : 44px x 44px (WCAG)
- **Recommandé** : 48px x 48px pour confort

---

## 🌱 ÉCO-CONCEPTION

### Optimisations

- **Images** : WebP/AVIF, lazy loading
- **Animations** : Respectent `prefers-reduced-motion`
- **Fonts** : Variable fonts, subset optimized
- **Bundle** : Code splitting, tree shaking

### Performance Targets

- **First Contentful Paint** : < 1.5s
- **Largest Contentful Paint** : < 2.5s
- **Cumulative Layout Shift** : < 0.1

---

## 🎪 EXEMPLES D'APPLICATION

### Boutons

```bash
# Call-to-Action Principal (CTAs sur fonds colorés)
Primary CTA : Vert éco (#047857) + Blanc **WCAG AA** - Contraste maximal sur Hero bleu

# Actions Secondaires
Secondary : Bleu océan (#0369a1) + Blanc - Actions standards, liens importants

# Boutons Outline (sur fonds colorés)
Outline White : Transparent + Border blanc - CTAs secondaires sur Hero bleu
Outline : Transparent + Border bleu océan - Actions tertiaires sur fond blanc

# États de succès
Success : Vert éco (#047857) + Blanc
```

### Cards/Sections

```bash
Background : Blanc + ombre douce
Header : Gradient bleu subtil
Accent : Vert éco pour highlights
```

### Navigation

```bash
Active : Bleu océan
Hover : Bleu clair
Inactive : Gris slate
```

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ **Mise à jour du système de couleurs** (`/src/lib/colors.ts`)
2. ✅ **Customisation des boutons** avec la nouvelle palette (TERMINÉ)
3. ✅ **Développement Typography** avec Inter (TERMINÉ)
4. ✅ **Tests de contraste** et validation WCAG (TERMINÉ)
5. ✅ **Développement Card Component** avec thème "Tech & Nature" (TERMINÉ)
6. ✅ **Finalisation Navigation** responsive (TERMINÉ)
7. ✅ **Développement Modal Component** avec overlay et focus trap (TERMINÉ)
8. ⏳ **Form Controls** : Inputs, validation, formulaires
9. ⏳ **Intégration Portfolio Sections**
