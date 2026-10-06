import Link from "next/link";
import { essaysIndex, pods } from "@/data/pages";
import { Doors } from "@/components/organisms/Doors";
import { Reveal } from "@/components/atoms/Reveal";
import { Arrow } from "@/components/atoms/Buttons";

export const metadata = { title: "Writing — Your Name" };

export default function Writing() {
  return (
    <main>
      <section className="wr-hero">
        <div className="wr-hero-inner">
          <p className="wr-hero-kicker">Writing</p>
          <h1 className="wr-hero-title">Writing<em>.</em></h1>
          <p className="wr-hero-sub">A short italic line describing what you write about and why.</p>
        </div>
      </section>

      <section className="wr-list">
        <p className="wr-list-label">All essays</p>
        {essaysIndex.map((e) => (
          <Link key={e.slug} href={`/writing/${e.slug}/`} className="wr-row">
            <span className="wr-row-thumb"><span className="ph" /></span>
            <span className="wr-row-content">
              <span className="wr-row-meta">{e.date} · {e.meta}</span>
              <span className="wr-row-title">{e.title}</span>
              <span className="wr-row-excerpt">A one or two sentence excerpt that previews the essay and makes someone want to read it.</span>
            </span>
            <span className="wr-row-go"><Arrow /></span>
          </Link>
        ))}
      </section>

      <section className="wr-pods">
        <Reveal>
          <header className="wr-pods-head">
            <p className="wr-pods-kicker">Conversations</p>
            <h2 className="wr-pods-heading">On the <em>mic.</em></h2>
            <p className="wr-pods-sub">A short line about podcasts and talks you have joined.</p>
          </header>
          <div className="wr-pods-grid">
            {pods.map((p) => (
              <a key={p.title} href="#" className="wr-pod">
                <span className="wr-pod-thumb">
                  <svg className="wr-pod-play" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
                </span>
                <span className="wr-pod-meta">
                  <span className="wr-pod-channel">{p.channel}</span>
                  <span className="wr-pod-title">{p.title}</span>
                  <span className="wr-pod-date">{p.date}</span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </section>
      <Doors />
    </main>
  );
}
