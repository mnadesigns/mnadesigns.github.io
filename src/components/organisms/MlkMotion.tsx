"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring, useTime, useTransform, type MotionValue } from "motion/react";
import styles from "./MlkMotion.module.css";

// A clean, directed piece in five acts, about 30 seconds, built with Framer Motion. One light theme, one blue accent, and only the device mockups as imagery.
// Springs with a real overshoot, a parallax that follows the pointer, an orbit driven by one clock, odometer reels. Every act hands over to the next on the move.
//
//  I    "50+"      the numeral rises out of its masks on springs; devices rise at the corners and drift
//  II   "25+"      five tablets are dealt from a pile into a fan, then float
//  III  "3"        six devices orbit the numeral on an ellipse; the far side is smaller, blurred and behind it
//  IV   "3x 2.5x"  two odometers roll to their numbers, a phone on each side
//  V    recap      the five numbers side by side, a row of phones rising under them
//
// NEEDS PROOF: 3x and 2.5x are the numbers on the case-study page.
const SPRING = { type: "spring" as const, stiffness: 170, damping: 15, mass: 0.9 };
const OUT = [0.16, 1, 0.3, 1] as const;
const ACTS = [6, 7, 7.5, 6.5, 5.5];
const INK = "#14181f";
const BLUE = "#0e7cb6";
const dev = (n: string) => `/images/more-work/${n}.webp`;
const TABLET = ["01", "03", "05", "07", "09"];
const ORBIT = [{ n: "01", w: 25 }, { n: "02", w: 9.6 }, { n: "05", w: 25 }, { n: "04", w: 9.6 }, { n: "09", w: 25 }, { n: "06", w: 9.6 }];
const STATS = [
  { n: "50", s: "+", t: "Australian brands" }, { n: "25", s: "+", t: "Industries" }, { n: "3", s: "", t: "Apps, platforms and websites" },
  { n: "3", s: "×", t: "Conversion rate" }, { n: "2.5", s: "×", t: "Online orders" },
];

type Px = { sx: MotionValue<number>; sy: MotionValue<number> };
// a layer that follows the pointer, deeper layers more
function Par({ sx, sy, d, className, children }: Px & { d: number; className?: string; children: React.ReactNode }) {
  const x = useTransform(sx, (v) => `${v * d}cqw`);
  const y = useTransform(sy, (v) => `${v * d * 0.6}cqw`);
  return <motion.div className={className} style={{ x, y }}>{children}</motion.div>;
}

