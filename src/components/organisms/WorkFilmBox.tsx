"use client";

import { useEffect, useRef, useState } from "react";
import { ChapterFilm, KineticAd } from "./Chapters";
import { chapters } from "@/data/site";
import type { FilmItem } from "@/types/film";

// The slides of a work (the same ones as on the home page) in the box on the Work page. They are drawn for a whole screen (their type and spacing follow the screen width), so they are played on a
// 16:9 stage as wide as the screen and that stage is scaled down to the width of the box: the same picture as at home, smaller. The box is always 16:9.
// QuodArca's scenes switch to their phone layout below 700px, so its stage is never narrower than 1000px.
export function WorkFilmBox({ slug }: { slug: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [fit, setFit] = useState<{ w: number; h: number; k: number } | null>(null);
  const quodarca = slug === "quodarca";
  const film = quodarca ? (chapters.find((c) => c.name === "QuodArca") as { film?: { items: FilmItem[]; poster: string } } | undefined)?.film : undefined;
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const measure = () => {
      const w = quodarca ? Math.max(window.innerWidth, 1000) : window.innerWidth;
      setFit({ w, h: Math.round((w * 9) / 16), k: el.clientWidth / w });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, [quodarca]);
  return (
    <div ref={box} className="sti-film" style={fit ? { height: fit.h * fit.k } : { aspectRatio: "16 / 9" }}>
      {fit && (
        <div className="sti-film-stage" style={{ width: fit.w, height: fit.h, transform: `scale(${fit.k})` }}>
          {film ? <ChapterFilm items={film.items} poster={film.poster} /> : <KineticAd />}
        </div>
      )}
    </div>
  );
}
