import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, CollectionConfig, PayloadRequest } from "payload";

const idOf = (value: unknown) =>
  typeof value === "object" && value !== null ? (value as { id: string }).id : (value as string | undefined);

/** Keeps the trip's “Travellers signed up” total in step with its sign-ups. */
async function recount(tripId: string | undefined, req: PayloadRequest) {
  if (!tripId) return;
  const { docs } = await req.payload.find({
    collection: "waitlist-signups",
    where: { trip: { equals: tripId } },
    pagination: false,
    depth: 0,
    select: { travellers: true },
    req,
  });
  const total = docs.reduce((sum, d) => sum + (Number(d.travellers) || 0), 0);
  await req.payload.update({
    collection: "upcoming-trips",
    id: tripId,
    data: { interestedTravellers: total },
    depth: 0,
    req,
  });
}

const afterChange: CollectionAfterChangeHook = async ({ doc, previousDoc, req }) => {
  const now = idOf(doc.trip);
  const before = idOf(previousDoc?.trip);
  await recount(now, req);
  if (before && before !== now) await recount(before, req);
  return doc;
};

const afterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  await recount(idOf(doc.trip), req);
  return doc;
};

export const WaitlistSignups: CollectionConfig = {
  slug: "waitlist-signups",
  labels: { singular: "Waitlist sign-up", plural: "Waitlist sign-ups" },
  admin: {
    group: "Trips",
    useAsTitle: "name",
    defaultColumns: ["name", "trip", "phone", "travellers", "month", "status", "createdAt"],
    description: "People who joined the waitlist for a coming soon trip.",
  },
  defaultSort: "-createdAt",
  hooks: { afterChange: [afterChange], afterDelete: [afterDelete] },
  fields: [
    { name: "trip", type: "relationship", relationTo: "upcoming-trips", required: true, index: true },
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "phone", type: "text", required: true, label: "WhatsApp / phone" },
        { name: "email", type: "email" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "travellers", type: "number", required: true, min: 1, max: 10, defaultValue: 1 },
        { name: "month", type: "text", required: true, label: "Preferred month" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: { position: "sidebar" },
      options: [
        { label: "New", value: "new" },
        { label: "Contacted", value: "contacted" },
        { label: "Booked", value: "booked" },
        { label: "Not interested", value: "not-interested" },
      ],
    },
    { name: "notes", type: "textarea", admin: { position: "sidebar" } },
  ],
};
