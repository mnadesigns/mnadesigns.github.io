"use client";

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";

const EASE: Easing = [0.23, 1, 0.32, 1]; // --ease in globals.css

// "Spoonful OS": a collage of the app's screens on white, filling the whole panel, with the same simple entrance as the Sred.io screens (work 1):
// it fades in over 0.8 s while easing from 106% down to 100% over 4.2 s.
export function SpoonfulScene(props: SceneProps) {
  return (
    <Scene
      {...props}
      bars="#ffffff"
      stage="purple"
      base="#ffffff"
      cover={
        <motion.img
          alt="Screens from the Spoonful OS app: a splash screen, a child's profile, medication reminders, a fever chart and the menu."
          src="/images/work/spoonful/collage.webp"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={props.active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
          transition={{ opacity: { duration: 0.8, ease: EASE }, scale: { duration: 4.2, ease: EASE } }}
        />
      }
    />
  );
}
