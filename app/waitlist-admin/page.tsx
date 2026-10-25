import type { Metadata } from "next";
import Link from "next/link";
import { UPCOMING } from "../lib/upcoming";
import { getWaitlistCounts, getWaitlistEntries, waitlistStoreConfigured } from "../lib/waitlistStore";

// Private page for the Minigo team: waitlist totals and every sign-up.
// Protected by WAITLIST_ADMIN_KEY (set it in Vercel → Settings → Environment Variables).
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Waitlist | Minigo Holidays",
  robots: { index: false, follow: false },
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });

export default async function WaitlistAdmin({ searchParams }: { searchParams: Promise<{ key?: string }> }) {
  const { key } = await searchParams;
  const expected = process.env.WAITLIST_ADMIN_KEY || "";

  if (!expected) {
    return (
      <main className="wl-admin">
        <h1>Waitlist</h1>
        <p>This page is switched off. Add a <code>WAITLIST_ADMIN_KEY</code> environment variable in Vercel to turn it on.</p>
      </main>
    );
  }

  if (key !== expected) {
    return (
      <main className="wl-admin">
        <h1>Waitlist</h1>
        <form method="get" className="wl-admin-login">
          <label htmlFor="key">Password</label>
          <input id="key" name="key" type="password" autoComplete="current-password" required />
          <button type="submit" className="btn">
            <span>View waitlist</span>
          </button>
          {key ? <p className="wl-error">That password is not right.</p> : null}
        </form>
      </main>
    );
  }

  if (!waitlistStoreConfigured) {
    return (
      <main className="wl-admin">
        <h1>Waitlist</h1>
        <p>
          The waitlist store is not connected yet. In Vercel, open Storage, add Upstash Redis to this project
          and redeploy. Until then, sign-ups arrive only by email (if email is set up) or WhatsApp.
        </p>
      </main>
    );
  }

  const counts = await getWaitlistCounts(UPCOMING.map((t) => t.slug));
  const entries = await Promise.all(UPCOMING.map((t) => getWaitlistEntries(t.slug)));

  return (
    <main className="wl-admin">
      <h1>Waitlist</h1>
      <p className="wl-admin-note">
        Real sign-ups only (the demo starting numbers on the website are not included). Counts are travellers, not
        enquiries.
      </p>

      <div className="wl-admin-summary">
        {UPCOMING.map((t) => {
          const n = counts[t.slug] || 0;
          return (
            <div key={t.slug}>
              <span>{t.destination}</span>
              <strong>{t.goal ? `${n} / ${t.goal}` : n}</strong>
              <small>{!t.goal ? "travellers interested" : n >= t.goal ? "Ready to plan" : `${t.goal - n} more needed`}</small>
            </div>
          );
        })}
      </div>

      {UPCOMING.map((t, i) => (
        <section key={t.slug} className="wl-admin-trip">
          <h2>
            {t.title} <small>({entries[i].length} sign-ups)</small>
          </h2>
          {entries[i].length === 0 ? (
            <p>No sign-ups yet.</p>
          ) : (
            <div className="wl-admin-table">
              <table>
                <thead>
                  <tr>
                    <th>When</th>
                    <th>Name</th>
                    <th>WhatsApp</th>
                    <th>Email</th>
                    <th>Travellers</th>
                    <th>Month</th>
                  </tr>
                </thead>
                <tbody>
                  {entries[i].map((e, j) => (
                    <tr key={`${e.at}-${j}`}>
                      <td>{fmt(e.at)}</td>
                      <td>{e.name}</td>
                      <td>
                        <Link href={`https://wa.me/${e.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                          {e.phone}
                        </Link>
                      </td>
                      <td>{e.email || "—"}</td>
                      <td>{e.travellers}</td>
                      <td>{e.month}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </main>
  );
}
