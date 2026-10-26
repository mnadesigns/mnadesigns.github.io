"use client";

import type { Easing } from "motion/react";
import { Scene, type SceneProps } from "./QuodarcaScenes";
import { eases, EXPO, motionKit, SINE, type Seq } from "./motionKit";
import styles from "./ZeroGaspiScene.module.css";

/* eslint-disable @next/next/no-img-element */

const IMG = "/images/work/zerogaspi";
const T = 12.5; // seconds: the length of the whole scene
const { track, seq, move, M } = motionKit(T);

const GLIDE: Easing = [0.65, 0, 0.35, 1]; // the long screen's glides: slow out, slow in
const MORPH: Easing = [0.7, 0, 0.2, 1]; // the phone's change from tilted to upright

// Timeline (seconds)
const OUT0 = 3.3; // the brackets and text start to leave and the phone starts to straighten
const OUT1 = 4.9; // the upright phone has landed
const TURN_Y = 24; // the out-of-plane turn of the tilted phone, in degrees, that the upright phone starts from
const TURN_X = 14;
const START = 0.482; // size of the upright phone when it starts, relative to its final size, so it matches the tilted phone it replaces
const FROM = { x: 24, y: -99.7 }; // where the upright phone starts relative to its final spot (the tilted phone is centred on the same point)
// where the tall screen rests at each stop, in px of the phone (negative = scrolled up)
const STOPS = [0, -812, -1500, -2271]; // Pickup today, Nearest to you, Recommended (as in Figma frame 2052:7665, a little lower so its heading clears the status bar), then the end of the screen
const SMALL = 0.5886; // the upright phone shrinks to this size while the screen scrolls (Figma frame 2052:7665: 527 px wide)
const SHRINK = 520 * (1 - SMALL); // how far it moves up, because it scales about a point 520 px below its top, so its top edge stays where it is

