// ===================================================================
// PAGE DE DÉMONSTRATION MODAL COMPONENT
// ===================================================================
// Démo visuelle de toutes les fonctionnalités du composant Modal
// Pour tests DevTools : voir docs/scripts/MODAL_TEST_SCRIPT.js
// Pour valider l'accessibilité : voir docs/scripts/ARIA_TEST_SCRIPT.js
// ===================================================================

'use client';

import React, { useState } from 'react';
import Modal from '../../components/design-system/Modal/Modal';
import { Button } from '../../components/design-system/Button/Button';
import { Typography } from '../../components/design-system/Typography/Typography';

export default function ModalDemoPage() {
  // États pour contrôler les différents modals
  const [basicModal, setBasicModal] = useState(false);
  const [smallModal, setSmallModal] = useState(false);
  const [mediumModal, setMediumModal] = useState(false);
  const [largeModal, setLargeModal] = useState(false);
  const [fullModal, setFullModal] = useState(false);
  const [titleModal, setTitleModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [noCloseModal, setNoCloseModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [nestedSecond, setNestedSecond] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* En-tête de la page */}
        <div className="text-center mb-8">
          <Typography variant="h1" className="mb-4">
            Démonstration Modal Component
          </Typography>
          <Typography variant="body" color="secondary" className="mb-6">
            Tests visuels et fonctionnels du composant Modal avec toutes ses
            variantes
          </Typography>
          <Typography variant="body" color="muted">
            TDD ✅ • Accessibilité WCAG 2.1 AA ✅ • Responsive ✅ • Sécurité ✅
          </Typography>
        </div>

        {/* Section 1: Modals de base */}
        <section className="mb-12">
          <Typography variant="h2" className="mb-6">
            Modals de base
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="primary"
              onClick={() => setBasicModal(true)}
              className="w-full"
            >
              Modal Basique
            </Button>

            <Button
              variant="secondary"
              onClick={() => setTitleModal(true)}
              className="w-full"
            >
              Avec Titre
            </Button>

            <Button
              variant="outline"
              onClick={() => setDescriptionModal(true)}
              className="w-full"
            >
              Avec Description
            </Button>
          </div>
        </section>

        {/* Section 2: Tailles */}
        <section className="mb-12">
          <Typography variant="h2" className="mb-6">
            Différentes tailles
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              variant="primary"
              size="small"
              onClick={() => setSmallModal(true)}
              className="w-full"
            >
              Small
            </Button>

            <Button
              variant="primary"
              onClick={() => setMediumModal(true)}
              className="w-full"
            >
              Medium
            </Button>

            <Button
              variant="primary"
              size="large"
              onClick={() => setLargeModal(true)}
              className="w-full"
            >
              Large
            </Button>

            <Button
              variant="secondary"
              onClick={() => setFullModal(true)}
              className="w-full"
            >
              Full
            </Button>
          </div>
        </section>

        {/* Section 3: Fonctionnalités avancées */}
        <section className="mb-12">
          <Typography variant="h2" className="mb-6">
            Fonctionnalités avancées
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="outline"
              onClick={() => setNoCloseModal(true)}
              className="w-full"
            >
              Sans bouton fermer
            </Button>

            <Button
              variant="primary"
              onClick={() => setFormModal(true)}
              className="w-full"
            >
              Modal avec formulaire
            </Button>

            <Button
              variant="secondary"
              onClick={() => setNestedModal(true)}
              className="w-full"
            >
              Modal imbriqué
            </Button>
          </div>
        </section>

        {/* Section 4: Tests d'accessibilité */}
        <section className="mb-12">
          <Typography variant="h2" className="mb-6">
            Tests d'accessibilité
          </Typography>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <Typography variant="h3" className="mb-4">
              Instructions de test :
            </Typography>

            <ul className="space-y-2 text-gray-700">
              <li>
                • <strong>Keyboard navigation :</strong> Utilisez Tab pour
                naviguer, Escape pour fermer
              </li>
              <li>
                • <strong>Screen reader :</strong> Vérifiez les annonces ARIA
              </li>
              <li>
                • <strong>Focus trap :</strong> Le focus reste dans le modal
              </li>
              <li>
                • <strong>Focus restoration :</strong> Le focus revient au
                bouton déclencheur
              </li>
            </ul>
          </div>
        </section>

        {/* Modal Basique */}
        <Modal isOpen={basicModal} onClose={() => setBasicModal(false)}>
          <Typography variant="h3" className="mb-4">
            Modal Basique
          </Typography>
          <Typography variant="body" className="mb-6">
            Ceci est un modal basique sans titre dans l'en-tête. Il contient
            simplement du contenu avec un bouton de fermeture.
          </Typography>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setBasicModal(false)}>
              Fermer
            </Button>
          </div>
        </Modal>

        {/* Modal avec Titre */}
        <Modal
          isOpen={titleModal}
          onClose={() => setTitleModal(false)}
          title="Modal avec Titre"
        >
          <Typography variant="body" className="mb-6">
            Ce modal a un titre dans l'en-tête qui est correctement lié avec
            aria-labelledby pour l'accessibilité.
          </Typography>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setTitleModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={() => setTitleModal(false)}>
              Confirmer
            </Button>
          </div>
        </Modal>

        {/* Modal avec Description */}
        <Modal
          isOpen={descriptionModal}
          onClose={() => setDescriptionModal(false)}
          title="Modal avec Description"
          description="Cette description explique le contenu du modal et est liée via aria-describedby."
        >
          <Typography variant="body" className="mb-6">
            Le modal inclut une description accessible qui aide les utilisateurs
            de lecteurs d'écran à comprendre le contexte.
          </Typography>
          <div className="flex justify-end">
            <Button
              variant="primary"
              onClick={() => setDescriptionModal(false)}
            >
              J'ai compris
            </Button>
          </div>
        </Modal>

        {/* Modal Small */}
        <Modal
          isOpen={smallModal}
          onClose={() => setSmallModal(false)}
          title="Modal Small"
          size="small"
        >
          <Typography variant="body" className="mb-4">
            Modal de petite taille, idéal pour les confirmations simples.
          </Typography>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              size="small"
              onClick={() => setSmallModal(false)}
            >
              Non
            </Button>
            <Button
              variant="primary"
              size="small"
              onClick={() => setSmallModal(false)}
            >
              Oui
            </Button>
          </div>
        </Modal>

        {/* Modal Medium */}
        <Modal
          isOpen={mediumModal}
          onClose={() => setMediumModal(false)}
          title="Modal Medium"
          size="medium"
        >
          <Typography variant="body" className="mb-6">
            Modal de taille moyenne, parfait pour la plupart des cas d'usage.
            Contient suffisamment d'espace pour du contenu détaillé.
          </Typography>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <Typography variant="body" className="mb-2 font-semibold">
                Fonctionnalité 1
              </Typography>
              <Typography variant="body" color="muted">
                Description de la fonctionnalité
              </Typography>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <Typography variant="body" className="mb-2 font-semibold">
                Fonctionnalité 2
              </Typography>
              <Typography variant="body" color="muted">
                Description de la fonctionnalité
              </Typography>
            </div>
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setMediumModal(false)}>
              Fermer
            </Button>
          </div>
        </Modal>

        {/* Modal Large */}
        <Modal
          isOpen={largeModal}
          onClose={() => setLargeModal(false)}
          title="Modal Large"
          size="large"
        >
          <Typography variant="body" className="mb-6">
            Modal de grande taille pour du contenu complexe ou des interfaces
            détaillées.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {[1, 2, 3].map(item => (
              <div key={item} className="p-4 border rounded-lg">
                <Typography variant="h4" className="mb-2">
                  Section {item}
                </Typography>
                <Typography variant="body" className="mb-4">
                  Contenu de la section {item} avec plus de détails et
                  d'informations.
                </Typography>
                <Button variant="outline" size="small" className="w-full">
                  Action {item}
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setLargeModal(false)}>
              Fermer
            </Button>
          </div>
        </Modal>

        {/* Modal Full */}
        <Modal
          isOpen={fullModal}
          onClose={() => setFullModal(false)}
          title="Modal Full Screen"
          size="full"
        >
          <Typography variant="body" className="mb-6">
            Modal pleine largeur pour des interfaces complexes ou des
            visualisations détaillées.
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <div
                key={item}
                className="p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg"
              >
                <Typography variant="body" className="mb-2 font-semibold">
                  Élément {item}
                </Typography>
                <Typography variant="body" className="mb-3">
                  Description de l'élément {item}
                </Typography>
                <Button variant="outline" size="small" className="w-full">
                  Voir détails
                </Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setFullModal(false)}>
              Fermer
            </Button>
          </div>
        </Modal>

        {/* Modal sans bouton fermer */}
        <Modal
          isOpen={noCloseModal}
          onClose={() => setNoCloseModal(false)}
          title="Modal sans bouton fermer"
          showCloseButton={false}
        >
          <Typography variant="body" className="mb-6">
            Ce modal n'a pas de bouton de fermeture dans l'en-tête.
            L'utilisateur doit utiliser les boutons d'action ou Escape.
          </Typography>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setNoCloseModal(false)}>
              Annuler
            </Button>
            <Button variant="primary" onClick={() => setNoCloseModal(false)}>
              Confirmer
            </Button>
          </div>
        </Modal>

        {/* Modal avec formulaire */}
        <Modal
          isOpen={formModal}
          onClose={() => setFormModal(false)}
          title="Formulaire de Contact"
          description="Remplissez ce formulaire pour nous contacter"
        >
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="votre@email.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Votre message..."
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setFormModal(false)}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                variant="primary"
                onClick={e => {
                  e.preventDefault();
                  setFormModal(false);
                }}
              >
                Envoyer
              </Button>
            </div>
          </form>
        </Modal>

        {/* Modal imbriqué - Premier niveau */}
        <Modal
          isOpen={nestedModal}
          onClose={() => setNestedModal(false)}
          title="Modal Parent"
        >
          <Typography variant="body" className="mb-6">
            Ce modal peut ouvrir un autre modal pour tester la gestion des
            modals imbriqués.
          </Typography>
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => setNestedModal(false)}>
              Fermer
            </Button>
            <Button variant="primary" onClick={() => setNestedSecond(true)}>
              Ouvrir Modal Enfant
            </Button>
          </div>
        </Modal>

        {/* Modal imbriqué - Deuxième niveau */}
        <Modal
          isOpen={nestedSecond}
          onClose={() => setNestedSecond(false)}
          title="Modal Enfant"
          size="small"
        >
          <Typography variant="body" className="mb-6">
            Ceci est un modal enfant ouvert par-dessus le modal parent. La
            gestion du focus est maintenue correctement.
          </Typography>
          <div className="flex justify-end">
            <Button variant="primary" onClick={() => setNestedSecond(false)}>
              Fermer
            </Button>
          </div>
        </Modal>

        {/* Footer de la page */}
        <footer className="text-center pt-8 border-t border-gray-200 mt-12">
          <Typography variant="body" className="text-gray-500 text-sm">
            Modal Component • TDD Implementation • 24 tests • 100% coverage
          </Typography>
        </footer>
      </div>
    </div>
  );
}
