import { notFound } from "next/navigation";
import { stories, extraStories } from "@/data/pages";
import { storyPages } from "@/data/storyPages";
import { WorkDetailView } from "@/components/organisms/WorkDetailView";
import { JsonLd } from "@/components/atoms/JsonLd";
import { abs, breadcrumbs, clip } from "@/lib/seo";

const OG_WORKS = ["sred-io", "quodarca", "mlk-group", "zero-gaspi", "pumba", "vyno", "peers", "applied-electronics", "spoonful-os"];
// what each work is, for the page title: a search result should say what the work shows, not only its name
const KIND: Record<string, string> = {
  "sred-io": "SaaS design system case study",
  quodarca: "multi-platform design system case study",
  "mlk-group": "UX/UI design for 50+ brands, case study",
  "zero-gaspi": "food waste marketplace app case study",
  pumba: "street parking iOS app case study",
  vyno: "carpooling app case study",
  peers: "learning platform UX/UI case study",
  "applied-electronics": "website redesign case study",
  "spoonful-os": "family health app case study",
};
const PLACEHOLDER = ["specialist-clinic-pharmacy"]; // a copy of another page until its own story is written: kept out of search

export function generateStaticParams() {
  return [...stories, ...extraStories].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = [...stories, ...extraStories].find((x) => x.slug === slug);
  const name = s?.name ?? "Work";
  const title = `${name}: ${KIND[slug] ?? "UX/UI case study"}`;
  const description = clip(storyPages[slug]?.desc);
  const base = { title, description, alternates: { canonical: `/work/${slug}/` }, ...(PLACEHOLDER.includes(slug) ? { robots: { index: false, follow: true } } : {}) };
  // the share thumbnail of the work (made by scripts/og-images.mjs); a work without one keeps the site thumbnail
  if (!OG_WORKS.includes(slug)) return base;
  const img = `/images/og/${slug}.jpg`;
  return {
    ...base,
    openGraph: { type: "article", url: `/work/${slug}/`, title: `${title} | Muhammad Naeem`, description, images: [{ url: img, width: 1200, height: 630, alt: `${name} case study` }] },
    twitter: { card: "summary_large_image", title: `${title} | Muhammad Naeem`, description, images: [img] },
  };
}

export default async function WorkDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = [...stories, ...extraStories].find((x) => x.slug === slug);
  if (!s) notFound();
  const p = storyPages[slug];
  return (
    <>
      <JsonLd
        data={[
          {
            "@type": "CreativeWork",
            "@id": abs(`/work/${slug}/#work`),
            name: `${s.name}: ${KIND[slug] ?? "UX/UI case study"}`,
            url: abs(`/work/${slug}/`),
            description: p?.desc,
            image: OG_WORKS.includes(slug) ? abs(`/images/og/${slug}.jpg`) : undefined,
            inLanguage: "en",
            author: { "@id": abs("/#person") },
            creator: { "@id": abs("/#person") },
          },
          breadcrumbs([{ name: "Home", path: "/" }, { name: "Work", path: "/stories/" }, { name: s.name, path: `/work/${slug}/` }]),
        ]}
      />
      <WorkDetailView slug={slug} />
    </>
  );
}
