"use client";

import { useEffect } from "react";

// Site-wide "exploding input" effect. Click/tap anywhere: a burst at the pointer. Typing: a burst at the caret
// (or at the last pointer position). Each key spawns 3 sticker particles that are launched, fall under gravity,
// spin, and fade. Motion constants were measured from the Framer University "Exploding Input" demo; the sticker
// artwork below is original.
const PER_KEY = 3;
const PER_CLICK = 6;
const MAX_LIVE = 150;
const LIFE = 3.0; // seconds
const FADE_START = 2.3; // seconds; opacity holds at 1 until here
const FADE_END_OPACITY = 0.25;
const GRAVITY = 1180; // px/s^2
const BOX = 32; // base particle box (px)

// Each sticker: a white outline pass underneath, then the coloured pass with a thin dark edge.
const W = `fill="#fff" stroke="#fff" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`;
const eyes = (cx1: number, cx2: number, cy: number) =>
  `<circle cx="${cx1}" cy="${cy}" r="2.7" fill="#fff"/><circle cx="${cx1 + 0.6}" cy="${cy + 0.5}" r="1.3" fill="#111"/>` +
  `<circle cx="${cx2}" cy="${cy}" r="2.7" fill="#fff"/><circle cx="${cx2 + 0.6}" cy="${cy + 0.5}" r="1.3" fill="#111"/>`;

const HEART = "M20 35 C6 25 3 14 10 9 C15 5.5 19 8 20 12 C21 8 25 5.5 30 9 C37 14 34 25 20 35 Z";
const BOLT = "M24 2 L8 23 H18 L14 38 L32 15 H21 Z";
// jelly: a squarish body that melts into two uneven drips (deliberately not a ghost shape)
const BLOB =
  "M8 14 C8 7 13 5 20 5 C27 5 32 7 32 14 L32 26 C32 29 30 31 28 31 C27 31 26.5 33 26.5 35 C26.5 37.5 23.5 37.5 23.5 35 C23.5 33 23 31 21 31 H19 C17 31 16.5 33 16.5 36 C16.5 38.5 13.5 38.5 13.5 36 C13.5 34 13 31.5 11 31 C9 30.5 8 29 8 26 Z";
const dotEyes = (y: number) =>
  `<circle cx="15" cy="${y}" r="2.3" fill="#111"/><circle cx="25" cy="${y}" r="2.3" fill="#111"/><circle cx="15.8" cy="${y - 0.8}" r="0.8" fill="#fff"/><circle cx="25.8" cy="${y - 0.8}" r="0.8" fill="#fff"/>`;
// pulls a sticker slightly inward so its white outline is never clipped by the 40x40 box
const fit = (inner: string, s: number) => `<g transform="translate(20 20) scale(${s}) translate(-20 -20)">${inner}</g>`;
const STAR = "M20 3 L24.7 14.2 L36.8 15.2 L27.6 23.1 L30.4 35 L20 28.6 L9.6 35 L12.4 23.1 L3.2 15.2 L15.3 14.2 Z";
const GHOST = "M8 36 V18 C8 9 13 4 20 4 C27 4 32 9 32 18 V36 L28 32 L24 36 L20 32 L16 36 L12 32 Z";
const FLAME = "M20 3 C22 10 30 14 30 24 C30 31 25 36 20 36 C15 36 10 31 10 24 C10 19 13 16 15 13 C15 18 17 19 18 19 C17 13 18 8 20 3 Z";
const FLAME_IN = "M20 36 C16 36 14 32 15 28 C16 25 18 24 19 21 C21 25 25 27 25 31 C25 34 23 36 20 36 Z";
const MOON = "M26 4 C14 4 6 12 6 22 C6 32 14 37 24 37 C30 37 34 34 36 31 C26 33 18 26 18 18 C18 12 21 7 26 4 Z";
const SPARKLE = "M20 3 C21 14 26 19 37 20 C26 21 21 26 20 37 C19 26 14 21 3 20 C14 19 19 14 20 3 Z";
const CAT_EARS = "M7 18 L8 3.5 L19 11 Z M33 18 L32 3.5 L21 11 Z";
const CLOUD = `<circle cx="11" cy="25" r="7"/><circle cx="20" cy="19" r="9"/><circle cx="29" cy="25" r="7"/><circle cx="20" cy="27" r="8"/>`;
const CACTUS = `<rect x="14" y="7" width="12" height="29" rx="6"/><rect x="5" y="17" width="12" height="6.5" rx="3.2"/><rect x="5" y="11" width="6.5" height="12.5" rx="3.2"/><rect x="23" y="20" width="12" height="6.5" rx="3.2"/><rect x="28.5" y="13" width="6.5" height="13.5" rx="3.2"/>`;
const smile = (cx: number, cy: number) => `<path d="M${cx - 3} ${cy} Q${cx} ${cy + 3} ${cx + 3} ${cy}" fill="none" stroke="#111" stroke-width="1.5" stroke-linecap="round"/>`;
const petals = (n: number, rx: number, ry: number, fill: string) =>
  Array.from({ length: n }, (_, i) => `<ellipse cx="20" cy="${20 - ry + 1}" rx="${rx}" ry="${ry}" fill="${fill}" transform="rotate(${(360 / n) * i} 20 20)"/>`).join("");

