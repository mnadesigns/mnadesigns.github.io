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
export type WorkIntro = { label: string; headline: string; body?: string; rows: { l: string; v?: string; tools?: { id: "figma" | "flowbite" | "claude" | "cursor"; name: string }[] }[]; didLabel?: string; did?: string[] }; // headline: **bold** marks the bold words; a row with tools shows logo tiles instead of text
export type WorkSitemap = { title: string; note: string; root: string; logo?: string; groups: { name: string; designed?: boolean; items: { t: string; designed?: boolean }[] }[] };
export type WorkLoop = { title: string; note: string; steps: { t: string; d: string }[] };
// "chapter" a chapter of the story as big type, "pairs" challenge and solution rows with a screen detail, "annotated" one screen with numbered markers (x and y in % of the screen)
export type WorkChapter = { tone: "dark" | "light"; eyebrow: string; title: string; body: string[]; steps?: { t: string; d: string }[] };
export type WorkPairs = { title: string; note: string; pairs: { challenge: string; solution: string; src: string; alt: string; wide?: boolean }[] }; // wide: the copy runs in two columns and the whole screen sits below it
export type WorkAnnotated = { title: string; note: string; src: string; alt: string; ratio: number; marks: { x: number; y: number; t: string; d: string }[] };
// "pan" a wide picture that drifts as the page scrolls
export type WorkPan = { src: string; alt: string; ratio: number };
// "beforeafter" the old screen and the new one in a wipe slider
export type WorkBeforeAfter = { scrub?: boolean; title?: string; note?: string; ratio: number; before: { src: string; alt: string }; after: { src: string; alt: string } };
// "band" a band in the brand's colour, its name sliding sideways, three redesign changes (old to new) under it as the page scrolls (WorkBand); "collage" a collage that grows in and zooms slowly
// "figures" challenge and solution rows led by one big figure each, text only
export type WorkFigures = { eyebrow: string; title: string; rows: { fig: string; unit: string; challenge: string; solution: string }[] };
export type WorkBand = { name: string; bg: string; changes: { from: string; to: string }[] };
export type WorkMedia = { type: "image" | "video" | "slides" | "copy" | "story" | "carousel" | "scene" | "flow" | "intro" | "sitemap" | "loop" | "chapter" | "pairs" | "annotated" | "pan" | "beforeafter" | "reel" | "portal" | "motion" | "morework" | "collage" | "band" | "figures"; src: string; alt: string; note?: string; kicker?: string; top?: boolean; lead?: boolean; chapter?: WorkChapter; pairs?: WorkPairs; ann?: WorkAnnotated; pan?: WorkPan; ba?: WorkBeforeAfter; band?: WorkBand; figures?: WorkFigures; intro?: WorkIntro; sitemap?: WorkSitemap; loop?: WorkLoop; flow?: WorkFlow; poster?: string; count?: number; copy?: WorkCopy; story?: WorkStory; slides?: { src: string; alt: string }[]; label?: string; scene?: "projects-delivered" };
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

const telcoSlides = [
  { src: "/images/work/mlk/telco/telco-01.webp", alt: "Telco ICT Group: the new website on phone, desktop and tablet" },
  { src: "/images/work/mlk/telco/telco-02.webp", alt: "Telco ICT Group case study overview: industry, platform and services" },
  { src: "/images/work/mlk/telco/telco-03.webp", alt: "Project scope: improve user experience for lead generation and service discoverability" },
  { src: "/images/work/mlk/telco/telco-04.webp", alt: "Process: discovery, design and delivery on a three week timeline" },
  { src: "/images/work/mlk/telco/telco-05.webp", alt: "The home page on a 12 column grid" },
  { src: "/images/work/mlk/telco/telco-06.webp", alt: "Breakdown structure: the site map from Home to the specialised content pages" },
  { src: "/images/work/mlk/telco/telco-07.webp", alt: "Typography: Space Grotesk and the type scale" },
  { src: "/images/work/mlk/telco/telco-08.webp", alt: "Colours: the purple, magenta and neutral palette" },
  { src: "/images/work/mlk/telco/telco-09.webp", alt: "Visual language: the six trust points as icons" },
  { src: "/images/work/mlk/telco/telco-10.webp", alt: "Mobile first approach, shown on a phone" },
  { src: "/images/work/mlk/telco/telco-11.webp", alt: "The home page and the services section" },
  { src: "/images/work/mlk/telco/telco-12.webp", alt: "Hover interaction on the case studies that reveals key results" },
  { src: "/images/work/mlk/telco/telco-13.webp", alt: "Visual consistency that reflects the brand, shown on a laptop" },
  { src: "/images/work/mlk/telco/telco-14.webp", alt: "The contact page and the Google Ads service page" },
  { src: "/images/work/mlk/telco/telco-15.webp", alt: "The pages together: about, case studies and the SEO blog" },
];

