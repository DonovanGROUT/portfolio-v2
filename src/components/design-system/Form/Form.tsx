'use client';

// ===================================================================
// COMPOSANT FORM - DESIGN SYSTEM PORTFOLIO
// ===================================================================
// Formulaire accessible, responsive, sécurisé, validation, WCAG 2.1 AA
// ===================================================================

import React, { useState, useCallback } from 'react';
import { Typography } from '../Typography/Typography';

// -------------------------------------------------------------------
// TYPES & INTERFACES
// -------------------------------------------------------------------

/**
 * Types d'input supportés par le composant Form
 */
export type InputType = 'text' | 'email' | 'tel' | 'url';

/**
 * Variants disponibles pour le formulaire
 */
export type FormVariant = 'default' | 'contact';

/**
 * Option pour les composants Select
 */
export interface SelectOption {
  value: string;
  label: string;
}

/**
 * Props du composant Form principal
 */
export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  variant?: FormVariant;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children: React.ReactNode;
}

/**
 * Props du composant Form.Input
 */
export interface FormInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: InputType;
  error?: string;
  className?: string;
}

export interface FormTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  error?: string;
  showCharCount?: boolean;
  className?: string;
}

export interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options?: SelectOption[];
  error?: string;
  className?: string;
}

export interface FormSubmitProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: 'primary' | 'secondary';
  className?: string;
  children: React.ReactNode;
}

// Form Input Component
function FormInput({
  name,
  label,
  type = 'text',
  error,
  required = false,
  disabled = false,
  onChange,
  className = '',
  maxLength,
  ...props
}: FormInputProps) {
  const inputId = name;
  const errorId = error ? `${name}-error` : undefined;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = event.target.value;

      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
        event.target.value = newValue;
      }

      onChange?.(event);
    },
    [onChange, maxLength]
  );

  const baseClasses = [
    'w-full px-4 py-3 border-2 rounded-xl transition-all duration-300',
    'focus:outline-none focus:ring-4 focus:ring-opacity-30',
    'placeholder:text-slate-400',
    'min-h-[44px] min-w-[44px]',
    'shadow-sm hover:shadow-md',
  ];

  const stateClasses = error
    ? ['border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50']
    : [
        'border-slate-200 focus:border-sky-500 focus:ring-sky-200 hover:border-slate-300',
      ];

  const disabledClasses = disabled
    ? ['bg-slate-100 text-slate-500 cursor-not-allowed border-slate-200']
    : ['bg-white text-slate-900'];

  const inputClasses = [
    ...baseClasses,
    ...stateClasses,
    ...disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        {label}
        {required && (
          <span
            className="text-red-500 ml-1 font-bold"
            aria-label="champ requis"
          >
            *
          </span>
        )}
      </label>

      <input
        id={inputId}
        name={name}
        type={type}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleChange}
        className={inputClasses}
        aria-required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={errorId}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        autoComplete={
          type === 'email'
            ? 'email'
            : type === 'tel'
              ? 'tel'
              : name === 'firstName'
                ? 'given-name'
                : name === 'lastName'
                  ? 'family-name'
                  : name === 'company'
                    ? 'organization'
                    : undefined
        }
        {...props}
      />

      {error && errorId && (
        <Typography
          variant="caption"
          color="primary"
          id={errorId}
          className="text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

// Form Textarea Component
function FormTextarea({
  name,
  label,
  error,
  required = false,
  disabled = false,
  rows = 4,
  maxLength,
  showCharCount = false,
  onChange,
  className = '',
  value,
  defaultValue,
  ...props
}: FormTextareaProps) {
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const textareaId = name;
  const errorId = error ? `${name}-error` : undefined;
  const charCountId = showCharCount ? `${name}-char-count` : undefined;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      let newValue = event.target.value;

      if (maxLength && newValue.length > maxLength) {
        newValue = newValue.slice(0, maxLength);
        event.target.value = newValue;
      }

      if (!isControlled) {
        setInternalValue(newValue);
      }

      onChange?.(event);
    },
    [onChange, maxLength, isControlled]
  );

  const charCount = typeof currentValue === 'string' ? currentValue.length : 0;
  const charLimit = maxLength || 0;

  const baseClasses = [
    'w-full px-4 py-3 border-2 rounded-xl transition-all duration-300',
    'focus:outline-none focus:ring-4 focus:ring-opacity-30',
    'placeholder:text-slate-400 resize-y',
    'min-h-[44px]',
    'shadow-sm hover:shadow-md',
  ];

  const stateClasses = error
    ? ['border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50']
    : [
        'border-slate-200 focus:border-sky-500 focus:ring-sky-200 hover:border-slate-300',
      ];

  const disabledClasses = disabled
    ? ['bg-slate-100 text-slate-500 cursor-not-allowed border-slate-200']
    : ['bg-white text-slate-900'];

  const textareaClasses = [
    ...baseClasses,
    ...stateClasses,
    ...disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const ariaDescribedBy = [errorId, charCountId].filter(Boolean).join(' ');

  return (
    <div className="space-y-2">
      <label
        htmlFor={textareaId}
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        {label}
        {required && (
          <span
            className="text-red-500 ml-1 font-bold"
            aria-label="champ requis"
          >
            *
          </span>
        )}
      </label>

      <textarea
        id={textareaId}
        name={name}
        rows={rows}
        value={currentValue}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        onChange={handleChange}
        className={textareaClasses}
        aria-required={required}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={ariaDescribedBy || undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        {...props}
      />

      {showCharCount && maxLength && charCountId && (
        <div className="flex justify-end">
          <Typography
            variant="caption"
            color="muted"
            id={charCountId}
            className={
              charCount > charLimit ? 'text-red-600' : 'text-slate-500'
            }
          >
            {charCount}/{charLimit}
          </Typography>
        </div>
      )}

      {error && errorId && (
        <Typography
          variant="caption"
          color="primary"
          id={errorId}
          className="text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

// Form Select Component
function FormSelect({
  name,
  label,
  options = [],
  error,
  required = false,
  disabled = false,
  onChange,
  className = '',
  children,
  ...props
}: FormSelectProps) {
  const selectId = name;
  const errorId = error ? `${name}-error` : undefined;

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(event);
    },
    [onChange]
  );

  const baseClasses = [
    'w-full px-4 py-3 border-2 rounded-xl transition-all duration-300',
    'focus:outline-none focus:ring-4 focus:ring-opacity-30',
    'appearance-none bg-white',
    'min-h-[44px]',
    'shadow-sm hover:shadow-md',
  ];

  const stateClasses = error
    ? ['border-red-400 focus:border-red-500 focus:ring-red-200 bg-red-50']
    : [
        'border-slate-200 focus:border-sky-500 focus:ring-sky-200 hover:border-slate-300',
      ];

  const disabledClasses = disabled
    ? ['bg-slate-100 text-slate-500 cursor-not-allowed border-slate-200']
    : ['bg-white text-slate-900'];

  const selectClasses = [
    ...baseClasses,
    ...stateClasses,
    ...disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="space-y-2">
      <label
        htmlFor={selectId}
        className="block text-sm font-semibold text-slate-700 mb-2"
      >
        {label}
        {required && (
          <span
            className="text-red-500 ml-1 font-bold"
            aria-label="champ requis"
          >
            *
          </span>
        )}
      </label>

      <div className="relative">
        <select
          id={selectId}
          name={name}
          required={required}
          disabled={disabled}
          onChange={handleChange}
          className={selectClasses}
          aria-required={required}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={errorId}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          {...props}
        >
          <option value="" disabled>
            Sélectionnez un sujet
          </option>

          {options.length > 0
            ? options.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))
            : children}
        </select>

        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="h-5 w-5 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {error && errorId && (
        <Typography
          variant="caption"
          color="primary"
          id={errorId}
          className="text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </Typography>
      )}
    </div>
  );
}

