import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

// Image storage for the blog editor (featured image + inline post images).
// Uses Cloudflare R2 (S3-compatible) rather than Vercel Blob -- Vercel Blob
// on this account hit its usage threshold and can't provision new stores
// (same issue that forced the Ranverbae portal off Blob onto R2). This
// reuses that same R2 bucket/account, namespaced under R2_PREFIX so it
// doesn't collide with other projects' files in the shared bucket.

function r2Client() {
  return new S3Client({
    region: "auto",
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
    },
  });
}

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

export async function uploadImage(file: File): Promise<{ url: string } | { error: string }> {
  if (!ALLOWED_TYPES.has(file.type)) {
    return { error: "Only JPG, PNG, WEBP, or GIF images are allowed." };
  }
  if (file.size > MAX_BYTES) {
    return { error: "Image must be under 8MB." };
  }

  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = file.type.split("/")[1].replace("jpeg", "jpg");
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-").slice(-60);
  const key = `${process.env.R2_PREFIX}/${crypto.randomUUID()}-${safeName || `image.${ext}`}`;

  const client = r2Client();
  await client.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!,
      Key: key,
      Body: bytes,
      ContentType: file.type,
    })
  );

  return { url: `${process.env.R2_PUBLIC_URL}/${key}` };
}
