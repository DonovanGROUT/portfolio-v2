// ===================================================================
// LAYOUT RACINE DE L'APPLICATION PORTFOLIO
// ===================================================================
// Définit la structure HTML globale, polices, métadonnées SEO
// ===================================================================
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/design-system/Navigation/Navigation';

// Configuration des polices Google Fonts optimisées
const geistSans = Geist({
  variable: '--font-geist-sans', // Variable CSS pour la police principale
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono', // Variable CSS pour la police monospace
  subsets: ['latin'],
});

// Métadonnées SEO de base (à personnaliser pour le portfolio)
export const metadata: Metadata = {
  title: 'Donovan GROUT - Développeur Full-Stack spécialisé en accessibilité',
  description:
    'Portfolio de Donovan GROUT, développeur web full-stack certifié Opquast Expert, spécialisé en accessibilité. Découvrez mes projets, mes compétences et contactez-moi pour vos projets web.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
