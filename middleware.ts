import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let user = request.cookies.get('user')?.value
  if (!user) {
    NextResponse.next();
    //return NextResponse.redirect(new URL('/login', request.url))
  } else {
    NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  //matcher: '/api/:path*',
  matcher: '/shipping',
}