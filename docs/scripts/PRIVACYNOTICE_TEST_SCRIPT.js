/* eslint-disable no-console */
// PRIVACYNOTICE COMPONENT - Test DevTools automatisé
// Ouvrir la console DevTools (F12 > Console) et coller ce code :

// 1. Vérifier la structure du composant PrivacyNotice
const privacyNotices = document.querySelectorAll('[role="region"]');
console.log('🔒 PrivacyNotice trouvés:', privacyNotices.length);

privacyNotices.forEach((notice, index) => {
  const title = notice.querySelector('h2, h3, h4');
  const titleId = title ? title.id : null;
  console.log(`PrivacyNotice ${index + 1}:`, {
    role: notice.getAttribute('role'),
    'aria-labelledby': notice.getAttribute('aria-labelledby'),
    titleId: titleId,
    titleText: title ? title.textContent.trim() : 'NO TITLE',
    titleLevel: title ? title.tagName.toLowerCase() : 'NO HEADING',
    classes: notice.className,
  });
});

// 2. Vérifier la fonctionnalité d'expansion des détails
const expandButtons = document.querySelectorAll('button[aria-expanded]');
console.log("📋 Boutons d'expansion trouvés:", expandButtons.length);

expandButtons.forEach((button, index) => {
  const ariaControls = button.getAttribute('aria-controls');
  const detailsSection = document.getElementById(ariaControls);
  console.log(`Bouton expansion ${index + 1}:`, {
    text: button.textContent.trim(),
    'aria-expanded': button.getAttribute('aria-expanded'),
    'aria-controls': ariaControls,
    detailsVisible: detailsSection ? !detailsSection.hidden : 'N/A',
    detailsExists: !!detailsSection,
  });
});

// 3. Vérifier les liens email et politique (d'abord tester l'expansion)
const expandButtonForEmail = document.querySelector('button[aria-expanded]');
if (
  expandButtonForEmail &&
  expandButtonForEmail.getAttribute('aria-expanded') === 'false'
) {
  console.log('🔄 Expansion des détails pour révéler les liens email...');
  expandButtonForEmail.click();

  // Attendre un peu pour que l'expansion soit complète
  setTimeout(() => {
    testEmailLinks();
  }, 100);
} else {
  testEmailLinks();
}

function testEmailLinks() {
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  console.log('📧 Liens email trouvés:', emailLinks.length);

  emailLinks.forEach((link, index) => {
    console.log(`Email ${index + 1}:`, {
      href: link.href,
      text: link.textContent.trim(),
      target: link.target,
      rel: link.rel,
    });
  });
}

const policyLinks = document.querySelectorAll(
  'a[href*="privacy"], a[href*="politique"], a[href*="confidentialite"]'
);
console.log('📄 Liens politique trouvés:', policyLinks.length);

policyLinks.forEach((link, index) => {
  console.log(`Politique ${index + 1}:`, {
    href: link.href,
    text: link.textContent.trim(),
    target: link.target,
    rel: link.rel,
  });
});

// 4. Vérifier la checkbox de consentement
const consentCheckboxes = document.querySelectorAll(
  'input[type="checkbox"][name*="privacy"], input[type="checkbox"][name*="consent"]'
);
console.log(
  '☑️ Checkboxes de consentement trouvées:',
  consentCheckboxes.length
);

consentCheckboxes.forEach((checkbox, index) => {
  const label = document.querySelector(`label[for="${checkbox.id}"]`);
  console.log(`Checkbox ${index + 1}:`, {
    name: checkbox.name,
    id: checkbox.id,
    checked: checkbox.checked,
    required: checkbox.required,
    disabled: checkbox.disabled,
    labelText: label ? label.textContent.trim() : 'NO LABEL',
    'aria-required': checkbox.getAttribute('aria-required'),
    'aria-invalid': checkbox.getAttribute('aria-invalid'),
  });
});

// 5. Test d'accessibilité spécifique RGPD
console.log('\n🔍 TESTS ACCESSIBILITÉ RGPD:');

// Vérifier les IDs uniques
const titleIds = Array.from(
  document.querySelectorAll('[id*="privacy-notice-title"]')
).map(el => el.id);
const uniqueIds = [...new Set(titleIds)];
console.log(
  '✅ IDs de titre uniques:',
  titleIds.length === uniqueIds.length ? 'OUI' : 'NON'
);
if (titleIds.length !== uniqueIds.length) {
  console.warn('⚠️ IDs dupliqués détectés:', titleIds);
}

// Vérifier la hiérarchie des titres
const headings = Array.from(
  document.querySelectorAll('h1, h2, h3, h4, h5, h6')
);
const headingLevels = headings.map(h => parseInt(h.tagName.charAt(1)));
console.log('📊 Hiérarchie des titres:', headingLevels);

let hierarchyOk = true;
for (let i = 1; i < headingLevels.length; i++) {
  if (headingLevels[i] > headingLevels[i - 1] + 1) {
    hierarchyOk = false;
    console.warn(
      `⚠️ Saut de niveau détecté: h${headingLevels[i - 1]} → h${headingLevels[i]}`
    );
  }
}
console.log(
  '✅ Hiérarchie des titres:',
  hierarchyOk ? 'CORRECTE' : 'INCORRECTE'
);

// 6. Test de contraste des couleurs
console.log('\n🎨 VÉRIFICATION DU CONTRASTE:');
const textElements = document.querySelectorAll(
  '.text-gray-700, .text-gray-900, .text-blue-700, .text-slate-600'
);
console.log('🔍 Éléments de texte à vérifier:', textElements.length);

textElements.forEach((el, index) => {
  const style = window.getComputedStyle(el);
  console.log(`Élément ${index + 1}:`, {
    color: style.color,
    backgroundColor: style.backgroundColor,
    classes: el.className,
    text: el.textContent.trim().substring(0, 50) + '...',
  });
});

// 7. Test fonctionnel d'expansion
console.log('\n🧪 TEST FONCTIONNEL:');
const firstExpandButton = document.querySelector('button[aria-expanded]');
if (firstExpandButton) {
  const initialState = firstExpandButton.getAttribute('aria-expanded');
  console.log("🔄 Test d'expansion automatique...");
  firstExpandButton.click();

  setTimeout(() => {
    const newState = firstExpandButton.getAttribute('aria-expanded');
    console.log('✅ État initial:', initialState);
    console.log('✅ État après clic:', newState);
    console.log(
      '✅ Expansion fonctionne:',
      initialState !== newState ? 'OUI' : 'NON'
    );

    // Remettre dans l'état initial
    firstExpandButton.click();
  }, 100);
}

// 8. Résumé final
console.log('\n📋 RÉSUMÉ FINAL:');
console.log('🔒 Composants PrivacyNotice:', privacyNotices.length);
console.log("📋 Boutons d'expansion:", expandButtons.length);
console.log(' Liens politique:', policyLinks.length);
console.log('☑️ Checkboxes de consentement:', consentCheckboxes.length);
console.log('✅ Accessibilité RGPD:', 'Voir détails ci-dessus');

// 9. Recommandations
console.log('\n💡 RECOMMANDATIONS:');
if (privacyNotices.length === 0) {
  console.warn('⚠️ Aucun composant PrivacyNotice détecté');
}
if (consentCheckboxes.length === 0) {
  console.warn('⚠️ Aucune checkbox de consentement détectée');
}
// Note: Les liens email sont vérifiés dans la fonction testEmailLinks()
console.log("✅ Script d'audit PrivacyNotice terminé");
