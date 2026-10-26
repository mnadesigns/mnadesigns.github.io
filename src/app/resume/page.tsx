import { Fragment } from "react";
import { resume as r } from "@/data/resume";
import { Doors } from "@/components/organisms/Doors";
import { Reveal } from "@/components/atoms/Reveal";
import styles from "./resume.module.css";

export const metadata = { title: "Resume", description: "Resume of Muhammad Naeem, Lead Product Designer: 10+ years across SaaS, fintech and health, building design systems and shipping them as production UI.", alternates: { canonical: "/resume/" } };

// A clone of abmcooks.github.io/resume with this resume's copy: Experience, Selected consulting, Earlier experience, Skills and Education, in the reference's one-column layout.
export default function Resume() {
  return (
    <main>
      <div className={styles.page}>
        <Reveal>
          <header className={styles.header}>
            <div className={styles.top}>
              <div>
                <h1 className={styles.name}>{r.name}</h1>
                <div className={styles.title}>{r.title}</div>
              </div>
              <a className={`btn-sec res-print ${styles.save}`} href={r.pdf} download>
                Save PDF
                <span className="ico"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M8 2v7M5 6.5 8 9.5l3-3M3 13h10" /></svg></span>
              </a>
            </div>
            <div className={styles.contact}>
              {r.contact.map((c, i) => (
                <Fragment key={c.label}>
                  {i > 0 && <span className={styles.sep}>/</span>}
                  <a href={c.href} {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{c.label}</a>
                </Fragment>
              ))}
            </div>
            <p className={styles.summary}>{r.summary}</p>
          </header>
        </Reveal>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          {r.experience.map((e) => (
            <div className={styles.entry} key={e.company + e.dates}>
              <div className={styles.entryHeader}>
                <div>
                  <span className={styles.company}>{e.company}</span>
                  <span className={styles.role}> — {e.role}</span>
                </div>
                <span className={styles.meta}>{e.dates} · {e.place}</span>
              </div>
              {e.desc && <div className={styles.desc}>{e.desc}</div>}
              <ul>{e.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Selected consulting</h2>
          <p className={styles.lede}>{r.consultingIntro}</p>
          {r.consulting.map((c) => (
            <div className={styles.consult} key={c.name}>
              <div className={styles.consultHeader}>
                <span className={styles.consultName}>{c.name}</span>
                <span className={styles.consultMeta}>{c.kind}</span>
              </div>
              <p className={styles.consultDesc}>{c.desc}</p>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Earlier experience</h2>
          {r.earlier.map((e) => (
            <div className={styles.consult} key={e.role}>
              <div className={styles.consultHeader}>
                <span className={styles.consultName}>{e.role}</span>
                <span className={styles.consultMeta}>{e.dates}</span>
              </div>
              <p className={styles.consultDesc}>{e.org}</p>
            </div>
          ))}
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Skills</h2>
          <div className={styles.expertiseGrid}>
            {r.skills.map((g) => (
              <div key={g.cat}>
                <div className={styles.expertiseCat}>{g.cat}</div>
                <div className={styles.expertiseItems}>{g.items.join(", ")}</div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Education</h2>
          <div className={styles.eduRow}>
            <span className={styles.eduSchool}>{r.education.school}</span>
            <span className={styles.eduYear}>{r.education.dates}</span>
          </div>
          <div className={styles.eduDegree}>{r.education.degree}</div>
        </section>
      </div>
      <Doors />
    </main>
  );
}
