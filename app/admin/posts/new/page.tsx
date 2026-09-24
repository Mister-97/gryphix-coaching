"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { uploadImageFile } from "@/lib/uploadClient";

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);
  const [uploadingInline, setUploadingInline] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const contentRef = useRef<HTMLTextAreaElement>(null);

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

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content, featured_image: featuredImage }),
    });
    const data = await res.json();
    setSaving(false);
    if (res.ok) router.push(`/admin/posts/${data.id}`);
  };

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <h1>New Post</h1>
        <div className="admin-actions">
          <a href="/admin">&larr; Back</a>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-field">
          <label>Title</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post title" />
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
          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your post..."
          />
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
          <p className="admin-hint">Click where you want the image in the text above, then tap this to drop it in right there.</p>
        </div>
        {uploadError && <p className="admin-error">{uploadError}</p>}
        <button className="btn-primary" onClick={save} disabled={saving || !title}>
          {saving ? "Saving..." : "Save Draft"}
        </button>
      </div>
    </div>
  );
}
