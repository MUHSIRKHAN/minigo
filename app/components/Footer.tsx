import Image from "next/image";
import Link from "next/link";
import { PACKAGES } from "../lib/packages";
import { BUSINESS } from "../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrapc foot-top">
        <div className="foot-brand">
          <Image className="logo" src={BUSINESS.logo} alt={BUSINESS.name} width={640} height={170} />
          <p>
            Premium small-group and private tours to Vietnam, Kazakhstan, Tajikistan, Kashmir and
            Thailand, with fixed departure dates and expert local guides.
          </p>
          <div className="foot-social">
            <Link
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noopener"
              aria-label={`${BUSINESS.name} on Instagram`}
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
              </svg>
            </Link>
          </div>
        </div>

        <div className="foot-links">
          <div className="foot-col foot-col-quick">
            <p className="foot-h">Quick Links</p>
            <nav className="foot-nav">
              <Link href="/">Home</Link>
              <Link href="/packages">Tour Packages</Link>
              <Link href="/about">About Us</Link>
              <Link href="/blogs">Travel Journal</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact-us">Contact Us</Link>
            </nav>
          </div>
          <div className="foot-col foot-col-services">
            <p className="foot-h">Popular Tours</p>
            <nav className="foot-nav foot-nav-cols">
              {PACKAGES.map((pkg) => (
                <Link key={pkg.slug} href={`/packages/${pkg.slug}`}>
                  {pkg.title}
                </Link>
              ))}
            </nav>
          </div>
          <div className="foot-col">
            <p className="foot-h">Contact Us</p>
            <div className="foot-contact">
              <div>
                <span className="dot"></span>
                {BUSINESS.streetAddress}, {BUSINESS.addressLocality}, {BUSINESS.addressCountry}
              </div>
              <Link href={`tel:${BUSINESS.telephoneHref}`}>{BUSINESS.telephone}</Link>
              <Link href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="foot-bot">
        <div className="wrapc in">
          <span>
            © <span id="year">{year}</span> {BUSINESS.name}. All rights reserved.
          </span>
          <span>
            <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
            <Link href="/terms-of-service">Terms &amp; Booking Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
