import { Typography } from '@/components/design-system/Typography/Typography';

/**
 * Page de démonstration Typography Component
 * Pour tester le script TYPOGRAPHY_TEST_SCRIPT.js dans la console DevTools
 */
export default function TypographyDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <Typography variant="h1" color="primary">
            Design System - Composant Typography
          </Typography>
          <Typography variant="body" color="muted">
            Test visuel de tous les variants, couleurs et alignements
          </Typography>
        </div>

        {/* Variants */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Variants Typography
          </Typography>

          {/* Headings Hierarchy */}
          <div className="space-y-4">
            <Typography variant="h1" color="primary">
              H1 - Titre Principal (Primary)
            </Typography>
            <Typography variant="h2" color="secondary">
              H2 - Titre Section (Secondary)
            </Typography>
            <Typography variant="h3" color="neutral">
              H3 - Sous-titre (Neutral)
            </Typography>
            <Typography variant="h4" color="muted">
              H4 - Titre de paragraphe (Muted)
            </Typography>
          </div>

          {/* Body Text */}
          <div className="space-y-4">
            <Typography variant="body" color="neutral">
              Body - Texte de corps standard avec une couleur neutre pour une
              lecture optimale.
            </Typography>
            <Typography variant="body-large" color="primary">
              Body Large - Texte de corps plus grand avec couleur primary pour
              attirer l&apos;attention.
            </Typography>
            <Typography variant="caption" color="muted">
              Caption - Petit texte pour les légendes et annotations.
            </Typography>
          </div>
        </section>

        {/* Couleurs */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Couleurs
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Typography variant="h4" color="primary">
                Primary (Sky-700)
              </Typography>
              <Typography variant="body" color="primary">
                Couleur principale pour les éléments importants.
              </Typography>
            </div>

            <div className="space-y-2">
              <Typography variant="h4" color="secondary">
                Secondary (Emerald-700)
              </Typography>
              <Typography variant="body" color="secondary">
                Couleur secondaire pour les accents éco-conception.
              </Typography>
            </div>

            <div className="space-y-2">
              <Typography variant="h4" color="neutral">
                Neutral (Slate-700)
              </Typography>
              <Typography variant="body" color="neutral">
                Couleur neutre pour le texte principal.
              </Typography>
            </div>

            <div className="space-y-2">
              <Typography variant="h4" color="muted">
                Muted (Slate-500)
              </Typography>
              <Typography variant="body" color="muted">
                Couleur atténuée pour le texte secondaire.
              </Typography>
            </div>
          </div>
        </section>

        {/* Alignements */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Alignements
          </Typography>
          <div className="space-y-4">
            <Typography variant="body" align="left" color="neutral">
              Alignement à gauche (par défaut) - Lorem ipsum dolor sit amet.
            </Typography>
            <Typography variant="body" align="center" color="neutral">
              Alignement centré - Lorem ipsum dolor sit amet.
            </Typography>
            <Typography variant="body" align="right" color="neutral">
              Alignement à droite - Lorem ipsum dolor sit amet.
            </Typography>
            <Typography variant="body" align="justify" color="neutral">
              Alignement justifié - Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </Typography>
          </div>
        </section>

        {/* Responsive */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Responsive
          </Typography>
          <div className="space-y-4">
            <Typography variant="h3" responsive color="primary">
              Titre responsive (s&apos;adapte selon l&apos;écran)
            </Typography>
            <Typography variant="body" responsive color="neutral">
              Corps de texte responsive qui s&apos;adapte automatiquement aux
              différentes tailles d&apos;écran.
            </Typography>
          </div>
        </section>

        {/* Fonctionnalités */}
        <section className="space-y-6">
          <Typography variant="h2" color="secondary">
            Fonctionnalités
          </Typography>
          <div className="space-y-4">
            <div className="max-w-48">
              <Typography variant="body" truncate color="neutral">
                Texte très long qui sera tronqué avec des points de suspension
                quand il dépasse la largeur du conteneur.
              </Typography>
            </div>
            <Typography as="h3" variant="h3" color="primary">
              H3 avec style H3 (sémantique correcte)
            </Typography>
            <Typography as="div" variant="body" color="neutral">
              Div avec style body (pour éviter problèmes sémantiques)
            </Typography>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <Typography variant="caption" color="muted" align="center">
            🧪 Page de test Typography Component - Script disponible dans
            docs/scripts/TYPOGRAPHY_TEST_SCRIPT.js
          </Typography>
        </footer>
      </div>
    </div>
  );
}
