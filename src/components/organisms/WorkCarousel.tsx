"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

type Slide = { src: string; alt: string };

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

// The Framer University custom carousel pattern: the slides sit side by side in one wide track; the left and right halves of the stage are two real buttons
// (previous and next; on touch screens they are inert and you swipe instead), and over them the pointer becomes the big circle of the site's own circle button; a click slides the track to the neighbour. A dark-on-light glass pill of dots,
// in the manner of Apple's product galleries, shows where you are. Touch screens and keyboard focus get the circle at the edge of each half.
export function WorkCarousel({ slides, label = "Design system views", top }: { slides: Slide[]; label?: string; top?: boolean }) { // top: taller screens are cropped from the bottom, never from the top
  const [i, setI] = useState(0);
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const calm = useReducedMotion();
  const cursor = useRef<HTMLSpanElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const last = slides.length - 1;
  const go = (n: number) => setI(Math.max(0, Math.min(last, n)));
  const step = (d: number) => setI((n) => Math.max(0, Math.min(last, n + d))); // from the latest slide, so quick clicks in a row each count

  // the circle follows the pointer inside the stage
  const track = (e: React.PointerEvent<HTMLButtonElement>, s: "left" | "right") => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.parentElement!.getBoundingClientRect();
    if (cursor.current) cursor.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    setSide(s);
  };
  // Scrolling (a two-finger swipe on a trackpad, the wheel, the keys) moves the page under a still pointer and fires no pointer event, so the circle would only appear after the next
  // mouse move. Remember where the mouse is, and after each scroll look again at what is under it.
  useEffect(() => {
    let x = -1, y = -1, raf = 0;
    const place = () => {
      const el = root.current;
      if (!el || x < 0) return;
      const hit = document.elementFromPoint(x, y)?.closest<HTMLElement>(".wk-car-zone");
      if (!hit || !el.contains(hit)) { setSide(null); return; }
      const r = el.getBoundingClientRect();
      if (cursor.current) cursor.current.style.transform = `translate(${x - r.left}px, ${y - r.top}px)`;
      setSide(hit.classList.contains("wk-car-zone--left") ? "left" : "right");
    };
    const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse") { x = e.clientX; y = e.clientY; } };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; place(); }); };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);
  // swipe on touch screens: a mostly-horizontal move of 40px or more turns to the next or the previous view (a vertical move is left to the page, which scrolls)
  const swipe = useRef<{ x: number; y: number } | null>(null);
  const down = (e: React.PointerEvent) => { swipe.current = e.pointerType === "mouse" || (e.target as HTMLElement).closest("button") ? null : { x: e.clientX, y: e.clientY }; };
  const up = (e: React.PointerEvent) => {
    const s0 = swipe.current; swipe.current = null;
    if (!s0) return;
    const dx = e.clientX - s0.x, dy = e.clientY - s0.y;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  };
  const atEnd = side === "left" ? i === 0 : i === last;

  return (
    <div
      ref={root}
      className="wk-car"
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onKeyDown={(e) => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); }}
      onPointerLeave={() => setSide(null)}
      onPointerDown={down}
      onPointerUp={up}
      onPointerCancel={() => { swipe.current = null; }}
    >
      <motion.div
        className="wk-car-track"
        animate={{ x: `${-i * 100}%` }}
        transition={calm ? { duration: 0 } : { duration: 0.75, ease: [0.65, 0, 0.35, 1] }}
      >
        {slides.map((s, n) => (
          <div className="wk-car-slide" key={s.src} role="group" aria-roledescription="slide" aria-label={`${n + 1} of ${slides.length}`} aria-hidden={n !== i}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s.src} alt={s.alt} width={1920} height={1080} draggable={false} loading="lazy" style={top ? { objectPosition: "top" } : undefined} />
          </div>
        ))}
      </motion.div>

      <button type="button" className="wk-car-zone wk-car-zone--left" aria-label="Previous view" disabled={i === 0} onPointerMove={(e) => track(e, "left")} onClick={() => step(-1)}>
        <span className="wk-car-edge wk-car-edge--left"><ArrowIcon /></span>
      </button>
      <button type="button" className="wk-car-zone wk-car-zone--right" aria-label="Next view" disabled={i === last} onPointerMove={(e) => track(e, "right")} onClick={() => step(1)}>
        <span className="wk-car-edge"><ArrowIcon /></span>
      </button>
      <span ref={cursor} className={`wk-car-cursor${side && !atEnd ? " is-on" : ""}${side === "left" ? " is-left" : ""}`} aria-hidden="true">
        <span className="wk-car-cursor-in"><ArrowIcon /></span>
      </span>

      <button type="button" className="wk-car-expand" data-lightbox-src={slides[i].src} data-lightbox-alt={slides[i].alt} aria-label={`View ${slides[i].alt} full size`} onPointerEnter={() => setSide(null)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M11 8v6M8 11h6M21 21l-4.3-4.3" /></svg>
      </button>

      <p className="wk-car-sr" aria-live="polite">View {i + 1} of {slides.length}: {slides[i].alt}</p>

      <div className="wk-car-dots" role="group" aria-label="Choose a view" style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}> {/* the blur is inline, as on the top navigation: the stylesheet build drops backdrop-filter */}
        {slides.map((s, n) => (
          <button key={s.src} type="button" className={n === i ? "is-on" : undefined} onClick={() => go(n)} aria-label={`View ${n + 1}: ${s.alt}`} aria-current={n === i ? "true" : undefined}>
            <i />
          </button>
        ))}
      </div>
    </div>
  );
}
