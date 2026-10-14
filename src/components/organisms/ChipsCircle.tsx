"use client";

import { useEffect, useRef } from "react";
import { ToolIcon, type ToolIconName } from "@/components/atoms/ToolIcons";
import styles from "./SkillsStats.module.css";

type Chip = { label: string; tone: "brand" | "white"; icon?: ToolIconName };

// A dark circle of pill chips. When the card scrolls into view the chips drop in from the top under gravity,
// bounce a little off a bowl-shaped wall, settle, and can then be grabbed and thrown around (mouse or touch).
// Physics: matter-js. Rendering: real DOM elements, so the text stays crisp.
// Responsive: everything scales with the circle (chips, walls, gravity), and the simulation is rebuilt, already settled,
// whenever the circle changes size (phone rotation, window resize, breakpoint change).
const REF = 366; // the circle's design size (px); everything below is tuned at this size
const GRAVITY = 1.25;
const RESTITUTION = 0.38; // "jumps a little back up"
const WALL_EXTRA = 12; // wall sits a bit outside the visible circle so chips poke past the edge and are clipped by it
const BODY_SCALE = 1.02; // collision body just larger than the pill, so neighbouring chips keep a small gap and never overlap
const CALM_SPEED = 0.3; // below this speed (px per step) and spin, a chip counts as at rest
const CALM_SPIN = 0.006;
const CALM_FRAMES = 40; // this many calm frames in a row and the pile goes to sleep
const SPIN_RESIST = 4; // pills resist tumbling, so they settle near-horizontal instead of standing on end

