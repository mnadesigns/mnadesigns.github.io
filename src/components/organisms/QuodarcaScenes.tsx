"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type Easing } from "motion/react";
import styles from "./QuodarcaScenes.module.css";

const IMG = "/images/work/quodarca";

// idle: not playing, but its background is on show (the film's first frame, before the panel scrolls into view), so the art can rise into it
export type SceneProps = { active: boolean; holdMs?: number; idle?: boolean; focus?: [number, number] };

// Phone layout for the scenes that are one picture of devices on white: the picture at the full width of the panel, centred, with the same entrance as on desktop (fades in over 0.8 s while easing from 106% down to 100%).
const PIC_EASE: Easing = [0.2, 0.7, 0.3, 1]; // the measured softLand curve
export function PortraitPicture({ src, alt, active, zoom }: { src: string; alt: string; active: boolean; zoom?: { from: number; to: number; origin: string } }) {
  // zoom: instead of the small settling movement, the picture glides from one size to another (about the point origin), so it zooms in (to > from) or out (to < from)
  const from = zoom ? zoom.from : 1.06, to = zoom ? zoom.to : 1;
  return (
    <div className={styles.pPic}>
      <motion.img
        alt={alt}
        src={src}
        style={zoom ? { transformOrigin: zoom.origin } : undefined}
        initial={{ opacity: 0, scale: from }}
        animate={active ? { opacity: 1, scale: zoom ? to : [from, 1, 1.025] } : { opacity: 0, scale: from }}
        transition={{ opacity: { duration: 0.2, ease: "linear" }, scale: zoom ? { duration: 3.2, delay: 0.5, ease: [0.45, 0, 0.25, 1] } : { duration: 4.2, ease: PIC_EASE } }}
      />
    </div>
  );
}

// Phone layout that fills the panel with one picture (cropping what does not fit): same entrance as PortraitPicture. position is where the picture is anchored when cropped.
export function PortraitCover({ src, alt, active, position = "50% 50%" }: { src: string; alt: string; active: boolean; position?: string }) {
  return (
    <div className={styles.pPic}>
      <motion.img
        alt={alt}
        src={src}
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: position }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={active ? { opacity: 1, scale: [1.06, 1, 1.025] } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.2, ease: "linear" }, scale: { duration: 4.2, times: [0, 0.17, 1], ease: [PIC_EASE, "linear"] } }}
      />
    </div>
  );
}

// A 390 x 514 drawing board for the phone layouts of a scene (its portrait prop): what is drawn on it is scaled, as one piece, to fit the panel.
export function PortraitCanvas({ children }: { children: React.ReactNode }) {
  return <div className={styles.canvas}>{children}</div>;
}

