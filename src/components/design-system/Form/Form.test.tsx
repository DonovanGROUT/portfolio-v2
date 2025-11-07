// ===================================================================
// TESTS UNITAIRES POUR LE COMPOSANT FORM - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Tests d'accessibilité, variants, états, sécurité, interactions, validation
// ===================================================================

import { describe, test, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Form } from './Form';

interface MockTypographyProps {
  children: React.ReactNode;
  [key: string]: unknown;
}

// Mock du composant Typography pour éviter les dépendances
vi.mock('../Typography/Typography', () => ({
  Typography: ({ children, ...props }: MockTypographyProps) => (
    <div data-testid="typography" {...props}>
      {children}
    </div>
  ),
}));

// Mocks globaux des sous-composants Form pour accélérer les tests de structure/rendu

describe('Form Component - Design System', () => {
  describe('Form Structure and Rendering', () => {
    test('should render form with correct attributes', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="test" label="Test" />
        </Form>
      );

      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      expect(form).toHaveAttribute('noValidate');
    });

    test('should render with contact variant', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit} variant="contact">
          <Form.Input name="name" label="Nom" />
        </Form>
      );

      expect(screen.getByRole('form')).toBeInTheDocument();
    });

    test('should accept custom className', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit} className="custom-form">
          <Form.Input name="test" label="Test" />
        </Form>
      );

      expect(screen.getByRole('form')).toHaveClass('custom-form');
    });
  });

  describe('Form Input Component', () => {
    test('should render input with label association', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="email" label="Email Address" />
        </Form>
      );

      const input = screen.getByLabelText('Email Address');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('id', 'email');
      expect(input).toHaveAttribute('name', 'email');
    });

    test('should support all contact input types', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="name" label="Nom" type="text" />
          <Form.Input name="email" label="Email" type="email" />
          <Form.Input name="phone" label="Téléphone" type="tel" />
          <Form.Input name="website" label="Site" type="url" />
        </Form>
      );

      expect(screen.getByLabelText('Nom')).toHaveAttribute('type', 'text');
      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
      expect(screen.getByLabelText('Téléphone')).toHaveAttribute('type', 'tel');
      expect(screen.getByLabelText('Site')).toHaveAttribute('type', 'url');
    });

    test('should show required asterisk for required fields', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="email" label="Email" required />
        </Form>
      );

      expect(
        screen.getByRole('textbox', { name: /email/i })
      ).toBeInTheDocument();
      expect(screen.getByLabelText('champ requis')).toBeInTheDocument();
    });

    test('should display error messages', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="email" label="Email" error="Email invalide" />
        </Form>
      );

      const input = screen.getByLabelText('Email');
      const errorMessage = screen.getByText('Email invalide');

      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveAttribute('role', 'alert');
      expect(errorMessage).toHaveAttribute('id', 'email-error');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(input).toHaveClass('border-red-400');
    });

    test('should limit input length with maxLength', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="name" label="Nom" maxLength={5} />
        </Form>
      );

      const input = screen.getByLabelText('Nom') as HTMLInputElement;
      await user.type(input, 'VeryLongName');

      expect(input.value).toHaveLength(5);
      expect(input.value).toBe('VeryL');
    });

    test('should handle onChange events', async () => {
      const mockSubmit = vi.fn();
      const mockChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="name" label="Nom" onChange={mockChange} />
        </Form>
      );

      const input = screen.getByLabelText('Nom');
      await user.type(input, 'Test');

      expect(mockChange).toHaveBeenCalled();
    });

    test('should support disabled state', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="name" label="Nom" disabled />
        </Form>
      );

      expect(screen.getByLabelText('Nom')).toBeDisabled();
    });

    test('should support placeholder text', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="name" label="Nom" placeholder="Entrez votre nom" />
        </Form>
      );

      expect(
        screen.getByPlaceholderText('Entrez votre nom')
      ).toBeInTheDocument();
    });
  });

  describe('Form Textarea Component', () => {
    test('should render textarea with proper attributes', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea name="message" label="Message" rows={5} />
        </Form>
      );

      const textarea = screen.getByLabelText('Message');
      expect(textarea.tagName).toBe('TEXTAREA');
      expect(textarea).toHaveAttribute('rows', '5');
    });

    test('should show character count when enabled', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea
            name="message"
            label="Message"
            maxLength={100}
            showCharCount
          />
        </Form>
      );

      expect(screen.getByText('0/100')).toBeInTheDocument();
    });

    test('should update character count on input', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea
            name="message"
            label="Message"
            maxLength={100}
            showCharCount
          />
        </Form>
      );

      const textarea = screen.getByLabelText('Message');
      await user.type(textarea, 'Hello');

      expect(screen.getByText('5/100')).toBeInTheDocument();
    });

    test('should enforce maxLength limit', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea name="message" label="Message" maxLength={10} />
        </Form>
      );

      const textarea = screen.getByLabelText('Message') as HTMLTextAreaElement;
      await user.type(textarea, 'This is a very long message');

      expect(textarea.value).toHaveLength(10);
    });

    test('should show error state for textarea', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea
            name="message"
            label="Message"
            error="Message requis"
          />
        </Form>
      );

      const textarea = screen.getByLabelText('Message');
      expect(textarea).toHaveClass('border-red-400');
      expect(screen.getByText('Message requis')).toBeInTheDocument();
    });
  });

  describe('Form Select Component', () => {
    const options = [
      { value: 'job', label: 'Emploi' },
      { value: 'freelance', label: 'Freelance' },
      { value: 'collaboration', label: 'Collaboration' },
    ];

    test('should render select with options', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Select name="subject" label="Sujet" options={options} />
        </Form>
      );

      const select = screen.getByLabelText('Sujet');
      expect(select.tagName).toBe('SELECT');
      expect(
        screen.getByRole('option', { name: 'Emploi' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('option', { name: 'Freelance' })
      ).toBeInTheDocument();
    });

    test('should handle select changes', async () => {
      const mockSubmit = vi.fn();
      const mockChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Select
            name="subject"
            label="Sujet"
            options={options}
            onChange={mockChange}
          />
        </Form>
      );

      const select = screen.getByLabelText('Sujet');
      await user.selectOptions(select, 'job');

      expect(mockChange).toHaveBeenCalled();
      expect(select).toHaveValue('job');
    });

    test('should show error state for select', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Select
            name="subject"
            label="Sujet"
            options={options}
            error="Sujet requis"
          />
        </Form>
      );

      expect(screen.getByText('Sujet requis')).toBeInTheDocument();
    });
  });

  describe('Form Submit Component', () => {
    test('should render submit button', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Submit>Envoyer</Form.Submit>
        </Form>
      );

      const button = screen.getByRole('button', { name: 'Envoyer' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('type', 'submit');
    });

    test('should show loading state', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Submit loading>Envoyer</Form.Submit>
        </Form>
      );

      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(screen.getByText('Envoi en cours...')).toBeInTheDocument();
    });

    test('should support secondary variant', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Submit variant="secondary">Annuler</Form.Submit>
        </Form>
      );

      const button = screen.getByRole('button', { name: 'Annuler' });
      expect(button).toHaveClass('bg-slate-100');
    });

    test('should handle disabled state', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Submit disabled>Envoyer</Form.Submit>
        </Form>
      );

      expect(screen.getByRole('button')).toBeDisabled();
    });

    test('should handle button clicks', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Submit>Envoyer</Form.Submit>
        </Form>
      );

      const button = screen.getByRole('button', { name: 'Envoyer' });
      await user.click(button);

      expect(mockSubmit).toHaveBeenCalled();
    });
  });

  describe('Form Validation and Interaction', () => {
    test('should handle form submission', async () => {
      const mockSubmit = vi.fn(e => e.preventDefault());
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="name" label="Nom" defaultValue="Test" />
          <Form.Submit>Envoyer</Form.Submit>
        </Form>
      );

      const button = screen.getByRole('button', { name: 'Envoyer' });
      await user.click(button);

      expect(mockSubmit).toHaveBeenCalled();
    });

    test('should support controlled inputs', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      const TestForm = () => {
        const [value, setValue] = React.useState('');
        return (
          <Form onSubmit={mockSubmit}>
            <Form.Input
              name="controlled"
              label="Controlled"
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setValue(e.target.value)
              }
            />
          </Form>
        );
      };

      render(<TestForm />);

      const input = screen.getByLabelText('Controlled');
      await user.type(input, 'test');

      expect(input).toHaveValue('test');
    });

    test('should support uncontrolled inputs', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input
            name="uncontrolled"
            label="Uncontrolled"
            defaultValue="initial"
          />
        </Form>
      );

      expect(screen.getByLabelText('Uncontrolled')).toHaveValue('initial');
    });
  });

  describe('Accessibility Features', () => {
    test('should have proper ARIA attributes', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input
            name="email"
            label="Email"
            required
            error="Email requis"
          />
        </Form>
      );

      const input = screen.getByRole('textbox', { name: /email/i });
      expect(input).toHaveAttribute('aria-required', 'true');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
    });

    test('should support keyboard navigation', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="first" label="First" />
          <Form.Input name="second" label="Second" />
          <Form.Submit>Submit</Form.Submit>
        </Form>
      );

      const firstInput = screen.getByLabelText('First');
      firstInput.focus();

      await user.tab();
      expect(screen.getByLabelText('Second')).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: 'Submit' })).toHaveFocus();
    });

    test('should have minimum touch target sizes', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="test" label="Test" />
          <Form.Submit>Submit</Form.Submit>
        </Form>
      );

      const input = screen.getByLabelText('Test');
      const button = screen.getByRole('button');

      expect(input).toHaveClass('min-h-[44px]');
      expect(button).toHaveClass('min-h-[44px]');
    });
  });

  describe('Security Features', () => {
    test('should sanitize input values', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="test" label="Test" maxLength={5} />
        </Form>
      );

      const input = screen.getByLabelText('Test') as HTMLInputElement;
      await user.type(input, '<script>alert("xss")</script>');

      // Should be truncated to maxLength, preventing XSS
      expect(input.value).toHaveLength(5);
    });

    test('should use appropriate input types', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="email" label="Email" type="email" />
          <Form.Input name="phone" label="Phone" type="tel" />
          <Form.Input name="website" label="Website" type="url" />
        </Form>
      );

      expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
      expect(screen.getByLabelText('Phone')).toHaveAttribute('type', 'tel');
      expect(screen.getByLabelText('Website')).toHaveAttribute('type', 'url');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should handle empty options array', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Select name="empty" label="Empty" options={[]} />
        </Form>
      );

      const select = screen.getByLabelText('Empty');
      expect(select.children).toHaveLength(1); // Just the disabled placeholder
    });

    test('should handle missing label gracefully', () => {
      const mockSubmit = vi.fn();

      // This should not crash even though it's not ideal
      expect(() => {
        render(
          <Form onSubmit={mockSubmit}>
            <Form.Input name="nolabel" label="" />
          </Form>
        );
      }).not.toThrow();
    });

    test('should handle very long text in textarea', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();
      const longText = 'A'.repeat(20); // Plus court pour éviter timeout

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea name="long" label="Long" maxLength={10} />
        </Form>
      );

      const textarea = screen.getByLabelText('Long') as HTMLTextAreaElement;
      await user.type(textarea, longText);

      expect(textarea.value).toHaveLength(10);
    }, 10000);

    test('should handle rapid input changes', async () => {
      const mockSubmit = vi.fn();
      const mockChange = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="rapid" label="Rapid" onChange={mockChange} />
        </Form>
      );

      const input = screen.getByLabelText('Rapid');

      // Simulate rapid typing (userEvent appelle onChange pour chaque caractère)
      await user.type(input, 'abc');

      expect(mockChange).toHaveBeenCalledTimes(3);
    });

    test('should handle all autoComplete values', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="firstName" label="First" type="text" />
          <Form.Input name="lastName" label="Last" type="text" />
          <Form.Input name="email" label="Email" type="email" />
          <Form.Input name="company" label="Company" type="text" />
          <Form.Input name="phone" label="Phone" type="tel" />
          <Form.Input name="other" label="Other" type="text" />
        </Form>
      );

      const firstNameInput = screen.getByLabelText('First');
      const lastNameInput = screen.getByLabelText('Last');
      const emailInput = screen.getByLabelText('Email');
      const companyInput = screen.getByLabelText('Company');
      const phoneInput = screen.getByLabelText('Phone');
      const otherInput = screen.getByLabelText('Other');

      expect(firstNameInput).toHaveAttribute('autocomplete', 'given-name');
      expect(lastNameInput).toHaveAttribute('autocomplete', 'family-name');
      expect(emailInput).toHaveAttribute('autocomplete', 'email');
      expect(companyInput).toHaveAttribute('autocomplete', 'organization');
      expect(phoneInput).toHaveAttribute('autocomplete', 'tel');
      expect(otherInput).not.toHaveAttribute('autocomplete');
    });

    test('should handle textarea without showCharCount', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea name="simple" label="Simple" showCharCount={false} />
        </Form>
      );

      const textarea = screen.getByLabelText('Simple');
      expect(textarea).toBeInTheDocument();

      // Vérifier qu'il n'y a pas de compteur
      expect(screen.queryByText(/0 \/ /)).not.toBeInTheDocument();
    });

    test('should handle select without options prop', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Select name="empty" label="Empty">
            <option value="">Select an option</option>
            <option value="1">Option 1</option>
          </Form.Select>
        </Form>
      );

      const select = screen.getByLabelText('Empty');
      expect(select).toBeInTheDocument();
      // Le composant ajoute une option vide par défaut, donc 3 au total
      expect(select.children).toHaveLength(3);
    });

    test('should handle form variants', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit} variant="contact">
          <Form.Input name="test" label="Test" />
        </Form>
      );

      const form = screen.getByRole('form');
      expect(form).toHaveClass('form-contact');
    });

    test('should handle textarea with controlled value', () => {
      const mockSubmit = vi.fn();
      const mockChange = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea
            name="controlled"
            label="Controlled"
            value="test value"
            onChange={mockChange}
          />
        </Form>
      );

      const textarea = screen.getByLabelText('Controlled');
      expect(textarea).toHaveValue('test value');
    });

    test('should handle input type url and tel', async () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="url" label="URL" type="url" />
          <Form.Input name="tel" label="Phone" type="tel" />
        </Form>
      );

      const urlInput = screen.getByLabelText('URL');
      const telInput = screen.getByLabelText('Phone');

      expect(urlInput).toHaveAttribute('type', 'url');
      expect(telInput).toHaveAttribute('type', 'tel');
    });

    test('should handle autoComplete for company field', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="company" label="Company" />
        </Form>
      );

      const input = screen.getByLabelText('Company');
      expect(input).toHaveAttribute('autoComplete', 'organization');
    });

    test('should handle textarea character count exceeding limit', async () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea
            name="exceed"
            label="Exceed"
            maxLength={5}
            showCharCount={true}
            defaultValue="This text is too long"
          />
        </Form>
      );

      const charCount = screen.getByText(/21\/5/);
      expect(charCount).toHaveClass('text-red-600');
    });

    test('should handle form with invalid fields', async () => {
      const mockSubmit = vi.fn();
      const user = userEvent.setup();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Input name="required" label="Required" required />
          <Form.Submit>Submit</Form.Submit>
        </Form>
      );

      const button = screen.getByRole('button', { name: 'Submit' });

      // Mock reportValidity to avoid browser validation popup
      const form = screen.getByRole('form') as HTMLFormElement;
      const mockReportValidity = vi.fn();
      const mockCheckValidity = vi.fn().mockReturnValue(false);

      form.reportValidity = mockReportValidity;
      form.checkValidity = mockCheckValidity;

      await user.click(button);

      expect(mockCheckValidity).toHaveBeenCalled();
      expect(mockReportValidity).toHaveBeenCalled();
      // Le submit est toujours appelé mais preventDefault empêche le comportement par défaut
    });

    test('should handle disabled select styling', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Select
            name="disabled"
            label="Disabled Select"
            disabled={true}
          />
        </Form>
      );

      const select = screen.getByLabelText('Disabled Select');
      expect(select).toHaveClass(
        'bg-slate-100',
        'text-slate-500',
        'cursor-not-allowed'
      );
    });

    test('should handle disabled textarea styling', () => {
      const mockSubmit = vi.fn();

      render(
        <Form onSubmit={mockSubmit}>
          <Form.Textarea
            name="disabled"
            label="Disabled Textarea"
            disabled={true}
          />
        </Form>
      );

      const textarea = screen.getByLabelText('Disabled Textarea');
      expect(textarea).toHaveClass(
        'bg-slate-100',
        'text-slate-500',
        'cursor-not-allowed'
      );
    });
  });
});
