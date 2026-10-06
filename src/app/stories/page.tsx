import Link from "next/link";
import { stories, storiesIndex as s } from "@/data/pages";
import { Doors } from "@/components/organisms/Doors";
import { Reveal } from "@/components/atoms/Reveal";

export const metadata = { title: "Stories — Muhammad Naeem" };

export default function Stories() {
  return (
    <main>
      <header className="sti-hero shell">
        <Reveal className="sti-hero-in">
          <div className="sti-kicker"><span className="sti-kicker-rule" />Stories<span className="sti-kicker-rule" /></div>
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
        {stories.map((f) => (
          <Reveal key={f.slug}>
            <Link href={`/stories/${f.slug}/`} className="sti-feat">
              <div>
                <div className="sti-feat-eyebrow">{f.eyebrow}</div>
                <h2 className="sti-feat-name">{f.name}</h2>
                <p className="sti-feat-sub">{f.line}</p>
                <div className="sti-feat-metrics">
                  {f.stats.slice(0, 2).map((m) => <span key={m.l}><strong>{m.v}</strong>{m.l}</span>)}
                </div>
                <span className="btn-circle"><span className="big"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M5 4h7v7" /></svg></span></span>
              </div>
              <div className="sti-feat-visual">
                <div className="sti-logo-panel">
                  <div className="sti-logo-box">{f.name}</div>
                  <div className="sti-logo-rule" />
                  <div className="sti-logo-cap">{f.cap}</div>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </section>
      <Doors />
    </main>
  );
}