const STICKERS: string[] = [
  // red heart with eyes
  `<path d="${HEART}" ${W}/><path d="${HEART}" fill="#ff3b3b" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/>${eyes(15, 25, 17)}`,
  // lime four-lobed flower with eyes
  fit(
    `<g ${W}><circle cx="20" cy="9" r="8"/><circle cx="31" cy="20" r="8"/><circle cx="20" cy="31" r="8"/><circle cx="9" cy="20" r="8"/><circle cx="20" cy="20" r="9"/></g>` +
      `<g fill="#a6e22e"><circle cx="20" cy="9" r="8"/><circle cx="31" cy="20" r="8"/><circle cx="20" cy="31" r="8"/><circle cx="9" cy="20" r="8"/><circle cx="20" cy="20" r="9"/></g>${eyes(16, 24, 19)}`,
    0.84
  ),
  // blue six-petal flower
  `<g ${W}>${petals(6, 5.2, 9.2, "#fff")}</g>${petals(6, 5.2, 9.2, "#2f9bff")}<circle cx="20" cy="20" r="3.6" fill="#1672d6"/>`,
  // yellow lightning bolt
  `<path d="${BOLT}" ${W}/><path d="${BOLT}" fill="#ffc21a" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/>`,
  // purple jelly with a smile
  fit(`<path d="${BLOB}" ${W}/><path d="${BLOB}" fill="#6a4cf5" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/>${dotEyes(16)}${smile(20, 21)}`, 0.88),
  // orange jelly with a smile
  fit(`<path d="${BLOB}" ${W}/><path d="${BLOB}" fill="#ff7a1a" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/>${dotEyes(16)}${smile(20, 21)}`, 0.88),
  // yellow star with a face
  `<path d="${STAR}" ${W}/><path d="${STAR}" fill="#ffd23f" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/>${eyes(16, 24, 19)}${smile(20, 25)}`,
  // pink smiley
  `<circle cx="20" cy="20" r="15" ${W}/><circle cx="20" cy="20" r="15" fill="#ff6fb5" stroke="#1a1a1a" stroke-width="1.3"/>${eyes(15, 25, 17)}${smile(20, 24)}`,
  // sky-blue cloud with eyes
  `<g ${W}>${CLOUD}</g><g fill="#8fd3ff">${CLOUD}</g>${eyes(16, 24, 23)}${smile(20, 28)}`,
  // lavender ghost
  `<path d="${GHOST}" ${W}/><path d="${GHOST}" fill="#efe9ff" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/><ellipse cx="15" cy="17" rx="2.1" ry="3" fill="#111"/><ellipse cx="25" cy="17" rx="2.1" ry="3" fill="#111"/><circle cx="20" cy="25" r="2.4" fill="#111"/>`,
  // pink donut with sprinkles
  `<circle cx="20" cy="20" r="16" ${W}/><circle cx="20" cy="20" r="15" fill="#e0a164"/><circle cx="20" cy="20" r="12.6" fill="#ff7eb6"/>` +
    `<g stroke-width="2" stroke-linecap="round"><path d="M12 14 l3 -2" stroke="#fff"/><path d="M26 12 l3 2" stroke="#ffd23f"/><path d="M29 22 l1 3.4" stroke="#8fd3ff"/><path d="M13 27 l-2.4 -2" stroke="#a6e22e"/><path d="M22 30 l3 -1" stroke="#fff"/><path d="M19 11.5 l-0.6 3" stroke="#6a4cf5"/></g>` +
    `<circle cx="20" cy="20" r="4.6" fill="#fff" stroke="#1a1a1a" stroke-width="1.2"/>`,
  // flame
  `<path d="${FLAME}" ${W}/><path d="${FLAME}" fill="#ff5a1f" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/><path d="${FLAME_IN}" fill="#ffc21a"/>`,
  // cherries
  `<g ${W}><circle cx="12.5" cy="28" r="7.5"/><circle cx="28" cy="26" r="7.5"/><path d="M12.5 21 Q15 10 24 6 M28 19 Q26 12 24 6" fill="none"/></g>` +
    `<path d="M12.5 21 Q15 10 24 6 M28 19 Q26 12 24 6" fill="none" stroke="#3a8a2e" stroke-width="2.2" stroke-linecap="round"/><ellipse cx="28.5" cy="7.5" rx="5.5" ry="2.8" transform="rotate(-25 28.5 7.5)" fill="#55b947"/>` +
    `<circle cx="12.5" cy="28" r="7" fill="#e8203b" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="28" cy="26" r="7" fill="#e8203b" stroke="#1a1a1a" stroke-width="1.2"/><circle cx="10" cy="25.6" r="1.7" fill="#fff"/><circle cx="25.5" cy="23.6" r="1.7" fill="#fff"/>`,
  // green cactus with a face
  `<g ${W}>${CACTUS}</g><g fill="#4cc36a" stroke="#1a1a1a" stroke-width="1.2">${CACTUS}</g>${eyes(17, 23, 20)}${smile(20, 25)}`,
  // yellow crescent moon
  `<path d="${MOON}" ${W}/><path d="${MOON}" fill="#ffd23f" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/><path d="M9.5 23.5 Q12.5 20.5 15.5 23.5" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round"/><circle cx="14" cy="28" r="2.2" fill="#ff9ec4"/>`,
  // pink sparkle
  `<path d="${SPARKLE}" ${W}/><path d="${SPARKLE}" fill="#ff8fd8" stroke="#1a1a1a" stroke-width="1.3" stroke-linejoin="round"/>`,
  // orange cat face
  `<g ${W}><path d="${CAT_EARS}"/><circle cx="20" cy="23" r="14.5"/></g><path d="${CAT_EARS}" fill="#ffb347" stroke="#1a1a1a" stroke-width="1.2" stroke-linejoin="round"/><circle cx="20" cy="23" r="14" fill="#ffb347" stroke="#1a1a1a" stroke-width="1.2"/>` +
    `<ellipse cx="14.8" cy="22" rx="1.9" ry="2.6" fill="#111"/><ellipse cx="25.2" cy="22" rx="1.9" ry="2.6" fill="#111"/><path d="M18.4 26.4 H21.6 L20 28.2 Z" fill="#ff7aa8"/>` +
    `<path d="M5 25 L12 26 M5 29 L12 28 M35 25 L28 26 M35 29 L28 28" stroke="#111" stroke-width="1" stroke-linecap="round"/>`,
];
const svg = (inner: string) => `<svg viewBox="0 0 40 40" width="100%" height="100%" aria-hidden="true">${inner}</svg>`;

