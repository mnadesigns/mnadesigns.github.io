import { notFound } from "next/navigation";
import { articleBody, essaysIndex } from "@/data/pages";
import { BackLink } from "@/components/organisms/PageParts";
import { Doors } from "@/components/organisms/Doors";

export function generateStaticParams() {
  return essaysIndex.map((e) => ({ slug: e.slug }));
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const e = essaysIndex.find((x) => x.slug === slug);
  if (!e) notFound();
  return (
    <main>
      <section className="ar-hero">
        <h1 className="ar-title">{e.title}</h1>
        <div className="ar-meta"><span>{e.date}</span><span>{e.meta}</span></div>
      </section>
      <article className="article-body">
        {articleBody.map((b, i) => ("h" in b ? <h2 key={i}>{b.h}</h2> : <p key={i}>{b.p}</p>))}
        <BackLink href="/writing/" label="All writing" />
      </article>
      <Doors />
    </main>
  );
}
