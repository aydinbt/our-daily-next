import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
export default withAuth(
  async function middleware(req) {
    return NextResponse.rewrite(new URL("/auth/profile", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);
export const config = {
  matcher: ["/auth/profile", "/order_tracking", "/order_view"],
};
