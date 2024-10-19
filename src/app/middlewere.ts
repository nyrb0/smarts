import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
    // Логика обработки запроса

    // Пример: редирект на другую страницу
    // if (req.nextUrl.pathname === '/about') {
    //     return NextResponse.redirect(new URL('/new-about', req.url));
    // }

    // Продолжить выполнение
    return NextResponse.next();
}
