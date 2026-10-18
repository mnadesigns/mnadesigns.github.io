"use client";

import { useEffect, useRef } from "react";
import { Accessibility, Blocks, Building2, CircleHelp, GitMerge, Layers, MonitorSmartphone, PenTool, Route, Search, ShieldCheck, Smartphone, Workflow, Wrench } from "lucide-react";

// Line icons (lucide) for the copy of the work details pages. Each one draws itself in when it scrolls into view, and lifts a little when its row is hovered (styles in work.css).
const ICONS = {
  "monitor-smartphone": MonitorSmartphone,
  "building": Building2,
  "pen-tool": PenTool,
  "wrench": Wrench,
  "shield-check": ShieldCheck,
  "workflow": Workflow,
  "accessibility": Accessibility,
  "route": Route,
  "blocks": Blocks,
  "layers": Layers,
  "search": Search,
  "git-merge": GitMerge,
  "smartphone": Smartphone,
  "circle-help": CircleHelp,
} as const;

export type IconName = keyof typeof ICONS;

export function LineIcon({ name, delay = 0 }: { name: IconName; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const Icon = ICONS[name];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // every stroke is measured as length 1, so one dash rule draws any shape
    el.querySelectorAll("path, circle, line, rect, polyline, polygon, ellipse").forEach((n) => n.setAttribute("pathLength", "1"));
    el.classList.add("is-ready");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.classList.add("is-in"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className="wk-lico" style={{ "--d": `${delay}ms` } as React.CSSProperties} aria-hidden="true">
      <Icon strokeWidth={1.6} />
    </span>
  );
}
