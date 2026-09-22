"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, excerpt, content }),
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
          <label>Excerpt (shown on the blog list)</label>
          <input value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="One or two sentences" />
        </div>
        <div className="admin-field">
          <label>Content</label>
          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your post..." />
        </div>
        <button className="btn-primary" onClick={save} disabled={saving || !title}>
          {saving ? "Saving..." : "Save Draft"}
        </button>
      </div>
    </div>
  );
}
