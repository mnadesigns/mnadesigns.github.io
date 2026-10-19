"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Code, PenTool, Rocket } from "lucide-react";
import { ToolIcon } from "@/components/atoms/ToolIcons";
import type { WorkAnnotated as Annotated, WorkBeforeAfter as BeforeAfter, WorkChapter as Chapter, WorkIntro as Intro, WorkLoop as Loop, WorkPan as Pan, WorkPairs as Pairs, WorkSitemap as Sitemap } from "@/data/workDetails";

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

// the logos of the tools used, each in its own colours (the Figma mark is drawn here, Flowbite is its official file, Claude and Cursor are Simple Icons paths); shown only to say which tools are used
function ToolLogo({ id }: { id: "figma" | "flowbite" | "claude" | "cursor" }) {
  if (id === "figma") return (
    <svg viewBox="0 0 38 57" aria-hidden="true">
      <path fill="#F24E1E" d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19V0z" /><path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" /><path fill="#A259FF" d="M19 19H9.5a9.5 9.5 0 0 0 0 19H19V19z" /><path fill="#1ABCFE" d="M28.5 19a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z" /><path fill="#0ACF83" d="M9.5 38H19v9.5A9.5 9.5 0 1 1 9.5 38z" />
    </svg>
  );
  // eslint-disable-next-line @next/next/no-img-element
  if (id === "flowbite") return <img src="/images/brands/flowbite.svg" alt="" width={32} height={33} />;
  return <ToolIcon name={id} className={id === "claude" ? "wk-tool-claude" : "wk-tool-cursor"} />;
}

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
          <motion.div className="wk-intro-row" key={r.l} {...rise(i + 1, calm)}><dt>{r.l}</dt><dd>{r.tools ? <ul className="wk-tools">{r.tools.map((t) => <li key={t.id} title={t.name}><ToolLogo id={t.id} /><span className="wk-sr">{t.name}</span></li>)}</ul> : r.v}</dd></motion.div>
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
            <Fragment key={m.t}>
              <button
                type="button"
                className={`wk-ann-dot${open === i ? " is-open" : ""}`}
                style={{ left: `${m.x}%`, top: `${m.y}%`, animationDelay: `${i * 0.5}s` }}
                aria-expanded={open === i}
                onClick={() => setOpen(open === i ? null : i)}
              >
                <b>{i + 1}</b>
              </button>
              {/* the note sits in the stage, not in the marker: its left edge is clamped so it never runs past either side of the screen */}
              <span className={`wk-ann-tip${open === i ? " is-open" : ""}${m.y < 28 ? " is-below" : ""}`} role="tooltip" style={{ "--x": m.x, "--y": m.y } as React.CSSProperties}><strong>{m.t}</strong>{m.d}</span>
            </Fragment>
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

// the old and the new screen in one frame: drag (or use the arrow keys on) the handle to wipe between them. It sweeps once when it scrolls into view.
export function WorkBeforeAfter({ ba }: { ba: BeforeAfter }) {
  const calm = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const pos = useMotionValue(calm ? 50 : 96); // % of the frame that shows the old screen
  const touched = useRef(false);
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const [shown, setShown] = useState(50);
  useEffect(() => {
    if (!seen || calm) return;
    const c = animate(pos, 50, { duration: 1.5, ease: EASE, delay: 0.2 });
    return () => c.stop();
  }, [seen, calm, pos]);
  useEffect(() => pos.on("change", (v) => setShown(Math.round(v))), [pos]);
  return (
    <section className="wk-flow" aria-label={ba.title}>
      <Head title={ba.title} note={ba.note} />
      <div className="wk-ba" ref={ref} style={{ aspectRatio: ba.ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="wk-ba-img" src={ba.after.src} alt={ba.after.alt} loading="lazy" draggable={false} />
        <motion.div className="wk-ba-old" style={{ clipPath: clip }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wk-ba-img" src={ba.before.src} alt={ba.before.alt} loading="lazy" draggable={false} />
        </motion.div>
        <span className="wk-ba-tag wk-ba-tag--old">Before</span>
        <span className="wk-ba-tag wk-ba-tag--new">After</span>
        <motion.span className="wk-ba-handle" style={{ left }} aria-hidden="true"><i><b /></i></motion.span>
        <input
          className="wk-ba-range"
          type="range"
          min={4}
          max={96}
          step={0.5}
          value={shown}
          aria-label="Wipe between the old and the new screen"
          onChange={(e) => { touched.current = true; pos.stop(); pos.set(Number(e.target.value)); }}
        />
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
