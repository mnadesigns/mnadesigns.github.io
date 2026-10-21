"use client";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef } from "react";
import styles from "./MoreWork.module.css";
import type { MLK_LOGOS } from "@/data/mlkIpads";

// A band of more work, set like the one on designmonks.co: a lilac field, a row of brand logos drifting left, a strip of device screens (tablet, phone, tablet...) drifting left more slowly, and a second row of logos drifting right.
// Measured there: the strips move at about 13px/s and the text rows at about 23px/s, all linear and endless. The track holds its content twice and slides by half its width, so the loop has no seam.
const SCREENS = [
  { n: "01", w: 1384, h: 1063, alt: "Specialist Clinic Pharmacy online store on a tablet" },
  { n: "02", w: 524, h: 1068, alt: "Mobile screen from a client project" },
  { n: "03", w: 1384, h: 1063, alt: "Web screen from a client project on a tablet" },
  { n: "04", w: 524, h: 1068, alt: "Mobile screen from a client project" },
  { n: "05", w: 1384, h: 1063, alt: "Web screen from a client project on a tablet" },
  { n: "06", w: 524, h: 1068, alt: "Mobile screen from a client project" },
  { n: "07", w: 1384, h: 1063, alt: "Financial advice website on a tablet" },
  { n: "08", w: 524, h: 1068, alt: "Mobile screen from a client project" },
  { n: "09", w: 1384, h: 1063, alt: "Web screen from a client project on a tablet" },
  { n: "10", w: 524, h: 1068, alt: "Mobile screen from a client project" },
  { n: "11", w: 1384, h: 1063, alt: "Web screen from a client project on a tablet" },
  { n: "12", w: 524, h: 1068, alt: "Mobile screen from a client project" },
  { n: "13", w: 1384, h: 1063, alt: "Web screen from a client project on a tablet" },
  { n: "14", w: 524, h: 1068, alt: "Mobile screen from a client project" },
];

const BRANDS = [
  { name: "SRED.io", src: "sredio" },
  { name: "QuodArca", src: "quodarca" },
  { name: "Specialist Clinic Pharmacy", src: "specialist-clicnic-phramacy" },
  { name: "Telco ICT", src: "telco-ict" },
  { name: "Wonder Pies", src: "wonder-pies" },
  { name: "Peers", src: "peers" },
  { name: "Applied Electronics", src: "applied-electronics" },
  { name: "Cytosite Bio", src: "cytosite-bio" },
  { name: "Keysborough Veterinary Practice", src: "keysborough-ver-prac" },
  { name: "Cupffee", src: "cupffee" },
];

// One endless row. `speed` is in px per second, `reverse` slides it to the right. It runs only while it is on screen.
function Row({ speed, reverse, className, children }: { speed: number; reverse?: boolean; className?: string; children: React.ReactNode }) {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const t = track.current!;
    const setDur = () => t.style.setProperty("--dur", `${t.scrollWidth / 2 / speed}s`);
    setDur();
    const ro = new ResizeObserver(setDur);
    ro.observe(t);
    const io = new IntersectionObserver(([e]) => { t.dataset.play = e.isIntersecting ? "1" : "0"; }, { rootMargin: "120px" });
    io.observe(t);
    return () => { ro.disconnect(); io.disconnect(); };
  }, [speed]);
  return (
    <div className={`${styles.row} ${className ?? ""}`}>
      <div ref={track} className={`${styles.track}${reverse ? ` ${styles.rev}` : ""}`} data-play="0">
        <div className={styles.half}>{children}</div>
        <div className={styles.half} aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}

function Logos({ list }: { list: typeof BRANDS }) {
  return (
    <>
      {list.map((b, i) => (
        <span className={styles.logo} key={b.src + i}>
          <img src={`/images/brands/${b.src}.png`} alt={b.name} width={269} height={200} loading="lazy" decoding="async" />
          <i className={styles.dot} aria-hidden="true" />
        </span>
      ))}
    </>
  );
}

// `from` and `to` pick the screens by their number (1 to 14), for a card that shows only some of them
// `tablets` replaces the screens of the strip with pictures of its own (the MLK iPad mockups); `logos` replaces the brand row (the MLK client logos)
export function MoreWork({ slide, from = 1, to = 99, tablets, logos }: { slide?: boolean; from?: number; to?: number; tablets?: { src: string; alt: string; w: number; h: number }[]; logos?: typeof MLK_LOGOS } = {}) {
  return (
    <section className={`${styles.sec}${slide ? ` ${styles.slide} wk-reel` : ""}`} aria-label="More work, and the brands I have worked with">
      <Row speed={13} className={styles.shots}>
        {tablets ? tablets.map((t, i) => (
          <img key={t.src} className={styles.shot} src={t.src} alt={t.alt} width={t.w} height={t.h} loading={i < 4 ? "eager" : "lazy"} decoding="async" style={{ aspectRatio: `${t.w} / ${t.h}` }} />
        )) : (slide ? SCREENS.filter((s) => s.w > 1000) : SCREENS).filter((s) => +s.n >= from && +s.n <= to).map((s, i) => ( // the work slides show the tablets only
          <img key={s.n} className={styles.shot} src={`/images/more-work/${s.n}.webp`} alt={s.alt} width={s.w} height={s.h} loading={i < 6 ? "eager" : "lazy"} decoding="async" style={{ aspectRatio: `${s.w} / ${s.h}` }} />
        ))}
      </Row>
      <Row speed={23} reverse className={styles.logos}>
        {logos ? logos.map((b, i) => (
          <span className={styles.logo} key={b.src + i}>
            <img src={`/images/work/mlk/logos/${b.src}.png`} alt={b.name} width={b.w} height={b.h} loading="lazy" decoding="async" style={{ "--k": b.k } as React.CSSProperties} />
            <i className={styles.dot} aria-hidden="true" />
          </span>
        )) : <Logos list={[...BRANDS].reverse()} />}
      </Row>
    </section>
  );
}
