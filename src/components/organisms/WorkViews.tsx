"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Code, PenTool, Rocket, Heart, MoveRight } from "lucide-react";
import { ToolIcon } from "@/components/atoms/ToolIcons";
import type { WorkAnnotated as Annotated, WorkBand as Band, WorkBeforeAfter as BeforeAfter, WorkChapter as Chapter, WorkFigures as Figures, WorkIntro as Intro, WorkLoop as Loop, WorkPan as Pan, WorkPairs as Pairs, WorkSitemap as Sitemap } from "@/data/workDetails";

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
function ToolLogo({ id }: { id: "figma" | "flowbite" | "antd" | "claude" | "cursor" }) {
  if (id === "figma") return (
    <svg viewBox="0 0 38 57" aria-hidden="true">
      <path fill="#F24E1E" d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19V0z" /><path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" /><path fill="#A259FF" d="M19 19H9.5a9.5 9.5 0 0 0 0 19H19V19z" /><path fill="#1ABCFE" d="M28.5 19a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z" /><path fill="#0ACF83" d="M9.5 38H19v9.5A9.5 9.5 0 1 1 9.5 38z" />
    </svg>
  );
  // eslint-disable-next-line @next/next/no-img-element
  if (id === "flowbite") return <img src="/images/brands/flowbite.svg" alt="" width={32} height={33} />;
  // eslint-disable-next-line @next/next/no-img-element
  if (id === "antd") return <img src="/images/brands/antd.svg" alt="" width={32} height={32} />;
  return <ToolIcon name={id} className={id === "claude" ? "wk-tool-claude" : "wk-tool-cursor"} />;
}

