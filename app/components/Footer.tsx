import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrapc foot-top">
        <div className="foot-brand">
          <Image
            className="logo"
            src="/assets/logo-footer.png"
            alt="Bizpoint Prime Business Solutions LLC"
            width={1193}
            height={759}
          />
          <p>
            Prime. Made. Easy. — a trusted business solutions and corporate services provider in
            the UAE, supporting individuals, entrepreneurs, and companies under one roof.
          </p>
          <div className="foot-social">
            <Link
              href="https://www.instagram.com/bizpointprime.ae/"
              target="_blank"
              rel="noopener"
              aria-label="Bizpoint Prime on Instagram"
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
              <Link href="/about">About Us</Link>
              <Link href="/services">Services</Link>
              <Link href="/blogs">Blogs</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/contact-us">Contact Us</Link>
            </nav>
          </div>
          <div className="foot-col foot-col-services">
            <p className="foot-h">Our Services</p>
            <nav className="foot-nav foot-nav-cols">
              <Link href="/business-setup-dubai">Business Setup</Link>
              <Link href="/legal-translation-dubai">Legal Translation</Link>
              <Link href="/notary-services">Notary Services</Link>
              <Link href="/vat-registration">VAT Registration</Link>
              <Link href="/family-visa-services">Family Visa Services</Link>
              <Link href="/document-attestation">Attestation Services</Link>
              <Link href="/pro-services-dubai">PRO Services</Link>
              <Link href="/golden-visa-services">Golden Visa Services</Link>
              <Link href="/typing-services">Typing Services</Link>
              <Link href="/branding-marketing">Branding &amp; Marketing</Link>
            </nav>
          </div>
          <div className="foot-col">
            <p className="foot-h">Contact Us</p>
            <div className="foot-contact">
              <div>
                <span className="dot"></span>Office No: A1-3, inside Unique Business World, Metha
                Plaza Building, Block A, Oud Metha, Dubai, UAE
              </div>
              <Link href="tel:+971543084251">+971 54 308 4251</Link>
              <Link href="tel:+971509207769">+971 50 920 7769</Link>
              <Link href="tel:+97142522092">+971 4 252 2092 (Landline)</Link>
              <Link href="mailto:bizpointprime@gmail.com">bizpointprime@gmail.com</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="foot-bot">
        <div className="wrapc in">
          <span>
            © <span id="year">{year}</span> Bizpoint Prime Business Solutions LLC. All rights
            reserved.
          </span>
          <span>
            <Link href="/privacy-policy">Privacy Policy</Link> ·{" "}
            <Link href="/terms-of-service">Terms of Service</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
