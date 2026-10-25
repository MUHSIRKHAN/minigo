// Server-only: every piece of editable site content, read from the admin.
// Falls back to the sample data files when the admin is not connected yet.
import { cache } from "react";
import { cmsConfigured, getCms, isoDay, mediaUrl } from "./cms";
import { PACKAGES, type Region, type TourPackage } from "./packages";
import { UPCOMING, type UpcomingTrip } from "./upcoming";
import { TESTIMONIALS, type Testimonial } from "./testimonials";
import { MOMENTS, type Moment } from "./moments";

const lines = (rows: { text: string }[] | null | undefined) => (rows ?? []).map((r) => r.text);

export const getPackages = cache(async (): Promise<TourPackage[]> => {
  if (!cmsConfigured) return PACKAGES;
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "trips",
    where: { published: { equals: true } },
    sort: "order",
    pagination: false,
    depth: 1,
  });
  return docs.map((t) => ({
    slug: t.slug,
    title: t.title,
    destination: t.destination,
    region: t.region as Region,
    tagline: t.tagline,
    summary: t.summary,
    image: mediaUrl(t.image),
    nights: t.nights,
    groupSize: t.groupSize,
    style: t.style,
    highlights: lines(t.highlights),
    itinerary: (t.itinerary ?? []).map(({ day, title, body }) => ({ day, title, body })),
    included: lines(t.included),
    notIncluded: lines(t.notIncluded),
    departures: (t.departures ?? []).map((d) => ({ date: isoDay(d.date), price: d.price, seatsLeft: d.seatsLeft })),
  }));
});

export async function getPackage(slug: string): Promise<TourPackage | undefined> {
  return (await getPackages()).find((p) => p.slug === slug);
}

export const getUpcomingTrips = cache(async (): Promise<UpcomingTrip[]> => {
  if (!cmsConfigured) return UPCOMING;
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "upcoming-trips",
    where: { published: { equals: true } },
    sort: "order",
    pagination: false,
    depth: 1,
  });
  return docs.map((t) => ({
    slug: t.slug,
    destination: t.destination,
    title: t.title,
    summary: t.summary,
    image: mediaUrl(t.image),
    season: t.season,
    nights: t.nights,
    estimate: t.estimate,
    goal: t.goal,
    months: (t.months ?? []).map((m) => m.month),
    demoInterest: t.startingInterest ?? 0,
  }));
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  if (!cmsConfigured) return TESTIMONIALS;
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "testimonials",
    where: { published: { equals: true } },
    sort: "order",
    pagination: false,
    depth: 1,
  });
  return docs.map((t) => ({
    name: t.name,
    from: t.from,
    trip: t.trip,
    when: t.when,
    rating: t.rating,
    quote: t.quote,
    photo: mediaUrl(t.photo),
  }));
});

export const getMoments = cache(async (): Promise<Moment[]> => {
  if (!cmsConfigured) return MOMENTS;
  const cms = await getCms();
  const { docs } = await cms.find({
    collection: "moments",
    where: { published: { equals: true } },
    sort: "order",
    limit: 8,
    depth: 1,
  });
  return docs.map((m) => ({ label: m.label, caption: m.caption, image: mediaUrl(m.image), by: m.by, from: m.from }));
});
