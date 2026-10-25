import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { cmsConfigured, getCms } from "../../lib/cms";
import { getUpcomingTrips } from "../../lib/content";

export const dynamic = "force-dynamic";

type WaitlistPayload = {
  trip?: string;
  name?: string;
  phone?: string;
  email?: string;
  travellers?: number | string;
  month?: string;
  /** Honeypot: real visitors never see or fill this field */
  website?: string;
};

type WaitlistEntry = { name: string; phone: string; email: string; travellers: number; month: string };

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

async function notifyByEmail(entry: WaitlistEntry, tripTitle: string, total: number | null): Promise<boolean> {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!user || !pass || !to) return false;
  try {
    const transporter = nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
    await transporter.sendMail({
      from: `Minigo Holidays Website <${user}>`,
      to,
      replyTo: entry.email || undefined,
      subject: `Waitlist: ${tripTitle} (+${entry.travellers})`,
      html: `
        <p><strong>Trip:</strong> ${escapeHtml(tripTitle)}</p>
        <p><strong>Name:</strong> ${escapeHtml(entry.name)}</p>
        <p><strong>WhatsApp / phone:</strong> ${escapeHtml(entry.phone)}</p>
        <p><strong>Email:</strong> ${escapeHtml(entry.email) || "—"}</p>
        <p><strong>Travellers:</strong> ${entry.travellers}</p>
        <p><strong>Preferred month:</strong> ${escapeHtml(entry.month)}</p>
        ${total !== null ? `<p><strong>Total travellers interested so far:</strong> ${total}</p>` : ""}
      `,
    });
    return true;
  } catch (error) {
    console.error("Waitlist email failed", error);
    return false;
  }
}

/** Travellers signed up per coming soon trip (real sign-ups only; the page adds each trip's extra count). */
export async function GET() {
  try {
    const counts: Record<string, number> = {};
    if (cmsConfigured) {
      const cms = await getCms();
      const { docs } = await cms.find({
        collection: "upcoming-trips",
        pagination: false,
        depth: 0,
        select: { slug: true, interestedTravellers: true },
      });
      for (const doc of docs) counts[doc.slug] = doc.interestedTravellers ?? 0;
    }
    return NextResponse.json({ counts, live: cmsConfigured }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Waitlist counts failed", error);
    return NextResponse.json({ counts: {}, live: false }, { status: 200 });
  }
}

export async function POST(request: Request) {
  let body: WaitlistPayload;
  try {
    body = (await request.json()) as WaitlistPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Bots fill every field; quietly accept and drop.
  if (body.website) return NextResponse.json({ ok: true, total: null });

  const trip = (await getUpcomingTrips()).find((t) => t.slug === String(body.trip ?? ""));
  if (!trip) return NextResponse.json({ error: "Unknown trip" }, { status: 400 });

  const name = String(body.name ?? "").trim().slice(0, 80);
  const phone = String(body.phone ?? "").trim().slice(0, 20);
  const email = String(body.email ?? "").trim().slice(0, 120);
  const travellers = Math.round(Number(body.travellers));
  const month = String(body.month ?? "").trim();

  if (!name) return NextResponse.json({ error: "Please add your name." }, { status: 400 });
  if (phone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "Please add a valid WhatsApp or phone number." }, { status: 400 });
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
  }
  if (!Number.isFinite(travellers) || travellers < 1 || travellers > 10) {
    return NextResponse.json({ error: "Travellers must be between 1 and 10." }, { status: 400 });
  }
  if (month !== "Flexible" && !trip.months.includes(month)) {
    return NextResponse.json({ error: "Please choose a month." }, { status: 400 });
  }

  const entry: WaitlistEntry = { name, phone, email, travellers, month };

  // Saved in the admin under Trips → Waitlist sign-ups; the trip's total updates itself.
  let total: number | null = null;
  if (cmsConfigured) {
    try {
      const cms = await getCms();
      const { docs } = await cms.find({
        collection: "upcoming-trips",
        where: { slug: { equals: trip.slug } },
        limit: 1,
        depth: 0,
        select: { id: true },
      });
      if (docs[0]) {
        await cms.create({ collection: "waitlist-signups", data: { ...entry, email: email || undefined, trip: docs[0].id } });
        const updated = await cms.findByID({ collection: "upcoming-trips", id: docs[0].id, depth: 0 });
        total = updated.interestedTravellers ?? 0;
      }
    } catch (error) {
      console.error("Waitlist save failed", error);
    }
  }
  const emailed = await notifyByEmail(entry, trip.title, total);

  // Nothing could record the sign-up: tell the visitor so they can use WhatsApp instead.
  if (total === null && !emailed) {
    return NextResponse.json({ error: "not_saved" }, { status: 503 });
  }

  return NextResponse.json({ ok: true, total });
}
