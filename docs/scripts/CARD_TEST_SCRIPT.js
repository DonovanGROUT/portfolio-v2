/* eslint-disable no-console */
// CARD COMPONENT - Test DevTools automatisé
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

console.log('🃏 CARD COMPONENT - VALIDATION AUTOMATIQUE');

// 1. Vérifier les éléments Card présents
const cards = document.querySelectorAll('[role="article"]');
console.log('📝 Cards trouvées:', cards.length);
cards.forEach((card, index) => {
  console.log(`Card ${index + 1}:`, {
    classes: card.className,
    variant: card.className.match(/bg-(gradient|white|emerald|slate)/)?.[0],
    size: card.className.match(/rounded-(lg|xl|2xl)/)?.[0],
    interactive:
      card.className.includes('hover') ||
      card.className.includes('cursor-pointer'),
    disabled: card.className.includes('opacity-50'),
    loading: card.className.includes('animate-pulse'),
    responsive: card.className.includes('w-full'),
  });
});

// 2. Vérifier la composition modulaire
cards.forEach((card, index) => {
  const header = card.querySelector('header');
  const body = card.querySelector('section');
  const footer = card.querySelector('footer');
  const image = card.querySelector('img, [role="img"]');
  console.log(`Card ${index + 1} composition:`, {
    header: !!header,
    body: !!body,
    footer: !!footer,
    image: !!image,
  });
});

// 3. Vérifier l'accessibilité ARIA
cards.forEach((card, index) => {
  console.log(`Card ${index + 1} ARIA:`, {
    role: card.getAttribute('role'),
    ariaLabel: card.getAttribute('aria-label'),
    ariaLabelledby: card.getAttribute('aria-labelledby'),
    ariaDescribedby: card.getAttribute('aria-describedby'),
  });
});

// 4. Vérifier la sécurité XSS (aucun script ou on* handler)
cards.forEach((card, index) => {
  const scripts = card.querySelectorAll('script');
  const hasScript = scripts.length > 0;
  const hasOnHandler = Array.from(card.attributes).some(attr =>
    attr.name.startsWith('on')
  );
  console.log(`Card ${index + 1} sécurité:`, {
    hasScript,
    hasOnHandler,
  });
});

// 5. Vérifier les touch targets
cards.forEach((card, index) => {
  const rect = card.getBoundingClientRect();
  const touchFriendly = rect.height >= 44 && rect.width >= 44;
  console.log(`Card ${index + 1} touch target:`, {
    height: rect.height,
    width: rect.width,
    touchFriendly: touchFriendly ? '✅' : '❌',
  });
});

console.log('🎉 Test Card Component terminé !');
