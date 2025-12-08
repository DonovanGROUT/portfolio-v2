// ===================================================================
// API ROUTE CONTACT - PORTFOLIO DONOVAN GROUT
// ===================================================================
// Endpoint pour traiter les demandes de contact et les transmettre
// au workflow CommitShift (n8n → Baserow → InvoiceNinja → Mailhog)
// ===================================================================

import { NextRequest, NextResponse } from 'next/server';

// Interface pour les données du formulaire de contact
interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  prestation?: string; // Nouveau champ optionnel pour les prestations freelance
  message: string;
}

// Interface pour la réponse standardisée
interface ContactResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown> | undefined;
  error?: string;
}

/**
 * Valide les données du formulaire de contact
 */
function validateContactData(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Champs obligatoires
  if (!data.firstName?.trim()) errors.push('Le prénom est requis');
  if (!data.lastName?.trim()) errors.push('Le nom est requis');
  if (!data.email?.trim()) errors.push("L'email est requis");
  if (!data.subject?.trim()) errors.push('Le sujet est requis');
  if (!data.message?.trim()) errors.push('Le message est requis');

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (data.email && !emailRegex.test(data.email)) {
    errors.push("Format d'email invalide");
  }

  // Validation longueurs
  if (data.firstName && data.firstName.length > 50) {
    errors.push('Le prénom ne peut pas dépasser 50 caractères');
  }
  if (data.lastName && data.lastName.length > 50) {
    errors.push('Le nom ne peut pas dépasser 50 caractères');
  }
  if (data.email && data.email.length > 254) {
    errors.push("L'email ne peut pas dépasser 254 caractères");
  }
  if (data.message && data.message.length > 2000) {
    errors.push('Le message ne peut pas dépasser 2000 caractères');
  }

  return { isValid: errors.length === 0, errors };
}

/**
 * Sanitise les données pour éviter les injections
 */
function sanitizeData(data: ContactFormData): ContactFormData {
  return {
    firstName: data.firstName.trim(),
    lastName: data.lastName.trim(),
    email: data.email.trim().toLowerCase(),
    phone: data.phone?.trim() || '',
    company: data.company?.trim() || '',
    subject: data.subject.trim(),
    message: data.message.trim(),
  };
}

/**
 * Mappe les sujets du formulaire Portfolio vers les secteurs Baserow
 */
// La fonction mapSubjectToSector n'utilise plus 'subject', suppression du paramètre pour éviter l'avertissement ESLint
function mapSubjectToSector(): string {
  // Pour l'instant, on laisse vide ou "Autre" par défaut
  // Le secteur sera renseigné manuellement selon le projet
  return 'Autre';
}

/**
 * Détermine le statut selon le sujet du formulaire
 */
function mapSubjectToStatus(subject: string): string {
  // Seul "Mission freelance" = prospect commercial
  // Suppression de la variable inutilisée 'subject'
  if (subject === 'freelance') {
    return 'Nouveau prospect';
  }

  // Autres sujets = pas forcément des prospects commerciaux
  return 'Prospect'; // Statut plus neutre
}

/**
 * Envoie les données au workflow CommitShift via n8n
 */
async function sendToCommitShiftWorkflow(data: ContactFormData): Promise<{
  success: boolean;
  data?: Record<string, unknown>;
  error?: string;
}> {
  // URL du webhook n8n CommitShift (à configurer selon votre environnement)
  const COMMITSHIFT_WEBHOOK_URL = process.env.COMMITSHIFT_WEBHOOK_URL;

  if (!COMMITSHIFT_WEBHOOK_URL) {
    // console.warn(
    //   'COMMITSHIFT_WEBHOOK_URL non configuré, simulation du workflow'
    // );

    // Simulation pour développement
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      success: true,
      data: {
        id: `sim_${Date.now()}`,
        baserowId: `br_${Math.random().toString(36).substr(2, 9)}`,
        invoiceId: `in_${Math.random().toString(36).substr(2, 9)}`,
      },
    };
  }

  try {
    const response = await fetch(COMMITSHIFT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-Contact-API/1.0',
      },
      body: JSON.stringify({
        nom: `${data.firstName} ${data.lastName}`.trim(),
        email: data.email,
        telephone: data.phone || '',
        entreprise: data.company || '',
        secteur: mapSubjectToSector(), // "Autre" par défaut
        source: 'Formulaire', // Valeur exacte de Baserow
        statut: mapSubjectToStatus(data.subject), // Statut intelligent selon le sujet
        message: data.message,
        // Informations supplémentaires pour le workflow
        sujet: data.subject,
        prestation: data.prestation || '',
      }),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed with status ${response.status}`);
    }

    // Gestion de la réponse (peut ne pas être du JSON)
    let result;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
    } else {
      const text = await response.text();
      result = { message: text || 'Success' };
    }

    return { success: true, data: result };
  } catch (error) {
    // console.error('Erreur webhook CommitShift: ...');
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue',
    };
  }
}

/**
 * Handler POST pour les demandes de contact
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ContactResponse>> {
  try {
    // Parse du JSON
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Données JSON invalides',
          error: 'INVALID_JSON',
        },
        { status: 400 }
      );
    }

    // Validation des données
    const { isValid, errors } = validateContactData(body);
    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Données de formulaire invalides',
          error: errors.join(', '),
        },
        { status: 400 }
      );
    }

    // Sanitisation
    const sanitizedData = sanitizeData(body);

    // Envoi au workflow CommitShift
    const workflowResult = await sendToCommitShiftWorkflow(sanitizedData);

    // Log pour monitoring (sans données sensibles)
    // console.log('Contact traité:', {
    //   timestamp: new Date().toISOString(),
    //   subject: sanitizedData.subject,
    //   company: sanitizedData.company || 'N/A',
    //   success: workflowResult.success,
    // });

    return NextResponse.json({
      success: true,
      message:
        'Votre message a été envoyé avec succès ! Je vous répondrai dans les plus brefs délais.',
      data: workflowResult.data,
    });
  } catch {
    // console.error('Erreur API contact: ...');

    return NextResponse.json(
      {
        success: false,
        message: "Une erreur interne s'est produite. Veuillez réessayer.",
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}

/**
 * Handler OPTIONS pour CORS (si nécessaire)
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      Allow: 'POST, OPTIONS',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
