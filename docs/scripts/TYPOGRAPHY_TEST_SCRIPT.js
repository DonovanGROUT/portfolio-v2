/* eslint-disable no-console */
// TYPOGRAPHY COMPONENT - Test DevTools automatisé
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

console.log('🔤 TYPOGRAPHY COMPONENT - VALIDATION AUTOMATIQUE');

// 1. Vérifier les éléments typographiques présents
const typographyElements = {
  h1: document.querySelectorAll('h1'),
  h2: document.querySelectorAll('h2'),
  h3: document.querySelectorAll('h3'),
  h4: document.querySelectorAll('h4'),
  paragraphs: document.querySelectorAll('p'),
  spans: document.querySelectorAll('span'),
};

console.log('📝 Éléments typographiques trouvés:', {
  'H1 headings': typographyElements.h1.length,
  'H2 headings': typographyElements.h2.length,
  'H3 headings': typographyElements.h3.length,
  'H4 headings': typographyElements.h4.length,
  Paragraphs: typographyElements.paragraphs.length,
  Spans: typographyElements.spans.length,
});

// 2. Analyser la hiérarchie sémantique
const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
console.log('🏗️ Hiérarchie sémantique:');
headings.forEach((heading, index) => {
  const level = heading.tagName.toLowerCase();
  const text = heading.textContent?.slice(0, 50) + '...';
  console.log(`  ${index + 1}. ${level.toUpperCase()}: "${text}"`);
});

// 3. Vérifier les classes de couleurs Typography
const colorClasses = [
  'text-sky-700', // primary
  'text-emerald-700', // secondary
  'text-slate-700', // neutral
  'text-slate-500', // muted
];

console.log('🎨 Classes de couleurs Typography:');
colorClasses.forEach(colorClass => {
  const elements = document.querySelectorAll(`.${colorClass}`);
  console.log(`  ${colorClass}: ${elements.length} éléments`);
});

// 4. Analyser les tailles et styles computed
const typographyVariants = [
  { selector: 'h1', expectedSize: '2.5rem', variant: 'h1' },
  { selector: 'h2', expectedSize: '2rem', variant: 'h2' },
  { selector: 'h3', expectedSize: '1.5rem', variant: 'h3' },
  { selector: 'h4', expectedSize: '1.25rem', variant: 'h4' },
];

console.log('📏 Analyse des tailles typographiques:');
typographyVariants.forEach(({ selector, expectedSize, variant }) => {
  const element = document.querySelector(selector);
  if (element) {
    const styles = getComputedStyle(element);
    const actualSize = styles.fontSize;
    const fontWeight = styles.fontWeight;

    console.log(`  ${variant.toUpperCase()}:`, {
      'taille attendue': expectedSize,
      'taille actuelle': actualSize,
      poids: fontWeight,
      conforme: actualSize === expectedSize ? '✅' : '⚠️',
    });
  }
});

// 5. Tests d'alignement
const alignmentClasses = [
  'text-left',
  'text-center',
  'text-right',
  'text-justify',
];
console.log("📐 Tests d'alignement:");
alignmentClasses.forEach(alignClass => {
  const elements = document.querySelectorAll(`.${alignClass}`);
  console.log(`  ${alignClass}: ${elements.length} éléments`);
});

// 6. Vérifier la responsivité
const responsiveClasses = document.querySelectorAll(
  '[class*="md:text-"], [class*="lg:text-"]'
);
console.log(`📱 Éléments responsive: ${responsiveClasses.length}`);

// 7. Tests de truncate
console.log('✂️ Éléments avec truncate:', {
  'avec .truncate': document.querySelectorAll('.truncate').length,
  'avec .overflow-hidden': document.querySelectorAll('.overflow-hidden').length,
});

// 8. Validation ARIA pour les headings
console.log('♿ Validation ARIA:');
headings.forEach((heading, index) => {
  const ariaLevel = heading.getAttribute('aria-level');
  const hasAriaLevel = ariaLevel !== null;

  console.log(`  Heading ${index + 1}:`, {
    tag: heading.tagName.toLowerCase(),
    'aria-level': ariaLevel || 'non défini',
    'ARIA conforme': hasAriaLevel ? '✅' : '⚠️',
  });
});

// 9. Test de contraste (approximatif)
console.log('🎯 Test de contraste (approximatif):');
const elementsWithColor = document.querySelectorAll('[class*="text-"]');
elementsWithColor.forEach((element, index) => {
  if (index < 5) {
    // Limiter à 5 pour éviter spam
    const styles = getComputedStyle(element);
    const color = styles.color;
    const bgColor = styles.backgroundColor;

    console.log(`  Élément ${index + 1}:`, {
      'couleur texte': color,
      'arrière-plan': bgColor || 'transparent',
      lisible: color !== bgColor ? '✅' : '❌',
    });
  }
});

// 10. Résumé final
console.log('📊 RÉSUMÉ VALIDATION TYPOGRAPHY:');
console.log({
  '✅ Total headings': headings.length,
  '✅ Hiérarchie présente': headings.length > 0 ? 'OUI' : 'NON',
  '✅ Classes couleurs': colorClasses.some(c => document.querySelector(`.${c}`))
    ? 'OUI'
    : 'NON',
  '✅ Responsive': responsiveClasses.length > 0 ? 'OUI' : 'NON',
  '✅ Semantic HTML': headings.length > 0 ? 'OUI' : 'NON',
});

console.log('🎉 Test Typography Component terminé !');
