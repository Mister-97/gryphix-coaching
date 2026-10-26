import { ImageResponse } from "next/og";
import sharp from "sharp";
import { supabaseAdmin } from "@/lib/supabase";

// 1200x630 share card for every post. Built server-side so it is always the
// right shape and format, whatever the featured image is (portrait, tiny,
// WebP -- which the renderer cannot read -- or missing altogether).
export const alt = "Gryphix Coaching & Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const revalidate = 300;

const FOREST = "#1A3D34";
const CREAM = "#FAF7F2";
const GOLD = "#C9A962";
const SAGE_LIGHT = "#A8C5B0";
const PHOTO_W = 460;

async function loadFont(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600", {
      headers: { "User-Agent": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1" },
    }).then((r) => r.text());
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

async function photoDataUri(src: string | null): Promise<string | null> {
  if (!src) return null;
  try {
    const res = await fetch(src);
    if (!res.ok) return null;
    const buf = Buffer.from(await res.arrayBuffer());
    const jpg = await sharp(buf).resize(PHOTO_W, 630, { fit: "cover", position: "attention" }).jpeg({ quality: 82 }).toBuffer();
    return `data:image/jpeg;base64,${jpg.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post } = await supabaseAdmin()
    .from("blog_posts")
    .select("title, featured_image")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  const title = post?.title ?? "Gryphix Coaching & Development";
  const [photo, font] = await Promise.all([photoDataUri(post?.featured_image ?? null), loadFont()]);
  const fontSize = title.length > 90 ? 48 : title.length > 60 ? 56 : title.length > 35 ? 66 : 76;
  const serif = font ? "Cormorant" : "serif";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: FOREST }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "64px 64px 56px 72px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 44, height: 3, background: GOLD }} />
            <div style={{ color: GOLD, fontSize: 24, letterSpacing: 4, textTransform: "uppercase" }}>Blog</div>
          </div>
          <div style={{ display: "flex", color: CREAM, fontFamily: serif, fontWeight: 600, fontSize, lineHeight: 1.08, letterSpacing: -1, maxWidth: photo ? 620 : 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ color: CREAM, fontFamily: serif, fontWeight: 600, fontSize: 38 }}>Gryphix Coaching & Development</div>
            <div style={{ color: SAGE_LIGHT, fontSize: 22 }}>gryphixcoaching.com</div>
          </div>
        </div>
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photo} width={PHOTO_W} height={630} style={{ width: PHOTO_W, height: 630, objectFit: "cover" }} alt="" />
        )}
      </div>
    ),
    { ...size, fonts: font ? [{ name: "Cormorant", data: font, weight: 600, style: "normal" }] : undefined }
  );
}
