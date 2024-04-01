import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl.clone();
    const { pathname } = url;
    const hasAccessToken = request.cookies.get('access-token');
    if (pathname === '/') {
        if (!hasAccessToken) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    } else if (pathname === '/login' || pathname === '/register') {
        if (hasAccessToken) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }

    console.log(pathname, "path")

    return NextResponse.next();
}
export default middleware;