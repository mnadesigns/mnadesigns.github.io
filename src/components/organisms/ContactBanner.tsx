"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { resume } from "@/data/resume";
import { Btn } from "@/components/atoms/Buttons";
import styles from "./ContactBanner.module.css";

// the same robot as the AI section, loaded after the page like there
const RobotHead = dynamic(() => import("@/vendor/robot-heads").then((m) => m.RobotHead), { ssr: false });

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 16 16" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);
const MAIL = "M2 3.5h12v9H2zM2.5 4l5.5 4.5L13.5 4";
const PHONE = "M4 1.8h2.2l1 3-1.5 1a8 8 0 0 0 3.5 3.5l1-1.5 3 1V12a1.8 1.8 0 0 1-2 1.8A10.8 10.8 0 0 1 2.2 5.8 1.8 1.8 0 0 1 4 1.8z";

export function ContactBanner() {
  const bot = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [still, setStill] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const phone = resume.contact.find((c) => c.href.includes("wa.me"));

  // the glow and the pixel pattern follow the pointer, as in the AI-augmented tiles of the home page; the position is written once per frame
  const glow = (x: number, y: number) => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const c = card.current; if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${x - r.left}px`);
      c.style.setProperty("--my", `${y - r.top}px`);
    });
  };
  // a scroll moves the card under a still pointer without a pointer event (and :hover is only refreshed once the scroll settles), so the card is marked "hot" while the pointer is over it
  useEffect(() => {
    let x = -1, y = -1, raf = 0;
    const onMove = (e: PointerEvent) => { if (e.pointerType === "mouse") { x = e.clientX; y = e.clientY; } };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const c = card.current; if (!c || x < 0) return;
        const r = c.getBoundingClientRect();
        const inside = x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
        c.classList.toggle(styles.hot, inside);
        if (inside) { c.style.setProperty("--mx", `${x - r.left}px`); c.style.setProperty("--my", `${y - r.top}px`); }
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("scroll", onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const el = bot.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setOnScreen(e.isIntersecting), { rootMargin: "60px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`shell ${styles.wrap}`}>
      <div ref={card} className={styles.banner} data-cursor="bullet" onPointerMove={(e) => glow(e.clientX, e.clientY)} onPointerLeave={() => card.current?.classList.remove(styles.hot)}>
        <div className={styles.copy}>
          <h2 className={styles.title}><span className={styles.outline}>Have a</span> <em>Big Idea</em> <span className={styles.outline}>in mind?</span></h2>
          <p className={styles.sub}>Let&apos;s discuss what we can achieve together!</p>
          <div className={styles.row}>
            <Btn href="/resume/">Get in touch</Btn>
            <a className={styles.link} href={`mailto:${site.email}`}><Icon d={MAIL} />{site.email}</a>
            {phone && <a className={styles.link} href={phone.href} target="_blank" rel="noopener noreferrer"><Icon d={PHONE} />{phone.label}</a>}
          </div>
        </div>
        <div className={styles.bot} ref={bot} aria-hidden="true">
          <RobotHead shape="rectangle" state="thinking" color="#1297d9" trimColor="#2a2c31" speed={2} size={205} interactive={false} paused={still || !onScreen} />
        </div>
      </div>
    </section>
  );
}
