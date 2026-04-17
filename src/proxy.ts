import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AuthServices } from './services/auth.services';
import { adminRoutes } from './routes/admingRoutes';
import { guestRoutes } from './routes/guestRoutes';
import { managerRoutes } from './routes/managerRoutes';




// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const data = await AuthServices.session()

    const adminRoute = adminRoutes
    const guest = guestRoutes;
    const mananger = managerRoutes

    const roleRoute :Record<string,string>={
        ADMIN:'/admin-dashboard/users',
        GUEST:'/dashboard',
        MANAGER:'/manager-dashboard/bookings'
    }

    if (!data) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
   

    const role = data?.user?.role

    if (role !== 'ADMIN' && adminRoute[0].items.some(item => path.startsWith(item.url))) {

        return NextResponse.redirect(new URL(roleRoute[role!], request.url))
    }
    if (role !== 'GUEST' && guestRoutes[0].items.some(item => path.startsWith(item.url))) {
        return NextResponse.redirect(new URL(roleRoute[role!], request.url))
    }
    if (role !== 'MANAGER' && managerRoutes[0].items.some(item => path.startsWith(item.url))) {
        return NextResponse.redirect(new URL(roleRoute[role!], request.url))
    }

    if (role === 'ADMIN' && path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/admin-dashboard/users', request.url))
    }
    if (role === 'MANAGER' && path.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/manager-dashboard/bookings', request.url))
    }

    return NextResponse.next()
}



export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/admin-dashboard", "/admin-dashboard/:path*",
        "/manager-dashboard", "/manager-dashboard/:path*"],
}