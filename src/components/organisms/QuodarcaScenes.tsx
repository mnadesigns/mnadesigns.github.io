"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./QuodarcaScenes.module.css";

const IMG = "/images/work/quodarca";

// idle: not playing, but its background is on show (the film's first frame, before the panel scrolls into view), so the art can rise into it
export type SceneProps = { active: boolean; holdMs?: number; idle?: boolean };

// A fixed 1920 x 1080 drawing, scaled to fit whatever panel it is shown in. It is a layer of a chapter film: it fades in and out with the
// film's other slides (see .film-slide), and its parts only animate while it is the active one.
// base/fill/backdrop paint a coloured scene's background across the whole panel (not just the 16:9 stage): base is the colour, fill is a picture that
// covers the panel, backdrop is artwork placed in stage coordinates that may spill past the stage edges.
export function Scene({ active, holdMs = 0, idle = false, bars, stage, base, fill, cover, corner, anchors, bleed, backdrop, children }: SceneProps & { bars: string; stage: "welcome" | "white" | "purple"; base?: string; fill?: React.ReactNode; cover?: React.ReactNode; corner?: React.ReactNode; bleed?: boolean; anchors?: { tl?: React.ReactNode; tr?: React.ReactNode; bl?: React.ReactNode; br?: React.ReactNode }; backdrop?: React.ReactNode; children?: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState({ scale: 1, ox: 0, oy: 0 }); // scale of the 1920 x 1080 stage and where its top-left corner sits in the panel
  useEffect(() => {
    const el = frame.current!;
    const measure = () => {
      const narrow = el.clientWidth < 700; // on a phone the stage fills the panel (cropping the sides) instead of leaving bands above and below
      const s = (narrow ? Math.max : Math.min)(el.clientWidth / 1920, el.clientHeight / 1080);
      setFit({ scale: s, ox: (el.clientWidth - 1920 * s) / 2, oy: (el.clientHeight - 1080 * s) / 2 });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return (
    <div className={`sloop film-slide${active || idle ? " on" : ""}`} style={{ transitionDelay: `${holdMs}ms`, background: bars }} aria-hidden={!active}>
      <div ref={frame} data-active={active} style={stage === "white" ? { background: "#fff" } : base ? { background: base } : undefined} className={`${styles.frame}${active ? ` ${styles.on}` : ""}`}>
        {fill && <div className={styles.fill}>{fill}</div>}
        {cover && <div className={styles.cover}>{cover}</div>}
        {anchors && ((["tl", "tr", "bl", "br"] as const).map((k) => anchors[k] && <div key={k} className={`${styles.anchor} ${styles[k]}`} style={{ transform: `scale(${fit.scale})` }}>{anchors[k]}</div>))}
        {corner && <div className={styles.corner} style={{ bottom: 20 * fit.scale, transform: `scale(${fit.scale})` }}>{corner}</div>}
        {backdrop && <div className={styles.stageLayer} style={{ transform: `translate(-50%, -50%) scale(${fit.scale})` }}>{backdrop}</div>}
        <div className={`${styles.stage} ${styles[stage]}${bleed ? ` ${styles.bleed}` : ""}`} style={{ transform: `translate(-50%, -50%) scale(${fit.scale})` }}>
          {children}
        </div>
      </div>
    </div>
  );
}

/* eslint-disable @next/next/no-img-element */

// "Welcome": the QuodArca wordmark and a large desktop app tilting up over the dark indigo background picture (Figma frame 253:22383).
export function WelcomeScene(props: SceneProps) {
  return (
    <Scene
      {...props}
      bars="#1d1c4e"
      stage="welcome"
      base="#1d1c4e"
      cover={<img alt="" src={`${IMG}/bg-devices.webp`} />}
    >
      <div className={styles.wordmarkWrap}>
        <div className={styles.wordmark}><img alt="QuodArca" src={`${IMG}/welcome/wordmark.svg`} /></div>
      </div>
      <div className={styles.monitor}><img alt="" src={`${IMG}/welcome/monitor.webp`} /></div>
    </Scene>
  );
}

// The six progress rings: label, arc artwork and where the arc sits inside the ring (from the Figma file).
const RINGS = [
  { lines: ["Desktop", "App"], arc: "arc-desktop.svg", box: { top: "0.19%", right: "4.88%", bottom: "66.25%", left: "50%" }, x: 64.62 },
  { lines: ["Mobile", "App"], arc: "arc-mobile.svg", box: { top: "0.19%", right: "0%", bottom: "19.99%", left: "50%" }, x: 80.13 },
  { lines: ["Email", "Templates"], arc: "arc-email.svg", box: { top: "0.19%", right: "0%", bottom: "0.19%", left: "50%" }, x: 47.82 },
  { lines: ["Marketing", "Website"], arc: "arc-marketing.svg", box: { top: "0.19%", right: "0%", bottom: "0%", left: "12.66%" }, x: 47.82 },
  { lines: ["PDF", "Editor"], arc: "arc-pdf.svg", box: { top: "0.19%", right: "0%", bottom: "0%", left: "0%" }, x: 86.82 },
  { lines: ["Authenticator", "App"], arc: "arc-authenticator.svg", box: { top: "0%", right: "0%", bottom: "0%", left: "0%" }, x: 50.4, y: 96.93, small: true },
];
const IN = [0.55, 0.61, 0.67, 0.73, 0.79, 0.85]; // seconds: when each ring spins in
const OUT = [3.54, 3.55, 3.56, 3.57, 3.58, 3.59]; // seconds: when each ring lifts away

// "Projects delivered": a rocket between the two words and six progress rings (Figma frame 72:10492).
export function ProjectsDelivered(props: SceneProps) {
  return (
    <Scene {...props} bars="#ffffff" stage="white">
      <div className={styles.rocketWrap}>
        <div className={styles.rocketTurn}>
          <div className={styles.rocket}><img alt="" src={`${IMG}/projects/rocket.png`} /></div>
        </div>
      </div>
      <p className={styles.title}>{"Projects   delivered"}</p>
      <div className={styles.rings}>
        {RINGS.map((r, i) => (
          <div key={r.arc} className={styles.ring} style={{ "--d": `${IN[i]}s`, "--x": `${OUT[i]}s` } as React.CSSProperties}>
            <img className={styles.base} alt="" src={`${IMG}/projects/ring.svg`} />
            <div className={styles.arc} style={r.box}><img alt="" src={`${IMG}/projects/${r.arc}`} /></div>
            <p className={styles.label} style={{ left: r.x, top: r.y ?? 91.76 }}>
              {r.small ? <small>{r.lines[0]}</small> : r.lines[0]}
              {r.small ? r.lines[1] : <><br />{r.lines[1]}</>}
            </p>
          </div>
        ))}
      </div>
    </Scene>
  );
}
