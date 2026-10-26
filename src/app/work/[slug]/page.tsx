import { notFound } from "next/navigation";
import { stories, extraStories } from "@/data/pages";
import { storyPages } from "@/data/storyPages";
import { WorkDetailView } from "@/components/organisms/WorkDetailView";

export function generateStaticParams() {
  return [...stories, ...extraStories].map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = [...stories, ...extraStories].find((x) => x.slug === slug);
  return { title: s?.name ?? "Work", description: storyPages[slug]?.desc };
}

export default async function WorkDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (![...stories, ...extraStories].some((x) => x.slug === slug)) notFound();
  return <WorkDetailView slug={slug} />;
}
