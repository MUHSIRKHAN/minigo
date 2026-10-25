import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Photo", plural: "Photos" },
  admin: { group: "Admin", description: "Every photo uploaded to the website." },
  upload: { mimeTypes: ["image/*"] },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      label: "Description",
      admin: { description: "What the photo shows, for search engines and screen readers." },
    },
  ],
};
