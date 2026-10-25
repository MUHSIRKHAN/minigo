import type { CollectionConfig } from "payload";
import { orderField, publishedField } from "../fields";
import { revalidateHooks } from "../hooks/revalidate";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Review", plural: "Reviews" },
  admin: {
    group: "Website content",
    useAsTitle: "name",
    defaultColumns: ["name", "trip", "rating", "published", "order"],
    description: "Real travellers' reviews, published with their permission.",
  },
  defaultSort: "order",
  hooks: revalidateHooks,
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "from", type: "text", required: true, label: "Where they're from" },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "trip", type: "text", required: true },
        { name: "when", type: "text", required: true, label: "When they travelled", admin: { placeholder: "May 2026" } },
        {
          name: "rating",
          type: "number",
          required: true,
          min: 1,
          max: 5,
          defaultValue: 5,
          admin: { step: 0.5, description: "1 to 5; halves allowed." },
        },
      ],
    },
    { name: "quote", type: "textarea", required: true, label: "Review" },
    { name: "photo", type: "upload", relationTo: "media", required: true },
    publishedField,
    orderField,
  ],
};
