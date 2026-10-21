"use client";
/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useRef, useState } from "react";
import { cubicBezier, useReducedMotion } from "motion/react";
import styles from "./MlkReel.module.css";

// The MLK Group reel: 20 seconds, looping, in the language of an agency showreel: light grounds, real device mockups, pages as layers in 3D, stat cards that sit in the work, whip-pan moves between scenes.
// Every frame is a pure function of the time (render(t)), so it pauses, resumes and seeks without drift. Eases are the measured ones (entrances out, exits in, one soft overshoot).
// Only transform, opacity, filter and clip-path move.
//
//  0.0 –  3.6  A  a tilted wall of the work drifts and settles; a white card pops in with "50+ Australian brands" (counts up)
//  3.2 –  7.9  B  pages rise one by one into a stack, each older page lifting back and scaling down; a stat panel "25+ Industries" is one of the layers; a glass orb floats behind
//  7.4 – 11.8  C  whip-pan to a cylinder of device screens that turns on its axis; the blur follows the speed of the turn
// 11.2 – 14.9  D  whip-pan to three stat cards that rise on a blue-gray ground: 3x conversion, 2.5x online orders, 3 apps, platforms and websites
// 14.3 – 17.6  E  whip-pan to a corridor of pages in perspective; the camera moves through them
// 17.2 – 20.0  F  a cut to dark: MLK GROUP revealed letter by letter, the brand logos drifting behind, a short hold, then a fade back to A's ground (no seam)
const LOOP = 20;
const ease = {
  lin: (t: number) => t,
  out: cubicBezier(0.22, 1, 0.36, 1),
  inOut: cubicBezier(0.65, 0, 0.35, 1),
  in: cubicBezier(0.64, 0, 0.78, 0),
  back: cubicBezier(0.34, 1.56, 0.64, 1),
};
type Ease = (t: number) => number;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const p = (t: number, a: number, d: number, e: Ease = ease.out) => e(clamp((t - a) / d));
const L = (a: number, b: number, k: number) => a + (b - a) * k;

const WALL = ["ae", "keys-a", "kombi", "scp-a", "telco", "wp", "zigbis-a", "ae-a", "keys", "kombi-a", "scp", "telco-a", "wp-a", "zigbis", "ae"];
const COLS = [0, 1, 2].map((c) => WALL.filter((_, i) => i % 3 === c));
// the stack: pages and one stat panel, each rising at its time
const STACK: { src?: string; stat?: boolean; t: number }[] = [
  { src: "keys", t: 3.3 }, { src: "wp", t: 4.0 }, { stat: true, t: 4.7 }, { src: "telco", t: 5.4 }, { src: "scp", t: 6.1 },
];
const CAR = Array.from({ length: 12 }, (_, i) => ({ n: String(i + 1).padStart(2, "0"), t: i % 2 === 0 ? 1 : 0 })); // t: 1 = tablet, 0 = phone; 12 screens, 30 degrees apart
const TUN = [{ src: "keys", x: -21, rot: 24 }, { src: "wp", x: 21, rot: -24 }, { src: "telco", x: -21, rot: 24 }, { src: "scp", x: 21, rot: -24 }];
const STATS = [
  { n: 3, dec: 0, suf: "×", label: "Conversion rate", left: 7, top: 9, at: 11.9 },
  { n: 2.5, dec: 1, suf: "×", label: "Online orders", left: 37, top: 25, at: 12.1 },
  { n: 3, dec: 0, suf: "", label: "Apps, platforms and websites", left: 66, top: 11, at: 12.3 },
];
const BRANDS = ["sredio", "quodarca", "specialist-clicnic-phramacy", "telco-ict", "wonder-pies", "peers", "applied-electronics", "cytosite-bio", "keysborough-ver-prac"];
const TITLE = "MLK GROUP".split("");
const SUB_NOTE = "Senior UX/UI Designer · 2021 – 2023";

type S = { sx?: number; x?: string; y?: string; sc?: number; rx?: number; ry?: number; rz?: number; o?: number; blur?: number; clip?: string; z?: string };

