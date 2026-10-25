import type { Field } from "payload";

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-");

/** URL name, filled in from the title when left empty. */
export const slugField = (from = "title"): Field => ({
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
  admin: {
    position: "sidebar",
    description: "Used in the page address. Filled in from the title if you leave it empty.",
  },
  hooks: {
    beforeValidate: [
      ({ value, siblingData }) => {
        if (typeof value === "string" && value.trim()) return toSlug(value);
        const source = siblingData?.[from];
        return typeof source === "string" ? toSlug(source) : value;
      },
    ],
  },
});

export const publishedField: Field = {
  name: "published",
  type: "checkbox",
  label: "Show on website",
  defaultValue: true,
  admin: { position: "sidebar" },
};

export const orderField: Field = {
  name: "order",
  type: "number",
  defaultValue: 0,
  admin: { position: "sidebar", description: "Lower numbers are shown first." },
};

/** A list of short lines, such as highlights or what is included. */
export const lineList = (name: string, label: string): Field => ({
  name,
  label,
  type: "array",
  labels: { singular: "Line", plural: "Lines" },
  fields: [{ name: "text", type: "text", required: true }],
});
