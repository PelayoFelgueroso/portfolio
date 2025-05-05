import { auth } from "auth"; 
import { NextResponse } from "next/server";

export async function middleware(req) {
  const session = await auth();
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin");

  if (isAdminPath && !session) {
    return NextResponse.redirect(new URL("/log-in-admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
