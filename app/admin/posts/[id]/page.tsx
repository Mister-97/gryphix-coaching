"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/types";
import { uploadImageFile } from "@/lib/uploadClient";

export default function EditPost() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    fetch(`/api/admin/posts/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setContent(data.content);
        setFeaturedImage(data.featured_image ?? null);
      });
  }, [params.id]);

  const handleFeaturedUpload = async (file: File) => {
    setUploadError("");
    setUploadingFeatured(true);
    try {
      const url = await uploadImageFile(file);
      setFeaturedImage(url);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingFeatured(false);
    }
  };

  const handleInlineUpload = async (file: File) => {
    setUploadError("");
    setUploadingInline(true);
    try {
      const url = await uploadImageFile(file);
      const textarea = contentRef.current;
      const markdown = `![](${url})`;
      if (textarea) {
        const start = textarea.selectionStart ?? content.length;
        const end = textarea.selectionEnd ?? content.length;
        const before = content.slice(0, start);
        const after = content.slice(end);
        // Always land the image on its own blank-line-separated block, no
        // matter where the cursor was -- otherwise it merges into whatever
        // text is adjacent and the renderer won't recognize it as an image.
        const leadGap = before.length === 0 || /\n\n$/.test(before) ? "" : (before.endsWith("\n") ? "\n" : "\n\n");
        // Note: when `after` is empty (inserting at the end), we still need
        // the trailing gap -- that's exactly when the user is about to keep
        // typing right after the image, so it must not merge onto its line.
        const trailGap = /^\n\n/.test(after) ? "" : (after.startsWith("\n") ? "\n" : "\n\n");
        const insert = leadGap + markdown + trailGap;
        const next = before + insert + after;
        setContent(next);
        requestAnimationFrame(() => {
          textarea.focus();
          const pos = start + insert.length;
          textarea.selectionStart = textarea.selectionEnd = pos;
        });
      } else {
        setContent((c) => c + (c ? "\n\n" : "") + markdown + "\n\n");
      }
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploadingInline(false);
    }
  };

  const save = async (statusOverride?: "draft" | "published") => {
    setSaving(true);
    setSavedMsg("");
    const body: Record<string, unknown> = { title, excerpt, content, featured_image: featuredImage };
    if (statusOverride) body.status = statusOverride;
    const res = await fetch(`/api/admin/posts/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) {
      setPost(data);
      setSavedMsg(statusOverride === "published" ? "Published!" : "Saved.");
    }
  };

  const remove = async () => {
    if (!confirm("Delete this post? This can't be undone.")) return;
    await fetch(`/api/admin/posts/${params.id}`, { method: "DELETE" });
    router.push("/admin");
  };

  if (!post) {
    return (
      <div className="admin-shell">
        <div className="admin-card"><p>Loading...</p></div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <h1>Edit Post</h1>
        <div className="admin-actions">
          <a href="/admin">&larr; Back</a>
        </div>
      </div>
      <div className="admin-card">
        <p style={{ marginBottom: "1.5rem" }}>
          Status: <span className={`status ${post.status}`}>{post.status}</span>
          {post.status === "published" && (
            <> &middot; <a href={`/blog/${post.slug}`} target="_blank">View live &rarr;</a></>
          )}
        </p>
        <div className="admin-field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="admin-field">
          <label>Excerpt</label>
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
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
          <textarea ref={contentRef} value={content} onChange={(e) => setContent(e.target.value)} />
          <label className="admin-upload-btn admin-upload-btn-inline">
            {uploadingInline ? "Uploading..." : "Insert image into post"}
            <input
              type="file"
              accept="image/png,image/jpeg,image/webp,image/gif"
              hidden
              disabled={uploadingInline}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleInlineUpload(file);
                e.target.value = "";
              }}
            />
          </label>
          <p className="admin-hint">Inserts an <code>![](image-url)</code> line at your cursor. Leave a blank line above and below it.</p>
        </div>
        {uploadError && <p className="admin-error">{uploadError}</p>}
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center" }}>
          <button className="btn-secondary" onClick={() => save()} disabled={saving}>
            Save
          </button>
          {post.status === "draft" ? (
            <button className="btn-primary" onClick={() => save("published")} disabled={saving}>
              Publish
            </button>
          ) : (
            <button className="btn-secondary" onClick={() => save("draft")} disabled={saving}>
              Unpublish
            </button>
          )}
          <div className="admin-actions" style={{ marginLeft: "auto" }}>
            <button className="danger" onClick={remove}>Delete</button>
          </div>
        </div>
        {savedMsg && <p className="subscribe-msg" style={{ color: "var(--sage)" }}>{savedMsg}</p>}
      </div>
    </div>
  );
}
