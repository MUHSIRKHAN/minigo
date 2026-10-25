import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Photo", plural: "Photos" },
  admin: { group: "Admin", description: "Every photo uploaded to the website." },
  // Photos appear on the public website, so anyone may view them; only the admin can add or change them.
  access: { read: () => true },
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
