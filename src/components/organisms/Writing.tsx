import Link from "next/link";
import { essays } from "@/data/site";
import { Arrow, BtnCircle } from "@/components/atoms/Buttons";
import { Reveal } from "@/components/atoms/Reveal";

export function Writing() {
  return (
    <section className="writing-band" id="writing">
      <div className="shell">
        <Reveal>
          <div className="sec-intro">
            <div>
              <h2 className="h2">Writing</h2>
              <p className="sec-sub">Essays written to be argued with.</p>
            </div>
            <BtnCircle href="/writing/" label="All writing" />
          </div>
        </Reveal>
        <Reveal>
          <div className="wr-wall">
            {essays.map((e) => (
              <Link key={e.slug} href={`/writing/${e.slug}/`} className="wr-piece">
                <span className="wr-art"><span className="ph" /></span>
                <span className="wr-label">
                  <span className="wr-label-meta">{e.meta}</span>
                  <span className="wr-label-title">{e.title}</span>
                  <span className="btn-text">Read <Arrow /></span>
                </span>
              </Link>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
