'use client';

import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Props du Hero Component
 */
export interface HeroProps {
  /** Nom affiché (H1) */
  name: string;
  /** Titre professionnel (H2) */
  title: string;
  /** Sous-titre / description courte */
  subtitle: string;
  /** Localisation géographique */
  location: string;
  /** CTA primaire personnalisé */
  primaryCta?: {
    label: string;
    href: string;
  };
  /** CTA secondaire personnalisé */
  secondaryCta?: {
    label: string;
    href: string;
  };
  /** Callback au clic sur un CTA */
  onCtaClick?: (ctaType: 'primary' | 'secondary') => void;
  /** Afficher les CTAs */
  showCtas?: boolean;
  /** Image/avatar optionnel */
  imageSrc?: string;
  /** Alt text pour l'image */
  imageAlt?: string;
  /** Classes CSS personnalisées */
  className?: string;
  /** Baseline / accroche commerciale */
  baseline?: string;
}

/**
 * Hero Component - Section d'accueil principale du portfolio
 *
 * Composant de la Phase 4 suivant la charte graphique "Tech & Nature"
 * et respectant les standards WCAG 2.1 AA
 *
 * @example
 * ```tsx
 * <Hero
 *   name="Donovan GROUT"
 *   title="Développeur Web Full-Stack"
 *   subtitle="En préparation du lancement de mon activité de développeur web freelance."
 *   location="Caen, Normandie, France"
 * />
 * ```
 */
