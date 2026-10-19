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
export type WorkIntro = { label: string; headline: string; body?: string; rows: { l: string; v: string }[]; didLabel?: string; did?: string[] }; // headline: **bold** marks the bold words
export type WorkSitemap = { title: string; note: string; root: string; logo?: string; groups: { name: string; designed?: boolean; items: { t: string; designed?: boolean }[] }[] };
export type WorkLoop = { title: string; note: string; steps: { t: string; d: string }[] };
// "chapter" a chapter of the story as big type, "pairs" challenge and solution rows with a screen detail, "annotated" one screen with numbered markers (x and y in % of the screen)
export type WorkChapter = { tone: "dark" | "light"; eyebrow: string; title: string; body: string[]; steps?: { t: string; d: string }[] };
export type WorkPairs = { title: string; note: string; pairs: { challenge: string; solution: string; src: string; alt: string; wide?: boolean }[] }; // wide: the copy runs in two columns and the whole screen sits below it
export type WorkAnnotated = { title: string; note: string; src: string; alt: string; ratio: number; marks: { x: number; y: number; t: string; d: string }[] };
// "pan" a wide picture that drifts as the page scrolls
export type WorkPan = { src: string; alt: string; ratio: number };
// "compare" two screens side by side
export type WorkCompare = { title: string; note: string; shots: { src: string; alt: string; label: string }[] };
export type WorkMedia = { type: "image" | "video" | "slides" | "copy" | "story" | "carousel" | "scene" | "flow" | "intro" | "sitemap" | "loop" | "chapter" | "pairs" | "annotated" | "pan" | "compare"; src: string; alt: string; note?: string; top?: boolean; chapter?: WorkChapter; pairs?: WorkPairs; ann?: WorkAnnotated; pan?: WorkPan; compare?: WorkCompare; intro?: WorkIntro; sitemap?: WorkSitemap; loop?: WorkLoop; flow?: WorkFlow; poster?: string; count?: number; copy?: WorkCopy; story?: WorkStory; slides?: { src: string; alt: string }[]; label?: string; scene?: "projects-delivered" };
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

