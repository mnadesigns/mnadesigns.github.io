"use client";

import { motion, type Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";
import styles from "./PharmacyScene.module.css";

/* eslint-disable @next/next/no-img-element */

const EASE: Easing = [0.2, 0.7, 0.3, 1]; // the measured softLand curve (--e-land in landing.css)
const IMG = "/images/work/pharmacy";

// The whole Specialist Clinic Pharmacy home page scrolling by itself inside a laptop (the laptop picture is the base; the page is Figma frame 59:88): the page sits behind the
// mockup, which has its screen cut out, and scrolls from the top of the page to the bottom while the laptop stays as it is.
function Mock({ phone = false }: { phone?: boolean }) {
  return (
    <div className={`${styles.mock}${phone ? ` ${styles.phoneMock}` : ""}`}>
      <div className={styles.win}><img decoding="async" className={styles.page} alt="The Specialist Clinic Pharmacy home page, scrolling from the top banner to the footer." src={`${IMG}/page.webp`} width={2712} height={11547} /></div>
      <img decoding="async" className={styles.frame} alt="" src={`${IMG}/mockup.webp`} />
    </div>
  );
}

export function PharmacyScene(props: SceneProps) {
  return (
    <Scene
      {...props}
      bars="#ffffff"
      stage="purple"
      base="#ffffff"
      bleed
      portrait={
        <div className={styles.pBox}>
          <motion.div
            className={styles.pMock}
            style={{ transformOrigin: "49.94% 44.74%" }}
            initial={{ opacity: 0, scale: 1 }}
            animate={props.active ? { opacity: 1, scale: 1.4 } : { opacity: 0, scale: 1 }}
            transition={{ opacity: { duration: 0.2, ease: "linear" }, scale: { duration: 0.73, delay: 0.67, ease: [0.65, 0, 0.35, 1] } }}
          >
            <Mock phone />
          </motion.div>
        </div>
      }
    >
      <motion.div
        className={styles.stageMock}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={props.active ? { opacity: 1, scale: [1.06, 1, 1.025] } : { opacity: 0, scale: 1.06 }}
        transition={{ opacity: { duration: 0.2, ease: "linear" }, scale: { duration: 4.2, times: [0, 0.17, 1], ease: [EASE, "linear"] } }}
      >
        <Mock />
      </motion.div>
    </Scene>
  );
}
