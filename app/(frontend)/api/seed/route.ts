import { NextResponse } from "next/server";
import { seed } from "@/cms/seed";
import { cmsConfigured, getCms } from "../../lib/cms";

// Development only: fills empty admin sections with the sample content (see cms/seed.ts).
export async function GET() {
  if (process.env.NODE_ENV === "production") return new NextResponse("Not found", { status: 404 });
  if (!cmsConfigured) return NextResponse.json({ error: "Set DATABASE_URL and PAYLOAD_SECRET first." }, { status: 400 });
  const log = await seed(await getCms());
  return NextResponse.json({ ok: true, log });
}
