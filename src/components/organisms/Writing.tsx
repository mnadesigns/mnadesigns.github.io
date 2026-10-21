import Link from "next/link";
import { articles, articleTag } from "@/data/articles";
import { ArticleThumb } from "@/components/atoms/ArticleThumb";
import { Arrow, BtnCircle } from "@/components/atoms/Buttons";
import { Reveal } from "@/components/atoms/Reveal";

export function Writing() {
  return (
    <section className="writing-band" id="writing">
      <div className="shell">
        <Reveal>
          <div className="sec-intro">
            <div>
              <h2 className="h2">Read<em>.</em></h2>
              <p className="sec-sub">Guides to the AI-augmented pipelines I use, and notes from experiments.</p>
            </div>
            <BtnCircle href="/writing/" label="All writing" />
          </div>
        </Reveal>
        <Reveal>
          <div className="wr-wall">
            {articles.slice(0, 4).map((e) => (
              <Link key={e.slug} href={`/writing/${e.slug}/`} className="wr-piece">
                <span className="wr-art"><ArticleThumb e={e} /></span>
                <span className="wr-label">
                  <span className="wr-label-meta">{articleTag(e)} · {e.date}</span>
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
