"use client";

import { motion, useReducedMotion } from "motion/react";

// "What I did" on one card in the primary colour: three plain columns, each rising in after the one before it, with a thin line drawing across its top.
export function WorkDidCards({ label, did, titles }: { label: string; did: string[]; titles?: string[] }) {
  const calm = !!useReducedMotion();
  return (
    <div className="wk-did-cards">
      <p className="wk-copy-label">{label}</p>
      <ol>
        {did.map((t, i) => (
          <motion.li
            key={t}
            initial={calm ? false : { y: 28, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
          >
            <motion.i
              className="wk-did-line"
              initial={calm ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: [0.65, 0, 0.35, 1], delay: 0.25 + i * 0.12 }}
              aria-hidden="true"
            />
            <span className="wk-did-n" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
            {titles?.[i] && <h3>{titles[i]}</h3>}
            <p>{t}</p>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
