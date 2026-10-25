import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Uploaded photos are served from the S3 bucket's public address (S3_PUBLIC_URL).
const s3PublicUrl = process.env.S3_PUBLIC_URL ? new URL(process.env.S3_PUBLIC_URL) : null;

const nextConfig: NextConfig = {
  images: {
    // 85 is used by the full-bleed hero photos; 75 is the default everywhere else.
    qualities: [75, 85],
    // Without a bucket (local testing), uploads are served by the admin at /api/media/file/…
    localPatterns: [{ pathname: "/api/media/file/**" }, { pathname: "/assets/**" }],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      ...(s3PublicUrl
        ? [
            {
              protocol: s3PublicUrl.protocol.replace(":", "") as "http" | "https",
              hostname: s3PublicUrl.hostname,
              ...(s3PublicUrl.port ? { port: s3PublicUrl.port } : {}),
            },
          ]
        : []),
    ],
  },
};

export default withPayload(nextConfig);
