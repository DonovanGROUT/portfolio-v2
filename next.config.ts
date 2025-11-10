// Configuration Next.js pour le portfolio
// Définit les paramètres de build, optimisations et comportement de l'application

// Ajout Webpack Bundle Analyzer
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
const withBundleAnalyzer = BundleAnalyzerPlugin;
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */

// La valeur de nonce sera injectée dynamiquement côté serveur (voir layout.tsx)
// En local (dev OU build/start local), on autorise unsafe-inline/unsafe-eval pour éviter l'écran blanc
// La politique CSP est désormais gérée par le middleware (middleware.ts) pour tous les environnements.

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
  // Headers de sécurité appliqués sur toutes les routes
  // Fonctionnent en production Vercel et en mode local (build + start)
  async headers() {
    // En dev, CSP permissive pour ne rien casser
    const isDev = process.env.NODE_ENV !== 'production';
    // Détection environnement Vercel preview (VERCEL_ENV = preview ou development)
    const isVercelPreview = process.env.VERCEL_ENV === 'preview';

    const cspDev = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    // En preview Vercel, autoriser vercel.live pour le widget de feedback
    const cspProd = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isVercelPreview ? ' https://vercel.live' : ''}`, // unsafe-inline nécessaire pour Next.js
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https:",
      "font-src 'self' https://fonts.gstatic.com",
      `connect-src 'self'${isVercelPreview ? ' https://vercel.live' : ''}`,
      `frame-src${isVercelPreview ? ' https://vercel.live' : " 'none'"}`, // Autoriser iframe vercel.live en preview
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: isDev ? cspDev : cspProd,
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
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
