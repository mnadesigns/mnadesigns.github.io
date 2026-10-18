import type { IconName } from "@/components/atoms/LineIcon";
// Evidence links and extra media for the work details pages (/work/[slug]/). A button shows only when its link is filled in.
// `media`, when set, is the whole media list of the page (it replaces the slides and the images listed in storyPages.ts); a video is an mp4/webm in /public.
// type "slides" shows the animated slides of the work (WorkFilmBox); `count` plays only the first slides (1 = the first slide); its src is not used
// type "copy" is a block of live text (WorkCopy) in the flow of the media, built from `copy`
export type WorkCopy = { label: string; lead: string; body: string; meta: { l: string; v: string; icon?: IconName }[]; didLabel: string; did: string[]; didIcons?: IconName[] };
// type "story" is a chapter as live text on a dark panel (WorkStory), built from `story`
export type WorkStory = { tone?: "brand" | "plain"; cardOutside?: boolean; cardTone?: "brand"; title: string; quote?: string; statement?: { lead: string; strike: string; then: string; mark: string }; body: string; cardIntro: string; cardList: string[]; cardIcons?: IconName[]; bodyIcon?: IconName };
export type WorkMedia = { type: "image" | "video" | "slides" | "copy" | "story" | "carousel" | "scene"; src: string; alt: string; poster?: string; count?: number; copy?: WorkCopy; story?: WorkStory; slides?: { src: string; alt: string }[]; label?: string; scene?: "projects-delivered" };
export type WorkDetail = { figma?: string; live?: string; media?: WorkMedia[] };

// the QuodArca overview, from screens 2 and 3
const quodarcaOverview: WorkCopy = {
  label: "About",
  lead: "QuodArca is a privacy-first productivity platform",
  body: "It helps individuals and teams securely manage, sync, and share data across devices, without third-party cloud reliance. With end-to-end encryption, zero-knowledge architecture, and role-based access, users stay fully in control on desktop, mobile, or web.",
  meta: [
    { l: "Platform", v: "Desktop app, iOS and Android apps", icon: "monitor-smartphone" },
    { l: "Client", v: "EISST Ltd.", icon: "building" },
    { l: "Role", v: "Lead UX/UI Designer", icon: "pen-tool" },
    { l: "Tools", v: "Figma, Adobe Suite, Slack, Jira, Confluence, Zoom", icon: "wrench" },
  ],
  didLabel: "What I did",
  didIcons: ["workflow", "accessibility"],
  did: [
    "Designed onboarding, access control, and sync flows across devices.",
    "Improved accessibility, UI consistency, and user experience through a scalable design system and responsive components.",
  ],
};

// "Initial Thoughts", from screen 5
const quodarcaThoughts: WorkStory = {
  tone: "brand",
  cardOutside: true, // the role card stands on its own below the panel
  title: "Initial Thoughts",
  quote: "When I started working with QuodArca, the product was halfway done, partly functional, but far from cohesive.",
  body: "It had a strong foundation: a privacy-first productivity suite where users controlled their data, not some third-party server. But the experience felt disjointed. The design system was only partially defined, flows were inconsistent, accessibility was an afterthought, and new features were being layered on without a clear structure.",
  cardIntro: "My role as the Lead UX/UI Designer was to bring clarity to the chaos. I wasn't just designing screens, I was stitching together an entire ecosystem:",
  cardList: [
    "Desktop, web, and mobile apps",
    "Core flows like onboarding, syncing, and file management",
    "System tools like the authenticator app, PDF editor, and installer wizard",
    "A flexible design system that worked across all of it",
  ],
  cardIcons: ["monitor-smartphone", "route", "blocks", "layers"],
};

// "Strategy & Approach", from screen 8
const quodarcaStrategy: WorkStory = {
  tone: "plain", // no background: the copy sits on the page
  cardOutside: true,
  cardTone: "brand", // the approach card stands on its own below the panel, in the primary blue
  title: "Strategy & Approach",
  statement: { lead: "I didn't start by", strike: "designing screens", then: "I started by", mark: "asking questions" }, // the opening line, set as a headline with a strike-through and a highlight
  body: "What do users expect from a privacy-first app?\nWhat breaks their trust? What slows them down?\nAnd how can we design something technically advanced, but human-friendly?",
  cardIntro: "To fix the product experience, I needed to work at both ends: big-picture systems thinking and detail-level usability. My approach:",
  cardList: ["Audit First, Design Later", "Rebuild the Design System", "Align with Dev & QA", "Think Across Devices"],
  cardIcons: ["search", "blocks", "git-merge", "monitor-smartphone"],
  bodyIcon: "circle-help", // each line of the body is a question: one icon per line
};

