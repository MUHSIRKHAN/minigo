// Loads the website's current tours and content into the admin, so it starts with
// everything that is live today. Run once after connecting the database: start the site with
// `npm run dev` and open http://localhost:3003/api/seed (works only in development).
// Each section is only filled if it is still empty, so running it again is safe.
import { readFile } from "node:fs/promises";
import path from "node:path";
import type { Payload } from "payload";
import { PACKAGES } from "../app/(frontend)/lib/packages";
import { UPCOMING } from "../app/(frontend)/lib/upcoming";
import { TESTIMONIALS } from "../app/(frontend)/lib/testimonials";
import { MOMENTS } from "../app/(frontend)/lib/moments";

const uploaded = new Map<string, string>();
/** Where to read the site's own photos ("/assets/…") from when not running on this computer. */
let assetOrigin: string | undefined;

/**
 * Stores a photo in the admin's photo library (the R2 bucket when set up).
 * Photos kept on the site itself ("/assets/…") are read from the public folder;
 * others are downloaded.
 */
async function photo(payload: Payload, url: string, alt: string): Promise<string> {
  const known = uploaded.get(url);
  if (known) return known;
  let data: Buffer;
  if (url.startsWith("/") && !assetOrigin) {
    data = await readFile(path.join(process.cwd(), "public", url));
  } else if (url.startsWith("/")) {
    // On Vercel the site's own files aren't on the server's disk; read them from the live site.
    const res = await fetch(new URL(url, assetOrigin));
    if (!res.ok) throw new Error(`Could not download ${url} from ${assetOrigin} (${res.status})`);
    data = Buffer.from(await res.arrayBuffer());
  } else {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Could not download ${url} (${res.status})`);
    data = Buffer.from(await res.arrayBuffer());
  }
  const id = url.startsWith("/")
    ? path.basename(url, path.extname(url))
    : (url.match(/photo-([\w-]+)/)?.[1] ?? String(Date.now()));
  const doc = await payload.create({
    collection: "media",
    data: { alt },
    file: { data, mimetype: "image/jpeg", name: `${id}.jpg`, size: data.length },
  });
  uploaded.set(url, doc.id);
  return doc.id;
}

async function isEmpty(
  payload: Payload,
  collection: "trips" | "upcoming-trips" | "testimonials" | "moments" | "gallery-images",
  log: { log: (line: string) => void },
) {
  const { totalDocs } = await payload.count({ collection });
  if (totalDocs > 0) log.log(`  ${collection}: already has ${totalDocs}, skipped`);
  return totalDocs === 0;
}

const lines = (items: string[]) => items.map((text) => ({ text }));
// Calendar dates are entered as India time, the way the admin's date picker stores them.
const indiaDay = (iso: string) => new Date(`${iso}T00:00:00+05:30`).toISOString();

export async function seed(payload: Payload, options: { assetOrigin?: string } = {}): Promise<string[]> {
  assetOrigin = options.assetOrigin;
  const log: string[] = [];
  const console = { log: (line: string) => log.push(line.trim()) };
  console.log("Loading the website's tours and content into the admin…");

  if (await isEmpty(payload, "trips", console)) {
    for (const [i, p] of PACKAGES.entries()) {
      await payload.create({
        collection: "trips",
        data: {
          title: p.title,
          slug: p.slug,
          published: true,
          order: i,
          destination: p.destination,
          region: p.region,
          tagline: p.tagline,
          summary: p.summary,
          image: await photo(payload, p.image, `${p.destination}: ${p.tagline}`),
          nights: p.nights,
          durationLabel: p.durationLabel,
          groupSize: p.groupSize,
          style: p.style,
          fromPrice: p.fromPrice,
          priceOptions: p.priceOptions,
          priceTable: p.priceTable
            ? {
                columns: p.priceTable.columns.map((name) => ({ name })),
                rows: p.priceTable.rows.map((r) => ({ name: r.name, days: r.days, prices: r.prices.map((amount) => ({ amount })) })),
              }
            : undefined,
          priceNote: p.priceNote,
          datesOnRequest: Boolean(p.datesOnRequest),
          departures: p.departures.map((d) => ({
            date: indiaDay(d.date),
            seatsLeft: d.seatsLeft ?? undefined,
            closed: Boolean(d.closed),
          })),
          highlights: lines(p.highlights),
          itinerary: p.itinerary,
          included: lines(p.included),
          notIncluded: lines(p.notIncluded),
          hotels: lines(p.hotels ?? []),
          notes: lines(p.notes ?? []),
        },
      });
    }
    console.log(`  trips: added ${PACKAGES.length}`);
  }

  if (await isEmpty(payload, "upcoming-trips", console)) {
    for (const [i, t] of UPCOMING.entries()) {
      await payload.create({
        collection: "upcoming-trips",
        data: {
          title: t.title,
          slug: t.slug,
          published: true,
          order: i,
          destination: t.destination,
          summary: t.summary,
          image: await photo(payload, t.image, t.title),
          season: t.season,
          nights: t.nights,
          estimate: t.estimate,
          goal: t.goal,
          startingInterest: t.demoInterest,
          months: t.months.map((month) => ({ month })),
        },
      });
    }
    console.log(`  upcoming-trips: added ${UPCOMING.length}`);
  }

  if (await isEmpty(payload, "testimonials", console)) {
    for (const [i, t] of TESTIMONIALS.entries()) {
      await payload.create({
        collection: "testimonials",
        data: { ...t, photo: await photo(payload, t.photo, t.name), published: true, order: i },
      });
    }
    console.log(`  testimonials: added ${TESTIMONIALS.length}`);
  }

  if (await isEmpty(payload, "moments", console)) {
    for (const [i, m] of MOMENTS.entries()) {
      await payload.create({
        collection: "moments",
        data: { ...m, image: await photo(payload, m.image, `${m.label}: ${m.caption}`), published: true, order: i },
      });
    }
    console.log(`  moments: added ${MOMENTS.length}`);
  }

  if (await isEmpty(payload, "gallery-images", console)) {
    const items = [
      ...PACKAGES.map((p) => ({ url: p.image, alt: `${p.destination}: ${p.tagline}`, caption: p.title, category: p.destination })),
      ...MOMENTS.map((m) => ({ url: m.image, alt: `${m.label}: ${m.caption}`, caption: m.caption, category: m.label })),
    ];
    for (const [i, g] of items.entries()) {
      await payload.create({
        collection: "gallery-images",
        data: { image: await photo(payload, g.url, g.alt), caption: g.caption, category: g.category, published: true, order: i },
      });
    }
    console.log(`  gallery-images: added ${items.length}`);
  }

  console.log("Done.");
  return log;
}
