"use client";

import { useEffect, type RefObject } from "react";
import { animate } from "motion/react";

// Full-page scrolling for the stack of full-screen works, after the react-full-page example (zwug): the panels are ordinary full-height blocks, a wheel, swipe or
// key press scrolls the real page to the next one over 700 ms with an ease-in-out-cubic curve, and the wheel is locked while that runs. No dots or pagination.
// Because it is the page that scrolls, nothing has to remember where you were. Two things the example does not do, so the page can never trap you or race ahead:
// at the first and last work the page scrolls on, and the coasting tail of a hard trackpad flick is ignored instead of stepping again.
const DURATION = 0.7; // seconds one step takes
const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1]; // ease-in-out-cubic
const THRESHOLD = 30; // how much wheel it takes to step
const QUIET_MS = 450; // after a step, wheel events are ignored until none has arrived for this long (the tail of a trackpad flick)
const NEAR = 0.9; // the stack counts as "arriving" once this much of a screen of it is showing

export function useFullPageScroll(stack: RefObject<HTMLElement | null>, panelSelector: string) {
  useEffect(() => {
    const el = stack.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = () => el.querySelectorAll(panelSelector).length;
    const top = () => el.getBoundingClientRect().top + window.scrollY;
    const vh = () => window.innerHeight;

    let pending = false; // a step is running
    let quiet = false;
    let holdUntil = 0;
    let tailMin = Infinity; // the weakest wheel event since the last step: a coasting tail fades to almost nothing before anything new can begin
    let delta = 0;
    let lastT = 0;
    let touchY = 0;
    let touchDone = false;
    let ctl: { stop: () => void } | null = null;

    const go = (index: number) => {
      pending = true;
      delta = 0;
      tailMin = Infinity;
      ctl?.stop();
      ctl = animate(window.scrollY, top() + index * vh(), {
        duration: DURATION,
        ease: EASE,
        onUpdate: (v) => window.scrollTo({ top: v, behavior: "instant" }),
        onComplete: () => { pending = false; quiet = true; tailMin = Infinity; holdUntil = performance.now() + 300; },
      });
    };

    // What one step in a direction (1 down, -1 up) means from where the page is now: the panel to go to, "out" to let the page scroll on, or "none" when the stack is nowhere near.
    const plan = (dir: number): number | "out" | "none" => {
      const n = count();
      const rel = (window.scrollY - top()) / vh();
      if (rel > -0.001 && rel < n - 1 + 0.001) {
        const next = dir > 0 ? Math.floor(rel + 0.001) + 1 : Math.ceil(rel - 0.001) - 1;
        return next >= 0 && next <= n - 1 ? next : "out";
      }
      if (dir > 0 && rel < 0 && rel > -NEAR) return 0; // arriving from above: glide in to the first work
      if (dir < 0 && rel > n - 1 && rel < n - 1 + NEAR) return n - 1; // arriving from below: glide in to the last
      return "none";
    };
    const inside = () => { const n = count(); const rel = (window.scrollY - top()) / vh(); return rel > -NEAR && rel < n - 1 + NEAR; };

    const onWheel = (e: WheelEvent) => {
      const abs = Math.abs(e.deltaY);
      if (e.ctrlKey || abs < 2 || Math.abs(e.deltaX) > abs) return;
      const now = performance.now();
      const gap = now - lastT;
      lastT = now;
      const dir = e.deltaY > 0 ? 1 : -1;
      if (!inside()) return;
      if (pending || now < holdUntil) { e.preventDefault(); return; }
      if (quiet) {
        tailMin = Math.min(tailMin, abs);
        const fresh = abs >= 40 && tailMin <= 20 && abs > tailMin * 2 + 30; // a new flick: the tail has faded away and the strength jumps back up
        if (!fresh && gap < QUIET_MS) { e.preventDefault(); return; }
        quiet = false;
        tailMin = Infinity;
      }
      const target = plan(dir);
      if (target === "none" || target === "out") return;
      e.preventDefault();
      if (gap > 150 || Math.sign(delta) !== dir) delta = 0;
      delta += e.deltaY;
      if (Math.abs(delta) >= THRESHOLD) go(target);
    };

    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      const dir = e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !e.shiftKey) ? 1 : e.key === "ArrowUp" || e.key === "PageUp" || (e.key === " " && e.shiftKey) ? -1 : 0;
      if (!dir || !inside()) return;
      const target = plan(dir);
      if (target === "none" || target === "out") return;
      e.preventDefault();
      if (!pending) go(target);
    };

    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; touchDone = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!inside()) return;
      if (touchDone || pending) { e.preventDefault(); return; } // the rest of a swipe that already moved the page must not scroll it
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < 20) return;
      const target = plan(dy > 0 ? 1 : -1);
      if (target === "none" || target === "out") return;
      e.preventDefault();
      touchDone = true;
      go(target);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      ctl?.stop();
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [stack, panelSelector]);
}
