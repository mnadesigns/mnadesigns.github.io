"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { kind: "image" | "video"; src: string; alt: string; poster?: string; set?: { src: string; alt: string }[]; i?: number }; // set: the other views of a carousel, so the full view can move through them

const Svg = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
  </svg>
);

// The media area of a work details page, with a full-view overlay (the way Dribbble opens a shot): click an image or a video and it opens large over the page on a dark backdrop,
// with a close button at the top right. Esc, the close button or a click outside the picture closes it; the page behind does not scroll.
// The full view of a carousel has the carousel's own arrows: the halves of the screen are the previous and the next buttons, and the pointer becomes the big circle.
export function MediaLightbox({ children, work }: { children: React.ReactNode; work?: string }) { // work: the slug of the page, so a stylesheet can set one page's rhythm on its own
  const [item, setItem] = useState<Item | null>(null);
  const [side, setSide] = useState<"left" | "right" | null>(null);
  const cursor = useRef<HTMLSpanElement>(null);
  const [closing, setClosing] = useState(false);
  const [ratio, setRatio] = useState(0); // width / height of the picture, known once it has loaded: the picture is sized to the largest it can be inside the window
  const opener = useRef<Element | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setItem(null); setClosing(false); (opener.current as HTMLElement | null)?.focus?.(); }, 180);
  }, []);

  const pick = (t: HTMLElement): Item | null => {
    const exp = t.closest<HTMLElement>("[data-lightbox-src]"); // the expand button of a carousel
    if (exp) {
      let set: Item["set"];
      try { set = JSON.parse(exp.dataset.lightboxSet ?? "null") ?? undefined; } catch { set = undefined; }
      return { kind: "image", src: exp.dataset.lightboxSrc!, alt: exp.dataset.lightboxAlt ?? "", set, i: Number(exp.dataset.lightboxI ?? 0) };
    }
    const img = t.closest<HTMLImageElement>(".wk-item img");
    if (img) return { kind: "image", src: img.currentSrc || img.src, alt: img.alt };
    const vid = t.closest<HTMLVideoElement>(".wk-vid video");
    if (vid) return { kind: "video", src: vid.currentSrc || vid.src, alt: vid.getAttribute("aria-label") ?? "", poster: vid.poster || undefined };
    return null;
  };

  const open = (t: HTMLElement) => {
    const next = pick(t);
    if (!next) return;
    opener.current = document.activeElement;
    setRatio(0);
    setItem(next);
  };

  // the arrows of a carousel's full view: the next and the previous view, never past either end
  const step = useCallback((d: number) => {
    setItem((it) => {
      if (!it?.set) return it;
      const n = Math.max(0, Math.min(it.set.length - 1, (it.i ?? 0) + d));
      if (n === it.i) return it;
      setRatio(0);
      return { ...it, src: it.set[n].src, alt: it.set[n].alt, i: n };
    });
  }, []);
  const track = (e: React.PointerEvent<HTMLButtonElement>, s: "left" | "right") => {
    if (e.pointerType !== "mouse") return;
    if (cursor.current) cursor.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    setSide(s);
  };
  const swipe = useRef<{ x: number; y: number } | null>(null);

  // while it is open: Esc closes, Tab stays inside, the page behind does not scroll
  useEffect(() => {
    if (!item) return;
    closeBtn.current?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "Tab") {
        const focusable = Array.from(document.querySelectorAll<HTMLElement>(".wk-lb button, .wk-lb video"));
        if (!focusable.length) return;
        const first = focusable[0], last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("keydown", onKey); html.style.overflow = prev; };
  }, [item, close, step]);

  return (
    <>
      <section
        className="shell wk-media"
        data-work={work}
        onClick={(e) => open(e.target as HTMLElement)}
        onKeyDown={(e) => {
          const t = e.target as HTMLElement;
          if ((e.key === "Enter" || e.key === " ") && t.matches(".wk-item[role='button']")) { e.preventDefault(); const img = t.querySelector("img"); if (img) open(img); }
        }}
      >
        {children}
      </section>

      {item && (
        <div className={`wk-lb${closing ? " is-out" : ""}`} role="dialog" aria-modal="true" aria-label={item.alt || "Full view"} data-cursor="light">
          <div className="wk-lb-tools">
            <button ref={closeBtn} type="button" className="wk-lb-btn" onClick={close} aria-label="Close full view">
              <Svg d="M6 6l12 12M18 6 6 18" />
            </button>
          </div>
          {item.set && item.set.length > 1 && (
            <>
              <button type="button" className="wk-car-zone wk-car-zone--left" onClick={() => step(-1)} disabled={item.i === 0} onPointerMove={(e) => track(e, "left")} onPointerLeave={() => setSide(null)} aria-label="Previous view">
                <span className="wk-car-edge wk-car-edge--left"><ArrowIcon /></span>
              </button>
              <button type="button" className="wk-car-zone wk-car-zone--right" onClick={() => step(1)} disabled={item.i === item.set.length - 1} onPointerMove={(e) => track(e, "right")} onPointerLeave={() => setSide(null)} aria-label="Next view">
                <span className="wk-car-edge"><ArrowIcon /></span>
              </button>
              <span ref={cursor} className={`wk-car-cursor${side && !(side === "left" ? item.i === 0 : item.i === item.set.length - 1) ? " is-on" : ""}${side === "left" ? " is-left" : ""}`} aria-hidden="true">
                <span className="wk-car-cursor-in"><ArrowIcon /></span>
              </span>
              <p className="wk-lb-count" aria-live="polite">{(item.i ?? 0) + 1} / {item.set.length}</p>
            </>
          )}
          <div
            className="wk-lb-stage"
            onTouchStart={(e) => { swipe.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null; }}
            onTouchEnd={(e) => { const s0 = swipe.current; swipe.current = null; if (!s0) return; const dx = e.changedTouches[0].clientX - s0.x, dy = e.changedTouches[0].clientY - s0.y; if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1); }}
            onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            {item.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt={item.alt} onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)} style={ratio ? { width: `min(100%, calc((100vh - 48px) * ${ratio}))` } : undefined} draggable={false} />
            ) : (
              <video src={item.src} poster={item.poster} controls autoPlay={!window.matchMedia("(prefers-reduced-motion: reduce)").matches} loop muted playsInline aria-label={item.alt} onLoadedMetadata={(e) => setRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight)} style={ratio ? { width: `min(100%, calc((100vh - 48px) * ${ratio}))` } : undefined} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
