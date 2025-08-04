'use client';

// ===================================================================
// PAGE DE DÉMONSTRATION CARD COMPONENT
// ===================================================================
// Démo visuelle de toutes les fonctionnalités du composant Card
// Pour tests DevTools : voir docs/scripts/CARD_TEST_SCRIPT.js
// Pour valider l'accessibilité : voir docs/scripts/ARIA_TEST_SCRIPT.js
// Pour valider les animations de loading : voir docs/scripts/ANIMATION_TEST_SCRIPT.js
// ===================================================================

import { Card } from '@/components/design-system/Card/Card';
import { Typography } from '@/components/design-system/Typography/Typography';

export default function CardDemoPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <Typography variant="h1" color="primary">
            Design System - Composant Card
          </Typography>
          <Typography variant="body" color="neutral">
            Test visuel de tous les variants, tailles, états et compositions
          </Typography>
        </div>

        {/* Variants */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Variants
          </Typography>
          <div className="flex flex-wrap gap-4">
            <Card variant="default">Card Default</Card>
            <Card variant="project">Card Project</Card>
            <Card variant="skill">Card Skill</Card>
            <Card variant="experience">Card Experience</Card>
            <Card variant="testimonial">Card Testimonial</Card>
          </div>
        </section>

        {/* Tailles */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Tailles
          </Typography>
          <div className="flex flex-wrap items-center gap-4">
            <Card size="sm">Small</Card>
            <Card size="md">Medium</Card>
            <Card size="lg">Large</Card>
          </div>
        </section>

        {/* États */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            États
          </Typography>
          <div className="flex flex-wrap gap-4">
            <Card>Normal</Card>
            <Card disabled>Disabled</Card>
            <Card loading>Loading</Card>
            <Card hover>Hover</Card>
            <Card clickable>Clickable</Card>
          </div>
        </section>

        {/* Composition */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Composition modulaire
          </Typography>
          <div className="flex flex-wrap gap-4">
            <Card>
              <Card.Header>Header</Card.Header>
              <Card.Body>Body</Card.Body>
              <Card.Footer>Footer</Card.Footer>
            </Card>
            <Card>
              <Card.Image src="/next.svg" alt="Image de démo" />
              <Card.Body>Avec image</Card.Body>
            </Card>
          </div>
        </section>

        {/* Accessibilité */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Accessibilité
          </Typography>
          <div className="bg-white p-6 rounded-lg border">
            <Typography variant="body" color="neutral" className="mb-4">
              • Testez la navigation au clavier (Tab, Enter, Space)
              <br />• Vérifiez les contrastes et focus rings
              <br />• Touch targets minimum 44px (Mobile-friendly)
            </Typography>
            <div className="flex flex-wrap gap-4">
              <Card aria-label="Carte accessible">Carte avec aria-label</Card>
              <Card aria-labelledby="card-title-demo">
                <Card.Header>
                  <Typography as="h3" id="card-title-demo">
                    Titre accessible
                  </Typography>
                </Card.Header>
                <Card.Body>Body</Card.Body>
              </Card>
            </div>
          </div>
        </section>

        {/* Performance note */}
        <section className="bg-blue-100 p-6 rounded-lg border border-blue-200">
          <Typography variant="h3" color="primary" className="mb-2">
            📊 Métriques TDD
          </Typography>
          <ul className="text-sm text-blue-900 space-y-1">
            <li>✅ 20+ tests unitaires passants</li>
            <li>✅ Accessibilité WCAG 2.1 AA</li>
            <li>✅ Protection XSS intégrée</li>
            <li>✅ Touch targets 44px minimum</li>
            <li>✅ Support clavier complet</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
