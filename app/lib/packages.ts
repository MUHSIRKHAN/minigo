import { BUSINESS } from "./site";

// SAMPLE DATA — every package, price and departure date below is a placeholder.
// Edit this file to publish real tours: add/remove entries in PACKAGES and keep
// each `departures` list current. Past departures are hidden automatically.
// Prices are per person in rupees (BUSINESS.currency).

export type Region = "Southeast Asia" | "Central Asia" | "South Asia";

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

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fm=jpg&fit=crop&auto=format`;

export const PACKAGES: TourPackage[] = [
  {
    slug: "vietnam-hanoi-halong-hoi-an",
    title: "Vietnam: Hanoi, Ha Long & Hoi An",
    destination: "Vietnam",
    region: "Southeast Asia",
    tagline: "Limestone bays, lantern-lit towns and the best street food in Asia.",
    summary:
      "Nine nights from Hanoi's old quarter to an overnight cruise in Ha Long Bay, the lantern-lit streets of Hoi An and the buzz of Ho Chi Minh City, with local food experiences throughout.",
    image: img("1643029891412-92f9a81a8c16", 2000),
    nights: 9,
    groupSize: "Small group · max 12",
    style: "Culture & Cuisine",
    highlights: [
      "Overnight private-cabin cruise in Ha Long Bay",
      "Street-food walk and cooking class in Hanoi and Hoi An",
      "Lantern-making and a bicycle ride through rice paddies",
      "Cu Chi tunnels and Mekong Delta day trip",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Hanoi", body: "Arrive and settle into a boutique hotel in the Old Quarter. Guided walk through temples and Train Street, then an evening street-food tour." },
      { day: "Days 3–4", title: "Ha Long Bay", body: "Transfer to the coast and board your cruise. Kayak between limestone karsts, swim from the deck and watch the sunset over the bay." },
      { day: "Days 5–7", title: "Hoi An", body: "Fly to Da Nang and drive to Hoi An. Explore the lantern-lit old town, join a cooking class and cycle through the paddies." },
      { day: "Days 8–9", title: "Ho Chi Minh City & Mekong", body: "Fly south for the Cu Chi tunnels, the markets of District 1 and a boat trip through the Mekong Delta." },
      { day: "Day 10", title: "Departure", body: "Private transfer to the airport." },
    ],
    included: ["9 nights hotels, including one night on a cruise", "Daily breakfast and listed meals", "Domestic flights", "Private transfers and local guides", "Cooking class and Mekong boat trip"],
    notIncluded: ["International flights", "Travel insurance", "Other meals and drinks", "Vietnam e-visa fee", "Personal expenses and tips"],
    departures: [
      { date: "2026-11-21", price: 125000, seatsLeft: 7 },
      { date: "2027-01-16", price: 135000, seatsLeft: 3 },
      { date: "2027-02-13", price: 135000, seatsLeft: 10 },
      { date: "2027-03-13", price: 125000, seatsLeft: 12 },
    ],
  },
  {
    slug: "kazakhstan-almaty-charyn-kolsai",
    title: "Kazakhstan: Almaty, Charyn & Kolsai Lakes",
    destination: "Kazakhstan",
    region: "Central Asia",
    tagline: "Alpine lakes, red canyons and the space-age capital of the steppe.",
    summary:
      "Eight nights through Kazakhstan's mountain south and its futuristic capital: Almaty's markets, the Charyn Canyon, the turquoise Kolsai Lakes and Astana's skyline.",
    image: img("1530480667809-b655d4dc3aaa", 2000),
    nights: 8,
    groupSize: "Small group · max 12",
    style: "Adventure & Culture",
    highlights: [
      "Big Almaty Lake and the Tian Shan foothills",
      "Charyn Canyon, the Valley of Castles",
      "Overnight stay beside the Kolsai Lakes",
      "Astana's Bayterek Tower, Khan Shatyr and grand mosque",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Almaty", body: "Arrive in Kazakhstan's former capital. Green Bazaar, Panfilov Park and the cable car up Kok-Tobe, then Big Almaty Lake at sunset." },
      { day: "Day 3", title: "Charyn Canyon", body: "Drive east through the steppe to the Charyn Canyon and walk the Valley of Castles, with a picnic lunch by the river." },
      { day: "Days 4–5", title: "Kolsai Lakes", body: "Stay in a mountain lodge and hike between the three Kolsai Lakes through spruce forest. Optional horse riding." },
      { day: "Days 6–8", title: "Astana", body: "Fly north to the capital: Bayterek Tower, the Khan Shatyr and the Nur-Alem sphere, plus a free afternoon." },
      { day: "Day 9", title: "Departure", body: "Private transfer to the airport." },
    ],
    included: ["8 nights hotels and mountain lodge", "Daily breakfast and listed meals", "Domestic flight Almaty–Astana", "Private 4x4 transport and guide", "Entrance fees listed"],
    notIncluded: ["International flights", "Travel insurance", "Other meals and drinks", "Visa where required", "Personal expenses and tips"],
    departures: [
      { date: "2027-05-22", price: 139000, seatsLeft: 12 },
      { date: "2027-06-19", price: 149000, seatsLeft: 6 },
      { date: "2027-08-14", price: 149000, seatsLeft: 12 },
      { date: "2027-09-11", price: 139000, seatsLeft: 12 },
    ],
  },
  {
    slug: "tajikistan-pamir-highway",
    title: "Tajikistan: The Pamir Highway",
    destination: "Tajikistan",
    region: "Central Asia",
    tagline: "The roof of the world, and one of the great road journeys on earth.",
    summary:
      "Nine nights from Dushanbe over the Fann Mountains and along the Pamir Highway to the Wakhan Valley, with homestays, hot springs and some of Central Asia's wildest scenery.",
    image: img("1788072714390-505500746762", 2000),
    nights: 9,
    groupSize: "Small group · max 8",
    style: "Adventure & Overland",
    highlights: [
      "Iskanderkul and the turquoise lakes of the Fann Mountains",
      "The Pamir Highway by 4x4 with an expert driver-guide",
      "Wakhan Valley homestays and hot springs",
      "Views across the border to the Hindu Kush",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Dushanbe", body: "Arrive in Tajikistan's capital. Visit the national museum and bazaars, then prepare for the road with your guide." },
      { day: "Days 3–4", title: "Fann Mountains & Iskanderkul", body: "Drive into the mountains, with swimming and walking at Iskanderkul and a night in a lakeside guesthouse." },
      { day: "Days 5–8", title: "Pamir Highway", body: "Follow the legendary road east through Khorog and the Wakhan Valley. Homestays, hot springs at Garm Chashma and the Yamchun fortress." },
      { day: "Days 9–10", title: "Return to Dushanbe", body: "Fly or drive back to the capital for a farewell dinner and departure." },
    ],
    included: ["9 nights guesthouses, homestays and hotels", "Breakfast and dinner on the road", "Private 4x4 with driver-guide", "Pamir (GBAO) permits", "Entrance fees listed"],
    notIncluded: ["International flights", "Travel insurance", "Lunches and snacks", "Tajikistan e-visa fee", "Personal expenses and tips"],
    departures: [
      { date: "2027-06-26", price: 215000, seatsLeft: 8 },
      { date: "2027-07-17", price: 229000, seatsLeft: 4 },
      { date: "2027-08-07", price: 229000, seatsLeft: 8 },
      { date: "2027-09-04", price: 215000, seatsLeft: 8 },
    ],
  },
  {
    slug: "kashmir-srinagar-gulmarg-pahalgam",
    title: "Kashmir: Srinagar, Gulmarg & Pahalgam",
    destination: "Kashmir, India",
    region: "South Asia",
    tagline: "Houseboats on Dal Lake and meadows under snow-capped peaks.",
    summary:
      "Six nights in the Kashmir Valley: a houseboat on Dal Lake, a shikara ride at dawn, the Gulmarg gondola and the pine valleys of Pahalgam, with Mughal gardens and Kashmiri hospitality.",
    image: img("1595815771614-ade9d652a65d", 2000),
    nights: 6,
    groupSize: "Small group · max 14",
    style: "Scenic & Leisure",
    highlights: [
      "Two nights aboard a traditional Dal Lake houseboat",
      "Dawn shikara ride through the floating vegetable market",
      "Gulmarg gondola up to the Himalayan viewpoint",
      "Mughal gardens and a Kashmiri wazwan feast",
    ],
    itinerary: [
      { day: "Days 1–2", title: "Srinagar & Dal Lake", body: "Arrive and settle aboard your houseboat. A dawn shikara ride, the Mughal gardens of Shalimar and Nishat and a Kashmiri dinner on board." },
      { day: "Days 3–4", title: "Gulmarg", body: "Drive to the meadow of flowers. Ride the gondola up the Apharwat range with panoramic Himalayan views, or walk the meadows and forests." },
      { day: "Days 5–6", title: "Pahalgam", body: "Continue to the Lidder Valley for riverside walks, pony rides to Baisaran and a traditional wazwan feast." },
      { day: "Day 7", title: "Departure", body: "Return to Srinagar for your onward flight." },
    ],
    included: ["6 nights hotels and houseboat", "Daily breakfast and dinner", "Private vehicle with driver", "Shikara ride and gondola ticket", "Local guide"],
    notIncluded: ["Flights to and from Srinagar", "Travel insurance", "Lunches and snacks", "Pony rides and optional activities", "Personal expenses and tips"],
    departures: [
      { date: "2026-11-07", price: 58000, seatsLeft: 9 },
      { date: "2027-04-10", price: 64000, seatsLeft: 5 },
      { date: "2027-05-15", price: 64000, seatsLeft: 14 },
      { date: "2027-06-12", price: 64000, seatsLeft: 14 },
    ],
  },
  {
    slug: "lakshadweep-agatti-bangaram-thinnakara",
    title: "Lakshadweep: Agatti, Bangaram & Thinnakara",
    destination: "Lakshadweep",
    region: "South Asia",
    tagline: "Glass-clear lagoons, coral reefs and white sandbars a short flight from Kochi.",
    summary:
      "Five nights across three coral islands: a lagoon-side stay in Agatti, snorkelling and kayaking in Bangaram's turquoise lagoon, and a beach tent night on Thinnakara, with entry permits and island transfers arranged for you.",
    image: img("1572025310208-2fd6b91764c1", 2000),
    nights: 5,
    groupSize: "Small group · max 10",
    style: "Island & Lagoon",
    highlights: [
      "Snorkelling over coral gardens in Bangaram's lagoon",
      "Glass-bottom boat ride and kayaking on clear turquoise water",
      "Barefoot walk on a white sandbar at low tide",
      "Beach tent stay under the stars on Thinnakara",
    ],
    itinerary: [
      { day: "Day 1", title: "Kochi to Agatti", body: "Morning flight from Kochi over the atolls. Settle into your lagoon-side stay and take a slow evening walk along the beach." },
      { day: "Days 2–3", title: "Bangaram", body: "Boat across to Bangaram. Snorkel the coral lagoon, ride a glass-bottom boat, kayak to the sandbar and watch the sunset from the shore." },
      { day: "Days 4–5", title: "Thinnakara", body: "Hop to neighbouring Thinnakara for a beach tent stay, quiet swims, sunrise on the sand and optional scuba diving with a certified centre." },
      { day: "Day 6", title: "Departure", body: "Boat back to Agatti and the flight home to Kochi." },
    ],
    included: ["5 nights island stays, including a beach tent", "All meals on the islands", "Return flights Kochi–Agatti", "Lakshadweep entry permit arranged", "Boat transfers, snorkelling gear and glass-bottom boat ride"],
    notIncluded: ["Travel to and from Kochi", "Travel insurance", "Scuba diving and other paid water sports", "Personal expenses and tips"],
    departures: [
      { date: "2026-11-28", price: 62000, seatsLeft: 5 },
      { date: "2026-12-26", price: 72000, seatsLeft: 2 },
      { date: "2027-01-23", price: 62000, seatsLeft: 8 },
      { date: "2027-02-20", price: 58000, seatsLeft: 10 },
      { date: "2027-03-20", price: 58000, seatsLeft: 10 },
    ],
  },
];

export const REGIONS: Region[] = ["Southeast Asia", "Central Asia", "South Asia"];

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
  return new Intl.NumberFormat("en-IN", {
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