const shuffle = <T,>(a: T[]) => {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

export function ChipsCircle({ chips }: { chips: Chip[] }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = wrap.current!;
    let disposed = false;
    let teardown = () => {};

    (async () => {
      const Matter = (await import("matter-js")).default;
      // measure the chips with the final font, so their widths are right (but never wait for ever: in-app browsers can leave this pending)
      await Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1500))]);
      if (disposed) return;
      host.classList.add(styles.sim); // from here the physics places the chips; if anything fails the resting layout is restored below
      const { Engine, Bodies, Body, Composite, Mouse, MouseConstraint } = Matter;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const els = Array.from(host.querySelectorAll<HTMLElement>("[data-chip]"));

      let started = false; // the drop has happened at least once
      let visible = false;
      let currentS = 0;
      let sim: { start: (instant: boolean) => void; setVisible: (v: boolean) => void; dispose: () => void } | null = null;

      const createSim = (S: number, k: number) => {
        const R = S / 2, cx = R, cy = R;
        const Rw = R + WALL_EXTRA * k;
        const sizes = els.map((e) => ({ w: e.offsetWidth, h: e.offsetHeight }));
        const engine = Engine.create({ gravity: { x: 0, y: GRAVITY * k }, positionIterations: 14, velocityIterations: 10 }); // extra solver passes keep the pile from sinking into itself
        const world = engine.world;

        // bowl: ring segments from -35deg to 215deg (opening at the top), plus short upright walls above the lip
        const walls: Matter.Body[] = [];
        const a0 = (-35 * Math.PI) / 180, a1 = (215 * Math.PI) / 180, N = 44, T = 80;
        for (let i = 0; i < N; i++) {
          const a = a0 + ((a1 - a0) * (i + 0.5)) / N;
          const len = (Rw * (a1 - a0)) / N + 6;
          walls.push(
            Bodies.rectangle(cx + (Rw + T / 2) * Math.cos(a), cy + (Rw + T / 2) * Math.sin(a), len, T, {
              isStatic: true, angle: a + Math.PI / 2, friction: 0.3, restitution: 0.1,
            })
          );
        }
        for (const a of [a0, a1]) {
          const lx = cx + Rw * Math.cos(a), ly = cy + Rw * Math.sin(a);
          const dir = Math.cos(a) > 0 ? 1 : -1;
          walls.push(Bodies.rectangle(lx + dir * (T / 2), ly - 260, T, 520, { isStatic: true }));
        }
        Composite.add(world, walls);

        // chips: pill-shaped bodies, added one by one from above the circle
        const bodies = sizes.map((s) => {
          const w = s.w * BODY_SCALE, h = s.h * BODY_SCALE;
          const b = Bodies.rectangle(0, 0, w, h, {
            chamfer: { radius: h / 2 }, restitution: RESTITUTION, friction: 0.45, frictionAir: 0.012, density: 0.002,
          });
          Body.setInertia(b, b.inertia * SPIN_RESIST);
          return b;
        });
        const place = (b: Matter.Body, above: boolean, i: number, frac?: number) => {
          const lip = Rw * Math.sin((55 * Math.PI) / 180);
          Body.setPosition(b, {
            x: cx + (frac ?? Math.random() - 0.5) * lip * 1.1,
            y: above ? cy - Rw - (70 + Math.random() * 70) * k : cy + (i - bodies.length / 2) * 6 * k,
          });
          Body.setAngle(b, (Math.random() - 0.5) * 0.9);
          Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.05);
        };

        // drop order: alternate brand and white (each colour shuffled), so the pile is well mixed, never one colour in a clump
        const idxOf = (tone: Chip["tone"]) => chips.map((c, i) => (c.tone === tone ? i : -1)).filter((i) => i >= 0);
        const brands = shuffle(idxOf("brand"));
        const whites = shuffle(idxOf("white"));
        const order: number[] = [];
        const total = chips.length;
        for (let n = 0, firstBrand = Math.random() < 0.5; order.length < total; n++) {
          const wantBrand = (n % 2 === 0) === firstBrand;
          const next = (wantBrand ? brands : whites).shift() ?? (wantBrand ? whites : brands).shift();
          if (next !== undefined) order.push(next);
        }
        // starting spots: each colour is spread evenly across the whole opening (shuffled, with a little jitter),
        // so one colour can never start mostly on one side
        const slotFrac: number[] = new Array(chips.length).fill(0);
        for (const tone of ["brand", "white"] as const) {
          const idx = idxOf(tone);
          const n = idx.length;
          const slots = shuffle(Array.from({ length: n }, (_, j) => (j + 0.5) / n - 0.5));
          idx.forEach((ci, j) => { slotFrac[ci] = slots[j] + (Math.random() - 0.5) * (0.6 / n); });
        }

        const draw = () => {
          bodies.forEach((b, i) => {
            const { w, h } = sizes[i];
            els[i].style.transform = `translate(${b.position.x - w / 2}px, ${b.position.y - h / 2}px) rotate(${b.angle}rad)`;
          });
        };

        // drag with mouse or touch (the page can still scroll with the wheel)
        const mouse = Mouse.create(host);
        const m = mouse as unknown as { element: HTMLElement; mousewheel: EventListener };
        m.element.removeEventListener("mousewheel", m.mousewheel);
        m.element.removeEventListener("DOMMouseScroll", m.mousewheel);
        m.element.removeEventListener("wheel", m.mousewheel); // matter 0.20 listens to "wheel", and its handler blocks the page from scrolling over the circle
        // touch: only a finger that lands on a chip drags it; a finger on the empty part of the circle scrolls the page as usual
        const tm = mouse as unknown as { mousedown: EventListener; mousemove: EventListener; mouseup: EventListener };
        m.element.removeEventListener("touchstart", tm.mousedown);
        m.element.removeEventListener("touchmove", tm.mousemove);
        m.element.removeEventListener("touchend", tm.mouseup);
        let grabbing = false;
        const tStart = (e: TouchEvent) => { grabbing = !!(e.target as HTMLElement | null)?.closest("[data-chip]"); if (grabbing) tm.mousedown(e); };
        const tMove = (e: TouchEvent) => { if (grabbing) tm.mousemove(e); };
        const tEnd = (e: TouchEvent) => { if (grabbing) tm.mouseup(e); grabbing = false; };
        host.addEventListener("touchstart", tStart, { passive: false });
        host.addEventListener("touchmove", tMove, { passive: false });
        host.addEventListener("touchend", tEnd, { passive: false });
        const drag = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, damping: 0.12, render: { visible: false } } });
        Composite.add(world, drag);

        // matter only hears the button being released over the circle, so release the chip whenever the pointer leaves it,
        // lets go anywhere in the window, or the window loses focus
        const release = () => { mouse.button = -1; };
        host.addEventListener("mouseleave", release);
        window.addEventListener("mouseup", release);
        window.addEventListener("touchend", release);
        window.addEventListener("touchcancel", release);
        window.addEventListener("blur", release);

        const entered = new Set<Matter.Body>(); // chips that have been inside the circle at least once
        let raf = 0, simStarted = false, simVisible = false, last = 0, dropped = 0, t0 = 0, calm = 0;
        const step = (now: number) => {
          raf = 0;
          if (!simVisible) return;
          const dt = Math.min(now - last || 16.7, 34);
          last = now;
          // release the chips one at a time (about 110ms apart)
          while (dropped < bodies.length && now - t0 >= dropped * 110) {
            const b = bodies[order[dropped]];
            place(b, true, dropped, slotFrac[order[dropped]]);
            Composite.add(world, b);
            dropped++;
          }
          Engine.update(engine, dt);
          // safety nets. A chip that was dragged out through the wall (or rolled out over the top lip) is hidden by the circle
          // and would fall for ever, so once it is well outside it is dropped back in from the top. A chip held far outside is let go.
          bodies.forEach((b) => {
            const dist = Math.hypot(b.position.x - cx, b.position.y - cy);
            if (dist <= R * 1.1) entered.add(b);
            if (!entered.has(b)) return; // still on its way in from the top
            const held = drag.constraint.bodyB === b;
            if (held) { if (dist > R * 1.35) mouse.button = -1; return; }
            if (dist > R * 1.3 || (now - t0 > 2600 && b.position.y < -sizes[0].h)) {
              Body.setPosition(b, { x: cx + (Math.random() - 0.5) * R * 0.6, y: cy - R * 0.55 });
              Body.setVelocity(b, { x: 0, y: 0 });
              Body.setAngularVelocity(b, 0);
              Body.setAngle(b, (Math.random() - 0.5) * 0.6);
            }
          });
          draw();
          // once everything has stopped for a moment, put the chips to sleep: the solver otherwise keeps nudging the pile by a
          // fraction of a pixel every frame, which shows up as trembling. A grab (wake) starts the simulation again.
          if (dropped === bodies.length && !drag.constraint.bodyB) {
            const still = bodies.every((b) => b.speed < CALM_SPEED && Math.abs(b.angularSpeed) < CALM_SPIN);
            calm = still ? calm + 1 : 0;
            if (calm > CALM_FRAMES) {
              bodies.forEach((b) => { Body.setVelocity(b, { x: 0, y: 0 }); Body.setAngularVelocity(b, 0); });
              return;
            }
          } else calm = 0;
          raf = requestAnimationFrame(step);
        };
        const wake = () => {
          calm = 0;
          if (simVisible && simStarted && !raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(step); }
        };
        host.addEventListener("pointerdown", wake, { passive: true });

        return {
          // instant = settle straight away with no animation (reduced motion, or a rebuild after a resize)
          start(instant: boolean) {
            if (simStarted) return;
            simStarted = true;
            els.forEach((e) => (e.style.visibility = "visible"));
            if (instant) {
              order.forEach((bi, i) => {
                const b = bodies[bi];
                place(b, false, i);
                Body.setPosition(b, { x: cx + (Math.random() - 0.5) * R, y: cy - R * 0.9 + (i * R * 1.7) / bodies.length });
                Composite.add(world, b);
              });
              for (let n = 0; n < 420; n++) Engine.update(engine, 16.7);
              dropped = bodies.length;
              draw();
            }
            t0 = performance.now();
            last = t0;
            if (simVisible && !raf && !reduced) raf = requestAnimationFrame(step);
          },
          setVisible(v: boolean) {
            simVisible = v;
            if (v && simStarted && !raf && !reduced) { last = performance.now(); raf = requestAnimationFrame(step); }
          },
          dispose() {
            host.removeEventListener("pointerdown", wake);
            host.removeEventListener("touchstart", tStart);
            host.removeEventListener("touchmove", tMove);
            host.removeEventListener("touchend", tEnd);
            host.removeEventListener("mouseleave", release);
            window.removeEventListener("mouseup", release);
            window.removeEventListener("touchend", release);
            window.removeEventListener("touchcancel", release);
            window.removeEventListener("blur", release);
            cancelAnimationFrame(raf);
            Composite.clear(world, false);
            Engine.clear(engine);
          },
        };
      };

      // (re)build the simulation for the circle's current size
      const build = () => {
        const S = host.clientWidth;
        if (!S) return;
        currentS = S;
        const k = S / REF;
        host.style.setProperty("--k", String(k)); // chips scale with the circle (see the module CSS)
        void host.offsetWidth; // apply the new chip size before measuring it
        sim?.dispose();
        sim = createSim(S, k);
        sim.setVisible(visible);
        if (started) sim.start(true); // after a resize the chips are already settled, so just re-fit them
        else if (reduced && visible) { started = true; sim.start(true); }
      };

      build();

      if (typeof IntersectionObserver === "undefined") { started = true; (sim as { start: (i: boolean) => void } | null)?.start(true); return; }
      const io = new IntersectionObserver(
        ([e]) => {
          visible = e.isIntersecting;
          sim?.setVisible(visible);
          if (visible && !started) { started = true; sim?.start(reduced); }
        },
        { threshold: 0.35 }
      );
      io.observe(host.parentElement ?? host);
      // safety net: if the circle is on screen but the drop never fired, show the chips settled
      const failsafe = setTimeout(() => { if (!started && host.getBoundingClientRect().top < window.innerHeight) { started = true; sim?.start(true); } }, 4000);

      // re-fit when the circle changes size
      let timer: ReturnType<typeof setTimeout>;
      const ro = new ResizeObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => { if (Math.abs(host.clientWidth - currentS) > 1) build(); }, 150);
      });
      ro.observe(host);

      teardown = () => {
        clearTimeout(timer);
        clearTimeout(failsafe);
        ro.disconnect();
        io.disconnect();
        sim?.dispose();
      };
    })().catch(() => {
      // the physics could not start (module failed to load, an old WebView...): fall back to the resting layout
      teardown();
      host.classList.remove(styles.sim);
      host.querySelectorAll<HTMLElement>("[data-chip]").forEach((e) => { e.style.transform = ""; e.style.visibility = ""; });
    });

    return () => { disposed = true; teardown(); };
  }, [chips]);

  return (
    <div ref={wrap} className={styles.circle} role="group" aria-label="Skills">
      {chips.map((c) => (
        <span key={c.label} data-chip className={`${styles.chip} ${c.tone === "brand" ? styles.brandChip : styles.white}`}>{c.icon && <ToolIcon name={c.icon} className={styles.chipIcon} />}{c.label}</span>
      ))}
    </div>
  );
}
