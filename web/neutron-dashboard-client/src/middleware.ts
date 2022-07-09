import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import { fetchValidGuild } from './utils/api';

const DISCORD_INVITE_URL =
  'https://discord.com/oauth2/authorize?response_type=code&scope=identify%20email%20guilds&client_id=986815196376989756';

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

  if (req.nextUrl.pathname.startsWith('/invite')) {
    return NextResponse.redirect(DISCORD_INVITE_URL);
  }
}
export const config = {
  matcher: ['/dashboard/:path*', '/invite'],
};
