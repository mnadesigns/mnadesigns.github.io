"use client";

import { motion, useReducedMotion } from "motion/react";
import type { WorkCard as Card } from "@/data/workDetails";

const EASE = [0.22, 1, 0.36, 1] as const;
// where each note lands when it is scattered, and the tilt it keeps once it has settled
const NOTE_START = [{ r: -9, x: -26, y: 18 }, { r: 8, x: 30, y: -12 }, { r: -6, x: -18, y: 26 }];
const NOTE_REST = [-2.5, 2, -1.5];

// A story point as a card. layout "notes": the problems as paper notes that arrive scattered and settle into a tidy stack. layout "steps": the steps as titles along a line that draws itself.
export function WorkCard({ card }: { card: Card }) {
  const calm = !!useReducedMotion();
  const rise = (i: number) => (calm ? {} : { initial: { y: 22, opacity: 0 }, whileInView: { y: 0, opacity: 1 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 0.7, ease: EASE, delay: i * 0.08 } });
  return (
    <section className={`wk-card wk-card--${card.tone} wk-card--${card.layout}`} aria-label={card.title}>
      <div className="wk-card-text">
        <p className="wk-card-eyebrow">{card.eyebrow}</p>
        <motion.h2 className="wk-card-title" {...rise(0)}>{card.title}</motion.h2>
        <motion.p className="wk-card-body" {...rise(1)}>{card.body}</motion.p>
      </div>
      {card.layout === "notes" ? (
        <ol className="wk-notes">
          {card.points.map((p, i) => (
            <motion.li
              key={p.t}
              className={`wk-note wk-note--${i + 1}`}
              style={{ rotate: NOTE_REST[i] }}
              {...(calm ? {} : { initial: { ...NOTE_START[i], opacity: 0, rotate: NOTE_START[i].r }, whileInView: { x: 0, y: 0, opacity: 1, rotate: NOTE_REST[i] }, viewport: { once: true, margin: "-12% 0px" }, transition: { duration: 0.9, ease: EASE, delay: 0.2 + i * 0.18 } })}
            >
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </motion.li>
          ))}
        </ol>
      ) : (
        <ol className="wk-steps">
          {card.points.map((p, i) => (
            <motion.li key={p.t} {...rise(i + 2)}>
              <motion.span className="wk-steps-line" aria-hidden="true" {...(calm ? {} : { initial: { scaleX: 0 }, whileInView: { scaleX: 1 }, viewport: { once: true, margin: "-8% 0px" }, transition: { duration: 1.1, ease: EASE, delay: 0.3 + i * 0.2 } })} />
              <h3>{p.t}</h3>
              <p>{p.d}</p>
            </motion.li>
          ))}
        </ol>
      )}
    </section>
  );
}
