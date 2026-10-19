"use client";

import { Fragment } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Code, PenTool, Rocket } from "lucide-react";
import type { WorkIntro as Intro, WorkLoop as Loop, WorkSitemap as Sitemap } from "@/data/workDetails";

// The set pieces of a case study page, built from the work's own facts and screens (inspired by Hyperactive's Behance cases and the Conceptzilla shots):
// an opening statement, a map of where the screens sit in the product, and the design to code loop. Everything arrives by moving, decelerating (no fades from nothing).
const EASE = [0.22, 1, 0.36, 1] as const;
const rise = (i = 0, calm = false) => (calm ? {} : { initial: { y: 22, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.7, ease: EASE, delay: i * 0.07 } });

const Head = ({ title, note }: { title: string; note: string }) => (
  <header className="wk-flow-head">
    <h2 className="wk-flow-title">{title}</h2>
    <p className="wk-flow-note">{note}</p>
  </header>
);

// "plain **bold** plain": the bold words of a headline
const Marked = ({ text }: { text: string }) => <>{text.split("**").map((t, i) => (i % 2 ? <strong key={i}>{t}</strong> : <Fragment key={i}>{t}</Fragment>))}</>;

export function WorkIntro({ intro }: { intro: Intro }) {
  const calm = !!useReducedMotion();
  return (
    <section className="wk-intro" aria-label={intro.label}>
      <p className="wk-intro-label">{intro.label}</p>
      <motion.h2 className="wk-intro-head" {...rise(0, calm)}><Marked text={intro.headline} /></motion.h2>
      <dl className="wk-intro-rows">
        {intro.rows.map((r, i) => (
          <motion.div className="wk-intro-row" key={r.l} {...rise(i + 1, calm)}><dt>{r.l}</dt><dd>{r.v}</dd></motion.div>
        ))}
      </dl>
    </section>
  );
}

// where the screens sit in the product's navigation, as a tree under the SRED.io logo: the lit boxes are the ones this case study designed. The lines draw in when it scrolls into view.
export function WorkSitemap({ map }: { map: Sitemap }) {
  const calm = !!useReducedMotion();
  const grow = (axis: "X" | "Y", delay = 0) => (calm ? {} : { initial: { [`scale${axis}`]: 0 }, whileInView: { [`scale${axis}`]: 1 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.6, ease: EASE, delay } });
  return (
    <section className="wk-flow" aria-label={map.title}>
      <Head title={map.title} note={map.note} />
      <div className="wk-map" style={{ "--n": map.groups.length } as React.CSSProperties}>
        <motion.div className="wk-map-root" {...rise(0, calm)}>
          {map.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={map.logo} alt={map.root} width={269} height={200} draggable={false} />
          ) : map.root}
        </motion.div>
        <motion.span className="wk-map-stem" aria-hidden="true" {...grow("Y", 0.15)} />
        <div className="wk-map-groups">
          <motion.span className="wk-map-bar" aria-hidden="true" {...grow("X", 0.5)} />
          {map.groups.map((g, i) => (
            <motion.div className={`wk-map-group${g.designed ? " is-on" : ""}`} key={g.name} {...rise(i + 2, calm)}>
              <motion.span className="wk-map-drop" aria-hidden="true" {...grow("Y", 0.9)} />
              <p className="wk-map-box">{g.name}</p>
              <ul>
                {g.items.map((it) => <li key={it.t} className={it.designed ? "is-on" : undefined}>{it.t}</li>)}
              </ul>
            </motion.div>
          ))}
        </div>
        <p className="wk-map-key"><i />Designed in this case study</p>
      </div>
    </section>
  );
}

// the design to code loop on a dark panel; a light runs along the line from step to step
const LOOP_ICONS = [PenTool, Code, Rocket];
export function WorkLoop({ loop }: { loop: Loop }) {
  const calm = !!useReducedMotion();
  return (
    <section className="wk-flow" aria-label={loop.title}>
      <Head title={loop.title} note={loop.note} />
      <ol className={`wk-loop${calm ? " is-calm" : ""}`}>
        {loop.steps.map((s, i) => {
          const Icon = LOOP_ICONS[i % LOOP_ICONS.length];
          return (
            <motion.li className="wk-loop-step" key={s.t} {...rise(i, calm)}>
              <span className="wk-loop-ico"><Icon aria-hidden="true" /></span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </motion.li>
          );
        })}
      </ol>
    </section>
  );
}
