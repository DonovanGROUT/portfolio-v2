/* eslint-disable no-console */
// BUTTON COMPONENT - Test DevTools automatisé
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

// 1. Vérifier les styles inline (colors.ts system)
const buttons = document.querySelectorAll('button');
console.log('🔍 Boutons trouvés:', buttons.length);

buttons.forEach((btn, index) => {
  const styles = getComputedStyle(btn);
  console.log(`Button ${index + 1}:`, {
    classes: btn.className,
    backgroundColor: styles.backgroundColor,
    borderColor: styles.borderColor,
    color: styles.color,
    variant: btn.style.backgroundColor.includes('rgb(3, 105, 161)')
      ? 'primary'
      : btn.style.backgroundColor.includes('rgb(4, 120, 87)')
        ? 'secondary'
        : btn.style.backgroundColor === 'rgba(0, 0, 0, 0)'
          ? 'outline'
          : 'unknown',
    disabled: btn.disabled,
    ariaBusy: btn.getAttribute('aria-busy'),
  });
});

// 2. Vérifier les styles computed pour validation colors.ts
const allButtons = Array.from(buttons);
const primaryBtn = allButtons.find(btn =>
  btn.style.backgroundColor.includes('rgb(3, 105, 161)')
);
if (primaryBtn) {
  const styles = getComputedStyle(primaryBtn);
  console.log('🎨 Styles Primary Button (colors.ts):', {
    backgroundColor: styles.backgroundColor,
    minHeight: styles.minHeight,
    minWidth: styles.minWidth,
    borderRadius: styles.borderRadius,
    expectedPrimary: 'rgb(3, 105, 161)', // colors.primary[700]
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
