import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// List of public paths that don't require authentication
const publicPaths = [
    "/login",
    "/signup",
    "/legal/privacy-policy",
    "/legal/terms-of-service",
    "/",
];

export function middleware(request: NextRequest) {
    const token = request.cookies.get("token")?.value;
    const { pathname } = request.nextUrl;

    // Allow access to public paths
    if (publicPaths.includes(pathname)) {
        // If user is already authenticated and tries to access login/signup,
        // redirect to dashboard
        if (token) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }
        return NextResponse.next();
    }

    // Check if user is authenticated for protected routes
    if (!token) {
        // Redirect to login if not authenticated
        const loginUrl = new URL("/login", request.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    // Define which paths should be processed by this middleware
    matcher: [
        /*
         * Match all paths except:
         * 1. /api routes
         * 2. /_next (Next.js internals)
         * 3. /_static (static files)
         * 4. /_vercel (Vercel internals)
         * 5. Static files (favicon.ico, manifest.json, etc.)
         */
        "/((?!api|_next|_static|_vercel|[\\w-]+\\.\\w+).*)",
    ],
};
