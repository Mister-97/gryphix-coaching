import sanitizeHtml from "sanitize-html";

// Allow-list matching what the rich text editor can produce.
export function sanitizePostHtml(html: string): string {
  const clean = sanitizeHtml(html, {
    allowedTags: ["p", "br", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "a", "img", "blockquote"],
    allowedAttributes: { a: ["href", "target", "rel"], img: ["src", "alt"] },
    allowedSchemes: ["http", "https", "mailto"],
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer" }, true),
    },
  });
  // The editor leaves an empty paragraph after a trailing list or image.
  return clean.replace(/(<p><\/p>)+$/, "");
}
