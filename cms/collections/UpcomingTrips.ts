import type { CollectionConfig } from "payload";
import { orderField, publishedField, slugField } from "../fields";
import { revalidateHooks } from "../hooks/revalidate";

export const UpcomingTrips: CollectionConfig = {
  slug: "upcoming-trips",
  labels: { singular: "Coming soon trip", plural: "Coming soon trips" },
  admin: {
    group: "Trips",
    useAsTitle: "title",
    defaultColumns: ["title", "interestedTravellers", "goal", "season", "published"],
    description:
      "Trips without dates yet. Visitors join the waitlist; once enough travellers sign up, add it as a tour package with dates.",
  },
  defaultSort: "order",
  hooks: revalidateHooks,
  fields: [
    { name: "title", type: "text", required: true, admin: { description: "For example “Uzbekistan: Samarkand, Bukhara & Khiva”." } },
    slugField(),
    publishedField,
    orderField,
    {
      name: "interestedTravellers",
      type: "number",
      defaultValue: 0,
      label: "Travellers signed up",
      admin: { position: "sidebar", readOnly: true, description: "Counted from the waitlist automatically." },
    },
    { name: "destination", type: "text", required: true },
    { name: "summary", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Main photo" },
    {
      type: "row",
      fields: [
        { name: "season", type: "text", required: true, admin: { placeholder: "Apr – May 2027", description: "Shown as written." } },
        { name: "nights", type: "number", required: true, min: 1 },
        { name: "estimate", type: "number", required: true, min: 0, label: "Rough price (₹ per person)" },
      ],
    },
    {
      type: "row",
      fields: [
        {
          name: "goal",
          type: "number",
          required: true,
          min: 1,
          label: "Travellers needed",
          admin: { description: "Sign-ups needed before you fix dates." },
        },
        {
          name: "startingInterest",
          type: "number",
          defaultValue: 0,
          min: 0,
          label: "Extra count shown",
          admin: {
            description: "Added to real sign-ups on the website, for interest you already have by phone. Keep 0 otherwise.",
          },
        },
      ],
    },
    {
      name: "months",
      type: "array",
      label: "Months offered",
      admin: { description: "Choices in the waitlist form's “preferred month” list. “Flexible” is always added." },
      fields: [{ name: "month", type: "text", required: true, admin: { placeholder: "April 2027" } }],
    },
    {
      name: "signups",
      type: "join",
      collection: "waitlist-signups",
      on: "trip",
      label: "Waitlist sign-ups",
      admin: { defaultColumns: ["name", "phone", "travellers", "month", "status"] },
    },
  ],
};
