/* eslint-disable no-console */
// Test Loading Animation - Console DevTools
// Vérification que le spinner tourne

const loadingButtons = document.querySelectorAll('button[aria-busy="true"]');
console.log('🔄 Loading buttons trouvés:', loadingButtons.length);

loadingButtons.forEach((btn, index) => {
  const spinner = btn.querySelector('[aria-hidden="true"]');
  if (spinner) {
    const styles = getComputedStyle(spinner);
    console.log(`Spinner ${index + 1}:`, {
      animation: styles.animation,
      transform: styles.transform,
      spinning: styles.animation.includes('spin'),
    });
  }
});

// Test que disabled buttons ne réagissent pas
const disabledButtons = document.querySelectorAll('button[disabled]');
console.log('🚫 Disabled buttons:', disabledButtons.length);

// Ajouter un event listener temporaire pour tester
disabledButtons.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    console.warn(
      `❌ Disabled button ${index + 1} clicked! This should not happen.`
    );
  });
});
