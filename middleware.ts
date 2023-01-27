import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    let user = request.cookies.get('user')?.value
    if (!user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next(); 
}

// See "Matching Paths" below to learn more
export const config = {
  //matcher: '/about/:path*',
  matcher: '/shipping',
}