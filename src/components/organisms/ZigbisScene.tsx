"use client";

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";

/* eslint-disable @next/next/no-img-element */

const EASE: Easing = [0.2, 0.7, 0.3, 1]; // the measured softLand curve (--e-land in landing.css)
const IMG = "/images/work/zigbis";

// "Zigbis" (Figma frame 3027:978): nine tilted windows onto two full-length screenshots of the Zigbis home page, tiled across the slide. Standing still.
// Every number is from the Figma file (1920 x 1080 frame): wrap = the window's box (left, top, width, height) before it is turned; inner = the window itself, turned -13 degrees about its
// centre; pos = where the screenshot sits inside the window, as percentages of the window.
type Panel = { wrap: [number, number, number, number]; inner: [number, number]; img: "page-a" | "page-b"; pos: { h: number; l: number; t: number; w: number } };
const PANELS: Panel[] = [
  { wrap: [-475.04, -84.67, 988.398, 822.828], inner: [865.57, 644.639], img: "page-a", pos: { h: 444.99, l: -12.41, t: -195.26, w: 120.03 } },
  { wrap: [311.65, -598.46, 988.398, 822.828], inner: [865.57, 644.639], img: "page-b", pos: { h: 399.21, l: -4.32, t: -234.06, w: 107.68 } },
  { wrap: [857.35, -960.24, 988.398, 822.828], inner: [865.57, 644.639], img: "page-b", pos: { h: 444.99, l: -9.85, t: -0.31, w: 120.03 } },
  { wrap: [-325.95, 557.75, 988.398, 822.828], inner: [865.57, 644.639], img: "page-a", pos: { h: 360.55, l: 14.97, t: -267.59, w: 97.25 } },
  { wrap: [460.74, 44.97, 988.398, 822.828], inner: [865.57, 644.639], img: "page-b", pos: { h: 416.89, l: -6.02, t: 0.37, w: 112.45 } },
  { wrap: [1272.43, -369.82, 988.398, 822.828], inner: [865.57, 644.639], img: "page-b", pos: { h: 444.99, l: -9.49, t: -206.6, w: 120.03 } },
  { wrap: [-451.87, 1299.18, 988.398, 822.828], inner: [865.57, 644.639], img: "page-b", pos: { h: 444.99, l: -9.85, t: -0.31, w: 120.03 } },
  { wrap: [609.83, 689.39, 988.398, 822.828], inner: [865.57, 644.639], img: "page-b", pos: { h: 444.99, l: -9.7, t: -156.59, w: 120.03 } },
  { wrap: [1421, 276, 992.49, 840.552], inner: [865.57, 662.83], img: "page-a", pos: { h: 444.99, l: -22.59, t: -54.01, w: 120.03 } },
];

export function ZigbisScene(props: SceneProps) {
  return (
    <Scene {...props} bars="#ffffff" stage="purple" base="#ffffff" bleed>
      <motion.div
        style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={props.active ? { opacity: 1, scale: [1.06, 1, 1.025] } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.2, ease: "linear" }, scale: { duration: 4.2, times: [0, 0.17, 1], ease: [EASE, "linear"] } }}
      >
        {PANELS.map((p, i) => (
          <div key={i} style={{ position: "absolute", left: p.wrap[0], top: p.wrap[1], width: p.wrap[2], height: p.wrap[3], display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ flex: "none", transform: "rotate(-13deg)" }}>
              <div style={{ position: "relative", width: p.inner[0], height: p.inner[1], overflow: "hidden" }}>
                <img decoding="async"
                  alt={i === 0 ? "The Zigbis hair and beauty website, shown in tilted windows." : ""}
                  src={`${IMG}/${p.img}.webp`}
                  style={{ position: "absolute", maxWidth: "none", height: `${p.pos.h}%`, left: `${p.pos.l}%`, top: `${p.pos.t}%`, width: `${p.pos.w}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </Scene>
  );
}
