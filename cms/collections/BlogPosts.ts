import type { CollectionConfig } from "payload";
import { slugField } from "../fields";
import { revalidateHooks } from "../hooks/revalidate";

export const BlogPosts: CollectionConfig = {
  slug: "blog-posts",
  labels: { singular: "Journal post", plural: "Journal" },
  admin: {
    group: "Website content",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedDate"],
    description: "Travel stories and guides on the Journal page.",
  },
  defaultSort: "-publishedDate",
  hooks: revalidateHooks,
  fields: [
    { name: "title", type: "text", required: true },
    slugField(),
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      admin: { position: "sidebar", date: { pickerAppearance: "dayOnly", displayFormat: "d MMM yyyy" } },
    },
    {
      type: "row",
      fields: [
        { name: "category", type: "text", required: true, admin: { placeholder: "Travel guide" } },
        { name: "readTime", type: "text", admin: { placeholder: "5 min read" } },
      ],
    },
    { name: "excerpt", type: "textarea", required: true, admin: { description: "One or two sentences shown on the Journal page." } },
    { name: "featuredImage", type: "upload", relationTo: "media", required: true, label: "Main photo" },
    { name: "content", type: "richText", required: true },
    {
      type: "collapsible",
      label: "Search engines (optional)",
      admin: { initCollapsed: true },
      fields: [
        { name: "seoTitle", type: "text", label: "Title for Google" },
        { name: "seoDescription", type: "textarea", label: "Description for Google" },
      ],
    },
  ],
};
