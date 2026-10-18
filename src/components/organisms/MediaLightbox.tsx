"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Item = { kind: "image" | "video"; src: string; alt: string; poster?: string };

const Svg = ({ d, circle }: { d: string; circle?: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {circle && <circle cx="11" cy="11" r="7" />}
    <path d={d} />
  </svg>
);

// The media area of a work details page, with a full-view overlay (the way Dribbble opens a shot): click an image or a video and it opens large over the page on a dark backdrop,
// with a zoom button and a close button at the top right. Esc, the close button or a click outside the picture closes it; the page behind does not scroll.
export function MediaLightbox({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<Item | null>(null);
  const [zoom, setZoom] = useState(false);
  const [closing, setClosing] = useState(false);
  const [ratio, setRatio] = useState(0); // width / height of the picture, known once it has loaded: the picture is sized to the largest it can be inside the window
  const opener = useRef<Element | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => { setItem(null); setClosing(false); setZoom(false); (opener.current as HTMLElement | null)?.focus?.(); }, 180);
  }, []);

  const pick = (t: HTMLElement): Item | null => {
    const exp = t.closest<HTMLElement>("[data-lightbox-src]"); // the expand button of a carousel
    if (exp) return { kind: "image", src: exp.dataset.lightboxSrc!, alt: exp.dataset.lightboxAlt ?? "" };
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

  // while it is open: Esc closes, Tab stays inside, the page behind does not scroll
  useEffect(() => {
    if (!item) return;
    closeBtn.current?.focus();
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
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
  }, [item, close]);

  return (
    <>
      <section
        className="shell wk-media"
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
            {item.kind === "image" && (
              <button type="button" className="wk-lb-btn" onClick={() => setZoom((z) => !z)} aria-label={zoom ? "Zoom out" : "Zoom in"} aria-pressed={zoom}>
                {zoom ? <Svg circle d="M8 11h6M21 21l-4.3-4.3" /> : <Svg circle d="M11 8v6M8 11h6M21 21l-4.3-4.3" />}
              </button>
            )}
            <button ref={closeBtn} type="button" className="wk-lb-btn" onClick={close} aria-label="Close full view">
              <Svg d="M6 6l12 12M18 6 6 18" />
            </button>
          </div>
          <div className={`wk-lb-stage${zoom ? " is-zoom" : ""}`} onClick={(e) => { if (e.target === e.currentTarget) close(); }}>
            {item.kind === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={item.src} alt={item.alt} onClick={() => setZoom((z) => !z)} onLoad={(e) => setRatio(e.currentTarget.naturalWidth / e.currentTarget.naturalHeight)} style={!zoom && ratio ? { width: `min(100%, calc((100vh - 48px) * ${ratio}))` } : undefined} draggable={false} />
            ) : (
              <video src={item.src} poster={item.poster} controls autoPlay={!window.matchMedia("(prefers-reduced-motion: reduce)").matches} loop muted playsInline aria-label={item.alt} onLoadedMetadata={(e) => setRatio(e.currentTarget.videoWidth / e.currentTarget.videoHeight)} style={ratio ? { width: `min(100%, calc((100vh - 48px) * ${ratio}))` } : undefined} />
            )}
          </div>
        </div>
      )}
    </>
  );
}
