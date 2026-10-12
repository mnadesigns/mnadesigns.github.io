"use client";

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";
import styles from "./ApproachScene.module.css";

/* eslint-disable @next/next/no-img-element */

const IMG = "/images/work/quodarca/approach";
const T = 9; // seconds: the length of the whole scene
const SPLIT = 4.5; // seconds: view one ends and view two begins
const EXPO: Easing = [0.16, 1, 0.3, 1];
const eases = (...e: Easing[]): Easing[] => e;
const frac = (s: number) => Math.min(1, Math.max(0, s / T));
const times = (t: number[]) => t.map(frac);

// Each view is one picture that covers the whole panel. It comes in with the same smooth zoom as the Product Features scene (a little
// large, easing down to full size as it fades up) and stays put; the next view fades in over it.
function zoomIn(start: number) {
  return {
    animate: { opacity: [0, 0, 1, 1], scale: [1.07, 1.07, 1, 1] },
    transition: {
      opacity: { duration: T, times: times([0, start, start + 0.5, T]), ease: eases("linear", "easeOut", "linear") },
      scale: { duration: T, times: times([0, start, start + 1.4, T]), ease: eases("linear", EXPO, "linear") },
    },
  };
}

const HIDDEN = { opacity: 0, scale: 1.07 };

// A board of audited screens, then "Think across devices" with a laptop and a phone (heading included in the picture so it stays aligned); both fill the panel (Figma frames 293:55888 and 293:56631).
export function ApproachScene(props: SceneProps) {
  const on = props.active;
  const one = zoomIn(0.3);
  const two = zoomIn(SPLIT - 0.3);
  return (
    <Scene
      {...props}
      bars="#24243b"
      stage="purple"
      bleed
      portrait={
        <motion.div className={styles.pTwo} initial={HIDDEN} animate={on ? two.animate : HIDDEN} transition={two.transition}>
          <p className={styles.pHeading}>Think Across<br />Devices<span>.</span></p>
          <div className={styles.pRegion}><img alt="QuodArca on a laptop and a phone." src={`${IMG}/devices-tight.webp`} /></div>
        </motion.div>
      }
      base="#24243b"
      cover={
        <>
          <motion.img alt="Screens from the QuodArca audit: sign-in, security, device approval and empty states." src={`${IMG}/audit.webp`} initial={HIDDEN} animate={on ? one.animate : HIDDEN} transition={one.transition} />
          <motion.img alt="" src={`${IMG.replace("/approach", "")}/bg-devices.webp`} initial={{ opacity: 0 }} animate={on ? { opacity: [0, 0, 1, 1] } : { opacity: 0 }} transition={{ duration: T, times: times([0, SPLIT - 0.3, SPLIT + 0.2, T]), ease: "linear" }} />
        </>
      }
    >
      {/* the second view lives on the stage, so its heading stays aligned with the devices on any panel shape; your indigo background picture shows behind and around the devices */}
      <motion.div style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }} initial={HIDDEN} animate={on ? two.animate : HIDDEN} transition={two.transition}>
        <img alt="QuodArca on a laptop and a phone." src={`${IMG}/devices-cutout.webp`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />
        <p className={styles.heading}>Think Across Devices<span>.</span></p>
      </motion.div>
    </Scene>
  );
}
