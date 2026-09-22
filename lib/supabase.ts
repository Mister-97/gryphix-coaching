import { createClient } from "@supabase/supabase-js";

// Server-side only -- uses the service role key, which bypasses RLS. Every
// caller of this client is one of our own API routes, which do their own
// auth check (admin session cookie) before touching the database.
export function supabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}

export type { BlogPost } from "@/lib/types";
