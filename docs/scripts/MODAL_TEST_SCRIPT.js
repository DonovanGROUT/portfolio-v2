/* eslint-disable no-console */
// MODAL COMPONENT - Test DevTools automatisé
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

console.log('🟦 MODAL COMPONENT - VALIDATION AUTOMATIQUE');

// 1. Vérifier la présence des modals dans le DOM
const modals = document.querySelectorAll('[role="dialog"]');
console.log('📝 Modals trouvés:', modals.length);
modals.forEach((modal, index) => {
  const styles = getComputedStyle(modal);
  const overlay =
    modal.parentElement &&
    modal.parentElement.querySelector('[data-modal-overlay]');
  console.log(`Modal ${index + 1}:`, {
    classes: modal.className,
    backgroundColor: styles.backgroundColor,
    borderRadius: styles.borderRadius,
    overlayPresent: !!overlay,
    overlayOpacity: overlay ? getComputedStyle(overlay).opacity : undefined,
    visible: styles.display !== 'none',
    ariaModal: modal.getAttribute('aria-modal'),
    ariaLabelledby: modal.getAttribute('aria-labelledby'),
    ariaDescribedby: modal.getAttribute('aria-describedby'),
    tabIndex: modal.tabIndex,
  });
});

// 2. Vérifier la structure ARIA et l'accessibilité
modals.forEach((modal, index) => {
  const titleId = modal.getAttribute('aria-labelledby');
  const descId = modal.getAttribute('aria-describedby');
  const title = titleId ? document.getElementById(titleId) : null;
  const desc = descId ? document.getElementById(descId) : null;
  console.log(`Modal ${index + 1} ARIA:`, {
    role: modal.getAttribute('role'),
    ariaModal: modal.getAttribute('aria-modal'),
    labelledBy: title ? title.textContent : null,
    describedBy: desc ? desc.textContent : null,
  });
});

// 3. Vérifier le focus trap et la navigation clavier
const focusableSelectors = [
  'button',
  '[href]',
  'input',
  'select',
  'textarea',
  '[tabindex]:not([tabindex="-1"])',
];
modals.forEach((modal, index) => {
  const focusables = modal.querySelectorAll(focusableSelectors.join(','));
  console.log(`Modal ${index + 1} éléments focusables:`, focusables.length);
  focusables.forEach((el, i) => {
    console.log(`  Focusable ${i + 1}:`, el.tagName, el.className, el.tabIndex);
  });
});

// 4. Vérifier les boutons d'action et le bouton fermer
modals.forEach((modal, index) => {
  const closeBtn = modal.querySelector(
    'button, [aria-label*="fermer" i], [aria-label*="close" i]'
  );
  const actionBtns = modal.querySelectorAll(
    'button:not([aria-label*="fermer" i]):not([aria-label*="close" i])'
  );
  console.log(`Modal ${index + 1} boutons:`, {
    closeButton: !!closeBtn,
    actionButtons: actionBtns.length,
  });
});

// 5. Vérifier l'overlay et les interactions
modals.forEach((modal, index) => {
  const overlay =
    modal.parentElement &&
    modal.parentElement.querySelector('[data-modal-overlay]');
  if (overlay) {
    const rect = overlay.getBoundingClientRect();
    const touchFriendly = rect.height >= 44 && rect.width >= 44;
    console.log(`Overlay Modal ${index + 1}:`, {
      height: rect.height,
      width: rect.width,
      touchFriendly: touchFriendly ? '✅' : '❌',
      opacity: getComputedStyle(overlay).opacity,
    });
  }
});

// 6. Vérifier les animations (ouverture/fermeture)
modals.forEach((modal, index) => {
  const styles = getComputedStyle(modal);
  const hasAnimation = styles.animationName && styles.animationName !== 'none';
  console.log(`Modal ${index + 1} animation:`, {
    animationName: styles.animationName,
    duration: styles.animationDuration,
    hasAnimation,
  });
});

// 7. Vérifier la gestion du focus à la fermeture
console.log(
  '🔄 Test manuel recommandé :\n- Ouvrir un modal, tabuler dans tous les éléments, fermer le modal, vérifier que le focus revient au bouton déclencheur.'
);

console.log('🎉 Test Modal Component terminé !');
