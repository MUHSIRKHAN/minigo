// Every page, the header/footer, WhatsApp button and structured data read from here.
// TODO: replace the placeholder domain below (and add the Instagram URL) once they exist.
// The site only asks search engines to index it once a real domain is configured
// (NEXT_PUBLIC_SITE_URL). Until then — a client demo on a *.vercel.app link — it
// stays out of search results.
export const IS_LIVE = Boolean(process.env.NEXT_PUBLIC_SITE_URL);

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://minigoholidays.com").replace(/\/$/, "");

const streetAddress = "Door No. 2120, 1st Floor, Tower 2, Hilite Business Park";
const addressLocality = "Kozhikode";
const addressRegion = "Kerala";
const postalCode = "673014";
const addressCountry = "India";

export const BUSINESS = {
  name: "Minigo Holidays",
  shortName: "Minigo Holidays",
  tagline: "Go anywhere, stay prepared.",
  description:
    "Minigo Holidays designs premium small-group and private tours to Vietnam, Kazakhstan, Tajikistan, Kashmir and Thailand — handpicked stays, expert local guides and fixed departure dates you can book today.",
  streetAddress,
  addressLocality,
  addressRegion,
  postalCode,
  addressCountry,
  // One-line form used in the footer, contact details and legal pages.
  address: `${streetAddress}, ${addressLocality} ${postalCode}, ${addressRegion}, ${addressCountry}`,
  // Display forms and dial forms are kept separate: `tel:` and wa.me need digits only.
  telephone: "+91 88911 55157",
  telephoneHref: "+918891155157",
  whatsappNumber: "918891155157",
  email: "minigoholidays@gmail.com",
  // Leave empty to hide the Instagram icon in the footer.
  instagramUrl: "",
  // ISO 4217 code used to format every package price.
  currency: "INR",
  logo: "/assets/minigo-logo.png",
  // Share-card image must be a raster file on an absolute URL for most crawlers.
  ogImage:
    "https://images.unsplash.com/photo-1643029891412-92f9a81a8c16?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format",
  keywords: [
    "tour packages from Kerala",
    "Kozhikode travel agency",
    "Vietnam tour package",
    "Kazakhstan tour package",
    "Tajikistan tour package",
    "Kashmir tour package",
    "Thailand tour package",
    "small group tours",
    "premium holidays India",
  ],
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = `Hi ${BUSINESS.name}, I'd like to know more about your tour packages.`;
