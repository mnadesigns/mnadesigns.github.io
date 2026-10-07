"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { adBeats, chapters, site } from "@/data/site";
import { Arrow, BtnCircle } from "@/components/atoms/Buttons";
import { Reveal } from "@/components/atoms/Reveal";
import { ProjectsDelivered, WelcomeScene } from "./QuodarcaScenes";
import { ProcessChallenges } from "./ProcessChallenges";
import { ApproachScene } from "./ApproachScene";
import { ZeroGaspiScene } from "./ZeroGaspiScene";
import { KeysboroughScene } from "./KeysboroughScene";
import { DesignSystemScene } from "./DesignSystemScene";
import { ProductFeatures } from "./ProductFeatures";
import type { FilmClip, FilmItem, FilmSlide } from "@/types/film";
import { ToolIcon } from "@/components/atoms/ToolIcons";
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

  const cur = still ? adBeats.length - 1 : i;
  return (
    <div ref={ref} className={`sloop${still ? " static" : ""}${adBeats[cur].dark ? " fg-on-dark" : ""}`}>
      <div className="sl-bg" style={{ background: still ? "#fff" : adBeats[cur].bg }} />
      {adBeats.map((b, j) => (
        <div
          key={j}
          className={`sl-card${j === cur ? " on" : ""}${j === adBeats.length - 1 ? " sl-park" : ""}`}
          style={{ "--beat": b.dur + "ms" } as React.CSSProperties}
        >
          <div className="sl-hero">
            {b.kicker && (
              <div className="sl-kicker">
                <span>{b.kicker}</span>
              </div>
            )}
            {b.icons && (
              <div className="sl-icons">
                {b.icons?.map((n) => <ToolIcon key={n} name={n} />)}
              </div>
            )}
            {b.line && <div className="sl-line" dangerouslySetInnerHTML={{ __html: b.line }} />}
            {b.shot && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className={`sl-screen${b.shot.fit ? " sl-screen--" + b.shot.fit : ""}`} src={b.shot.src} alt={b.shot.alt} />
            )}
            {b.giant && <div className="sl-giant">{(counts[j] ?? 0).toLocaleString("en-US")}{b.suffix}</div>}
            {b.tag && <div className="sl-tag">{b.tag}</div>}
            {b.logo && (
              <div className="sl-brand">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.logo.src} alt={b.logo.name} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// A designed slide that sits between two clips of a chapter film (see ChapterFilm). Static; it only fades in and out.
function FilmSlideView({ s, active, holdMs = 0 }: { s: FilmSlide; active: boolean; holdMs?: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active || !s.giant) return;
    let raf = 0;
    const t0 = performance.now() + 250; // the count starts as the slide settles
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - t0) / 1300));
      setN(Math.round(s.giant! * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, s.giant]);
  return (
    <div className={`sloop film-slide${s.dark ? " fg-on-dark" : ""}${active ? " on" : ""}`} style={{ transitionDelay: `${holdMs}ms` }} aria-hidden={!active}>
      <div className="sl-bg" style={{ background: s.bg }} />
      <div className={`sl-card${active ? " on" : ""}`} style={{ "--beat": s.dur + "ms" } as React.CSSProperties}>
        <div className="sl-hero">
          <div className="sl-kicker"><span>{s.kicker}</span></div>
          {s.line && <div className="sl-line">{s.line}</div>}
          {s.giant ? <div className="sl-giant">{(active ? n : 0).toLocaleString("en-US")}{s.suffix}</div> : null}
          {s.tag && <div className="sl-tag">{s.tag}</div>}
        </div>
      </div>
    </div>
  );
}

// A chapter film: video clips and designed slides that play one after another on a loop, only while the panel is on screen.
// Two video elements take turns: while one plays, the other already holds the next clip, so a slide never waits on a download.
// Every hand-off is a short cross-fade: a slide fades in over the clip's last frame and, once it fully covers it, the next clip
// is swapped in underneath; when the slide ends it fades out over that clip, which is already in place. Clips are shown whole,
// never cropped; the bars beside them are one colour per clip, the same on both sides (see .chap-film).
const FADE_MS = 400;
function ChapterFilm({ items, poster }: { items: FilmItem[]; poster: string }) {
  const els = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const root = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const [step, setStep] = useState(0); // counts items played; the item is items[step % n]
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0); // which video element is on show (0 or 1)
  const [started, setStarted] = useState(false); // the first clip has played, so the poster is no longer needed
  const n = items.length;
  const hasClips = items.some((it) => it.type === "clip"); // a film made only of scenes and slides has no video to manage
  const clipAt = (i: number) => items[i % n].type === "clip";
  const clipsBefore = (s: number) => {
    const per = items.filter((it) => it.type === "clip").length;
    let k = Math.floor(s / n) * per;
    for (let i = 0; i < s % n; i++) if (clipAt(i)) k++;
    return k;
  };
  const nextClip = (s: number) => { if (!hasClips) return s; let k = s; while (!clipAt(k)) k++; return k; };
  const now = nextClip(step); // the clip on screen now, or the next one while a slide shows
  const after = nextClip(now + 1); // the clip after that, loading in the spare element
  const live = clipsBefore(now) % 2; // the element that holds the current clip
  const item = items[step % n];
  const clipOf = (s: number) => items[s % n] as FilmClip;
  const want: string[] = [];
  if (hasClips) {
    want[live] = clipOf(now).src;
    want[1 - live] = clipOf(after).src;
  }
  // an element only gets a new clip once it is off show (otherwise the old clip would be swapped out under the viewer's eyes)
  const [held, setHeld] = useState<string[]>(want);
  useEffect(() => {
    setHeld((h) => (h.every((s, k) => s === (k === shown ? s : want[k])) ? h : h.map((s, k) => (k === shown ? s : want[k]))));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, shown]);

  useEffect(() => {
    if (still) return;
    const io = new IntersectionObserver(
      ([e]) => { setVisible(e.isIntersecting); if (!e.isIntersecting) setStep(0); }, // leaving the panel restarts the film
      { threshold: 0.3 }
    );
    io.observe(root.current!);
    return () => io.disconnect();
  }, [still]);

  useEffect(() => {
    const v = els[live].current;
    els[1 - live].current?.pause();
    if (!v) return;
    if (visible && item.type === "clip") {
      // a clip that cannot load (missing or broken file) is skipped, so the film never stalls on it
      if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) { setTimeout(() => setStep((s) => s + 1), 0); return; }
      if (v.currentTime > 0.05) v.currentTime = 0;
      v.play().then(() => setStarted(true)).catch(() => {});
    } else v.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, visible]);

  // a clip shows its own element at once; during a slide, the next clip is swapped in only after the slide fully covers the old one
  useEffect(() => {
    if (item.type === "clip") { setShown(live); return; }
    const t = setTimeout(() => setShown(live), FADE_MS + 40);
    return () => clearTimeout(t);
  }, [step, live, item.type]);

  useEffect(() => {
    if (!visible || item.type === "clip") return;
    const t = setTimeout(() => setStep((s) => s + 1), item.dur);
    return () => clearTimeout(t);
  }, [step, visible, item]);

  return (
    <div ref={root} className="chap-film" style={{ background: hasClips ? clipOf(now).bg : "#fdfdfd" }}>
      {hasClips && [0, 1].map((k) => (
        <video
          key={k}
          ref={els[k]}
          className={`chap-video${shown === k ? " is-on" : ""}`}
          src={held[k]}
          style={{ objectFit: (items.find((it) => it.type === "clip" && it.src === held[k]) as FilmClip | undefined)?.fit }}
          poster={!started && k === 0 ? poster : undefined}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          onEnded={() => k === live && item.type === "clip" && setStep((s) => s + 1)}
          onError={() => k === live && item.type === "clip" && setStep((s) => s + 1)}
        />
      ))}
      {items.map((it, i) => {
        if (it.type === "clip") return null;
        const active = visible && step % n === i; // scenes only start animating once the panel is on screen
        // when one slide hands over to another, the one that ends stays put until the new one fully covers it
        const holdMs = !active && i === (step + n - 1) % n && item.type !== "clip" ? FADE_MS : 0;
        if (it.type === "scene") {
          if (it.id === "welcome") return <WelcomeScene key={i} active={active} holdMs={holdMs} idle={!visible} />;
          if (it.id === "process-challenges") return <ProcessChallenges key={i} active={active} holdMs={holdMs} />;
          if (it.id === "approach") return <ApproachScene key={i} active={active} holdMs={holdMs} />;
          if (it.id === "keysborough") return <KeysboroughScene key={i} active={active} holdMs={holdMs} />;
          if (it.id === "zerogaspi") return <ZeroGaspiScene key={i} active={active} holdMs={holdMs} />;
          if (it.id === "design-system") return <DesignSystemScene key={i} active={active} holdMs={holdMs} />;
          if (it.id === "product-features") return <ProductFeatures key={i} active={active} holdMs={holdMs} />;
          return <ProjectsDelivered key={i} active={active} holdMs={holdMs} />;
        }
        return <FilmSlideView key={i} s={it} active={active} holdMs={holdMs} />;
      })}
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
        {c.kind === "ad" ? <KineticAd /> : c.film ? <ChapterFilm items={c.film.items} poster={c.film.poster} /> : <div className="ph-box">{c.kind === "film" ? "Film placeholder 16:9" : "Image placeholder 16:9"}</div>}
      </div>
      {c.tag && <span className="ph-tag">{c.tag}</span>}
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
