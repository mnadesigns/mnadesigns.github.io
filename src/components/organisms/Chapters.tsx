"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { adBeats, chapters, site } from "@/data/site";
import { Arrow, BtnCircle } from "@/components/atoms/Buttons";
import { Reveal } from "@/components/atoms/Reveal";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// Kinetic-type ad: 10 beats, colour dissolves on its own layer, subject fades fast, slow scale drift.
function KineticAd() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const still = useReducedMotion();
  const idx = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (still) return;
    const el = ref.current!;
    const advance = () => {
      idx.current = (idx.current + 1) % adBeats.length;
      setI(idx.current);
      timer.current = setTimeout(advance, adBeats[idx.current].dur);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !timer.current) timer.current = setTimeout(advance, adBeats[idx.current].dur);
        else if (!e.isIntersecting && timer.current) { clearTimeout(timer.current); timer.current = null; }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => { io.disconnect(); if (timer.current) clearTimeout(timer.current); timer.current = null; };
  }, [still]);

  // count-up for beats that carry a giant number
  useEffect(() => {
    const b = adBeats[i];
    if (!b.giant) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - t0) / 1900, 1);
      setCounts((c) => ({ ...c, [i]: Math.round(ease(p) * b.giant!) }));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [i]);

  const cur = still ? adBeats.length - 2 : i;
  return (
    <div ref={ref} className={`sloop${still ? " static" : ""}${adBeats[cur].dark ? " fg-on-dark" : ""}`}>
      <div className="sl-bg" style={{ background: still ? "#fff" : adBeats[cur].bg }} />
      {adBeats.map((b, j) => (
        <div
          key={j}
          className={`sl-card${j === cur ? " on" : ""}${j === adBeats.length - 2 ? " sl-park" : ""}`}
          style={{ "--beat": b.dur + "ms" } as React.CSSProperties}
        >
          <div className="sl-hero">
            {b.line && <div className="sl-line" dangerouslySetInnerHTML={{ __html: b.line }} />}
            {b.giant && <div className="sl-giant">{(counts[j] ?? 0).toLocaleString("en-US")}{b.suffix}</div>}
            {b.tag && <div className="sl-tag">{b.tag}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

function Plate({ c }: { c: (typeof chapters)[number] }) {
  return (
    <div className="chap-plate">
      <span className="chap-name">{c.name}</span>
      <div className="chap-role" dangerouslySetInnerHTML={{ __html: c.role }} />
      <p className="chap-sub">{c.sub}</p>
      <div className="chap-stats">
        {c.stats.map((s) => (
          <div className="chap-stat" key={s.l}><b>{s.v}</b><i>{s.l}</i></div>
        ))}
      </div>
      <span className="btn-text">See the work <Arrow /></span>
    </div>
  );
}

// Theater mode: the copy plate hides after 2s of mouse stillness (fine pointers only).
function Chapter({ c }: { c: (typeof chapters)[number] }) {
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => {
    const el = ref.current!;
    if (!window.matchMedia("(pointer:fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let idle: ReturnType<typeof setTimeout>;
    let over = false;
    const arm = () => { clearTimeout(idle); if (!over) idle = setTimeout(() => el.classList.add("plate-rest"), 2000); };
    const wake = () => { el.classList.remove("plate-rest"); arm(); };
    const plate = el.querySelector(".chap-plate")!;
    const enter = () => { over = true; clearTimeout(idle); el.classList.remove("plate-rest"); };
    const leave = () => { over = false; arm(); };
    el.addEventListener("mousemove", wake, { passive: true });
    el.addEventListener("mouseleave", wake);
    plate.addEventListener("mouseenter", enter);
    plate.addEventListener("mouseleave", leave);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? arm() : (clearTimeout(idle), el.classList.remove("plate-rest"))), { threshold: 0.4 });
    io.observe(el);
    return () => { clearTimeout(idle); io.disconnect(); el.removeEventListener("mousemove", wake); el.removeEventListener("mouseleave", wake); };
  }, []);
  return (
    <Link href={c.href} className="chap" ref={ref}>
      <div className="chap-media">
        {c.kind === "ad" ? <KineticAd /> : <div className="ph-box">{c.kind === "film" ? "Film placeholder 16:9" : "Image placeholder 16:9"}</div>}
      </div>
      <span className="ph-tag">{c.tag}</span>
      <Plate c={c} />
    </Link>
  );
}

export function Chapters() {
  return (
    <section className="chapters" id="chapters">
      <div className="shell">
        <Reveal>
          <div className="sec-intro" style={{ marginBottom: 0 }}>
            <div>
              <h2 className="h2">Selected <em>work</em></h2>
              <p className="sec-sub">Four pieces of work, from a tax-credit SaaS to a pharma design system.</p>
            </div>
            <BtnCircle href={site.behance} label="On Behance" />
          </div>
        </Reveal>
      </div>
      <div className="chap-stack">
        {chapters.map((c) => <Chapter key={c.name} c={c} />)}
      </div>
      <div className="shell">
        <div className="chap-out">
          <div className="chap-out-left">
            <p>Want to see more? The full portfolio and case studies are on Behance.</p>
          </div>
          <BtnCircle href={site.behance} label="Open Behance" />
        </div>
      </div>
    </section>
  );
}
