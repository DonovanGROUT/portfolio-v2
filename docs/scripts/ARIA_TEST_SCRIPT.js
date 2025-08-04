/* eslint-disable no-console */
// SCRIPT GLOBAL ACCESSIBILITÉ - Coller dans Console DevTools
// Vérifie les attributs d'accessibilité sur tous les éléments interactifs

const nativeButtons = Array.from(document.querySelectorAll('button'));
const customButtons = Array.from(
  document.querySelectorAll('[role="button"], [tabindex]')
).filter(
  el =>
    // Exclure les boutons natifs déjà pris
    el.tagName.toLowerCase() !== 'button' &&
    // Focusable
    (el.tabIndex >= 0 || el.getAttribute('role') === 'button')
);
const links = Array.from(document.querySelectorAll('a[href], [role="link"]'));

const allInteractive = [...nativeButtons, ...customButtons, ...links];

if (allInteractive.length === 0) {
  console.warn(
    'Aucun élément interactif (bouton, card, lien) trouvé sur cette page.'
  );
} else {
  console.log(
    '🔍 Test ARIA Attributes sur',
    allInteractive.length,
    'éléments interactifs :'
  );
  allInteractive.forEach((el, index) => {
    const tag = el.tagName.toLowerCase();
    const role =
      el.getAttribute('role') ||
      (tag === 'button'
        ? 'button (implicit)'
        : tag === 'a'
          ? 'link (implicit)'
          : '');
    const isDisabled =
      el.disabled !== undefined
        ? el.disabled
        : el.getAttribute('aria-disabled') === 'true';
    const isLoading =
      el.querySelector && el.querySelector('[aria-hidden="true"]');
    const tabIndex = el.tabIndex;
    const ariaBusy = el.getAttribute('aria-busy');
    const ariaDisabled = el.getAttribute('aria-disabled');
    const id = el.id ? `#${el.id}` : '';
    console.log(`Élément ${index + 1} : <${tag}${id}>`, {
      role,
      tabIndex,
      'aria-disabled': ariaDisabled,
      'aria-busy': ariaBusy,
      disabled: isDisabled,
      hasSpinner: !!isLoading,
      focusable: tabIndex >= 0,
    });
  });

  // Test focus management
  const focusable = allInteractive.filter(
    el =>
      !(
        (el.disabled !== undefined && el.disabled) ||
        el.getAttribute('aria-disabled') === 'true'
      ) && el.tabIndex >= 0
  );
  console.log('✅ Éléments focusables:', focusable.length);
  console.log('❌ Non-focusables:', allInteractive.length - focusable.length);
}
