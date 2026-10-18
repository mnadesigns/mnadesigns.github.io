"use client";

import { useEffect, useRef } from "react";

// A two-beat headline: the first line has a part struck out (a line is drawn through it), the second has a part highlighted (a marker sweeps behind it). Plays once, when it scrolls into view.
export function WorkStatement({ lead, strike, then, mark }: { lead: string; strike: string; then: string; mark: string }) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("is-ready");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("is-in"); return; }
    // The headline plays once, when at least half of it is on screen. The IntersectionObserver does it; a scroll check and a short timer do it as well, so the headline always reaches its
    // finished state (grey struck words, white words on the marker) even where the browser is slow to deliver observer callbacks.
    let timer = 0;
    const reveal = () => { el.classList.add("is-in"); io.disconnect(); window.removeEventListener("scroll", check); window.clearInterval(timer); };
    const check = () => {
      const r = el.getBoundingClientRect();
      const seen = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
      if (r.height > 0 && seen >= r.height * 0.5) reveal();
    };
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) reveal(); }, { threshold: 0.5 });
    io.observe(el);
    window.addEventListener("scroll", check, { passive: true });
    timer = window.setInterval(check, 400);
    check();
    return () => { io.disconnect(); window.removeEventListener("scroll", check); window.clearInterval(timer); };
  }, []);

  return (
    <h2 ref={ref} className="wk-statement">
      <span className="wk-statement-line">{lead} <s>{strike}</s>.</span>
      <span className="wk-statement-line">{then} <mark>{mark}.</mark></span>
    </h2>
  );
}
