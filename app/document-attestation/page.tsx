import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Document Attestation in Dubai | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Fast, reliable MOFA and embassy attestation for educational, personal, and commercial documents in the UAE — handled end-to-end by Bizpoint Prime Business Solutions LLC.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/document-attestation";

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
  { slug: "notary-services", title: "Notary Services" },
  { slug: "vat-registration", title: "VAT Registration" },
  { slug: "golden-visa-services", title: "Golden Visa Services" },
  { slug: "family-visa-services", title: "Family Visa Services" },
  { slug: "pro-services-dubai", title: "PRO Services" },
  { slug: "typing-services", title: "Typing Services" },
  { slug: "branding-marketing", title: "Branding & Marketing" },
];

export default function DocumentAttestationPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Services / Attestation
          </p>
          <h1 className="reveal">Document Attestation in Dubai</h1>
          <p className="reveal">
            Fast, reliable MOFA &amp; embassy attestation for all your official documents.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Why Document Attestation Is Important</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            Foreign documents need official attestation before UAE authorities will accept them.
          </h2>
          <p
            className="reveal"
            style={{ marginTop: 20, maxWidth: "62ch", fontSize: "15.5px", lineHeight: 1.6, color: "var(--fg-muted)" }}
          >
            Documents issued outside the UAE — a degree certificate for an employment visa, a
            marriage certificate for a family visa — need to be attested before UAE government
            entities, employers, and financial institutions will recognise them. Attestation
            verifies the document&rsquo;s authenticity and gives it legal standing here. We manage
            the full chain of approvals: MOFA (Ministry of Foreign Affairs) attestation, embassy
            legalisation, and Notary Public approvals, with clear updates and secure handling of
            your originals throughout.
          </p>
          <div className="about-checklist">
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Educational Certificates (Degrees, Diplomas, Transcripts)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Personal Documents (Marriage, Birth, Death Certificates)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>Commercial Documents (MOA, Board Resolutions, Invoices)
            </div>
            <div className="reveal">
              <span className="check" aria-hidden="true">✓</span>MOFA &amp; Embassy Coordination
            </div>
          </div>
          <div className="reveal" style={{ marginTop: 32, display: "flex", gap: 16, flexWrap: "wrap" }}>
            <Link href="/contact-us" className="btn">
              <span>Get Your Documents Attested</span>
            </Link>
            <Link href="/services" className="btn outline">
              <span>Explore All Services</span>
            </Link>
          </div>
        </div>
      </section>

      {/* WHAT WE ATTEST */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">What We Attest</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            Attestation across educational, personal, and commercial documents.
          </h2>
          <div className="values-grid cols-3">
            <div className="value-card reveal">
              <span className="value-num">01</span>
              <h3>Educational Certificates</h3>
              <p>Degrees, diplomas, and academic transcripts attested for employment and study purposes.</p>
            </div>
            <div className="value-card reveal">
              <span className="value-num">02</span>
              <h3>Personal Documents</h3>
              <p>Marriage, birth, and death certificates attested for visa, sponsorship, and legal purposes.</p>
            </div>
            <div className="value-card reveal">
              <span className="value-num">03</span>
              <h3>Commercial Documents</h3>
              <p>MOA, board resolutions, and invoices attested for business and government submissions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 64 }}>
          <p className="kicker reveal">Our Process</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "48ch" }}>
            From original document to a fully attested one.
          </h2>
          <div className="proc-grid">
            <div className="proc reveal">
              <h3>Verification</h3>
              <p>We check your document meets the receiving authority&rsquo;s requirements.</p>
            </div>
            <div className="proc reveal">
              <h3>Notarisation</h3>
              <p>Notary Public approval where the document requires it before attestation.</p>
            </div>
            <div className="proc reveal">
              <h3>MOFA &amp; Embassy</h3>
              <p>We coordinate MOFA attestation and any required embassy legalisation.</p>
            </div>
            <div className="proc reveal">
              <h3>Delivery</h3>
              <p>Your attested document is returned ready to submit to the relevant authority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--bg-raised)" }}>
        <div className="wrapc" style={{ paddingTop: 80, paddingBottom: 96 }}>
          <p className="kicker reveal">FAQs</p>
          <h2 className="h-sec reveal" style={{ marginTop: 12, maxWidth: "44ch" }}>
            Frequently asked questions.
          </h2>
          <div className="faq-list">
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">01</span>
                  <span className="faq-q">Which documents need attestation in the UAE?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Most foreign-issued educational, personal, and commercial documents need
                attestation before UAE authorities, employers, or banks will accept them.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">02</span>
                  <span className="faq-q">Do you handle attestation from my home country too?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                We manage the UAE-side steps — Notary Public, MOFA, and embassy legalisation — and
                will advise on any attestation your document needs before it arrives here.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">03</span>
                  <span className="faq-q">Is my document safe while it&rsquo;s being processed?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Yes. Original documents are tracked and secured at every stage, with updates as
                your document moves through each authority.
              </p>
            </details>
            <details className="faq-item">
              <summary>
                <span className="faq-left">
                  <span className="faq-num">04</span>
                  <span className="faq-q">Will my document also need translation?</span>
                </span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </summary>
              <p>
                Often, yes — many attested documents also need a{" "}
                <Link href="/legal-translation-dubai" style={{ textDecoration: "underline" }}>
                  certified legal translation
                </Link>{" "}
                into Arabic or English. We can handle both in one visit.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* EXPLORE OTHER SERVICES */}
      <section>
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
            Need attestation?
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
            Contact us for expedited document processing, handled securely from start to finish.
            Prime. Made. Easy.
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
