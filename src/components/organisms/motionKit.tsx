"use client";

import { motion, type Easing } from "motion/react";

// Small helpers for scenes that run one timeline of `total` seconds: every property gets a keyframe track over the whole scene, so all the
// parts stay in step and the scene can be replayed by flipping `on`.
export const EXPO: Easing = [0.16, 1, 0.3, 1];
export const SINE: Easing = [0.37, 0, 0.63, 1];
export const eases = (...e: Easing[]): Easing[] => e;

type Track = { values: (number | string)[]; transition: { duration: number; times: number[]; ease: Easing[] } };
export type Seq = { animate: Record<string, (number | string)[]>; transition: Record<string, Track["transition"]>; off: Record<string, number | string> };

export function motionKit(total: number) {
  const frac = (s: number) => Math.min(1, Math.max(0, s / total));
  // values[i] is reached at at[i] seconds (the last one must be `total`), and ease[i] shapes the move into it.
  const track = (values: (number | string)[], at: number[], ease: Easing | Easing[] = EXPO): Track => {
    const e = Array.isArray(ease) && typeof ease[0] !== "number" ? (ease as Easing[]) : at.slice(1).map(() => ease as Easing);
    return { values, transition: { duration: total, times: at.map(frac), ease: e } };
  };
  // Several tracks at once, as an animate object plus a per-property transition. `off` is the resting state while the scene is not showing.
  const seq = (tracks: Record<string, Track>): Seq => {
    const animate: Seq["animate"] = {};
    const transition: Seq["transition"] = {};
    const off: Seq["off"] = {};
    for (const k in tracks) { animate[k] = tracks[k].values; transition[k] = tracks[k].transition; off[k] = tracks[k].values[0]; }
    return { animate, transition, off };
  };
  // A property that holds `from`, moves to `to` between a and b, and holds. Easing is applied to that one move.
  const move = (from: number | string, to: number | string, a: number, b: number, ease: Easing = EXPO) => track([from, from, to, to], [0, a, b, total], eases("linear", ease, "linear"));
  function M({ on, s, className, style, children }: { on: boolean; s: Seq; className?: string; style?: React.CSSProperties; children?: React.ReactNode }) {
    return <motion.div className={className} style={style} initial={s.off} animate={on ? s.animate : s.off} transition={s.transition}>{children}</motion.div>;
  }
  return { track, seq, move, M };
}
