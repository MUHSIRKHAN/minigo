import type { CollectionConfig } from "payload";

export const ContactSubmissions: CollectionConfig = {
  slug: "contact-submissions",
  labels: { singular: "Enquiry", plural: "Enquiries" },
  admin: {
    group: "Enquiries",
    useAsTitle: "name",
    defaultColumns: ["name", "email", "service", "status", "createdAt"],
    description: "Messages sent from the website's enquiry form.",
  },
  defaultSort: "-createdAt",
  fields: [
    {
      type: "row",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "email", type: "email", required: true },
      ],
    },
    { name: "service", type: "text", label: "Interested in" },
    { name: "message", type: "textarea" },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      admin: { position: "sidebar" },
      options: [
        { label: "New", value: "new" },
        { label: "Replied", value: "replied" },
        { label: "Booked", value: "booked" },
        { label: "Closed", value: "closed" },
      ],
    },
    { name: "notes", type: "textarea", admin: { position: "sidebar" } },
  ],
};