const wpSlides = [
  { src: "/images/work/mlk/wp-slides/wp-01.webp", alt: "Wonder Pies: the new website on desktop, tablet and phone" },
  { src: "/images/work/mlk/wp-slides/wp-02.webp", alt: "Wonder Pies case study overview: industry, platform and services" },
  { src: "/images/work/mlk/wp-slides/wp-03.webp", alt: "The product range: meat pies, rolls, pasties, vegetarian, gluten free and more" },
  { src: "/images/work/mlk/wp-slides/wp-04.webp", alt: "Visual styles: typography and the gold, charcoal and white palette" },
  { src: "/images/work/mlk/wp-slides/wp-05.webp", alt: "The home page on a 12 column grid" },
  { src: "/images/work/mlk/wp-slides/wp-06.webp", alt: "Mobile first approach, shown on two phones" },
  { src: "/images/work/mlk/wp-slides/wp-07.webp", alt: "The home page" },
  { src: "/images/work/mlk/wp-slides/wp-08.webp", alt: "The about page and store locations" },
  { src: "/images/work/mlk/wp-slides/wp-09.webp", alt: "The pages together: the daily bake, the pie of the week and store locations" },
];

const keysSlides = [
  { src: "/images/work/mlk/keys/keys-01.webp", alt: "Keysborough Veterinary Practice: the new website on desktop, tablet and phone" },
  { src: "/images/work/mlk/keys/keys-02.webp", alt: "Keysborough Veterinary Practice: the brand, the animals and the team" },
  { src: "/images/work/mlk/keys/keys-03.webp", alt: "Project overview: a bold dark-themed hero, clear calls to action and a testimonial carousel" },
  { src: "/images/work/mlk/keys/keys-04.webp", alt: "Approach: from requirements gathering to project delivery with developer notes" },
  { src: "/images/work/mlk/keys/keys-05.webp", alt: "Project timeline and milestones: define, design, delivery" },
  { src: "/images/work/mlk/keys/keys-06.webp", alt: "Problem and solution: the cluttered legacy site and the new layout" },
  { src: "/images/work/mlk/keys/keys-07.webp", alt: "Competitive analysis of two local veterinary clinics" },
  { src: "/images/work/mlk/keys/keys-08.webp", alt: "Colour and type style: Hero Rounded, with the teal, dark and white palette" },
  { src: "/images/work/mlk/keys/keys-09.webp", alt: "A responsive 12 column grid for desktop" },
  { src: "/images/work/mlk/keys/keys-10.webp", alt: "Visual language: the services menu with icons" },
  { src: "/images/work/mlk/keys/keys-11.webp", alt: "Mobile first approach, shown on two phones" },
  { src: "/images/work/mlk/keys/keys-12.webp", alt: "The home page" },
  { src: "/images/work/mlk/keys/keys-13.webp", alt: "The services page" },
  { src: "/images/work/mlk/keys/keys-14.webp", alt: "The gallery and about pages" },
  { src: "/images/work/mlk/keys/keys-15.webp", alt: "A simplified contact form designed to reduce friction" },
  { src: "/images/work/mlk/keys/keys-16.webp", alt: "The pages together: gallery, reviews and the after hours emergency page" },
];

// MLK Group copy, from my LinkedIn and resume (facts only)
const mlkAbout: WorkCopy = {
  label: "About",
  lead: "An Australian digital agency, from fintech to food",
  body: "MLK Group builds websites and web apps for Australian brands. I ran design on the client work, from discovery through launch, and the brands came from more than 25 industries.",
  meta: [
    { l: "Agency", v: "MLK Group, Australia", icon: "building" },
    { l: "Reach", v: "50+ client brands in 25+ industries", icon: "layers" },
    { l: "Built", v: "Responsive websites and web apps", icon: "monitor-smartphone" },
  ],
  didLabel: "Clients include",
  did: ["Telco ICT Group", "Specialist Clinic Pharmacy", "Keysborough Veterinary Practice", "Wonder Pies"],
};

