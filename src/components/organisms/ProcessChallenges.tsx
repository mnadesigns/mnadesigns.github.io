"use client";

import { Scene, type SceneProps } from "./QuodarcaScenes";
import styles from "./ProcessChallenges.module.css";

const A = "/images/work/quodarca/process";

/* eslint-disable @next/next/no-img-element */

// The fifteen bubbles of "The Process". Every number is from the Figma file (1920 x 1080 frame):
// wrap = the bubble group's box; ring = the circle artwork (its box, rotation and inner size); text = the label (centre x, top, box, rotation, text width/size/line height).
type Bubble = {
  d: number; // seconds: when it pops in
  wrap: [number, number, number, number]; // left, top, width, height
  ring: { img: string; x: number; y: number; size: number; rot?: number; inner?: number };
  text: { cx: number; top: number; w: number; h?: number; rot?: number; tw?: number; fs: number; lh: string; lines: string[] };
};
const BUBBLES: Bubble[] = [
  { d: 1.26, wrap: [1162.83, 702.97, 273.463, 223.451], ring: { img: "e10", x: 1194.49, y: 707, size: 207.204, rot: 7.49, inner: 184.7 }, text: { cx: 1299.32, top: 733.8, w: 246.234, h: 165.498, rot: -15, tw: 225.178, fs: 29.169, lh: "normal", lines: ["Annotated Design", "Handoff"] } },
  { d: 1.29, wrap: [1318.69, 862.44, 197, 197], ring: { img: "e9", x: 1318.69, y: 862.44, size: 197 }, text: { cx: 1418.05, top: 913.65, w: 168.877, fs: 22.011, lh: "28.9px", lines: ["Scalable Design System Documentation"] } },
  { d: 1.32, wrap: [1448.41, 730.5, 210.863, 199.208], ring: { img: "e11", x: 1452.25, y: 731, size: 197.444, rot: 7.49, inner: 176 }, text: { cx: 1553.56, top: 788.12, w: 196.262, h: 88.164, rot: 7.49, tw: 189.535, fs: 26.682, lh: "31.71px", lines: ["QA+Design Reviews"] } },
  { d: 1.32, wrap: [1480.45, 887.39, 212.409, 196.14], ring: { img: "e12", x: 1492.24, y: 892.99, size: 186.018, rot: -20.98, inner: 144 }, text: { cx: 1588.3, top: 924.35, w: 187.34, h: 130.783, rot: -20.98, tw: 172.265, fs: 26.101, lh: "36.541px", lines: ["Iteration Sprints"] } },
  { d: 0.96, wrap: [355.49, 846, 229.88, 229.88], ring: { img: "e9", x: 355.49, y: 846, size: 229.88, rot: 10.6, inner: 197 }, text: { cx: 470.36, top: 903.43, w: 203.15, h: 115.8, rot: 10.6, tw: 191.33, fs: 28.989, lh: "40.585px", lines: ["Goals & Objectives"] } },
  { d: 1.02, wrap: [505.49, 731, 197.444, 197.444], ring: { img: "e11", x: 505.49, y: 731, size: 197.444, rot: 7.49, inner: 176 }, text: { cx: 604.25, top: 778.91, w: 163.632, h: 103.36, rot: 7.49, tw: 153.995, fs: 23.333, lh: "27.7px", lines: ["Research: Stakeholder + Market"] } },
  { d: 0.9, wrap: [248, 798, 171.747, 172.534], ring: { img: "e13", x: 251.78, y: 803.3, size: 163.115, rot: -47.5, inner: 115.449 }, text: { cx: 332.89, top: 817.52, w: 127.181, h: 131.693, rot: -47.5, tw: 128.225, fs: 19.428, lh: "27.199px", lines: ["Problem Statement"] } },
  { d: 1.08, wrap: [723.87, 875.38, 190.687, 190.687], ring: { img: "e11", x: 723.87, y: 875.38, size: 190.687, rot: -5.01, inner: 176 }, text: { cx: 818.71, top: 922.58, w: 164.149, h: 100.382, rot: -5.01, tw: 157.156, fs: 24.38, lh: "29px", lines: ["Accessibility Pass", "(WCAG AA)"] } },
  { d: 1.2, wrap: [987.49, 762.37, 207.204, 207.204], ring: { img: "e14", x: 987.49, y: 762.37, size: 207.204, rot: 7.49, inner: 184.7 }, text: { cx: 1094.3, top: 823.41, w: 162.849, h: 91.565, rot: 7.49, tw: 154.784, fs: 28.05, lh: "normal", lines: ["Mid to Hi-Fi Screens"] } },
  { d: 1.23, wrap: [1065.49, 957, 103, 103], ring: { img: "e15", x: 1065.49, y: 957, size: 103 }, text: { cx: 1117.49, top: 993.8, w: 88, fs: 17.564, lh: "24.589px", lines: ["Prototype"] } },
  { d: 1.05, wrap: [716.92, 769.04, 136.926, 125.537], ring: { img: "e16", x: 723.78, y: 770, size: 123.554, rot: -8.43, inner: 108.775 }, text: { cx: 785.57, top: 799.31, w: 128.305, h: 67.398, rot: -8.43, tw: 122.294, fs: 18.733, lh: "25px", lines: ["Usability Checks"] } },
  { d: 1.11, wrap: [810.97, 727.48, 218.982, 218.982], ring: { img: "e17", x: 810.97, y: 727.48, size: 218.982, rot: -58.81, inner: 159.456 }, text: { cx: 920.71, top: 782, w: 90.436, h: 112.692, rot: -58.81, tw: 106.911, fs: 26.04, lh: "40.662px", lines: ["Ideation"] } },
  { d: 0.93, wrap: [257.75, 941.26, 119.226, 119.226], ring: { img: "e18", x: 257.75, y: 941.26, size: 119.226 }, text: { cx: 317.36, top: 984, w: 126.249, fs: 25.042, lh: "35.059px", lines: ["Kick-Off"] } },
  { d: 0.99, wrap: [500.03, 876.28, 275.021, 220.156], ring: { img: "e19", x: 545.48, y: 892.99, size: 186.018, rot: -20.98, inner: 144 }, text: { cx: 636.88, top: 903.96, w: 252.46, h: 161.334, rot: -20.98, tw: 239.325, fs: 36.261, lh: "40.116px", lines: ["UX", "Audit"] } },
  { d: 1.17, wrap: [884.88, 892.99, 186.018, 186.018], ring: { img: "e12", x: 884.88, y: 892.99, size: 186.018, rot: -20.98, inner: 144 }, text: { cx: 977.12, top: 935.89, w: 143.232, h: 99.531, rot: -20.98, tw: 131.927, fs: 19.989, lh: "27.985px", lines: ["Responsive Components"] } },
];

