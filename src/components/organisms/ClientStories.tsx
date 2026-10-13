import { Fragment } from "react";
import Link from "next/link";
import { clientStories, clientStoriesIntro, type ClientStory } from "@/data/clientStories";
import { Reveal } from "@/components/atoms/Reveal";
import { BtnCircle } from "@/components/atoms/Buttons";
import { site } from "@/data/site";
import styles from "./ClientStories.module.css";

// A Ploy-style wall of notes: each review is a pinned note, a little crooked, with the key phrase in bold. The notes are all white, and the last note, in the brand blue, is one big button with just its title.
const TILT = [-1.4, 0.9, -0.6, 1.3, -1.1, 0.5, -0.9, 1.1, -0.4]; // degrees, one per note

const initials = (name: string) => name.replace(/\./g, "").split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

// the paragraph with the chosen phrases wrapped in <strong>
function Rich({ text, bold = [] }: { text: string; bold?: string[] }) {
  const hit = bold.find((b) => text.includes(b));
  if (!hit) return <>{text}</>;
  const [a, ...rest] = text.split(hit);
  return <>{a}<strong>{hit}</strong><Rich text={rest.join(hit)} bold={bold} /></>;
}

function Note({ s, i }: { s: ClientStory; i: number }) {
  return (
    <figure className={`${styles.note} ${styles.white}`} style={{ "--tilt": `${TILT[i % TILT.length]}deg` } as React.CSSProperties}>
      <blockquote>{s.quote.map((p) => <p key={p}><Rich text={p} bold={s.bold} /></p>)}</blockquote>
      <figcaption>
        <span className={styles.av}>
          {s.photo === false ? <span className={styles.ini}>{initials(s.name)}</span> : <img src={`/images/clients/${s.slug}.webp`} alt="" width={96} height={96} loading="lazy" decoding="async" />}
        </span>
        <span className={styles.who}>
          <span className={styles.name}>{s.name}</span>
          <span className={styles.role}>{s.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function ClientStories() {
  return (
    <section className={styles.section} id="stories">
      <div className="shell">
        <Reveal>
          <header className={styles.head}>
            <div>
              <span className={styles.kicker}>{clientStoriesIntro.kicker}</span>
              <h2 className={styles.h2}>
                <span>Hear stories straight from</span>
                <span className={styles.blue}>the people I helped!</span>
              </h2>
            </div>
            <BtnCircle href={site.linkedin} label="View More" />
          </header>
        </Reveal>
        <Reveal>
          <div className={styles.wall}>
            {clientStories.map((s, i) => <Fragment key={s.slug}><Note s={s} i={i} /></Fragment>)}
            <Link href="/consulting/" data-cursor="light" className={`${styles.note} ${styles.cta}`} style={{ "--tilt": "-0.8deg" } as React.CSSProperties}>
              <span className={styles.ctaTitle}>Your story could be next.</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
