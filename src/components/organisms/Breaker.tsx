"use client";

import { useEffect, useRef, useState } from "react";
import { breakerWords } from "@/data/site";

// Kinetic word chain: auto-advances every 2.8s (0.75s slide), click flips fast (0.38s). Last word duplicates the first.
export function Breaker() {
  const words = [...breakerWords, breakerWords[0]];
  const total = words.length - 1;
  const chain = useRef<HTMLSpanElement>(null);
  const wi = useRef(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const [motion, setMotion] = useState(true);

  const reset = () => {
    const c = chain.current!;
    c.style.transition = "none";
    c.style.transform = "translateY(0)";
    wi.current = 0;
    c.getBoundingClientRect();
  };
  const flip = (fast: boolean, ok = motion) => {
    const c = chain.current!;
    if (wi.current >= total) reset();
    wi.current++;
    const dur = ok ? (fast ? 0.38 : 0.75) : 0;
    c.style.transition = dur ? `transform ${dur}s var(--ease)` : "none";
    c.style.transform = `translateY(${-wi.current * 1.08}em)`;
    if (!dur && wi.current === total) reset();
  };
  const start = (ok: boolean) => { if (ok) timer.current = setInterval(() => flip(false, ok), 2800); };

  useEffect(() => {
    const ok = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setMotion(ok);
    start(ok);
    const c = chain.current!;
    const end = () => { if (wi.current === total) reset(); };
    c.addEventListener("transitionend", end);
    return () => { if (timer.current) clearInterval(timer.current); c.removeEventListener("transitionend", end); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ghost = "BUILD · DESIGN · SHIP · ";
  return (
    <section
      className="breaker on-coal"
      aria-label={breakerWords.join(", ")}
      onClick={() => { if (timer.current) clearInterval(timer.current); flip(true); start(motion); }}
    >
      <div className="br-ghost" aria-hidden="true"><span>{ghost.repeat(3)}</span><span>{ghost.repeat(3)}</span></div>
      <div className="shell">
        <div className="br-lockup">
          <span style={{ display: "block" }}>I build</span>
          <span className="br-window">
            <span className="br-chain" ref={chain}>
              {words.map((w, i) => <span key={i}>{w}</span>)}
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
