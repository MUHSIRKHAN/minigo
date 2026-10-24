import type { NextConfig } from "next";

const payloadUrl = new URL(process.env.PAYLOAD_URL || "http://localhost:3000");

const nextConfig: NextConfig = {
  images: {
    // Next.js 16 blocks optimizing images from local IPs by default.
    // Required for local Payload CMS media during development.
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/api/media/file/**",
      },
      // Production / preview CMS media (PAYLOAD_URL), e.g. cms.bizpointprime.ae
      {
        protocol: payloadUrl.protocol.replace(":", "") as "http" | "https",
        hostname: payloadUrl.hostname,
        ...(payloadUrl.port ? { port: payloadUrl.port } : {}),
        pathname: "/api/media/file/**",
      },
    ],
  },
};

export default nextConfig;
