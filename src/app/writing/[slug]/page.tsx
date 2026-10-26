import Link from "next/link";
import { notFound } from "next/navigation";
import { articles, articleTag, readTime } from "@/data/articles";
import { Illustration } from "@/components/atoms/Illustration";
import { ArticleThumb } from "@/components/atoms/ArticleThumb";
import { PromptBlock } from "@/components/organisms/PromptBlock";
import { prompts } from "@/data/prompts";
import { BackLink } from "@/components/organisms/PageParts";
import { Doors } from "@/components/organisms/Doors";
import { JsonLd } from "@/components/atoms/JsonLd";
import { abs, breadcrumbs, clip, isoMonth } from "@/lib/seo";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = articles.find((x) => x.slug === slug);
  return {
    title: a ? a.title : "Writing",
    description: clip(a?.excerpt),
    alternates: { canonical: `/writing/${slug}/` },
    openGraph: { type: "article", url: `/writing/${slug}/`, title: a?.title, description: clip(a?.excerpt), publishedTime: a ? isoMonth(a.date) : undefined, authors: ["Muhammad Naeem"] },
  };
}

export default async function Article({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = articles.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const a = articles[i];
  const next = articles[(i + 1) % articles.length];
  return (
    <main>
      <JsonLd
        data={[
          { "@type": "Article", "@id": abs(`/writing/${slug}/#article`), headline: a.title, description: a.excerpt, datePublished: isoMonth(a.date), inLanguage: "en", mainEntityOfPage: abs(`/writing/${slug}/`), author: { "@id": abs("/#person") }, publisher: { "@id": abs("/#person") } },
          breadcrumbs([{ name: "Home", path: "/" }, { name: "Read", path: "/writing/" }, { name: a.title, path: `/writing/${slug}/` }]),
        ]}
      />
      <section className="ar-hero">
        <div className="ar-pipe">{a.n ? `AI-augmented pipeline ${a.n}` : a.tag ?? "Experiment"}</div>
        <h1 className="ar-title">{a.title}</h1>
        <div className="ar-meta"><span>{a.date}</span><span>{readTime(a)}</span></div>
      </section>
      <article className="article-body">
        {a.body.map((b, k) =>
          "h" in b ? <h2 key={k}>{b.h}</h2>
          : "p" in b ? <p key={k}>{b.p}</p>
          : "ul" in b ? <ul key={k} className="ar-list">{b.ul.map((t) => <li key={t}>{t}</li>)}</ul>
          : "note" in b ? <aside key={k} className="ar-note">{b.note}</aside>
          : "prompt" in b ? <PromptBlock key={k} title={b.prompt.title} text={prompts[b.prompt.id]} />
          : "src" in b ? <p key={k} className="ar-src"><a href={b.src.href} target="_blank" rel="noopener noreferrer">{b.src.label} ↗</a></p>
          : <figure key={k} className="ar-fig">{a.image ? <ArticleThumb e={a} sizes="(max-width: 760px) 100vw, 720px" /> : <Illustration kind={b.fig} />}<figcaption>{b.cap}</figcaption></figure>
        )}
        <Link href={`/writing/${next.slug}/`} className="ar-next">
          <span className="ar-next-kicker">Next · {articleTag(next)}</span>
          <span className="ar-next-title">{next.title}</span>
        </Link>
        <BackLink href="/writing/" label="All writing" />
      </article>
      <Doors />
    </main>
  );
}
