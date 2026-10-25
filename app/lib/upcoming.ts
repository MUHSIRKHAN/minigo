// Trips we are considering but have not confirmed yet. Visitors join a waitlist;
// once a trip's sign-ups reach its `goal`, plan the dates and move it into PACKAGES.
//
// SAMPLE DATA — the trips, seasons and estimates below are placeholders.
// `demoInterest` adds a starting number to the live count so the demo shows how
// the progress bar looks. Set every `demoInterest` to 0 before launch, so the
// site only ever shows real sign-ups.

export type UpcomingTrip = {
  slug: string;
  destination: string;
  title: string;
  summary: string;
  image: string;
  /** When we expect to run it, shown as-is */
  season: string;
  nights: number;
  /** Rough per-person price in rupees; shown as "around ₹…" */
  estimate: number;
  /** Travellers needed before we confirm dates */
  goal: number;
  /** Months offered in the form's "preferred month" dropdown */
  months: string[];
  demoInterest: number;
};

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=1400&q=80&fm=jpg&fit=crop&auto=format`;

export const UPCOMING: UpcomingTrip[] = [
  {
    slug: "uzbekistan-silk-road",
    destination: "Uzbekistan",
    title: "The Silk Road: Samarkand, Bukhara & Khiva",
    summary: "Blue-tiled madrasas, desert caravan towns and the bazaars of the old Silk Road.",
    image: img("1605199423916-b725a00b324b"),
    season: "Apr – May 2027",
    nights: 8,
    estimate: 145000,
    goal: 12,
    months: ["April 2027", "May 2027", "September 2027", "October 2027"],
    demoInterest: 7,
  },
  {
    slug: "bhutan-paro-punakha",
    destination: "Bhutan",
    title: "Bhutan: Thimphu, Punakha & Tiger's Nest",
    summary: "Cliff-top monasteries, prayer-flag passes and the quiet of the last Himalayan kingdom.",
    image: img("1638246438556-5d5042582f05"),
    season: "Mar – May 2027",
    nights: 6,
    estimate: 115000,
    goal: 10,
    months: ["March 2027", "April 2027", "May 2027"],
    demoInterest: 4,
  },
  {
    slug: "kyrgyzstan-song-kul",
    destination: "Kyrgyzstan",
    title: "Kyrgyzstan: Song-Kul & the Tian Shan",
    summary: "Nights in yurts by an alpine lake, horse treks and nomad hospitality.",
    image: img("1592240419090-5d933c5a759b"),
    season: "Jul – Aug 2027",
    nights: 9,
    estimate: 165000,
    goal: 10,
    months: ["July 2027", "August 2027"],
    demoInterest: 2,
  },
];

export function getUpcoming(slug: string): UpcomingTrip | undefined {
  return UPCOMING.find((t) => t.slug === slug);
}
