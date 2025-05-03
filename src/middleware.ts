import { NextResponse } from 'next/server';
import { getCookie } from './utils/cookies';
import { verifyToken } from './lib/auth';

export const middleware = async (req: Request) => {
  const token = getCookie(req);
  const { pathname } = new URL(req.url);

  if (pathname === '/auth/login' || pathname === '/auth/signup') {
    return NextResponse.next();
  }

  if (!token) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === '/auth/login' || pathname === '/auth/signup') {
    return NextResponse.redirect(new URL('/backlog', req.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/'],
};