// the design-system views, one carousel (screens from the UI kit)
const quodarcaViews = [
  { src: "/images/work/quodarca/details/ui-iconography.webp", alt: "QuodArca iconography" },
  { src: "/images/work/quodarca/details/ui-typography.webp", alt: "QuodArca typography on macOS and Windows" },
  { src: "/images/work/quodarca/details/ui-colors.webp", alt: "QuodArca color palette" },
  { src: "/images/work/quodarca/details/ui-resolutions.webp", alt: "QuodArca screen resolutions and the 4 point baseline grid" },
  { src: "/images/work/quodarca/details/ui-layout-grid.webp", alt: "QuodArca library layout with sidebar, gutter and margins" },
];

// the product views (screens 25 to 29), one carousel
const quodarcaProduct = [
  { src: "/images/work/quodarca/details/25.webp", alt: "Arca: organize your data with contextual links" },
  { src: "/images/work/quodarca/details/26.webp", alt: "Quod: modular blocks for structured data" },
  { src: "/images/work/quodarca/details/27.webp", alt: "Files: multimedia files and over 30 other file types" },
  { src: "/images/work/quodarca/details/28.webp", alt: "Users: roles, access control and data usage rules" },
  { src: "/images/work/quodarca/details/29.webp", alt: "Messages: end-to-end encrypted messaging for secure collaboration" },
];

// screens 1 to 34 in order: 1 is the slides film (all its slides), 9 to 12 are left out
const quodarcaInOrder: WorkMedia[] = Array.from({ length: 34 }, (_, i): WorkMedia | null => {
  if (i === 0) return { type: "slides", src: "slides", alt: "QuodArca slides" };
  if (i === 1) return { type: "copy", src: "copy", alt: "QuodArca overview", copy: quodarcaOverview };
  if (i === 2 || i === 3) return null; // screen 3 is in the overview, screen 4 (the cloud picture) is removed
  if (i === 4) return { type: "story", src: "story", alt: "QuodArca initial thoughts", story: quodarcaThoughts };
  if (i === 7) return { type: "story", src: "strategy", alt: "QuodArca strategy and approach", story: quodarcaStrategy };
  if (i === 8) return { type: "video", src: "/images/work/quodarca/details/strategy-plan.mp4", poster: "/images/work/quodarca/details/strategy-plan-poster.webp", alt: "QuodArca strategy plan" }; // right after the approach card
  if (i === 9) return { type: "carousel", src: "carousel", alt: "QuodArca design system views", slides: quodarcaViews, label: "Design system views" }; // right after the strategy plan video
  if (i === 32) return { type: "scene", src: "scene-projects-delivered", alt: "QuodArca projects delivered", scene: "projects-delivered" }; // the coded animation in place of screen 33
  if (i === 10) return { type: "video", src: "/images/work/quodarca/details/design-system.mp4", poster: "/images/work/quodarca/details/design-system-poster.webp", alt: "QuodArca design system in motion" }; // right after the design system carousel
  if (i === 31) return { type: "video", src: "/images/work/quodarca/details/marketing-website.mp4", poster: "/images/work/quodarca/details/marketing-website-poster.webp", alt: "QuodArca marketing website" }; // the film in place of screen 32
  if (i === 30) return { type: "video", src: "/images/work/quodarca/details/pdf-editor.mp4", poster: "/images/work/quodarca/details/pdf-editor-poster.webp", alt: "QuodArca PDF editor" }; // the reel in place of screen 31
  if (i === 24) return { type: "carousel", src: "carousel-product", alt: "QuodArca product views", label: "Product views", slides: quodarcaProduct }; // screens 25 to 29 in one carousel
  if ((i > 9 && i < 17) || i === 23 || (i > 24 && i < 29)) return null; // screens 11 to 17 and 24 are not used
  return { type: "image", src: `/images/work/quodarca/details/${String(i + 1).padStart(2, "0")}.webp`, alt: `QuodArca design, screen ${i + 1} of 34` };
}).filter((m): m is WorkMedia => m !== null);

// screen 20 is moved to sit right after the Key UX Challenges image (screen 7)
const quodarcaScreens: WorkMedia[] = (() => {
  const list = [...quodarcaInOrder];
  const from = list.findIndex((m) => m.src.endsWith("/20.webp"));
  const after = list.findIndex((m) => m.src.endsWith("/07.webp"));
  if (from < 0 || after < 0) return list;
  const [m20] = list.splice(from, 1);
  list.splice(after + 1, 0, m20);
  return list;
})();

export const workDetails: Record<string, WorkDetail> = {
  "sred-io": {},
  quodarca: {
    figma: "https://www.figma.com/design/bV0Ia7OeqXlFNlNggseg07/QuoadArca---Web-App?node-id=2-104650&t=5sQYp6ZsshnBPTk4-4",
    live: "https://eisst.com/en",
    media: quodarcaScreens,
  },
  "mlk-group": {},
};
