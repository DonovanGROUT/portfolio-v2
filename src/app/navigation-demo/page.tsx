// Page de démonstration du composant Navigation
// ===============================================

import React from 'react';
import { Navigation } from '@/components/design-system/Navigation/Navigation';

export default function NavigationDemoPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation par défaut */}
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-6">
            Démonstration du Composant Navigation
          </h1>

          <p className="text-slate-600 mb-8">
            Cette page démontre le composant Navigation avec différentes
            configurations. La navigation ci-dessus utilise les paramètres par
            défaut.
          </p>

          <div className="space-y-8">
            {/* Section Fonctionnalités */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Fonctionnalités
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Navigation responsive avec menu hamburger sur mobile</li>
                <li>Indicateur de page active avec aria-current</li>
                <li>
                  Support des liens externes avec sécurisation automatique
                </li>
                <li>Gestion du clavier (Escape pour fermer le menu mobile)</li>
                <li>Touch targets conformes WCAG (≥44px)</li>
                <li>Transitions fluides et animations performantes</li>
                <li>Classes CSS statiques pour optimiser les performances</li>
              </ul>
            </section>

            {/* Section Accessibilité */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Accessibilité WCAG 2.1 AA
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>
                  Attributs ARIA appropriés (aria-label, aria-expanded,
                  aria-current)
                </li>
                <li>Navigation au clavier fonctionnelle</li>
                <li>Contraste de couleurs conforme</li>
                <li>Touch targets suffisamment grands</li>
                <li>Structure sémantique correcte</li>
              </ul>
            </section>

            {/* Section Sécurité */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Sécurité
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>
                  Liens externes sécurisés avec rel=&quot;noopener
                  noreferrer&quot;
                </li>
                <li>Aucun gestionnaire d&apos;événements dangereux inline</li>
                <li>Validation et sanitisation des props</li>
              </ul>
            </section>

            {/* Section Performance */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Performance
              </h2>
              <ul className="list-disc list-inside text-slate-600 space-y-2">
                <li>Classes CSS statiques pré-compilées</li>
                <li>Pas de re-render inutiles</li>
                <li>Transitions CSS natives pour fluidité</li>
                <li>Bundle size optimisé</li>
              </ul>
            </section>

            {/* Instructions de test */}
            <section>
              <h2 className="text-2xl font-semibold text-slate-800 mb-4">
                Comment tester
              </h2>
              <div className="bg-slate-100 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-2">Desktop :</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1 mb-4">
                  <li>Naviguez avec Tab/Shift+Tab</li>
                  <li>Activez les liens avec Enter/Space</li>
                  <li>Observez les états hover</li>
                </ul>

                <h3 className="font-semibold text-slate-800 mb-2">Mobile :</h3>
                <ul className="list-disc list-inside text-slate-600 space-y-1">
                  <li>Réduisez la fenêtre ou utilisez les dev tools</li>
                  <li>Cliquez sur le menu hamburger</li>
                  <li>Appuyez sur Escape pour fermer</li>
                  <li>Testez les touch targets</li>
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
