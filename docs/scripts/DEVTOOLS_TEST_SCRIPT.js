/* eslint-disable no-console */
// Test automatique des classes CSS générées
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

// 1. Vérifier les classes Tailwind
const buttons = document.querySelectorAll('button');
console.log('🔍 Boutons trouvés:', buttons.length);

buttons.forEach((btn, index) => {
  console.log(`Button ${index + 1}:`, {
    classes: btn.className,
    hasSky: btn.className.includes('bg-sky'),
    hasEmerald: btn.className.includes('bg-emerald'),
    hasOutline: btn.className.includes('border-sky'),
    disabled: btn.disabled,
    ariaBusy: btn.getAttribute('aria-busy'),
  });
});

// 2. Vérifier les styles computed
const primaryBtn = document.querySelector('.bg-sky-700');
if (primaryBtn) {
  const styles = getComputedStyle(primaryBtn);
  console.log('🎨 Styles Primary Button:', {
    backgroundColor: styles.backgroundColor,
    minHeight: styles.minHeight,
    minWidth: styles.minWidth,
    borderRadius: styles.borderRadius,
  });
}

// 3. Test touch targets
buttons.forEach((btn, index) => {
  const rect = btn.getBoundingClientRect();
  const touchFriendly = rect.height >= 44 && rect.width >= 44;
  console.log(`Touch Target ${index + 1}:`, {
    height: rect.height,
    width: rect.width,
    touchFriendly: touchFriendly ? '✅' : '❌',
  });
});
