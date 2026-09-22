import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SubscribeForm from "@/components/SubscribeForm";
import { supabaseAdmin } from "@/lib/supabase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Gryphix Coaching & Development",
  description: "Articles on leadership, retail management, and career growth from Gryphix Coaching.",
};

export const revalidate = 60;

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default async function BlogIndex() {
  const supabase = supabaseAdmin();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("id, slug, title, excerpt, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      <Nav />
      <section className="blog-hero">
        <span className="subtitle">The Gryphix Blog</span>
        <h1>Leadership & Retail Coaching Insights</h1>
        <p>Practical thinking on leadership, retail management, and career growth from 25+ years in the field.</p>
      </section>
      <div className="blog-list">
        {!posts || posts.length === 0 ? (
          <p className="blog-empty">New articles are on the way. Check back soon.</p>
        ) : (
          posts.map((post) => (
            <a key={post.id} href={`/blog/${post.slug}`} className="blog-card">
              <span className="date">{post.published_at ? formatDate(post.published_at) : ""}</span>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </a>
          ))
        )}
        <SubscribeForm />
      </div>
      <Footer />
    </>
  );
}