// a numeral that rises out of a mask, glyph by glyph, with a spring that overshoots
function Glyphs({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <span className={styles.glyphs}>
      {[...text].map((ch, i) => (
        <span className={styles.gmask} key={i}>
          <motion.span
            className={styles.glyph}
            style={{ color: ch === "+" || ch === "×" ? BLUE : INK }}
            initial={{ y: "118%", rotate: 9, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            exit={{ y: "-118%", opacity: 0, transition: { duration: 0.45, ease: [0.64, 0, 0.78, 0] } }}
            transition={{ ...SPRING, delay: delay + i * 0.07 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

function Label({ children, delay = 0.5 }: { children: React.ReactNode; delay?: number }) {
  return (
    <span className={styles.lmask}>
      <motion.span className={styles.label} initial={{ y: "120%" }} animate={{ y: "0%" }} exit={{ y: "-120%", transition: { duration: 0.4 } }} transition={{ duration: 0.9, delay, ease: OUT }}>
        {children}
      </motion.span>
    </span>
  );
}

// a device that rises into place, then floats; `at` places its centre in cqw
function Dev({ n, w, x, y, r = 0, delay, depth, sx, sy, float = 1 }: Px & { n: string; w: number; x: number; y: number; r?: number; delay: number; depth: number; float?: number }) {
  const tablet = w > 18;
  return (
    <Par sx={sx} sy={sy} d={depth} className={styles.fill}>
      <motion.div className={styles.dev} style={{ left: `${x}cqw`, top: `${y}cqw` }} initial={{ y: "26cqw", opacity: 0, rotate: r * 2.5 }} animate={{ y: "0cqw", opacity: 1, rotate: r }} exit={{ y: "-8cqw", opacity: 0, transition: { duration: 0.45, ease: [0.64, 0, 0.78, 0] } }} transition={{ ...SPRING, stiffness: 120, damping: 15, delay }}>
        <motion.img loading="lazy" decoding="async" src={dev(n)} alt="" style={{ width: `${w}cqw` }} width={tablet ? 1384 : 524} height={tablet ? 1063 : 1068} animate={{ y: [0, -float, 0] }} transition={{ duration: 5.5 + delay, repeat: Infinity, ease: "easeInOut" }} />
      </motion.div>
    </Par>
  );
}

// ACT I
function ActI({ sx, sy }: Px) {
  return (
    <motion.div className={styles.act} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
      <Dev n="01" w={27} x={11} y={49} r={-5} delay={0.5} depth={2.6} sx={sx} sy={sy} float={1.2} />
      <Dev n="03" w={27} x={89} y={50} r={5} delay={0.65} depth={2.6} sx={sx} sy={sy} float={1.4} />
      <Dev n="02" w={8.4} x={7} y={12} r={-6} delay={0.8} depth={3.4} sx={sx} sy={sy} float={1.6} />
      <Dev n="04" w={8.4} x={93} y={13} r={6} delay={0.95} depth={3.4} sx={sx} sy={sy} float={1.8} />
      <Par sx={sx} sy={sy} d={1.1} className={styles.center}>
        <div className={styles.big}><Glyphs text="50+" /></div>
        <Label>Australian brands</Label>
      </Par>
    </motion.div>
  );
}

// ACT II
function ActII({ sx, sy }: Px) {
  return (
    <motion.div className={styles.act} exit={{ opacity: 0, y: "-6cqw", transition: { duration: 0.5, ease: [0.64, 0, 0.78, 0] } }}>
      <div className={styles.head}>
        <div className={styles.medium}><Glyphs text="25+" delay={0.1} /></div>
        <Label delay={0.55}>Industries</Label>
      </div>
      {TABLET.map((n, i) => {
        const t = (i - 2) / 2;
        return <Dev key={n} n={n} w={31} x={50 + t * 29} y={36 + t * t * 7} r={t * 11} delay={0.8 + i * 0.1} depth={1.4 + Math.abs(t)} sx={sx} sy={sy} float={0.8} />;
      })}
    </motion.div>
  );
}

// ACT III
function Orbit({ d, i, time }: { d: { n: string; w: number }; i: number; time: MotionValue<number> }) {
  const a = useTransform(time, (ms) => ms * 0.00042 + (i * Math.PI) / 3);
  const x = useTransform(a, (v) => `${50 + 35 * Math.cos(v)}cqw`);
  const y = useTransform(a, (v) => `${25.5 + 7.5 * Math.sin(v)}cqw`);
  const scale = useTransform(a, (v) => 0.66 + 0.46 * ((Math.sin(v) + 1) / 2));
  const z = useTransform(a, (v) => (Math.sin(v) > 0 ? 12 : 1));
  const blur = useTransform(a, (v) => `blur(${(1 - (Math.sin(v) + 1) / 2) * 2.4}px)`);
  const tilt = useTransform(a, (v) => Math.cos(v) * -10);
  return (
    <motion.div className={styles.orbit} style={{ x, y, scale, zIndex: z, filter: blur, rotateY: tilt }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.4 } }} transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}>
      <img loading="lazy" decoding="async" src={dev(d.n)} alt="" style={{ width: `${d.w}cqw` }} width={d.w > 20 ? 1384 : 524} height={d.w > 20 ? 1063 : 1068} />
    </motion.div>
  );
}
function ActIII() {
  const time = useTime();
  return (
    <motion.div className={styles.act} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
      <div className={`${styles.center} ${styles.behind}`}>
        <div className={styles.huge}><Glyphs text="3" /></div>
      </div>
      <div className={styles.foot}><Label delay={0.9}>Apps, platforms and websites</Label></div>
      {ORBIT.map((d, i) => <Orbit key={d.n} d={d} i={i} time={time} />)}
    </motion.div>
  );
}

// ACT IV: odometers
function Reel({ v, delay }: { v: number; delay: number }) {
  return (
    <span className={styles.reel}>
      <motion.span className={styles.col} initial={{ y: "0em" }} animate={{ y: `${-(v + 10) * 0.86}em` }} transition={{ duration: 1.7, delay, ease: OUT }}>
        {Array.from({ length: 20 }, (_, i) => <span key={i}>{i % 10}</span>)}
      </motion.span>
    </span>
  );
}
function ActIV({ sx, sy }: Px) {
  return (
    <motion.div className={styles.act} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
      <Dev n="02" w={9.6} x={6} y={18} r={-7} delay={0.6} depth={3} sx={sx} sy={sy} float={1.6} />
      <Dev n="06" w={9.6} x={94} y={36} r={7} delay={0.8} depth={3} sx={sx} sy={sy} float={1.9} />
      <div className={styles.pair}>
        <div className={styles.col2}>
          <div className={styles.odo}><Reel v={3} delay={0.4} /><motion.span className={styles.x} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ ...SPRING, delay: 1.5 }}>×</motion.span></div>
          <Label delay={1.0}>Conversion rate</Label>
        </div>
        <div className={styles.col2}>
          <div className={styles.odo}><Reel v={2} delay={0.7} /><span className={styles.dot}>.</span><Reel v={5} delay={0.95} /><motion.span className={styles.x} initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ ...SPRING, delay: 1.8 }}>×</motion.span></div>
          <Label delay={1.3}>Online orders</Label>
        </div>
      </div>
    </motion.div>
  );
}

// ACT V
function ActV({ sx, sy }: Px) {
  const phones = ["02", "04", "06", "08", "10"];
  return (
    <motion.div className={`${styles.act} ${styles.recap}`} exit={{ opacity: 0, transition: { duration: 0.6 } }}>
      <div className={styles.row}>
        {STATS.map((s, i) => (
          <div className={styles.rc} key={i}>
            <div className={styles.rn}><Glyphs text={s.n + s.s} delay={0.2 + i * 0.12} /></div>
            <Label delay={0.7 + i * 0.12}>{s.t}</Label>
          </div>
        ))}
      </div>
      <motion.i className={styles.rule} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.4, delay: 0.9, ease: [0.76, 0, 0.24, 1] }} />
      {phones.map((n, i) => <Dev key={n} n={n} w={10.4} x={14 + i * 18} y={48} delay={1.1 + i * 0.1} depth={1.2 + (i % 2)} sx={sx} sy={sy} float={1.2} />)}
    </motion.div>
  );
}

