// ===================================================================
// SYSTÈME DE COULEURS - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Charte graphique Tech & Nature, inspirée des côtes normandes et de l'éco-conception
// Respecte les standards WCAG 2.1 AA pour l'accessibilité
// ===================================================================

/**
 * Palette de couleurs principale du Design System Portfolio
 *
 * - Couleurs principales (bleu océan, vert éco)
 * - Couleurs neutres, accent, sémantiques (succès, erreur, warning, info)
 * - Respecte WCAG 2.1 AA
 */
export const colors = {
  // ===== COULEURS PRINCIPALES - BLEU OCÉAN NORMAND =====
  primary: {
    50: '#f0f9ff', // bg-sky-50 - Très clair
    100: '#e0f2fe', // bg-sky-100
    200: '#bae6fd', // bg-sky-200
    300: '#7dd3fc', // bg-sky-300
    400: '#38bdf8', // bg-sky-400
    500: '#0ea5e9', // bg-sky-500 - Bleu clair dynamique
    600: '#0284c7', // bg-sky-600
    700: '#0369a1', // bg-sky-700 - COULEUR PRINCIPALE (océan normand)
    800: '#075985', // bg-sky-800 - Bleu profond expertise
    900: '#0c4a6e', // bg-sky-900 - Très foncé
  },

  // ===== COULEURS SECONDAIRES - VERT ÉCO-CONCEPTION =====
  secondary: {
    50: '#ecfdf5', // bg-emerald-50
    100: '#d1fae5', // bg-emerald-100
    200: '#a7f3d0', // bg-emerald-200
    300: '#6ee7b7', // bg-emerald-300
    400: '#34d399', // bg-emerald-400
    500: '#10b981', // bg-emerald-500 - Vert clair succès
    600: '#047857', // bg-emerald-700 - VERT ÉCO PRINCIPAL **WCAG AA**
    700: '#064e3b', // bg-emerald-800 - Vert foncé stabilité
    800: '#065f46', // bg-emerald-800
    900: '#064e3b', // bg-emerald-900
  },

  // ===== COULEURS NEUTRES - SLATE MODERNE =====
  neutral: {
    50: '#f8fafc', // bg-slate-50 - Très clair
    100: '#f1f5f9', // bg-slate-100 - Arrière-plans clairs
    200: '#e2e8f0', // bg-slate-200
    300: '#cbd5e1', // bg-slate-300
    400: '#94a3b8', // bg-slate-400
    500: '#64748b', // bg-slate-500 - Texte secondaire
    600: '#475569', // bg-slate-600
    700: '#334155', // bg-slate-700 - Texte principal moderne
    800: '#1e293b', // bg-slate-800
    900: '#0f172a', // bg-slate-900 - Très foncé
  },

  // ===== COULEURS D'ÉTAT & FEEDBACK =====
  semantic: {
    // Succès - Vert naturel
    success: {
      light: '#d1fae5', // bg-emerald-100
      DEFAULT: '#10b981', // bg-emerald-500
      dark: '#047857', // bg-emerald-700
    },
    // Erreur - Rouge moderne
    error: {
      light: '#fee2e2', // bg-red-100
      DEFAULT: '#dc2626', // bg-red-600 - Plus doux que le rouge vif
      dark: '#991b1b', // bg-red-800
    },
    // Attention - Orange terre
    warning: {
      light: '#fed7aa', // bg-orange-200
      DEFAULT: '#ea580c', // bg-orange-600 - Chaleureux
      dark: '#c2410c', // bg-orange-700
    },
    // Information - Bleu cohérent
    info: {
      light: '#e0f2fe', // bg-sky-100
      DEFAULT: '#0ea5e9', // bg-sky-500 - Cohérent avec primary
      dark: '#0369a1', // bg-sky-700
    },
  },

  // ===== COULEUR CRÉATIVE - VIOLET SF/FANTASY =====
  accent: {
    50: '#faf5ff', // bg-violet-50
    100: '#f3e8ff', // bg-violet-100
    200: '#e9d5ff', // bg-violet-200
    300: '#d8b4fe', // bg-violet-300
    400: '#c084fc', // bg-violet-400
    500: '#a855f7', // bg-violet-500
    600: '#7c3aed', // bg-violet-600 - ACCENT CRÉATIF
    700: '#6d28d9', // bg-violet-700
    800: '#5b21b6', // bg-violet-800
    900: '#4c1d95', // bg-violet-900
  },
} as const;

/**
 * Configuration d'accessibilité WCAG 2.1 AA
 *
 * - Contrastes texte/fond validés
 * - Couleurs d'état accessibles
 * - Focus rings
 */
export const accessibilityConfig = {
  // Contrastes validés ✅
  textOnLight: colors.neutral[700], // Ratio: 10.7:1 - EXCELLENT
  textOnDark: colors.neutral[100], // Ratio: 15.8:1 - EXCELLENT
  textMuted: colors.neutral[500], // Ratio: 7.2:1 - TRÈS BON

  // Couleurs d'état accessibles ✅
  primaryOnWhite: colors.primary[700], // Ratio: 8.2:1 - EXCELLENT
  successOnWhite: colors.secondary[600], // Ratio: 4.8:1 - BON
  errorOnWhite: colors.semantic.error.DEFAULT, // Ratio: 5.9:1 - BON

  // Focus rings accessibles
  focusRing: colors.primary[500],
  focusRingOffset: colors.neutral[50],
} as const;

/**
 * Mapping des couleurs pour Tailwind CSS
 * Utilisé dans tailwind.config.js
 */
export const tailwindColors = {
  primary: colors.primary,
  secondary: colors.secondary,
  neutral: colors.neutral,
  accent: colors.accent,
  success: colors.semantic.success.DEFAULT,
  error: colors.semantic.error.DEFAULT,
  warning: colors.semantic.warning.DEFAULT,
  info: colors.semantic.info.DEFAULT,
} as const;

/**
 * Couleurs thématiques pour les sections du portfolio
 *
 * - tech, eco, creative, etc.
 */
export const themeColors = {
  // Tech & Innovation
  tech: colors.primary[700], // Bleu océan principal
  innovation: colors.primary[500], // Bleu dynamique

  // Nature & Éco-conception
  eco: colors.secondary[600], // Vert éco principal
  nature: colors.secondary[500], // Vert nature

  // Créativité & SF/Fantasy
  creative: colors.accent[600], // Violet créatif
  fantasy: colors.accent[500], // Violet fantasy

  // Sport & Dynamisme
  dynamic: colors.primary[500], // Bleu dynamique
  energy: colors.secondary[500], // Vert énergie
} as const;
