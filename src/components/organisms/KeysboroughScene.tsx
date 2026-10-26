"use client";

import { motion, type Easing } from "motion/react";
import { PortraitPicture, Scene, type SceneProps } from "./QuodarcaScenes";

const EASE: Easing = [0.2, 0.7, 0.3, 1]; // the measured softLand curve (--e-land in landing.css)

// "Keysborough Veterinary Practice": the website on a desktop, a tablet and a phone as one picture on white, kept whole inside the 16:9 stage, resting on its bottom edge (not stretched
// across the panel), with the same simple entrance as the Sred.io screens (work 1): it fades in over 0.8 s while easing from 106% down to 100% over 4.2 s.
export function KeysboroughScene(props: SceneProps) {
  return (
    <Scene {...props} bars="#ffffff" stage="purple" base="#ffffff" portrait={<PortraitPicture zoom={{ from: 2, to: 1, origin: "50% 55%" }} active={props.active} alt="The Keysborough Veterinary Practice website on a desktop, a tablet and a phone." src="/images/work/keysborough/composite.webp" />}>
      <motion.img loading="lazy" decoding="async"
        alt="The Keysborough Veterinary Practice website on a desktop, a tablet and a phone."
        src="/images/work/keysborough/composite.webp"
        style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, objectFit: "contain", objectPosition: "50% 100%", transformOrigin: "50% 100%", padding: "40px 60px 0", boxSizing: "border-box" }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={props.active ? { opacity: 1, scale: [1.06, 1, 1.025] } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.2, ease: "linear" }, scale: { duration: 4.2, times: [0, 0.17, 1], ease: [EASE, "linear"] } }}
      />
    </Scene>
  );
}
