/**
 * Configuration de base pour next-sitemap
 * Génère sitemap.xml et robots.txt automatiquement à chaque build
 * Docs : https://github.com/iamvishnusankar/next-sitemap
 */

module.exports = {
  siteUrl: 'https://donovan-grout.com',
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 7000,
  exclude: ['/404', '/_not-found'],
  outDir: 'public', // Ajout pour corriger le dossier de sortie
};
