import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { fetchValidGuild } from './utils/api';

const validateMiddlewareCookies = (req: NextRequest) => {
  const sessionID = req.cookies.get('connect-sid');
  return sessionID
    ? {
        Cookie: `connect-sid=${sessionID}`,
      }
    : false;
};

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
 /* if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const headers = validateMiddlewareCookies(req);
    if (!headers) return NextResponse.redirect('/');

    if (!req.nextUrl.searchParams.get('id')) return NextResponse.redirect('/menu');

    const id = req.nextUrl.searchParams.get('id');

    const response = await fetchValidGuild(id as string, headers);

    console.log(response.status);

    return response.status === 200 ? NextResponse.next() : NextResponse.redirect('/');
  } */
}

export const config = {
  matcher: '/dashboard/:path*',
};