// A fixed 1920 x 1080 drawing, scaled to fit whatever panel it is shown in. It is a layer of a chapter film: it fades in and out with the
// film's other slides (see .film-slide), and its parts only animate while it is the active one.
// base/fill/backdrop paint a coloured scene's background across the whole panel (not just the 16:9 stage): base is the colour, fill is a picture that
// covers the panel, backdrop is artwork placed in stage coordinates that may spill past the stage edges.
export function Scene({ active, holdMs = 0, idle = false, focus = [0.5, 0.5], portrait, bottomAnchor = false, fitWidth, speed, bars, stage, base, fill, cover, corner, anchors, bleed, backdrop, children }: SceneProps & { portrait?: React.ReactNode; bottomAnchor?: boolean; fitWidth?: number; speed?: number; bars: string; stage: "welcome" | "white" | "purple"; base?: string; fill?: React.ReactNode; cover?: React.ReactNode; corner?: React.ReactNode; bleed?: boolean; anchors?: { tl?: React.ReactNode; tr?: React.ReactNode; bl?: React.ReactNode; br?: React.ReactNode }; backdrop?: React.ReactNode; children?: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [fx, fy] = focus;
  const [fit, setFit] = useState({ scale: 1, tx: 0, ty: 0, narrow: false, pu: 1, pw: 0, psw: 1920, psh: 1080 }); // scale of the 1920 x 1080 stage and how far it is shifted from the panel centre (px)
  useEffect(() => {
    const el = frame.current!;
    const measure = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (w < 700) {
        // phone: the stage covers the whole panel, slid so the slide's focus point (a fraction of the 1920 x 1080 stage) sits at the centre of the panel, never so far that an edge shows
        const s = Math.min(Math.max(w / 1920, h / 1080), fitWidth ? (w - 32) / fitWidth : Infinity); // fitWidth: the width (stage px) of the art that must never be cropped at the sides
        const lim = (stageSize: number, panel: number) => Math.max(0, (stageSize * s - panel) / 2);
        const clamp = (v: number, m: number) => Math.max(-m, Math.min(m, v));
        setFit({ narrow: true, psw: w, psh: h, pu: Math.min(w / 390, h / 514), pw: w - 32, scale: s, tx: clamp((0.5 - fx) * 1920 * s, lim(1920, w)), ty: clamp((0.5 - fy) * 1080 * s, lim(1080, h)) });
        return;
      }
      const fitS = Math.min(w / 1920, h / 1080);
      setFit({ narrow: false, pu: 1, pw: 0, psw: w / fitS, psh: h / fitS, scale: fitS, tx: 0, ty: bottomAnchor ? (h - 1080 * fitS) / 2 : 0 }); // psw, psh: the size of the panel in stage px, for scenes that grow to fill it
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [fx, fy, bottomAnchor, fitWidth]);
  // the art stays as it ended while the slide holds and fades out; dropping the class at once would blank the stage for the length of the fade
  const [linger, setLinger] = useState(false);
  useEffect(() => {
    if (active) { setLinger(true); return; }
    const t = setTimeout(() => setLinger(false), 900);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div data-speed={speed} className={`sloop film-slide${active || idle ? " on" : ""}`} style={{ transitionDelay: `${holdMs}ms`, background: bars }} aria-hidden={!active}>
      <div ref={frame} data-active={active} style={stage === "white" ? { background: "#fff" } : base ? { background: base } : undefined} className={`${styles.frame}${active || linger ? ` ${styles.on}` : ""}`}>
        {fill && <div className={styles.fill}>{fill}</div>}
        {cover && <div className={styles.cover}>{cover}</div>}
        {anchors && !fit.narrow && ((["tl", "tr", "bl", "br"] as const).map((k) => anchors[k] && <div key={k} className={`${styles.anchor} ${styles[k]}`} style={{ transform: `scale(${fit.scale})` }}>{anchors[k]}</div>))}
        {corner && <div className={styles.corner} style={{ bottom: 20 * fit.scale, transform: `scale(${fit.scale})` }}>{corner}</div>}
        {backdrop && <div className={styles.stageLayer} style={{ transform: `translate(-50%, -50%) translate(${fit.tx}px, ${fit.ty}px) scale(${fit.scale})` }}>{backdrop}</div>}
        {portrait && fit.narrow && <div className={styles.portrait} style={{ "--pu": fit.pu, "--pw": fit.pw, "--psw": fit.psw, "--psh": fit.psh } as React.CSSProperties}>{portrait}</div>}
        <div hidden={!!portrait && fit.narrow} className={`${styles.stage} ${styles[stage]}${bleed ? ` ${styles.bleed}` : ""}`} style={{ transform: `translate(-50%, -50%) translate(${fit.tx}px, ${fit.ty}px) scale(${fit.scale})`, "--psw": fit.psw, "--psh": fit.psh } as React.CSSProperties}>
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
      portrait={
        <div className={styles.pFit}>
          <div className={styles.pWordmark}><img alt="QuodArca" src={`${IMG}/welcome/wordmark.svg`} /></div>
          <div className={styles.pMonitor}><img alt="" src={`${IMG}/welcome/monitor.webp`} /></div>
        </div>
      }
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

function RingView({ r, i }: { r: (typeof RINGS)[number]; i: number }) {
  return (
    <div className={styles.ring} style={{ "--d": `${IN[i]}s`, "--x": `${OUT[i]}s` } as React.CSSProperties}>
      <img className={styles.base} alt="" src={`${IMG}/projects/ring.svg`} />
      <div className={styles.arc} style={r.box}><img alt="" src={`${IMG}/projects/${r.arc}`} /></div>
      <p className={styles.label} style={{ left: r.x, top: r.y ?? 91.76 }}>
        {r.small ? <small>{r.lines[0]}</small> : r.lines[0]}
        {r.small ? r.lines[1] : <><br />{r.lines[1]}</>}
      </p>
    </div>
  );
}

// The drawing itself, in 1920 x 1080 stage coordinates: the rocket, the title and the six rings.
function ProjectsStage() {
  return (
    <>
      <div className={styles.rocketWrap}>
        <div className={styles.rocketTurn}>
          <div className={styles.rocket}><img alt="" src={`${IMG}/projects/rocket.webp`} /></div>
        </div>
      </div>
      <p className={styles.title}>{"Projects   delivered"}</p>
      <div className={styles.rings}>{RINGS.map((r, i) => <RingView key={r.arc} r={r} i={i} />)}</div>
    </>
  );
}

// "Projects delivered": a rocket between the two words and six progress rings (Figma frame 72:10492). On a phone the same drawing, scaled to the width of the panel less 16px either side.
export function ProjectsDelivered(props: SceneProps) {
  return (
    <Scene
      {...props}
      bars="#ffffff"
      stage="white"
      portrait={<div className={styles.pFitBox}><div className={styles.pStage}><ProjectsStage /></div></div>}
    >
      <ProjectsStage />
    </Scene>
  );
}
