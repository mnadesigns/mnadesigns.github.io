import Link from "next/link";
import { articles, articleTag, readTime } from "@/data/articles";
import { ArticleThumb } from "@/components/atoms/ArticleThumb";
import { Doors } from "@/components/organisms/Doors";
import { Arrow } from "@/components/atoms/Buttons";

export const metadata = { title: "Writing — Muhammad Naeem" };

export default function Writing() {
  return (
    <main>
      <section className="wr-hero">
        <div className="wr-hero-inner">
          <p className="wr-hero-kicker">Writing</p>
          <h1 className="wr-hero-title">Writing<em>.</em></h1>
          <p className="wr-hero-sub">Practical guides to the six AI-augmented pipelines I use: how each one works, step by step, so you can use it too.</p>
        </div>
      </section>

      <section className="wr-list">
        <p className="wr-list-label">All articles · {articles.length}</p>
        {articles.map((e) => (
          <Link key={e.slug} href={`/writing/${e.slug}/`} className="wr-row">
            <span className="wr-row-thumb"><ArticleThumb e={e} /></span>
            <span className="wr-row-content">
              <span className="wr-row-meta">{articleTag(e)} · {e.date} · {readTime(e)}</span>
              <span className="wr-row-title">{e.title}</span>
              <span className="wr-row-excerpt">{e.excerpt}</span>
            </span>
            <span className="wr-row-go"><Arrow /></span>
          </Link>
        ))}
      </section>

      <Doors />
    </main>
  );
}
