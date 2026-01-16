import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages: {
        signIn: "/auth",
    },
});

export const config = {
    matcher: [
        "/dashboard/:path*",
        "/admin/:path*",
        "/brands/:path*",
        "/ave-calculator/:path*",
        "/profile/:path*",
        "/reports/:path*",
    ],
};
