export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://bizpointprime.ae").replace(/\/$/, "");

export const BUSINESS = {
  name: "Minigo Holidays",
  shortName: "Minigo Holidays",
  description:
    "Minigo Holidays is a trusted business solutions and corporate services provider in the UAE — business setup, legal translation, government services, notary, visas, VAT registration, attestation, PRO services, and branding. Prime. Made. Easy.",
  streetAddress: "Office No: A1-3, inside Unique Business World, Metha Plaza Building, Block A, Oud Metha",
  addressLocality: "Dubai",
  addressCountry: "AE",
  telephone: "+971543084251",
  email: "bizpointprime@gmail.com",
  ogImage: "/assets/logo-nav.png",
} as const;
