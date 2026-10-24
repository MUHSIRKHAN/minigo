// SAMPLE DATA — stock photos and made-up traveller credits standing in for your own
// travellers' favourite moments. Before launch, replace each entry with a real photo
// from your tours — groups, couples, friends, families, happy faces — credit the
// traveller who actually took it (with everyone's permission) and write a caption that matches.

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
    caption: "A snow day, a few friends and non-stop laughter",
    image: photo("1579689189009-874f5cac2db5"),
    by: "Rahul Nair",
    from: "Kochi",
  },
  {
    label: "Couple's getaway",
    caption: "Dressed in their best, lost in the morning mist",
    image: photo("1715285977619-6d9357168f46"),
    by: "Anjali Menon",
    from: "Kozhikode",
  },
  {
    label: "Friends on tour",
    caption: "Bundled up and beaming in the mountains",
    image: photo("1579689217062-f66443381e24"),
    by: "Rahul Nair",
    from: "Kochi",
  },
  {
    label: "Couple's getaway",
    caption: "Laughing together after a long day of travel",
    image: photo("1719857646787-38c9c5f79312"),
    by: "Faisal & Hana Rahman",
    from: "Malappuram",
  },
  {
    label: "Family holiday",
    caption: "Three generations, one happy holiday",
    image: photo("1567122087721-47b09b61e1d1"),
    by: "Lakshmi Pillai",
    from: "Thiruvananthapuram",
  },
  {
    label: "Couple's getaway",
    caption: "A quiet moment together among the trees",
    image: photo("1720105761832-927de5f2ecce"),
    by: "Neha & Vishnu Varghese",
    from: "Kozhikode",
  },
  {
    label: "Pure joy",
    caption: "Friends, a late evening out and no one wanting it to end",
    image: photo("1698479821544-c9d465c683a6"),
    by: "Faisal & Hana Rahman",
    from: "Malappuram",
  },
  {
    label: "Together",
    caption: "Side by side by the lake",
    image: photo("1624894830193-4fddb348ab65"),
    by: "Priya & Arjun Das",
    from: "Bengaluru",
  },
];
