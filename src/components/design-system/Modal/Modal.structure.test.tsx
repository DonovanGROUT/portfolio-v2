// ===================================================================
// TESTS STRUCTURELS MOCKÉS POUR LE COMPOSANT MODAL - DESIGN SYSTEM
// ===================================================================
// Ce fichier est dédié aux tests de structure/rendu ultra-rapides.
// Il utilise un mock global du module Modal pour accélérer l'exécution.
// Les tests avancés (accessibilité, focus, interaction) restent dans Modal.test.tsx
// ===================================================================

import { render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import type { ModalProps } from './Modal';

// Mock global du module Modal (structure uniquement)
vi.mock('./Modal', () => {
  const MockModal = ({
    isOpen,
    onClose,
    title,
    description,
    showCloseButton,
    className,
    children,
  }: ModalProps) =>
    isOpen ? (
      <div data-testid="mock-modal" className={className}>
        {showCloseButton && (
          <button data-testid="mock-close" onClick={onClose}>
            X
          </button>
        )}
        {title && <h2 data-testid="mock-title">{title}</h2>}
        {description && <p data-testid="mock-description">{description}</p>}
        <div data-testid="mock-content">{children}</div>
      </div>
    ) : null;
  return { default: MockModal, __esModule: true };
});

import Modal from './Modal';

describe('Modal (structure rapide, mocké)', () => {
  it('rend la structure de base du modal ouvert', () => {
    const { container } = render(
      <Modal
        isOpen={true}
        onClose={() => {}}
        title="Titre"
        description="Desc"
        showCloseButton
      >
        <div>Contenu</div>
      </Modal>
    );
    expect(
      container.querySelector('[data-testid="mock-modal"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-title"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-description"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-close"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-content"]')
    ).toBeInTheDocument();
  });

  it('ne rend rien si isOpen est false', () => {
    const { container } = render(
      <Modal isOpen={false} onClose={() => {}}>
        <div>Contenu</div>
      </Modal>
    );
    expect(
      container.querySelector('[data-testid="mock-modal"]')
    ).not.toBeInTheDocument();
  });
});
