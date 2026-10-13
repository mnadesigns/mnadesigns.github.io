"use client";

import { useRef, useState } from "react";

// A prompt a reader can use: the first lines are shown, "Read more" opens the rest, and the copy icon on the right copies the whole prompt.
export function PromptBlock({ title, text }: { title: string; text: string }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // clipboard blocked (older browsers, insecure origin): fall back to a hidden textarea
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* nothing more to try */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="pb">
      <div className="pb-head">
        <div>
          <span className="pb-kicker">Prompt</span>
          <span className="pb-title">{title}</span>
        </div>
        <button type="button" className={`pb-copy${copied ? " done" : ""}`} onClick={copy} aria-label={copied ? "Copied" : "Copy the prompt"}>
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5" /><path d="M5 15V6.5A2.5 2.5 0 0 1 7.5 4H15" /></svg>
          )}
          <span className="pb-copy-label" aria-live="polite">{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className={`pb-body${open ? " open" : ""}`}>
        <pre className="pb-text">{text}</pre>
      </div>
      <button type="button" className="pb-more" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {open ? "Show less" : "Read more"}
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ transform: open ? "rotate(180deg)" : undefined }}><path d="M3.5 6l4.5 4.5L12.5 6" /></svg>
      </button>
    </div>
  );
}
