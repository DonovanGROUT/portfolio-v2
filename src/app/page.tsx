// ===================================================================
// PAGE D'ACCUEIL DU PORTFOLIO - COMPOSANT PRINCIPAL
// ===================================================================
// Intégration du Hero Component (Phase 4)
// Page d'accueil avec Hero et liens vers les sections principales
// ===================================================================

import Hero from '@/components/design-system/Hero/Hero';
// import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-screen">
      <main role="main" className="items-center">
        {/* Hero Section - Présentation principale */}
        <Hero
          name="Donovan GROUT"
          title="Développeur Web Full-Stack"
          subtitle="Prêt à transformer votre image et votre impact ?"
          location="Caen, Normandie, France"
          imageSrc="/images/donovan-grout.jpg"
          imageAlt="Photo de profil de Donovan GROUT"
          primaryCta={{ label: 'Voir mes projets', href: '/projects' }}
          secondaryCta={{
            label: 'Me contacter',
            href: '/contact',
          }}
          baseline="Faites confiance à un développeur full-stack certifié Expert Opquast, engagé pour l'accessibilité. Un site accessible et performant, c'est aussi un meilleur référencement et donc un levier puissant pour attirer de nouveaux clients."
        />

        {/* Icône Vercel logomark pour test d'accessibilité */}
        {/* Icône Vercel logomark supprimée (test obsolète) */}

        {/* TODO Phase 4 : Ajouter les sections suivantes */}
        {/* - Skills Component (compétences techniques) */}
        {/* - Featured Projects (projets mis en avant) */}
        {/* - Testimonials (recommandations) */}
        {/* - Footer Component (liens permanents) */}
      </main>
    </div>
  );
}
