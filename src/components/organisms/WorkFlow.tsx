"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { WorkFlow as Flow } from "@/data/workDetails";

// A product flow played like a screen recording, built from the still screens: each step cuts to the next screen, the camera glides to where the action is
// (landing eases out, as in the measured motion rules) and a blue ring pulses where the control is clicked. It loops while it is on screen; a click opens the current screen in the full view (MediaLightbox, as the other media of the page).
const EASE = [0.22, 1, 0.36, 1] as const;
const MAX_ZOOM = 1.4; // the stills are 3126px wide: at 1.4x a 1100px stage is still shown at 2x on retina

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
// where the camera sits so that point (cx, cy), in % of the picture, lands in the middle of the stage; the edges never show
const camera = (cx: number, cy: number, z: number) => {
  const k = Math.min(z, MAX_ZOOM);
  return { scale: k, x: `${clamp(50 - cx * k, 100 - 100 * k, 0)}%`, y: `${clamp(50 - cy * k, 100 - 100 * k, 0)}%` };
};

export function WorkFlow({ flow }: { flow: Flow }) {
  const { steps, ratio } = flow;
  const [i, setI] = useState(0);
  const [seen, setSeen] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const calm = useReducedMotion();
  const step = steps[i];

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = seen && !calm;
  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => setI((n) => (n + 1) % steps.length), step.hold ?? 2800);
    return () => clearTimeout(t);
  }, [playing, i, step.hold, steps.length]);

  const move = calm ? { duration: 0 } : { duration: 0.75, ease: EASE };

  return (
    <section className="wk-flow" aria-label={flow.title}>
      <header className="wk-flow-head">
        <h2 className="wk-flow-title">{flow.title}</h2>
        <p className="wk-flow-note">{flow.note}</p>
      </header>
      <div className="wk-flow-stage" ref={stage} style={{ aspectRatio: ratio }}>
        <motion.div className="wk-flow-cam" initial={false} animate={camera(step.cam.x, step.cam.y, step.cam.z)} transition={move}>
          {steps.map((s, n) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.src} src={s.src} alt="" width={3126} height={Math.round(3126 / ratio)} loading="lazy" draggable={false} style={{ visibility: n === i ? "visible" : "hidden" }} />
          ))}
          {step.click && (
            <motion.i key={i} className="wk-flow-ripple" aria-hidden="true" style={{ left: `${step.click.x}%`, top: `${step.click.y}%` }} initial={{ scale: 0.3, opacity: 0 }} animate={calm ? { opacity: 0 } : { scale: [0.4, 1.4, 1.9], opacity: [1, 0.7, 0] }} transition={{ duration: 0.9, delay: 0.95, ease: "easeOut" }} />
          )}
        </motion.div>
        <motion.span key={i} className={`wk-flow-chip${step.tone ? ` is-${step.tone}` : ""}`} role="status" initial={calm ? false : { y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, ease: EASE }}><i aria-hidden="true" />{step.cap}</motion.span>
        <button type="button" className="wk-flow-open" data-lightbox-src={step.src} data-lightbox-alt={step.alt} aria-label={`View ${step.alt} full size`} />
      </div>
    </section>
  );
}
