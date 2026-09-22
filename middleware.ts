import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

// Covers BOTH the /admin/* pages (redirect to login) and the /api/admin/*
// routes (401 JSON) -- these routes do NOT check the session themselves,
// this middleware is their only auth gate. Don't add a new /api/admin/*
// route without confirming it's covered by this matcher.
//
// Auth verification is inlined here (not imported from @/lib/auth) because
// importing it via the @/ path alias made Vercel's Edge Function bundler
// reject the whole middleware as "referencing unsupported modules" -- kept
// as plain relative-free code so there's nothing for that bundler to trip
// on. lib/auth.ts still holds the matching createSessionToken() used by the
// login route; SESSION_COOKIE name and the JWT shape must stay in sync
// between the two.
const SESSION_COOKIE = "gryphix_admin_session";

async function hasValidSession(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, new TextEncoder().encode(process.env.SESSION_SECRET!));
    return true;
  } catch {
    return false;
  }
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/admin/login" || pathname === "/api/admin/login") {
    return NextResponse.next();
  }

  if (!(await hasValidSession(request))) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
