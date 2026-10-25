import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

const ALLOWED_TAGS = new Set(["blogs", "gallery"]);

export async function POST(request: Request) {
  const secret = request.headers.get("x-revalidate-secret");
  const expected = process.env.REVALIDATE_SECRET;

  if (!expected || secret !== expected) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  let tag = "blogs";
  try {
    const body = (await request.json()) as { tag?: string };
    if (body.tag) tag = body.tag;
  } catch {
    // Payload may send an empty/invalid body; default tag is fine.
  }

  if (!ALLOWED_TAGS.has(tag)) {
    return NextResponse.json({ error: `Unknown tag: ${tag}` }, { status: 400 });
  }

  // Immediate expire so CMS edits show on the next visit without waiting for SWR.
  revalidateTag(tag, { expire: 0 });

  if (tag === "blogs") {
    revalidatePath("/blogs");
    revalidatePath("/blogs/[slug]", "page");
  } else if (tag === "gallery") {
    revalidatePath("/gallery");
  }

  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
