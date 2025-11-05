// Configuration Next.js pour le portfolio
// Définit les paramètres de build, optimisations et comportement de l'application
import type { NextConfig } from 'next';

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Config ici
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
