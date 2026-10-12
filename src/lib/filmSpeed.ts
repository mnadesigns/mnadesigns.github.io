"use client";

import { useEffect, type RefObject } from "react";

// How much faster than drawn every slide of every work plays: the slide lengths, the CSS-driven movement inside the slides, the videos and the progress bars run this many times faster.
export const FILM_SPEED = 1.25;

// Speeds up every CSS animation and transition inside the element (the bars that show progress are left alone: their lengths are already scaled).
// Animations that the motion library drives are not touched: changing their clock or rate from outside leaves slides blank or stuck.
export function useFilmClock(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tick = () => {
      for (const a of el.getAnimations({ subtree: true })) {
        if (!(a instanceof CSSAnimation || a instanceof CSSTransition)) continue;
        const target = (a.effect as KeyframeEffect | null)?.target as Element | null;
        if (target?.closest(".film-progress, .film-total")) continue;
        if (a.playbackRate !== FILM_SPEED) a.updatePlaybackRate(FILM_SPEED);
      }
    };
    const id = setInterval(tick, 100);
    el.addEventListener("animationstart", tick, true);
    el.addEventListener("transitionrun", tick, true);
    return () => { clearInterval(id); el.removeEventListener("animationstart", tick, true); el.removeEventListener("transitionrun", tick, true); };
  }, [ref]);
}
