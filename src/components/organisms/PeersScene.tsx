"use client";

import { motion, type Easing } from "motion/react";
import { PortraitCover, Scene, type SceneProps } from "./QuodarcaScenes";

/* eslint-disable @next/next/no-img-element */

const EASE: Easing = [0.2, 0.7, 0.3, 1]; // the measured softLand curve (--e-land in landing.css)
const IMG = "/images/work/peers";

// "Peers": the cover slide (Skill Management Platform), the learning platform on a desktop and a phone, standing still (no scrolling).
// The picture fills the whole panel at any shape (cropped, never letterboxed), with no background colour behind it.
export function PeersScene(props: SceneProps) {
  const alt = "The Peers learning platform: assessment results on a desktop and on a phone.";
  const enter = {
    initial: { opacity: 0, scale: 1.06 },
    animate: props.active ? { opacity: 1, scale: [1.06, 1, 1.025] } : { opacity: 0, scale: 1.06 },
    transition: { opacity: { duration: 0.2, ease: "linear" as const }, scale: { duration: 4.2, times: [0, 0.17, 1], ease: [EASE, "linear"] as Easing[] } },
  };
  return (
    <Scene
      {...props}
      bars="#0a1a5c"
      stage="purple"
      bleed
      bottomAnchor
      cover={<motion.img loading="lazy" decoding="async" alt={alt} src={`${IMG}/cover-16x9.webp`} {...enter} />}
      portrait={<PortraitCover active={props.active} alt={alt} src={`${IMG}/cover-16x9.webp`} position="50% 50%" />}
    />
  );
}
