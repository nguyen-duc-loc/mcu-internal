import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import ROUTES from "./constants/routes";
import { AUTH_TOKEN_KEY } from "./lib/cookies";
import { verifyTokenInCookies } from "./token/jwt";

export async function middleware(request: NextRequest) {
  try {
    await verifyTokenInCookies((await cookies()).get(AUTH_TOKEN_KEY)?.value);

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL(ROUTES.login, request.url));
  }
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|login).*)",
  ],
};
