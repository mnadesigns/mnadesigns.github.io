import s from "./Illustration.module.css";

// Illustrations for the articles, one per article, in the manner of Mews' "three easy steps" tiles: a soft tinted tile, clean white UI cards with one clear picture each, chevrons between them and a pill at
// the foot. Drawn in the brand's colours: the site blue and deep blue, a navy ink and white, on a pale blue tile. Everything is big and solid (cards 200+ px, pictures 100+ px, 30 px bold labels),
// white text only on the deep blue and ink only on white or pale blue, so it holds up at thumbnail size and for low vision. Each carries a text alternative for screen readers.
// They move: the cards pop in one after another, the chevrons nudge forward and the pictures float (see Illustration.module.css); reduced motion shows the finished picture.
export type IllustrationKind = "foundations" | "system" | "reference" | "mvp" | "motion" | "code" | "tokens" | "tests" | "agent" | "limits" | "ios";

const BLUE = "#38b6f2";
const DEEP = "#1297d9";
const INK = "#14233a";
const WHITE = "#ffffff";
const CYAN = "#8fe3ff";
const FONT = "var(--sans), Inter, system-ui, sans-serif";

type Glyph = "chat" | "dots" | "tree" | "figma" | "code" | "check" | "shield" | "phone" | "warn" | "swatches" | "plugin" | "list" | "win" | "winok" | "bubble" | "doc" | "wire" | "wireblue" | "curve" | "frames" | "n1" | "n2" | "n3";

