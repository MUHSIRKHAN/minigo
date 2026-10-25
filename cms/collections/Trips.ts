import type { CollectionConfig } from "payload";
import { lineList, orderField, publishedField, slugField } from "../fields";
import { revalidateHooks } from "../hooks/revalidate";

export const Trips: CollectionConfig = {
  slug: "trips",
  labels: { singular: "Tour package", plural: "Tour packages" },
  admin: {
    group: "Trips",
    useAsTitle: "title",
    defaultColumns: ["title", "destination", "fromPrice", "published", "order"],
    description:
      "Every tour on the website. Leave a section empty if it isn't confirmed yet — the website then asks visitors to contact you instead of guessing.",
  },
  defaultSort: "order",
  hooks: revalidateHooks,
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: { description: "“Destination: route”, for example “Kashmir: Srinagar, Gulmarg, Sonmarg & Pahalgam”." },
    },
    slugField(),
    publishedField,
    orderField,
    {
      type: "tabs",
      tabs: [
        {
          label: "Overview",
          fields: [
            {
              type: "row",
              fields: [
                { name: "destination", type: "text", required: true },
                { name: "region", type: "select", required: true, options: ["India", "Southeast Asia", "Central Asia"] },
              ],
            },
            { name: "tagline", type: "text", required: true, admin: { description: "One line shown on the trip card." } },
            { name: "summary", type: "textarea", required: true },
            { name: "image", type: "upload", relationTo: "media", required: true, label: "Main photo" },
            {
              type: "row",
              fields: [
                {
                  name: "nights",
                  type: "number",
                  min: 1,
                  admin: { description: "Leave empty if the length varies or isn't fixed." },
                },
                {
                  name: "durationLabel",
                  type: "text",
                  label: "Length (if nights is empty)",
                  admin: { placeholder: "4–7 days" },
                },
              ],
            },
            {
              type: "row",
              fields: [
                { name: "groupSize", type: "text", label: "Group", admin: { placeholder: "Min 6 people" } },
                { name: "style", type: "text", required: true, admin: { placeholder: "Group tour" } },
              ],
            },
            lineList("highlights", "Highlights"),
          ],
        },
        {
          label: "Prices",
          fields: [
            {
              name: "fromPrice",
              type: "number",
              required: true,
              min: 0,
              label: "From price (₹ per person)",
              admin: { description: "The lowest price, shown as “From ₹…” on cards." },
            },
            {
              name: "priceOptions",
              type: "array",
              labels: { singular: "Price option", plural: "Price options" },
              admin: { description: "For example “Group tour ₹18,000 per person” and “Couple package ₹44,000 per couple”." },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "label", type: "text", required: true },
                    { name: "price", type: "number", required: true, min: 0, label: "Price (₹)" },
                    { name: "note", type: "text", required: true, admin: { placeholder: "per person · twin sharing" } },
                  ],
                },
              ],
            },
            {
              name: "priceTable",
              type: "group",
              label: "Price table (several itineraries)",
              admin: { description: "Optional, for tours with several itineraries priced side by side, like Vietnam." },
              fields: [
                {
                  name: "columns",
                  type: "array",
                  labels: { singular: "Column", plural: "Columns" },
                  admin: { description: "Column headings, for example “3-star” and “4-star”." },
                  fields: [{ name: "name", type: "text", required: true }],
                },
                {
                  name: "rows",
                  type: "array",
                  labels: { singular: "Itinerary", plural: "Itineraries" },
                  fields: [
                    {
                      type: "row",
                      fields: [
                        { name: "name", type: "text", required: true, label: "Itinerary" },
                        { name: "days", type: "text", required: true, admin: { placeholder: "4D / 3N" } },
                      ],
                    },
                    {
                      name: "prices",
                      type: "array",
                      labels: { singular: "Price", plural: "Prices (one per column, in order)" },
                      fields: [{ name: "amount", type: "number", required: true, min: 0, label: "Price (₹)" }],
                    },
                  ],
                },
              ],
            },
            { name: "priceNote", type: "textarea", label: "Price note", admin: { placeholder: "Rates are per person, twin sharing…" } },
          ],
        },
        {
          label: "Dates",
          fields: [
            {
              name: "datesOnRequest",
              type: "checkbox",
              label: "No fixed dates (any date, on request)",
              admin: { description: "Tick for tours that run on dates the group chooses." },
            },
            {
              name: "departures",
              type: "array",
              labels: { singular: "Departure", plural: "Departures" },
              admin: { description: "Past dates are hidden on the website automatically." },
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
                    {
                      name: "seatsLeft",
                      type: "number",
                      min: 0,
                      label: "Seats left",
                      admin: { description: "Leave empty to show “Ask for availability”." },
                    },
                    { name: "closed", type: "checkbox", label: "Booking closed" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Itinerary & inclusions",
          fields: [
            {
              name: "itinerary",
              type: "array",
              labels: { singular: "Day", plural: "Itinerary" },
              fields: [
                {
                  type: "row",
                  fields: [
                    { name: "day", type: "text", required: true, admin: { placeholder: "Day 1" } },
                    { name: "title", type: "text", required: true },
                  ],
                },
                { name: "body", type: "textarea", required: true },
              ],
            },
            lineList("included", "Included"),
            lineList("notIncluded", "Not included"),
            lineList("hotels", "Hotels"),
            lineList("notes", "Good to know"),
          ],
        },
      ],
    },
  ],
};
