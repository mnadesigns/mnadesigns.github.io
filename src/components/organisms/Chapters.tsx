"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { adBeats, chapters, site, clientCopy } from "@/data/site";
import { Btn, BtnCircle } from "@/components/atoms/Buttons";
import { Reveal } from "@/components/atoms/Reveal";
import { ProjectsDelivered, WelcomeScene } from "./QuodarcaScenes";
import { ProcessChallenges } from "./ProcessChallenges";
import { ApproachScene } from "./ApproachScene";
import { ZeroGaspiScene } from "./ZeroGaspiScene";
import { KeysboroughScene } from "./KeysboroughScene";
import { SpoonfulScene } from "./SpoonfulScene";
import { IpadGridScene } from "./IpadGridScene";
import { CytositeScene } from "./CytositeScene";
import { WonderPiesScene } from "./WonderPiesScene";
import { TelcoIctScene } from "./TelcoIctScene";
import { PharmacyScene } from "./PharmacyScene";
import { PeersScene } from "./PeersScene";
import { ZigbisScene } from "./ZigbisScene";
import { DesignSystemScene } from "./DesignSystemScene";
import { ProductFeatures } from "./ProductFeatures";
import type { FilmClip, FilmItem, FilmSlide } from "@/types/film";
import { ToolIcon } from "@/components/atoms/ToolIcons";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { usePhone } from "@/hooks/usePhone";
import { FILM_SPEED, useFilmClock } from "@/lib/filmSpeed";

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

// The thin bar along the bottom of a work: one equal-width segment per slide or clip, the one on screen fills as it plays (over as long as that item lasts), earlier ones are full.
// `run` changes whenever the current segment starts over, so its fill restarts.
// What the bar sits on, so it can be white on dark backgrounds and black on light ones.
type Tone = "light" | "dark";
const SCENE_TONE: Record<string, Tone> = { welcome: "dark", "process-challenges": "light", approach: "light", "design-system": "light", "product-features": "dark", "projects-delivered": "light", zerogaspi: "light", keysborough: "light", spoonful: "light", wonderpies: "light", telcoict: "light", pharmacy: "light", peers: "dark", zigbis: "light", "ipad-grid": "light", cytosite: "dark" };
const toneOfColour = (hex: string): Tone => {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex);
  if (!m) return "light";
  const n = parseInt(m[1], 16);
  return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255 < 0.5 ? "dark" : "light";
};
// A scene that goes from a light view to a dark one: the bar switches colour at that moment (ms into the scene).
const SCENE_SWAP: Record<string, { at: number; tone: Tone }> = { approach: { at: 4500, tone: "dark" } };
const toneOfItem = (it: FilmItem): Tone => (it.type === "slide" ? (it.dark ? "dark" : "light") : it.type === "clip" ? toneOfColour(it.bg) : SCENE_TONE[it.id] ?? "light");

function FilmProgress({ durs, index, playing, run, tone, swap, onJump }: { durs: number[]; index: number; playing: boolean; run: number; tone: Tone; swap?: { at: number; tone: Tone }; onJump?: (i: number) => void }) {
  const [swapped, setSwapped] = useState(-1); // the run in which the switch has happened
  useEffect(() => {
    if (!swap || !playing) return;
    const t = setTimeout(() => setSwapped(run), swap.at / FILM_SPEED);
    return () => clearTimeout(t);
  }, [swap, playing, run]);
  const shown = swap && swapped === run ? swap.tone : tone;
  const total = durs.reduce((a, b) => a + b, 0) || 1;
  const from = durs.slice(0, index).reduce((a, b) => a + b, 0) / total;
  const to = from + durs[index] / total;
  return (
    <>
      <div className={`film-progress on-${shown}`}>
        {durs.map((d, i) => (
          // a click on a segment jumps to that slide
          <button type="button" key={i} className="fpb-hit" aria-label={`Go to slide ${i + 1} of ${durs.length}`} aria-current={i === index ? "true" : undefined} onClick={(e) => { e.preventDefault(); e.stopPropagation(); onJump?.(i); }}>
            <span className="fpb-seg">
              {i < index && <i className="fpb-done" />}
              {i === index && <i key={run} className="fpb-run" style={{ animationDuration: d + "ms", animationPlayState: playing ? "running" : "paused" }} />}
            </span>
          </button>
        ))}
      </div>
      {/* phones: one bar along the bottom of the whole work, filling in the primary colour as the slides play */}
      <div className={`film-total on-${shown}`} aria-hidden="true">
        <i key={run} style={{ "--from": from, "--to": to, animationDuration: durs[index] + "ms", animationPlayState: playing ? "running" : "paused" } as React.CSSProperties} />
      </div>
    </>
  );
}

