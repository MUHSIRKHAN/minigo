import { NextResponse } from "next/server";
import { seed } from "@/cms/seed";
import { cmsConfigured, getCms } from "../../lib/cms";

// Downloading and uploading all the photos takes a while.
export const maxDuration = 300;

/**
 * Fills empty admin sections with the website's current tours and content (see cms/seed.ts).
 * Works on this computer (npm run dev) and on Vercel preview (test) deployments, which Vercel
 * protects with a login. It never runs on the live site.
 */
export async function GET() {
  const onVercel = Boolean(process.env.VERCEL_ENV);
  if (process.env.VERCEL_ENV === "production" || (!onVercel && process.env.NODE_ENV === "production")) {
    return new NextResponse("Not found", { status: 404 });
  }
  if (!cmsConfigured) return NextResponse.json({ error: "Set DATABASE_URL and PAYLOAD_SECRET first." }, { status: 400 });

  // A preview deployment can't read its own /assets files from disk; take them from the live site.
  const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  const log = await seed(await getCms(), {
    assetOrigin: onVercel && productionHost ? `https://${productionHost}` : undefined,
  });
  return NextResponse.json({ ok: true, log });
}
