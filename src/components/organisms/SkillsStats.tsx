import { skillChips, stats } from "@/data/site";
import { ChipsCircle } from "./ChipsCircle";
import { Stat } from "./Record";
import styles from "./SkillsStats.module.css";

// Two cards below the hero: a circle of draggable chips that drop in, and a brand-coloured card holding the record stats
// (the same count-up stats that used to be a separate "The record" section).
export function SkillsStats() {
  return (
    <section className={styles.band} aria-label="Skills and numbers">
      <div className={styles.grid}>
        <div className={styles.cardLeft}>
          <ChipsCircle chips={skillChips} />
        </div>
        <div className={styles.cardRight}>
          <h2 className={styles.title}>Results, in numbers</h2>
          {stats.map((s) => (
            <Stat key={s.label} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
