import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: ['/home', '/auth', '/profile'],
};

export function middleware(req: NextRequest) {
    const isAuth = req.cookies.get('UserData1')?.value;

    if (!isAuth && req.nextUrl.pathname !== '/auth') {
        return NextResponse.redirect(new URL('/auth', req.url));
    }

    if (isAuth && req.nextUrl.pathname === '/auth') {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}
