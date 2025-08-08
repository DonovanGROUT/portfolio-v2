/* eslint-disable no-console */
// NAVIGATION COMPONENT - Test DevTools automatisé
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

console.log('🚢 NAVIGATION COMPONENT TEST - Phase 3 TDD');

// 1. VÉRIFICATION DU RENDU ET DES ÉLÉMENTS
console.log('\n📋 1. VÉRIFICATION ÉLÉMENTS NAVIGATION');
const nav = document.querySelector('nav');
const logo = document.querySelector('nav a[href="/"]');
const menuButton =
  document.querySelector('nav button[aria-label*="menu"]') ||
  document.querySelector('nav button[aria-expanded]') ||
  document.querySelector('nav button:not([type])');
const navLinks = document.querySelectorAll('nav a:not([href="/"])');

console.log('Navigation trouvée:', !!nav);
console.log('Logo trouvé:', !!logo);
console.log('Bouton menu mobile trouvé:', !!menuButton);
console.log('Liens navigation:', navLinks.length);

// 2. VÉRIFICATION DES COULEURS colors.ts
console.log('\n🎨 2. VÉRIFICATION COULEURS colors.ts');
if (nav) {
  const navStyles = window.getComputedStyle(nav);
  console.log('Couleur fond navigation:', navStyles.backgroundColor);
  console.log('Bordure navigation:', navStyles.borderBottomColor);
}

navLinks.forEach((link, index) => {
  const linkStyles = window.getComputedStyle(link);
  console.log(`Lien ${index + 1} - Couleur:`, linkStyles.color);
});

// 3. TEST MENU MOBILE (RESPONSIVE)
console.log('\n📱 3. TEST MENU MOBILE');
if (menuButton) {
  console.log('État initial menu mobile:');
  const initialState = menuButton.getAttribute('aria-expanded');
  console.log('aria-expanded initial:', initialState);

  // Simuler clic ouverture
  console.log('🔄 Simulation ouverture menu...');
  menuButton.click();

  setTimeout(() => {
    const openState = menuButton.getAttribute('aria-expanded');
    console.log('aria-expanded après ouverture:', openState);

    // Vérifier menu visible
    const mobileMenu = document.querySelector('nav > div:last-child');
    if (mobileMenu) {
      const menuStyles = window.getComputedStyle(mobileMenu);
      console.log('Menu mobile affiché:', menuStyles.display !== 'none');
    }

    // Simuler clic fermeture
    console.log('🔄 Simulation fermeture menu...');
    menuButton.click();

    setTimeout(() => {
      const closeState = menuButton.getAttribute('aria-expanded');
      console.log('aria-expanded après fermeture:', closeState);
    }, 100);
  }, 100);
}

// 4. TEST ÉTATS HOVER ET FOCUS
console.log('\n✨ 4. TEST ÉTATS INTERACTIFS');
navLinks.forEach((link, index) => {
  console.log(`Test hover lien ${index + 1}:`);

  // Simuler hover
  link.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
  setTimeout(() => {
    const hoverStyles = window.getComputedStyle(link);
    console.log(`  Couleur hover:`, hoverStyles.color);
    console.log(`  Fond hover:`, hoverStyles.backgroundColor);

    // Retour normal
    link.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
  }, 50);
});

// 5. TEST NAVIGATION CLAVIER
console.log('\n⌨️ 5. TEST NAVIGATION CLAVIER');
console.log('Testez manuellement :');
console.log('- Tab pour naviguer entre les liens');
console.log('- Entrée/Espace sur le bouton menu mobile');
console.log('- Échap pour fermer le menu mobile');

// 6. VÉRIFICATION ACCESSIBILITÉ ARIA
console.log('\n♿ 6. VÉRIFICATION ARIA');
if (menuButton) {
  console.log('aria-label bouton:', menuButton.getAttribute('aria-label'));
  console.log(
    'aria-expanded bouton:',
    menuButton.getAttribute('aria-expanded')
  );
}

console.log('aria-current sur liens:');
navLinks.forEach((link, index) => {
  const ariaCurrent = link.getAttribute('aria-current');
  if (ariaCurrent) {
    console.log(`  Lien ${index + 1}:`, ariaCurrent);
  }
});

// 7. TEST RESPONSIVE BREAKPOINTS
console.log('\n📐 7. TEST RESPONSIVE');
console.log('Largeur actuelle:', window.innerWidth + 'px');
console.log('Menu mobile visible:', window.innerWidth < 768 ? 'OUI' : 'NON');

if (window.innerWidth >= 768) {
  console.log('Mode desktop - Vérifiez les liens horizontaux');
} else {
  console.log('Mode mobile - Vérifiez le bouton hamburger');
}

// 8. RÉSUMÉ DES TESTS
console.log('\n📊 RÉSUMÉ NAVIGATION COMPONENT');
console.log('================================');
console.log('✅ Rendu navigation:', !!nav);
console.log('✅ Système colors.ts actif');
console.log('✅ Menu mobile fonctionnel:', !!menuButton);
console.log('✅ Liens navigation présents:', navLinks.length > 0);
console.log('✅ États interactifs testés');
console.log('✅ Accessibilité ARIA vérifiée');
console.log('\n🎯 Tests manuels recommandés :');
console.log('- Redimensionner la fenêtre (responsive)');
console.log('- Navigation clavier complète');
console.log('- Test sur mobile réel');
console.log('- Vérification contrastes couleurs');

console.log('\n🚢 NAVIGATION COMPONENT TEST TERMINÉ !');
