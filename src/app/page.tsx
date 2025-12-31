// ===================================================================
// PAGE D'ACCUEIL DU PORTFOLIO - COMPOSANT PRINCIPAL
// ===================================================================
// Intégration du Hero Component (Phase 4)
// Page d'accueil avec Hero et liens vers les sections principales
// ===================================================================

import Hero from '@/components/design-system/Hero/Hero';
import { Skills } from '@/components/design-system/Skills/Skills';
import { portfolioSkills, categoryMeta } from '@/data/portfolioSkills';
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

        {/* Skills Section - Compétences techniques */}
        <section className="max-w-6xl mx-auto px-4 py-12">
          <Skills
            skills={portfolioSkills}
            title="Mes Compétences"
            categoryMeta={categoryMeta}
          />
        </section>

        {/* TODO Phase 4 : Ajouter les sections suivantes */}
        {/* - Featured Projects (projets mis en avant) */}
        {/* - Testimonials (recommandations) */}
        {/* - Footer Component (liens permanents) */}
      </main>
    </div>
  );
}
