// ===================================================================
// PAGE FORM DEMO - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Démonstration du composant Form avec validation, états, intégration
// ===================================================================

'use client';

import { useState } from 'react';
import { Form } from '@/components/design-system/Form/Form';
import { Typography } from '@/components/design-system/Typography/Typography';
import { Card } from '@/components/design-system/Card/Card';

import { PrivacyNotice } from '@/components/design-system/PrivacyNotice/PrivacyNotice';

/**
 * Page de démonstration du composant Form
 *
 * Fonctionnalités démontrées :
 * - Formulaire de contact professionnel
 * - Validation en temps réel
 * - États de soumission
 * - Accessibilité complète
 * - Responsive design
 */
export default function FormDemoPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const subjectOptions = [
    { value: 'job', label: "Opportunité d'emploi" },
    { value: 'freelance', label: 'Mission freelance' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'technical', label: 'Question technique' },
    { value: 'other', label: 'Autre' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000));

      setSubmitResult({
        type: 'success',
        message:
          'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
      });

      // Reset du formulaire
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
      });
    } catch {
      setSubmitResult({
        type: 'error',
        message:
          "Une erreur s'est produite lors de l'envoi. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Typography variant="h1" className="text-gray-900 mb-4">
            Formulaire de Contact
          </Typography>
          <Typography variant="body" className="text-gray-600">
            Démonstration du composant Form adapté pour un portfolio
            professionnel. Ce formulaire permet aux recruteurs et clients de me
            contacter facilement.
          </Typography>
        </div>

        <div className="bg-gradient-to-br from-sky-50 to-emerald-50 rounded-xl shadow-lg p-8 border border-sky-100">
          <div className="text-center mb-8">
            <Typography variant="h2" className="text-gray-900 mb-2">
              Demande de contact
            </Typography>
            <Typography
              variant="body"
              className="text-slate-600 max-w-2xl mx-auto"
            >
              Contactez-moi pour discuter de vos projets, opportunités ou
              simples questions techniques. Toutes les demandes reçoivent une
              réponse sous 24h.
            </Typography>
          </div>

          <Form onSubmit={handleSubmit} variant="contact" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Form.Input
                name="lastName"
                label="Nom"
                value={formData.lastName}
                onChange={e =>
                  setFormData(prev => ({ ...prev, lastName: e.target.value }))
                }
                required
                placeholder="Doe"
                maxLength={50}
              />

              <Form.Input
                name="firstName"
                label="Prénom"
                value={formData.firstName}
                onChange={e =>
                  setFormData(prev => ({ ...prev, firstName: e.target.value }))
                }
                required
                placeholder="John"
                maxLength={50}
              />
            </div>
            <Form.Input
              name="email"
              label="Email"
              type="email"
              value={formData.email}
              onChange={e =>
                setFormData(prev => ({ ...prev, email: e.target.value }))
              }
              required
              placeholder="john@example.com"
              maxLength={254}
            />
            <Form.Input
              name="phone"
              label="Téléphone"
              type="tel"
              value={formData.phone}
              onChange={e =>
                setFormData(prev => ({ ...prev, phone: e.target.value }))
              }
              placeholder="+33 6 12 34 56 78"
              maxLength={20}
            />
            <Form.Input
              name="company"
              label="Entreprise"
              value={formData.company}
              onChange={e =>
                setFormData(prev => ({ ...prev, company: e.target.value }))
              }
              placeholder="Nom de votre entreprise (optionnel)"
              maxLength={100}
            />
            <Form.Select
              name="subject"
              label="Sujet"
              value={formData.subject}
              onChange={e =>
                setFormData(prev => ({ ...prev, subject: e.target.value }))
              }
              options={subjectOptions}
              required
            />
            <Form.Textarea
              name="message"
              label="Message"
              value={formData.message}
              onChange={e =>
                setFormData(prev => ({ ...prev, message: e.target.value }))
              }
              required
              placeholder="Décrivez votre projet, opportunité ou question..."
              rows={6}
              maxLength={2000}
              showCharCount
            />
            <PrivacyNotice
              contactEmail="donovan.grout.pro@gmail.com"
              policyUrl="/politique-confidentialite"
              policyLinkText="Politique de confidentialité"
              accepted={privacyAccepted}
              onAccept={setPrivacyAccepted}
              headingLevel="h3"
              className="mt-6"
            />{' '}
            {submitResult && (
              <div
                className={`p-4 rounded-lg ${
                  submitResult.type === 'success'
                    ? 'bg-green-50 border border-green-200 text-green-800'
                    : 'bg-red-50 border border-red-200 text-red-800'
                }`}
              >
                <Typography variant="body">{submitResult.message}</Typography>
              </div>
            )}
            <div className="flex gap-4">
              <Form.Submit
                loading={isSubmitting}
                disabled={
                  !formData.firstName ||
                  !formData.lastName ||
                  !formData.email ||
                  !formData.subject ||
                  !formData.message ||
                  !privacyAccepted
                }
                className="flex-1"
              >
                Envoyer le message
              </Form.Submit>

              <Form.Submit
                variant="secondary"
                type="button"
                onClick={() =>
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    company: '',
                    subject: '',
                    message: '',
                  })
                }
                disabled={isSubmitting}
              >
                Réinitialiser
              </Form.Submit>
            </div>
          </Form>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <Typography variant="h2" className="text-gray-900 mb-4">
            Cas d'usage professionnels
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card
              variant="default"
              className="p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <Card.Header>
                <Typography variant="h3" className="text-sky-700 mb-2">
                  Recruteurs & RH
                </Typography>
              </Card.Header>
              <Card.Body>
                <Typography variant="body" className="text-slate-600">
                  Opportunités d'emploi, propositions de poste et demandes
                  d'entretien
                </Typography>
              </Card.Body>
            </Card>

            <Card
              variant="default"
              className="p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <Card.Header>
                <Typography variant="h3" className="text-emerald-700 mb-2">
                  Clients & Freelance
                </Typography>
              </Card.Header>
              <Card.Body>
                <Typography variant="body" className="text-slate-600">
                  Missions freelance, projets de développement et collaborations
                </Typography>
              </Card.Body>
            </Card>

            <Card
              variant="default"
              className="p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <Card.Header>
                <Typography variant="h3" className="text-sky-700 mb-2">
                  Partenaires Tech
                </Typography>
              </Card.Header>
              <Card.Body>
                <Typography variant="body" className="text-slate-600">
                  Échanges de compétences, projets communs et veille
                  technologique
                </Typography>
              </Card.Body>
            </Card>

            <Card
              variant="default"
              className="p-6 hover:shadow-xl transition-shadow duration-200"
            >
              <Card.Header>
                <Typography variant="h3" className="text-emerald-700 mb-2">
                  Support & Conseil
                </Typography>
              </Card.Header>
              <Card.Body>
                <Typography variant="body" className="text-slate-600">
                  Questions techniques, demandes d'information et autres
                  contacts
                </Typography>
              </Card.Body>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-slate-50 rounded-lg">
            <Typography variant="h3" className="text-slate-700 mb-4">
              Intégration backend
            </Typography>
            <Typography variant="body" className="text-slate-600">
              Ce formulaire peut être connecté à Formspree pour traitement
              automatique des demandes de contact.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}
