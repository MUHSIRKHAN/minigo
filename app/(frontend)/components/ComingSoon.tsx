"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { formatPrice } from "../lib/packages";
import { whatsappLink, BUSINESS } from "../lib/site";
import type { UpcomingTrip } from "../lib/upcoming";

type Status = "idle" | "sending" | "done" | "error" | "not_saved";

const JOINED_KEY = "minigo-waitlist-joined";

function readJoined(): string[] {
  try {
    return JSON.parse(window.localStorage.getItem(JOINED_KEY) || "[]");
  } catch {
    return [];
  }
}

/**
 * Trips under consideration. Visitors join a waitlist; the bar shows how many
 * travellers have signed up against the number needed to confirm dates.
 */
export default function ComingSoon({ trips, tone = "raised" }: { trips: UpcomingTrip[]; tone?: "raised" | "plain" }) {
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [joined, setJoined] = useState<string[]>([]);
  const [active, setActive] = useState<UpcomingTrip | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [errorText, setErrorText] = useState("");
  const [lastForm, setLastForm] = useState<{ travellers: number; month: string } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    setJoined(readJoined());
    fetch("/api/waitlist", { cache: "no-store" })
      .then((r) => r.json())
      .then((data) => setCounts(data.counts || {}))
      .catch(() => {});
  }, []);

  function open(trip: UpcomingTrip) {
    setActive(trip);
    setStatus("idle");
    setErrorText("");
    dialogRef.current?.showModal();
  }

  function close() {
    dialogRef.current?.close();
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!active) return;
    const data = new FormData(e.currentTarget);
    const travellers = Number(data.get("travellers") || 1);
    const month = String(data.get("month") || "Flexible");
    setLastForm({ travellers, month });
    setStatus("sending");
    setErrorText("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trip: active.slug,
          name: data.get("name"),
          phone: data.get("phone"),
          email: data.get("email"),
          travellers,
          month,
          website: data.get("website"),
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.status === 503) {
        setStatus("not_saved");
        return;
      }
      if (!res.ok) {
        setStatus("error");
        setErrorText(json.error || "Something went wrong. Please try again.");
        return;
      }
      setCounts((c) => ({
        ...c,
        [active.slug]: typeof json.total === "number" ? json.total : (c[active.slug] || 0) + travellers,
      }));
      const next = Array.from(new Set([...readJoined(), active.slug]));
      try {
        window.localStorage.setItem(JOINED_KEY, JSON.stringify(next));
      } catch {}
      setJoined(next);
      setStatus("done");
    } catch {
      setStatus("not_saved");
    }
  }

  const whatsappFallback = active
    ? whatsappLink(
        `Hi ${BUSINESS.name}, please add me to the waitlist for "${active.title}"` +
          (lastForm ? `: ${lastForm.travellers} traveller${lastForm.travellers > 1 ? "s" : ""}, ${lastForm.month}.` : "."),
      )
    : "#";

  return (
    <section id="coming-soon" style={tone === "raised" ? { background: "var(--bg-raised)" } : undefined}>
      <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 112 }}>
        <p className="kicker reveal">Coming soon</p>
        <h2 className="h-sec reveal" style={{ marginTop: 14 }}>
          Next on our list
        </h2>
        <p className="sub reveal">
          Tell us you are interested. When enough travellers sign up, we fix the dates and you get
          first pick of seats.
        </p>

        <div className="up-grid">
          {trips.map((trip) => {
            const interest = trip.demoInterest + (counts[trip.slug] || 0);
            const pct = Math.min(100, Math.round((interest / trip.goal) * 100));
            const reached = interest >= trip.goal;
            const isJoined = joined.includes(trip.slug);
            const [, route] = trip.title.split(": ");
            return (
              <article className="up-card reveal" key={trip.slug}>
                <div className="up-photo">
                  <Image src={trip.image} alt={trip.title} fill sizes="(max-width: 759px) 85vw, 33vw" />
                  <span className="up-badge">Coming soon</span>
                </div>
                <div className="up-body">
                  <p className="up-dest">{trip.destination}</p>
                  <h3>{route ?? trip.title}</h3>
                  <p className="up-sum">{trip.summary}</p>
                  <dl className="up-meta">
                    <div>
                      <dt>Planned for</dt>
                      <dd>{trip.season}</dd>
                    </div>
                    <div>
                      <dt>Length</dt>
                      <dd>{trip.nights + 1} days</dd>
                    </div>
                    <div>
                      <dt>Around</dt>
                      <dd>{formatPrice(trip.estimate)}</dd>
                    </div>
                  </dl>
                  <div className="up-progress">
                    <div
                      className="up-bar"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={trip.goal}
                      aria-valuenow={Math.min(interest, trip.goal)}
                      aria-label={`${interest} of ${trip.goal} travellers interested`}
                    >
                      <span style={{ width: `${pct}%` }} />
                    </div>
                    <p>
                      {interest > 0 ? (
                        <>
                          <strong>{interest}</strong>
                          {reached ? (
                            <>
                              {" "}travellers interested<em> · Dates coming soon</em>
                            </>
                          ) : (
                            <> of {trip.goal} travellers interested</>
                          )}
                        </>
                      ) : (
                        <>Be the first to register interest</>
                      )}
                    </p>
                  </div>
                  <button type="button" className={`btn${isJoined ? " outline" : ""}`} onClick={() => open(trip)}>
                    <span>{isJoined ? "You're on the list ✓" : "Join the waitlist"}</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <dialog ref={dialogRef} className="wl-dialog" aria-labelledby="wl-title" onClose={() => setActive(null)}>
        {active ? (
          <div className="wl-inner">
            <button type="button" className="wl-close" onClick={close} aria-label="Close">
              &times;
            </button>
            <p className="kicker">Join the waitlist</p>
            <h3 id="wl-title">{active.title}</h3>

            {status === "done" ? (
              <div className="wl-done">
                <p>
                  <strong>You&rsquo;re on the list.</strong> We&rsquo;ll message you on WhatsApp as soon as the
                  dates are confirmed, and you&rsquo;ll get first pick of seats.
                </p>
                <button type="button" className="btn" onClick={close}>
                  <span>Done</span>
                </button>
              </div>
            ) : status === "not_saved" ? (
              <div className="wl-done">
                <p>
                  We couldn&rsquo;t save that just now. Send it to us on WhatsApp instead and we&rsquo;ll add
                  you by hand.
                </p>
                <a className="btn" href={whatsappFallback} target="_blank" rel="noopener noreferrer">
                  <span>Send on WhatsApp</span>
                </a>
              </div>
            ) : (
              <form className="wl-form" onSubmit={submit}>
                <p className="wl-note">
                  No payment and no commitment. Planned for {active.season}, around{" "}
                  {formatPrice(active.estimate)} per person.
                </p>
                <div className="field">
                  <label htmlFor="wl-name">Your name</label>
                  <input id="wl-name" name="name" type="text" autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="wl-phone">WhatsApp number</label>
                  <input id="wl-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91" required />
                </div>
                <div className="field">
                  <label htmlFor="wl-email">Email (optional)</label>
                  <input id="wl-email" name="email" type="email" autoComplete="email" />
                </div>
                <div className="frow">
                  <div className="field">
                    <label htmlFor="wl-travellers">Travellers</label>
                    <select id="wl-travellers" name="travellers" defaultValue="2">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="field">
                    <label htmlFor="wl-month">Preferred month</label>
                    <select id="wl-month" name="month" defaultValue={active.months[0]}>
                      {active.months.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                      <option value="Flexible">Flexible</option>
                    </select>
                  </div>
                </div>
                {/* Honeypot for bots — hidden from people and screen readers */}
                <input className="wl-hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
                {status === "error" ? (
                  <p className="wl-error" role="alert">
                    {errorText}
                  </p>
                ) : null}
                <button type="submit" className="btn" disabled={status === "sending"}>
                  <span>{status === "sending" ? "Adding you…" : "Join the waitlist"}</span>
                </button>
              </form>
            )}
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
