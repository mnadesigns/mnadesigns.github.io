import Link from "next/link";
import type { ReactNode } from "react";
import { Reveal } from "@/components/atoms/Reveal";
import { Arrow } from "@/components/atoms/Buttons";
import { extProps } from "@/lib/links";

export function PageHero({ kicker, title, lead, children, aside }: { kicker: string; title: string; lead?: string; children?: ReactNode; aside?: ReactNode }) {
  return (
    <header className="pg-hero shell">
      <Reveal>
        <div className={aside ? "pg-hero-grid" : undefined}>
          <div>
            <span className="pg-kicker">{kicker}</span>
            <h1 className="pg-title" dangerouslySetInnerHTML={{ __html: title }} />
            {lead && <p className="pg-lead">{lead}</p>}
            {children && <div className="pg-cta">{children}</div>}
          </div>
          {aside}
        </div>
      </Reveal>
    </header>
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="pg-sec shell">
      <Reveal>
        <h2 dangerouslySetInnerHTML={{ __html: title }} />
        {children}
      </Reveal>
    </section>
  );
}

export function Cards({ items, four }: { items: { n?: string; t: string; d: string }[]; four?: boolean }) {
  return (
    <div className={`pg-cards${four ? " four" : ""}`}>
      {items.map((c) => (
        <div className="pg-card" key={c.t}>
          {c.n && <div className="n">{c.n}</div>}
          <h3>{c.t}</h3>
          <p>{c.d}</p>
        </div>
      ))}
    </div>
  );
}

export function Prose({ paragraphs }: { paragraphs: string[] }) {
  return <div className="pg-prose">{paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>;
}

export function Row({ href, name, co, line, plain }: { href?: string; name: string; co?: string; line?: string; plain?: boolean }) {
  const inner = (
    <>
      <span className="pg-row-name">{name}</span>
      <span className="pg-row-meta">{co && <b>{co}</b>}{line}</span>
    </>
  );
  const cls = `pg-row${plain ? " plain" : ""}`;
  return href ? <Link href={href} {...extProps(href)} className={cls}>{inner}</Link> : <div className={cls}>{inner}</div>;
}

export function Media({ label }: { label: string }) {
  return <div className="pg-media"><div className="ph-box">{label}</div></div>;
}

export function BackLink({ href, label }: { href: string; label: string }) {
  return <Link href={href} {...extProps(href)} className="btn-text">{label} <Arrow /></Link>;
}
