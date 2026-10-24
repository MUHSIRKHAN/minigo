import type { Metadata } from "next";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BUSINESS, SITE_URL } from "../lib/site";
import Link from "next/link";

const TITLE = "Contact Us | Bizpoint Prime Business Solutions LLC";
const DESCRIPTION =
  "Get in touch with Bizpoint Prime Business Solutions LLC for business setup, legal translation, PRO services, and more — call, email, or send us a message.";
const OG_IMAGE =
  "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format";
const PATH = "/contact-us";

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

export default function ContactUsPage() {
  return (
    <>
      <Header />

      {/* PAGE HERO */}
      <section className="page-hero">
        <Image
          className="bg"
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80&fm=jpg&fit=crop&auto=format"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          priority
        />
        <div className="overlay" aria-hidden="true"></div>
        <div className="wrap inner">
          <p className="kicker reveal" style={{ color: "var(--accent)" }}>
            Contact Us
          </p>
          <h1 className="reveal">Let&rsquo;s talk about your business.</h1>
          <p className="reveal">
            Share a few details and a consultant will get back to you within one business day
            with next steps.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section className="contact">
        <div className="wrapc" style={{ paddingTop: 96, paddingBottom: 128 }}>
          <div className="contact-grid">
            <div className="reveal">
              <h2 className="h-sec">Tell us what you are setting up.</h2>
              <p className="lead">
                Share a few details and a consultant will get back to you within one business day
                with next steps.
              </p>
              <div className="contact-info">
                <div>
                  <span className="dot"></span>Office No: A1-3, inside Unique Business World, Metha
                  Plaza Building, Block A, Oud Metha, Dubai, UAE
                </div>
                <Link href="tel:+971543084251">
                  <span className="dot"></span>+971 54 308 4251
                </Link>
                <Link href="tel:+971509207769">
                  <span className="dot"></span>+971 50 920 7769
                </Link>
                <Link href="tel:+97142522092">
                  <span className="dot"></span>+971 4 252 2092 (Landline)
                </Link>
                <Link href="mailto:bizpointprime@gmail.com">
                  <span className="dot"></span>bizpointprime@gmail.com
                </Link>
              </div>
            </div>
            <div className="reveal">
              <form id="contact-form">
                <div className="frow">
                  <div className="field">
                    <label htmlFor="name">Full name</label>
                    <input id="name" name="name" type="text" required />
                  </div>
                  <div className="field">
                    <label htmlFor="email">Email address</label>
                    <input id="email" name="email" type="email" required />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="service">What do you need help with</label>
                  <input id="service" name="service" type="text" />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Mainland setup, contract translation, PRO services..."
                  ></textarea>
                </div>
                <p
                  className="form-error"
                  role="alert"
                  style={{ color: "#c0392b", fontSize: "13.5px", margin: 0, minHeight: 18 }}
                ></p>
                <button type="submit" className="btn" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  <span>Book a Consultation</span>
                </button>
              </form>
            </div>
          </div>

          <div className="map-embed reveal">
            <iframe
              src="https://www.google.com/maps?q=Bizpoint+Prime+Translation+and+Business+Solutions,25.2310317,55.3131134&output=embed"
              title="Bizpoint Prime Business Solutions LLC location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