type Particle = {
  el: HTMLDivElement;
  x: number; y: number; // origin
  vx: number; vy: number; // launch velocity (px/s)
  rot: number; spin: number; // start rotation (deg) and spin speed (deg/s)
  scale: number;
  born: number;
};

// Caret position for an input/textarea (measured with a canvas) or contenteditable (via the selection range).
function caretPoint(): { x: number; y: number } | null {
  const a = document.activeElement as HTMLElement | null;
  if (!a) return null;
  if (a instanceof HTMLInputElement || a instanceof HTMLTextAreaElement) {
    const r = a.getBoundingClientRect();
    const cs = getComputedStyle(a);
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    const pos = a.selectionStart ?? a.value.length;
    const text = a.type === "password" ? "•".repeat(pos) : a.value.slice(0, pos);
    const x = r.left + parseFloat(cs.paddingLeft || "0") + ctx.measureText(text).width - a.scrollLeft;
    return { x: Math.min(Math.max(x, r.left), r.right), y: r.top + r.height / 2 };
  }
  if (a.isContentEditable) {
    const sel = window.getSelection();
    if (sel && sel.rangeCount) {
      const rr = sel.getRangeAt(0).getBoundingClientRect();
      if (rr.width || rr.height) return { x: rr.right, y: rr.top + rr.height / 2 };
    }
  }
  return null;
}

