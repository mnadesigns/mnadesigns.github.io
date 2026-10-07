"use client";

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";
import styles from "./ApproachScene.module.css";

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

// The caption cards rise in after the picture; the first lifts away as the second view arrives.
function rise(start: number, end: number) {
  const a = start + 0.8;
  const o = end - 0.35;
  return {
    animate: { opacity: [0, 0, 1, 1, 0, 0], y: [60, 60, 0, 0, -60, -60] },
    transition: { duration: T, times: times([0, a, a + 0.5, o, o + 0.3, T]), ease: eases("linear", EXPO, "linear", "easeIn", "linear") },
  };
}

const HIDDEN = { opacity: 0, scale: 1.07 };
const HIDDEN_RISE = { opacity: 0, y: 60 };

// "Audit first, design later" over a board of screens, then "Think across devices" on devices; both fill the panel (Figma frames 293:55888 and 293:56631).
export function ApproachScene(props: SceneProps) {
  const on = props.active;
  const one = zoomIn(0.3);
  const two = zoomIn(SPLIT - 0.3);
  const card1 = rise(0, SPLIT);
  const card2 = rise(SPLIT, T);
  return (
    <Scene
      {...props}
      bars="#f7f7f7"
      stage="purple"
      base="#f7f7f7"
      cover={
        <>
          <motion.img alt="Screens from the QuodArca audit: sign-in, security, device approval and empty states." src={`${IMG}/audit-board.webp`} initial={HIDDEN} animate={on ? one.animate : HIDDEN} transition={one.transition} />
          <motion.img alt="QuodArca on a laptop and a phone." src={`${IMG}/devices-board.webp`} initial={HIDDEN} animate={on ? two.animate : HIDDEN} transition={two.transition} />
        </>
      }
      corner={
        <>
          <motion.div className={styles.card} initial={HIDDEN_RISE} animate={on ? card1.animate : HIDDEN_RISE} transition={card1.transition}>
            <p>Audit First,<br />Design Later</p>
          </motion.div>
          <motion.div className={styles.card} initial={HIDDEN_RISE} animate={on ? card2.animate : HIDDEN_RISE} transition={card2.transition}>
            <p>Think Across<br />Devices</p>
          </motion.div>
        </>
      }
    />
  );
}