export function WorkIntro({ intro, between }: { intro: Intro; between?: React.ReactNode }) { // between: a block that sits between the statement and the "what I did" card
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
    {between}
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

// challenges and solutions as type only: one big figure per row, the challenge and the fix beside it, on a dark panel
export function WorkFigures({ figures }: { figures: Figures }) {
  const calm = !!useReducedMotion();
  return (
    <section className="wk-fig" aria-label={figures.title}>
      <p className="wk-fig-eyebrow">{figures.eyebrow}</p>
      <motion.h2 className="wk-fig-title" {...rise(0, calm)}>{figures.title}</motion.h2>
      <ol className="wk-fig-rows">
        {figures.rows.map((r, i) => (
          <motion.li className="wk-fig-row" key={r.fig} {...rise(i + 1, calm)}>
            <div className="wk-fig-num"><strong>{r.fig}</strong><span>{r.unit}</span></div>
            <div className="wk-fig-text">
              <p className="wk-fig-q">{r.challenge}</p>
              <p className="wk-fig-a">{r.solution}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}

// each challenge next to what the screen does about it, with the detail of the screen cut at full resolution
export function WorkPairs({ pairs }: { pairs: Pairs }) {
  const calm = !!useReducedMotion();
  return (
    <section className="wk-flow" aria-label={pairs.title}>
      {pairs.title && <Head title={pairs.title} note={pairs.note} />}
      <ol className="wk-pairs">
        {pairs.pairs.map((p) => (
          <motion.li className={`wk-pair${p.wide ? " wk-pair--wide" : ""}${p.bare ? " wk-pair--bare" : ""}`} key={p.challenge} {...rise(0, calm)}>
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

// a 16:9 collage that zooms in very slowly once it scrolls into view; a click opens it in the full view
export function WorkZoom({ src, alt }: { src: string; alt: string }) {
  const calm = !!useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 35%"] });
  const grow = useTransform(scrollYProgress, [0, 1], [0.84, 1]); // the collage arrives as an inset card and grows to the full width
  return (
    <motion.section className="wk-pan" ref={ref} style={calm ? { aspectRatio: 16 / 9 } : { aspectRatio: 16 / 9, scale: grow }} aria-label={alt}>
      <motion.img
        src={src}
        alt={alt}
        width={2880}
        height={1620}
        loading="lazy"
        draggable={false}
        initial={calm ? false : { scale: 1 }}
        whileInView={calm ? undefined : { scale: 1.12 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 16, ease: [0.25, 0.1, 0.25, 1] }}
      />
      <button type="button" className="wk-flow-open" data-lightbox-src={src} data-lightbox-alt={alt} aria-label={`View ${alt} full size`} />
    </motion.section>
  );
}

// the old and the new screen in one frame: drag (or use the arrow keys on) the handle to wipe between them. It sweeps once when it scrolls into view.
// the specks a label is dusted into (they blow to the left; the After label flips them to the right)
const DUST = Array.from({ length: 18 }, (_, i) => <i key={i} className="wk-ba-dust" aria-hidden="true" style={{ "--x": `${(i * 100) / 17}%`, "--dx": `${-(34 + ((i * 37) % 80))}px`, "--dy": `${((i * 53) % 70) - 35}px`, "--sz": `${3 + ((i * 7) % 5)}px`, "--dl": `${(i % 6) * 0.04}s` } as React.CSSProperties} />);
export function WorkBeforeAfter({ ba }: { ba: BeforeAfter }) {
  const calm = !!useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const pos = useMotionValue(calm ? 50 : 96); // % of the frame that shows the old screen
  const touched = useRef(false);
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);
  const [shown, setShown] = useState(50);
  const oldTag = useRef<HTMLSpanElement>(null);
  const newTag = useRef<HTMLSpanElement>(null);
  const [swept, setSwept] = useState({ old: false, new: false }); // the handle is on a label: it is wiped away as dust (Before to the left, After to the right)
  const [wasSwept, setWasSwept] = useState({ old: false, new: false }); // it has been wiped once, so it pops back when the handle leaves
  const snap = (to: number) => { touched.current = true; animate(pos, to, { duration: 0.9, ease: EASE }); };
  // scrub: the wipe follows the scroll, from the old screen to the new one, until the visitor takes hold of it
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 88%", "end 38%"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => { if (ba.scrub && !calm && !touched.current) pos.set(96 - v * 90); });
  useEffect(() => {
    if (!seen || calm || ba.scrub) return;
    const c = animate(pos, 50, { duration: 1.5, ease: EASE, delay: 0.2 });
    return () => c.stop();
  }, [seen, calm, pos, ba.scrub]);
  useEffect(() => pos.on("change", (v) => {
    setShown(Math.round(v));
    const o = oldTag.current, n = newTag.current, f = ref.current;
    if (!o || !n || !f) return;
    const x = (v / 100) * f.clientWidth;
    const hit = { old: x <= o.offsetLeft + o.offsetWidth + 4, new: x >= n.offsetLeft - 4 }; // the handle has reached the label's inner edge
    setSwept(hit);
    setWasSwept((w) => (w.old === (w.old || hit.old) && w.new === (w.new || hit.new) ? w : { old: w.old || hit.old, new: w.new || hit.new }));
  }), [pos]);
  return (
    <section className="wk-flow" aria-label={ba.title ?? ba.before.alt}>
      {ba.title && ba.note && <Head title={ba.title} note={ba.note} />}
      <div className="wk-ba" ref={ref} style={{ aspectRatio: ba.ratio }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="wk-ba-img" src={ba.after.src} alt={ba.after.alt} loading="lazy" draggable={false} />
        <motion.div className="wk-ba-old" style={{ clipPath: clip }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="wk-ba-img" src={ba.before.src} alt={ba.before.alt} loading="lazy" draggable={false} />
        </motion.div>
        {!ba.noTags && (<>
        <span ref={oldTag} className={`wk-ba-react wk-ba-react--old${swept.old ? " is-clean" : ""}${wasSwept.old ? " was-clean" : ""}`}>
          <button type="button" className="wk-ba-tag wk-ba-tag--old is-shaking" onClick={() => snap(96)}>Before</button>
          {/* the dust the handle sweeps off the label */}
          {DUST}
          {/* sad faces rise from the Before label the same way */}
          {["😞", "😢", "😞", "😟", "😢"].map((e, i) => <span key={i} className="wk-ba-thumb wk-ba-sad" style={{ "--i": i } as React.CSSProperties} aria-hidden="true">{e}</span>)}
        </span>
        <span ref={newTag} className={`wk-ba-react wk-ba-react--new${swept.new ? " is-clean" : ""}${wasSwept.new ? " was-clean" : ""}`}>
          <button type="button" className="wk-ba-tag wk-ba-tag--new is-shaking" onClick={() => snap(4)}>After</button>
          {DUST}
          {/* hearts rise from the After label like the reactions on a live stream */}
          {[0, 1, 2, 3, 4].map((i) => <Heart key={i} className="wk-ba-thumb" style={{ "--i": i } as React.CSSProperties} aria-hidden="true" />)}
        </span>
        </>)}
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

// the brand band: the brand's colour with its name running sideways as the page scrolls past, one line of redesign changes (old to new) rolling under it; the text is black or white, whichever reads better on the colour
const inkOn = (hex: string) => {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return 1.05 / (L + 0.05) > (L + 0.05) / 0.05 ? "#fff" : "#111";
};
export function WorkBand({ band }: { band: Band }) {
  const run = (t: string) => Array.from({ length: 6 }, () => t).join(" · ");
  return (
    <section className="wk-band" style={{ background: band.bg, color: inkOn(band.bg), "--band-bg": band.bg, "--band-ink": inkOn(band.bg) } as React.CSSProperties} aria-label={`${band.name}: ${band.changes.map((c) => `${c.from} became ${c.to}`).join("; ")}`}>
      {/* the name runs left to right on its own: the row holds the run twice and slides by half its width, so the loop has no seam */}
      <div className="wk-band-row" aria-hidden="true">{[0, 1].map((h) => <span key={h}>{run(band.name.toUpperCase())}</span>)}</div>
      <div className="wk-band-tick" aria-hidden="true">
        <div className="wk-band-track">
          {[0, 1].map((h) => (
            <ul key={h}>{[...band.changes, ...band.changes].map((c, i) => <li key={i}><span>{c.from}</span><MoveRight size={30} strokeWidth={1.5} /><b>{c.to}</b></li>)}</ul>
          ))}
        </div>
      </div>
    </section>
  );
}

