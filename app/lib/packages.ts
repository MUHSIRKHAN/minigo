import { BUSINESS } from "./site";

// Minigo's tours, prices and dates as supplied by the Minigo team.
// Keep each `departures` list current; past departures are hidden automatically.
// Prices are per person in rupees (BUSINESS.currency) unless a price option says otherwise.
// Leave a list empty when the details aren't confirmed yet: the tour page then
// shows a "contact us for details" note instead of guessing.

export type Region = "India" | "Southeast Asia" | "Central Asia";

export type Departure = {
  /** ISO date, YYYY-MM-DD */
  date: string;
  /** Seats still available; null when not published (visitors are asked to check availability) */
  seatsLeft: number | null;
  /** Bookings closed for this date */
  closed?: boolean;
};

export type PriceOption = {
  label: string;
  price: number;
  /** e.g. "per couple" or "per person · 4 sharing" */
  note: string;
};

/** Several itineraries priced side by side (for example 3-star and 4-star columns). */
export type PriceTable = {
  columns: string[];
  rows: { name: string; days: string; prices: number[] }[];
};

export type TourPackage = {
  slug: string;
  title: string;
  destination: string;
  region: Region;
  tagline: string;
  summary: string;
  image: string;
  /** null when the duration isn't fixed or confirmed; see `durationLabel` */
  nights: number | null;
  /** Shown instead of "N days" when `nights` is null, e.g. "4–7 days" */
  durationLabel?: string;
  /** e.g. "Min 6 people"; omitted when not confirmed */
  groupSize?: string;
  style: string;
  /** Lowest per-person price, shown as "From ₹…" */
  fromPrice: number;
  priceOptions?: PriceOption[];
  priceTable?: PriceTable;
  priceNote?: string;
  /** No fixed departures: the group picks its dates */
  datesOnRequest?: boolean;
  hotels?: string[];
  highlights: string[];
  itinerary: { day: string; title: string; body: string }[];
  included: string[];
  notIncluded: string[];
  notes?: string[];
  departures: Departure[];
};

