import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import SiteAnimations from "./components/SiteAnimations";
import WhatsAppButton from "./components/WhatsAppButton";
import GoogleTagManager from "./components/GoogleTagManager";
import GoogleTagManagerNoscript from "./components/GoogleTagManagerNoscript";
import { BUSINESS, IS_LIVE, SITE_URL } from "./lib/site";

// One clean geometric sans for headings and text, close to the brand's poster lettering.
const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const DEFAULT_TITLE =
  "Minigo Holidays | Kashmir, Lakshadweep, Vietnam & Kazakhstan Tour Packages from Kerala";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#496a5d",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: DEFAULT_TITLE,
  description: BUSINESS.description,
  applicationName: BUSINESS.name,
  keywords: [...BUSINESS.keywords],
  category: "travel",
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  formatDetection: { telephone: false, email: false, address: false },
  robots: IS_LIVE
    ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } }
    : { index: false, follow: false },
  icons: {
    icon: "/assets/favicon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: BUSINESS.shortName,
    title: DEFAULT_TITLE,
    description: BUSINESS.description,
    images: [{ url: BUSINESS.ogImage, width: 1200, height: 630, alt: BUSINESS.shortName }],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: BUSINESS.description,
    images: [BUSINESS.ogImage],
  },
};

const sameAs = [BUSINESS.instagramUrl].filter(Boolean);

// One structured-data graph for the whole site: the business, and the website itself.
const siteSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": `${SITE_URL}/#business`,
      name: BUSINESS.name,
      alternateName: BUSINESS.shortName,
      url: SITE_URL,
      logo: `${SITE_URL}${BUSINESS.logo}`,
      image: BUSINESS.ogImage,
      description: BUSINESS.description,
      slogan: BUSINESS.tagline,
      telephone: BUSINESS.telephone,
      email: BUSINESS.email,
      currenciesAccepted: BUSINESS.currency,
      address: {
        "@type": "PostalAddress",
        streetAddress: BUSINESS.streetAddress,
        addressLocality: BUSINESS.addressLocality,
        addressRegion: BUSINESS.addressRegion,
        postalCode: BUSINESS.postalCode,
        addressCountry: "IN",
      },
      areaServed: { "@type": "Country", name: "India" },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: BUSINESS.telephoneHref,
          email: BUSINESS.email,
          areaServed: "IN",
          availableLanguage: ["English", "Malayalam", "Hindi"],
        },
      ],
      ...(sameAs.length ? { sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: BUSINESS.name,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={outfit.variable}
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteSchema) }}
        />
        <GoogleTagManager />
        {children}
        <WhatsAppButton />
        <SiteAnimations />
      </body>
    </html>
  );
}