const Hero: React.FC<HeroProps> = ({
  imageSrc,
  name,
  title,
  subtitle,
  location,
  primaryCta = { label: 'Voir mes projets', href: '/projects' },
  secondaryCta = { label: 'Me contacter', href: '/contact' },
  onCtaClick,
  showCtas = true,
  imageAlt,
  className,
  baseline,
}) => {
  // Fonction utilitaire pour sécuriser les URLs
  const sanitizeUrl = (url: string) => {
    // Simple protection contre javascript: ou données malicieuses
    if (!url || url.startsWith('javascript:')) return '#';
    return url;
  };

  // Handler pour les clics sur CTA
  const handleCtaClick = (ctaType: 'primary' | 'secondary') => {
    if (onCtaClick) {
      onCtaClick(ctaType);
    }
  };

  // Fallback image si imageSrc non fourni
  const avatarSrc = imageSrc || '/images/donovan-grout.webp';

  return (
    <section
      role="region"
      aria-label="Hero section"
      className={cn(
        // Layout de base
        'min-h-screen',
        'flex',
        'items-center',
        'justify-center',
        'px-4',
        'py-16',
        'sm:px-6',
        'lg:px-8',

        // Charte "Tech & Nature" - Gradient bleu océan normand
        'bg-gradient-to-br',
        'from-sky-700', // #0369a1 - Bleu océan principal
        'via-sky-800', // #075985 - Bleu profond
        'to-sky-900', // Fond profond

        // Texte blanc pour contraste WCAG AA
        'text-white',

        // Classes personnalisées
        className
      )}
    >
      <div className="max-w-7xl w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Contenu textuel */}
          <div className="flex-1 text-center lg:text-left space-y-6 lg:max-w-xl lg:mx-auto">
            {/* Nom - H1 Principal */}
            <h1
              className={cn(
                // Typographie selon charte: H1 2.5rem (40px) / font-bold
                'text-4xl',
                'md:text-5xl',
                'lg:text-6xl',
                'font-bold',
                'leading-tight',
                'text-white',
                'animate-fadein' // Animation immédiate
              )}
            >
              {name}
            </h1>

            {/* Titre professionnel - H2 */}
            <h2
              className={cn(
                // Typographie selon charte: H2 2rem (32px) / font-semibold
                'text-2xl',
                'md:text-3xl',
                'lg:text-4xl',
                'font-semibold',
                'leading-snug',
                'text-sky-100', // Légère variation pour hiérarchie visuelle
                'animate-fadein' // Animation immédiate
              )}
            >
              {title}
            </h2>

            {/* Sous-titre / Description */}
            <p
              className={cn(
                'text-lg',
                'md:text-xl',
                'lg:text-2xl',
                'font-bold',
                'leading-relaxed',
                'text-emerald-200',
                'max-w-2xl',
                'mx-auto',
                'lg:mx-0',
                'animate-fadein-delay-1' // Animation avec délai 0.5s
              )}
            >
              {subtitle.split('?').map((part, idx, arr) =>
                idx === 0 && arr.length > 1 ? (
                  <React.Fragment key={idx}>
                    {part.trim()}?
                    <br />
                  </React.Fragment>
                ) : (
                  <React.Fragment key={idx}>{part.trim()}</React.Fragment>
                )
              )}
            </p>

            {/* Baseline / Accroche commerciale */}
            {baseline && (
              <div
                className={cn(
                  'text-lg',
                  'md:text-xl',
                  'lg:text-2xl',
                  'font-semibold',
                  'leading-relaxed',
                  'max-w-2xl',
                  'mx-auto',
                  'lg:mx-0',
                  'mt-6',
                  'space-y-6' // Espacement entre les paragraphes de la baseline
                )}
                aria-label="Accroche commerciale"
              >
                {baseline.split('. ').map((sentence, idx) =>
                  sentence.trim() ? (
                    <p
                      key={`baseline-${idx}`}
                      className={cn(
                        idx === 0 && ['text-white', 'animate-fadein-delay-2'], // 1er paragraphe: blanc + anim
                        idx === 1 && [
                          'text-emerald-200',
                          'animate-fadein-delay-3',
                        ] // 2ème paragraphe: vert + anim
                      )}
                    >
                      {sentence.trim()}
                      {sentence.endsWith('.') ? '' : '.'}
                    </p>
                  ) : null
                )}
              </div>
            )}

            {/* Localisation avec icône */}
            <div
              className="flex items-center justify-center lg:justify-start gap-2 text-sky-200 animate-fadein-delay-4"
              aria-label="Localisation"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span className="text-sm md:text-base">{location}</span>
            </div>

            {/* CTAs */}
            {showCtas && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 lg:hidden animate-fadein-delay-4">
                {/* CTA Primaire */}
                <a
                  href={sanitizeUrl(primaryCta.href)}
                  onClick={() => handleCtaClick('primary')}
                  className={cn(
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'px-6',
                    'py-3',
                    'rounded-lg',
                    'font-medium',
                    'text-base',
                    'bg-emerald-600',
                    'text-black',
                    'transition-all',
                    'duration-300',
                    'hover:bg-emerald-700',
                    'hover:scale-105',
                    'hover:shadow-lg',
                    'focus:outline-none',
                    'focus:ring-2',
                    'focus:ring-emerald-400',
                    'focus:ring-offset-2',
                    'focus:ring-offset-sky-800'
                  )}
                >
                  {primaryCta.label}
                </a>
                <a
                  href={sanitizeUrl(secondaryCta.href)}
                  onClick={() => handleCtaClick('secondary')}
                  className={cn(
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'px-6',
                    'py-3',
                    'rounded-lg',
                    'font-medium',
                    'text-base',
                    'bg-transparent',
                    'text-white',
                    'border-2',
                    'border-white',
                    'transition-all',
                    'duration-300',
                    'hover:bg-white',
                    'hover:text-sky-800',
                    'hover:scale-105',
                    'focus:outline-none',
                    'focus:ring-2',
                    'focus:ring-white',
                    'focus:ring-offset-2',
                    'focus:ring-offset-sky-800'
                  )}
                >
                  {secondaryCta.label}
                </a>
              </div>
            )}
          </div>

          {/* Image/Avatar optionnel */}
          <div className="flex-shrink-0 flex flex-col items-center">
            {imageSrc && (
              <Image
                src={avatarSrc}
                alt={imageAlt || 'Donovan Grout, avatar'}
                width={1192}
                height={1192}
                sizes="(max-width: 480px) 192px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                priority
                fetchPriority="high"
                className={cn(
                  'w-48',
                  'h-48',
                  'md:w-64',
                  'md:h-64',
                  'lg:w-80',
                  'lg:h-80',
                  'rounded-full',
                  'object-cover',
                  'border-4',
                  'border-white',
                  'shadow-2xl'
                )}
              />
            )}
            {/* CTAs en desktop sous la photo */}
            {showCtas && (
              <div className="hidden lg:flex flex-row gap-4 justify-center pt-8 animate-fadein-delay-4">
                <a
                  href={sanitizeUrl(primaryCta.href)}
                  onClick={() => handleCtaClick('primary')}
                  className={cn(
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'px-6',
                    'py-3',
                    'rounded-lg',
                    'font-medium',
                    'text-base',
                    'bg-emerald-600',
                    'text-black',
                    'transition-all',
                    'duration-300',
                    'hover:bg-emerald-700',
                    'hover:scale-105',
                    'hover:shadow-lg',
                    'focus:outline-none',
                    'focus:ring-2',
                    'focus:ring-emerald-400',
                    'focus:ring-offset-2',
                    'focus:ring-offset-sky-800'
                  )}
                >
                  {primaryCta.label}
                </a>
                <a
                  href={sanitizeUrl(secondaryCta.href)}
                  onClick={() => handleCtaClick('secondary')}
                  className={cn(
                    'inline-flex',
                    'items-center',
                    'justify-center',
                    'px-6',
                    'py-3',
                    'rounded-lg',
                    'font-medium',
                    'text-base',
                    'bg-transparent',
                    'text-white',
                    'border-2',
                    'border-white',
                    'transition-all',
                    'duration-300',
                    'hover:bg-white',
                    'hover:text-sky-800',
                    'hover:scale-105',
                    'focus:outline-none',
                    'focus:ring-2',
                    'focus:ring-white',
                    'focus:ring-offset-2',
                    'focus:ring-offset-sky-800'
                  )}
                >
                  {secondaryCta.label}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
