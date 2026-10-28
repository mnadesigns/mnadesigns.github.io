import { notFound } from "next/navigation";
import { stories, extraStories, showcaseMore } from "@/data/pages";

const all = [...stories, ...extraStories, ...showcaseMore];
import { WorkDetailView } from "@/components/organisms/WorkDetailView";

// One work inside the private portfolio: no contact banner, no more-by list, no footer doors.
export function generateStaticParams() {
  return all.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = all.find((x) => x.slug === slug);
  return { title: s?.name ?? "Portfolio", robots: { index: false, follow: false } };
}

export default async function ShowcaseWork({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!all.some((x) => x.slug === slug)) notFound();
  return <WorkDetailView slug={slug} share />;
}