function Ticks({ dim, rk }: { dim: number; rk?: (e: HTMLElement | null) => void }) {
  return (
    <div ref={rk} className={styles.ticks} style={{ opacity: dim }} aria-hidden="true">
      {[0, 1, 2].map((r) => (
        <div className={styles.tickRow} key={r}>
          <div className={`${styles.tickTrack}${r === 1 ? ` ${styles.rev}` : ""}`}>
            {[0, 1].map((h) => (
              <div className={styles.tickHalf} key={h}>
                {[...BRANDS.slice(r * 2), ...BRANDS.slice(0, r * 2)].map((b) => <img key={b} src={`/images/brands/${b}.png`} alt="" width={269} height={200} loading="lazy" decoding="async" />)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MlkReel() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLDivElement>(null);
  const els = useRef<Record<string, HTMLElement | null>>({});
  const clock = useRef({ t: 0, last: 0, on: false, raf: 0 });
  const [playing, setPlaying] = useState(true);
  const r = useCallback((k: string) => (e: HTMLElement | null) => { els.current[k] = e; }, []);

  const st = (k: string, o: S) => {
    const e = els.current[k];
    if (!e) return;
    if ("x" in o || "y" in o || "z" in o || "sc" in o || "sx" in o || "rx" in o || "ry" in o || "rz" in o) {
      const tr: string[] = [];
      if (o.x !== undefined || o.y !== undefined || o.z !== undefined) tr.push(`translate3d(${o.x ?? "0"},${o.y ?? "0"},${o.z ?? "0"})`);
      if (o.rx !== undefined) tr.push(`rotateX(${o.rx}deg)`);
      if (o.ry !== undefined) tr.push(`rotateY(${o.ry}deg)`);
      if (o.rz !== undefined) tr.push(`rotateZ(${o.rz}deg)`);
      if (o.sc !== undefined) tr.push(`scale(${o.sc})`);
      if (o.sx !== undefined) tr.push(`scaleX(${o.sx})`);
      e.style.transform = tr.join(" ");
    }
    if (o.o !== undefined) e.style.opacity = String(o.o);
    if (o.blur !== undefined) e.style.filter = o.blur > 0.2 ? `blur(${o.blur}px)` : "none";
    if (o.clip !== undefined) e.style.clipPath = o.clip;
  };
  const txt = (k: string, v: string) => { const e = els.current[k]; if (e && e.textContent !== v) e.textContent = v; };
  // a whip-pan: the scene slides in from the right and out to the left, blurred along the way
  const whip = (k: string, t: number, tin: number, tout: number) => {
    const pi = p(t, tin, 0.6, ease.inOut), po = p(t, tout, 0.6, ease.inOut);
    const blur = 16 * Math.sin(Math.PI * pi) + 16 * Math.sin(Math.PI * po);
    st(k, { x: `${L(110, 0, pi) + L(0, -110, po)}cqw`, y: "0", blur });
    const e = els.current[k];
    if (e) e.style.visibility = t < tin - 0.05 || t > tout + 0.65 ? "hidden" : "visible";
  };

  const render = (t: number) => {
    // A: the wall and the first stat card
    const kA = p(t, 0, 4.2, ease.lin);
    st("wall", { o: 1 - p(t, 3.3, 0.9, ease.inOut) });
    st("tilt", { rx: L(58, 52, kA), rz: L(-28, -21, kA), sc: L(1.4, 1.15, kA) });
    ["col0", "col1", "col2"].forEach((c, i) => st(c, { y: `${i === 1 ? L(-40, -12, kA) : L(-8, -36, kA)}cqw` }));
    const ca = p(t, 0.7, 0.8, ease.back), cx = p(t, 3.0, 0.5, ease.in);
    st("cardA", { o: Math.min(1, ca * 3) * (1 - cx), sc: L(0.6, 1, ca) * L(1, 0.9, cx), y: `${-14 * cx}cqw`, blur: L(14, 0, p(t, 0.7, 0.7)) });
    txt("n50", String(Math.round(50 * p(t, 0.9, 1.4))));
    // B: the stack
    const arr = STACK.map((s) => p(t, s.t, 0.8, ease.out));
    STACK.forEach((s, i) => {
      const depth = arr.slice(i + 1).reduce((a, b) => a + b, 0);
      st(`st${i}`, { y: `${L(52, 0, arr[i]) - depth * 3.8}cqw`, rx: L(16, 0, arr[i]), sc: Math.pow(0.955, depth), o: Math.min(1, arr[i] * 4) * (1 - clamp((depth - 3.2) / 1.2)), x: "0" });
      if (s.stat) txt("n25", String(Math.round(25 * p(t, s.t + 0.25, 1.0))));
    });
    st("orb", { o: p(t, 3.3, 0.8, ease.out) * 0.95, y: `${Math.sin(t * 1.3) * 1.2 - 2}cqw`, rz: t * 14, x: "0" });
    whip("gB", t, 3.1, 7.4);
    // C: the cylinder of devices
    const th = (tt: number) => L(20, -130, p(tt, 7.7, 3.7, ease.inOut));
    const vel = Math.abs(th(t + 0.016) - th(t)) / 0.016;
    st("car", { rx: -7, ry: th(t), x: "0", y: "0" });
    whip("gC", t, 7.4, 11.2);
    const cw = els.current["gC"];
    if (cw) cw.style.filter = `blur(${(Math.min(11, vel * 0.10) + 16 * Math.sin(Math.PI * p(t, 7.4, 0.6, ease.inOut)) + 16 * Math.sin(Math.PI * p(t, 11.2, 0.6, ease.inOut))).toFixed(2)}px)`;
    // D: the stat cards
    whip("gD", t, 11.2, 14.3);
    STATS.forEach((s, i) => {
      const q = p(t, s.at, 0.8, ease.back);
      st(`sc${i}`, { o: Math.min(1, q * 3), y: `${L(8, 0, q)}cqw`, sc: L(0.86, 1, q), x: "0" });
      const v = s.n * p(t, s.at + 0.1, 1.1);
      txt(`sn${i}`, s.dec ? v.toFixed(s.dec) : String(Math.round(v)));
    });
    // E: the corridor of pages
    whip("gE", t, 14.3, 17.4);
    st("tunIn", { z: `${L(-6, 46, p(t, 14.7, 2.7, ease.inOut))}cqw`, x: "0", y: "0" });
    // F: the close
    const fi = p(t, 17.2, 0.5, ease.inOut), fo = p(t, 19.55, 0.45, ease.in);
    st("gF", { o: fi * (1 - fo) });
    TITLE.forEach((_, j) => st(`ti${j}`, { y: `${L(110, 0, p(t, 17.8 + j * 0.035, 0.6))}%` }));
    const sq = p(t, 18.45, 0.6);
    st("sub", { o: sq, y: `${L(2, 0, sq)}cqw` });
  };

  // the clock: moves the time while it is playing and on screen, and draws every frame
  useEffect(() => {
    const c = clock.current;
    if (reduce) { render(18.9); return; }
    let visible = true;
    const loop = (now: number) => {
      c.raf = requestAnimationFrame(loop);
      const dt = Math.min(0.05, (now - c.last) / 1000);
      c.last = now;
      if (c.on && visible) { c.t = (c.t + dt) % LOOP; render(c.t); }
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
    <div ref={root} className={`wk-reel ${styles.reel}`} data-mlk-reel role="img" aria-label="A 20-second reel of the MLK Group work: 50+ Australian brands, 25+ industries, 3x conversion rate and 2.5x online orders.">
      <div className={styles.ground} />

      <div ref={r("wall")} className={styles.wall}>
        <div ref={r("tilt")} className={styles.tilt}>
          {COLS.map((col, c) => (
            <div key={c} ref={r(`col${c}`)} className={styles.col}>
              {col.map((n, i) => <img key={i} src={`/images/work/mlk/reel/wall-${n}.webp`} alt="" width={1280} height={720} loading="lazy" decoding="async" />)}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.center}>
        <div ref={r("cardA")} className={styles.card}><div className={styles.num}><span ref={r("n50")}>0</span>+</div><div className={styles.cap}>Australian brands</div></div>
      </div>

      <div ref={r("gB")} className={styles.group}>
        <i ref={r("orb")} className={styles.orb} />
        <div className={styles.stack}>
          {STACK.map((s, i) => (
            <div key={i} ref={r(`st${i}`)} className={`${styles.layer}${s.stat ? ` ${styles.statPanel}` : ""}`}>
              {s.src ? <img src={`/images/work/mlk/reel/show-${s.src}.webp`} alt="" width={2560} height={1440} loading="lazy" decoding="async" /> : <div className={styles.card}><div className={styles.num}><span ref={r("n25")}>0</span>+</div><div className={styles.cap}>Industries</div></div>}
            </div>
          ))}
        </div>
      </div>

      <div ref={r("gC")} className={`${styles.group} ${styles.gC}`}>
        <div className={styles.persp}>
          <div ref={r("car")} className={styles.car}>
            {CAR.map((d, i) => (
              <img key={d.n} className={styles.panel} src={`/images/more-work/${d.n}.webp`} alt="" width={d.t ? 1384 : 524} height={d.t ? 1063 : 1068} loading="lazy" decoding="async"
                style={{ aspectRatio: d.t ? "1384 / 1063" : "524 / 1068", transform: `translate(-50%, -50%) rotateY(${i * 30}deg) translateZ(44cqw)` }} />
            ))}
          </div>
        </div>
      </div>

      <div ref={r("gD")} className={`${styles.group} ${styles.gD}`}>
        {STATS.map((s, i) => (
          <div key={i} ref={r(`sc${i}`)} className={`${styles.card} ${styles.floatCard}`} style={{ left: `${s.left}cqw`, top: `${s.top}cqw` }}>
            <div className={styles.num}><span ref={r(`sn${i}`)}>0</span>{s.suf}</div><div className={styles.cap}>{s.label}</div>
          </div>
        ))}
      </div>

      <div ref={r("gE")} className={`${styles.group} ${styles.gE}`}>
        <div className={`${styles.persp} ${styles.perspE}`}>
          <div ref={r("tunIn")} className={styles.tunIn}>
            {TUN.map((pg, i) => (
              <img key={pg.src} className={styles.tunPage} src={`/images/work/mlk/reel/show-${pg.src}.webp`} alt="" width={2560} height={1440} loading="lazy" decoding="async"
                style={{ transform: `translate(-50%, -50%) translate3d(${pg.x}cqw, ${i % 2 ? 3 : -3}cqw, ${-i * 20}cqw) rotateY(${pg.rot}deg)` }} />
            ))}
          </div>
        </div>
      </div>

      <div ref={r("gF")} className={styles.gF}>
        <Ticks dim={0.14} />
        <div className={styles.title} aria-hidden="true">
          <div className={styles.mask}>{TITLE.map((ch, j) => <span key={j} ref={r(`ti${j}`)} className={styles.ch}>{ch === " " ? " " : ch}</span>)}</div>
        </div>
        <div ref={r("sub")} className={styles.sub}>{SUB_NOTE}</div>
      </div>

      {!reduce && (
        <button type="button" className={styles.pp} onClick={() => setPlaying((v) => !v)} aria-label={playing ? "Pause the reel" : "Play the reel"}>
          {playing ? <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4.2" height="14" rx="1" /><rect x="13.8" y="5" width="4.2" height="14" rx="1" /></svg> : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.2v13.6a1 1 0 0 0 1.5.9l11-6.8a1 1 0 0 0 0-1.8l-11-6.8A1 1 0 0 0 8 5.2z" /></svg>}
        </button>
      )}
    </div>
  );
}
