"use client";

import { motion, type Easing } from "motion/react";
import { PortraitCanvas, Scene, type SceneProps } from "./QuodarcaScenes";
import styles from "./ProductFeatures.module.css";

const IMG = "/images/work/quodarca";
const T = 15.04; // seconds: the length of the whole scene

// The five clips. start/end are seconds from the Figma file; each device is an exported render with its position and size on the 1920 x 1080 stage.
type Dev = { f: string; x: number; y: number; w: number; h: number };
const CLIPS: { head: string; line: string[]; start: number; end: number; devices: Dev[] }[] = [
  {
    head: "Arca:", line: ["Organize your data", "with contextual links."], start: 0, end: 3.3,
    devices: [
      { f: "c1-imac", x: 310, y: 205, w: 1073, h: 866 }, { f: "c1-iphone", x: 103, y: 355, w: 356, h: 701 }, { f: "c1-ipad", x: 1065, y: 436, w: 832, h: 578 },
    ],
  },
  {
    head: "Quod:", line: ["Modular blocks for your", "structured data"], start: 3.28, end: 6.1,
    devices: [
      { f: "c2-macbook", x: 396, y: 117, w: 1489, h: 963 }, { f: "c2-iphone-a", x: 66, y: 283, w: 318, h: 754 }, { f: "c2-iphone-b", x: 411, y: 437, w: 318, h: 643 },
    ],
  },
  {
    head: "Files:", line: ["Supports multimedia files and", "over 30 other file types"], start: 6.06, end: 8.8,
    devices: [{ f: "c3-ipad", x: 0, y: 0, w: 1920, h: 1080 }, { f: "c3-hand", x: 1081, y: 243, w: 840, h: 838 }],
  },
  {
    head: "Users:", line: ["Roles & access control,", "Data usage rules."], start: 8.84, end: 11.6,
    devices: [{ f: "c4-laptop", x: 72, y: 186, w: 1848, h: 895 }, { f: "c4-iphone", x: 0, y: 227, w: 903, h: 854 }],
  },
  {
    head: "Messages:", line: ["End-to-end encrypted messaging", "for secure collaboration"], start: 11.62, end: 14.4,
    devices: [{ f: "c5-imac", x: 455, y: 212, w: 1088, h: 868 }, { f: "c5-iphone", x: 255, y: 344, w: 361, h: 711 }],
  },
];

// One motion for every device in every view, so the whole scene moves the same way: a smooth zoom.
// Each device starts a little large, then eases down to full size as it fades up (devices of a view follow
// one another 0.12 s apart); just before the next view takes over it eases slightly smaller while it fades out.
const EXPO: Easing = [0.16, 1, 0.3, 1];
const eases = (...e: Easing[]): Easing[] => e;
const ZOOM_IN = 1.4; // seconds to settle
const FADE_IN = 0.5;
const OUT = 0.35;
const frac = (s: number) => Math.min(1, Math.max(0, s / T));
const HIDDEN = { opacity: 0, scale: 1.08 };

function deviceMotion(start: number, end: number, index: number) {
  const a = start + 0.35 + index * 0.12; // starts zooming in
  const o = end - OUT; // starts leaving
  const times = (t: number[]) => t.map(frac);
  return {
    animate: {
      opacity: [0, 0, 1, 1, 0, 0],
      scale: [1.08, 1.08, 1, 1, 0.97, 0.97],
    },
    transition: {
      opacity: { duration: T, times: times([0, a, a + FADE_IN, o, o + OUT, T]), ease: eases("linear", "easeOut", "linear", "easeIn", "linear") },
      scale: { duration: T, times: times([0, a, a + ZOOM_IN, o, o + OUT, T]), ease: eases("linear", EXPO, "linear", "easeIn", "linear") },
    },
  };
}

// The heading and the line rise in as their view begins and lift away as it ends.
function textMotion(start: number, end: number) {
  const o = end - OUT;
  const t = [0, start, start + 0.4, o, o + 0.3, T].map(frac);
  return {
    animate: { opacity: [0, 0, 1, 1, 0, 0], y: [60, 60, 0, 0, -60, -60] },
    transition: { duration: T, times: t, ease: eases("linear", EXPO, "linear", "easeIn", "linear") },
  };
}

