/* eslint-disable no-console */
// SCRIPT GLOBAL ANIMATION/LOADING - Coller dans Console DevTools
// Vérifie les animations de loading/spinner sur tous les éléments interactifs

const loadingElements = Array.from(
  document.querySelectorAll('[aria-busy="true"]')
);

if (loadingElements.length === 0) {
  console.warn(
    'Aucun élément interactif en loading (aria-busy) trouvé sur cette page.'
  );
} else {
  console.log('🔄 Éléments en loading trouvés :', loadingElements.length);
  loadingElements.forEach((el, index) => {
    const spinner =
      el.querySelector && el.querySelector('[aria-hidden="true"]');
    if (spinner) {
      const styles = getComputedStyle(spinner);
      console.log(`Spinner ${index + 1}:`, {
        animation: styles.animation,
        transform: styles.transform,
        spinning: styles.animation.includes('spin'),
      });
    } else {
      console.log(`Élément ${index + 1} : pas de spinner détecté.`);
    }
  });
}

// Test que les éléments désactivés ne réagissent pas (boutons natifs ou custom)
const disabledElements = Array.from(
  document.querySelectorAll('button[disabled], [aria-disabled="true"]')
);
if (disabledElements.length === 0) {
  console.log('🚫 Aucun élément désactivé trouvé.');
} else {
  console.log('🚫 Éléments désactivés :', disabledElements.length);
  // Ajouter un event listener temporaire pour tester
  disabledElements.forEach((el, index) => {
    el.addEventListener('click', () => {
      console.warn(
        `❌ Élément désactivé ${index + 1} cliqué ! Ceci ne devrait pas arriver.`
      );
    });
  });
}
