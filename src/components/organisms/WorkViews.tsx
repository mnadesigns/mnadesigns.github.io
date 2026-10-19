"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Code, PenTool, Rocket } from "lucide-react";
import type { WorkAnnotated as Annotated, WorkCompare as Compare, WorkChapter as Chapter, WorkIntro as Intro, WorkLoop as Loop, WorkPan as Pan, WorkPairs as Pairs, WorkSitemap as Sitemap } from "@/data/workDetails";

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
    <>
    <section className="wk-intro" aria-label={intro.label}>
      <p className="wk-intro-label">{intro.label}</p>
      <motion.h2 className="wk-intro-head" {...rise(0, calm)}><Marked text={intro.headline} /></motion.h2>
      {intro.body && <motion.p className="wk-intro-body" {...rise(1, calm)}>{intro.body}</motion.p>}
      <dl className="wk-intro-rows">
        {intro.rows.map((r, i) => (
          <motion.div className="wk-intro-row" key={r.l} {...rise(i + 1, calm)}><dt>{r.l}</dt><dd>{r.v}</dd></motion.div>
        ))}
      </dl>
    </section>
    {intro.did && (
      <section className="wk-did" aria-label={intro.didLabel}>
        <p className="wk-did-label">{intro.didLabel}</p>
        <ul>
          {intro.did.map((d, i) => <motion.li key={d} {...rise(i, calm)}>{d}</motion.li>)}
        </ul>
      </section>
    )}
    </>
  );
}

// where the screens sit in the product's navigation, under the SRED.io logo: the lit boxes are the ones this case study designed.
export function WorkSitemap({ map }: { map: Sitemap }) {
  const calm = !!useReducedMotion();
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
        <div className="wk-map-groups">
          {map.groups.map((g, i) => (
            <motion.div className={`wk-map-group${g.designed ? " is-on" : ""}`} key={g.name} {...rise(i + 2, calm)}>
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

// a chapter of the story (the problem, the strategy) as a large block of type, dark or light
export function WorkChapter({ chapter }: { chapter: Chapter }) {
  const calm = !!useReducedMotion();
  return (
    <section className={`wk-chap wk-chap--${chapter.tone}`} aria-label={chapter.title}>
      <p className="wk-chap-eyebrow">{chapter.eyebrow}</p>
      <motion.h2 className="wk-chap-title" {...rise(0, calm)}>{chapter.title}</motion.h2>
      <div className="wk-chap-body">{chapter.body.map((p, i) => <motion.p key={p} {...rise(i + 1, calm)}>{p}</motion.p>)}</div>
      {chapter.steps && (
        <ol className="wk-chap-steps">
          {chapter.steps.map((st, i) => (
            <motion.li key={st.t} {...rise(i, calm)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <h3>{st.t}</h3>
              <p>{st.d}</p>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}

// each challenge next to what the screen does about it, with the detail of the screen cut at full resolution
export function WorkPairs({ pairs }: { pairs: Pairs }) {
  const calm = !!useReducedMotion();
  return (
    <section className="wk-flow" aria-label={pairs.title}>
      <Head title={pairs.title} note={pairs.note} />
      <ol className="wk-pairs">
        {pairs.pairs.map((p) => (
          <motion.li className={`wk-pair${p.wide ? " wk-pair--wide" : ""}`} key={p.challenge} {...rise(0, calm)}>
            <div className="wk-pair-text">
              <div>
                <p className="wk-pair-tag">Challenge</p>
                <h3>{p.challenge}</h3>
              </div>
              <div>
                <p className="wk-pair-tag wk-pair-tag--sol">Solution</p>
                <p>{p.solution}</p>
              </div>
            </div>
            <figure className="wk-pair-shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} loading="lazy" draggable={false} />
            </figure>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

// one screen with numbered markers; each marker shows its note in a tooltip on hover, or on tap (touch screens). Tapping anywhere else closes it.
export function WorkAnnotated({ ann }: { ann: Annotated }) {
  const [open, setOpen] = useState<number | null>(null);
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open === null) return;
    const away = (e: PointerEvent) => { if (!stage.current?.contains(e.target as Node)) setOpen(null); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); };
    document.addEventListener("pointerdown", away);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("pointerdown", away); document.removeEventListener("keydown", esc); };
  }, [open]);
  return (
    <section className="wk-flow" aria-label={ann.title}>
      <Head title={ann.title} note={ann.note} />
      <div className="wk-ann">
        <div className="wk-ann-stage" ref={stage} style={{ aspectRatio: ann.ratio }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ann.src} alt={ann.alt} width={3126} height={Math.round(3126 / ann.ratio)} loading="lazy" draggable={false} />
          <button type="button" className="wk-flow-open" data-lightbox-src={ann.src} data-lightbox-alt={ann.alt} aria-label={`View ${ann.alt} full size`} />
          {ann.marks.map((m, i) => (
            <button
              type="button"
              key={m.t}
              className={`wk-ann-dot${open === i ? " is-open" : ""}${m.x > 62 ? " is-left" : ""}${m.y < 28 ? " is-below" : ""}`}
              style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${i * 0.5}s` }}
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            >
              <b>{i + 1}</b>
              <span className="wk-ann-tip" role="tooltip"><strong>{m.t}</strong>{m.d}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

// a wide picture that drifts across its frame as the page scrolls past, and settles in when it arrives; a click opens it in the full view
export function WorkPan({ pan }: { pan: Pan }) {
  const ref = useRef<HTMLElement>(null);
  const calm = !!useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-2%", "2%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["1.8%", "-1.8%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.05, 1.045]);
  return (
    <section className="wk-pan" ref={ref} style={{ aspectRatio: pan.ratio }} aria-label={pan.alt}>
      <motion.img
        src={pan.src}
        alt={pan.alt}
        width={2000}
        height={Math.round(2000 / pan.ratio)}
        loading="lazy"
        draggable={false}
        style={calm ? undefined : { x, y, scale }}
        initial={calm ? false : { opacity: 0.001 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-5% 0px" }}
        transition={{ duration: 0.8, ease: EASE }}
      />
      <button type="button" className="wk-flow-open" data-lightbox-src={pan.src} data-lightbox-alt={pan.alt} aria-label={`View ${pan.alt} full size`} />
    </section>
  );
}

// two screens side by side, each opening full size on a click
export function WorkCompare({ compare }: { compare: Compare }) {
  const calm = !!useReducedMotion();
  return (
    <section className="wk-flow" aria-label={compare.title}>
      <Head title={compare.title} note={compare.note} />
      <div className="wk-compare">
        {compare.shots.map((sh, i) => (
          <motion.figure className="wk-compare-shot" key={sh.src} {...rise(i, calm)}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={sh.src} alt={sh.alt} width={3126} height={1724} loading="lazy" draggable={false} />
            <figcaption>{sh.label}</figcaption>
            <button type="button" className="wk-flow-open" data-lightbox-src={sh.src} data-lightbox-alt={sh.alt} aria-label={`View ${sh.alt} full size`} />
          </motion.figure>
        ))}
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
