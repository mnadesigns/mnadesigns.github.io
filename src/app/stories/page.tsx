/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { storiesIndex as s } from "@/data/pages";
import { Doors } from "@/components/organisms/Doors";
import { Reveal } from "@/components/atoms/Reveal";
import { WorkFilmBox } from "@/components/organisms/WorkFilmBox";

export const metadata = { title: "Work", description: "Selected work by Muhammad Naeem: a first design system and 17+ microservices at SRED.io, a multi-platform design system at QuodArca, and 50+ Australian brands at MLK Group." };

export default function Stories() {
  return (
    <main>
      <header className="sti-hero shell">
        <Reveal className="sti-hero-in">
          <h1 className="sti-title">The <em>work.</em></h1>
          <p className="sti-lede">{s.lede}</p>
          <div className="sti-stats">
            {s.stats.map((x) => (
              <div className="stat" key={x.l}><div className="stat-v">{x.v}</div><div className="stat-l">{x.l}</div></div>
            ))}
          </div>
        </Reveal>
      </header>

      <section className="sti-feats shell">
        {s.features.map((f) => (
          <Reveal key={f.slug}>
            <Link href={`/work/${f.slug}/`} className={`sti-feat${("film" in f && f.film) || f.slug === "mlk-group" ? " sti-feat--film" : ""}`}>
              <div>
                <div className="sti-feat-eyebrow">{f.eyebrow}</div>
                <h2 className="sti-feat-name">{f.name}</h2>
                <p className="sti-feat-sub">{f.sub}</p>
                <div className="sti-feat-metrics">
                  {f.metrics.map((m) => <span key={m.l}><strong>{m.v}</strong>{m.l}</span>)}
                </div>
                <span className="btn-circle"><span className="big"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M5 4h7v7" /></svg></span></span>
              </div>
              <div className="sti-feat-visual">
                {f.slug === "mlk-group" || ("film" in f && f.film) ? <WorkFilmBox slug={f.slug} /> : (
                  <div className="sti-logo-panel">
                    {f.logo ? <img className="sti-logo-img" src={f.logo} alt={f.name} /> : <div className="sti-logo-box">{f.name}</div>}
                    <div className="sti-logo-rule" />
                    <div className="sti-logo-cap">{f.cap}</div>
                  </div>
                )}
              </div>
            </Link>
          </Reveal>
        ))}
      </section>

      <section className="sti-rest shell" id="and-more">
        <Reveal>
          <div className="sec-intro">
            <div>
              <h2 className="h2">And <em>more.</em></h2>
              <p className="sec-sub">{s.moreSub}</p>
            </div>
          </div>
          <div className="sti-index">
            {s.more.map((m) => (
              <Link key={m.name} href={`/work/${m.slug}/`} className="sti-row">
                <div className="sti-row-meta">
                  <span className="sti-row-name">{m.name}</span>
                  <span className="sti-row-stat"><b>{m.v}</b><i>{m.l}</i></span>
                  <span className="sti-row-line">{m.line}</span>
                  <span className="btn-circle"><span className="big"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M5 4h7v7" /></svg></span></span>
                </div>
                {m.slug === "specialist-clinic-pharmacy" ? <div className="sti-row-film"><WorkFilmBox slug={m.slug} /></div> : m.slug === "zero-gaspi" ? <div className="sti-row-film"><WorkFilmBox slug={m.slug} scene="zerogaspi" /></div> : <div className={`sti-row-box${"cover" in m && m.cover ? " sti-row-box--cover" : ""}`} style={{ background: m.bg }}>{m.video ? <video src={m.video} poster={m.shot} autoPlay muted loop playsInline aria-label={m.name} /> : m.shot ? <img src={m.shot} alt={m.name} loading="lazy" draggable={false} /> : null}</div>}
              </Link>
            ))}
          </div>
          <p className="sti-more" dangerouslySetInnerHTML={{ __html: s.footer }} />
        </Reveal>
      </section>
      <Doors />
    </main>
  );
}
