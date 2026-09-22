import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { slugify } from "@/lib/slug";

// Auth for everything under /api/admin/* is enforced by middleware.ts on the
// /admin/* pages that call these -- these routes are same-origin fetches
// from an already-authenticated admin session, not public endpoints.
export async function GET() {
  const supabase = supabaseAdmin();
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const { title, excerpt, content } = body;
  if (!title) return NextResponse.json({ error: "Title required" }, { status: 400 });

  const supabase = supabaseAdmin();
  const baseSlug = slugify(title);
  let slug = baseSlug;
  for (let i = 2; i < 50; i++) {
    const { data: existing } = await supabase.from("blog_posts").select("id").eq("slug", slug).maybeSingle();
    if (!existing) break;
    slug = `${baseSlug}-${i}`;
  }

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({ title, slug, excerpt: excerpt || "", content: content || "", status: "draft" })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
