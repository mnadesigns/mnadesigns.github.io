import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { stories, extraStories } from "@/data/pages";
import { articles } from "@/data/articles";

export const dynamic = "force-static";

// every page worth finding in search (the placeholder Specialist Clinic Pharmacy page is left out)
export default function sitemap(): MetadataRoute.Sitemap {
  const work = [...stories, ...extraStories].filter((s) => s.slug !== "specialist-clinic-pharmacy").map((s) => ({ url: `${SITE_URL}/work/${s.slug}/`, priority: 0.8 }));
  return [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/stories/`, priority: 0.9 },
    ...work,
    { url: `${SITE_URL}/about/`, priority: 0.7 },
    { url: `${SITE_URL}/resume/`, priority: 0.7 },
    { url: `${SITE_URL}/consulting/`, priority: 0.5 },
    { url: `${SITE_URL}/writing/`, priority: 0.7 },
    ...articles.map((a) => ({ url: `${SITE_URL}/writing/${a.slug}/`, priority: 0.6 })),
  ];
}
