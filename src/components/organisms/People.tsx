"use client";

import { useEffect, useRef } from "react";
import { quotes, receipts } from "@/data/site";
import { Btn, BtnCircle } from "@/components/atoms/Buttons";
import { Reveal } from "@/components/atoms/Reveal";

// Testimonial belt: ~35px/s leftward drift, drag/swipe, pauses on hover; two duplicated sets loop seamlessly.
function Belt() {
  const belt = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const b = belt.current!, t = track.current!;
    let half = 0, x = 0, dragging = false, hovering = false, startX = 0, startPos = 0, last = performance.now(), raf = 0;
    const measure = () => { half = t.scrollWidth / 2; };
    measure();
    window.addEventListener("resize", measure);
    const apply = () => {
      if (half > 0) { while (x <= -half) x += half; while (x > 0) x -= half; }
      t.style.transform = `translateX(${x}px)`;
    };
    const tick = (now: number) => {
      const dt = Math.min(now - last, 50); last = now;
      if (!dragging && !hovering) { x -= dt * 0.035; apply(); }
      raf = requestAnimationFrame(tick);
    };
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) raf = requestAnimationFrame(tick);
    const enter = () => (hovering = true), leave = () => (hovering = false);
    const down = (e: PointerEvent) => { dragging = true; b.classList.add("dragging"); startX = e.clientX; startPos = x; try { b.setPointerCapture(e.pointerId); } catch {} };
    const move = (e: PointerEvent) => { if (dragging) { x = startPos + (e.clientX - startX); apply(); } };
    const end = () => { dragging = false; b.classList.remove("dragging"); };
    b.addEventListener("pointerenter", enter); b.addEventListener("pointerleave", leave);
    b.addEventListener("pointerdown", down); b.addEventListener("pointermove", move);
    b.addEventListener("pointerup", end); b.addEventListener("pointercancel", end);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", measure); };
  }, []);
  return (
    <div className="receipts">
      <p className="receipts-intro">Unedited messages from people I have worked with.</p>
      <div className="receipts-belt" ref={belt}>
        <div className="receipts-track" ref={track}>
          {[0, 1].flatMap((s) => receipts.map((n) => <div className="receipt" key={`${s}-${n}`}>Screenshot {n}</div>))}
        </div>
      </div>
    </div>
  );
}

export function People() {
  return (
    <section className="people shell" id="people">
      <Reveal>
        <div className="sec-intro">
          <div>
            <h2 className="h2">They&apos;ll <em>vouch</em></h2>
            <p className="sec-sub">A short line introducing what colleagues and founders say about working with you.</p>
          </div>
          <BtnCircle href="https://www.linkedin.com/" label="More on LinkedIn" />
        </div>
      </Reveal>
      <Reveal>
        <div className="quote-grid">
          {quotes.map((q) => (
            <figure key={q.by} className={`quote-card${q.variant ? ` quote-card--${q.variant}` : ""}`} style={{ margin: 0 }}>
              <blockquote className="quote-text" style={{ margin: undefined }}>{q.text}</blockquote>
              <figcaption className="quote-who">
                <span className="quote-face" />
                <span><div className="quote-by">{q.by}</div><div className="quote-role">{q.role}</div></span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>
      <div className="vouch-also">
        <p className="vouch-also-lead">People I have mentored say it too.</p>
        <Btn href="/about/">Read more</Btn>
      </div>
      <Belt />
    </section>
  );
}
