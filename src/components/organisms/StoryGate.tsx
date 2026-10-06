"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";
import { site } from "@/data/site";

// UI-only password gate. The check is fake and client-side (placeholder password), per project rules: no real auth.
// Unlock state is remembered in localStorage so refreshes and other stories stay open.
const PLACEHOLDER_PASSWORD = "placeholder";
const KEY = "stories-unlocked";

const read = () => {
  try { return localStorage.getItem(KEY) === "1"; } catch { return false; }
};
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

export function StoryGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const stored = useSyncExternalStore(subscribe, read, () => false);
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState("");
  const [err, setErr] = useState(false);

  if (stored || unlocked) return <>{children}</>;
  return (
    <>
      <div className="sg" role="dialog" aria-modal="true" aria-label="Locked case study">
        <div className="sg-card">
          <button type="button" className="sg-close" aria-label="Close" onClick={() => router.push("/stories/")}>
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3l10 10M13 3L3 13" /></svg>
          </button>
          <p className="sg-kicker"><span className="sg-dot" />Private</p>
          <h2 className="sg-title">This case study is locked<em>.</em></h2>
          <form
            className="sg-form"
            autoComplete="off"
            onSubmit={(e) => {
              e.preventDefault();
              if (value === PLACEHOLDER_PASSWORD) {
                try { localStorage.setItem(KEY, "1"); } catch {}
                setUnlocked(true);
              } else setErr(true);
            }}
          >
            <input className="sg-input" type="password" value={value} onChange={(e) => { setValue(e.target.value); setErr(false); }} placeholder="Enter password" aria-label="Password" autoFocus />
            <button className="sg-btn" type="submit">Unlock<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12L12 4M5 4h7v7" /></svg></button>
          </form>
          {err && <p className="sg-err">Not quite.</p>}
          <p className="sg-err" style={{ color: "rgba(255,255,255,0.4)", marginTop: 10 }}>Prototype password: {PLACEHOLDER_PASSWORD}</p>
          <div className="sg-contacts">
            <span className="sg-ask">Get the password</span>
            <a className="sg-contact" href={`mailto:${site.email}?subject=Case%20study%20access`}>Email</a>
            <a className="sg-contact" href="https://www.linkedin.com/" target="_blank" rel="noopener">LinkedIn</a>
          </div>
        </div>
      </div>
      <div aria-hidden="true" style={{ height: "100vh", overflow: "hidden" }} />
    </>
  );
}
