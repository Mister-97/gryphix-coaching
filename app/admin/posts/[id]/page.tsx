"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/types";

export default function EditPost() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  useEffect(() => {
    fetch(`/api/admin/posts/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        setPost(data);
        setTitle(data.title);
        setExcerpt(data.excerpt);
        setContent(data.content);
      });
  }, [params.id]);

  const save = async (statusOverride?: "draft" | "published") => {
    setSaving(true);
    setSavedMsg("");
    const body: Record<string, unknown> = { title, excerpt, content };
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
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
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
