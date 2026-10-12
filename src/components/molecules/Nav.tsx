"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navLinks, site } from "@/data/site";
import { Arrow } from "@/components/atoms/Buttons";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(false);
  const last = useRef(0);
  const path = usePathname();

  useEffect(() => {
    // Inside the work stack the bar stays tucked away, even when scrolling up. That is also set as a class on <body> (see .in-work in site.css) and
    // re-checked on scroll, resize, load and a slow timer, so it can never be left showing by a missed scroll event (page restored mid-stack, reduced motion, zoom).
    const update = () => {
      const y = window.scrollY;
      const stack = document.querySelector(".chap-stack")?.getBoundingClientRect();
      const mid = window.innerHeight / 2; // the stack covers the middle of the screen (no pixel-exact test, which fails on scaled Windows displays)
      const inWork = !!stack && stack.top <= mid && stack.bottom >= mid;
      document.body.classList.toggle("in-work", inWork);
      setHide(inWork || (y > last.current && y > 120));
      last.current = y;
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    window.addEventListener("load", update);
    const slow = setInterval(update, 300);
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); window.removeEventListener("load", update); clearInterval(slow); document.body.classList.remove("in-work"); };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-locked", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <nav className={`nav${hide ? " hide" : ""}`} id="nav">
        <Link href="/" className="nav-logo" aria-label="Home">{site.logo}<i /></Link>
        <div className="nav-links">
          {navLinks.slice(0, -1).map((l) => (
            <Link key={l.href} href={l.href} aria-current={path === l.href ? "page" : undefined}>{l.label}</Link>
          ))}
          <Link href={navLinks[navLinks.length - 1].href} className="nav-cta">
            <span>{navLinks[navLinks.length - 1].label}</span>
            <span className="nav-cta-ico"><Arrow /></span>
          </Link>
        </div>
        <button className="nav-burger" aria-label="Open menu" onClick={() => setOpen(true)}>
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h14M3 14h14" /></svg>
        </button>
      </nav>
      <div className={`menu${open ? " open" : ""}`} aria-hidden={!open} onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}>
        <button className="menu-close" aria-label="Close menu" onClick={() => setOpen(false)}>
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l10 10M13 3L3 13" /></svg>
        </button>
        {navLinks.map((l) => <Link key={l.href} href={l.href} className="menu-link">{l.label}</Link>)}
      </div>
    </>
  );
}
