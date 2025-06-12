// Utilitaires généraux du portfolio - Design System
// Fonctions d'aide pour CSS, validation et sécurité

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utilitaire pour combiner des classes CSS de manière intelligente
 * Combine clsx pour la logique conditionnelle et tailwind-merge pour résoudre les conflits
 *
 * @param inputs - Classes CSS à combiner (strings, objects, arrays)
 * @returns String des classes CSS optimisées
 *
 * @example
 * ```tsx
 * // Classes conditionnelles
 * cn('btn', { 'btn-active': isActive }, className)
 *
 * // Résolution de conflits Tailwind
 * cn('bg-red-500', 'bg-blue-500') // résultat: 'bg-blue-500'
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Valide et sécurise une chaîne de caractères contre les attaques XSS
 *
 * @param input - Chaîne à sécuriser
 * @returns Chaîne sécurisée
 */
export function sanitizeInput(input: string): string {
  // Supprime les caractères dangereux
  return input
    .replace(/[<>]/g, '') // Supprime < et >
    .replace(/javascript:/gi, '') // Supprime javascript:
    .replace(/on\w+=/gi, '') // Supprime les handlers d'événements
    .trim();
}

/**
 * Valide un email selon RFC 5322 (version simplifiée)
 *
 * @param email - Email à valider
 * @returns true si l'email est valide
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254; // RFC 5321 limite
}

/**
 * Valide un numéro de téléphone français
 *
 * @param phone - Numéro à valider
 * @returns true si le numéro est valide
 */
export function isValidPhoneNumber(phone: string): boolean {
  // Format français : 0X XX XX XX XX ou +33 X XX XX XX XX
  const phoneRegex = /^(?:(?:\+33|0)[1-9])(?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

/**
 * Formate un nom/prénom en capitalisant correctement
 *
 * @param name - Nom à formater
 * @returns Nom formaté
 */
export function formatName(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Génère un token CSRF sécurisé
 *
 * @returns Token CSRF aléatoire
 */
export function generateCSRFToken(): string {
  if (typeof window !== 'undefined' && window.crypto) {
    // Utilise l'API Web Crypto si disponible
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join(
      ''
    );
  }

  // Fallback pour les environnements sans Web Crypto
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
