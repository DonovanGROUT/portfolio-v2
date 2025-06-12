/* eslint-disable no-console */
// Test ARIA - Coller dans Console DevTools
// Vérification des attributs d'accessibilité

const buttons = document.querySelectorAll('button');
console.log('🔍 Test ARIA Attributes:');

buttons.forEach((btn, index) => {
  const isDisabled = btn.disabled;
  const isLoading = btn.querySelector('[aria-hidden="true"]'); // spinner

  console.log(`Button ${index + 1}:`, {
    'aria-disabled': btn.getAttribute('aria-disabled'),
    'aria-busy': btn.getAttribute('aria-busy'),
    tabIndex: btn.tabIndex,
    role: btn.getAttribute('role') || 'button (implicit)',
    disabled: isDisabled,
    hasSpinner: !!isLoading,
  });
});

// Test focus management
const focusableButtons = Array.from(buttons).filter(
  btn => !btn.disabled && btn.tabIndex !== -1
);
console.log('✅ Focusable buttons:', focusableButtons.length);
console.log(
  '❌ Non-focusable buttons:',
  buttons.length - focusableButtons.length
);
