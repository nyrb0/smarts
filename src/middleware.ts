import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    matcher: ['/home', '/auth', '/profile'],
};

export function middleware(req: NextRequest) {
    // const isAuth = localStorage.getItem('userData1');
    // if (!isAuth) {
    //     return NextResponse.redirect(new URL('/auth', req.url));
    // }
    // if (req.nextUrl.pathname === '/auth' && isAuth) {
    //     return NextResponse.redirect(new URL('/', req.url));
    // }
    // return NextResponse.next();
}
