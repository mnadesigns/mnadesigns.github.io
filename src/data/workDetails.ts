import type { IconName } from "@/components/atoms/LineIcon";
// Evidence links and extra media for the work details pages (/work/[slug]/). A button shows only when its link is filled in.
// `media`, when set, is the whole media list of the page (it replaces the slides and the images listed in storyPages.ts); a video is an mp4/webm in /public.
// type "slides" shows the animated slides of the work (WorkFilmBox); `count` plays only the first slides (1 = the first slide); its src is not used
// type "copy" is a block of live text (WorkCopy) in the flow of the media, built from `copy`
export type WorkCopy = { label: string; lead: string; body: string; meta: { l: string; v: string; icon?: IconName }[]; didLabel: string; did: string[]; didIcons?: IconName[] };
// type "story" is a chapter as live text on a dark panel (WorkStory), built from `story`
export type WorkStory = { tone?: "brand" | "plain"; cardOutside?: boolean; cardTone?: "brand"; title: string; quote?: string; statement?: { lead: string; strike: string; then: string; mark: string }; body: string; cardIntro: string; cardList: string[]; cardIcons?: IconName[]; bodyIcon?: IconName };
// type "flow" is a product flow played like a screen recording (WorkFlow): per step the still, where the camera looks (cam: centre x and y in % of the picture, zoom) and what gets clicked (click: x and y in %)
export type WorkFlow = { title: string; note: string; ratio: number; steps: { src: string; alt: string; cap: string; cam: { x: number; y: number; z: number }; click?: { x: number; y: number }; tone?: "info" | "ok" | "error"; hold?: number }[] };
// the set pieces of WorkViews: type "intro" is an opening statement, "sitemap" where the screens sit in the product, "loop" the design to code steps
export type WorkIntro = { label: string; headline: string; rows: { l: string; v: string }[] }; // headline: **bold** marks the bold words
export type WorkSitemap = { title: string; note: string; root: string; logo?: string; groups: { name: string; designed?: boolean; items: { t: string; designed?: boolean }[] }[] };
export type WorkLoop = { title: string; note: string; steps: { t: string; d: string }[] };
export type WorkMedia = { type: "image" | "video" | "slides" | "copy" | "story" | "carousel" | "scene" | "flow" | "intro" | "sitemap" | "loop"; src: string; alt: string; note?: string; intro?: WorkIntro; sitemap?: WorkSitemap; loop?: WorkLoop; flow?: WorkFlow; poster?: string; count?: number; copy?: WorkCopy; story?: WorkStory; slides?: { src: string; alt: string }[]; label?: string; scene?: "projects-delivered" };
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
  if (i === 9) return { type: "carousel", src: "carousel", alt: "QuodArca design system views", slides: quodarcaViews, label: "Design system views", note: "The foundations of the UI kit: iconography, typography on macOS and Windows, colour, screen resolutions with the 4 point baseline grid, and the library layout." }; // right after the strategy plan video
  if (i === 32) return { type: "scene", src: "scene-projects-delivered", alt: "QuodArca projects delivered", scene: "projects-delivered" }; // the coded animation in place of screen 33
  if (i === 10) return { type: "video", src: "/images/work/quodarca/details/design-system.mp4", poster: "/images/work/quodarca/details/design-system-poster.webp", alt: "QuodArca design system in motion" }; // right after the design system carousel
  if (i === 31) return { type: "video", src: "/images/work/quodarca/details/marketing-website.mp4", poster: "/images/work/quodarca/details/marketing-website-poster.webp", alt: "QuodArca marketing website" }; // the film in place of screen 32
  if (i === 30) return { type: "video", src: "/images/work/quodarca/details/pdf-editor.mp4", poster: "/images/work/quodarca/details/pdf-editor-poster.webp", alt: "QuodArca PDF editor" }; // the reel in place of screen 31
  if (i === 24) return { type: "carousel", src: "carousel-product", alt: "QuodArca product views", label: "Product views", note: "Five areas of the product: Arca, Quod, Files, Users and Messages.", slides: quodarcaProduct }; // screens 25 to 29 in one carousel
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

