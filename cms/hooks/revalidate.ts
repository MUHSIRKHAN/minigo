import { revalidatePath } from "next/cache";
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";

// The site is small, so any content change refreshes every page on the next visit.
function refreshSite() {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Outside a Next.js request (for example the seed script) there is no cache to refresh.
  }
}

export const revalidateAfterChange: CollectionAfterChangeHook = ({ doc }) => {
  refreshSite();
  return doc;
};

export const revalidateAfterDelete: CollectionAfterDeleteHook = ({ doc }) => {
  refreshSite();
  return doc;
};

export const revalidateHooks = {
  afterChange: [revalidateAfterChange],
  afterDelete: [revalidateAfterDelete],
};
