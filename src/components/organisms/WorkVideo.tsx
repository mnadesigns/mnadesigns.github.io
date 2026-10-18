"use client";

import { useEffect, useRef, useState } from "react";

// An mp4 on the work details page: plays on its own while on screen, with a round play/pause button and a seekable progress bar over the bottom of the picture.
export function WorkVideo({ src, poster, alt }: { src: string; poster?: string; alt: string }) {
  const box = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false); // held by the viewer
  const [progress, setProgress] = useState(0);
  const heldRef = useRef(false);

  useEffect(() => {
    const el = box.current, v = vid.current;
    if (!el || !v) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches; // reduced motion: the video waits for the viewer to press play
    const io = new IntersectionObserver((entries) => {
      const e = entries[entries.length - 1]; // the latest state, if several changes arrive together
      if (e.isIntersecting && !heldRef.current && !calm) v.play().catch(() => {});
      else v.pause();
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    heldRef.current = !paused;
    setPaused(!paused);
    if (paused) v.play().catch(() => {}); else v.pause();
  };

  const seek = (e: React.PointerEvent<HTMLDivElement>) => {
    const v = vid.current;
    if (!v || !v.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)) * v.duration;
  };

  return (
    <div ref={box} className="wk-item wk-vid">
      <video
        ref={vid}
        src={src}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        onTimeUpdate={(e) => { const v = e.currentTarget; setProgress(v.duration ? v.currentTime / v.duration : 0); }}
      />
      <div className="wk-ctl">
        <button type="button" className="film-pp" onClick={toggle} aria-label={paused ? "Play" : "Pause"}>
          {paused ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3l8 5-8 5z" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" /></svg>}
        </button>
        <div
          className="wk-bar"
          role="slider"
          tabIndex={0}
          onKeyDown={(e) => {
            const v = vid.current;
            if (!v || !v.duration) return;
            if (e.key === "ArrowRight" || e.key === "ArrowLeft") { e.preventDefault(); v.currentTime = Math.min(v.duration, Math.max(0, v.currentTime + (e.key === "ArrowRight" ? 1 : -1))); }
          }}
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          onPointerDown={(e) => { e.currentTarget.setPointerCapture(e.pointerId); seek(e); }}
          onPointerMove={(e) => { if (e.buttons) seek(e); }}
        >
          <i style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </div>
  );
}
