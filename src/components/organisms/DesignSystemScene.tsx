"use client";
/* eslint-disable @next/next/no-img-element */

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";
import styles from "./DesignSystemScene.module.css";

// "QuodArca design system" (Figma frame 209:21342): the whole component board on plain white, scaled so its right-hand column stays in view, with the same entrance as the Sred.io screens (work 1): it fades in over 0.8 s while easing from 106% down to 100% over 4.2 s.
const EASE: Easing = [0.2, 0.7, 0.3, 1]; // the measured softLand curve (--e-land in landing.css)

export function DesignSystemScene(props: SceneProps) {
  return (
    <Scene
      {...props}
      bars="#ffffff"
      stage="purple"
      base="#ffffff"
      portrait={<div className={styles.pBoard}><img alt="The QuodArca design system: navigation, buttons, calendar, notifications, forms, media controls and menus." src="/images/work/quodarca/system/board.webp" /></div>}
    >
      <motion.img
        alt="The QuodArca design system: navigation, buttons, calendar, notifications, forms, media controls and menus."
        src="/images/work/quodarca/system/board.webp"
        style={{ position: "absolute", left: 0, top: 26, width: 1920, height: 1028, maxWidth: "none" }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={props.active ? { opacity: 1, scale: [1.06, 1, 1.025] } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.2, ease: "linear" }, scale: { duration: 4.2, times: [0, 0.17, 1], ease: [EASE, "linear"] } }}
      />
    </Scene>
  );
}
