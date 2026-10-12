"use client";

import { motion, type Easing } from "motion/react";
import { PortraitPicture, Scene, type SceneProps } from "./QuodarcaScenes";

const EASE: Easing = [0.23, 1, 0.32, 1]; // --ease in globals.css

// "Wonder Pies": the website on a phone, a desktop and a tablet as one picture on white, kept whole inside the 16:9 stage, with the same simple entrance as the
// Sred.io screens (work 1): it fades in over 0.8 s while easing from 106% down to 100% over 4.2 s.
export function WonderPiesScene(props: SceneProps) {
  return (
    <Scene {...props} bars="#ffffff" stage="purple" base="#ffffff" portrait={<PortraitPicture zoom={{ from: 1, to: 1.75, origin: "50% 40%" }} active={props.active} alt="The Wonder Pies website on a phone, a desktop and a tablet: handcrafted and gourmet pies and pastries." src="/images/work/wonderpies/devices.webp" />}>
      <motion.img
        alt="The Wonder Pies website on a phone, a desktop and a tablet: handcrafted and gourmet pies and pastries."
        src="/images/work/wonderpies/devices.webp"
        style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080, objectFit: "contain", padding: "16px 24px", boxSizing: "border-box" }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={props.active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.8, ease: EASE }, scale: { duration: 4.2, ease: EASE } }}
      />
    </Scene>
  );
}
