"use client";

import { motion, type Easing } from "motion/react";
import { PortraitCover, Scene, type SceneProps } from "./QuodarcaScenes";

/* eslint-disable @next/next/no-img-element */

const EASE: Easing = [0.23, 1, 0.32, 1]; // --ease in globals.css
const IMG = "/images/work/peers";

// "Peers" (Figma frame 285:27619): the learning platform on a desktop and a phone, standing still (no scrolling), exactly as rendered in the design (the glassy rims
// of the devices are effects that only the whole frame carries). The background layer is also its own picture and covers the whole panel at any shape, behind the frame.
// On a phone the frame covers the panel too, cropped at the sides around the devices.
export function PeersScene(props: SceneProps) {
  const alt = "The Peers learning platform: assessment results on a desktop and on a phone.";
  const enter = {
    initial: { opacity: 0, scale: 1.06 },
    animate: props.active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.06 },
    transition: { opacity: { duration: 0.8, ease: EASE }, scale: { duration: 4.2, ease: EASE } },
  };
  return (
    <Scene
      {...props}
      bars="#0a1a5c"
      stage="purple"
      base="#0a1a5c"
      bleed
      bottomAnchor
      cover={<img alt="" src={`${IMG}/bg.webp`} />}
      portrait={<PortraitCover active={props.active} alt={alt} src={`${IMG}/frame.webp`} position="62% 50%" />}
    >
      <motion.img alt={alt} src={`${IMG}/frame.webp`} style={{ position: "absolute", left: 0, top: 0, width: 1920, height: 1080 }} {...enter} />
    </Scene>
  );
}
