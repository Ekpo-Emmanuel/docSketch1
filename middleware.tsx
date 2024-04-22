import {withAuth} from "@kinde-oss/kinde-auth-nextjs/middleware";
export default function middleware(req: any) {
    return withAuth(req);
}

export const config = {
    matcher: [
        "/dashboard",
        "/dashboard/:path*",
        "/teams",
        "/teams/:path*",
        "/workspace",
        "/workspace/:path*",
    ]
};
