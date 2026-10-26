"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Free measurement, switched off until you give it an ID: Google Analytics 4 (NEXT_PUBLIC_GA_ID, like G-XXXXXXXXXX) and Microsoft Clarity (NEXT_PUBLIC_CLARITY_ID).
// With no ID nothing is loaded and nothing is sent. With one, the script loads on the visitor's first touch of the page (or after 8 seconds), so it never slows the first load.
// Sent: page views and these events, with no personal data: contact_click, email_click, resume_view, resume_download, case_study_view. No names, e-mail addresses or form text.
const GA = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY = process.env.NEXT_PUBLIC_CLARITY_ID;

type Gtag = (...a: unknown[]) => void;
declare global { interface Window { dataLayer?: unknown[]; gtag?: Gtag; clarity?: (...a: unknown[]) => void } }

const send = (name: string, params: Record<string, string> = {}) => window.gtag?.("event", name, params);

export function Analytics() {
  const path = usePathname();

  useEffect(() => {
    if (!GA && !CLARITY) return;
    if (window.matchMedia("(prefers-reduced-data: reduce)").matches) return;
    let started = false;
    const start = () => {
      if (started) return;
      started = true;
      off();
      if (GA) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = function () { (window.dataLayer as unknown[]).push(arguments); } as Gtag;
        window.gtag("js", new Date());
        window.gtag("config", GA, { send_page_view: false, anonymize_ip: true });
        const s = document.createElement("script");
        s.async = true; s.src = `https://www.googletagmanager.com/gtag/js?id=${GA}`;
        document.head.appendChild(s);
        window.gtag("event", "page_view", { page_path: location.pathname, page_title: document.title });
      }
      if (CLARITY) {
        const c = document.createElement("script");
        c.async = true; c.src = `https://www.clarity.ms/tag/${CLARITY}`;
        document.head.appendChild(c);
      }
    };
    const evs = ["pointerdown", "touchstart", "scroll", "keydown"] as const;
    const off = () => evs.forEach((e) => window.removeEventListener(e, start));
    evs.forEach((e) => window.addEventListener(e, start, { passive: true, once: true }));
    const t = window.setTimeout(start, 8000);

    // clicks, read from the link itself (delegated, so the pages need no changes)
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      if (href.startsWith("mailto:")) send("email_click", { link_location: location.pathname });
      else if (/\.pdf($|\?)/i.test(href)) send("resume_download", { file_name: href.split("/").pop() ?? "" });
      else if (/^\/consulting\/?$|#contact/.test(href)) send("contact_click", { link_location: location.pathname });
    };
    document.addEventListener("click", onClick);
    return () => { window.clearTimeout(t); off(); document.removeEventListener("click", onClick); };
  }, []);

  // a page view for every route change after the first (the first is sent when the tag starts)
  useEffect(() => {
    if (!GA || !window.gtag) return;
    window.gtag("event", "page_view", { page_path: path, page_title: document.title });
    if (path.startsWith("/work/")) send("case_study_view", { case_study: path.split("/")[2] ?? "" });
    if (path.startsWith("/resume")) send("resume_view");
  }, [path]);

  return null;
}
