import type { ReactNode } from "react";

// Blog post bodies are plain text (white-space: pre-wrap on the container)
// with one lightweight addition: a line of its own reading `![alt](url)`
// renders as an inline image. Anything else is a plain paragraph.
const IMAGE_LINE = /^!\[([^\]]*)\]\(([^)]+)\)$/;

export function renderPostContent(content: string): ReactNode[] {
  const blocks = content.split(/\n\s*\n/).filter((b) => b.trim() !== "");
  return blocks.map((block, i) => {
    const match = block.trim().match(IMAGE_LINE);
    if (match) {
      const [, alt, src] = match;
      // eslint-disable-next-line @next/next/no-img-element
      return <img key={i} src={src} alt={alt} className="blog-post-image" />;
    }
    return <p key={i}>{block}</p>;
  });
}
