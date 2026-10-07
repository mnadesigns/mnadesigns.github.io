"use client";

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";

// "QuodArca design system" (Figma frame 209:21342): the whole component board on plain white, scaled so its right-hand column stays in view, with the same entrance as the Sred.io screens (work 1): it fades in over 0.8 s while easing from 106% down to 100% over 4.2 s.
const EASE: Easing = [0.23, 1, 0.32, 1]; // --ease in globals.css

export function DesignSystemScene(props: SceneProps) {
  return (
    <Scene {...props} bars="#ffffff" stage="purple" base="#ffffff">
      <motion.img
        alt="The QuodArca design system: navigation, buttons, calendar, notifications, forms, media controls and menus."
        src="/images/work/quodarca/system/board.webp"
        style={{ position: "absolute", left: 0, top: 26, width: 1920, height: 1028, maxWidth: "none" }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={props.active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.8, ease: EASE }, scale: { duration: 4.2, ease: EASE } }}
      />
    </Scene>
  );
}
