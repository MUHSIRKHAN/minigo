import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SiteAnimations from "./components/SiteAnimations";
import WhatsAppButton from "./components/WhatsAppButton";
import GoogleTagManager from "./components/GoogleTagManager";
import GoogleTagManagerNoscript from "./components/GoogleTagManagerNoscript";
import { BUSINESS, SITE_URL } from "./lib/site";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const DEFAULT_TITLE =
  "Bizpoint Prime Business Solutions LLC | Business Setup & Corporate Services in the UAE";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: BUSINESS.description,
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: BUSINESS.shortName,
    title: DEFAULT_TITLE,
    description: BUSINESS.description,
    images: [{ url: BUSINESS.ogImage, width: 1193, height: 650, alt: BUSINESS.shortName }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: BUSINESS.description,
    images: [BUSINESS.ogImage],
  },
  verification: {
    google: "uzTWB57L-_rrjbcWuHdQZERvIVckxf_LOxoOOCDfVC0",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: BUSINESS.name,
  alternateName: BUSINESS.shortName,
  url: SITE_URL,
  logo: `${SITE_URL}${BUSINESS.ogImage}`,
  image: `${SITE_URL}${BUSINESS.ogImage}`,
  telephone: BUSINESS.telephone,
  email: BUSINESS.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: BUSINESS.streetAddress,
    addressLocality: BUSINESS.addressLocality,
    addressCountry: BUSINESS.addressCountry,
  },
  description: BUSINESS.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        {/* Marks JS as confirmed running, before the body below is parsed or
            painted, so globals.css can pre-hide scroll-reveal content (hero
            copy, .reveal, .faq-item) without a no-JS visitor ever losing it —
            see the `html.js` rules in globals.css.
            Deliberately a raw inline <script>, NOT next/script: a
            `beforeInteractive` Script only emits a `__next_s` queue push whose
            code runs once the framework bundle loads — long after first paint,
            which defeats the entire purpose. A plain inline script executes
            synchronously during HTML parsing, before anything below it
            paints. */}
        <script
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <GoogleTagManagerNoscript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <GoogleTagManager />
        {children}
        <WhatsAppButton />
        <SiteAnimations />
      </body>
    </html>
  );
}
