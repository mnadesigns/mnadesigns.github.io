"use client";

import { useEffect } from "react";
import { site } from "@/data/site";

// The case studies are on Behance. There is no locked popup: anyone who lands on a story page is taken to the Behance portfolio.
export function StoryGate({ children }: { children: React.ReactNode }) {
  void children;
  useEffect(() => { window.location.replace(site.behance); }, []);
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", textAlign: "center", padding: "0 24px" }}>
      <p style={{ fontFamily: "var(--sans)", fontSize: 18 }}>
        Opening my portfolio on Behance. <a href={site.behance} style={{ color: "var(--brand)", textDecoration: "underline" }}>Go there now</a>.
      </p>
    </main>
  );
}
