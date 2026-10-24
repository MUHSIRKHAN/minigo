// TODO: replace the placeholder domain and contact details below with Minigo Holidays' real ones.
// Every page, the header/footer, WhatsApp button and structured data read from here.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://minigoholidays.com").replace(/\/$/, "");

export const BUSINESS = {
  name: "Minigo Holidays",
  shortName: "Minigo Holidays",
  tagline: "Premium journeys across Asia.",
  description:
    "Minigo Holidays designs premium small-group and private tours to Vietnam, Kazakhstan, Tajikistan, Kashmir and Thailand — handpicked stays, expert local guides and fixed departure dates you can book today.",
  streetAddress: "Your office address, street and area",
  addressLocality: "City",
  addressCountry: "Country",
  // Display forms and dial forms are kept separate: `tel:` and wa.me need digits only.
  telephone: "+00 000 000 0000",
  telephoneHref: "+000000000000",
  whatsappNumber: "000000000000",
  email: "hello@minigoholidays.com",
  instagramUrl: "https://www.instagram.com/minigoholidays/",
  // ISO 4217 code used to format every package price.
  currency: "INR",
  logo: "/assets/minigo-logo.svg",
  // Share-card image must be a raster file on an absolute URL for most crawlers.
  ogImage:
    "https://images.unsplash.com/photo-1643029891412-92f9a81a8c16?w=1200&h=630&q=80&fm=jpg&fit=crop&auto=format",
} as const;

export function whatsappLink(message: string): string {
  return `https://wa.me/${BUSINESS.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = `Hi ${BUSINESS.name}, I'd like to know more about your tour packages.`;
