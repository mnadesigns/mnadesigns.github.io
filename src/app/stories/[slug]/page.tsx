import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "@/data/pages";
import { Doors } from "@/components/organisms/Doors";
import { Reveal } from "@/components/atoms/Reveal";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stories.find((x) => x.slug === slug);
  return { title: s ? `${s.name} — Muhammad Naeem` : "Story" };
}

export default async function Story({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = stories.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const s = stories[i];
  const next = stories[(i + 1) % stories.length];
  const [big, ...rest] = s.stats;
  return (
    <main className="st-page">
      <section className="st-hero">
        <div className="st-hero-inner">
          <Link href="/stories/" className="st-back"><span>←</span> All stories</Link>
          <div className="st-eyebrow">{s.co}</div>
          <h1 className="st-primary">{s.name}</h1>
          <p className="st-secondary">{s.role}, {s.period}</p>
          <p className="st-desc">{s.line}</p>
        </div>
        <span className="st-scroll">Scroll</span>
      </section>

      <section className="st-stakes">
        <div className="st-stakes-inner">
          <Reveal>
            <div className="st-stakes-layout">
              <div className="st-stakes-stats">
                <div className="st-stat st-stat--big"><div className="val">{big.v}</div><div className="label">{big.l}</div></div>
                {rest.length > 0 && (
                  <div className="st-stakes-supporting">
                    {rest.map((x) => (
                      <div className="st-stat" key={x.l}><div className="val">{x.v}</div><div className="label">{x.l}</div></div>
                    ))}
                  </div>
                )}
              </div>
              <div className="st-stakes-context">
                <h2>The <span className="accent">context</span></h2>
                <p>{s.context}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="st-story">
        <div className="st-story-inner">
          <Reveal>
            <div className="st-story-head"><h2>What I did</h2></div>
          </Reveal>
          {s.chapters.map((c, k) => (
            <article className="st-chapter" key={c.t}>
              <div className="st-chapter-index"><span className="st-chapter-num">{String(k + 1).padStart(2, "0")}</span></div>
              <div className="st-chapter-body">
                <h3>{c.t}</h3>
                {c.ps.map((t, j) => <p key={j}>{t}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <Link href={`/stories/${next.slug}/`} className="st-next">
        <div className="st-next-inner">
          <div><span className="st-next-kicker">Next story</span><span className="st-next-title">{next.name}</span></div>
        </div>
      </Link>
      <Doors />
    </main>
  );
}
