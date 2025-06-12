'use client';

// Page de démonstration pour tester le composant Button
// Affiche tous les variants, tailles et états pour validation visuelle
import { Button } from '@/components/design-system/Button/Button';

export default function ButtonDemo() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Design System - Composant Button
          </h1>
          <p className="text-gray-600">
            Test visuel de tous les variants, tailles et états
          </p>
        </div>

        {/* Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="outline">Outline Button</Button>
          </div>
        </section>

        {/* Tailles */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Tailles</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
        </section>

        {/* États */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">États</h2>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
          </div>
        </section>

        {/* Combinaisons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">Combinaisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary variants */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Primary</h3>
              <div className="space-y-2">
                <Button variant="primary" size="small">
                  Small Primary
                </Button>
                <Button variant="primary" size="medium">
                  Medium Primary
                </Button>
                <Button variant="primary" size="large">
                  Large Primary
                </Button>
                <Button variant="primary" disabled>
                  Disabled Primary
                </Button>
                <Button variant="primary" loading>
                  Loading Primary
                </Button>
              </div>
            </div>

            {/* Secondary variants */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Secondary</h3>
              <div className="space-y-2">
                <Button variant="secondary" size="small">
                  Small Secondary
                </Button>
                <Button variant="secondary" size="medium">
                  Medium Secondary
                </Button>
                <Button variant="secondary" size="large">
                  Large Secondary
                </Button>
                <Button variant="secondary" disabled>
                  Disabled Secondary
                </Button>
                <Button variant="secondary" loading>
                  Loading Secondary
                </Button>
              </div>
            </div>

            {/* Outline variants */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Outline</h3>
              <div className="space-y-2">
                <Button variant="outline" size="small">
                  Small Outline
                </Button>
                <Button variant="outline" size="medium">
                  Medium Outline
                </Button>
                <Button variant="outline" size="large">
                  Large Outline
                </Button>
                <Button variant="outline" disabled>
                  Disabled Outline
                </Button>
                <Button variant="outline" loading>
                  Loading Outline
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Tests d'interaction */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Tests d&apos;interaction
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button onClick={() => alert('Bouton cliqué !')}>
              Test onClick
            </Button>
            <Button
              onClick={() => console.log('Event logged')}
              className="bg-emerald-700 hover:bg-emerald-800 border-emerald-700"
            >
              Classe personnalisée
            </Button>
          </div>
        </section>

        {/* Accessibilité */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Accessibilité
          </h2>
          <div className="bg-white p-6 rounded-lg border">
            <p className="text-sm text-gray-600 mb-4">
              • Testez la navigation au clavier (Tab, Enter, Space)
              <br />
              • Vérifiez les contrastes et focus rings
              <br />• Touch targets minimum 44px (Mobile-friendly)
            </p>
            <div className="flex flex-wrap gap-4">
              <Button>Navigation clavier</Button>
              <Button variant="outline" tabIndex={0}>
                Focus ring test
              </Button>
            </div>
          </div>
        </section>

        {/* Performance note */}
        <section className="bg-blue-50 p-6 rounded-lg">
          <h3 className="font-medium text-blue-900 mb-2">📊 Métriques TDD</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✅ 22 tests unitaires passants</li>
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
