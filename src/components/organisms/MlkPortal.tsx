"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import styles from "./MlkPortal.module.css";

// The before and after portal, on the slide: flat cards as tall as the slide move left to right through a glowing line at the centre. On the left of the line a card is the old design,
// on the right of it the new one, so the new design grows from the card's leading edge as it passes through. The moment the new design appears, its result shows at the top centre.
// The picture is a pure function of time (no state, no layout reads): each frame only moves the cards and the cut, so the motion has no jerks and can pause and resume without a jump.
//
// NEEDS PROOF: 3x conversion rate and 2.5x online orders are the numbers on the MLK page; the other lines are plain claims about the work, to confirm or replace.
const CARDS = [
  { id: "ae", stat: { text: "Improved accessibility" } },
  { id: "keys", stat: { n: 3, suf: "×", label: "Conversion rate" } },
  { id: "kombi", stat: { text: "A stronger first impression" } },
  { id: "scp", stat: { n: 2.5, dec: 1, suf: "×", label: "Online orders" } },
  { id: "telco", stat: { text: "Faster to scan, on every screen" } },
  { id: "wp", stat: { text: "Easier to order online" } },
  { id: "zigbis", stat: { text: "A sharper brand story" } },
] as const;
type Stat = { text?: string; n?: number; dec?: number; suf?: string; label?: string };

const N = CARDS.length;
const SPEED = 11; // slide widths per 100 seconds: cqw per second
const H = 56.25; // the slide height in cqw (16:9)
const CW = H * (1498 / 1620); // a card is as tall as the slide
const GAP = 3;
const PITCH = CW + GAP;
const LINE = 50; // the portal, in cqw from the left
const sm = (v: number, a: number, b: number) => { const k = Math.min(1, Math.max(0, (v - a) / (b - a))); return k * k * (3 - 2 * k); };

export function MlkPortal() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const els = useRef<Record<string, HTMLElement | null>>({});
  const clock = useRef({ t: 0, last: 0, on: false, raf: 0 });
  const [playing, setPlaying] = useState(true);
  const r = useCallback((k: string) => (e: HTMLElement | null) => { els.current[k] = e; }, []);

  const render = (t: number) => {
    const total = N * PITCH;
    CARDS.forEach((c, i) => {
      // the left edge of the card: it starts with the first card a third of the way through the line, and wraps once it has left on the right
      const x = (((-(i + 2) * PITCH + SPEED * t + CW * 0.35 + LINE - CW) % total) + total) % total - (total - (100 + GAP));
      const card = els.current[`c${i}`];
      if (card) card.style.transform = `translate3d(${x}cqw,0,0)`;
      const q = Math.min(1, Math.max(0, (LINE - x) / CW)); // how much of the card is still on the left of the line
      const aft = els.current[`a${i}`];
      if (aft) aft.style.clipPath = `inset(0 0 0 ${(q * 100).toFixed(3)}%)`;
      // its result: it comes in as soon as the new design shows, and leaves in the gap before the next card
      const d = x + CW - LINE; // how far the leading edge is past the line
      const show = sm(d, CW * 0.03, CW * 0.16) * (1 - sm(d, CW + GAP * 0.2, CW + GAP * 0.9));
      const st = els.current[`s${i}`];
      if (st) { st.style.opacity = show.toFixed(3); st.style.transform = `translate3d(0,${((1 - sm(d, CW * 0.03, CW * 0.16)) * 40 - sm(d, CW + GAP * 0.2, CW + GAP * 0.9) * 40).toFixed(2)}%,0)`; }
      const s = CARDS[i].stat as Stat;
      if (s.n !== undefined) {
        const v = s.n * sm(d, CW * 0.03, CW * 0.4);
        const e = els.current[`n${i}`];
        const txt = s.dec ? v.toFixed(s.dec) : String(Math.round(v));
        if (e && e.textContent !== txt) e.textContent = txt;
      }
    });
  };

  useEffect(() => {
    const c = clock.current;
    if (reduce) { render(2.2); return; }
    let visible = true;
    const loop = (now: number) => {
      c.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - c.last) / 1000);
      c.last = now;
      if (c.on && visible) { c.t += dt; render(c.t); }
    };
    c.on = true;
    c.last = performance.now();
    render(0);
    c.raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    if (root.current) {
      io.observe(root.current);
      (root.current as HTMLElement & { __seek?: (s: number) => void }).__seek = (s: number) => { c.on = false; c.t = s; render(s); };
    }
    return () => { cancelAnimationFrame(c.raf); io.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);
  useEffect(() => { clock.current.on = playing && !reduce; }, [playing, reduce]);

  return (
    <div ref={root} className={`wk-reel ${styles.sec}`} data-mlk-portal role="img" aria-label="Before and after of seven MLK Group websites passing through a portal. Results include improved accessibility, 3x conversion rate and 2.5x online orders.">
      {CARDS.map((c, i) => (
        <div key={c.id} ref={r(`c${i}`)} className={styles.card}>
          <img className={styles.before} src={`/images/work/mlk/portal/${c.id}-before.webp`} alt="" width={1498} height={1620} loading="lazy" decoding="async" />
          <img ref={r(`a${i}`)} className={styles.after} src={`/images/work/mlk/portal/${c.id}-after.webp`} alt="" width={1498} height={1620} loading="lazy" decoding="async" />
        </div>
      ))}
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.line} aria-hidden="true" />
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.stats} aria-hidden="true">
        {CARDS.map((c, i) => {
          const s = c.stat as Stat;
          return (
            <div key={c.id} ref={r(`s${i}`)} className={styles.stat}>
              {s.n !== undefined ? <><b><span ref={r(`n${i}`)}>0</span>{s.suf}</b><span className={styles.lab}>{s.label}</span></> : <span className={styles.only}>{s.text}</span>}
            </div>
          );
        })}
      </div>
      {!reduce && (
        <button type="button" className={styles.pp} onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1" /><rect x="13.8" y="5" width="4.2" height="14" rx="1" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.8l-11-6.8A1 1 0 0 0 8 5.2z" /></svg>}
        </button>
      )}
    </div>
  );
}
