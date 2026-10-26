"use client";

import { useEffect, useRef } from "react";

// A looping silent video that costs nothing until it is near the screen: no download before then (the poster shows), it plays while it is on screen and pauses when it leaves.
// With Save-Data on, or reduced motion, it stays on the poster.
export function LazyVideo({ src, poster, label }: { src: string; poster?: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.src) v.src = src;
          v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [src]);
  return <video ref={ref} poster={poster} muted loop playsInline preload="none" aria-label={label} />;
}
