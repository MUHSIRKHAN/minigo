import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Uploaded photos are served from the S3 bucket's public address (S3_PUBLIC_URL).
const s3PublicUrl = process.env.S3_PUBLIC_URL ? new URL(process.env.S3_PUBLIC_URL) : null;

// The website lives on NEXT_PUBLIC_SITE_URL (minigoholidays.com) and the admin on its own
// subdomain, ADMIN_URL (admin.minigoholidays.com). Both point at this same project; these
// rules send each visitor to the right one. Without ADMIN_URL the admin stays at /admin.
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ? new URL(process.env.NEXT_PUBLIC_SITE_URL) : null;
const adminUrl = process.env.ADMIN_URL ? new URL(process.env.ADMIN_URL) : null;
const hostPattern = (url: URL) => url.hostname.replace(/\./g, "\\.");

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
  async redirects() {
    if (!adminUrl || !siteUrl) return [];
    const adminHost = { type: "host" as const, value: hostPattern(adminUrl) };
    return [
      // The admin subdomain opens the admin straight away.
      { source: "/", has: [adminHost], destination: "/admin", permanent: false },
      // Website pages asked for on the admin subdomain go to the main site.
      {
        source: "/:path((?!admin|api|_next|assets).*)",
        has: [adminHost],
        destination: `${siteUrl.origin}/:path`,
        permanent: false,
      },
      // /admin on any other address (the main domain, the vercel.app address) goes to the subdomain.
      { source: "/admin/:path*", missing: [adminHost], destination: `${adminUrl.origin}/admin/:path*`, permanent: false },
    ];
  },
  async headers() {
    if (!adminUrl) return [];
    // Keep the admin subdomain out of search engines.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: hostPattern(adminUrl) }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default withPayload(nextConfig);