// SRED.io. The screens are made by scripts/case-study-images.mjs (key-position.webp); `sredioShots` turns one key into slides, `sredioFlow` into the steps of a flow.
// Claims still needing proof (no before screens or data in hand): the 70% shorter pages (before/after pair exists only for File Vaults and Timesheets), "nothing was removed", engineers "reuse components".
const sredioShots = (key: string, alts: string[]) => alts.map((alt, i) => ({ src: `/images/work/sredio/details/${key}-${i + 1}.webp`, alt }));
const sredioFlow = (key: string, steps: Omit<WorkFlow["steps"][number], "src">[]) => steps.map((s, i) => ({ ...s, src: `/images/work/sredio/details/${key}-${i + 1}.webp` }));

const sredioOverview: WorkCopy = {
  label: "About",
  lead: "A tax-credit platform that had never been designed",
  body: "I joined as Lead Product Designer in July 2026. Every screen was a one-off and the pages ran on and on, so the first job was a system, then the services on top of it.",
  meta: [
    { l: "Platform", v: "Web app (SaaS)", icon: "monitor-smartphone" },
    { l: "Client", v: "SRED.io, Toronto", icon: "building" },
    { l: "Role", v: "Lead Product Designer", icon: "pen-tool" },
    { l: "Tools", v: "Figma, Flowbite, Claude Code, Cursor", icon: "wrench" },
  ],
  didLabel: "What I did",
  didIcons: ["blocks", "layers", "route", "workflow"],
  did: [
    "Set up the platform's first design system on top of Flowbite, so engineers reuse components instead of rebuilding them.",
    "Cut the core pages by 70% by reworking the layout. Nothing was removed.",
    "Designed 100+ screens across 17+ microservices. Three of them are below.",
    "I manage a front-end developer. Designs go to code through Claude Code in Cursor, linked to Figma.",
  ],
};

