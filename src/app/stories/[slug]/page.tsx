import { notFound } from "next/navigation";
import { stories } from "@/data/pages";

// The old case-study address. Every work has one page, /work/<slug>/: this address only sends people (and search engines) there,
// with a canonical pointing at it so the two never compete in search.
export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return { title: "Case study", alternates: { canonical: `/work/${slug}/` }, robots: { index: false, follow: true } };
}

export default async function OldStory({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!stories.some((s) => s.slug === slug)) notFound();
  return (
    <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "0 24px", textAlign: "center" }}>
      <meta httpEquiv="refresh" content={`0; url=/work/${slug}/`} />
      <p>This case study has moved: <a href={`/work/${slug}/`}>open it here</a>.</p>
    </main>
  );
}
