/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { stories } from "@/data/pages";
import { storyPages } from "@/data/storyPages";
import { WorkFilmBox } from "./WorkFilmBox";
import styles from "./MoreByMna.module.css";

// The three works as 16:9 cards. SRED.io and QuodArca play their slides in the card, like on the Work page; the page being viewed is marked and works like the others.
export function MoreByMna({ current }: { current: string }) {
  return (
    <section className={`shell ${styles.wrap}`}>
      <h2 className={styles.h2}>More by <em>MNA.</em></h2>
      <div className={styles.row}>
        {stories.map((s) => {
          const here = s.slug === current;
          return (
            <Link key={s.slug} href={`/work/${s.slug}/`} className={styles.card} aria-current={here ? "page" : undefined}>
              <div className={styles.media}>
                {s.slug === "sred-io" || s.slug === "quodarca"
                  ? <WorkFilmBox slug={s.slug} />
                  : <img src={storyPages[s.slug].poster} alt={s.name} width={1920} height={1080} loading="lazy" />}
              </div>
              <div className={styles.meta}>
                <span className={styles.name}>{s.name}</span>
                {here && <span className={styles.here}>Viewing</span>}
                <span className={styles.arrow} aria-hidden="true">↗</span>
              </div>
              <p className={styles.line}>{storyPages[s.slug].secondary}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