// Phone layout: each view is its heading and line over its devices, which are laid out in the box that just contains them (the Figma stage positions, as percentages), full width.
// Where the visible picture is inside each exported device image (left, top, right, bottom as fractions): the images carry transparent margins, which would otherwise show as gaps at the sides of the phone layout.
const TRIM: Record<string, [number, number, number, number]> = {
  "c1-imac": [0.108, 0, 0.999, 0.991], "c1-ipad": [0.007, 0.01, 0.992, 0.989], "c1-iphone": [0.034, 0, 0.966, 0.99],
  "c2-iphone-a": [0, 0, 0.994, 0.997], "c2-iphone-b": [0, 0, 0.994, 0.998], "c2-macbook": [0.158, 0.102, 0.967, 0.999],
  "c3-hand": [0.021, 0.005, 0.933, 0.998], "c3-ipad": [0.024, 0.17, 0.649, 0.998],
  "c4-iphone": [0.075, 0.047, 0.704, 0.998], "c4-laptop": [0.102, 0, 0.95, 0.999],
  "c5-imac": [0.108, 0, 0.998, 0.998], "c5-iphone": [0.033, 0, 0.964, 0.99],
};

function PortraitView({ c, on }: { c: (typeof CLIPS)[number]; on: boolean }) {
  const vis = c.devices.map((d) => { const [l, t, rr, b] = TRIM[d.f]; return { x0: d.x + l * d.w, y0: d.y + t * d.h, x1: d.x + rr * d.w, y1: d.y + b * d.h }; });
  const x0 = Math.min(...vis.map((v) => v.x0)), y0 = Math.min(...vis.map((v) => v.y0));
  const x1 = Math.max(...vis.map((v) => v.x1)), y1 = Math.max(...vis.map((v) => v.y1));
  const W = x1 - x0, H = y1 - y0;
  const tm = textMotion(c.start, c.end);
  return (
    <motion.div className={styles.pView} initial={{ opacity: 0, y: 40 }} animate={on ? tm.animate : { opacity: 0, y: 40 }} transition={tm.transition}>
      <p className={styles.pHead}>{c.head}</p>
      <p className={styles.pLine}>{c.line.join(" ")}</p>
      <div className={styles.pRegion}>
      <div className={styles.pDevices} style={{ aspectRatio: `${W} / ${H}`, "--a": W / H } as React.CSSProperties}>
        {c.devices.map((d) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={d.f} alt="" src={`${IMG}/features/${d.f}.webp`} style={{ left: `${((d.x - x0) / W) * 100}%`, top: `${((d.y - y0) / H) * 100}%`, width: `${(d.w / W) * 100}%`, height: `${(d.h / H) * 100}%` }} />
        ))}
      </div>
      </div>
    </motion.div>
  );
}

// "Product Features": five views (Arca, Quod, Files, Users, Messages) over one dark indigo background picture (Figma frame 193:13946).
export function ProductFeatures(props: SceneProps) {
  const on = props.active;
  return (
    <Scene
      {...props}
      bars="#1d1c4e"
      stage="purple"
      base="#1d1c4e"
      // eslint-disable-next-line @next/next/no-img-element
      cover={<img alt="" src={`${IMG}/bg-devices.webp`} />}
      portrait={<PortraitCanvas>{CLIPS.map((c) => <PortraitView key={c.head} c={c} on={on} />)}</PortraitCanvas>}
    >
      {CLIPS.map((c) => {
        const tm = textMotion(c.start, c.end);
        return (
          <div key={c.head}>
            <motion.p className={styles.heading} initial={{ opacity: 0, y: 60 }} animate={on ? tm.animate : { opacity: 0, y: 60 }} transition={tm.transition}>{c.head}</motion.p>
            <motion.p className={styles.line} initial={{ opacity: 0, y: 60 }} animate={on ? tm.animate : { opacity: 0, y: 60 }} transition={tm.transition}>
              {c.line.map((l, i) => <span key={l}>{i > 0 && <br />}{l}</span>)}
            </motion.p>
            {c.devices.map((d, i) => {
              const dm = deviceMotion(c.start, c.end, i);
              return (
                <motion.img
                  key={d.f}
                  className={styles.device}
                  alt=""
                  src={`${IMG}/features/${d.f}.webp`}
                  style={{ left: d.x, top: d.y, width: d.w, height: d.h }}
                  initial={HIDDEN}
                  animate={on ? dm.animate : HIDDEN}
                  transition={dm.transition}
                />
              );
            })}
          </div>
        );
      })}
    </Scene>
  );
}
