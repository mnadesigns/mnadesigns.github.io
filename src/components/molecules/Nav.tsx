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
    const onScroll = () => {
      const y = window.scrollY;
      setHide(y > last.current && y > 120);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
