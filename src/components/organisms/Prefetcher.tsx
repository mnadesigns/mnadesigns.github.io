"use client";

import { useEffect } from "react";

// Warms up the rest of the site while the visitor reads the current page, so the next page opens with its pictures already there.
// 1. A service worker (public/sw.js) keeps every image, font and script it has seen, so repeat visits are instant.
// 2. When the browser is idle it reads the pages this page links to, finds the pictures on them and fetches those quietly, a couple at a time. Hovering or touching a link moves that page to the front.
// It never runs on Save-Data or a slow connection, stops at a data budget, and only fetches pictures (videos wait until they are needed).
const IMG = /\/images\/[A-Za-z0-9_\-./%]+?\.(?:webp|png|jpe?g|svg|avif)/g;
const BUDGET = { desktop: 40e6, phone: 15e6 };

export function Prefetcher() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) navigator.serviceWorker.register("/sw.js").catch(() => {});

    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    if (conn?.saveData || (conn?.effectiveType && conn.effectiveType !== "4g")) return;

    const budget = window.matchMedia("(max-width: 700px)").matches ? BUDGET.phone : BUDGET.desktop;
    const doneRoutes = new Set<string>([location.pathname]);
    const doneImgs = new Set<string>();
    const queue: string[] = [];
    let spent = 0;
    let active = 0;
    let stopped = false;

    const pump = () => {
      while (!stopped && active < 2 && queue.length && spent < budget) {
        const u = queue.shift()!;
        if (doneImgs.has(u)) continue;
        doneImgs.add(u);
        active++;
        fetch(u, { priority: "low" } as RequestInit)
          .then((r) => r.blob())
          .then((b) => { spent += b.size; })
          .catch(() => {})
          .finally(() => { active--; pump(); });
      }
    };

    const warm = (path: string, front = false) => {
      if (doneRoutes.has(path)) return;
      doneRoutes.add(path);
      fetch(path, { priority: "low" } as RequestInit)
        .then((r) => (r.ok ? r.text() : ""))
        .then((html) => {
          const found = [...new Set(html.match(IMG) ?? [])].filter((u) => !doneImgs.has(u));
          if (front) queue.unshift(...found); else queue.push(...found);
          pump();
        })
        .catch(() => {});
    };

    const routes = () =>
      [...document.querySelectorAll<HTMLAnchorElement>("a[href^='/']")]
        .map((a) => a.pathname)
        .filter((p, i, all) => !p.includes(".") && all.indexOf(p) === i);

    const hot = (e: Event) => {
      const a = (e.target as Element | null)?.closest?.("a[href^='/']") as HTMLAnchorElement | null;
      if (a && !a.pathname.includes(".")) warm(a.pathname, true);
    };
    document.addEventListener("pointerover", hot, { passive: true });
    document.addEventListener("touchstart", hot, { passive: true });

    const idle = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1500));
    // let this page finish first: start a few seconds after it has loaded, one page at a time
    const start = () => {
      let i = 0;
      const list = routes();
      const next = () => {
        if (stopped || i >= list.length || spent >= budget) return;
        warm(list[i++]);
        window.setTimeout(() => idle(next), 2500);
      };
      idle(next);
    };
    const t = window.setTimeout(start, 3000);

    return () => {
      stopped = true;
      window.clearTimeout(t);
      document.removeEventListener("pointerover", hot);
      document.removeEventListener("touchstart", hot);
    };
  }, []);
  return null;
}
