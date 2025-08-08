'use client';

// ===================================================================
// COMPOSANT PRIVACY NOTICE - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Composant pour afficher les informations de protection des données RGPD
// ===================================================================

import React, { useState, useId } from 'react';
import { Typography } from '../Typography/Typography';

/**
 * Props du composant PrivacyNotice
 */
export interface PrivacyNoticeProps {
  /** Email de contact pour les droits RGPD */
  contactEmail: string;
  /** URL vers la politique de confidentialité complète */
  policyUrl?: string;
  /** Texte du lien vers la politique */
  policyLinkText?: string;
  /** Callback appelé quand l'utilisateur accepte */
  onAccept?: (accepted: boolean) => void;
  /** État d'acceptation contrôlé */
  accepted?: boolean;
  /** Classe CSS personnalisée */
  className?: string;
  /** Niveau de titre à utiliser (pour la hiérarchie sémantique) */
  headingLevel?: 'h2' | 'h3' | 'h4';
}

/**
 * Composant PrivacyNotice
 *
 * Affiche les informations RGPD de manière claire et accessible
 */
export function PrivacyNotice({
  contactEmail,
  policyUrl,
  policyLinkText = 'Politique complète',
  onAccept,
  accepted = false,
  className = '',
  headingLevel = 'h3',
}: PrivacyNoticeProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  // IDs stables pour l'accessibilité (SSR-safe)
  const checkboxId = `privacy-checkbox-${useId()}`;
  const titleId = `privacy-notice-title-${useId()}`;
  const detailsId = `privacy-details-${useId()}`;

  const handleAcceptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onAccept?.(event.target.checked);
  };

  return (
    <div
      className={`bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 ${className}`}
      role="region"
      aria-labelledby={titleId}
    >
      {/* Protection de base */}
      <div className="flex items-start space-x-3">
        <div className="text-2xl">🔒</div>
        <div>
          <Typography
            variant={headingLevel}
            id={titleId}
            className="text-gray-900 mb-2 font-semibold"
          >
            Protection de vos donn&eacute;es
          </Typography>
          <Typography variant="body" className="text-gray-700">
            Vos donn&eacute;es restent priv&eacute;es. Elles servent uniquement
            &agrave; vous r&eacute;pondre et ne sont jamais partag&eacute;es.
          </Typography>
        </div>
      </div>

      {/* Détails complets - expansible */}
      <div>
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors duration-200"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
        >
          <span className="text-lg">📋</span>
          <Typography variant="body" className="font-medium">
            Détails complets
          </Typography>
          <span
            className={`transform transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </button>

        {isExpanded && (
          <div
            id={detailsId}
            className="mt-4 pl-6 space-y-3 border-l-2 border-blue-200"
          >
            <Typography variant="body" className="text-gray-700">
              Vos donn&eacute;es personnelles sont collect&eacute;es dans le
              cadre strict de ce formulaire de contact et sont exclusivement
              destin&eacute;es &agrave; permettre une r&eacute;ponse &agrave;
              votre demande.
            </Typography>

            <Typography variant="body" className="text-gray-700">
              Elles ne seront ni c&eacute;d&eacute;es, ni vendues &agrave; des
              tiers.
            </Typography>

            <Typography variant="body" className="text-gray-700">
              Vous disposez d&apos;un droit d&apos;acc&egrave;s, de
              rectification et de suppression en contactant&nbsp;:
              <a
                href={`mailto:${contactEmail}`}
                className="text-blue-700 hover:text-blue-800 ml-1 font-medium"
              >
                📧 {contactEmail}
              </a>
            </Typography>
          </div>
        )}
      </div>

      {/* Lien politique + checkbox */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-300">
        {policyUrl && (
          <a
            href={policyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-700 hover:text-blue-800 transition-colors duration-200"
          >
            <span className="text-lg">📄</span>
            <Typography variant="body" className="font-medium">
              {policyLinkText}
            </Typography>
          </a>
        )}

        <label
          htmlFor={checkboxId}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <input
            id={checkboxId}
            name="privacy-consent"
            type="checkbox"
            checked={accepted}
            onChange={handleAcceptChange}
            className="h-5 w-5 text-blue-600 border-2 border-gray-500 rounded focus:ring-2 focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-200"
            required
          />
          <Typography
            variant="body"
            className="text-gray-900 group-hover:text-gray-950 transition-colors duration-200 font-medium"
          >
            J&apos;accepte les conditions de confidentialit&eacute;
          </Typography>
        </label>
      </div>
    </div>
  );
}

export default PrivacyNotice;
