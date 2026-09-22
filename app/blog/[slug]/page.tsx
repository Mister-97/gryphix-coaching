import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubscribeForm from "@/components/SubscribeForm";
import { supabaseAdmin } from "@/lib/supabase";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 60;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

async function getPost(slug: string) {
  const supabase = supabaseAdmin();
  const { data } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | Gryphix Coaching`,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <Nav />
      <article className="blog-post">
        <a href="/blog" className="blog-back">&larr; Back to Blog</a>
        <span className="date">{post.published_at ? formatDate(post.published_at) : ""}</span>
        <h1>{post.title}</h1>
        <div className="blog-post-body">{post.content}</div>
        <SubscribeForm />
      </article>
      <Footer />
    </>
  );
}
