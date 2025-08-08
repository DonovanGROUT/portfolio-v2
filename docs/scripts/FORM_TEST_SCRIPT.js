/* eslint-disable no-console */
// FORM COMPONENT - Test DevTools automatisé
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

// 1. Vérifier la structure du formulaire de contact
const forms = document.querySelectorAll('form');
console.log('🔍 Formulaires trouvés:', forms.length);

forms.forEach((form, index) => {
  console.log(`Form ${index + 1}:`, {
    role: form.getAttribute('role'),
    noValidate: form.hasAttribute('novalidate'),
    variant: form.classList.contains('space-y-6') ? 'contact' : 'default',
    method: form.method,
    action: form.action,
  });
});

// 2. Vérifier les champs de contact professionnels
const inputs = document.querySelectorAll(
  'input[type="text"], input[type="email"], input[type="tel"], input[type="url"]'
);
console.log('📋 Champs input trouvés:', inputs.length);

inputs.forEach((input, index) => {
  const label = document.querySelector(`label[for="${input.id}"]`);
  const isRequired = input.hasAttribute('required');
  console.log(`Input ${index + 1}:`, {
    name: input.name,
    type: input.type,
    label: label ? label.textContent : 'NO LABEL',
    required: isRequired,
    maxLength: input.maxLength > 0 ? input.maxLength : 'unlimited',
    placeholder: input.placeholder,
    value: input.value,
    'aria-required': input.getAttribute('aria-required'),
    'aria-invalid': input.getAttribute('aria-invalid'),
    'aria-describedby': input.getAttribute('aria-describedby'),
  });
});

// 3. Vérifier les textareas pour messages
const textareas = document.querySelectorAll('textarea');
console.log('✍️ Textareas trouvées:', textareas.length);

textareas.forEach((textarea, index) => {
  const charCount = document.querySelector(`#${textarea.name}-char-count`);
  console.log(`Textarea ${index + 1}:`, {
    name: textarea.name,
    rows: textarea.rows,
    maxLength: textarea.maxLength > 0 ? textarea.maxLength : 'unlimited',
    currentLength: textarea.value.length,
    hasCharCounter: !!charCount,
    charCountText: charCount ? charCount.textContent : 'none',
  });
});

// 4. Vérifier les selects pour sujets de contact
const selects = document.querySelectorAll('select');
console.log('📋 Selects trouvés:', selects.length);

selects.forEach((select, index) => {
  const options = Array.from(select.options).map(opt => ({
    value: opt.value,
    text: opt.text,
    disabled: opt.disabled,
  }));
  console.log(`Select ${index + 1}:`, {
    name: select.name,
    options: options,
    currentValue: select.value,
    required: select.hasAttribute('required'),
  });
});

// 5. Test de validation des champs requis
console.log('🔍 Test de validation:');
const requiredFields = document.querySelectorAll('[required]');
requiredFields.forEach((field, index) => {
  const fieldType = field.tagName.toLowerCase();
  const asterisk = field
    .closest('.space-y-2')
    ?.querySelector('span[aria-label="champ requis"]');
  console.log(`Champ requis ${index + 1}:`, {
    type: fieldType,
    name: field.name,
    hasAsterisk: !!asterisk,
    'aria-required': field.getAttribute('aria-required'),
    validity: field.validity.valid ? 'valid' : 'invalid',
  });
});

// 6. Vérifier les boutons submit
const submitButtons = document.querySelectorAll('button[type="submit"]');
console.log('🚀 Boutons submit trouvés:', submitButtons.length);

submitButtons.forEach((btn, index) => {
  const rect = btn.getBoundingClientRect();
  const isLoading = btn.getAttribute('aria-busy') === 'true';
  console.log(`Submit Button ${index + 1}:`, {
    text: btn.textContent.trim(),
    disabled: btn.disabled,
    loading: isLoading,
    variant: btn.classList.contains('bg-slate-100') ? 'secondary' : 'primary',
    touchTarget: `${rect.height}x${rect.width}px`,
    touchFriendly: rect.height >= 44 && rect.width >= 44,
    'aria-busy': btn.getAttribute('aria-busy'),
  });
});

// 7. Test des messages d'erreur
const errorMessages = document.querySelectorAll('[role="alert"]');
console.log("⚠️ Messages d'erreur trouvés:", errorMessages.length);

errorMessages.forEach((error, index) => {
  console.log(`Error Message ${index + 1}:`, {
    id: error.id,
    text: error.textContent,
    visible: error.offsetParent !== null,
    'aria-live': error.getAttribute('aria-live'),
  });
});

// 8. Test de sécurité des types d'input
console.log("🔒 Sécurité des types d'input:");
const securityChecks = {
  emailInputs: document.querySelectorAll('input[type="email"]').length,
  telInputs: document.querySelectorAll('input[type="tel"]').length,
  urlInputs: document.querySelectorAll('input[type="url"]').length,
  textInputs: document.querySelectorAll('input[type="text"]').length,
  maxLengthProtected: document.querySelectorAll('[maxlength]').length,
};
console.log('Types sécurisés:', securityChecks);

// 9. Test d'accessibilité WCAG
console.log("♿ Tests d'accessibilité:");
let accessibilityIssues = [];

// Labels associés
inputs.forEach(input => {
  if (input.type !== 'submit') {
    const label = document.querySelector(`label[for="${input.id}"]`);
    if (!label) {
      accessibilityIssues.push(`Input ${input.name} sans label associé`);
    }
  }
});

// Touch targets
[...inputs, ...submitButtons].forEach((element, index) => {
  const rect = element.getBoundingClientRect();
  if (rect.height < 44 || rect.width < 44) {
    accessibilityIssues.push(
      `Element ${index} trop petit (${rect.height}x${rect.width}px)`
    );
  }
});

console.log(
  "Issues d'accessibilité:",
  accessibilityIssues.length > 0
    ? accessibilityIssues
    : '✅ Aucun problème détecté'
);

// 10. Test de performance du formulaire
console.log('⚡ Performance:');
const startTime = performance.now();
const formElements = document.querySelectorAll(
  'form, input, textarea, select, label, button'
);
const endTime = performance.now();

console.log('Éléments de formulaire:', {
  total: formElements.length,
  queryTime: `${(endTime - startTime).toFixed(2)}ms`,
  recommendation:
    formElements.length > 50
      ? 'Considérer lazy loading'
      : '✅ Performance optimale',
});

console.log('🎯 Tests terminés - Voir les résultats ci-dessus');
