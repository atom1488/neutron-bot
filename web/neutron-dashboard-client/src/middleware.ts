import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { fetchValidGuild } from './utils/api';
const validateMiddlewareCookies = (req: NextRequest) => {
  const sessionID = req.cookies.get('connect.sid');
  return sessionID
    ? {
        Cookie: `connect.sid=${sessionID}`,
      }
    : false;
};
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone();
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const headers = validateMiddlewareCookies(req);
    if (!headers) return (url.pathname = '/'), NextResponse.redirect(url);

    if (!req.nextUrl.searchParams.get('id')) return (url.pathname = '/menu'), NextResponse.redirect(url);

    const id = req.nextUrl.searchParams.get('id');
    const response = await fetchValidGuild(id as string, headers);

    if (response.status === 200) {
      return NextResponse.next();
    } else {
      return (url.pathname = '/'), NextResponse.redirect(url);
    }
  }
}
export const config = {
  matcher: '/dashboard/:path*',
};
