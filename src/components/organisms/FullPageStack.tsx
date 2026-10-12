"use client";

import { Children, useEffect, useRef, type ReactNode } from "react";
import { animate, motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Full-page scrolling for a stack of full-screen panels, after react-full-page-scroller (carlosjunod): the stack is one full-screen viewport, the panels slide through it
// one at a time (the old one leaves upward as the next arrives from below), a wheel or swipe has to add up to a threshold, a step locks input while it runs, and the
// wheel is cancelled while the stack is in charge. Two things the library does not do, so the page can never trap you: at the first and last panel the page scrolls on,
// and when the stack comes into view the first scroll glides it to fill the screen. No dots or pagination.
const DURATION = 0.65; // seconds one step takes
const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const THRESHOLD = 100; // how much wheel (or how far a swipe, in px at 45) it takes to step
const QUIET_MS = 260; // after a step, wheel events are ignored until none has arrived for this long (the coasting tail of a trackpad flick; long enough to ride out a busy page stalling for a moment)

function Slide({ index, pos, children }: { index: number; pos: MotionValue<number>; children: ReactNode }) {
  const y = useTransform(pos, (v) => `${(index - v) * 100}%`);
  return <motion.div className="fp-slide" style={{ y }}>{children}</motion.div>;
}

export function FullPageStack({ children, className }: { children: ReactNode; className?: string }) {
  const items = Children.toArray(children);
  const count = items.length;
  const root = useRef<HTMLDivElement>(null);
  const pos = useMotionValue(0);
  const on = !useReducedMotion(); // with reduced motion the panels simply follow one another down the page

  useEffect(() => {
    const el = root.current;
    if (!el || !on) return;
    let page = 0;
    let busy = false;
    let snapping = false;
    let quiet = false;
    let delta = 0;
    let lastT = 0;
    let tailMin = Infinity; // the weakest wheel event seen since the last step: a coasting tail fades to almost nothing before anything new can begin
    let touchY = 0;
    let touchStepped = false;
    let scrollCtl: { stop: () => void } | null = null;

    const top = () => el.getBoundingClientRect().top;
    const pinned = () => Math.abs(top()) <= 3;
    const canMove = (dir: number) => (dir > 0 && page < count - 1) || (dir < 0 && page > 0);
    // the stack is part-way on screen in the direction you are scrolling: it should glide into place
    const nearly = (dir: number) => (dir > 0 && top() > 3 && top() < innerHeight * 0.9) || (dir < 0 && top() < -3 && top() > -innerHeight * 0.9);

    const go = (dir: number) => {
      page += dir;
      busy = true;
      delta = 0;
      tailMin = Infinity;
      animate(pos, page, { duration: DURATION, ease: EASE, onComplete: () => { busy = false; quiet = true; } });
    };
    const snap = () => {
      snapping = true;
      scrollCtl?.stop();
      scrollCtl = animate(window.scrollY, window.scrollY + top(), {
        duration: 0.5,
        ease: EASE,
        onUpdate: (v) => window.scrollTo({ top: v, behavior: "instant" }),
        onComplete: () => { snapping = false; quiet = true; },
      });
    };

    const onWheel = (e: WheelEvent) => {
      const abs = Math.abs(e.deltaY);
      if (e.ctrlKey || abs < 2 || Math.abs(e.deltaX) > abs) return;
      const now = performance.now();
      const gap = now - lastT;
      if (busy || quiet) tailMin = Math.min(tailMin, abs);
      const fresh = abs >= 40 && tailMin <= 20 && abs > tailMin * 2 + 30; // a new flick: the tail has faded away and the strength jumps back up (noise in a hard flick never does both)
      lastT = now;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (snapping) { e.preventDefault(); return; }
      if (!pinned()) {
        if (nearly(dir)) { e.preventDefault(); snap(); }
        return;
      }
      if (busy || (quiet && !fresh && gap < QUIET_MS)) { e.preventDefault(); return; }
      quiet = false;
      tailMin = Infinity;
      if (!canMove(dir)) return; // first or last panel: the page scrolls on
      e.preventDefault();
      if (gap > 150 || Math.sign(delta) !== dir) delta = 0;
      delta += e.deltaY;
      if (Math.abs(delta) >= THRESHOLD) go(dir);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const dir = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey) ? 1 : e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey) ? -1 : 0;
      if (!dir) return;
      if (snapping) { e.preventDefault(); return; }
      if (!pinned()) { if (nearly(dir)) { e.preventDefault(); snap(); } return; }
      if (!canMove(dir)) return;
      e.preventDefault();
      if (!busy) go(dir);
    };

    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; touchStepped = false; };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchY - e.touches[0].clientY;
      if (touchStepped) { e.preventDefault(); return; } // the stack already took this swipe: the rest of it must not scroll the page
      if (Math.abs(dy) < 6) return;
      const dir = dy > 0 ? 1 : -1;
      if (snapping) { e.preventDefault(); return; }
      if (!pinned()) { if (nearly(dir) && !touchStepped) { e.preventDefault(); touchStepped = true; snap(); } return; }
      if (!canMove(dir)) return;
      e.preventDefault();
      if (!busy && !touchStepped && Math.abs(dy) >= 45) { touchStepped = true; go(dir); }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      scrollCtl?.stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [on, count, pos]);

  return (
    <div ref={root} className={`${className ?? ""}${on ? "" : " fp-off"}`}>
      {items.map((c, i) => <Slide key={i} index={i} pos={pos}>{c}</Slide>)}
    </div>
  );
}
