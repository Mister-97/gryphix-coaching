"use client";

import { useState } from "react";
import { useEditor, EditorContent, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { uploadImageFile } from "@/lib/uploadClient";

// Older posts are plain text with blank-line paragraphs; turn them into HTML
// the first time they are opened so nothing is lost.
function toHtml(content: string): string {
  if (!content.trim() || /^\s*</.test(content)) return content;
  const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return content
    .split(/\n\s*\n/)
    .filter((b) => b.trim())
    .map((b) => {
      const m = b.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
      if (m) return `<img src="${m[2]}" alt="${esc(m[1])}">`;
      return `<p>${esc(b.trim()).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

export default function RichEditor({ value, onChange }: { value: string; onChange: (html: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
        link: { openOnClick: false, autolink: true, HTMLAttributes: { rel: "noopener noreferrer" } },
      }),
      Image,
    ],
    content: toHtml(value),
    editorProps: { attributes: { class: "rich editor-surface" } },
    onUpdate: ({ editor }) => onChange(editor.isEmpty ? "" : editor.getHTML()),
  });

  const active = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive("bold") ?? false,
      italic: editor?.isActive("italic") ?? false,
      underline: editor?.isActive("underline") ?? false,
      h2: editor?.isActive("heading", { level: 2 }) ?? false,
      h3: editor?.isActive("heading", { level: 3 }) ?? false,
      bullet: editor?.isActive("bulletList") ?? false,
      ordered: editor?.isActive("orderedList") ?? false,
      quote: editor?.isActive("blockquote") ?? false,
      link: editor?.isActive("link") ?? false,
    }),
  });

  if (!editor) return <div className="editor-wrap"><div className="editor-surface rich" /></div>;

  const a = active ?? ({} as NonNullable<typeof active>);

  const btn = (label: string, on: boolean, run: () => void, title: string) => (
    <button type="button" className={on ? "on" : ""} title={title} onMouseDown={(e) => e.preventDefault()} onClick={run}>
      {label}
    </button>
  );

  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link address (leave empty to remove the link)", prev ?? "https://");
    if (url === null) return;
    if (url.trim() === "" || url.trim() === "https://") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
    }
  };

  const addImage = async (file: File) => {
    setError("");
    setUploading(true);
    try {
      const url = await uploadImageFile(file);
      editor.chain().focus().setImage({ src: url, alt: "" }).run();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="editor-wrap">
      <div className="editor-toolbar">
        {btn("B", a.bold, () => editor.chain().focus().toggleBold().run(), "Bold")}
        {btn("I", a.italic, () => editor.chain().focus().toggleItalic().run(), "Italic")}
        {btn("U", a.underline, () => editor.chain().focus().toggleUnderline().run(), "Underline")}
        <span className="sep" />
        {btn("Heading", a.h2, () => editor.chain().focus().toggleHeading({ level: 2 }).run(), "Large heading")}
        {btn("Subheading", a.h3, () => editor.chain().focus().toggleHeading({ level: 3 }).run(), "Smaller heading")}
        <span className="sep" />
        {btn("Bullets", a.bullet, () => editor.chain().focus().toggleBulletList().run(), "Bulleted list")}
        {btn("Numbers", a.ordered, () => editor.chain().focus().toggleOrderedList().run(), "Numbered list")}
        {btn("Quote", a.quote, () => editor.chain().focus().toggleBlockquote().run(), "Quote")}
        <span className="sep" />
        {btn("Link", a.link, setLink, "Add or edit link")}
        <label className="editor-image-btn">
          {uploading ? "Uploading..." : "Image"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            hidden
            disabled={uploading}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) addImage(file);
              e.target.value = "";
            }}
          />
        </label>
      </div>
      <EditorContent editor={editor} />
      {error && <p className="admin-error" style={{ textAlign: "left" }}>{error}</p>}
    </div>
  );
}
