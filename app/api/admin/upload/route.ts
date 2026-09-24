import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/storage";

// Auth enforced by middleware.ts (covers /api/admin/:path*), same as every
// other route in this directory.
export async function POST(request: NextRequest) {
  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const result = await uploadImage(file);
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json(result);
}
