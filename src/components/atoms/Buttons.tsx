import Link from "next/link";
import type { ReactNode } from "react";
import { extProps } from "@/lib/links";

export function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 12L12 4M5 4h7v7" />
    </svg>
  );
}

type Props = { href: string; children: ReactNode; className?: string };

export function Btn({ href, children, className = "" }: Props) {
  return (
    <Link href={href} {...extProps(href)} className={`btn ${className}`}>
      {children}
      <span className="ico big"><Arrow /></span>
    </Link>
  );
}

export function BtnSec({ href, children, className = "" }: Props) {
  return (
    <Link href={href} {...extProps(href)} className={`btn-sec ${className}`}>
      {children}
      <span className="ico big"><Arrow /></span>
    </Link>
  );
}

export function BtnText({ href, children }: Props) {
  return (
    <Link href={href} {...extProps(href)} className="btn-text">
      {children}
      <Arrow />
    </Link>
  );
}

export function BtnCircle({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} {...extProps(href)} className="btn-circle">
      <span className="big"><Arrow /></span>
      <span className="lbl">{label}</span>
    </Link>
  );
}
