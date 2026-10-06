"use client";

import { useEffect, useRef } from "react";
import { stats } from "@/data/site";
import { Reveal } from "@/components/atoms/Reveal";

export function Stat({ value, prefix = "", suffix = "", label }: (typeof stats)[number]) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          el.classList.add("counting");
          const t0 = performance.now();
          const tick = (t: number) => {
            const p = Math.min((t - t0) / 1400, 1);
            el.textContent = prefix + Math.round((1 - Math.pow(1 - p, 3)) * value) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else el.classList.remove("counting");
          };
          requestAnimationFrame(tick);
        }),
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value, prefix, suffix]);
  return (
    <div className="stat">
      <div className="stat-v" ref={ref}>{prefix}{value}{suffix}</div>
      <div className="stat-l">{label}</div>
    </div>
  );
}

export function Record() {
  return (
    <section className="record shell" id="record">
      <Reveal>
        <div className="sec-intro">
          <div>
            <h2 className="h2">The <em>record.</em></h2>
            <p className="sec-sub">One line summarising the years of work behind the numbers below.</p>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <div className="statrow">
          {stats.map((s) => <Stat key={s.label} {...s} />)}
        </div>
      </Reveal>
    </section>
  );
}
