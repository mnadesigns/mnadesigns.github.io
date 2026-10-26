import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export const dynamic = "force-static";

// Search and assistant crawlers are welcome. Letting a company's crawler train its models is a separate choice: nothing here is changed for it.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: ["Googlebot", "Bingbot", "OAI-SearchBot", "Claude-SearchBot", "Claude-User", "ChatGPT-User", "PerplexityBot"], allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
