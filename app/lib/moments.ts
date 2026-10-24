// SAMPLE DATA — stock photos and made-up traveller credits standing in for your own
// travellers' favourite moments. Before launch, replace each entry with a real photo
// from your tours, credit the traveller who actually took it (with their permission)
// and write a caption that matches the picture.

export type Moment = {
  place: string;
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
    place: "Vietnam",
    caption: "Looking out over limestone karsts and green water",
    image: photo("1575986767340-5d17ae767ab0"),
    by: "Rahul Nair",
    from: "Kochi",
  },
  {
    place: "Kashmir",
    caption: "A quiet morning in a Himalayan meadow",
    image: photo("1627894485200-b92fb4353967"),
    by: "Anjali Menon",
    from: "Kozhikode",
  },
  {
    place: "Thailand",
    caption: "Limestone cliffs on the Andaman coast",
    image: photo("1616394585067-d3e824140aa1"),
    by: "Priya Das",
    from: "Bengaluru",
  },
  {
    place: "Kazakhstan",
    caption: "Trekking a snowy mountain trail",
    image: photo("1756062435245-8dceacaa47a8"),
    by: "Dr. Suresh Pillai",
    from: "Thiruvananthapuram",
  },
  {
    place: "Kashmir",
    caption: "A horse ride across fresh snow",
    image: photo("1706353222367-d0b0fb602f07"),
    by: "Faisal Rahman",
    from: "Malappuram",
  },
  {
    place: "Vietnam",
    caption: "Hanoi's Train Street at train time",
    image: photo("1726346234848-a6c0e78efd8c"),
    by: "Rahul Nair",
    from: "Kochi",
  },
  {
    place: "Tajikistan",
    caption: "Beside a turquoise mountain lake",
    image: photo("1788072723182-69f3e04d7e10"),
    by: "Neha Varghese",
    from: "Kozhikode",
  },
  {
    place: "Kazakhstan",
    caption: "An evening at a yurt camp",
    image: photo("1621425022689-308a7b7691a3"),
    by: "Dr. Suresh Pillai",
    from: "Thiruvananthapuram",
  },
];
