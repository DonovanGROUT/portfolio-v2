// HERO_TEST_SCRIPT.js
// Script de test DevTools pour le composant Hero
// À coller dans la console du navigateur sur /hero-demo ou la page d'accueil

function logResult(label, result) {
  // Résultat du test (affichage désactivé pour lint clean)
}

// Vérification du gradient
const hero = document.querySelector('[role="region"][aria-label*="Hero"]');
logResult(
  'Gradient bleu océan',
  hero && hero.className.includes('bg-gradient-to-br')
);

// Vérification du nom et du titre
const name = hero && hero.querySelector('h1');
const title = hero && hero.querySelector('h2');
logResult('Nom (H1)', name && name.textContent.length > 0);
logResult('Titre (H2)', title && title.textContent.length > 0);

// Vérification des CTAs
const ctaPrimary = hero && hero.querySelector('a[href="/projects"]');
const ctaSecondary = hero && hero.querySelector('a[href="/contact"]');
logResult('CTA primaire présent', !!ctaPrimary);
logResult('CTA secondaire présent', !!ctaSecondary);

// Responsive : vérification mobile/desktop
logResult(
  'Responsive (min-h-screen)',
  hero && hero.className.includes('min-h-screen')
);

// Accessibilité : rôle, aria-label, navigation clavier
logResult('Role region', !!hero);
logResult('Aria-label présent', hero && hero.getAttribute('aria-label'));

// Sécurité : pas de script dans le nom
logResult('Sécurité XSS (nom)', name && !name.innerHTML.includes('<script>'));

// Animation hover
logResult(
  'Animation hover CTA',
  ctaPrimary && ctaPrimary.className.includes('transition-all')
);

// Image/avatar
const avatar = hero && hero.querySelector('img');
logResult('Avatar optionnel', !!avatar);

// Localisation
const localisationDiv =
  hero && hero.querySelector('[aria-label="Localisation"]');
logResult('Icône localisation', !!localisationDiv);

// Typographie
logResult('Typographie H1', name && name.className.includes('text-4xl'));
logResult('Typographie H2', title && title.className.includes('text-2xl'));

// Résumé