// The round play/pause button of the work details page (the slides and the clips can be held there).
function PlayPause({ paused, onClick }: { paused: boolean; onClick: () => void }) {
  return (
    <button type="button" className="film-pp" onClick={onClick} aria-label={paused ? "Play" : "Pause"}>
      {paused ? <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3l8 5-8 5z" /></svg> : <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5h2.6v11H4zM9.4 2.5H12v11H9.4z" /></svg>}
    </button>
  );
}

// Holds every running animation under el while paused (CSS animations and the ones the motion library runs through the Web Animations API); only the ones it held are let go again.
function useFreeze(ref: React.RefObject<HTMLElement | null>, paused: boolean) {
  const held = useRef<Animation[]>([]);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof el.getAnimations !== "function") return;
    if (paused) {
      held.current = el.getAnimations({ subtree: true }).filter((a) => a.playState === "running");
      held.current.forEach((a) => a.pause());
    } else {
      held.current.forEach((a) => { if (a.playState === "paused") a.play(); });
      held.current = [];
    }
  }, [ref, paused]);
}

// Kinetic-type ad: 10 beats, colour dissolves on its own layer, subject fades fast, slow scale drift.
export function KineticAd({ controls }: { controls?: boolean } = {}) {
  const ref = useRef<HTMLDivElement>(null);
  useFilmClock(ref);
  const [i, setI] = useState(0);
  const [counts, setCounts] = useState<Record<number, number>>({});
  const [playing, setPlaying] = useState(false);
  const [run, setRun] = useState(0);
  const still = useReducedMotion();
  const idx = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [paused, setPaused] = useState(false);
  const pausedRef = useRef(false);
  const due = useRef(0); // when the running beat ends
  const left = useRef(0); // what was left of the beat when it was paused
  const armRef = useRef<(ms: number) => void>(() => {});
  useFreeze(ref, paused);
  const toggle = () => {
    const next = !pausedRef.current;
    pausedRef.current = next;
    setPaused(next);
    if (next) {
      if (timer.current) { clearTimeout(timer.current); timer.current = null; left.current = Math.max(0, due.current - Date.now()); }
    } else if (left.current) armRef.current(left.current);
  };

  // a click on the bar: that beat starts now, and the clock carries on from it
  const jump = (j: number) => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
    idx.current = j;
    setI(j);
    setRun((n) => n + 1);
    const ms = adBeats[j].dur / FILM_SPEED;
    if (pausedRef.current) left.current = ms;
    else armRef.current(ms);
  };

  useEffect(() => {
    if (still) return;
    const el = ref.current!;
    const arm = (ms: number) => { due.current = Date.now() + ms; timer.current = setTimeout(advance, ms); };
    armRef.current = arm;
    const advance = () => {
      idx.current = (idx.current + 1) % adBeats.length;
      setI(idx.current);
      setRun((n) => n + 1);
      arm(adBeats[idx.current].dur / FILM_SPEED);
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (pausedRef.current) return;
        if (e.isIntersecting && !timer.current) { arm(adBeats[idx.current].dur / FILM_SPEED); setPlaying(true); setRun((n) => n + 1); }
        else if (!e.isIntersecting && timer.current) { clearTimeout(timer.current); timer.current = null; setPlaying(false); }
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
    const tick = () => {
      const p = Math.min((performance.now() - t0) / 1900, 1); // the same clock as t0 (not the frame time, which is a different clock)
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
      {!still && <FilmProgress durs={adBeats.map((b) => b.dur / FILM_SPEED)} index={cur} playing={playing && !paused} run={run} tone={adBeats[cur].dark ? "dark" : "light"} onJump={jump} />}
      {controls && !still && <PlayPause paused={paused} onClick={toggle} />}
    </div>
  );
}

// A designed slide that sits between two clips of a chapter film (see ChapterFilm). Static; it only fades in and out.
function FilmSlideView({ s, active, holdMs = 0, idle = false }: { s: FilmSlide; active: boolean; holdMs?: number; idle?: boolean }) {
  const [n, setN] = useState(0);
  const zoomRef = useRef<HTMLDivElement>(null);
  // the run of pictures is decoded before the slide plays, so no frame is spent decoding one as it fades in (that is what shows as a jerk)
  useEffect(() => {
    zoomRef.current?.querySelectorAll("img").forEach((im) => { im.decode?.().catch(() => {}); });
  }, [s.zoom]);
  useEffect(() => {
    if (!active || !s.giant) return;
    let raf = 0;
    const t0 = performance.now() + 250; // the count starts as the slide settles
    const tick = () => {
      const p = Math.min(1, Math.max(0, (performance.now() - t0) / 1300));
      setN(Math.round(s.giant! * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, s.giant]);
  // the content stays as it ended while the slide holds and fades out, so the stage never goes empty
  const [linger, setLinger] = useState(false);
  useEffect(() => {
    if (active) { setLinger(true); return; }
    const t = setTimeout(() => setLinger(false), 900);
    return () => clearTimeout(t);
  }, [active]);
  return (
    <div className={`sloop film-slide${s.dark ? " fg-on-dark" : ""}${active || idle ? " on" : ""}${!active && !idle && linger ? " hold" : ""}`} style={{ transitionDelay: `${holdMs}ms` }} aria-hidden={!active}>
      <div className="sl-bg" style={{ background: s.bg }} />
      {s.image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="sl-bgimg" alt="" src={s.image} />
      )}
      {s.zoom && (
        // the pictures change quickly, each one zooming in as it comes
        <div className="sl-zoom" aria-hidden="true" ref={zoomRef} data-speed={1}>
          {s.zoom.map((src, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={src} src={src} alt="" decoding="async" style={{ animationDelay: `${i * 1120}ms` }} />
          ))}
          <div className="sl-zshade" />
        </div>
      )}
      <div className={`sl-card${active || linger ? " on" : ""}`} style={{ "--beat": s.dur + "ms" } as React.CSSProperties}>
        <div className="sl-hero">
          {s.kicker && <div className="sl-kicker"><span>{s.kicker}</span></div>}
          {s.logo && (
            <div className="sl-brand sl-brand--wide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.logo.src} alt={s.logo.name} />
            </div>
          )}
          {s.line && <div className="sl-line">{s.line}</div>}
          {s.giant ? <div className="sl-giant">{(active || linger ? n : 0).toLocaleString("en-US")}{s.suffix}</div> : null}
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
// fit "cover" fills the panel; fit "height" always fills the panel's full height and centres the clip: bars of the clip colour at the sides when the panel is wider than the clip, the sides cropped when it is narrower
const clipStyle = (fit?: FilmClip["fit"]): React.CSSProperties | undefined =>
  fit === "height" ? { objectFit: "contain", width: "auto", maxWidth: "none", height: "100%", left: "50%", right: "auto", transform: "translateX(-50%)" } : fit ? { objectFit: fit } : undefined;
export function ChapterFilm({ items: all, poster, controls }: { items: FilmItem[]; poster: string; controls?: boolean }) {
  const phone = usePhone();
  // on a phone the process scene is only its first part (the three steps): the Key UX Challenges part is left out, so the scene is shorter
  const items = useMemo(() => (phone ? all.map((it) => (it.type === "scene" && it.id === "process-challenges" ? { ...it, dur: 11250 } : it)) : all), [all, phone]);
  const els = [useRef<HTMLVideoElement>(null), useRef<HTMLVideoElement>(null)];
  const root = useRef<HTMLDivElement>(null);
  useFilmClock(root);
  const still = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useFreeze(root, paused);
  const clipStep = useRef(-1); // the step whose clip has been rewound, so a resume carries on instead of restarting
  const beatLeft = useRef(0);
  const beatDue = useRef(0);
  const beatStep = useRef(-1);
  const [step, setStep] = useState(0); // counts items played; the item is items[step % n]
  const [visible, setVisible] = useState(false);
  const [shown, setShown] = useState(0); // which video element is on show (0 or 1)
  const [clipMs, setClipMs] = useState<Record<string, number>>({}); // how long each clip lasts, once its video has loaded
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

  // a click on the bar: that item starts now. The two video elements are set up for it first, so the right clip is already on show (the pairing assumes the items play in order).
  const jumpTo = (j: number) => {
    const s = Math.floor(step / n) * n + j;
    if (s === step) return;
    if (hasClips) {
      const nw = nextClip(s), af = nextClip(nw + 1), lv = clipsBefore(nw) % 2;
      const w: string[] = [];
      w[lv] = clipOf(nw).src;
      w[1 - lv] = clipOf(af).src;
      setHeld(w);
      setShown(lv);
      clipStep.current = -1;
    }
    beatStep.current = -1;
    setStep(s);
  };

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
    if (visible && !paused && item.type === "clip") {
      // a clip that cannot load (missing or broken file) is skipped, so the film never stalls on it
      if (v.error || v.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) { setTimeout(() => setStep((s) => s + 1), 0); return; }
      if (clipStep.current !== step) { clipStep.current = step; if (v.currentTime > 0.05) v.currentTime = 0; }
      v.playbackRate = (item as FilmClip).speed ?? FILM_SPEED;
      v.play().then(() => setStarted(true)).catch(() => {});
    } else { v.pause(); if (!visible) clipStep.current = -1; }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, visible, paused]);

  // a clip shows its own element at once; during a slide, the next clip is swapped in only after the slide fully covers the old one
  useEffect(() => {
    if (item.type === "clip") { setShown(live); return; }
    const t = setTimeout(() => setShown(live), (FADE_MS + 40) / FILM_SPEED);
    return () => clearTimeout(t);
  }, [step, live, item.type]);

  useEffect(() => {
    if (!visible || item.type === "clip") return;
    if (beatStep.current !== step) { beatStep.current = step; beatLeft.current = item.dur / FILM_SPEED; }
    if (paused) return;
    beatDue.current = Date.now() + beatLeft.current;
    const t = setTimeout(() => setStep((s) => s + 1), beatLeft.current);
    return () => { clearTimeout(t); beatLeft.current = Math.max(0, beatDue.current - Date.now()); };
  }, [step, visible, item, paused]);

  return (
    <div ref={root} className="chap-film" style={{ background: !hasClips ? "#fdfdfd" : !poster && !started && step === 0 && items[0].type !== "clip" ? "#ffffff" : clipOf(now).bg }}>
      {hasClips && [0, 1].map((k) => (
        <video
          key={k}
          ref={els[k]}
          className={`chap-video${shown === k && !(step === 0 && items[0].type !== "clip") ? " is-on" : ""}`}
          src={held[k]}
          style={clipStyle((items.find((it) => it.type === "clip" && it.src === held[k]) as FilmClip | undefined)?.fit)}
          poster={!started && k === 0 && poster ? poster : undefined}
          muted
          playsInline
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          preload={visible ? "auto" : "metadata"}
          aria-hidden="true"
          onLoadedMetadata={(e) => { const v = e.currentTarget; if (v.duration && isFinite(v.duration)) { const key = v.getAttribute("src") ?? ""; setClipMs((m) => (m[key] === Math.round(v.duration * 1000) ? m : { ...m, [key]: Math.round(v.duration * 1000) })); } }}
          onEnded={() => k === live && item.type === "clip" && setStep((s) => s + 1)}
          onError={() => k === live && item.type === "clip" && setStep((s) => s + 1)}
        />
      ))}
      {items.map((it, i) => {
        if (it.type === "clip") return null;
        const k = n === 1 ? `${i}-${step}` : i; // a film of one slide starts that slide over on each loop
        const active = visible && step % n === i; // scenes only start animating once the panel is on screen
        // a slide that ends stays put for one fade: until the new slide fully covers it, or until the next clip has started playing underneath (otherwise its empty first frame shows through)
        const holdMs = !active && i === (step + n - 1) % n ? FADE_MS : 0;
        if (it.type === "scene") {
          if (it.id === "welcome") return <WelcomeScene key={k} active={active} holdMs={holdMs} idle={!visible && i === 0} />;
          if (it.id === "process-challenges") return <ProcessChallenges key={k} active={active} holdMs={holdMs} />;
          if (it.id === "approach") return <ApproachScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "wonderpies") return <WonderPiesScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "telcoict") return <TelcoIctScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "pharmacy") return <PharmacyScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "peers") return <PeersScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "zigbis") return <ZigbisScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "cytosite") return <CytositeScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "ipad-grid") return <IpadGridScene key={k} active={active} holdMs={holdMs} idle={!visible && i === 0} />;
          if (it.id === "spoonful") return <SpoonfulScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "keysborough") return <KeysboroughScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "zerogaspi") return <ZeroGaspiScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "design-system") return <DesignSystemScene key={k} active={active} holdMs={holdMs} />;
          if (it.id === "product-features") return <ProductFeatures key={k} active={active} holdMs={holdMs} />;
          return <ProjectsDelivered key={k} active={active} holdMs={holdMs} />;
        }
        return <FilmSlideView key={k} s={it} active={active} holdMs={holdMs} idle={!visible && i === 0} />;
      })}
      {!still && <FilmProgress durs={items.map((it) => (it.type === "clip" ? (clipMs[it.src] ?? 5000) / (it.speed ?? FILM_SPEED) : it.dur / FILM_SPEED))} index={step % n} playing={visible && !paused} run={step * 2 + (visible ? 1 : 0)} tone={toneOfItem(item)} swap={item.type === "scene" ? SCENE_SWAP[item.id] : undefined} onJump={jumpTo} />}
      {controls && !still && <PlayPause paused={paused} onClick={() => setPaused((p) => !p)} />}
    </div>
  );
}

