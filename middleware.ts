import { NextResponse } from 'next/server';

export function middleware() {
  // Le middleware ne modifie pas les headers car ils sont déjà définis dans next.config.ts
  // Il sert uniquement de fallback pour les routes dynamiques non couvertes
  const response = NextResponse.next();

  return response;
}

export const config = {
  // Matcher limité aux routes dynamiques et API
  matcher: [
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
