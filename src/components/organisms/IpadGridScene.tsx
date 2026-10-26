"use client";
/* eslint-disable @next/next/no-img-element */

import { motion } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";
import { MLK_IPADS, MLK_IPAD_H, MLK_IPAD_W } from "@/data/mlkIpads";

// The cover of the MLK websites film: the seven iPad mockups, exactly as they are (same pictures, landscape), filling the whole panel in columns that never line up
// (each column starts at its own height and holds its own mix). On a wide panel three whole iPads fit across; on a smaller one they stay large (520px at least), so the outer iPads run off the left and right edges.
// The columns fly in from above and below in turn with a sharp, fast ease, then jog up and down against each other, quick and decisive, until the slide ends.
const W = MLK_IPAD_W, H = MLK_IPAD_H; // every mockup is this size, landscape, exactly as supplied
const SHOT = MLK_IPADS;
type Key = keyof typeof SHOT;

// no tablet sits next to the same tablet, in its column or in the next one (within two iPad heights), and two dark ones never touch, so every neighbour is a contrast
// top: where the column starts, in iPad heights; always above the panel so no corner is ever empty, and different for every column; run: the tablets from the top down
const COLS: { top: number; run: Key[] }[] = [
  { top: -1.7, run: ["telco", "kombi", "zigbis", "keys", "amcp", "cytosite", "zigbis"] },
  { top: -0.65, run: ["amcp", "scp", "kombi", "zigbis", "scp", "amcp", "telco"] },
  { top: -1.25, run: ["kombi", "zigbis", "telco", "amcp", "keys", "kombi", "zigbis"] },
  { top: -0.9, run: ["cytosite", "scp", "kombi", "zigbis", "scp", "amcp", "telco"] },
  { top: -1.45, run: ["amcp", "zigbis", "telco", "amcp", "cytosite", "kombi", "zigbis"] },
];
const SHARP = [0.16, 1, 0.3, 1] as const; // an exponential ease-out: it leaves fast and stops dead

export function IpadGridScene(props: SceneProps) {
  return (
    <Scene
      {...props}
      bars="#ffffff"
      stage="white"
      base="#ffffff"
      cover={
        <div style={{ position: "relative", width: "100%", height: "100%", containerType: "size", background: "#ffffff", "--w": "max(35cqw, 560px)", "--g": "max(1cqw, 12px)" } as React.CSSProperties}>
          <div style={{ position: "absolute", left: "50%", top: 0, height: "100%", display: "flex", gap: "var(--g)", transform: "translateX(-50%)" }}>
            {COLS.map((c, i) => {
              const d = i % 2 ? 1 : -1; // neighbouring columns move against each other
              return (
                <motion.div
                  key={i}
                  style={{ position: "relative", flex: "none", width: "var(--w)", marginTop: `calc(var(--w) * ${(c.top * H) / W})`, display: "flex", flexDirection: "column", gap: "var(--g)", alignSelf: "flex-start" }}
                  initial={{ y: `${d * 130}%` }}
                  animate={props.active ? { y: [`${d * 130}%`, "0%", `${-d * 4.5}%`, `${-d * 4.5}%`, `${d * 3}%`] } : { y: `${d * 130}%` }}
                  transition={props.active ? { duration: 3.9, delay: i * 0.07, times: [0, 0.2, 0.42, 0.62, 0.84], ease: [SHARP, SHARP, "linear", SHARP] } : { duration: 0 }}
                >
                  {c.run.map((k, j) => <img loading="lazy" key={j} src={SHOT[k].src} alt={SHOT[k].alt} width={W} height={H} decoding="async" style={{ position: "relative", inset: "auto", display: "block", width: "100%", height: "auto", objectFit: "fill", willChange: "auto" }} />)}
                </motion.div>
              );
            })}
          </div>
        </div>
      }
    />
  );
}
