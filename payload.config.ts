import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

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

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SITE_URL || undefined,
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
  db: mongooseAdapter({ url: process.env.DATABASE_URL || process.env.MONGODB_URI || "" }),
  sharp,
  typescript: { outputFile: path.resolve(dirname, "cms/payload-types.ts") },
  plugins: [
    // Photos go to the Cloudflare R2 bucket (S3-compatible) when it is set up; otherwise they are saved on this computer (local testing only).
    s3Storage({
      enabled: s3Configured,
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
