import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { notifySubscribersOfNewPost } from "@/lib/notify";
import { slugify } from "@/lib/slug";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = supabaseAdmin();
  const { data, error } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (error) return NextResponse.json({ error: error.message }, { status: 404 });
  return NextResponse.json(data);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json().catch(() => ({}));
  const supabase = supabaseAdmin();

  const { data: current } = await supabase.from("blog_posts").select("*").eq("id", id).single();
  if (!current) return NextResponse.json({ error: "Post not found" }, { status: 404 });

  const update: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (typeof body.title === "string") update.title = body.title;
  if (typeof body.excerpt === "string") update.excerpt = body.excerpt;
  if (typeof body.content === "string") update.content = body.content;
  if (typeof body.featured_image === "string" || body.featured_image === null) update.featured_image = body.featured_image;

  if (typeof body.meta_title === "string") update.meta_title = body.meta_title.trim() || null;
  if (typeof body.meta_description === "string") update.meta_description = body.meta_description.trim() || null;
  if (typeof body.slug === "string" && body.slug.trim()) {
    const slug = slugify(body.slug);
    if (slug !== current.slug) {
      const { data: clash } = await supabase.from("blog_posts").select("id").eq("slug", slug).neq("id", id).maybeSingle();
      if (clash) return NextResponse.json({ error: "Another post already uses that URL slug." }, { status: 409 });
      update.slug = slug;
    }
  }

  const isNewlyPublished = body.status === "published" && current.status !== "published";
  if (body.status === "published" || body.status === "draft") {
    update.status = body.status;
    if (isNewlyPublished) update.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase.from("blog_posts").update(update).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (isNewlyPublished) await notifySubscribersOfNewPost(data);

  return NextResponse.json(data);
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = supabaseAdmin();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
