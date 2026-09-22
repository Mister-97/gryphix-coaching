"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { BlogPost } from "@/lib/types";

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const res = await fetch("/api/admin/posts");
    if (res.ok) setPosts(await res.json());
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this post? This can't be undone.")) return;
    await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    load();
  };

  const togglePublish = async (post: BlogPost) => {
    const nextStatus = post.status === "published" ? "draft" : "published";
    await fetch(`/api/admin/posts/${post.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus }),
    });
    load();
  };

  return (
    <div className="admin-shell">
      <div className="admin-header">
        <h1>Gryphix Blog Admin</h1>
        <div className="admin-actions">
          <a href="/admin/posts/new">+ New Post</a>
          <button onClick={logout}>Log Out</button>
        </div>
      </div>
      <div className="admin-card">
        {loading ? (
          <p>Loading...</p>
        ) : posts.length === 0 ? (
          <p>No posts yet. Click &quot;New Post&quot; to write your first one.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="admin-post-row">
              <div>
                <span className="title">{post.title}</span>
                <span className={`status ${post.status}`}>{post.status}</span>
              </div>
              <div className="admin-actions">
                <a href={`/admin/posts/${post.id}`}>Edit</a>
                <button onClick={() => togglePublish(post)}>
                  {post.status === "published" ? "Unpublish" : "Publish"}
                </button>
                <button className="danger" onClick={() => remove(post.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
