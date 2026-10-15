"use client";

import { useEffect, useRef, useState } from "react";
import { consultingPage as p } from "@/data/pages";
import { Btn } from "@/components/atoms/Buttons";

// Scroll-driven problem slides: a 340vh track with a sticky 100vh stage; progress picks the active slide.
export function Problems() {
  const track = useRef<HTMLElement>(null);
  const fill = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const total = p.problems.length + 1;

  useEffect(() => {
    const onScroll = () => {
      const el = track.current;
      if (!el || window.innerWidth <= 900) return;
      const r = el.getBoundingClientRect();
      const span = el.offsetHeight - window.innerHeight;
      const prog = Math.min(Math.max(-r.top / span, 0), 1);
      setActive(Math.min(total - 1, Math.floor(prog * total)));
      if (fill.current) fill.current.style.transform = `scaleX(${prog})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, [total]);

  return (
    <section className="cs-problems" ref={track} id="csProblems">
      <div className="cs-problems-inner">
        <p className="cs-problems-label">{p.problemsLabel}</p>
        {p.problems.map((t, i) => (
          <div key={t} className={`cs-slide${active === i ? " is-active" : ""}`}>
            <p className="cs-slide-text">{t}</p>
          </div>
        ))}
        <div className={`cs-slide${active === total - 1 ? " is-active" : ""}`}>
          <p className="cs-closer">{p.closer}</p>
          <p className="cs-closer-sub">{p.closerSub}</p>
          <Btn href="/resume/">Get in touch</Btn>
        </div>
      </div>
      <div className="cs-progress"><div className="cs-progress-fill" ref={fill} /></div>
    </section>
  );
}

// Staggered reveal for testimonial entries (IntersectionObserver, 0.12 threshold like the reveals elsewhere).
export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const els = ref.current?.querySelectorAll(".cs-testi-entry");
    if (!els) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }),
      { threshold: 0.2 }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref}>
      {p.testimonials.map((t) => (
        <article className="cs-testi-entry" key={t.by}>
          <div className="cs-testi-portrait" />
          <div className="cs-testi-content">
            <span className="cs-testi-mark" aria-hidden="true">&ldquo;</span>
            <p className="cs-testi-quote">{t.text}</p>
            <footer className="cs-testi-attr">
              <span className="cs-testi-name">{t.by}</span>
              <span className="cs-testi-role">{t.role}</span>
            </footer>
          </div>
        </article>
      ))}
    </div>
  );
}
