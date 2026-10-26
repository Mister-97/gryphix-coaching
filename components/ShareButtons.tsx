"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const url = () => window.location.href.split("#")[0];
  const open = (build: (u: string, t: string) => string) => {
    window.open(build(encodeURIComponent(url()), encodeURIComponent(title)), "_blank", "noopener,noreferrer,width=640,height=560");
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link", url());
    }
  };

  const nativeShare = typeof navigator !== "undefined" && "share" in navigator;

  return (
    <div className="share-bar">
      <span className="share-label">Share this post</span>
      <div className="share-buttons">
        {nativeShare && (
          <button type="button" onClick={() => navigator.share({ title, url: url() }).catch(() => {})}>
            Share
          </button>
        )}
        <button type="button" onClick={() => open((u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`)}>LinkedIn</button>
        <button type="button" onClick={() => open((u, t) => `https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${t}`)}>Facebook</button>
        <button type="button" onClick={() => open((u, t) => `https://twitter.com/intent/tweet?url=${u}&text=${t}`)}>X</button>
        <a href={`mailto:?subject=${encodeURIComponent(title)}`} onClick={(e) => { e.currentTarget.href = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url())}`; }}>Email</a>
        <button type="button" onClick={copy}>{copied ? "Link copied" : "Copy link"}</button>
      </div>
    </div>
  );
}
