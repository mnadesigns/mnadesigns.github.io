"use client";

import { useEffect, type RefObject } from "react";
import { animate } from "motion/react";

// Phone-only full-page scrolling for the stack of full-screen works: inside the stack a swipe moves the real page exactly one work (700 ms, ease-in-out-cubic),
// whatever the speed of the swipe, so a hard flick can never run through several. Before the first work and after the last the page scrolls as normal.
const DURATION = 0.7; // seconds one step takes
const EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const SWIPE = 20; // px of finger travel that counts as a swipe
const NEAR = 0.15; // the stack counts as "arriving" once it is almost fully on screen

export function useFullPageScroll(stack: RefObject<HTMLElement | null>, panelSelector: string) {
  useEffect(() => {
    const el = stack.current;
    const mq = window.matchMedia("(max-width: 900px) and (pointer: coarse)");
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const count = () => el.querySelectorAll(panelSelector).length;
    const panels = () => Array.from(el.querySelectorAll<HTMLElement>(panelSelector));
    const top = () => el.getBoundingClientRect().top + window.scrollY;
    const vh = () => panels()[0]?.offsetHeight || window.innerHeight; // a work is one screen tall, measured, so the phone's collapsing address bar cannot throw the steps off
    const at = (index: number) => { const p = panels()[index]; return p ? p.getBoundingClientRect().top + window.scrollY : top() + index * vh(); };

    let pending = false;
    let touchY = 0;
    let touchDone = false;
    let ctl: { stop: () => void } | null = null;

    const go = (index: number) => {
      pending = true;
      ctl?.stop();
      document.documentElement.style.scrollSnapType = "none"; // the page's own snapping would fight the glide
      ctl = animate(window.scrollY, at(index), {
        duration: DURATION,
        ease: EASE,
        onUpdate: (v) => window.scrollTo({ top: v, behavior: "instant" }),
        onComplete: () => { pending = false; document.documentElement.style.scrollSnapType = ""; },
      });
    };

    // The panel one swipe leads to (dir 1 = swipe up = next), "out" at the first/last work so the page scrolls on, "none" when the stack is not near.
    const plan = (dir: number): number | "out" | "none" => {
      const n = count();
      const rel = (window.scrollY - top()) / vh();
      if (rel > -0.001 && rel < n - 1 + 0.001) {
        const next = dir > 0 ? Math.floor(rel + 0.001) + 1 : Math.ceil(rel - 0.001) - 1;
        return next >= 0 && next <= n - 1 ? next : "out";
      }
      if (dir > 0 && rel < 0 && rel > -NEAR) return 0;
      if (dir < 0 && rel > n - 1 && rel < n - 1 + NEAR) return n - 1;
      return "none";
    };
    const inside = () => { const rel = (window.scrollY - top()) / vh(); return rel > -NEAR && rel < count() - 1 + NEAR; };

    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0].clientY; touchDone = false; };
    const onTouchMove = (e: TouchEvent) => {
      if (!mq.matches || !inside()) return;
      if (touchDone || pending) { if (e.cancelable) e.preventDefault(); return; } // the rest of a swipe that already moved the page must not scroll it
      const dy = touchY - e.touches[0].clientY;
      if (Math.abs(dy) < SWIPE) return;
      const target = plan(dy > 0 ? 1 : -1);
      if (target === "none" || target === "out") return;
      if (e.cancelable) e.preventDefault();
      touchDone = true;
      go(target);
    };

    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      ctl?.stop();
      document.documentElement.style.scrollSnapType = "";
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [stack, panelSelector]);
}