// the pictures, each drawn in a 100 x 100 box
function Pic({ g }: { g: Glyph }) {
  const sw = { strokeWidth: 7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  switch (g) {
    case "chat": return (<g><path d="M16 20h68a8 8 0 0 1 8 8v36a8 8 0 0 1-8 8H48L26 90V72h-10a8 8 0 0 1-8-8V28a8 8 0 0 1 8-8Z" fill={BLUE} /><path d="M26 40h48M26 56h30" stroke={WHITE} fill="none" {...sw} /></g>);
    case "dots": return (<g><circle cx="34" cy="34" r="22" fill={BLUE} /><circle cx="70" cy="56" r="22" fill={INK} /><circle cx="36" cy="76" r="16" fill={DEEP} /></g>);
    case "tree": return (<g><rect x="30" y="8" width="40" height="22" rx="7" fill={BLUE} /><path d="M50 30v16M16 46h68M16 46v12M50 46v12M84 46v12" stroke={INK} fill="none" {...sw} /><rect x="4" y="58" width="26" height="28" rx="7" fill={INK} /><rect x="37" y="58" width="26" height="28" rx="7" fill={DEEP} /><rect x="70" y="58" width="26" height="28" rx="7" fill={INK} /></g>);
    case "figma": return (<g><circle cx="38" cy="32" r="24" fill={INK} /><rect x="54" y="8" width="38" height="38" rx="9" fill={BLUE} /><rect x="8" y="58" width="84" height="30" rx="10" fill={DEEP} /></g>);
    case "code": return (<path d="M34 24L10 50l24 26M66 24l24 26-24 26M57 16L43 84" fill="none" stroke={INK} {...sw} strokeWidth={9} />);
    case "check": return (<g><circle cx="50" cy="50" r="40" fill={BLUE} /><path d="M30 52l14 14 28-32" fill="none" stroke={WHITE} {...sw} strokeWidth={10} /></g>);
    case "shield": return (<g><path d="M50 8l36 14v28c0 22-15 38-36 44-21-6-36-22-36-44V22Z" fill={INK} /><path d="M32 50l13 13 24-28" fill="none" stroke={CYAN} {...sw} strokeWidth={9} /></g>);
    case "phone": return (<g><rect x="26" y="4" width="48" height="92" rx="12" fill={INK} /><rect x="33" y="16" width="34" height="22" rx="5" fill={BLUE} /><rect x="33" y="44" width="34" height="12" rx="4" fill={WHITE} /><rect x="33" y="62" width="34" height="12" rx="4" fill={CYAN} /></g>);
    case "warn": return (<g><path d="M50 10L92 84H8Z" fill={INK} stroke={INK} strokeWidth={8} strokeLinejoin="round" /><path d="M50 36v26" stroke={WHITE} {...sw} strokeWidth={9} /><circle cx="50" cy="74" r="5.5" fill={WHITE} /></g>);
    case "swatches": return (<g><rect x="6" y="6" width="42" height="42" rx="11" fill={BLUE} /><rect x="52" y="6" width="42" height="42" rx="11" fill={INK} /><rect x="6" y="52" width="42" height="42" rx="11" fill={CYAN} /><rect x="52" y="52" width="42" height="42" rx="11" fill={DEEP} /></g>);
    case "plugin": return (<g><circle cx="50" cy="50" r="42" fill={DEEP} /><path d="M30 50h40M50 30v40" stroke={WHITE} {...sw} strokeWidth={10} /></g>);
    case "list": return (<g><rect x="6" y="8" width="88" height="20" rx="8" fill={BLUE} /><rect x="6" y="36" width="88" height="20" rx="8" fill={INK} /><rect x="6" y="64" width="88" height="20" rx="8" fill={DEEP} /></g>);
    case "win": return (<g><rect x="4" y="12" width="92" height="76" rx="12" fill={INK} /><circle cx="20" cy="26" r="4.5" fill={CYAN} /><circle cx="34" cy="26" r="4.5" fill={BLUE} /><rect x="14" y="40" width="72" height="14" rx="5" fill={BLUE} /><rect x="14" y="62" width="32" height="18" rx="5" fill={WHITE} /><rect x="52" y="62" width="34" height="18" rx="5" fill={DEEP} /></g>);
    case "winok": return (<g><rect x="4" y="12" width="92" height="76" rx="12" fill={INK} /><circle cx="20" cy="26" r="4.5" fill={CYAN} /><circle cx="34" cy="26" r="4.5" fill={BLUE} /><rect x="14" y="40" width="72" height="14" rx="5" fill={BLUE} /><rect x="14" y="62" width="32" height="18" rx="5" fill={WHITE} /><circle cx="76" cy="70" r="16" fill={CYAN} /><path d="M68 70l6 6 12-13" fill="none" stroke={INK} {...sw} strokeWidth={6} /></g>);
    case "bubble": return (<g><path d="M10 14h80a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H48L28 88V70H10a8 8 0 0 1-8-8V22a8 8 0 0 1 8-8Z" fill={INK} /><text x="50" y="52" textAnchor="middle" fill={CYAN} style={{ fontFamily: FONT, fontWeight: 800, fontSize: 30 }}>24 px</text></g>);
    case "doc": return (<g><path d="M24 6h38l20 20v64a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4V10a4 4 0 0 1 4-4Z" fill={BLUE} /><path d="M32 46h38M32 62h38M32 78h24" stroke={WHITE} fill="none" {...sw} strokeWidth={6} /></g>);
    case "wire": return (<g><rect x="6" y="8" width="88" height="84" rx="12" fill="#b9c4d2" /><rect x="14" y="16" width="72" height="14" rx="5" fill={INK} /><rect x="14" y="36" width="72" height="26" rx="6" fill={WHITE} /><rect x="14" y="68" width="34" height="16" rx="5" fill={WHITE} /><rect x="52" y="68" width="34" height="16" rx="5" fill={WHITE} /></g>);
    case "wireblue": return (<g><rect x="6" y="8" width="88" height="84" rx="12" fill={BLUE} /><rect x="14" y="16" width="72" height="14" rx="5" fill={INK} /><rect x="14" y="36" width="72" height="26" rx="6" fill={WHITE} /><rect x="14" y="68" width="34" height="16" rx="5" fill={INK} /><rect x="52" y="68" width="34" height="16" rx="5" fill={WHITE} /></g>);
    case "curve": return (<g><path d="M12 84C50 84 44 20 88 20" fill="none" stroke={BLUE} {...sw} strokeWidth={10} /><circle cx="12" cy="84" r="9" fill={INK} /><circle cx="88" cy="20" r="9" fill={INK} /></g>);
    case "frames": return (<g><rect x="2" y="26" width="28" height="48" rx="9" fill={INK} /><rect x="36" y="26" width="28" height="48" rx="9" fill={BLUE} /><rect x="70" y="26" width="28" height="48" rx="9" fill={DEEP} /></g>);
    case "n1": case "n2": case "n3": return (<text x="50" y="70" textAnchor="middle" fill={g === "n2" ? DEEP : INK} style={{ fontFamily: FONT, fontWeight: 800, fontSize: 96 }}>{g.slice(1)}</text>);
  }
}

type Card = { g: Glyph; label: string; badge?: boolean };
type Spec = { cards: Card[]; pill: string; arrows: 0 | 1 | 2; rise?: boolean };

const SPECS: Record<IllustrationKind, Spec> = {
  foundations: { cards: [{ g: "chat", label: "Interviews" }, { g: "dots", label: "Insights" }, { g: "tree", label: "Structure" }], pill: "Before any screen is drawn", arrows: 1 },
  system: { cards: [{ g: "figma", label: "Figma" }, { g: "code", label: "Code" }], pill: "Synced both ways", arrows: 2 },
  reference: { cards: [{ g: "wire", label: "Reference" }, { g: "wireblue", label: "Your site" }], pill: "Layout proven, brand yours", arrows: 1 },
  mvp: { cards: [{ g: "n1", label: "Benchmark" }, { g: "n2", label: "Flows" }, { g: "n3", label: "Prototype" }], pill: "2 weeks", arrows: 0, rise: true },
  motion: { cards: [{ g: "curve", label: "Easing" }, { g: "frames", label: "Keyframes" }], pill: "Shipped as approved", arrows: 1 },
  code: { cards: [{ g: "win", label: "Design" }, { g: "code", label: "Pull request" }], pill: "Ready to merge", arrows: 1 },
  tokens: { cards: [{ g: "swatches", label: "4 inputs" }, { g: "plugin", label: "Plugin" }, { g: "list", label: "Tokens" }], pill: "A full token set", arrows: 1 },
  tests: { cards: [{ g: "figma", label: "Figma", badge: true }, { g: "list", label: "Tokens", badge: true }, { g: "code", label: "Code", badge: true }], pill: "Every check passes", arrows: 0 },
  agent: { cards: [{ g: "win", label: "Screenshot" }, { g: "bubble", label: "Prompt" }, { g: "winok", label: "Frame" }], pill: "Checked against the source", arrows: 1 },
  limits: { cards: [{ g: "check", label: "AI does well" }, { g: "warn", label: "You check" }], pill: "Know where the edges are", arrows: 0 },
  ios: { cards: [{ g: "doc", label: "Rules" }, { g: "shield", label: "Gates" }, { g: "phone", label: "SwiftUI" }], pill: "You approve every step", arrows: 1 },
};

const LABELS: Record<IllustrationKind, string> = {
  foundations: "Interviews become insights, then an information architecture",
  system: "One design system kept in sync between Figma and code, both ways",
  reference: "A proven reference layout is rebuilt around your brand",
  tokens: "Four inputs go into a plugin and a full set of design tokens comes out",
  tests: "Figma, the token files and the code are compared, and every check passes",
  agent: "A screenshot becomes a prompt with exact numbers, Figma's AI agent builds the frame, and it is checked against the source",
  limits: "What the AI does well, and the edges where a person has to check",
  ios: "A native iOS app set up with rules, gates and then SwiftUI code, with the designer approving each step",
  mvp: "An MVP sprint: benchmark, flows and a coded prototype in two weeks",
  motion: "Motion designed as keyframes and an easing curve, then implemented exactly as approved",
  code: "A design handed over as pull-request-ready UI code",
};

const delay = (d: number) => ({ "--d": `${d.toFixed(2)}s` }) as React.CSSProperties;

export function Illustration({ kind }: { kind: IllustrationKind }) {
  const { cards, pill, arrows, rise } = SPECS[kind];
  const n = cards.length;
  const cw = n === 3 ? 200 : 270;
  const gap = n === 3 ? 40 : 70;
  const x0 = (800 - (n * cw + (n - 1) * gap)) / 2;
  const ch = 214;
  const cy = 62;
  const scale = n === 3 ? 1.15 : 1.4;
  const pw = Math.min(700, pill.length * 17 + 90);
  return (
    <svg viewBox="0 0 800 450" role="img" aria-label={LABELS[kind]} style={{ display: "block", width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id="il-tile" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#e6f4fc" /><stop offset="100%" stopColor="#c9e5f6" /></linearGradient>
        <filter id="il-drop" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="10" stdDeviation="11" floodColor="#14335a" floodOpacity="0.16" /></filter>
      </defs>
      <rect width="800" height="450" fill="url(#il-tile)" />
      {cards.map((c, i) => {
        const lift = rise ? (n - 1 - i) * 30 : 0;
        const x = x0 + i * (cw + gap);
        const y = cy + lift;
        const h = ch - lift;
        const gs = scale * (rise ? 1 : 1);
        return (
          <g key={c.label}>
            <g className={s.pop} style={delay(0.1 + i * 0.22)}>
              <rect x={x} y={y} width={cw} height={h} rx="26" fill={WHITE} filter="url(#il-drop)" />
              <g className={s.float} style={delay(0.8 + i * 0.35)}>
                <g transform={`translate(${x + cw / 2 - 50 * gs} ${y + (h - 54) / 2 - 50 * gs + 6}) scale(${gs})`}><Pic g={c.g} /></g>
              </g>
              <text x={x + cw / 2} y={y + h - 26} textAnchor="middle" fill={INK} style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30 }}>{c.label}</text>
            </g>
            {c.badge && (
              <g className={s.tick} style={delay(0.9 + i * 0.25)}>
                <circle cx={x + cw - 14} cy={y + 14} r="26" fill={DEEP} stroke={WHITE} strokeWidth="6" />
                <path d={`M${x + cw - 26} ${y + 14}l9 9 18-20`} fill="none" stroke={WHITE} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
            {arrows > 0 && i < n - 1 && (
              <g>
                {Array.from({ length: arrows }).map((_, k) => {
                  const mx = x + cw + gap / 2;
                  const my = cy + ch / 2 + (arrows === 2 ? (k ? 20 : -20) : 0);
                  const dir = arrows === 2 && k ? -1 : 1;
                  return (
                    <g key={k} className={dir === 1 ? s.nudge : undefined} style={delay(0.5 + i * 0.22 + k * 0.1)}>
                      <path d={`M${mx - 7 * dir} ${my - 18}l${14 * dir} 18l${-14 * dir} 18`} fill="none" stroke={DEEP} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
                    </g>
                  );
                })}
              </g>
            )}
          </g>
        );
      })}
      <g className={s.rise} style={delay(0.9)}>
        <rect x={400 - pw / 2} y="318" width={pw} height="66" rx="33" fill={DEEP} />
        <text x="400" y="361" textAnchor="middle" fill={WHITE} style={{ fontFamily: FONT, fontWeight: 700, fontSize: 30 }}>{pill}</text>
      </g>
    </svg>
  );
}

