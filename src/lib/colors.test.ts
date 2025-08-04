// ===================================================================
// TESTS UNITAIRES POUR LA BIBLIOTHÈQUE DE COULEURS - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Tests de couleurs primaires, secondaires, sémantiques, accessibilité, mapping Tailwind, thèmes
// ===================================================================
import { describe, it, expect } from 'vitest';
import {
  colors,
  accessibilityConfig,
  tailwindColors,
  themeColors,
} from './colors';

describe('Colors Module - Design System', () => {
  describe('Primary Colors', () => {
    it('devrait définir le jeu complet de couleurs primaires', () => {
      expect(colors.primary).toBeDefined();
      expect(Object.keys(colors.primary).length).toBe(10);

      // Vérification des nuances spécifiques
      expect(colors.primary[50]).toBe('#f0f9ff');
      expect(colors.primary[700]).toBe('#0369a1');
    });

    it('devrait avoir des valeurs hexadécimales valides', () => {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;

      Object.values(colors.primary).forEach(color => {
        expect(color).toMatch(hexRegex);
      });
    });
  });

  describe('Secondary Colors', () => {
    it('devrait définir le jeu complet de couleurs secondaires', () => {
      expect(colors.secondary).toBeDefined();
      expect(Object.keys(colors.secondary).length).toBe(10);

      expect(colors.secondary[50]).toBe('#ecfdf5');
      expect(colors.secondary[600]).toBe('#047857');
    });
  });

  describe('Semantic Colors', () => {
    it('devrait définir toutes les catégories sémantiques', () => {
      expect(colors.semantic).toBeDefined();
      expect(Object.keys(colors.semantic).length).toBe(4);

      expect(colors.semantic.success).toBeDefined();
      expect(colors.semantic.error).toBeDefined();
      expect(colors.semantic.warning).toBeDefined();
      expect(colors.semantic.info).toBeDefined();
    });

    it('devrait définir les variantes pour success', () => {
      expect(colors.semantic.success.light).toBeDefined();
      expect(colors.semantic.success.DEFAULT).toBe('#10b981');
      expect(colors.semantic.success.dark).toBeDefined();
    });

    it('devrait définir les variantes pour error', () => {
      expect(colors.semantic.error.light).toBeDefined();
      expect(colors.semantic.error.DEFAULT).toBe('#dc2626');
      expect(colors.semantic.error.dark).toBeDefined();
    });
  });

  describe('Accessibility Configuration', () => {
    it("devrait définir les couleurs pour l'accessibilité WCAG", () => {
      expect(accessibilityConfig).toBeDefined();

      expect(accessibilityConfig.textOnLight).toBe(colors.neutral[700]);
      expect(accessibilityConfig.textOnDark).toBe(colors.neutral[100]);
      expect(accessibilityConfig.primaryOnWhite).toBe(colors.primary[700]);
    });
  });

  describe('Tailwind Colors', () => {
    it('devrait mapper correctement les couleurs pour Tailwind', () => {
      expect(tailwindColors).toBeDefined();

      expect(tailwindColors.primary).toEqual(colors.primary);
      expect(tailwindColors.secondary).toEqual(colors.secondary);
      expect(tailwindColors.success).toBe(colors.semantic.success.DEFAULT);
      expect(tailwindColors.error).toBe(colors.semantic.error.DEFAULT);
    });
  });

  describe('Theme Colors', () => {
    it('devrait définir les couleurs thématiques', () => {
      expect(themeColors).toBeDefined();

      expect(themeColors.tech).toBe(colors.primary[700]);
      expect(themeColors.eco).toBe(colors.secondary[600]);
      expect(themeColors.creative).toBe(colors.accent[600]);
    });
  });
});