const TAPPABLE = "a, button, [role='button'], summary, label, input, select, textarea, .btn, .btn-sec, .btn-circle, .nav-cta";

export function BoomEffect() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;z-index:250;pointer-events:none;overflow:hidden;";
    document.body.appendChild(layer);

    const live: Particle[] = [];
    let raf = 0;
    let last = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const frame = (now: number) => {
      for (let i = live.length - 1; i >= 0; i--) {
        const p = live[i];
        const t = (now - p.born) / 1000;
        if (t >= LIFE) { p.el.remove(); live.splice(i, 1); continue; }
        const x = p.x + p.vx * t;
        const y = p.y + p.vy * t + 0.5 * GRAVITY * t * t;
        const rot = p.rot + p.spin * t;
        const op = t < FADE_START ? 1 : 1 - (1 - FADE_END_OPACITY) * ((t - FADE_START) / (LIFE - FADE_START));
        p.el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${p.scale}) rotate(${rot}deg)`;
        p.el.style.opacity = String(op);
      }
      raf = live.length ? requestAnimationFrame(frame) : 0;
    };

    // typing launches up and to the left (measured: roughly -105 to -155 degrees); a click pops upward in any direction
    const burst = (x: number, y: number, n: number, fromKey: boolean) => {
      const now = performance.now();
      for (let i = 0; i < n; i++) {
        while (live.length >= MAX_LIVE) live.shift()?.el.remove();
        const el = document.createElement("div");
        el.style.cssText = `position:absolute;left:0;top:0;width:${BOX}px;height:${BOX}px;pointer-events:none;will-change:transform,opacity;transform-origin:50% 50%;`;
        el.innerHTML = svg(STICKERS[Math.floor(Math.random() * STICKERS.length)]);
        layer.appendChild(el);
        const angle = fromKey
          ? ((-155 + Math.random() * 50) * Math.PI) / 180
          : ((-170 + Math.random() * 160) * Math.PI) / 180;
        const speed = 400 + Math.random() * 340;
        live.push({
          el, x, y, born: now,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          rot: Math.random() * 360 - 180,
          spin: (30 + Math.random() * 70) * (Math.random() < 0.5 ? -1 : 1),
          scale: 1 + Math.random() * 0.45,
        });
      }
      if (!raf) raf = requestAnimationFrame(frame);
    };

    const onPointerDown = (e: PointerEvent) => {
      last = { x: e.clientX, y: e.clientY };
      // touch (phones and tablets): only taps on buttons, links and other actions pop stickers; desktop (mouse) bursts anywhere
      if (e.pointerType !== "mouse" && !(e.target as Element | null)?.closest?.(TAPPABLE)) return;
      burst(e.clientX, e.clientY, PER_CLICK, false);
    };
    const onPointerMove = (e: PointerEvent) => { last = { x: e.clientX, y: e.clientY }; };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return; // printable characters only
      // the caret moves after the character is inserted, so measure just after the key's default action
      setTimeout(() => {
        const p = caretPoint() ?? last;
        burst(p.x, p.y, PER_KEY, true);
      }, 0);
    };

    window.addEventListener("pointerdown", onPointerDown, { passive: true, capture: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("keydown", onKeyDown, { passive: true, capture: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("keydown", onKeyDown, true);
      layer.remove();
    };
  }, []);

  return null;
}
