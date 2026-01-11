// Navigation Component - Design System Portfolio Donovan Grout
// =============================================================

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { colors } from '@/lib/colors';
import { Button } from '../Button/Button';
import { Typography } from '../Typography/Typography';

// Types pour les liens de navigation
export interface NavigationLink {
  href: string;
  label: string;
  isActive?: boolean;
  target?: '_blank' | '_self';
}

// Props du composant Navigation
export interface NavigationProps {
  brand?: string;
  links?: NavigationLink[];
}

// Liens par défaut si aucun n'est fourni
const defaultLinks: NavigationLink[] = [
  { href: '/', label: 'Accueil' },
  { href: '/about', label: 'À propos' },
  { href: '/projects', label: 'Projets' },
  { href: '/contact', label: 'Contact' },
];

export const Navigation: React.FC<NavigationProps> = ({
  brand = 'Donovan Grout',
  links = defaultLinks,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gestion de l'échappement pour fermer le menu
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }

    return undefined;
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Rendu d'un lien de navigation
  const renderLink = (link: NavigationLink, className: string) => {
    const { href, label, isActive, target } = link;

    // Détermine si c'est un lien externe
    const isExternal = target === '_blank' || href.startsWith('http');

    // Classes de base pour les liens - Utilise notre système de couleurs
    const baseClasses =
      'transition-colors duration-200 ease-in-out font-medium focus:outline-2 focus:outline-offset-2 focus:outline-primary-700 rounded-lg';
    const baseStyles = {
      color: colors.neutral[600], // text-slate-600 (gris slate - inactive)
    };
    const hoverStyles = {
      color: colors.primary[500], // hover:text-sky-500 (bleu clair - innovation, dynamisme)
    };
    const activeClasses = isActive ? 'border-b-2' : '';
    const activeStyles = isActive
      ? {
          color: colors.primary[700], // text-sky-700
          borderColor: colors.primary[700], // border-sky-700
        }
      : {};

    // Gestion des événements hover
    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive) {
        e.currentTarget.style.color = hoverStyles.color;
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (!isActive) {
        e.currentTarget.style.color = baseStyles.color;
      }
    };

    // Props communes pour les liens
    const commonProps = {
      className: `${baseClasses} ${activeClasses} ${className}`,
      style: { ...baseStyles, ...activeStyles },
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ...(isActive && { 'aria-current': 'page' as const }),
    };

    // Lien externe → <a> classique
    if (isExternal) {
      return (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...commonProps}
        >
          {label}
        </a>
      );
    }

    // Lien interne → Next.js Link (SPA)
    return (
      <Link
        key={href}
        href={href}
        className={commonProps.className}
        style={commonProps.style}
        onMouseEnter={commonProps.onMouseEnter}
        onMouseLeave={commonProps.onMouseLeave}
        {...(isActive && { 'aria-current': 'page' as const })}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale"
      className="border-b sticky top-0 z-50 shadow-sm"
      style={{
        backgroundColor: colors.neutral[50], // bg-white -> bg-slate-50 pour cohérence
        borderColor: colors.neutral[200], // border-slate-200
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link
            href="/"
            aria-label={`Retour à l'accueil - ${brand}`}
            className="flex items-center space-x-2 transition-colors duration-200 ease-in-out"
            style={{
              color: colors.neutral[800], // text-slate-800
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = colors.primary[500]; // hover:text-sky-500 (bleu clair)
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = colors.neutral[800];
            }}
          >
            <Typography variant="h2" color="inherit" className="font-bold">
              {brand}
            </Typography>
          </Link>

          {/* Navigation Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {links.map(link => renderLink(link, 'px-3 py-2 text-sm'))}
          </div>

          {/* Bouton Menu Mobile */}
          <Button
            variant="outline"
            size="small"
            aria-expanded={isMenuOpen}
            aria-label="Menu de navigation"
            onClick={toggleMenu}
            className="md:hidden min-h-11 min-w-11 p-2"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </Button>
        </div>

        {/* Menu Mobile */}
        <div
          role="menu"
          aria-hidden={!isMenuOpen}
          className={`md:hidden absolute top-16 left-0 right-0 border-b shadow-lg transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'block' : 'hidden'
          }`}
          style={{
            backgroundColor: colors.neutral[50], // bg-white -> bg-slate-50
            borderColor: colors.neutral[200], // border-slate-200
          }}
        >
          <div className="px-4 py-2 space-y-1">
            {links.map(link => {
              const mobileLink = renderLink(
                link,
                'block px-3 py-3 text-base rounded-lg min-h-[44px] flex items-center'
              );
              // Ajouter les styles hover pour mobile
              return React.cloneElement(mobileLink, {
                ...mobileLink.props,
                onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!link.isActive) {
                    e.currentTarget.style.color = colors.primary[500]; // Bleu clair (innovation, dynamisme)
                    e.currentTarget.style.backgroundColor = colors.neutral[50]; // hover:bg-slate-50
                  }
                },
                onMouseLeave: (e: React.MouseEvent<HTMLAnchorElement>) => {
                  if (!link.isActive) {
                    e.currentTarget.style.color = colors.neutral[600];
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                },
              });
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
