import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Pages that don't require login
const publicRoutes = ['/', '/signup', '/terms', '/privacy', '/reset-password'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes through
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for supabase auth token
  const token = request.cookies.get('sb-access-token') ||
    request.cookies.get(`sb-${process.env.NEXT_PUBLIC_SUPABASE_URL?.split('//')[1]?.split('.')[0]}-auth-token`);

  if (!token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png|.*\\.jpg|.*\\.svg).*)'],
};