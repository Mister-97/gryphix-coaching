"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import type { BlogPost } from "@/lib/types";
import PostForm from "@/components/PostForm";

export default function EditPost() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetch(`/api/admin/posts/${params.id}`)
      .then((r) => r.json())
      .then(setPost);
  }, [params.id]);

  if (!post) {
    return (
      <div className="admin-shell">
        <div className="admin-card"><p>Loading...</p></div>
      </div>
    );
  }

  return <PostForm initial={post} />;
}
