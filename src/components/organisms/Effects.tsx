"use client";

import { useEffect, useState } from "react";
import { brands, site } from "@/data/site";

const motionOK = () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const fine = () => window.matchMedia("(pointer:fine)").matches;

// Loader curtain: holds >=1.6s, then reveals the hero (body.loaded, then body.filled at +1.7s).
export function Loader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reveal = () => {
      setDone(true);
      document.body.classList.add("loaded");
      if (motionOK()) setTimeout(() => document.body.classList.add("filled"), 1700);
      else document.body.classList.add("filled");
    };
    if (!motionOK()) { reveal(); return; }
    const t = setTimeout(reveal, 1600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={`loader${done ? " done" : ""}`} aria-hidden="true">
      <div className="loader-mark">{site.logo}<i /></div>
    </div>
  );
}

// Custom cursor (red dot, hollows over links), magnetic CTAs, and hero image trail. Desktop only.
export function Cursor() {
  useEffect(() => {
    if (!motionOK() || !fine()) return;
    const cur = document.createElement("div");
    cur.className = "cursor";
    document.body.appendChild(cur);
    document.body.classList.add("cursor-on");
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy, raf = 0;
    let lx = 0, ly = 0, lt = 0, li = 0;
    const live: HTMLElement[] = [];
    // each trail card shows one brand logo from site.ts `brands`; load them up front so the cards never flash empty
    brands.forEach((b) => { new Image().src = b.src; });

    const onMove = (e: MouseEvent) => {
      tx = e.clientX; ty = e.clientY;
      const t = e.target as HTMLElement;
      cur.classList.toggle("is-link", !!t.closest("a, button, .breaker"));
      cur.classList.toggle("is-light", !!t.closest("[data-cursor='light']")); // over a brand-blue block the ring turns white
      // hero logo trail (not over links, buttons or other clickable things)
      if (t.closest("#hero") && !t.closest("a, button, [role='button'], .btn, .btn-sec, .btn-circle")) {
        const now = performance.now();
        if (Math.hypot(e.clientX - lx, e.clientY - ly) < 42 || now - lt < 75) return;
        lx = e.clientX; ly = e.clientY; lt = now;
        const f = document.createElement("div");
        f.className = "trail-frame";
        f.style.left = e.clientX + (Math.random() * 40 - 20) + "px";
        f.style.top = e.clientY + (Math.random() * 40 - 20) + "px";
        const b = brands[li++ % brands.length];
        const img = document.createElement("img");
        img.src = b.src; img.alt = b.name; img.draggable = false;
        f.appendChild(img);
        document.body.appendChild(f);
        live.push(f);
        while (live.length > 2) { const o = live.shift()!; o.classList.add("out"); setTimeout(() => o.remove(), 300); }
        requestAnimationFrame(() => f.classList.add("in"));
        setTimeout(() => f.classList.add("out"), 300);
        setTimeout(() => { f.remove(); const i = live.indexOf(f); if (i > -1) live.splice(i, 1); }, 1080);
      }
    };
    const down = () => cur.classList.add("is-down");
    const up = () => cur.classList.remove("is-down");
    const follow = () => {
      cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
      cur.style.left = cx + "px"; cur.style.top = cy + "px";
      raf = requestAnimationFrame(follow);
    };
    follow();

    // magnetic pull on big CTAs (delegated)
    const mag = (e: MouseEvent) => {
      const host = (e.target as HTMLElement).closest<HTMLElement>(".btn-circle, .btn, .btn-sec, .nav-cta");
      if (!host) return;
      const target = host.querySelector<HTMLElement>(".big") || host;
      const r = host.getBoundingClientRect();
      target.style.translate = `${(e.clientX - (r.left + r.width / 2)) * 0.18}px ${(e.clientY - (r.top + r.height / 2)) * 0.18}px`;
    };
    const magOut = (e: MouseEvent) => {
      const host = (e.target as HTMLElement).closest<HTMLElement>(".btn-circle, .btn, .btn-sec, .nav-cta");
      if (!host) return;
      const target = host.querySelector<HTMLElement>(".big") || host;
      target.style.transition = "translate .5s cubic-bezier(.23,1,.32,1)";
      target.style.translate = "0px 0px";
      setTimeout(() => (target.style.transition = ""), 500);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousemove", mag);
    document.addEventListener("mouseout", magOut);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    return () => {
      cancelAnimationFrame(raf);
      cur.remove();
      document.body.classList.remove("cursor-on");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", mag);
      document.removeEventListener("mouseout", magOut);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);
  return null;
}
