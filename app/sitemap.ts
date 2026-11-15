import type { MetadataRoute } from "next";
import { navGroups } from "@/components/styleguide/nav-data";
import { SITE_URL } from "@/lib/site";

// Every page in the sidebar navigation, generated from the same source
// (components/styleguide/nav-data.ts) — new pages are included automatically.
// "/" itself redirects to the Introduction page, so only the target is listed.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const slugs = [...new Set(navGroups.flatMap((g) => g.items.map((i) => i.slug)))];
  return slugs.map((slug) => ({ url: `${SITE_URL}/styleguide/${slug}`, lastModified }));
}
