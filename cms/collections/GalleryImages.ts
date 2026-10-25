import type { CollectionConfig } from "payload";
import { orderField, publishedField } from "../fields";
import { revalidateHooks } from "../hooks/revalidate";

export const GalleryImages: CollectionConfig = {
  slug: "gallery-images",
  labels: { singular: "Gallery photo", plural: "Gallery" },
  admin: {
    group: "Website content",
    useAsTitle: "caption",
    defaultColumns: ["caption", "category", "published", "order"],
    description: "Photos on the Gallery page.",
  },
  defaultSort: "order",
  hooks: revalidateHooks,
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true, label: "Photo" },
    {
      type: "row",
      fields: [
        { name: "caption", type: "text" },
        { name: "category", type: "text", admin: { placeholder: "Vietnam" } },
      ],
    },
    publishedField,
    orderField,
  ],
};