// the three columns
const COLS = [
  { cls: styles.col1, name: "Define", bg: "#5a89e8", left: 257.49, w: 453, nameLeft: 302.49, textLeft: 305.49, fs: 23, text: "Understanding the problem, users, context, and defining goals." },
  { cls: styles.col2, name: "Design", bg: "#845ae8", left: 730.49, w: 454, nameLeft: 775.49, textLeft: 778.49, fs: 24, text: "Generating, iterating, and validating design solutions." },
  { cls: styles.col3, name: "Deliver", bg: "#a35ae8", left: 1204.49, w: 453, nameLeft: 1249.49, textLeft: 1252.49, fs: 24, text: "Finalizing the product, handoff, validation, and reflection." },
];

// the five sticky notes of "Key UX Challenges"
const NOTES = [
  { d: 5.8, left: 761, top: 79, paper: "note-a", head: ["Disjointed", "Onboarding Flows:"], hs: 31, body: "Setup varied between desktop and mobile. Users were asked to make decisions (like device linking or sync modes) without enough context." },
  { d: 5.92, left: 1193, top: 79, paper: "note-b", head: ["Missing Documentation:"], hs: 28, body: "Developer handoffs lacked structure. Screens often missed annotations, leaving devs to guess expected behaviors." },
  { d: 6.04, left: 328, top: 556, paper: "note-a", head: ["Unaligned Cross- Platform Experience:"], hs: 31, body: "The same actions looked and felt different across Mac, iOS, and Android. No shared logic or reusable components existed." },
  { d: 6.16, left: 761, top: 556, paper: "note-c", head: ["Accessibility Gaps:"], hs: 31, body: "Buttons lacked focus states, and font/contrast didn’t meet WCAG AA. Tools like the PDF editor and Authenticator were difficult for screen readers or keyboard users." },
  { d: 6.28, left: 1189, top: 556, paper: "note-a", head: ["Incomplete", "Design System:"], hs: 31, body: "Components weren’t responsive, with inconsistent typography, spacing, and color contrast that didn’t meet accessibility standards." },
];

