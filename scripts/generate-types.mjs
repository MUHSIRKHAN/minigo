// Regenerates cms/payload-types.ts after a collection changes:  npm run generate:types
// Payload's own CLI runs the config through tsx, which fails on some Node versions,
// so the config is bundled with esbuild and the generator is run with plain Node.
import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const tmp = path.join(root, ".gentypes");
await mkdir(tmp, { recursive: true });

// next/cache only matters inside a running site; stub it for this one-off script.
const stub = path.join(tmp, "next-cache-stub.mjs");
await writeFile(stub, "export const revalidatePath = () => {};\nexport const revalidateTag = () => {};\n");

const outfile = path.join(tmp, "config.mjs");
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

process.env.PAYLOAD_TS_OUTPUT_PATH = path.join(root, "cms", "payload-types.ts");
const { generateTypes } = await import("payload/node");
const config = await (await import(pathToFileURL(outfile).href)).default;
await generateTypes(config, { log: true });
process.exit(0);
