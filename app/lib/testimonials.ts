// SAMPLE DATA — placeholder reviews and stock portrait photos for the design.
// Before launch, replace every entry with a real traveller's review, name and
// photo, used with their permission. Never publish invented reviews as genuine.

export type Testimonial = {
  name: string;
  /** Where the traveller is from */
  from: string;
  trip: string;
  /** Month and year of travel */
  when: string;
  /** 1–5, halves allowed (e.g. 4.5) */
  rating: number;
  quote: string;
  photo: string;
};

const portrait = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=240&h=240&q=80&fm=jpg&fit=crop&crop=faces&auto=format`;

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Anjali Menon",
    from: "Kozhikode",
    trip: "Kashmir: Srinagar, Gulmarg & Pahalgam",
    when: "May 2026",
    rating: 5,
    quote:
      "Waking up on the houseboat and taking a shikara at dawn felt unreal. Every transfer and hotel was sorted before we even asked, and our guide knew exactly when to be at the Gulmarg gondola to beat the queues.",
    photo: portrait("1627923146572-5e3d07f32980"),
  },
  {
    name: "Rahul Nair",
    from: "Kochi",
    trip: "Vietnam: Hanoi, Ha Long & Hoi An",
    when: "January 2026",
    rating: 5,
    quote:
      "The overnight cruise in Ha Long Bay was the highlight, but it was the little things — the street-food walk in Hanoi, the lantern-making in Hoi An — that made it feel personal. Great small group, no rushing.",
    photo: portrait("1548213238-0da7521bd6e0"),
  },
  {
    name: "Priya Das",
    from: "Bengaluru",
    trip: "Thailand: Bangkok, Phuket & Krabi",
    when: "February 2026",
    rating: 4.5,
    quote:
      "My private longtail day around Phi Phi was worth the whole trip. One transfer ran a little late, but the team called ahead and fixed it within minutes. I would book with them again.",
    photo: portrait("1544507888-56d73eb6046e"),
  },
  {
    name: "Dr. Suresh Pillai",
    from: "Thiruvananthapuram",
    trip: "Kazakhstan: Almaty, Charyn & Kolsai Lakes",
    when: "August 2026",
    rating: 5,
    quote:
      "I was nervous about a destination few people go to, but the planning was meticulous. The Kolsai lodge, the Charyn Canyon picnic and a driver who spoke great English — it all just worked.",
    photo: portrait("1492462543947-040389c4a66c"),
  },
  {
    name: "Neha Varghese",
    from: "Kozhikode",
    trip: "Tajikistan: The Pamir Highway",
    when: "September 2026",
    rating: 5,
    quote:
      "A genuinely tough road, and exactly the adventure I wanted. Homestays in the Wakhan Valley were warm and the guide made sure we were comfortable at altitude. Not for everyone, but unforgettable.",
    photo: portrait("1618298363483-e31a31f1a1e2"),
  },
  {
    name: "Faisal Rahman",
    from: "Malappuram",
    trip: "Kashmir: Srinagar, Gulmarg & Pahalgam",
    when: "June 2026",
    rating: 4,
    quote:
      "Beautiful itinerary and very reasonable for what is included. The weather turned in Pahalgam, and they rearranged the day so we still saw the valley. Honest, responsive and well organised.",
    photo: portrait("1664312572933-0563f14484a1"),
  },
];

export function averageRating(items: Testimonial[] = TESTIMONIALS): number {
  if (items.length === 0) return 0;
  const sum = items.reduce((total, t) => total + t.rating, 0);
  return Math.round((sum / items.length) * 10) / 10;
}
