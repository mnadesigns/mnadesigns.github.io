import Link from "next/link";
import { essaysIndex } from "@/data/pages";
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
          <p className="wr-hero-sub">Notes on design systems and working with AI, published on Medium.</p>
        </div>
      </section>

      <section className="wr-list">
        <p className="wr-list-label">All essays</p>
        {essaysIndex.map((e) => (
          <Link key={e.title} href={e.href} className="wr-row">
            <span className="wr-row-thumb"><span className="ph" /></span>
            <span className="wr-row-content">
              <span className="wr-row-meta">{e.meta} · {e.date}</span>
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
