import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    if (request.cookies.has('x-session') ) {
        // pass through to the next middleware
        return NextResponse.next()
    }else{
        //redirect to login page
        return NextResponse.rewrite(new URL('/login', request.url))
    }
   
    
  }
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/cart/:path*', '/orders/:path*'],
}