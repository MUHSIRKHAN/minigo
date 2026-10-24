import { BUSINESS } from "./site";

// SAMPLE DATA — every package, price and departure date below is a placeholder.
// Edit this file to publish real tours: add/remove entries in PACKAGES and keep
// each `departures` list current. Past departures are hidden automatically.

export type Region = "Asia" | "Europe" | "Middle East" | "Islands";

export type Departure = {
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** Per-person price for this departure, in BUSINESS.currency */
  price: number;
  seatsLeft: number;
};

export type TourPackage = {
  slug: string;
  title: string;
  destination: string;
  region: Region;
  tagline: string;
  summary: string;
  image: string;
  nights: number;
  groupSize: string;
  style: string;
  highlights: string[];
  itinerary: { day: string; title: string; body: string }[];
  included: string[];
  notIncluded: string[];
  departures: Departure[];
};

const img = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fm=jpg&fit=crop&auto=format`;

export const PACKAGES: TourPackage[] = [
  {
    slug: "maldives-overwater-retreat",
    title: "Maldives Overwater Retreat",
    destination: "Maldives",
    region: "Islands",
    tagline: "Five nights over turquoise water, nothing on the schedule but the sunset.",
    summary:
      "A slow, barefoot escape to a private-island resort: overwater villa, daily breakfast and dinner, a sunset dolphin cruise and a sandbank picnic.",
    image: img("1514282401047-d79a71a590e8"),
    nights: 5,
    groupSize: "Couples & private parties",
    style: "Beach & Relaxation",
    highlights: [
      "Overwater villa with private deck and lagoon access",
      "Sunset dolphin cruise and sandbank picnic",
      "House-reef snorkelling with a marine guide",
      "Seaplane transfers included",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive in Malé, seaplane to the resort", body: "Met at the airport and taken by scenic seaplane to your island. Welcome drink, villa check-in and a sunset dinner on the beach." },
      { day: "Days 2–3", title: "Reef, lagoon and spa", body: "Guided house-reef snorkelling in the morning; afternoons are yours — spa, paddleboards or simply the deck. Day 3 ends with the dolphin cruise at golden hour." },
      { day: "Day 4", title: "Sandbank picnic", body: "A private boat takes you to an uninhabited sandbank for a chef-prepared picnic, followed by an optional sunset fishing trip." },
      { day: "Day 5", title: "Free day", body: "Use your day as you like — optional diving, a couples' massage or a candle-lit dinner over the water." },
      { day: "Day 6", title: "Departure", body: "Late checkout where available, seaplane back to Malé and onward flight." },
    ],
    included: ["5 nights overwater villa", "Daily breakfast and dinner", "Return seaplane transfers", "Dolphin cruise and sandbank picnic", "Airport meet & assist"],
    notIncluded: ["International flights", "Travel insurance", "Lunches and alcoholic drinks", "Personal expenses and tips"],
    departures: [
      { date: "2026-12-04", price: 3290, seatsLeft: 6 },
      { date: "2027-01-15", price: 3590, seatsLeft: 3 },
      { date: "2027-02-12", price: 3490, seatsLeft: 8 },
      { date: "2027-03-19", price: 3390, seatsLeft: 10 },
    ],
  },
  {
    slug: "bali-ubud-uluwatu",
    title: "Bali: Ubud & Uluwatu",
    destination: "Bali, Indonesia",
    region: "Asia",
    tagline: "Rice terraces, temple ceremonies and cliff-top sunsets.",
    summary:
      "Seven nights split between Ubud's jungle villas and Uluwatu's clifftop coast, with private guides, a cooking class and a sunrise volcano trek.",
    image: img("1537996194471-e657df975ab4"),
    nights: 7,
    groupSize: "Small group · max 12",
    style: "Culture & Wellness",
    highlights: [
      "Private pool villa in Ubud and a clifftop suite in Uluwatu",
      "Sunrise trek at Mount Batur with breakfast at the crater",
      "Balinese cooking class and local market visit",
      "Kecak fire dance at Uluwatu Temple",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive in Bali, transfer to Ubud", body: "Private transfer to your jungle villa and an evening welcome dinner with your guide." },
      { day: "Days 2–4", title: "Ubud: temples, terraces and kitchens", body: "Tegallalang rice terraces, Tirta Empul water temple, the Monkey Forest and a hands-on cooking class. Day 4 starts before dawn with the Batur sunrise trek." },
      { day: "Day 5", title: "Journey south to Uluwatu", body: "Scenic drive with a stop at a coffee plantation, then check in to your cliff-edge suite." },
      { day: "Days 6–7", title: "Coast and culture", body: "Hidden beaches, a sunset cruise and the Kecak fire dance at Uluwatu Temple. Leave time for the beach club of your choice." },
      { day: "Day 8", title: "Departure", body: "Private airport transfer and farewell." },
    ],
    included: ["7 nights handpicked villas", "Daily breakfast", "Private transfers and local guide", "Mount Batur trek and cooking class", "Entrance fees listed in the itinerary"],
    notIncluded: ["International flights", "Travel insurance", "Most lunches and dinners", "Visa on arrival fee"],
    departures: [
      { date: "2026-11-20", price: 2190, seatsLeft: 4 },
      { date: "2027-01-08", price: 2290, seatsLeft: 9 },
      { date: "2027-02-26", price: 2290, seatsLeft: 12 },
      { date: "2027-04-09", price: 2390, seatsLeft: 12 },
    ],
  },
  {
    slug: "swiss-alps-rail-journey",
    title: "Swiss Alps Rail Journey",
    destination: "Switzerland",
    region: "Europe",
    tagline: "Panoramic trains, lakeside towns and the Matterhorn at your window.",
    summary:
      "Eight nights on Switzerland's most scenic rail lines: Lucerne, Interlaken, Zermatt and Lake Geneva, with first-class rail passes and mountain excursions.",
    image: img("1527668752968-14dc70a27c95"),
    nights: 8,
    groupSize: "Small group · max 14",
    style: "Scenic & Sightseeing",
    highlights: [
      "First-class Swiss Travel Pass across the whole itinerary",
      "Glacier Express panoramic seats",
      "Jungfraujoch, the Top of Europe",
      "Gornergrat railway with Matterhorn views",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive in Zurich, rail to Lucerne", body: "Check in on the lakefront and join an evening stroll across the Chapel Bridge." },
      { day: "Days 2–3", title: "Lucerne and Mount Pilatus", body: "Lake cruise and the cogwheel train up Mount Pilatus, with time for the old town." },
      { day: "Days 4–5", title: "Interlaken and Jungfraujoch", body: "Rail up to the Top of Europe, then free time for Lauterbrunnen's waterfalls." },
      { day: "Days 6–7", title: "Glacier Express to Zermatt", body: "Panoramic rail to Zermatt and the Gornergrat railway for Matterhorn views." },
      { day: "Days 8–9", title: "Lake Geneva and departure", body: "Vineyard terraces of Lavaux, Château de Chillon and onward flight from Geneva." },
    ],
    included: ["8 nights in 4-star hotels", "Daily breakfast", "First-class Swiss Travel Pass", "Mountain excursions listed", "Tour manager throughout"],
    notIncluded: ["International flights", "Travel insurance", "Lunches and dinners", "Optional activities"],
    departures: [
      { date: "2027-02-06", price: 4190, seatsLeft: 10 },
      { date: "2027-05-22", price: 4690, seatsLeft: 7 },
      { date: "2027-06-19", price: 4890, seatsLeft: 14 },
      { date: "2027-09-04", price: 4790, seatsLeft: 14 },
    ],
  },
  {
    slug: "greece-athens-santorini",
    title: "Greece: Athens & Santorini",
    destination: "Greece",
    region: "Europe",
    tagline: "Ancient wonders and whitewashed cliffs above the Aegean.",
    summary:
      "Seven nights pairing Athens' history with Santorini's caldera sunsets, plus a private catamaran day and a wine tasting among the island's volcanic vineyards.",
    image: img("1570077188670-e3a8d69ac5ff"),
    nights: 7,
    groupSize: "Small group · max 12",
    style: "History & Island",
    highlights: [
      "Guided Acropolis and Parthenon visit",
      "Caldera-view suite in Oia",
      "Catamaran cruise with lunch on board",
      "Wine tasting in volcanic vineyards",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive in Athens", body: "Check in near the Plaka and join a welcome meze dinner." },
      { day: "Days 2–3", title: "Athens", body: "A private guide leads you through the Acropolis and ancient agora; afternoon at leisure." },
      { day: "Day 4", title: "Fly to Santorini", body: "Transfer to your caldera-view suite in Oia and watch your first sunset." },
      { day: "Days 5–7", title: "Santorini", body: "Catamaran cruise to the hot springs and Red Beach, a vineyard tasting and a free day for the island's villages." },
      { day: "Day 8", title: "Departure", body: "Transfer to the airport and onward flight." },
    ],
    included: ["7 nights hotels and suites", "Daily breakfast", "Domestic flight Athens–Santorini", "Catamaran day with lunch", "Guided Acropolis visit"],
    notIncluded: ["International flights", "Travel insurance", "Most lunches and dinners", "City tax at hotels"],
    departures: [
      { date: "2027-04-17", price: 3190, seatsLeft: 12 },
      { date: "2027-05-29", price: 3490, seatsLeft: 5 },
      { date: "2027-09-11", price: 3590, seatsLeft: 12 },
    ],
  },
  {
    slug: "japan-kyoto-tokyo-blossom",
    title: "Japan: Kyoto & Tokyo in Blossom",
    destination: "Japan",
    region: "Asia",
    tagline: "Cherry-blossom season across temples, gardens and neon.",
    summary:
      "Ten nights from Tokyo to Kyoto timed for the cherry blossom, with a ryokan stay, a tea ceremony and a bullet-train ride between the two capitals.",
    image: img("1493976040374-85c8e12f0c0e"),
    nights: 10,
    groupSize: "Small group · max 10",
    style: "Culture & Seasonal",
    highlights: [
      "Timed for peak cherry-blossom season",
      "Night in a traditional ryokan with kaiseki dinner",
      "Private tea ceremony in Kyoto",
      "Bullet-train ride and Fushimi Inari at dawn",
    ],
    itinerary: [
      { day: "Days 1–4", title: "Tokyo", body: "Shibuya, Asakusa and Meiji Shrine, a sushi masterclass and a day trip to Kamakura." },
      { day: "Day 5", title: "Bullet train to Kyoto", body: "Ride the Shinkansen and check in near Gion." },
      { day: "Days 6–9", title: "Kyoto and Nara", body: "Fushimi Inari at dawn, Arashiyama bamboo grove, a private tea ceremony and Nara's deer park." },
      { day: "Day 10", title: "Ryokan night", body: "Stay in a traditional ryokan with an onsen and a multi-course kaiseki dinner." },
      { day: "Day 11", title: "Departure", body: "Transfer to Osaka Kansai airport." },
    ],
    included: ["10 nights hotels and ryokan", "Daily breakfast", "Shinkansen tickets", "Tea ceremony and sushi masterclass", "English-speaking guide"],
    notIncluded: ["International flights", "Travel insurance", "Most lunches and dinners", "Local transport passes in free time"],
    departures: [
      { date: "2027-03-26", price: 5290, seatsLeft: 6 },
      { date: "2027-04-02", price: 5390, seatsLeft: 2 },
      { date: "2027-11-05", price: 5190, seatsLeft: 10 },
    ],
  },
  {
    slug: "dubai-abu-dhabi-desert-luxe",
    title: "Dubai & Abu Dhabi Desert Luxe",
    destination: "United Arab Emirates",
    region: "Middle East",
    tagline: "Skyline suites, a private dune dinner and the grand mosque at golden hour.",
    summary:
      "Four nights of city and desert in style: a Burj-view suite, private dune dinner under the stars, and a guided day in Abu Dhabi.",
    image: img("1512453979798-5ea266f8880c"),
    nights: 4,
    groupSize: "Couples, families & private parties",
    style: "City & Desert",
    highlights: [
      "Burj Khalifa-view suite in Downtown Dubai",
      "Private dune dinner with live entertainment",
      "Guided Sheikh Zayed Grand Mosque and Louvre Abu Dhabi day",
      "Dhow cruise on Dubai Creek",
    ],
    itinerary: [
      { day: "Day 1", title: "Arrive in Dubai", body: "Chauffeured transfer and check-in; evening dhow cruise." },
      { day: "Day 2", title: "Old and new Dubai", body: "Creek, souks and Gold Market in the morning; Burj Khalifa observation deck at sunset." },
      { day: "Day 3", title: "Desert experience", body: "Dune drive and falconry display, followed by a private dinner under the stars." },
      { day: "Day 4", title: "Abu Dhabi", body: "Private guide for the Grand Mosque and Louvre Abu Dhabi, returning to Dubai for the evening." },
      { day: "Day 5", title: "Departure", body: "Private transfer to the airport." },
    ],
    included: ["4 nights 5-star hotel", "Daily breakfast", "Private chauffeur and guide", "Dhow cruise and desert dinner", "Entrance fees listed"],
    notIncluded: ["International flights", "Travel insurance", "Lunches and other dinners", "Visa where required"],
    departures: [
      { date: "2026-11-27", price: 1790, seatsLeft: 8 },
      { date: "2026-12-18", price: 2090, seatsLeft: 3 },
      { date: "2027-01-22", price: 1890, seatsLeft: 12 },
      { date: "2027-02-19", price: 1890, seatsLeft: 12 },
    ],
  },
];

export const REGIONS: Region[] = ["Asia", "Europe", "Middle East", "Islands"];

export function getPackage(slug: string): TourPackage | undefined {
  return PACKAGES.find((p) => p.slug === slug);
}

/** Departures that have not happened yet, soonest first. Computed at request time. */
export function upcomingDepartures(pkg: TourPackage, now = new Date()): Departure[] {
  const today = now.toISOString().slice(0, 10);
  return pkg.departures
    .filter((d) => d.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function startingPrice(pkg: TourPackage, now = new Date()): number | null {
  const deps = upcomingDepartures(pkg, now);
  if (deps.length === 0) return null;
  return Math.min(...deps.map((d) => d.price));
}

export function nextDeparture(pkg: TourPackage, now = new Date()): Departure | null {
  return upcomingDepartures(pkg, now)[0] ?? null;
}

export function departureStatus(d: Departure): { label: string; tone: "open" | "few" | "full" } {
  if (d.seatsLeft <= 0) return { label: "Sold out", tone: "full" };
  if (d.seatsLeft <= 4) return { label: `Only ${d.seatsLeft} seats left`, tone: "few" };
  return { label: "Open", tone: "open" };
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: BUSINESS.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(iso: string): string {
  // Parse as UTC so the displayed day never shifts with the viewer's timezone.
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Every upcoming departure across all packages, soonest first. */
export function allUpcomingDepartures(now = new Date()) {
  return PACKAGES.flatMap((pkg) =>
    upcomingDepartures(pkg, now).map((departure) => ({ pkg, departure })),
  ).sort((a, b) => a.departure.date.localeCompare(b.departure.date));
}