const sredioScreens: WorkMedia[] = [
  { type: "slides", src: "slides", alt: "SRED.io slides" },
  { type: "intro", src: "intro", alt: "What is SRED.io", intro: {
    label: "What is SRED.io?",
    headline: "SRED.io is a **platform** that helps Canadian companies **claim R&D tax credits** from the work their teams already track in Jira, GitHub and Azure DevOps.",
    rows: [
      { l: "Industry", v: "SaaS, SR&ED tax credits" },
      { l: "Location", v: "Toronto, Canada (remote)" },
      { l: "Team", v: "Lead Product Designer, front-end developer" },
    ],
  } },
  { type: "copy", src: "copy", alt: "SRED.io overview", copy: sredioOverview },
  { type: "image", src: "/images/work/sredio/design-system.webp", alt: "The SRED.io design system: components built on Flowbite" },
  { type: "flow", src: "flow-vault", alt: "SRED.io: create a vault", flow: {
    title: "File vaults", ratio: 3126 / 1724,
    note: "Only a Vault Admin can create a vault, and SRED.io staff only get view access. So the panel asks for a name, a manager, then who can view or edit.",
    steps: sredioFlow("vault-create", [
      { alt: "Create Vault panel, empty", cap: "Name it", cam: { x: 88, y: 30, z: 1.4 }, click: { x: 89, y: 13 } },
      { alt: "Choosing a vault manager from a searchable list", cap: "Pick a manager", cam: { x: 88, y: 50, z: 1.4 }, click: { x: 91, y: 63 } },
      { alt: "Selecting users who get access", cap: "Pick who gets access", cam: { x: 88, y: 60, z: 1.4 }, click: { x: 97, y: 68 } },
      { alt: "Choosing viewer or editor for the selected users", cap: "Viewer or editor", cam: { x: 88, y: 50, z: 1.4 }, click: { x: 86, y: 60 } },
      { alt: "The chosen viewers listed before creating", cap: "Check the list", cam: { x: 88, y: 70, z: 1.4 }, click: { x: 95, y: 95 } },
      { alt: "The new vault, with a confirmation message", cap: "Done", cam: { x: 55, y: 55, z: 1 } },
    ]),
  } },
  { type: "sitemap", src: "sitemap", alt: "Where the screens sit in SRED.io", sitemap: {
    title: "Where these screens sit",
    note: "A slice of the platform's navigation. The filled items are the screens shown on this page.",
    root: "SRED.io",
    logo: "/images/brands/sredio.png",
    groups: [
      { name: "Dashboards", items: [{ t: "Main Dashboard" }, { t: "Financial Dashboard" }, { t: "Claim History Dashboard" }] },
      { name: "Timesheets", designed: true, items: [{ t: "Weekly hours", designed: true }, { t: "Update a week", designed: true }, { t: "Export to CSV", designed: true }, { t: "Sync status", designed: true }] },
      { name: "User Management", items: [{ t: "Staff & Teams", designed: true }, { t: "Access & Permissions" }, { t: "Staff Integration Matrix" }, { t: "Login History" }] },
      { name: "File Portal Administration", designed: true, items: [{ t: "Create a vault", designed: true }, { t: "Internal view", designed: true }, { t: "External view", designed: true }] },
      { name: "More", items: [{ t: "Projects" }, { t: "Performance Platform" }, { t: "Data Tools" }, { t: "Cost Schedule" }] },
    ],
  } },
  { type: "carousel", src: "carousel-staff-interface", alt: "SRED.io Staff & Teams", label: "Staff & Teams: the interface", note: "The staff list with its filters and actions, the fiscal period switcher, and the full columns view with country, account mappings and rules.", slides: sredioShots("staff-interface", [
    "Staff & Teams: the staff list with filters and actions",
    "Switching the fiscal period",
    "The account menu",
    "Full columns view of the staff table",
    "Columns for country, account mappings and rules",
  ]) },
  { type: "flow", src: "flow-bulk", alt: "SRED.io: bulk staff actions", flow: {
    title: "Staff & Teams: bulk actions", ratio: 3126 / 2052,
    note: "Tick a few people and a bar appears at the bottom. Move them to a team, set a date, switch the weekly emails or mark them as contractors, all in one go.",
    steps: sredioFlow("staff-bulk", [
      { alt: "Move selected staff to a team", cap: "Move to a team", cam: { x: 52, y: 78, z: 1.4 }, click: { x: 57, y: 89 } },
      { alt: "Pick a hire date for the selected staff", cap: "Set a hire date", cam: { x: 58, y: 75, z: 1.4 }, click: { x: 62, y: 89 } },
      { alt: "Confirm weekly reporting emails for the selected staff", cap: "Weekly emails", cam: { x: 50, y: 50, z: 1.4 }, click: { x: 36, y: 62 } },
      { alt: "Set the selected staff as contractors", cap: "Contractors", cam: { x: 50, y: 50, z: 1.4 }, click: { x: 38, y: 69 } },
    ]),
  } },
  { type: "carousel", src: "carousel-timesheets", alt: "SRED.io timesheets", label: "Timesheets: the views", note: "Weekly hours for each person, the client and customer views, and updating a single week.", slides: sredioShots("timesheets", [
    "Timesheets: staff list and weekly hours",
    "Timesheets, client view",
    "Timesheets, customer view",
    "Updating a specific week",
    "Updating a specific week, next step",
  ]) },
  { type: "flow", src: "flow-sync", alt: "SRED.io: timesheet export and sync", flow: {
    title: "Timesheets: sync and export", ratio: 3126 / 2052,
    note: "Timesheets sync in the background. The line under the title shows the progress, then Success or Failed, and the last good data stays on screen either way.",
    steps: sredioFlow("timesheets-states", [
      { alt: "Export timesheets to CSV dialog", cap: "Export to CSV", cam: { x: 50, y: 50, z: 1.4 } },
      { alt: "Sync in progress, with the percentage in the status line", cap: "Syncing", tone: "info", cam: { x: 38, y: 22, z: 1.4 } },
      { alt: "Synced successfully, with the number of timesheets updated", cap: "Synced successfully", tone: "ok", cam: { x: 38, y: 22, z: 1.4 } },
      { alt: "Sync failed, with the last good data still showing", cap: "Sync failed", tone: "error", cam: { x: 38, y: 22, z: 1.4 } },
    ]),
  } },
  { type: "loop", src: "loop", alt: "SRED.io design to code", loop: {
    title: "Design to code",
    note: "I manage a front-end developer. Claude Code in Cursor is connected to Figma, so a designed screen becomes production code without a rebuild.",
    steps: [
      { t: "Figma", d: "Screens built from the shared Flowbite components." },
      { t: "Claude Code in Cursor", d: "Reads the Figma file and writes the screen in code." },
      { t: "Production", d: "The front-end developer and I ship it on the same components." },
    ],
  } },
];

export const workDetails: Record<string, WorkDetail> = {
  "sred-io": { live: "https://sred.io/", media: sredioScreens },
  quodarca: {
    figma: "https://www.figma.com/design/bV0Ia7OeqXlFNlNggseg07/QuoadArca---Web-App?node-id=2-104650&t=5sQYp6ZsshnBPTk4-4",
    live: "https://eisst.com/en",
    media: quodarcaScreens,
  },
  "mlk-group": {},
};
