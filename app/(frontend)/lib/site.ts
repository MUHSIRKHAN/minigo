// Every page, the header/footer, WhatsApp button and structured data read from here.
// TODO: add the Instagram URL once it exists.
// Search engines are asked to index the site only when the real domain is configured
// (NEXT_PUBLIC_SITE_URL) AND indexing is switched on (ALLOW_INDEXING=true) — kept off
// until the sample reviews and moments are replaced with real ones.
export const IS_LIVE = Boolean(process.env.NEXT_PUBLIC_SITE_URL) && process.env.ALLOW_INDEXING === "true";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://minigoholidays.com").replace(/\/$/, "");

const streetAddress = "Door No. 2120, 1st Floor, Tower 2, Hilite Business Park";
const addressLocality = "Kozhikode";
const addressRegion = "Kerala";
const postalCode = "673014";
const addressCountry = "India";

export const BUSINESS = {
  name: "Minigo Holidays",
  shortName: "Minigo Holidays",
  tagline: "Go Anywhere, Stay Prepared.",
  // The line printed under the logo, spelled exactly as in the logo artwork.
  logoTagline: "Go Anywhere, Stay Prepared",
  description:
    "Minigo Holidays plans group tours and private trips from Kerala to Kashmir, Lakshadweep, Goa, the Golden Triangle, Hyderabad, Vietnam and Kazakhstan, with clear prices and a team that looks after you from enquiry to return.",
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
    "Kashmir tour package",
    "Kashmir group tour from Kerala",
    "Lakshadweep tour package",
    "Goa tour package",
    "Golden Triangle tour package",
    "Delhi Agra tour package",
    "Hyderabad Ramoji Film City tour",
    "college tour package",
    "Vietnam tour package",
    "Kazakhstan tour package",
    "small group tours",
    "premium holidays India",
  ],
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = `Hi ${BUSINESS.name}, I'd like to know more about your tour packages.`;
