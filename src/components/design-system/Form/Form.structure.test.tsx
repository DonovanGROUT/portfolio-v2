// ===================================================================
// TESTS STRUCTURELS MOCKÉS POUR LE COMPOSANT FORM - DESIGN SYSTEM
// ===================================================================
// Ce fichier est dédié aux tests de structure/rendu ultra-rapides.
// Il utilise un mock global du module Form pour accélérer l'exécution.
// Les tests avancés (accessibilité, validation, interaction) restent dans Form.test.tsx
// ===================================================================

import { render } from '@testing-library/react';
import React from 'react';
import { vi } from 'vitest';
import type {
  FormProps,
  FormInputProps,
  FormTextareaProps,
  FormSelectProps,
  FormSubmitProps,
} from './Form';

// Mock global du module Form (structure uniquement)
vi.mock('./Form', () => {
  // Ajout des props obligatoires pour matcher les types
  const MockForm = ({ children, onSubmit = () => {}, ...props }: FormProps) => (
    <form data-testid="mock-form" onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
  MockForm.displayName = 'MockForm';
  MockForm.Input = (({ label = '', ...props }: FormInputProps) => (
    <input data-testid="mock-input" aria-label={label} {...props} />
  )) as React.FC<FormInputProps>;
  MockForm.Input.displayName = 'MockFormInput';
  MockForm.Textarea = (({ label = '', ...props }: FormTextareaProps) => (
    <textarea data-testid="mock-textarea" aria-label={label} {...props} />
  )) as React.FC<FormTextareaProps>;
  MockForm.Textarea.displayName = 'MockFormTextarea';
  MockForm.Select = (({ label = '', ...props }: FormSelectProps) => (
    <select data-testid="mock-select" aria-label={label} {...props} />
  )) as React.FC<FormSelectProps>;
  MockForm.Select.displayName = 'MockFormSelect';
  MockForm.Submit = (({ children = 'Submit', ...props }: FormSubmitProps) => (
    <button data-testid="mock-submit" {...props}>
      {children}
    </button>
  )) as React.FC<FormSubmitProps>;
  MockForm.Submit.displayName = 'MockFormSubmit';
  return { Form: MockForm, __esModule: true };
});

import { Form } from './Form';

describe('Form (structure rapide, mocké)', () => {
  it('rend le formulaire et ses sous-composants', () => {
    const { container } = render(
      <Form onSubmit={() => {}}>
        <Form.Input name="test" label="Test" />
        <Form.Textarea name="desc" label="Description" />
        <Form.Select name="sel" label="Sélection" />
        <Form.Submit>Envoyer</Form.Submit>
      </Form>
    );
    expect(
      container.querySelector('[data-testid="mock-form"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-input"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-textarea"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-select"]')
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-testid="mock-submit"]')
    ).toBeInTheDocument();
  });
});