function Plate({ c }: { c: (typeof chapters)[number] }) {
  const m = c.role.match(/^(.*?),?\s*<em>(.*)<\/em>\s*$/); // the role, then the years in <em>: the years go beside the name
  const role = m ? m[1] : c.role;
  return (
    <div className="chap-plate">
      <div className="chap-head"><span className="chap-name">{c.name}</span>{m && <span className="chap-years">{m[2]}</span>}</div>
      <div className="chap-role">{role}</div>
      <p className="chap-sub">{c.sub}</p>
      <div className="chap-stats">
        {c.stats.map((s) => (
          <div className="chap-stat" key={s.l}><b>{s.v}</b><i>{s.l}</i></div>
        ))}
      </div>
      <Btn href={c.href} className="chap-cta">See the work</Btn>
    </div>
  );
}

// Theater mode: the copy plate hides after 2s of mouse stillness (fine pointers only).
function Chapter({ c }: { c: (typeof chapters)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
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
    <div className="chap" ref={ref}>
      <div className="chap-media">
        {c.kind === "ad" ? <KineticAd /> : c.film ? <ChapterFilm items={c.film.items} poster={c.film.poster} /> : <div className="ph-box">{c.kind === "film" ? "Film placeholder 16:9" : "Image placeholder 16:9"}</div>}
      </div>
      {c.tag && <span className="ph-tag">{c.tag}</span>}
      <Plate c={c} />
    </div>
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
              <p className="sec-sub">Three pieces of work, from a tax-credit SaaS to a multi-platform design system.</p>
            </div>
            <BtnCircle href={site.behance} label="On Behance" />
          </div>
        </Reveal>
      </div>
      <div className="chap-stack" onContextMenu={(e) => e.preventDefault()} onDragStart={(e) => e.preventDefault()} onCopy={(e) => e.preventDefault()}>
        {chapters.flatMap((c) => (c.name === "MLK Group" ? [{ ...c, film: c.film && { ...c.film, items: c.film.items.slice(5) } }, { ...c, film: c.film && { ...c.film, items: c.film.items.slice(0, 5) }, role: clientCopy.role, name: clientCopy.name, sub: clientCopy.sub, stats: clientCopy.stats, href: "/stories/#and-more" }] : [c])).map((c, i) => <Chapter key={`${c.name}-${i}`} c={c} />)}
      </div>
    </section>
  );
}
