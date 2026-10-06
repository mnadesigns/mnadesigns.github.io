"use client";

import { useEffect, useRef } from "react";

// Interactive grid background for the hero: the grid bends away from the cursor, glows red near it,
// and sends a ripple through the lines on click. Drawn on a canvas behind the hero content.
const SPACING = 40;
const RADIUS = 170; // cursor influence radius (px)
const PUSH = 26; // max cursor displacement (px)
const SPRING = 0.085;
const DAMPING = 0.82;
const RIPPLE_SPEED = 520; // px per second
const RIPPLE_WIDTH = 90;
const RIPPLE_LIFE = 1.4; // seconds
const RED = "225,29,72";
const INK = "11,11,10";

type Pt = { bx: number; by: number; ox: number; oy: number; vx: number; vy: number; glow: number };
type Ripple = { x: number; y: number; t: number };

export function HeroGrid() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const host = canvas.parentElement!;
    const ctx = canvas.getContext("2d")!;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, cols = 0, rows = 0, dpr = 1;
    let pts: Pt[] = [];
    const mouse = { x: -9999, y: -9999, active: false };
    const ripples: Ripple[] = [];
    let raf = 0, last = performance.now(), visible = true;

    const build = () => {
      const r = host.getBoundingClientRect();
      w = r.width; h = r.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(w / SPACING) + 2;
      rows = Math.ceil(h / SPACING) + 2;
      const offX = (w - (cols - 1) * SPACING) / 2;
      const offY = (h - (rows - 1) * SPACING) / 2;
      pts = [];
      for (let j = 0; j < rows; j++)
        for (let i = 0; i < cols; i++)
          pts.push({ bx: offX + i * SPACING, by: offY + j * SPACING, ox: 0, oy: 0, vx: 0, vy: 0, glow: 0 });
    };

    const step = (dt: number) => {
      for (const p of pts) {
        let fx = 0, fy = 0, glow = 0;

        if (mouse.active) {
          const dx = p.bx - mouse.x, dy = p.by - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < RADIUS && d > 0.01) {
            const k = 1 - d / RADIUS;
            const f = k * k * PUSH;
            fx += (dx / d) * f * SPRING * 6;
            fy += (dy / d) * f * SPRING * 6;
            glow = Math.max(glow, k);
          }
        }

        for (const rp of ripples) {
          const dx = p.bx - rp.x, dy = p.by - rp.y;
          const d = Math.hypot(dx, dy);
          const band = Math.abs(d - rp.t * RIPPLE_SPEED);
          if (band < RIPPLE_WIDTH && d > 0.01) {
            const life = 1 - rp.t / RIPPLE_LIFE;
            const k = (1 - band / RIPPLE_WIDTH) * life;
            fx += (dx / d) * k * 3.2;
            fy += (dy / d) * k * 3.2;
            glow = Math.max(glow, k);
          }
        }

        p.vx = (p.vx + fx - p.ox * SPRING) * DAMPING;
        p.vy = (p.vy + fy - p.oy * SPRING) * DAMPING;
        p.ox += p.vx * dt * 60;
        p.oy += p.vy * dt * 60;
        p.glow += (glow - p.glow) * Math.min(1, dt * 10);
      }
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].t += dt;
        if (ripples[i].t > RIPPLE_LIFE) ripples.splice(i, 1);
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      // lines between neighbouring displaced points
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const a = pts[j * cols + i];
          const ax = a.bx + a.ox, ay = a.by + a.oy;
          if (i < cols - 1) {
            const b = pts[j * cols + i + 1];
            const g = Math.max(a.glow, b.glow);
            ctx.strokeStyle = g > 0.02 ? `rgba(${RED},${0.07 + g * 0.45})` : `rgba(${INK},0.07)`;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b.bx + b.ox, b.by + b.oy); ctx.stroke();
          }
          if (j < rows - 1) {
            const b = pts[(j + 1) * cols + i];
            const g = Math.max(a.glow, b.glow);
            ctx.strokeStyle = g > 0.02 ? `rgba(${RED},${0.07 + g * 0.45})` : `rgba(${INK},0.07)`;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(b.bx + b.ox, b.by + b.oy); ctx.stroke();
          }
        }
      }
      // intersection dots
      for (const p of pts) {
        const x = p.bx + p.ox, y = p.by + p.oy;
        const r = 1.1 + p.glow * 2.2;
        ctx.fillStyle = p.glow > 0.02 ? `rgba(${RED},${0.2 + p.glow * 0.8})` : `rgba(${INK},0.2)`;
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (visible) { step(dt); draw(); }
      raf = requestAnimationFrame(frame);
    };

    const local = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onMove = (e: PointerEvent) => { const p = local(e); mouse.x = p.x; mouse.y = p.y; mouse.active = true; };
    const onLeave = () => { mouse.active = false; };
    const onDown = (e: PointerEvent) => {
      const p = local(e);
      ripples.push({ x: p.x, y: p.y, t: 0 });
      if (ripples.length > 6) ripples.shift();
    };

    build();
    draw();
    const ro = new ResizeObserver(() => { build(); draw(); });
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);

    if (!reduced) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
      host.addEventListener("pointerdown", onDown);
      raf = requestAnimationFrame(frame);
    }
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}
