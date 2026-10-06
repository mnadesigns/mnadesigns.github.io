import Link from "next/link";
import { notFound } from "next/navigation";
import { stories, storyPage as p } from "@/data/pages";
import { StoryGate } from "@/components/organisms/StoryGate";
import { Doors } from "@/components/organisms/Doors";
import { Reveal } from "@/components/atoms/Reveal";

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export default async function Story({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = stories.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const s = stories[i];
  const next = stories[(i + 1) % stories.length];
  return (
    <StoryGate>
      <main className="st-page">
        <section className="st-hero">
          <div className="st-hero-inner">
            <Link href="/stories/" className="st-back"><span>←</span> All stories</Link>
            <div className="st-eyebrow">{s.co}</div>
            <h1 className="st-primary">{s.name}</h1>
            <p className="st-secondary">{p.secondary}</p>
            <p className="st-desc">{s.line} <em>{p.desc}</em></p>
          </div>
          <span className="st-scroll">Scroll</span>
        </section>

        <section className="st-video"><div className="ph-box">Film placeholder 16:9</div></section>

        <section className="st-stakes">
          <div className="st-stakes-inner">
            <Reveal>
              <div className="st-stakes-layout">
                <div className="st-stakes-stats">
                  <div className="st-stat st-stat--big"><div className="val">{p.stakesBig.v}</div><div className="label">{p.stakesBig.l}</div></div>
                  <div className="st-stakes-supporting">
                    {p.stakesSupporting.map((x) => (
                      <div className="st-stat" key={x.l}><div className="val">{x.v}</div><div className="label">{x.l}</div></div>
                    ))}
                  </div>
                </div>
                <div className="st-stakes-context">
                  <h2 dangerouslySetInnerHTML={{ __html: p.stakesHeading }} />
                  {p.stakesParas.map((t, k) => <p key={k}>{t}</p>)}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="st-arc">
          <div className="st-arc-inner">
            <div className="st-arc-bar">{p.arc.map((a) => <span key={a}>{a}</span>)}</div>
          </div>
        </section>

        <section className="st-story">
          <div className="st-story-inner">
            <Reveal>
              <div className="st-story-head"><h2>{p.storyHeading}</h2><p>{p.storySub}</p></div>
            </Reveal>
            {p.chapters.map((c) => (
              <article className="st-chapter" key={c.n}>
                <div className="st-chapter-index"><span className="st-chapter-num">{c.n}</span><span className="st-chapter-date">{c.d}</span></div>
                <div className="st-chapter-body">
                  <h3>{c.t}</h3>
                  {c.ps.map((t, k) => <p key={k}>{t}</p>)}
                  {c.pull && <p className="st-pull">{c.pull}</p>}
                  {c.image && <div className="st-chapter-image"><div className="ph-box">Screen placeholder</div></div>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="st-cardshow">
          <div className="st-cardshow-inner">{[1, 2, 3].map((n) => <div key={n}><div className="ph-box">Screen {n}</div></div>)}</div>
        </section>

        <section className="st-service">
          <div className="st-service-inner">
            <div className="st-service-head">
              <p className="st-service-eyebrow">{p.serviceEyebrow}</p>
              <h2>{p.serviceHeading}</h2>
              <p className="st-service-lede">{p.serviceLede}</p>
            </div>
            <div className="st-service-cases">
              {p.cases.map((c) => <div className="st-case" key={c.t}><h3>{c.t}</h3><p>{c.p}</p></div>)}
            </div>
          </div>
        </section>

        <Link href={`/stories/${next.slug}/`} className="st-next">
          <div className="st-next-inner">
            <div><span className="st-next-kicker">{p.nextKicker}</span><span className="st-next-title">{next.name}</span></div>
          </div>
        </Link>
        <Doors />
      </main>
    </StoryGate>
  );
}
