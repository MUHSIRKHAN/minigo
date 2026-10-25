// SAMPLE DATA — placeholder reviews and stock portrait photos for the design.
// Real reviews are managed in the admin (/admin → Reviews); this list is shown only
// until the admin is connected, and is what `npm run seed` loads into it.
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
    photo: portrait("1681644097069-2c6bdbe1170d"),
  },
  {
    name: "Rahul Nair",
    from: "Kochi",
    trip: "Vietnam: Hanoi, Ha Long & Hoi An",
    when: "January 2026",
    rating: 5,
    quote:
      "The overnight cruise in Ha Long Bay was the highlight, but it was the little things — the street-food walk in Hanoi, the lantern-making in Hoi An — that made it feel personal. Great small group, no rushing.",
    photo: portrait("1598966739654-5e9a252d8c32"),
  },
  {
    name: "Priya & Arjun Das",
    from: "Bengaluru",
    trip: "Thailand: Bangkok, Phuket & Krabi",
    when: "February 2026",
    rating: 4.5,
    quote:
      "Our private longtail day around Phi Phi was worth the whole trip. One transfer ran a little late, but the team called ahead and fixed it within minutes. We would book with them again.",
    photo: portrait("1515766024017-689e434ef22b"),
  },
  {
    name: "Lakshmi Pillai",
    from: "Thiruvananthapuram",
    trip: "Kashmir: Srinagar, Gulmarg & Pahalgam",
    when: "September 2026",
    rating: 5,
    quote:
      "I worried the pace would be too much, but the houseboat stay and the unhurried days made Kashmir easy. Our guide carried my bags without being asked and checked on me every evening. I felt completely looked after.",
    photo: portrait("1596787794038-be798d7248a0"),
  },
  {
    name: "Neha & Vishnu Varghese",
    from: "Kozhikode",
    trip: "Tajikistan: The Pamir Highway",
    when: "September 2026",
    rating: 5,
    quote:
      "A genuinely tough road, and exactly the adventure we wanted. The homestays in the Wakhan Valley were warm and our guide made sure we were comfortable at altitude. Not for everyone, but unforgettable.",
    photo: portrait("1635481728744-086dc12ceaf5"),
  },
  {
    name: "Faisal & Hana Rahman",
    from: "Malappuram",
    trip: "Kashmir: Srinagar, Gulmarg & Pahalgam",
    when: "June 2026",
    rating: 4,
    quote:
      "Beautiful itinerary and very reasonable for what is included. The weather turned in Pahalgam, and they rearranged the day so we still saw the valley. Honest, responsive and well organised.",
    photo: portrait("1715285977649-4a83c0820399"),
  },
];

export function averageRating(items: Testimonial[] = TESTIMONIALS): number {
  if (items.length === 0) return 0;
  const sum = items.reduce((total, t) => total + t.rating, 0);
  return Math.round((sum / items.length) * 10) / 10;
}
