// Server-only: imported by the API route and the admin page, never by client components.
// Waitlist storage on Upstash Redis via its REST API (no extra package needed).
// Connect it from Vercel → Storage → Upstash Redis; Vercel then provides the
// env vars below. Either naming scheme works.
const REDIS_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "").replace(/\/$/, "");
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

export const waitlistStoreConfigured = Boolean(REDIS_URL && REDIS_TOKEN);

export type WaitlistEntry = {
  trip: string;
  name: string;
  phone: string;
  email: string;
  travellers: number;
  month: string;
  at: string;
};

const countKey = (slug: string) => `waitlist:travellers:${slug}`;
const listKey = (slug: string) => `waitlist:entries:${slug}`;

async function pipeline(commands: (string | number)[][]): Promise<{ result?: unknown; error?: string }[]> {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Waitlist store request failed (${res.status})`);
  return res.json();
}

/** Saves one sign-up and adds its travellers to the trip's running total. */
export async function addToWaitlist(entry: WaitlistEntry): Promise<number> {
  const [incr] = await pipeline([
    ["INCRBY", countKey(entry.trip), entry.travellers],
    ["LPUSH", listKey(entry.trip), JSON.stringify(entry)],
  ]);
  return Number(incr?.result ?? 0);
}

/** Travellers signed up per trip slug (0 when the store is not configured). */
export async function getWaitlistCounts(slugs: string[]): Promise<Record<string, number>> {
  const counts: Record<string, number> = Object.fromEntries(slugs.map((s) => [s, 0]));
  if (!waitlistStoreConfigured || slugs.length === 0) return counts;
  const results = await pipeline(slugs.map((s) => ["GET", countKey(s)]));
  slugs.forEach((s, i) => {
    counts[s] = Number(results[i]?.result ?? 0) || 0;
  });
  return counts;
}

/** Most recent sign-ups for one trip, newest first. */
export async function getWaitlistEntries(slug: string, limit = 500): Promise<WaitlistEntry[]> {
  if (!waitlistStoreConfigured) return [];
  const [res] = await pipeline([["LRANGE", listKey(slug), 0, limit - 1]]);
  const rows = Array.isArray(res?.result) ? (res.result as string[]) : [];
  return rows.flatMap((row) => {
    try {
      return [JSON.parse(row) as WaitlistEntry];
    } catch {
      return [];
    }
  });
}