const sredioScreens: WorkMedia[] = [
  { type: "slides", src: "slides", alt: "SRED.io slides" },
  { type: "intro", src: "intro", alt: "About SRED.io", intro: {
    label: "About SRED.io",
    headline: "SRED.io is a **platform** that helps Canadian companies **claim R&D tax credits** from the work their teams already track in Jira, GitHub and Azure DevOps.",
    body: "I joined as Lead Product Designer in July 2026. Every screen was a one-off and the pages ran on and on, so the first job was a system, then the services on top of it.",
    rows: [
      { l: "Industry", v: "SaaS, SR&ED tax credits" },
      { l: "Location", v: "Toronto, Canada (remote)" },
      { l: "Role", v: "Lead Product Designer" },
      { l: "Team", v: "Me and a front-end developer I manage" },
      { l: "Tools", v: "Figma, Flowbite, Claude Code, Cursor" },
    ],
    didLabel: "What I did",
    did: [
      "Set up the platform's first design system on top of Flowbite, so engineers reuse components instead of rebuilding them.",
      "Cut the core pages by 70% by reworking the layout. Nothing was removed.",
      "Designed 100+ screens across 17+ microservices. Three of them are below.",
      "Took designs to production code with Claude Code in Cursor, linked to Figma.",
    ],
  } },
  { type: "pan", src: "pan-angled", alt: "SRED.io screens from the three services set at an angle", pan: { src: "/images/work/sredio/details/angled.webp", alt: "SRED.io screens from the three services set at an angle", ratio: 2000 / 1125 } },
  { type: "chapter", src: "problem", alt: "The problem", chapter: {
    tone: "dark",
    eyebrow: "The problem",
    title: "Built fast, never designed",
    body: [
      "SRED.io grew function first. Pages ran long and made people scroll, every screen was a one-off, and the services shared no rules.",
      "The platform needed a foundation before it needed more screens: one system every service could share.",
    ],
  } },
  { type: "chapter", src: "strategy", alt: "The strategy", chapter: {
    tone: "light",
    eyebrow: "The strategy",
    title: "A system first, then the services",
    body: ["Fixing screens one at a time would have kept the one-offs. So the order was the system, then the layouts, then the services, with the developer in the loop."],
    steps: [
      { t: "Build the system", d: "The platform's first design system, on top of Flowbite: one set of components for every service." },
      { t: "Shorten the pages", d: "Reworked the layouts on the new components. Core pages came out 70% shorter, with the content kept." },
      { t: "Design the services", d: "17+ microservices and 100+ screens so far, all from the same components." },
      { t: "Ship with the developer", d: "Designs go to code through Claude Code in Cursor, linked to Figma, built with the front-end developer I manage." },
    ],
  } },
  { type: "image", src: "/images/work/sredio/design-system.webp", alt: "The SRED.io design system: components built on Flowbite" },
  { type: "pairs", src: "pairs", alt: "Challenges and solutions", pairs: {
    title: "Three problems, and how the screens solve them",
    note: "Each one shown with the part of the design that handles it.",
    pairs: [
      { challenge: "People arrive from several integrations", solution: "Each integration gets its own import: bring in only the staff you ticked, or everyone from that source. Whatever the source, the people end up in one list.", src: "/images/work/sredio/details/pair-import.webp", alt: "The Import Staff from Integrations menu" },
      { challenge: "Pages that scrolled on and on", solution: "I rebuilt the layout on the design system. The vault list and its files now share one screen, and the core pages came out 70% shorter with nothing removed.", src: "/images/work/sredio/details/pair-shorter.webp", alt: "File Portal Administration: the vault list and the files of a vault on one screen", wide: true },
      { challenge: "A setting that adds people on its own", solution: "Switching it on or off is a deliberate step. The modal says what it does, shows how many active staff are in weekly reporting, and waits for a Continue before anything changes.", src: "/images/work/sredio/details/pair-sync.webp", alt: "The Staff Sync & Reporting modal asking to confirm disabling the automatic staff creation" },
    ],
  } },
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
  { type: "compare", src: "compare", alt: "The same vault for staff and for clients", compare: {
    title: "One vault, two views",
    note: "SRED.io staff and the client's own users open the same vault, each in the navigation that fits them.",
    shots: [
      { src: "/images/work/sredio/details/vault-compare-1.webp", alt: "A vault as an internal user sees it", label: "Internal user view" },
      { src: "/images/work/sredio/details/vault-compare-2.webp", alt: "The same vault as an external user sees it", label: "External user view" },
    ],
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
  { type: "annotated", src: "ann-staff", alt: "Staff & Teams, annotated", ann: {
    title: "Staff & Teams: the list",
    note: "One list for everyone on the claim. Four things to notice.",
    src: "/images/work/sredio/details/staff-interface-1.webp", alt: "The Staff & Teams list", ratio: 3126 / 2052,
    marks: [
      { x: 69.5, y: 3, t: "Fiscal period", d: "The period sits in the header of every screen." },
      { x: 52, y: 17, t: "Filters and actions", d: "Search, filter, and an Actions menu for the teams." },
      { x: 72.5, y: 22.6, t: "Three groups", d: "Staff and two excluded groups, each with a count." },
      { x: 93, y: 17, t: "Merge accounts", d: "Duplicates merge from one link at the top right." },
    ],
  } },
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
  { type: "flow", src: "flow-merge", alt: "SRED.io: merge staff accounts", flow: {
    title: "Staff & Teams: merge accounts", ratio: 3126 / 2052,
    note: "Duplicate people merge into one account. Pick the users, check them against the destination user, and confirm. Their timesheets move with them.",
    steps: sredioFlow("staff-merge", [
      { alt: "Merge Staff Accounts, with the list of users to merge and the destination user", cap: "Pick the users", cam: { x: 35, y: 38, z: 1.4 }, click: { x: 21.5, y: 27 } },
      { alt: "Four users selected, with a compare table for each side", cap: "Check the compare tables", cam: { x: 70, y: 70, z: 1.4 }, click: { x: 95, y: 94 } },
      { alt: "The Merge Users confirmation listing the users and the destination user", cap: "Confirm the merge", cam: { x: 50, y: 50, z: 1.4 }, click: { x: 40, y: 76 } },
      { alt: "The merge finished, with a Merged successfully message", cap: "Merged", tone: "ok", cam: { x: 60, y: 70, z: 1.4 } },
    ]),
  } },
  { type: "annotated", src: "ann-time", alt: "Timesheets, annotated", ann: {
    title: "Timesheets: weekly hours",
    note: "Hours for each person, week by week. Four things to notice.",
    src: "/images/work/sredio/details/timesheets-1.webp", alt: "The Timesheets screen", ratio: 3126 / 2052,
    marks: [
      { x: 37.5, y: 11.2, t: "Last synced", d: "When the data last synced always sits under the title." },
      { x: 95, y: 9.5, t: "Export CSV", d: "One button exports the fiscal period to CSV." },
      { x: 42, y: 16, t: "Included and excluded", d: "Two tabs with counts: 387 included, 100 excluded." },
      { x: 60.5, y: 57, t: "Status on every week", d: "Confirmed - System, Unconfirmed - System or Confirmed - Manual." },
    ],
  } },
  { type: "flow", src: "flow-sync", alt: "SRED.io: timesheet export and sync", flow: {
    title: "Timesheets: sync and export", ratio: 3126 / 2052,
    note: "Timesheets sync in the background. The line under the title shows the progress, then Success or Failed, and the last good data stays on screen either way.",
    steps: sredioFlow("timesheets-states", [
      { alt: "Export timesheets to CSV dialog", cap: "Export to CSV", cam: { x: 50, y: 50, z: 1.4 } },
      { alt: "Sync in progress, with the percentage in the status line", cap: "Syncing", tone: "info", cam: { x: 30, y: 22, z: 1.4 } },
      { alt: "Synced successfully, with the number of timesheets updated", cap: "Synced successfully", tone: "ok", cam: { x: 30, y: 22, z: 1.4 } },
      { alt: "Sync failed, with the last good data still showing", cap: "Sync failed", tone: "error", cam: { x: 30, y: 22, z: 1.4 } },
    ]),
  } },
  { type: "annotated", src: "ann-feedback", alt: "Feedback form, annotated", ann: {
    title: "Feedback",
    note: "A short form, opened from the Feedback button in the sidebar, that asks how the platform is working.",
    src: "/images/work/sredio/details/feedback-1.webp", alt: "The Feedback form: a five face rating and a list of what is working well", ratio: 3126 / 1796,
    marks: [
      { x: 35, y: 29, t: "Rate in one tap", d: "Five faces, from angry to in love, so a rating takes one tap." },
      { x: 31.5, y: 38.7, t: "A follow up that fits", d: "The next question answers the rating given. Here, a happy face gets: Glad to hear it. What is working well?" },
      { x: 35, y: 49.5, t: "Answers in plain words", d: "Six short reasons to tick, with Other for anything else." },
      { x: 30, y: 82.2, t: "Support one line away", d: "Go Back, Submit and a support email sit on the same screen." },
    ],
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
  "sred-io": { figma: "https://www.figma.com/design/kF3kIgL9u0AMO5M6SngsmE/Sredio---Platform?node-id=0-1&t=E37gAyxdjLa0CCFW-1", live: "https://sred.io/", media: sredioScreens },
  quodarca: {
    figma: "https://www.figma.com/design/bV0Ia7OeqXlFNlNggseg07/QuoadArca---Web-App?node-id=2-104650&t=5sQYp6ZsshnBPTk4-4",
    live: "https://eisst.com/en",
    media: quodarcaScreens,
  },
  "mlk-group": {},
};
