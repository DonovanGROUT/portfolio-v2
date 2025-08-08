'use client';

// ===================================================================
// PAGE DE DÉMONSTRATION PRIVACYNOTICE COMPONENT
// ===================================================================
// Démo visuelle de toutes les fonctionnalités du composant PrivacyNotice
// Pour tests DevTools : voir docs/scripts/PRIVACYNOTICE_TEST_SCRIPT.js
// Pour valider l'accessibilité : voir docs/scripts/ARIA_TEST_SCRIPT.js
// Pour valider les animations : voir docs/scripts/ANIMATION_TEST_SCRIPT.js
// ===================================================================

import { Typography } from '@/components/design-system/Typography/Typography';
import { PrivacyNotice } from '@/components/design-system/PrivacyNotice/PrivacyNotice';

export default function PrivacyNoticeDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-emerald-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Typography variant="h1" className="text-gray-900 mb-4">
            🔒 PrivacyNotice Component
          </Typography>
          <Typography
            variant="body"
            className="text-slate-600 max-w-2xl mx-auto"
          >
            Composant RGPD pour afficher les informations de protection des
            données avec expansion des détails et consentement obligatoire.
          </Typography>
        </div>

        {/* Demo Sections */}
        <div className="space-y-12">
          {/* Exemple basique */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <Typography variant="h2" className="text-gray-900 mb-6">
              📋 Exemple basique
            </Typography>
            <PrivacyNotice contactEmail="donovan.grout.pro@gmail.com" />
          </section>

          {/* Avec politique */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <Typography variant="h2" className="text-gray-900 mb-6">
              📄 Avec lien vers la politique
            </Typography>
            <PrivacyNotice
              contactEmail="donovan.grout.pro@gmail.com"
              policyUrl="/privacy-notice-demo"
              policyLinkText="Voir la politique complète"
            />
          </section>

          {/* État accepté */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <Typography variant="h2" className="text-gray-900 mb-6">
              ✅ État pré-accepté
            </Typography>
            <PrivacyNotice
              contactEmail="donovan.grout.pro@gmail.com"
              policyUrl="/privacy-notice-demo"
              accepted={true}
            />
          </section>

          {/* Avec style personnalisé */}
          <section className="bg-white rounded-xl shadow-lg p-8">
            <Typography variant="h2" className="text-gray-900 mb-6">
              🎨 Avec classe personnalisée
            </Typography>
            <PrivacyNotice
              contactEmail="donovan.grout.pro@gmail.com"
              className="border-2 border-emerald-200 bg-emerald-50"
            />
          </section>
        </div>

        {/* Code Examples */}
        <section className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <Typography variant="h2" className="text-gray-900 mb-6">
            💻 Exemples d'utilisation
          </Typography>

          <div className="space-y-6">
            <div>
              <Typography variant="h3" className="text-gray-800 mb-3">
                Basique
              </Typography>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>{`<PrivacyNotice contactEmail="donovan.grout.pro@gmail.com" />`}</code>
              </pre>
            </div>

            <div>
              <Typography variant="h3" className="text-gray-800 mb-3">
                Avec gestion d'état
              </Typography>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                <code>
                  {`const [accepted, setAccepted] = useState(false);

<PrivacyNotice
  contactEmail="donovan.grout.pro@gmail.com"
  policyUrl="/privacy-notice-demo"
  accepted={accepted}
  onAccept={setAccepted}
/>`}
                </code>
              </pre>
            </div>
          </div>
        </section>

        {/* Accessibilité */}
        <section className="bg-white rounded-xl shadow-lg p-8 mt-12">
          <Typography variant="h2" className="text-gray-900 mb-6">
            ♿ Fonctionnalités d'accessibilité
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Typography variant="h3" className="text-gray-800">
                🎯 ARIA
              </Typography>
              <ul className="space-y-2 text-gray-700">
                <li>
                  • <code>role="region"</code> sur le conteneur
                </li>
                <li>
                  • <code>aria-labelledby</code> pour le titre
                </li>
                <li>
                  • <code>aria-expanded</code> sur le bouton
                </li>
                <li>
                  • <code>aria-controls</code> pour les détails
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <Typography variant="h3" className="text-gray-800">
                ⌨️ Navigation
              </Typography>
              <ul className="space-y-2 text-gray-700">
                <li>• Navigation au clavier complète</li>
                <li>• Labels associés aux inputs</li>
                <li>• Focus visible sur tous les éléments</li>
                <li>• Hiérarchie sémantique respectée</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
