import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const publicRoutes = [
  { path: '/login', action: 'redirect' },
  { path: '/signup', action: 'redirect' },
  { path: '/', action: 'next' },
] as const

export default async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const publicRoute = publicRoutes.find(route => route.path === request.nextUrl.pathname)
  const isPrivate = !publicRoute

  if (isPrivate && sessionCookie) return NextResponse.next()
  if (isPrivate && !sessionCookie) return NextResponse.redirect(new URL('/login', request.url))
  if (sessionCookie && publicRoute?.action === 'redirect') return NextResponse.redirect(new URL('/dashboard', request.url))
  return NextResponse.next()
}

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};