import { notFound } from "next/navigation";

// The site and the admin each have their own root layout, so unknown addresses
// are caught here to show the site's own 404 page.
export default function Missing() {
  notFound();
}
