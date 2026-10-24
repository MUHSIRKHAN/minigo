// SAMPLE DATA — stock photos and made-up traveller credits standing in for your own
// travellers' favourite moments. Before launch, replace each entry with a real photo
// from your tours — groups, couples, friends, happy faces — credit the traveller who
// actually took it (with everyone's permission) and write a caption that matches.

export type Moment = {
  /** Short category shown above the caption, e.g. "Group trip" or "Couple's getaway" */
  label: string;
  caption: string;
  image: string;
  /** Who captured the photo */
  by: string;
  /** Where the traveller is from */
  from: string;
};

const photo = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=80&fm=jpg&fit=crop&auto=format`;

export const MOMENTS: Moment[] = [
  {
    label: "Group trip",
    caption: "One big laugh, the whole group together",
    image: photo("1566371485846-1d68080f9f4a"),
    by: "Rahul Nair",
    from: "Kochi",
  },
  {
    label: "Couple's getaway",
    caption: "Smiling at each other after a long day of travel",
    image: photo("1586022045128-730988f570c9"),
    by: "Priya Das",
    from: "Bengaluru",
  },
  {
    label: "Friends on tour",
    caption: "Four friends and the view they hiked for",
    image: photo("1599828586134-fbaff96c63d5"),
    by: "Anjali Menon",
    from: "Kozhikode",
  },
  {
    label: "Together",
    caption: "Two friends, one quiet lakeside moment",
    image: photo("1504836054726-3e36882ddaf9"),
    by: "Neha Varghese",
    from: "Kozhikode",
  },
  {
    label: "Couple's getaway",
    caption: "Watching the sunset side by side",
    image: photo("1529566321973-795c4f4138bb"),
    by: "Dr. Suresh Pillai",
    from: "Thiruvananthapuram",
  },
  {
    label: "Pure joy",
    caption: "Friends laughing it up in the mountains",
    image: photo("1539635278303-d4002c07eae3"),
    by: "Faisal Rahman",
    from: "Malappuram",
  },
  {
    label: "Experience",
    caption: "A couple, a sky full of balloons",
    image: photo("1530789253388-582c481c54b0"),
    by: "Priya Das",
    from: "Bengaluru",
  },
  {
    label: "Couple's getaway",
    caption: "Above the clouds, side by side",
    image: photo("1566759996874-04d713cc224a"),
    by: "Rahul Nair",
    from: "Kochi",
  },
];
