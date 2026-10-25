import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";
import { attachDatabasePool } from "@vercel/functions";

import { Users } from "./cms/collections/Users";
import { Media } from "./cms/collections/Media";
import { Trips } from "./cms/collections/Trips";
import { UpcomingTrips } from "./cms/collections/UpcomingTrips";
import { WaitlistSignups } from "./cms/collections/WaitlistSignups";
import { Testimonials } from "./cms/collections/Testimonials";
import { Moments } from "./cms/collections/Moments";
import { BlogPosts } from "./cms/collections/BlogPosts";
import { GalleryImages } from "./cms/collections/GalleryImages";
import { ContactSubmissions } from "./cms/collections/ContactSubmissions";
import { s3Configured } from "./cms/storage";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const blobConfigured = Boolean(process.env.BLOB_READ_WRITE_TOKEN);

export default buildConfig({
  // The admin runs on its own subdomain (ADMIN_URL); admin links and password-reset emails use it.
  serverURL: process.env.ADMIN_URL || process.env.NEXT_PUBLIC_SITE_URL || undefined,
  // Admin logins are accepted only from Minigo's own addresses.
  csrf: [process.env.ADMIN_URL, process.env.NEXT_PUBLIC_SITE_URL].filter((u): u is string => Boolean(u)),
  secret: process.env.PAYLOAD_SECRET || "",
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · Minigo Holidays admin",
      icons: [{ rel: "icon", type: "image/png", url: "/assets/favicon.png" }],
    },
    components: {
      graphics: { Logo: "/cms/admin/Logo#Logo", Icon: "/cms/admin/Icon#Icon" },
    },
    importMap: { baseDir: dirname },
  },
  collections: [
    Trips,
    UpcomingTrips,
    WaitlistSignups,
    ContactSubmissions,
    Testimonials,
    Moments,
    GalleryImages,
    BlogPosts,
    Media,
    Users,
  ],
  editor: lexicalEditor(),
  // Sends admin emails such as "forgot password" through the same Gmail account as the enquiry form.
  email:
    process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD
      ? nodemailerAdapter({
          defaultFromAddress: process.env.GMAIL_USER,
          defaultFromName: "Minigo Holidays",
          transportOptions: {
            service: "gmail",
            auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
          },
        })
      : undefined,
  // MongoDB Atlas (free M0 cluster). Vercel's MongoDB Atlas integration sets MONGODB_URI.
  // Idle connections are closed after a few seconds so a paused Vercel function never wakes
  // up holding a connection Atlas has already dropped (see onInit).
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || process.env.MONGODB_URI || "",
    connectOptions: { maxIdleTimeMS: 5000 },
  }),
  onInit: async (payload) => {
    if (!process.env.VERCEL) return;
    // Keeps the function alive just long enough to close idle connections before Vercel pauses it.
    const client = (payload.db as { connection?: { getClient?: () => unknown } }).connection?.getClient?.();
    if (client) attachDatabasePool(client as Parameters<typeof attachDatabasePool>[0]);
  },
  sharp,
  typescript: { outputFile: path.resolve(dirname, "cms/payload-types.ts") },
  plugins: [
    // Photos go to Vercel Blob when the project has a Blob store (BLOB_READ_WRITE_TOKEN, added by Vercel).
    // Uploads go straight from the browser to Blob, so photos over Vercel's 4.5 MB request limit work too.
    vercelBlobStorage({
      enabled: blobConfigured,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: true,
      collections: { media: { prefix: "media", disablePayloadAccessControl: true } },
    }),
    // Alternative: a Cloudflare R2 bucket (S3-compatible), used when set up and Blob isn't.
    // Without either, photos are saved on this computer (local testing only).
    s3Storage({
      enabled: s3Configured && !blobConfigured,
      collections: {
        media: {
          prefix: "media",
          disablePayloadAccessControl: true,
          generateFileURL: ({ filename, prefix }) =>
            `${(process.env.S3_PUBLIC_URL || "").replace(/\/$/, "")}/${prefix ? `${prefix}/` : ""}${filename}`,
        },
      },
      bucket: process.env.S3_BUCKET || "",
      config: {
        region: process.env.S3_REGION || "auto",
        endpoint: process.env.S3_ENDPOINT || undefined,
        forcePathStyle: Boolean(process.env.S3_ENDPOINT),
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
      },
    }),
  ],
});
