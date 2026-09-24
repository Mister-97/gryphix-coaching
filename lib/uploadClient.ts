// Client-side helper for the admin editor's image uploads (featured image +
// inline images). Posts to /api/admin/upload, which handles storage (R2).
export async function uploadImageFile(file: File): Promise<string> {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload failed");
  return data.url as string;
}
