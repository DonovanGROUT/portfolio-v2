// Configuration Next.js pour le portfolio
// Définit les paramètres de build, optimisations et comportement de l'application

// Ajout Webpack Bundle Analyzer
const withBundleAnalyzer =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

// La valeur de nonce sera injectée dynamiquement côté serveur (voir layout.tsx)
// En local (dev OU build/start local), on autorise unsafe-inline/unsafe-eval pour éviter l'écran blanc
const isVercelProd =
  process.env.VERCEL === '1' || process.env.VERCEL === 'true';
const isProd = process.env.NODE_ENV === 'production' && isVercelProd;
const ContentSecurityPolicy = isProd
  ? `
    default-src 'self';
    script-src 'self' 'nonce-__REPLACE_WITH_NONCE__';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    require-trusted-types-for 'script';
  `
  : `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self';
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
    require-trusted-types-for 'script';
  `;

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (process.env.ANALYZE === 'true') {
      // Visualisation HTML classique (désactivée temporairement)
      /*
        config.plugins.push(
          new withBundleAnalyzer({
            analyzerMode: 'static',
            reportFilename: isServer
              ? '../analyze/server.html'
              : './analyze/client.html',
          })
        );
        */
      // Génération du rapport JSON pour analyse textuelle
      config.plugins.push(
        new withBundleAnalyzer({
          analyzerMode: 'json',
          reportFilename: isServer
            ? '../analyze/server.json'
            : './analyze/client.json',
        })
      );
    }
    return config;
  },
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // La valeur du nonce sera remplacée dynamiquement côté serveur (voir layout.tsx)
            value: ContentSecurityPolicy.replace(/\n/g, ''),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
