import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Notary Services in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Official notarisation for powers of attorney, affidavits, declarations, and corporate agreements at Dubai Courts Notary Public — drafted and notarised by Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/notary-services";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}${PATH}`,
    siteName: BUSINESS.shortName,
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

const otherServices = [
  { slug: "business-setup-dubai", title: "Business Setup" },
  { slug: "legal-translation-dubai", title: "Legal Translation" },
  { slug: "document-attestation", title: "Attestation Services" },
  { slug: "vat-registration", title: "VAT Registration" },
  { slug: "golden-visa-services", title: "Golden Visa Services" },
  { slug: "family-visa-services", title: "Family Visa Services" },
  { slug: "pro-services-dubai", title: "PRO Services" },
  { slug: "typing-services", title: "Typing Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function NotaryServicesPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / Notary Services
          </p>
          <h1 className="reveal">Notary Services in Dubai</h1>
          <p className="reveal">
            Official notarisation for agreements, affidavits, and corporate documents — prepared
            and notarised so they&rsquo;re recognised by every authority that needs to see them.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Trusted Notary Public Services</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            Notarisation that makes your documents legally valid in the UAE.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Document notarisation is essential for ensuring legal validity within the UAE. The
            process authenticates signatures and confirms signatory identities, protecting all
            parties and helping prevent potential legal conflicts down the line. We provide expert
            assistance drafting bilingual legal documents and facilitating notarisation at the
            Dubai Courts Notary Public office.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Power of Attorney (Personal &amp; Corporate)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Memorandum of Association (MOA)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Declarations &amp; Affidavits
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Local Service Agent Agreements
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Sale &amp; Purchase Agreements
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Bilingual document drafting (Arabic &amp; English)
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Get Your Document Notarised</span>
            </Link>
            <Link href="/services" className="btn outline">
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">Our Process</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            From draft to notarised document.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Review</h3>
              <p>We review your document or draft one to Dubai Courts&rsquo; requirements.</p>
            </div>
            <div className="proc reveal">
              <h3>Translation</h3>
              <p>Bilingual Arabic/English drafting where the notary office requires it.</p>
            </div>
            <div className="proc reveal">
              <h3>Notarisation</h3>
              <p>We facilitate signing and notarisation at the Notary Public office.</p>
            </div>
            <div className="proc reveal">
              <h3>Handover</h3>
              <p>Your notarised document is ready to use with any UAE authority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96 }}>
          <p className="kicker reveal">FAQs</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
            Frequently asked questions.
          </h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">01</span>
                  <span className="faq-q">What documents can be notarised?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Powers of attorney, MOAs, declarations and affidavits, local service agent
                agreements, and sale &amp; purchase agreements, among others.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">Do I need to be present for notarisation?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                The signatory generally needs to appear before the notary. If that&rsquo;s not
                possible, ask us about power of attorney options that may apply to your case.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">Can you draft the document for me first?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes — we draft bilingual agreements, affidavits, and powers of attorney to the
                format Dubai Courts requires, then take them through notarisation.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">Do you also handle attestation after notarisation?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes. Where a notarised document also needs MOFA or embassy attestation, our{" "}
                <Link href="/document-attestation" style={{ textDecoration: "underline" }}>
                  attestation team
                </Link>{" "}
                takes it from there.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* EXPLORE OTHER SERVICES */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 56, paddingBottom: 56 }}>
          <p className="kicker reveal">Explore other services</p>
          <div className="svc-index reveal">
            {otherServices.map((s) => (
              <Link key={s.slug} href={`/${s.slug}`}>
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 96, textAlign: "center" }}>
          <p className="kicker reveal">Get Started</p>
          <h2
            className="reveal display"
            style={{
              marginTop: 12,
              maxWidth: "32ch",
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 500,
              fontSize: "2.5rem",
              lineHeight: 1.05,
              color: "var(--bg)",
            }}
          >
            Need a document notarised?
          </h2>
          <p
            className="reveal"
            style={{
              marginTop: 16,
              maxWidth: "52ch",
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "15.5px",
              color: "rgba(250,250,247,.75)",
            }}
          >
            Contact us for fast and hassle-free notary services. Prime. Made. Easy.
          </p>
          <div
            className="reveal"
            style={{ marginTop: 32, display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link href="/contact-us" className="btn on-brand">
              <span>Request a Free Consultation</span>
            </Link>
            <Link
              href="https://wa.me/971543084251?text=Hi%20Bizpoint%20Prime%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services."
              className="btn outline-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>WhatsApp Us</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
