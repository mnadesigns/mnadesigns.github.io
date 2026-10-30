import { site } from "@/data/site";

export const SITE_URL = "https://mnadesigns.github.io";
export const abs = (path: string) => SITE_URL + path;
export const sameAs = [site.linkedin, site.medium];

// a search result shows about 155 characters: end at a sentence, else a word, and never cut mid-word
export function clip(text: string | undefined, max = 155): string | undefined {
  if (!text) return text;
  if (text.length <= max) return text;
  const cut = text.slice(0, max + 1);
  const sentence = cut.lastIndexOf(". ");
  if (sentence > max * 0.55) return cut.slice(0, sentence + 1);
  const word = cut.lastIndexOf(" ");
  return cut.slice(0, word > 0 ? word : max).replace(/[,;:\s]+$/, "") + "…";
}

// "October 2026" -> "2026-10"
export function isoMonth(label: string): string | undefined {
  const m = label.match(/([A-Za-z]+)\s+(\d{4})/);
  if (!m) return undefined;
  const i = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"].indexOf(m[1].toLowerCase());
  return i < 0 ? undefined : `${m[2]}-${String(i + 1).padStart(2, "0")}`;
}

export const person = {
  "@type": "Person",
  "@id": abs("/#person"),
  name: site.name,
  url: abs("/"),
  jobTitle: "Lead Product Designer",
  description: "Lead Product Designer and AI product leader: design systems and products for SaaS, fintech and e-commerce, shipped as production UI.",
  knowsAbout: ["Product design", "UX design", "UI design", "Design systems", "Accessibility", "AI-assisted design", "Design to code"],
  sameAs,
};

export const breadcrumbs = (items: { name: string; path: string }[]) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: abs(it.path) })),
});
