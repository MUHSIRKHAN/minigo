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
    label: "Together",
    caption: "Two travellers, a mirror-still lake and mountains all around",
    image: photo("1720593445751-bef477facbb4"),
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
    caption: "Wrapped up in each other as the sun sets over the sea",
    image: photo("1709786204898-dc160b24f883"),
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
    label: "Solo traveller",
    caption: "Golden hour over endless green tea hills",
    image: photo("1755547979233-f72467b637b3"),
    by: "Neha Varghese",
    from: "Kozhikode",
  },
  {
    label: "Vietnam",
    caption: "Cycling through a golden old town of heritage houses",
    image: photo("1576565334281-aa7d97ad8e70"),
    by: "Rahul Nair",
    from: "Kochi",
  },
  {
    label: "Lakshadweep",
    caption: "Spotting the coral islands on the flight in",
    image: photo("1572431447238-425af66a273b"),
    by: "Priya & Arjun Das",
    from: "Bengaluru",
  },
];
