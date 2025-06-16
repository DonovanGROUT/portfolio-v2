// Tests unitaires pour les utilitaires du portfolio
import { describe, it, expect } from 'vitest';
import {
  cn,
  sanitizeInput,
  isValidEmail,
  isValidPhoneNumber,
  formatName,
  generateCSRFToken,
} from './utils';

describe('Utils Module', () => {
  describe('cn - Utility classnames', () => {
    it('devrait fusionner des classes standard', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('devrait appliquer les classes conditionnelles', () => {
      expect(cn('base', { active: true, disabled: false })).toBe('base active');
    });

    it('devrait résoudre les conflits Tailwind', () => {
      expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    });
  });

  describe('sanitizeInput', () => {
    it('devrait retourner une chaîne inchangée si elle est déjà sûre', () => {
      const safeString = 'Ceci est un texte normal';
      expect(sanitizeInput(safeString)).toBe(safeString);
    });

    it('devrait supprimer les balises HTML dangereuses', () => {
      const dangerousString = '<script>alert("XSS")</script>Hello';
      expect(sanitizeInput(dangerousString)).toBe(
        'scriptalert("XSS")/scriptHello'
      );
    });

    it('devrait supprimer les protocoles javascript:', () => {
      const dangerousString = 'javascript:alert("Danger")';
      expect(sanitizeInput(dangerousString)).toBe('alert("Danger")');
    });
  });

  describe('isValidEmail', () => {
    it("devrait valider les formats d'emails corrects", () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('nom.prenom@domaine.co.uk')).toBe(true);
    });

    it("devrait rejeter les formats d'emails incorrects", () => {
      expect(isValidEmail('test')).toBe(false);
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@domain')).toBe(false);
      expect(isValidEmail('@domain.com')).toBe(false);
    });
  });

  describe('isValidPhoneNumber', () => {
    it('devrait valider les formats français standards', () => {
      expect(isValidPhoneNumber('0612345678')).toBe(true);
      expect(isValidPhoneNumber('06 12 34 56 78')).toBe(true);
    });

    it('devrait rejeter les formats de téléphone incorrects', () => {
      expect(isValidPhoneNumber('123456')).toBe(false);
      expect(isValidPhoneNumber('text')).toBe(false);
    });
  });

  describe('formatName', () => {
    it('devrait formater correctement un nom simple', () => {
      expect(formatName('jean')).toBe('Jean');
      expect(formatName('MARIE')).toBe('Marie');
    });

    it('devrait formater correctement un nom composé', () => {
      expect(formatName('jean pierre')).toBe('Jean Pierre');
    });
  });

  describe('generateCSRFToken', () => {
    it('devrait générer un token non vide', () => {
      const token = generateCSRFToken();
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(8);
    });

    it('devrait générer des tokens uniques à chaque appel', () => {
      const token1 = generateCSRFToken();
      const token2 = generateCSRFToken();
      expect(token1).not.toBe(token2);
    });

    it("devrait utiliser le fallback Math.random quand window.crypto n'est pas disponible", () => {
      // Sauvegarder l'état original
      const originalWindow = typeof window !== 'undefined' ? window : undefined;

      // Mock d'un environnement sans window (Node.js-like)
      Object.defineProperty(globalThis, 'window', {
        value: undefined,
        configurable: true,
      });

      const token = generateCSRFToken();
      expect(token).toBeTruthy();
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(8);

      // Restaurer l'état original
      if (originalWindow) {
        Object.defineProperty(globalThis, 'window', {
          value: originalWindow,
          configurable: true,
        });
      }
    });
  });
});
