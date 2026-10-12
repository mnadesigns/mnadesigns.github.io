"use client";

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";

const EASE: Easing = [0.23, 1, 0.32, 1]; // --ease in globals.css

// "Telco ICT Group": the website on a phone, a desktop and a tablet as one picture on white, kept whole inside the 16:9 stage, with the same simple entrance as the
// Sred.io screens (work 1): it fades in over 0.8 s while easing from 106% down to 100% over 4.2 s.
export function TelcoIctScene(props: SceneProps) {
  return (
    <Scene {...props} bars="#ffffff" stage="purple" base="#ffffff">
      <motion.img
        alt="The Telco ICT Group website on a phone, a desktop and a tablet: telecommunications and IT that works every time."
        src="/images/work/telcoict/devices.webp"
        style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, objectFit: "contain", padding: "16px 24px", boxSizing: "border-box" }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={props.active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.8, ease: EASE }, scale: { duration: 4.2, ease: EASE } }}
      />
    </Scene>
  );
}
