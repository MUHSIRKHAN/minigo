// Server-only: reads content straight from the admin's database (Payload's Local API, no HTTP).
import config from "@payload-config";
import { getPayload } from "payload";
import type { Media } from "@/cms/payload-types";

/**
 * The admin is switched on once a database and secret are set. Until then the
 * site shows the sample content in this folder, so a deploy without them still works.
 */
export const cmsConfigured = Boolean((process.env.DATABASE_URL || process.env.MONGODB_URI) && process.env.PAYLOAD_SECRET);

export const getCms = () => getPayload({ config });

/** Public address of an uploaded photo (the S3 bucket, or /api/media/file/… when testing locally). */
export function mediaUrl(media: string | Media | null | undefined): string {
  if (!media || typeof media === "string") return "";
  return media.url ?? "";
}

/** Payload stores calendar dates as timestamps; turn one back into the day the admin picked, in India time. */
export function isoDay(value: string): string {
  return new Date(value).toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });
}
