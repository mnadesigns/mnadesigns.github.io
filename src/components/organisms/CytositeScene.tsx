"use client";
/* eslint-disable @next/next/no-img-element */

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";

const GLIDE: Easing = [0.16, 1, 0.3, 1]; // an exponential ease-out: it arrives fast and settles slowly
const FLOAT: Easing = [0.45, 0, 0.55, 1]; // a sine in-out for the idle drift

// "CytoSite Bio": the website on an iMac and on an iPhone (the pictures as they are) over the site's own deep purple. The iMac glides up into place, the iPhone rises in front of it a beat later,
// then the two drift against each other (the phone more than the screen), so the slide keeps moving while it holds.
export function CytositeScene(props: SceneProps) {
  const on = props.active;
  return (
    <Scene {...props} bars="#12062b" stage="purple" base="radial-gradient(120% 120% at 30% 20%, #3a1d6e 0%, #1c0b42 55%, #10052a 100%)">
      <motion.div
        aria-hidden="true"
        style={{ position: "absolute", left: 1000, top: 80, width: 860, height: 860, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,40,0.34) 0%, rgba(255,140,40,0) 68%)" }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={on ? { opacity: 1, scale: [0.7, 1, 1.12] } : { opacity: 0, scale: 0.7 }}
        transition={on ? { duration: 6, ease: GLIDE, times: [0, 0.25, 1] } : { duration: 0 }}
      />
      <motion.div
        style={{ position: "absolute", left: 480, top: 70, width: 1380 }}
        initial={{ opacity: 0, y: 90, scale: 1.06 }}
        animate={on ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 90, scale: 1.06 }}
        transition={on ? { duration: 1.5, ease: GLIDE } : { duration: 0 }}
      >
        <motion.img
          src="/images/work/cytosite/imac.webp"
          alt="The CytoSite Bio website on an iMac."
          width={2000}
          height={1812}
          decoding="async"
          style={{ display: "block", width: "100%", height: "auto", filter: "drop-shadow(0 50px 60px rgba(0,0,0,0.45))" }}
          animate={on ? { y: [0, -14, 0] } : { y: 0 }}
          transition={on ? { duration: 6, ease: FLOAT, repeat: Infinity, delay: 1.5 } : { duration: 0 }}
        />
      </motion.div>
      <motion.div
        style={{ position: "absolute", left: 80, top: 170, width: 420 }}
        initial={{ opacity: 0, y: 320 }}
        animate={on ? { opacity: 1, y: 0 } : { opacity: 0, y: 320 }}
        transition={on ? { duration: 1.6, ease: GLIDE, delay: 0.45 } : { duration: 0 }}
      >
        <motion.img
          src="/images/work/cytosite/iphone.webp"
          alt="The CytoSite Bio website on an iPhone."
          width={866}
          height={1793}
          decoding="async"
          style={{ display: "block", width: "100%", height: "auto", filter: "drop-shadow(0 40px 50px rgba(0,0,0,0.5))" }}
          animate={on ? { y: [0, 26, 0] } : { y: 0 }}
          transition={on ? { duration: 6, ease: FLOAT, repeat: Infinity, delay: 2 } : { duration: 0 }}
        />
      </motion.div>
    </Scene>
  );
}