const mlkRole: WorkIntro = {
  label: "Role",
  headline: "I was the **Design Team Lead**, designing client work and leading **three designers**.",
  rows: [
    { l: "Title", v: "Design Team Lead" },
    { l: "Team", v: "Three designers" },
    { l: "Owned", v: "Design quality from discovery to launch" },
    { l: "Also made", v: "Pitch decks and investor-facing assets for the agency" },
  ],
  didLabel: "What I did",
  did: [
    "Designed responsive websites and web apps for clients, from first sketch to launch.",
    "Built a shared design system and reusable components, so the team did not start from zero on every brand.",
    "Set design roadmaps against the business OKRs and brought Lean UX and Design Thinking into the way we worked.",
    "Designed the pitch decks that helped the agency win repeat contracts.",
  ],
};

const mlkChallenges: WorkFigures = {
  eyebrow: "Challenges",
  title: "Challenges and solutions",
  rows: [
    { fig: "50%", unit: "fewer revision cycles", challenge: "Fifty brands, three designers.", solution: "A shared design system and reusable components, so no project started from zero." },
    { fig: "3x", unit: "conversion, 2.5x online orders", challenge: "Stores that had to sell.", solution: "UX led by the data, and conversion work on the flagship e-commerce sites." },
    { fig: "Lean", unit: "UX and Design Thinking", challenge: "A process that ran ad hoc.", solution: "One way of working, with design roadmaps tied to the business OKRs." },
  ],
};

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
  // the Authenticator App (screen 30) comes right before the Visual Device Manager (screen 23)
  const from30 = list.findIndex((m) => m.src.endsWith("/30.webp"));
  if (from30 >= 0) {
    const [m30] = list.splice(from30, 1);
    const at23 = list.findIndex((m) => m.src.endsWith("/23.webp"));
    list.splice(at23 < 0 ? from30 : at23, 0, m30);
  }
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
      { l: "Tools", tools: [{ id: "figma", name: "Figma" }, { id: "flowbite", name: "Flowbite" }, { id: "claude", name: "Claude Code" }, { id: "cursor", name: "Cursor" }] },
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
  { type: "beforeafter", src: "ba-vault", alt: "File vaults, before and after", ba: {
    title: "File vaults: before and after",
    note: "Before, every vault opened as a long form: manager, access and viewers first, the files far below. Now the vault list sits on the left and the files of the chosen vault on the right, on one screen.",
    ratio: 1907 / 897,
    before: { src: "/images/work/sredio/details/ba-vault-before.webp", alt: "The old File Portal Administration page, with each vault opening as a long form" },
    after: { src: "/images/work/sredio/details/vault-compare-1.webp", alt: "The new File Portal Administration page, with the vault list and the files side by side" },
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
  { type: "beforeafter", src: "ba-time", alt: "Timesheets, before and after", ba: {
    title: "Timesheets: before and after",
    note: "Before, the toggles, the timesheet config and two search fields sat above the staff list. Now the list starts right under one header, with Filters and Timesheet Config a click away.",
    ratio: 1918 / 917,
    before: { src: "/images/work/sredio/details/ba-time-before.webp", alt: "The old Timesheets page, with toggles and the timesheet config above the staff list" },
    after: { src: "/images/work/sredio/details/timesheets-1.webp", alt: "The new Timesheets page, with the staff list directly under the header" },
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
  "mlk-group": { media: [
  { type: "copy", src: "copy", alt: "About MLK Group", copy: mlkAbout },
  { type: "intro", src: "intro", alt: "My role at MLK Group", intro: mlkRole },
  { type: "figures", src: "challenges", alt: "Challenges and solutions", figures: mlkChallenges },
{ type: "band", src: "band-keys", alt: "Keysborough Vet", band: { name: "Keysborough Vet", bg: "#181a22", changes: [{ from: "Text over a busy photo", to: "Headline on a clear dark ground" }, { from: "Hours under the headline", to: "Hours, address and booking in one bar" }, { from: "Plain contact link", to: "A persistent Book an Appointment button" }] } },
  { type: "beforeafter", src: "ba-keys", alt: "Keysborough Veterinary Practice, before and after", ba: {
    scrub: true, ratio: 16 / 9,
    before: { src: "/images/work/mlk/ba/keys-before.webp", alt: "The old Keysborough Veterinary Practice website" },
    after: { src: "/images/work/mlk/ba/keys-after.webp", alt: "The new Keysborough Veterinary Practice website" },
  } },
  { type: "carousel", src: "carousel-keys", alt: "Keysborough Veterinary Practice case study slides", slides: keysSlides, kicker: "Case study highlights", label: "Keysborough Veterinary Practice", lead: true, note: "Booking, hours and the phone number used to hide. Now they are one tap away." },
  { type: "band", src: "band-kombi", alt: "Kombi Love", band: { name: "Kombi Love", bg: "#2f5d7c", changes: [{ from: "Slider and sidebar menu", to: "Full-bleed hero, top menu" }, { from: "A wall of text", to: "One headline, one Book Now" }, { from: "Contact details buried", to: "Phone and email in the top bar" }] } },
  { type: "beforeafter", src: "ba-kombi", alt: "Kombi, before and after", ba: {
    scrub: true, ratio: 16 / 9,
    before: { src: "/images/work/mlk/ba/kombi-before.webp", alt: "The old Kombi website" },
    after: { src: "/images/work/mlk/ba/kombi-after.webp", alt: "The new Kombi website" },
  } },
  { type: "collage", src: "/images/work/mlk/ba/kombi-collage.webp", alt: "Kombi: the redesigned pages as a collage" },
  { type: "band", src: "band-telco", alt: "Telco ICT", band: { name: "Telco ICT", bg: "#4b0a7d", changes: [{ from: "Broken logo, empty hero", to: "A branded header and a clear promise" }, { from: "A form with no context", to: "Two clear paths: book or call" }, { from: "No proof", to: "Proof points under the hero" }] } },
  { type: "carousel", src: "carousel-telco", alt: "Telco ICT Group case study slides", slides: telcoSlides, label: "Telco ICT Group", lead: true, kicker: "Case study highlights", note: "Leads got lost in a maze of menus. Now every page ends in Book or Call." },
  { type: "beforeafter", src: "ba-telco", alt: "Telco ICT, before and after", ba: {
    scrub: true, ratio: 16 / 9,
    before: { src: "/images/work/mlk/ba/telco-before.webp", alt: "The old Telco ICT website" },
    after: { src: "/images/work/mlk/ba/telco-after.webp", alt: "The new Telco ICT website" },
  } },
  { type: "band", src: "band-scp", alt: "Specialist Clinic Pharmacy", band: { name: "Specialist Clinic Pharmacy", bg: "#ef7b95", changes: [{ from: "Brochure banner", to: "A searchable storefront" }, { from: "A short list of links", to: "Categories, brands and services" }, { from: "Delivery buried in a slide", to: "Delivery and click and collect up front" }] } },
  { type: "beforeafter", src: "ba-scp", alt: "Specialist Clinic Pharmacy, before and after", ba: {
    scrub: true, ratio: 16 / 9,
    before: { src: "/images/work/mlk/ba/scp-before.webp", alt: "The old Specialist Clinic Pharmacy website" },
    after: { src: "/images/work/mlk/ba/scp-after.webp", alt: "The new Specialist Clinic Pharmacy website" },
  } },
  { type: "collage", src: "/images/work/mlk/ba/scp-collage.webp", alt: "Specialist Clinic Pharmacy: the redesigned pages as a collage" },
  { type: "band", src: "band-wp", alt: "Wonder Pies", band: { name: "Wonder Pies", bg: "#3a4249", changes: [{ from: "One pie, a small button", to: "The whole range, Order Online in the menu" }, { from: "Flat, grey page", to: "Warm, food-first imagery" }, { from: "Text-only menu", to: "Search, account and cart icons" }] } },
  { type: "carousel", src: "carousel-wp", alt: "Wonder Pies case study slides", slides: wpSlides, label: "Wonder Pies", lead: true, kicker: "Case study highlights", note: "One pie and a tiny button became the whole range, a tap from the order." },
  { type: "beforeafter", src: "ba-wp", alt: "Wonder Pies, before and after", ba: {
    scrub: true, ratio: 16 / 9,
    before: { src: "/images/work/mlk/ba/wp-before.webp", alt: "The old Wonder Pies website" },
    after: { src: "/images/work/mlk/ba/wp-after.webp", alt: "The new Wonder Pies website" },
  } },
  { type: "band", src: "band-zigbis", alt: "Zigbis", band: { name: "Zigbis", bg: "#e0cca0", changes: [{ from: "Loud full-width type", to: "One calm headline and offer" }, { from: "A long row of links", to: "Menu grouped by service" }, { from: "Red tab and badges", to: "One persistent Book Now" }] } },
  { type: "beforeafter", src: "ba-zigbis", alt: "Zigbis, before and after", ba: {
    scrub: true, ratio: 16 / 9,
    before: { src: "/images/work/mlk/ba/zigbis-before.webp", alt: "The old Zigbis website" },
    after: { src: "/images/work/mlk/ba/zigbis-after.webp", alt: "The new Zigbis website" },
  } },
  { type: "collage", src: "/images/work/mlk/ba/zigbis-collage.webp", alt: "Zigbis: the redesigned pages as a collage" },
] },
};
