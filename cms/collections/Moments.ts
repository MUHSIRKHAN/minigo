import type { CollectionConfig } from "payload";
import { orderField, publishedField } from "../fields";
import { revalidateHooks } from "../hooks/revalidate";

export const Moments: CollectionConfig = {
  slug: "moments",
  labels: { singular: "Best moment", plural: "Travellers' best moments" },
  admin: {
    group: "Website content",
    useAsTitle: "caption",
    defaultColumns: ["caption", "label", "by", "published", "order"],
    description: "Photos from your travellers, credited to the person who took them. The home page shows the first 8.",
  },
  defaultSort: "order",
  hooks: revalidateHooks,
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Photo" },
    {
      type: "row",
      fields: [
        { name: "label", type: "text", required: true, admin: { placeholder: "Group trip" } },
        { name: "caption", type: "text", required: true },
      ],
    },
    {
      type: "row",
      fields: [
        { name: "by", type: "text", required: true, label: "Captured by" },
        { name: "from", type: "text", required: true, label: "Where they're from" },
      ],
    },
    publishedField,
    orderField,
  ],
};
