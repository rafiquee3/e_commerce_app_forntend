import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from "next-auth/middleware";

// export async function middleware(req: NextRequest) {
//   const role = req.headers.get("authorization");
//   const { pathname } = req.nextUrl;
//   console.log('cookies: ', req.cookies.get('user'))
//   console.log('middleware', role)


//   return NextResponse.next();
// }
export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({token}) {
                console.log('sraka boom', token);
                return Boolean(token?.login);
            }
        }
    }
)

export const config = {
    matcher: ['/api/orders/getAllOrders', '/api/orders/:path*', '/order/:path*']
};