// Form Submit Component
function FormSubmit({
  loading = false,
  variant = 'primary',
  disabled = false,
  className = '',
  children,
  ...props
}: FormSubmitProps) {
  const baseClasses = [
    'px-6 py-3 rounded-lg font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-opacity-50',
    'min-h-[44px] min-w-[44px]',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ];

  const variantClasses = {
    primary: [
      'bg-blue-600 text-white',
      'hover:bg-blue-700 focus:ring-blue-200',
      'disabled:bg-blue-400',
    ],
    secondary: [
      'bg-slate-100 text-slate-700 border border-slate-300',
      'hover:bg-slate-200 focus:ring-slate-200',
      'disabled:bg-slate-50',
    ],
  };

  const buttonClasses = [...baseClasses, ...variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type="submit"
      disabled={disabled || loading}
      className={buttonClasses}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
          <span>Envoi en cours...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
}

// Main Form Component
function Form({
  variant = 'default',
  onSubmit,
  className = '',
  children,
  ...props
}: FormProps) {
  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      onSubmit(event);
    },
    [onSubmit]
  );

  const variantClasses = {
    default: 'space-y-6',
    contact: 'space-y-8 max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg',
  };

  const formClasses = [
    'form',
    `form-${variant}`,
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <form
      role="form"
      onSubmit={handleSubmit}
      className={formClasses}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
}

// Composition
Form.Input = FormInput;
Form.Textarea = FormTextarea;
Form.Select = FormSelect;
Form.Submit = FormSubmit;

export { Form };
export default Form;