export function MlkMotion() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const [act, setAct] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [visible, setVisible] = useState(true);
  const px = useMotionValue(0), py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 18 }), sy = useSpring(py, { stiffness: 60, damping: 18 });

  useEffect(() => {
    if (reduce || !playing || !visible) return;
    const id = setTimeout(() => setAct((a) => (a + 1) % ACTS.length), ACTS[act] * 1000);
    return () => clearTimeout(id);
  }, [act, playing, visible, reduce]);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    (el as HTMLElement & { __act?: (n: number) => void }).__act = (n: number) => { setPlaying(false); setAct(n); };
    return () => io.disconnect();
  }, []);

  const move = (e: React.PointerEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  return (
    <div ref={root} className={`wk-reel ${styles.stage}`} data-mlk-motion onPointerMove={move} onPointerLeave={() => { px.set(0); py.set(0); }}
      role="img" aria-label="A short animation of the work: 50+ Australian brands, 25+ industries, 3 apps, platforms and websites, 3x conversion rate and 2.5x online orders.">
      <AnimatePresence mode="sync">
        {act === 0 && <ActI key="a0" sx={sx} sy={sy} />}
        {act === 1 && <ActII key="a1" sx={sx} sy={sy} />}
        {act === 2 && <ActIII key="a2" />}
        {act === 3 && <ActIV key="a3" sx={sx} sy={sy} />}
        {act === 4 && <ActV key="a4" sx={sx} sy={sy} />}
      </AnimatePresence>
      {!reduce && (
        <button type="button" className={styles.pp} onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause" : "Play"}>
          {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1" /><rect x="13.8" y="5" width="4.2" height="14" rx="1" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.8l-11-6.8A1 1 0 0 0 8 5.2z" /></svg>}
        </button>
      )}
    </div>
  );
}
