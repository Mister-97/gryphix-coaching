import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubscribeForm from "@/components/SubscribeForm";
import ShareButtons from "@/components/ShareButtons";
import { supabaseAdmin } from "@/lib/supabase";
import { renderPostBody } from "@/lib/renderContent";
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
  const title = post.meta_title || `${post.title} | Gryphix Coaching`;
  const description = post.meta_description || post.excerpt || undefined;
  const url = `https://www.gryphixcoaching.com/blog/${post.slug}`;
  return {
    title: post.meta_title ? { absolute: post.meta_title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title, description, publishedTime: post.published_at ?? undefined, siteName: "Gryphix Coaching & Development" },
    twitter: { card: "summary_large_image", title, description },
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
        {post.featured_image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={post.featured_image} alt="" className="blog-post-featured-image" />
        )}
        <div className="blog-post-body">{renderPostBody(post.content)}</div>
        <ShareButtons title={post.title} />
        <SubscribeForm />
      </article>
      <Footer />
    </>
  );
}
