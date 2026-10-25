// Cloudflare R2 bucket for uploaded photos. R2 speaks the S3 protocol, so Payload's
// S3 adapter is used; plain Amazon S3 also works (set S3_REGION instead of S3_ENDPOINT).
// All five values must be set for uploads to go to the bucket.
export const s3Configured = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY &&
    process.env.S3_PUBLIC_URL &&
    (process.env.S3_REGION || process.env.S3_ENDPOINT),
);
