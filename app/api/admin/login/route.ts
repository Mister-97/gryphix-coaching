import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE } from "@/lib/auth";

// Single-admin site (just Will) -- credentials are env vars, not a users
// table. If Gryphix ever needs more than one editor, move this to a real
// admin_users table in Supabase instead.
export async function POST(request: NextRequest) {
  const { email, password } = await request.json().catch(() => ({}));
  if (!email || !password) {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }
  if (email.toLowerCase() !== process.env.ADMIN_EMAIL?.toLowerCase()) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
  // Stored base64-encoded in the env var, not as a raw "$2a$10$..." string --
  // Next.js's @next/env does $VAR-style expansion on .env* files, which
  // silently mangles bcrypt hashes (they're full of $-prefixed segments that
  // look like variable references). Base64 sidesteps that entirely.
  const storedHash = Buffer.from(process.env.ADMIN_PASSWORD_HASH_B64!, "base64").toString("utf8");
  const valid = await bcrypt.compare(password, storedHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }
  const token = await createSessionToken(email);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
