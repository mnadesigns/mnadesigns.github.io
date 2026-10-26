import { notFound } from "next/navigation";
import { stories, extraStories } from "@/data/pages";
import { storyPages } from "@/data/storyPages";
import { WorkDetailView } from "@/components/organisms/WorkDetailView";

const OG_WORKS = ["sred-io", "quodarca", "mlk-group", "zero-gaspi", "pumba", "vyno", "peers", "applied-electronics", "spoonful-os"];

export function generateStaticParams() {
  return [...stories, ...extraStories].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = [...stories, ...extraStories].find((x) => x.slug === slug);
  const title = s?.name ?? "Work";
  const description = storyPages[slug]?.desc;
  // the share thumbnail of the work (made by scripts/og-images.mjs); a work without one keeps the site thumbnail
  if (!OG_WORKS.includes(slug)) return { title, description };
  const img = `/images/og/${slug}.jpg`;
  return {
    title,
    description,
    openGraph: { type: "website", title: `${title} | Muhammad Naeem`, description, images: [{ url: img, width: 1200, height: 630, alt: title }] },
    twitter: { card: "summary_large_image", title: `${title} | Muhammad Naeem`, description, images: [img] },
  };
}

export default async function WorkDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (![...stories, ...extraStories].some((x) => x.slug === slug)) notFound();
  return <WorkDetailView slug={slug} />;
}
