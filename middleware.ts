import { NextRequest, NextResponse } from 'next/server';
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
// export async function middleware(req: NextRequest) {
//   const role = req.headers.get("authorization");
//   const { pathname } = req.nextUrl;
//   console.log('cookies: ', req.cookies.get('user'))
//   console.log('middleware', role)


//   return NextResponse.next();
// }
export default withAuth(
    async function middleware(req) {
        const user = req.cookies.get('user')?.value
        console.log('nextauth_token: ', req.nextauth.token)
        console.log('bdasodas user: ', user)
        const token = await getToken({
            req: req,
            secret: process.env.NEXTAUTH_SECRET,
          });
          console.log('szitaraja: ', token)
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({token}) {
                console.log('sraka boom', token);
                return true;
            }
        }
    }
)

export const config = {
    matcher: ['/api/orders/getAllOrders', '/api/orders/:path*', '/order/:path*']
};