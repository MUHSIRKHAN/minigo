import type { CollectionConfig } from "payload";
import { lineList, orderField, publishedField, slugField } from "../fields";
import { revalidateHooks } from "../hooks/revalidate";

export const Trips: CollectionConfig = {
  slug: "trips",
  labels: { singular: "Tour package", plural: "Tour packages" },
  admin: {
    group: "Trips",
    useAsTitle: "title",
    defaultColumns: ["title", "destination", "region", "published", "order"],
    description: "Tours with fixed dates. Past departures are hidden on the website automatically.",
  },
  defaultSort: "order",
  hooks: revalidateHooks,
  fields: [
    { name: "title", type: "text", required: true, admin: { description: "For example “Vietnam: Hanoi, Ha Long & Hoi An”." } },
    slugField(),
    publishedField,
    orderField,
    {
      type: "row",
      fields: [
        { name: "destination", type: "text", required: true },
        {
          name: "region",
          type: "select",
          required: true,
          options: ["Southeast Asia", "Central Asia", "South Asia"],
        },
      ],
    },
    { name: "tagline", type: "text", required: true, admin: { description: "One line shown on trip cards." } },
    { name: "summary", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Main photo" },
    {
      type: "row",
      fields: [
        { name: "nights", type: "number", required: true, min: 1 },
        { name: "groupSize", type: "text", required: true, admin: { placeholder: "Small group · max 12" } },
        { name: "style", type: "text", required: true, admin: { placeholder: "Culture & Cuisine" } },
      ],
    },
    {
      name: "departures",
      type: "array",
      labels: { singular: "Departure", plural: "Departures" },
      admin: { description: "Each date with its per-person price in rupees and the seats still available." },
      fields: [
        {
          type: "row",
          fields: [
            {
              name: "date",
              type: "date",
              required: true,
              admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
            },
            { name: "price", type: "number", required: true, min: 0, label: "Price (₹ per person)" },
            { name: "seatsLeft", type: "number", required: true, min: 0, label: "Seats left" },
          ],
        },
      ],
    },
    lineList("highlights", "Highlights"),
    {
      name: "itinerary",
      type: "array",
      labels: { singular: "Day", plural: "Itinerary" },
      fields: [
        {
          type: "row",
          fields: [
            { name: "day", type: "text", required: true, admin: { placeholder: "Days 1–2" } },
            { name: "title", type: "text", required: true },
          ],
        },
        { name: "body", type: "textarea", required: true },
      ],
    },
    lineList("included", "Included"),
    lineList("notIncluded", "Not included"),
  ],
};