function BubbleView({ b }: { b: Bubble }) {
  const [wx, wy, ww, wh] = b.wrap;
  const { ring: r, text: t } = b;
  return (
    <div className={styles.bubble} style={{ left: wx, top: wy, width: ww, height: wh, "--d": `${b.d}s` } as React.CSSProperties}>
      <div className={styles.ebox} style={{ left: r.x - wx, top: r.y - wy, width: r.size, height: r.size }}>
        {r.rot !== undefined ? (
          <div className={styles.eturn} style={{ transform: `rotate(${r.rot}deg)` }}>
            <div className={styles.einner} style={{ width: r.inner, height: r.inner }}><img alt="" src={`${A}/${r.img}.svg`} /></div>
          </div>
        ) : (
          <div className={styles.eplain} style={{ position: "relative", width: r.size, height: r.size }}><img alt="" src={`${A}/${r.img}.svg`} /></div>
        )}
      </div>
      <div className={styles.tbox} style={{ left: t.cx - t.w / 2 - wx, top: t.top - wy, width: t.w, height: t.h }}>
        <div className={styles.tturn} style={t.rot !== undefined ? { transform: `rotate(${t.rot}deg)` } : undefined}>
          <p className={styles.tt} style={{ width: t.tw ?? t.w, fontSize: t.fs * 0.96, lineHeight: 1.12 }}>
            {t.lines.map((l, i) => <span key={l}>{i > 0 && <br />}{l}</span>)}
          </p>
        </div>
      </div>
    </div>
  );
}

// "Process & UX Challenges": the QuodArca framework (Define, Design, Deliver) and then the five UX problems found in the audit (Figma frame 72:8516).
export function ProcessChallenges(props: SceneProps) {
  return (
    <Scene {...props} focus={[0.4, 0.5]} bars="#ffffff" stage="white">
      <div className={styles.groupA}>
        <p className={`${styles.t} ${styles.processTitle}`}>The<br />Process</p>
        <div className={styles.rocket}><img alt="" src={`${A}/rocket.png`} /></div>
        <div className={styles.lower}>
        {COLS.map((c) => (
          <div key={c.name}>
            <div className={`${styles.card} ${c.cls}`} style={{ left: c.left, width: c.w, background: c.bg }} />
            <p className={`${styles.cardName} ${c.cls}`} style={{ left: c.nameLeft }}>{c.name}</p>
            <p className={`${styles.cardText} ${c.cls}`} style={{ left: c.textLeft, fontSize: c.fs }}>{c.text}</p>
          </div>
        ))}
        {BUBBLES.map((b) => <BubbleView key={`${b.ring.x}-${b.ring.y}`} b={b} />)}
        </div>
        <div className={styles.intro}>
          <div className={styles.introPop}>
            <div className={styles.introBg} />
            <div className={styles.introBar} />
            <p className={styles.introText}>A practical, user-centered framework I used to turn a fragmented product into a scalable, consistent, and accessible experience — across web, desktop, and mobile.</p>
          </div>
        </div>
      </div>
      <div className={styles.groupB}>
        <p className={`${styles.t} ${styles.challengeTitle}`} style={{ top: 111.61 }}>Key UX</p>
        <div className={styles.siren}><img alt="" src={`${A}/siren.svg`} /></div>
        <p className={`${styles.t} ${styles.challengeTitle}`} style={{ top: 204.19 }}>Challenges</p>
        <p className={styles.lead}>QuodArca had big ambitions — but a fragmented UX. Here’s what uncovered in my initial audit:</p>
        {NOTES.map((n) => (
          <div key={n.left + "-" + n.top} className={styles.note} style={{ left: n.left, top: n.top, "--d": `${n.d}s` } as React.CSSProperties}>
            <div className={styles.shadow}><img alt="" src={`${A}/shadow.svg`} /></div>
            <div className={styles.paper}><img alt="" src={`${A}/${n.paper}.svg`} /></div>
            <div className={styles.noteText}>
              <h3 style={{ fontSize: n.hs * 1.18 }}>{n.head.map((l, i) => <span key={l}>{i > 0 && <br />}{l}</span>)}</h3>
              <p>{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </Scene>
  );
}
