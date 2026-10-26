"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/types";
import { slugify } from "@/lib/slug";
import { uploadImageFile } from "@/lib/uploadClient";
import { renderPostBody } from "@/lib/renderContent";
import RichEditor from "@/components/RichEditor";

const SITE = "gryphixcoaching.com";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function PostForm({ initial }: { initial?: BlogPost }) {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | undefined>(initial);
  const [title, setTitle] = useState(initial?.title ?? "");
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [featuredImage, setFeaturedImage] = useState<string | null>(initial?.featured_image ?? null);
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(!!initial);
  const [metaTitle, setMetaTitle] = useState(initial?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(initial?.meta_description ?? "");
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [uploadingFeatured, setUploadingFeatured] = useState(false);

  const effectiveSlug = slug || slugify(title);
  const shownTitle = metaTitle || (title ? `${title} | Gryphix Coaching` : "Your post title | Gryphix Coaching");
  const shownDescription = metaDescription || excerpt || "Your description will appear here.";

  const handleFeaturedUpload = async (file: File) => {
    setError("");
    setUploadingFeatured(true);
    try {
      setFeaturedImage(await uploadImageFile(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingFeatured(false);
    }
  };

  const save = async (statusOverride?: "draft" | "published") => {
    setSaving(true);
    setMsg("");
    setError("");
    const body: Record<string, unknown> = {
      title,
      excerpt,
      content,
      featured_image: featuredImage,
      slug: slug.trim() ? slugify(slug) : undefined,
      meta_title: metaTitle,
      meta_description: metaDescription,
    };
    if (statusOverride) body.status = statusOverride;
    const res = await fetch(post ? `/api/admin/posts/${post.id}` : "/api/admin/posts", {
      method: post ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setError(data.error || "Could not save.");
      return;
    }
    if (!post) {
      router.push(`/admin/posts/${data.id}`);
      return;
    }
    setPost(data);
    setSlug(data.slug);
    setMsg(statusOverride === "published" ? "Published!" : statusOverride === "draft" ? "Unpublished." : "Saved.");
  };

  const remove = async () => {
    if (!post || !confirm("Delete this post? This can't be undone.")) return;
    await fetch(`/api/admin/posts/${post.id}`, { method: "DELETE" });
    router.push("/admin");
  };

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <h1>{post ? "Edit Post" : "New Post"}</h1>
        <div className="admin-actions">
          <a href="/admin">&larr; Back</a>
        </div>
      </div>
      <div className="admin-card">
        {post && (
          <p style={{ marginBottom: "1.5rem" }}>
            Status: <span className={`status ${post.status}`}>{post.status}</span>
            {post.status === "published" && (
              <> &middot; <a href={`/blog/${post.slug}`} target="_blank">View live &rarr;</a></>
            )}
          </p>
        )}

        <div className="admin-tabs">
          <button type="button" className={tab === "edit" ? "on" : ""} onClick={() => setTab("edit")}>Write</button>
          <button type="button" className={tab === "preview" ? "on" : ""} onClick={() => setTab("preview")}>Preview</button>
        </div>

        {tab === "preview" ? (
          <div className="blog-preview-frame">
            <article className="blog-post blog-preview">
              <span className="date">{post?.published_at ? formatDate(post.published_at) : "Preview"}</span>
              <h1>{title || "Untitled post"}</h1>
              {featuredImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featuredImage} alt="" className="blog-post-featured-image" />
              )}
              <div className="blog-post-body">{renderPostBody(content)}</div>
            </article>
          </div>
        ) : (
          <>
            <div className="admin-field">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (!slugTouched) setSlug(slugify(e.target.value));
                }}
                placeholder="Post title"
              />
            </div>
            <div className="admin-field">
              <label>Description (shown on the blog list)</label>
              <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="One or two sentences" />
            </div>
            <div className="admin-field">
              <label>Featured Image</label>
              {featuredImage ? (
                <div className="admin-image-preview">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featuredImage} alt="" />
                  <button type="button" className="btn-secondary" onClick={() => setFeaturedImage(null)}>
                    Remove
                  </button>
                </div>
              ) : (
                <label className="admin-upload-btn">
                  {uploadingFeatured ? "Uploading..." : "Upload featured image"}
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif"
                    hidden
                    disabled={uploadingFeatured}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFeaturedUpload(file);
                      e.target.value = "";
                    }}
                  />
                </label>
              )}
            </div>
            <div className="admin-field">
              <label>Content</label>
              <RichEditor value={content} onChange={setContent} />
            </div>

            <div className="admin-seo">
              <h2>Search settings</h2>
              <p className="admin-hint" style={{ marginTop: 0 }}>
                How this post appears on Google. Leave the title and description blank to use the post title and description above.
              </p>
              <div className="admin-field">
                <label>URL slug</label>
                <div className="admin-slug">
                  <span>{SITE}/blog/</span>
                  <input
                    value={slug}
                    onChange={(e) => {
                      setSlugTouched(true);
                      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, "-"));
                    }}
                    placeholder="my-post-title"
                  />
                </div>
                {post?.status === "published" && slug !== post.slug && (
                  <p className="admin-warn">This post is live. Changing the slug changes its web address, so old links to it will stop working.</p>
                )}
              </div>
              <div className="admin-field">
                <label>Meta title <span className={`admin-count ${metaTitle.length > 60 ? "over" : ""}`}>{metaTitle.length}/60</span></label>
                <input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} placeholder={title ? `${title} | Gryphix Coaching` : "Defaults to the post title"} />
              </div>
              <div className="admin-field">
                <label>Meta description <span className={`admin-count ${metaDescription.length > 160 ? "over" : ""}`}>{metaDescription.length}/160</span></label>
                <textarea
                  className="short"
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Defaults to the description above"
                />
              </div>
              <div className="admin-serp">
                <div className="url">{SITE} &rsaquo; blog &rsaquo; {effectiveSlug || "..."}</div>
                <div className="t">{shownTitle}</div>
                <div className="d">{shownDescription}</div>
              </div>
            </div>
          </>
        )}

        {error && <p className="admin-error" style={{ textAlign: "left" }}>{error}</p>}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          {post ? (
            <>
              <button className="btn-secondary" onClick={() => save()} disabled={saving || !title}>Save</button>
              {post.status === "draft" ? (
                <button className="btn-primary" onClick={() => save("published")} disabled={saving || !title}>Publish</button>
              ) : (
                <button className="btn-secondary" onClick={() => save("draft")} disabled={saving}>Unpublish</button>
              )}
              <div className="admin-actions" style={{ marginLeft: "auto" }}>
                <button className="danger" onClick={remove}>Delete</button>
              </div>
            </>
          ) : (
            <button className="btn-primary" onClick={() => save()} disabled={saving || !title}>
              {saving ? "Saving..." : "Save Draft"}
            </button>
          )}
        </div>
        {msg && <p className="subscribe-msg" style={{ color: "var(--sage)" }}>{msg}</p>}
      </div>
    </div>
  );
}