const img = (id: string, w = 1600) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=80&fm=jpg&fit=crop&auto=format`;

export const PACKAGES: TourPackage[] = [
  {
    slug: "kazakhstan",
    title: "Kazakhstan: Mountains, Lakes & Steppe",
    destination: "Kazakhstan",
    region: "Central Asia",
    tagline: "Snow-capped Tian Shan peaks, turquoise alpine lakes and golden steppes.",
    summary:
      "From the snow-capped Tian Shan mountains and turquoise alpine lakes to golden steppes and nomadic traditions, Kazakhstan blends untouched nature, culture and warm hospitality. Accommodation, local transport, sightseeing and meals are included; flights are not.",
    image: img("1530480667809-b655d4dc3aaa", 2000),
    nights: null,
    style: "Group departures",
    fromPrice: 29999,
    highlights: [
      "Snow-capped Tian Shan mountains",
      "Turquoise alpine lakes",
      "Golden steppes",
      "Nomadic traditions and heritage",
    ],
    itinerary: [],
    included: ["Accommodation", "Local transportation", "Sightseeing", "Meals"],
    notIncluded: ["Airfare"],
    departures: [
      { date: "2026-12-21", seatsLeft: null },
      { date: "2027-02-12", seatsLeft: null },
    ],
  },
  {
    slug: "vietnam-private-trips",
    title: "Vietnam: Private Trips",
    destination: "Vietnam",
    region: "Southeast Asia",
    tagline: "Six private itineraries from Hanoi and Halong Bay to Da Nang and Ho Chi Minh City.",
    summary:
      "Choose from six private trips for 3–4 travellers: from four days in Hanoi with an overnight cruise in Halong Bay to a week from the north to the south. Prices are per person on twin sharing, with 3-star or 4-star hotels.",
    image: img("1643029891412-92f9a81a8c16", 2000),
    nights: null,
    durationLabel: "4–7 days",
    groupSize: "3–4 people",
    style: "Private trip",
    fromPrice: 26500,
    priceTable: {
      columns: ["3-star", "4-star"],
      rows: [
        { name: "Hanoi – Halong Bay (overnight cruise)", days: "4D / 3N", prices: [27500, 30500] },
        { name: "Hanoi – Halong Bay – Ninh Binh", days: "5D / 4N", prices: [35000, 39500] },
        { name: "Hanoi – Halong Bay – Da Nang", days: "6D / 5N", prices: [38000, 42000] },
        { name: "Hanoi – Halong Bay – Ho Chi Minh", days: "7D / 6N", prices: [47500, 55000] },
        { name: "Hanoi – Halong Bay – Da Nang – Ho Chi Minh", days: "7D / 6N", prices: [54500, 60500] },
        { name: "Ho Chi Minh (South Vietnam)", days: "4D / 3N", prices: [26500, 30500] },
      ],
    },
    priceNote: "Rates are per person, twin sharing (3–4 person group), for the private tour package.",
    highlights: [
      "Hanoi and an overnight cruise in Halong Bay",
      "Ninh Binh",
      "Da Nang",
      "Ho Chi Minh City and South Vietnam",
    ],
    itinerary: [],
    included: [],
    notIncluded: [
      "Flights (international and domestic)",
      "E-visa",
      "Tips",
      "Lunch and dinner, other than on the cruise",
    ],
    departures: [
      { date: "2026-11-25", seatsLeft: null },
      { date: "2026-12-24", seatsLeft: null },
      { date: "2027-01-14", seatsLeft: null },
    ],
  },
  {
    slug: "kashmir-srinagar-gulmarg-sonmarg-pahalgam",
    title: "Kashmir: Srinagar, Gulmarg, Sonmarg & Pahalgam",
    destination: "Kashmir",
    region: "India",
    tagline: "Snowy Gulmarg, Sonmarg's glacier, Pahalgam's valleys and a shikara on Dal Lake.",
    summary:
      "A five-day winter group tour from Srinagar to Srinagar, with all meals, a 4-star heated hotel, every day's sightseeing and a Malayali coordinator travelling with the group. Runs in November, December and January.",
    image: img("1595815771614-ade9d652a65d", 2000),
    nights: 4,
    groupSize: "Min 6 people",
    style: "Group tour",
    fromPrice: 18000,
    priceOptions: [
      { label: "Group tour", price: 18000, note: "per person · couple / double sharing" },
      { label: "Couple / honeymoon package", price: 44000, note: "per couple (2 people)" },
    ],
    highlights: [
      "Gondola cable car (Phase 1), Drung Waterfall and Strawberry Valley in Gulmarg",
      "Thajiwas Glacier, Zojila Pass and Zero Point from Sonmarg",
      "Apple Valley, ABC Valley and Baisaran Valley in Pahalgam",
      "Hazratbal, the Mughal Gardens, Shankaracharya Temple and a 1-hour shikara ride in Srinagar",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Srinagar",
        body: "Welcome at Srinagar airport or railway station. Visit the Mughal Gardens (Nishat Bagh, Shalimar Bagh and Chashme Shahi), then a 1-hour evening shikara ride on Dal Lake. Overnight in Srinagar.",
      },
      {
        day: "Day 2",
        title: "Pahalgam",
        body: "Drive past saffron fields and the Awantipora ruins to Pahalgam, along the Lidder River and pine forests. Apple Valley, ABC Valley (by union cab) and Baisaran Valley. Overnight in Srinagar.",
      },
      {
        day: "Day 3",
        title: "Gulmarg",
        body: "Snow points and meadow views, the Gondola cable car (Phase 1), Drung Waterfall, Strawberry Valley and the Gulmarg viewpoint. Snow rides, ATV and sledging are optional, at your own cost. Overnight in Srinagar.",
      },
      {
        day: "Day 4",
        title: "Sonmarg",
        body: "Drive along the Sindh River to Sonmarg's main valley, Thajiwas Glacier (pony optional), Zojila Pass and Zero Point. Overnight in Srinagar.",
      },
      {
        day: "Day 5",
        title: "Departure",
        body: "Remaining Srinagar sightseeing, including Hazratbal Mosque and Shankaracharya Temple, then transfer to the airport or railway station.",
      },
    ],
    included: [
      "4-star hotel with centralised heating",
      "Breakfast, lunch and dinner",
      "Malayali coordinator",
      "Sightseeing transport",
      "Airport / railway station pickup and drop",
      "Gondola cable car (Phase 1)",
      "Gulmarg and Pahalgam union cabs, including ABC Valley",
      "1-hour shikara ride",
      "All applicable entry tickets",
    ],
    notIncluded: [
      "Flights or train tickets to Srinagar",
      "Pony rides, ATV and snow activities",
      "Personal expenses",
      "Travel insurance",
      "Anything not listed as included",
    ],
    notes: [
      "The itinerary may change with the weather.",
      "The union taxi system is mandatory in some areas.",
    ],
    departures: [
      { date: "2026-11-24", seatsLeft: 0, closed: true },
      { date: "2026-12-23", seatsLeft: 8 },
      { date: "2027-01-16", seatsLeft: 18 },
    ],
  },
  {
    slug: "lakshadweep",
    title: "Lakshadweep: Island Escape",
    destination: "Lakshadweep",
    region: "India",
    tagline: "Coral lagoons, snorkelling and island food on India's coral islands.",
    summary:
      "Two nights on the islands with snorkelling, kayaking, a glass-bottom boat ride, sightseeing by bike or scooter and the local seafood Lakshadweep is known for. Ship and flight tickets are not included.",
    image: "/assets/tours/lakshadweep.jpg",
    nights: 2,
    style: "Group departures",
    fromPrice: 13990,
    highlights: [
      "Snorkelling over coral reefs",
      "Kayaking on calm lagoon water",
      "Glass-bottom boat ride",
      "Island food, including local fish dishes such as kilji and mas curry",
    ],
    itinerary: [],
    included: [
      "Snorkelling",
      "Kayaking",
      "A/C room stay",
      "Sightseeing",
      "Glass-bottom boat ride",
      "Bike / scooter rental",
      "Local island food",
      "Experienced guide",
    ],
    notIncluded: ["Ship or flight tickets to and from Lakshadweep"],
    departures: [
      { date: "2027-02-12", seatsLeft: null },
      { date: "2027-03-15", seatsLeft: null },
      { date: "2027-04-18", seatsLeft: null },
    ],
  },
  {
    slug: "goa",
    title: "Goa: North & South Goa",
    destination: "Goa",
    region: "India",
    tagline: "A beach resort in Calangute with North and South Goa sightseeing and train travel included.",
    summary:
      "Three nights at a beach resort in Calangute with a pool, North and South Goa sightseeing by private tempo, and sleeper train tickets both ways. Choose breakfast and dinner, or add lunch for all three meals.",
    image: "/assets/tours/goa.jpg",
    nights: 3,
    groupSize: "4 sharing",
    style: "Group package",
    fromPrice: 9800,
    priceOptions: [
      { label: "Breakfast + dinner", price: 9800, note: "per person · 4 sharing" },
      { label: "Breakfast + lunch + dinner", price: 11300, note: "per person · 4 sharing" },
    ],
    datesOnRequest: true,
    hotels: ["Aira Beach Resort, Calangute"],
    highlights: [
      "North Goa sightseeing by private tempo",
      "South Goa sightseeing by private tempo",
      "Beach resort in Calangute with a swimming pool",
      "Sleeper train tickets both ways",
    ],
    itinerary: [],
    included: [
      "Up and down sleeper train tickets",
      "3 nights / 4 days stay at Aira Beach Resort, Calangute",
      "Deluxe rooms with an extra mattress (4 sharing)",
      "Welcome drink on arrival",
      "Breakfast and dinner (veg and non-veg); lunch with the all-meals option",
      "Complimentary swimming pool",
      "Pickup from Madgaon station by private mini coach (toll included)",
      "North Goa sightseeing by private tempo",
      "South Goa sightseeing by private tempo",
      "Drop to Madgaon station by private mini coach",
      "All entry tickets and permits",
    ],
    notIncluded: ["Lunch, with the breakfast + dinner option"],
    departures: [],
  },
  {
    slug: "golden-triangle-delhi-jaipur-agra",
    title: "Golden Triangle: Delhi, Jaipur & Agra",
    destination: "Golden Triangle",
    region: "India",
    tagline: "Delhi, the Pink City of Jaipur and the Taj Mahal, by private car.",
    summary:
      "Five days by private Ertiga or Innova Crysta: the forts and palaces of Jaipur, Fatehpur Sikri on the way to Agra, and the Taj Mahal at sunrise. Four nights in hotels with breakfast and dinner, for groups of five or more on dates that suit you.",
    image: img("1477587458883-47145ed94245", 2000),
    nights: 4,
    groupSize: "Min 5 people",
    style: "Private tour",
    fromPrice: 16000,
    priceOptions: [
      { label: "With Ertiga", price: 16000, note: "per person · 5 people, 2 rooms (double sharing + extra bed)" },
      { label: "With Innova Crysta", price: 17000, note: "per person · 5 people, 2 rooms (double sharing + extra bed)" },
    ],
    datesOnRequest: true,
    hotels: [
      "Delhi: Hotel Town Palace (Premium) or similar",
      "Jaipur: Lords Plaza or similar",
      "Agra: Hotel Maple Grand (Deluxe) or similar",
    ],
    highlights: [
      "Amber Fort, City Palace, Jantar Mantar and Hawa Mahal in Jaipur",
      "Jal Mahal, Albert Hall Museum and Jaipur's markets",
      "Fatehpur Sikri on the way to Agra",
      "Sunrise at the Taj Mahal and Agra Fort",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Delhi",
        body: "Pickup from Delhi airport or railway station and transfer to the hotel. Check in and relax after the journey. Overnight in Delhi.",
      },
      {
        day: "Day 2",
        title: "Delhi to Jaipur",
        body: "Drive to Jaipur, the Pink City. Visit Hawa Mahal from outside, City Palace and Jantar Mantar, subject to time, then explore the local markets and Rajasthani food in the evening. Overnight in Jaipur.",
      },
      {
        day: "Day 3",
        title: "Jaipur sightseeing",
        body: "Amber Fort, a photo stop at Jal Mahal, and Albert Hall Museum and Birla Mandir depending on time. Shop for handicrafts, jewellery and traditional Rajasthani items. Overnight in Jaipur.",
      },
      {
        day: "Day 4",
        title: "Jaipur to Agra via Fatehpur Sikri",
        body: "Drive to Agra, visiting Fatehpur Sikri on the way if time permits. Mehtab Bagh or the local market depending on arrival time. Overnight in Agra.",
      },
      {
        day: "Day 5",
        title: "Taj Mahal and departure",
        body: "Early morning visit to the Taj Mahal, breakfast at the hotel, then Agra Fort, lunch and some free time for shopping. Evening transfer to Agra railway station.",
      },
    ],
    included: [
      "Assistance on arrival",
      "Welcome drink at the hotels (non-alcoholic)",
      "4 nights hotel stay",
      "4 breakfasts and 4 dinners at the hotels",
      "Complimentary Wi-Fi at the hotels",
      "All transfers and sightseeing in the chosen vehicle",
      "State taxes, tolls, parking, fuel and driver's allowance",
      "All hotel taxes",
    ],
    notIncluded: [
      "Flight or train tickets",
      "Guide fees",
      "Entry fees",
      "Other meals",
      "Rickshaw rides",
      "Personal expenses",
      "Cost increases due to unforeseen circumstances",
      "Tips for the driver, guide or waiters",
    ],
    departures: [],
  },
  {
    slug: "delhi-agra",
    title: "Delhi & Agra",
    destination: "Delhi & Agra",
    region: "India",
    tagline: "Two nights in Delhi and two in Agra, with the Taj Mahal, Agra Fort and Mehtab Bagh.",
    summary:
      "Five days by private Ertiga or Innova Crysta: Qutub Minar, Humayun's Tomb and India Gate in Delhi, then the Taj Mahal, Agra Fort and Mehtab Bagh in Agra. Four nights in hotels with breakfast and dinner, for groups of five or more on dates that suit you.",
    image: img("1587135941948-670b381f08ce", 2000),
    nights: 4,
    groupSize: "Min 5 people",
    style: "Private tour",
    fromPrice: 15300,
    priceOptions: [
      { label: "With Ertiga", price: 15300, note: "per person · 5 people, 2 rooms (double sharing + extra bed)" },
      { label: "With Innova Crysta", price: 16000, note: "per person · 5 people, 2 rooms (double sharing + extra bed)" },
    ],
    datesOnRequest: true,
    hotels: ["Delhi: Hotel Town Palace (Premium) or similar", "Agra: Hotel Maple Grand (Deluxe) or similar"],
    highlights: [
      "Qutub Minar, Humayun's Tomb and the Lotus Temple",
      "India Gate and the President's House",
      "The Taj Mahal and Agra Fort",
      "Views of the Taj from Mehtab Bagh",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival in Delhi",
        body: "Our driver meets you on arrival and transfers you to the hotel. The evening is free to relax or explore nearby. Overnight in Delhi.",
      },
      {
        day: "Day 2",
        title: "The best of Delhi",
        body: "Qutub Minar, Humayun's Tomb and the Lotus Temple (closed on Mondays), then drive past India Gate and the President's House. Overnight in Delhi.",
      },
      {
        day: "Day 3",
        title: "Delhi to Agra",
        body: "Visit the remaining Delhi sights as time permits, such as the streets of Old Delhi, then drive to Agra and check in. Overnight in Agra.",
      },
      {
        day: "Day 4",
        title: "Discover Agra",
        body: "The Taj Mahal, then Agra Fort with its palaces and courtyards. If time permits, explore the markets for marble handicrafts and souvenirs. Overnight in Agra.",
      },
      {
        day: "Day 5",
        title: "Agra and departure",
        body: "If time permits, Mehtab Bagh for views of the Taj across the Yamuna. Free time for shopping, then transfer to Agra railway station.",
      },
    ],
    included: [
      "Assistance on arrival",
      "Welcome drink at the hotels (non-alcoholic)",
      "4 nights hotel stay",
      "4 breakfasts and 4 dinners at the hotels",
      "Complimentary Wi-Fi at the hotels",
      "All transfers and sightseeing in the chosen vehicle",
      "State taxes, tolls, parking, fuel and driver's allowance",
      "All hotel taxes",
    ],
    notIncluded: [
      "Flight or train tickets",
      "Guide fees",
      "Entry fees",
      "Other meals",
      "Rickshaw rides",
      "Personal expenses",
      "Cost increases due to unforeseen circumstances",
      "Tips for the driver, guide or waiters",
    ],
    departures: [],
  },
  {
    slug: "hyderabad-ramoji-film-city",
    title: "Hyderabad: Ramoji Film City & Heritage",
    destination: "Hyderabad",
    region: "India",
    tagline: "Group and college tours to Ramoji Film City, Charminar and Golconda Fort.",
    summary:
      "Four days for groups and colleges: a full day at Ramoji Film City, Charminar and Laad Bazaar, Golconda Fort, a science or history museum and an evening at Hussain Sagar. Train tickets, all meals, a 3-star hotel and an AC coach are included.",
    image: img("1741545979534-02f59c742730", 2000),
    nights: 3,
    groupSize: "Min 5 people",
    style: "Group / college tour",
    fromPrice: 12999,
    priceOptions: [{ label: "Group / college tours", price: 12999, note: "per person · from, triple sharing" }],
    datesOnRequest: true,
    hotels: ["Hyderabad: The Origin"],
    highlights: [
      "A full day at Ramoji Film City",
      "Charminar and Laad Bazaar",
      "Golconda Fort",
      "Hussain Sagar and Lumbini Park in the evening",
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival and city tour",
        body: "Transfer to the hotel. Charminar and Laad Bazaar for bangles and local shopping, and Chowmahalla Palace subject to timings. Dinner and group time at the hotel.",
      },
      {
        day: "Day 2",
        title: "Ramoji Film City",
        body: "A full day exploring movie sets, themed attractions, gardens, live shows and selected rides, with lunch inside the complex. Back to the hotel for dinner.",
      },
      {
        day: "Day 3",
        title: "Fort, science and evening fun",
        body: "Golconda Fort and Hyderabad's history, then Salar Jung Museum or Birla Science Museum depending on the group's interests. Evening at Hussain Sagar and Lumbini Park, subject to operating schedules.",
      },
      {
        day: "Day 4",
        title: "Shopping and departure",
        body: "Check out, then the Birla Science Centre if not covered on Day 3, or a short shopping stop. Lunch depending on departure time, then drop at the railway station or airport.",
      },
    ],
    included: [
      "Up and down sleeper train tickets",
      "All meals (breakfast, lunch and dinner)",
      "3-star accommodation",
      "Ramoji Film City and other entry tickets",
      "AC coach as per the itinerary",
      "Driver's allowance and toll taxes",
    ],
    notIncluded: ["Personal expenses", "Anything not listed as included"],
    departures: [],
  },
];

export const REGIONS: Region[] = ["India", "Southeast Asia", "Central Asia"];

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

export function startingPrice(pkg: TourPackage): number {
  return pkg.fromPrice;
}

/** The next date that is still open for booking. */
export function nextDeparture(pkg: TourPackage, now = new Date()): Departure | null {
  return upcomingDepartures(pkg, now).find((d) => !d.closed && d.seatsLeft !== 0) ?? null;
}

export function departureStatus(d: Departure): { label: string; tone: "open" | "few" | "full" } {
  if (d.closed) return { label: "Booking closed", tone: "full" };
  if (d.seatsLeft === null) return { label: "Ask for availability", tone: "open" };
  if (d.seatsLeft <= 0) return { label: "Sold out", tone: "full" };
  if (d.seatsLeft <= 4) return { label: `Only ${d.seatsLeft} seats left`, tone: "few" };
  return { label: `${d.seatsLeft} seats left`, tone: "open" };
}

/** "5 days · 4 nights", the tour's own label, or null when not confirmed. */
export function durationText(pkg: TourPackage, short = false): string | null {
  if (pkg.nights !== null) return short ? `${pkg.nights + 1} days` : `${pkg.nights + 1} days · ${pkg.nights} nights`;
  return pkg.durationLabel ?? null;
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
