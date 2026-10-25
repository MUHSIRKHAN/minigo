// Regenerates Payload's generated files without starting the site:
//   npm run generate:types      → cms/payload-types.ts (after a collection changes)
//   npm run generate:importmap  → app/(payload)/admin/importMap.js (after admin components or plugins change)
// Payload's own CLI runs the config through tsx, which fails on some Node versions, so the
// config is bundled with esbuild and Payload's generators are run with plain Node.
import { build } from "esbuild";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const task = process.argv[2];
if (task !== "types" && task !== "importmap") {
  console.error("Usage: node scripts/payload-generate.mjs types|importmap");
  process.exit(1);
}

const root = process.cwd();
const tmp = path.join(root, ".gentypes");
await mkdir(tmp, { recursive: true });

// next/cache only matters inside a running site; stub it for this one-off script.
const stub = path.join(tmp, "next-cache-stub.mjs");
await writeFile(stub, "export const revalidatePath = () => {};\nexport const revalidateTag = () => {};\n");

// The bundle sits in the project root so paths the config builds from its own location
// (admin component paths, the types output file) resolve exactly as in the real config.
const outfile = path.join(root, ".payload-config.bundle.mjs");
await build({
  entryPoints: [path.join(root, "payload.config.ts")],
  bundle: true,
  platform: "node",
  format: "esm",
  packages: "external",
  alias: { "next/cache": stub },
  outfile,
  logLevel: "warning",
});

// Plugins that only add admin components while switched on (Vercel Blob's direct uploads)
// must be switched on here, or production would miss them in the import map.
process.env.BLOB_READ_WRITE_TOKEN ||= "vercel_blob_rw_generateonly_generateonly";

try {
  const config = await (await import(pathToFileURL(outfile).href)).default;
  if (task === "types") {
    const { generateTypes } = await import("payload/node");
    await generateTypes(config, { log: true });
  } else {
    const { generateImportMap } = await import("payload");
    await generateImportMap(config, { log: true, force: true });
  }
} finally {
  await rm(outfile, { force: true });
}
process.exit(0);
