import Hero from '@/components/design-system/Hero/Hero';

/**
 * Page de démonstration du Hero Component
 * Présente différentes configurations et variantes
 */
export default function HeroDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero par défaut avec contenu du portfolio */}
      <Hero
        name="Donovan GROUT"
        title="Développeur Web Full-Stack"
        subtitle="Développeur web freelance."
        location="Caen, Normandie, France"
        imageSrc="/images/donovan-grout.jpg"
        imageAlt="Photo de profil de Donovan GROUT"
        primaryCta={{ label: 'Voir mes projets', href: '/projects' }}
        secondaryCta={{
          label: 'Télécharger mon CV',
          href: '/documents/cv-donovan-grout.pdf',
        }}
      />

      {/* Exemples additionnels */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Variantes du Hero Component
        </h2>

        <div className="space-y-16">
          {/* Avec image */}
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <Hero
              name="John Doe"
              title="Designer UX/UI"
              subtitle="Création d'expériences utilisateur mémorables et accessibles."
              location="Paris, France"
              imageSrc="/images/donovan-grout.webp"
              imageAlt="Photo de profil de Donovan GROUT"
              primaryCta={{ label: 'Portfolio', href: '/portfolio' }}
              secondaryCta={{ label: 'LinkedIn', href: '/linkedin' }}
            />
          </div>

          {/* Sans CTAs */}
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <Hero
              name="Jane Smith"
              title="Développeuse Frontend"
              subtitle="Passionnée par React et les interfaces modernes."
              location="Lyon, France"
              showCtas={false}
            />
          </div>

          {/* CTAs personnalisés */}
          <div className="border-2 border-gray-200 rounded-lg overflow-hidden">
            <Hero
              name="Alex Martin"
              title="Full-Stack Developer"
              subtitle="Expert en Node.js et architectures cloud."
              location="Toulouse, France"
              primaryCta={{ label: 'Voir mes réalisations', href: '/work' }}
              secondaryCta={{ label: 'Télécharger CV', href: '/cv.pdf' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