export function ZeroGaspiScene(props: SceneProps) {
  const on = props.active;

  // brackets: slide in from their corners, then leave toward them
  const bracket = (dx: number, dy: number) => seq({
    x: track([dx, dx, 0, 0, dx * 2.2, dx * 2.2], [0, 0.1, 1.4, OUT0, OUT0 + 1.0, T], eases("linear", EXPO, "linear", [0.7, 0, 0.84, 0], "linear")),
    y: track([dy, dy, 0, 0, dy * 2.2, dy * 2.2], [0, 0.1, 1.4, OUT0, OUT0 + 1.0, T], eases("linear", EXPO, "linear", [0.7, 0, 0.84, 0], "linear")),
    opacity: track([0, 0, 1, 1, 0, 0], [0, 0.1, 0.8, OUT0 + 0.2, OUT0 + 0.9, T], "linear"),
  });

  // text: rises in, then slips sideways and fades
  const text = (side: number, delay: number): Seq => seq({
    y: move(34, 0, 0.5 + delay, 1.3 + delay),
    opacity: track([0, 0, 1, 1, 0, 0], [0, 0.5 + delay, 1.1 + delay, OUT0, OUT0 + 0.7, T], "linear"),
    x: track([0, 0, 0, side * 130, side * 130], [0, OUT0, OUT0 + 0.01, OUT0 + 0.8, T], eases("linear", "linear", EXPO, "linear")),
  });

  // tilted phone: settles in, floats a little, then straightens, grows and fades into the upright phone
  const tilted = seq({
    y: track([-70, -70, 0, -9, 0, -FROM.y, -FROM.y], [0, 0.2, 1.4, 2.35, OUT0, OUT1, T], eases("linear", EXPO, SINE, SINE, MORPH, "linear")),
    x: track([0, 0, 0, -FROM.x, -FROM.x], [0, OUT0, OUT0 + 0.01, OUT1, T], eases("linear", "linear", MORPH, "linear")),
    scale: track([1, 1, 1 / START, 1 / START], [0, OUT0, OUT1, T], eases("linear", MORPH, "linear")),
    rotateZ: track([-4, -4, 0, 0.8, 0, 34, 34], [0, 0.2, 1.4, 2.35, OUT0, OUT1, T], eases("linear", EXPO, SINE, SINE, MORPH, "linear")),
    rotateY: track([-16, -16, 0, 3, 0, -TURN_Y, -TURN_Y], [0, 0.2, 1.5, 2.35, OUT0, OUT1, T], eases("linear", EXPO, SINE, SINE, MORPH, "linear")),
    rotateX: track([10, 10, 0, -2, 0, -TURN_X, -TURN_X], [0, 0.2, 1.5, 2.35, OUT0, OUT1, T], eases("linear", EXPO, SINE, SINE, MORPH, "linear")),
    opacity: track([0, 0, 1, 1, 0, 0], [0, 0.2, 0.9, OUT0 + 0.55, OUT0 + 0.95, T], "linear"),
  });
  // upright phone: starts small and tilted where the tilted one is, lands, then a slow push while the screen scrolls
  const upright = seq({
    x: track([FROM.x, FROM.x, 0, 0], [0, OUT0, OUT1, T], eases("linear", MORPH, "linear")),
    y: track([FROM.y, FROM.y, 0, 0, -SHRINK, -SHRINK], [0, OUT0, OUT1, 7.0, 8.4, T], eases("linear", MORPH, "linear", GLIDE, "linear")),
    rotateZ: track([-34, -34, 0, 0], [0, OUT0, OUT1, T], eases("linear", MORPH, "linear")),
    rotateY: track([TURN_Y, TURN_Y, 0, 0], [0, OUT0, OUT1, T], eases("linear", MORPH, "linear")),
    rotateX: track([TURN_X, TURN_X, 0, 0], [0, OUT0, OUT1, T], eases("linear", MORPH, "linear")),
    scale: track([START, START, 1, 1, SMALL, SMALL], [0, OUT0, OUT1, 7.0, 8.4, T], eases("linear", MORPH, "linear", GLIDE, "linear")),
    opacity: track([0, 0, 1, 1], [0, OUT0 + 0.6, OUT0 + 1.0, T], "linear"),
  });
  // the long screen: glides from stop to stop and rests at each
  const at = [0, 5.5, 6.7, 7.2, 8.4, 9.2, 10.8, T];
  const scroll = seq({
    y: track(
      [STOPS[0], STOPS[0], STOPS[1], STOPS[1], STOPS[2], STOPS[2], STOPS[3], STOPS[3]],
      at,
      eases("linear", GLIDE, "linear", GLIDE, "linear", GLIDE, "linear"),
    ),
  });

  return (
    <Scene
      {...props}
      bars="#ffffff"
      stage="purple"
      base="#ffffff"
      fitWidth={895}
      anchors={{
        tl: <M on={on} s={bracket(-170, -130)}><img loading="lazy" decoding="async" className={`${styles.metal} ${styles.metalTl}`} alt="" src={`${IMG}/metal-tl.webp`} /></M>,
        br: <M on={on} s={bracket(170, 130)}><img loading="lazy" decoding="async" className={`${styles.metal} ${styles.metalBr}`} alt="" src={`${IMG}/metal-br.webp`} /></M>,
        bl: (
          <>
            <M on={on} s={text(-1, 0.1)} className={styles.lockup}>
              <img loading="lazy" decoding="async" className={styles.mark} alt="" src={`${IMG}/logo-mark.svg`} />
              <p className={styles.wordmark}>ZERO GASPI</p>
            </M>
            <M on={on} s={text(-1, 0.25)} className={styles.tagline}>Anti-Food Waste<br />Mobile Marketplace</M>
          </>
        ),
        tr: <M on={on} s={text(1, 0.2)} className={styles.native}>Native iOS and Android Mobile App</M>,
      }}
    >
      <div className={styles.persp}>
      <M on={on} s={tilted} className={styles.tilted}>
        <img loading="lazy" decoding="async" className={styles.body} alt="" src={`${IMG}/phone-tilt.webp`} />
        <img loading="lazy" decoding="async" className={styles.warp} alt="" src={`${IMG}/screen-warp.webp`} />
      </M>

      <M on={on} s={upright} className={styles.upright}>
        <img loading="lazy" decoding="async" className={styles.shell} alt="" src={`${IMG}/phone-flat.webp`} />
        <div className={styles.screen}>
          <M on={on} s={scroll} className={styles.long}>
            <img loading="lazy" decoding="async" src={`${IMG}/screen-long.webp`} alt="The Zero Gaspi app: pickups near you, recommended restaurants, top-rated partners and the community impact." style={{ width: "100%", height: "100%" }} />
          </M>
          <div className={styles.status} />
          <div className={styles.island} />
        </div>
      </M>
      </div>
    </Scene>
  );
}
