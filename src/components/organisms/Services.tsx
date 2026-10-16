"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { services, servicesIntro, type Service } from "@/data/services";
import { ServiceToolIcon } from "@/components/atoms/ServiceToolIcon";
import styles from "./Services.module.css";

// the robot is decoration below the fold, so its code loads after the page does
const RobotHead = dynamic(() => import("robot-heads").then((m) => m.RobotHead), { ssr: false });

// The AI-augmented pipelines: a dark bento grid. Every tile shows all of its copy in the same order (number, title, promise, tools, deliverables), so nothing is hidden behind a click.
// Motion: each tile's border draws itself and its content comes up out of a blur, one tile after another, as the section scrolls into view; a glow follows the pointer along the borders;
// the tool icons lean toward the pointer; and on hover the bullets of the deliverables light up one after another.
function Tile({ s, i }: { s: Service; i: number }) {
  const ref = useRef<HTMLElement>(null);
  const move = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  // the tool icons lean up to 7px toward the pointer while it is within 90px of them
  const lean = (e: React.PointerEvent<HTMLUListElement>) => {
    e.currentTarget.querySelectorAll<HTMLElement>("li[data-tip]").forEach((li) => {
      const r = li.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy);
      const k = d < 90 ? ((1 - d / 90) * 7) / (d || 1) : 0;
      li.style.setProperty("--lx", `${dx * k}px`);
      li.style.setProperty("--ly", `${dy * k}px`);
    });
  };
  const rest = (e: React.PointerEvent<HTMLUListElement>) => {
    e.currentTarget.querySelectorAll<HTMLElement>("li[data-tip]").forEach((li) => { li.style.setProperty("--lx", "0px"); li.style.setProperty("--ly", "0px"); });
  };
  return (
    <article ref={ref} onPointerMove={move} className={`${styles.tile} ${styles["t" + (i + 1)]}${s.addon ? ` ${styles.addon}` : ""}`} style={{ "--i": i } as React.CSSProperties}>
      <svg className={styles.trace} aria-hidden="true" focusable="false"><rect x="0.5" y="0.5" width="calc(100% - 1px)" height="calc(100% - 1px)" rx="20" pathLength="1" /></svg>
      {s.addon && <div className={styles.head}><span className={styles.badge}>Add-on</span></div>}
      <h3 className={styles.title}>{s.title}</h3>
      <p className={styles.promise}>{s.promise}</p>
      <div className={styles.group}>
        <span className={styles.label}>Tools</span>
        <ul className={styles.chips} onPointerMove={lean} onPointerLeave={rest}>{s.tools.map((t) => <li key={t} tabIndex={0} aria-label={t} data-tip={t}><ServiceToolIcon tool={t} className={styles.ico} /></li>)}</ul>
      </div>
      {s.stacks && (
        <div className={styles.group}>
          <span className={styles.label}>Stacks</span>
          <ul className={`${styles.chips} ${styles.words}`}>{s.stacks.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      )}
      <div className={styles.group}>
        <span className={styles.label}>Deliverables</span>
        <ul className={styles.list}>{s.deliverables.map((d, k) => <li key={d} style={{ "--k": k } as React.CSSProperties}>{d}</li>)}</ul>
      </div>
    </article>
  );
}

export function Services() {
  const root = useRef<HTMLElement>(null);
  const [still, setStill] = useState(false); // reduced motion: the robot stays on one frame
  const [onScreen, setOnScreen] = useState(false); // the robot only animates while the section is near the screen: its canvas redraws on the main thread every frame, which starves the work videos above if it never stops
  useEffect(() => { setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches); }, []);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add(styles.in); io.disconnect(); } }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The glow and the pixel grid follow the pointer. A scroll moves the cards under a still pointer without any pointer event, so on scroll the card under the pointer is found again
  // (the "hot" class stands in for :hover, which the browser only refreshes after the scroll settles) and the glow is placed where the pointer is.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let px = -1, py = -1, raf = 0;
    // once the pointer itself moves, the browser's own :hover is right again, so the stand-in is dropped (otherwise the card lit by a scroll would stay lit beside the one now under the pointer)
    const track = (e: PointerEvent) => {
      px = e.clientX; py = e.clientY;
      el.querySelectorAll<HTMLElement>("article." + styles.hot).forEach((a) => a.classList.remove(styles.hot));
    };
    const look = () => {
      raf = 0;
      if (px < 0) return;
      el.querySelectorAll<HTMLElement>("article").forEach((a) => {
        const r = a.getBoundingClientRect();
        const inside = px >= r.left && px <= r.right && py >= r.top && py <= r.bottom;
        a.classList.toggle(styles.hot, inside);
        if (inside) { a.style.setProperty("--mx", `${px - r.left}px`); a.style.setProperty("--my", `${py - r.top}px`); }
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(look); };
    window.addEventListener("pointermove", track, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("pointermove", track); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "120px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={root} className={styles.section} id="services">
      <div className="shell">
        <div className={styles.top}>
          <div className={styles.intro}>
            <h2 className={styles.h2}>AI-augmented <em>pipelines</em></h2>
            <p className={styles.sub}>{servicesIntro.sub}</p>
          </div>
          <div className={styles.bot} aria-hidden="true">
            <RobotHead shape="rectangle" state="thinking" color="#1297d9" trimColor="#2a2c31" speed={2} size={205} paused={still || !onScreen} />
          </div>
        </div>
        <div className={styles.grid}>
            {services.map((s, i) => <Tile key={s.n} s={s} i={i} />)}
        </div>
      </div>
    </section>
  );
}
