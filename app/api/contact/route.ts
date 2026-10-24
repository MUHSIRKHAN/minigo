import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  name?: string;
  email?: string;
  service?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function saveToCms(fields: {
  name: string;
  email: string;
  service: string;
  message: string;
}): Promise<boolean> {
  const payloadUrl = (process.env.PAYLOAD_URL || "http://localhost:3000").replace(/\/$/, "");
  try {
    const res = await fetch(`${payloadUrl}/api/contact-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    if (!res.ok) {
      console.error("Failed to save contact submission to CMS", res.status, await res.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error("Failed to reach CMS to save contact submission", error);
    return false;
  }
}

async function sendEmail(fields: {
  name: string;
  email: string;
  service: string;
  message: string;
}): Promise<boolean> {
  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO_EMAIL;

  if (!gmailUser || !gmailAppPassword || !to) {
    console.warn("Contact email skipped — GMAIL_USER, GMAIL_APP_PASSWORD, or CONTACT_TO_EMAIL not set");
    return false;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  });

  try {
    await transporter.sendMail({
      from: `Bizpoint Prime Website <${gmailUser}>`,
      to,
      replyTo: fields.email,
      subject: `New consultation request from ${fields.name}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(fields.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fields.email)}</p>
        <p><strong>Needs help with:</strong> ${escapeHtml(fields.service) || "—"}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(fields.message).replace(/\n/g, "<br />") || "—"}</p>
      `,
    });
    return true;
  } catch (error) {
    console.error("Failed to send contact email via Gmail SMTP", error);
    return false;
  }
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const service = body.service?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const fields = { name, email, service, message };

  // CMS is the source of truth for leads; Gmail is best-effort notification.
  const [savedToCms, emailed] = await Promise.all([saveToCms(fields), sendEmail(fields)]);

  if (!savedToCms && !emailed) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
  }

  if (!savedToCms) {
    console.error("Contact form accepted via email only — CMS save failed");
  }
  if (!emailed) {
    console.warn("Contact form saved to CMS — email notification failed or was skipped");
  }

  return NextResponse.json({ ok: true });
}
