// All placeholder content. Replace with your own text; layout does not depend on exact wording.
export const site = {
  name: "Your Name",
  role: "Your Title, City",
  logo: "YN",
  email: "hello@example.com",
};

export const navLinks = [
  { label: "Work", href: "/#chapters" },
  { label: "About", href: "/about/" },
  { label: "Writing", href: "/writing/" },
  { label: "Consulting", href: "/consulting/" },
  { label: "Resume", href: "/resume/" },
];

export const hero = {
  line1: "Your big claim",
  line2: "goes right here",
  accent: "claim",
  sub: "One short line that says what you do, who it is for, and the proof behind it. Keep it to two sentences.",
  cta: "Work with me",
};

export const stats = [
  { value: 6, suffix: "M+", label: "People use my work" },
  { value: 50, prefix: "$", suffix: "M", label: "Value created" },
  { value: 12, suffix: "", label: "Years of experience" },
  { value: 3, suffix: "", label: "Companies taken from zero" },
];

export const chapters = [
  {
    kind: "ad",
    name: "Project One",
    role: "Role at Company, <em>Year to Year</em>",
    sub: "A single sentence describing the outcome of this project.",
    stats: [
      { v: "4M+", l: "Users" },
      { v: "700K", l: "Waitlist" },
    ],
    href: "/stories/project-one/",
    tag: "Placeholder · kinetic ad",
  },
  {
    kind: "film",
    name: "Project Two",
    role: "Role at Company, <em>Year to Year</em>",
    sub: "A single sentence describing the outcome of this project.",
    stats: [
      { v: "$10M", l: "Raised" },
      { v: "0 to 1", l: "Product" },
    ],
    href: "/stories/project-two/",
    tag: "Placeholder · film",
  },
  {
    kind: "still",
    name: "Project Three",
    role: "Role at Company, <em>Year to Year</em>",
    sub: "A single sentence describing the outcome of this project.",
    stats: [{ v: "Fortune 500", l: "Clients", word: true }],
    href: "/stories/project-three/",
    tag: "Placeholder · still",
  },
];

// Kinetic ad beats: background class, dark text, line and optional counter.
export const adBeats = [
  { bg: "#ffffff", dark: false, dur: 2400, tag: "Company" },
  { bg: "#02c3a3", dark: false, dur: 2900, line: "The first big claim" },
  { bg: "#0b0b0a", dark: true, dur: 2700, line: "A <em>surprising</em> number" },
  { bg: "#ffffff", dark: false, dur: 3600, giant: 700000, tag: "Waitlist" },
  { bg: "#02c3a3", dark: false, dur: 3200, line: "Then it launched" },
  { bg: "#ff7b66", dark: false, dur: 3400, giant: 4000000, suffix: "+", tag: "Users" },
  { bg: "#1c9ce5", dark: false, dur: 5400, line: "Five products, one team" },
  { bg: "#02c3a3", dark: false, dur: 2900, line: "Then it was acquired" },
  { bg: "#ffffff", dark: false, dur: 3600, line: "The <em>payoff</em>" },
  { bg: "#ffffff", dark: false, dur: 2600, tag: "Company" },
];

export const breakerWords = ["wallets", "design systems", "design teams", "AI pipelines", "product strategy"];

export const quotes = [
  { by: "Person One", role: "Title, Company", text: "A long, thoughtful testimonial goes here. It should feel specific, mention a real result, and read like a person wrote it.", variant: "feature" },
  { by: "Person Two", role: "Title, Company", text: "A shorter supporting quote about working together and the outcome.", variant: "" },
  { by: "Person Three", role: "Title, Company", text: "Another supporting quote that adds a different angle on your work.", variant: "" },
  { by: "Person Four", role: "Title, Company", text: "The longest quote lives in the wide row beneath and keeps to a couple of lines across the full width of the grid on desktop.", variant: "full" },
];

export const receipts = [1, 2, 3, 4, 5];

export const essays = [
  { slug: "essay-one", meta: "Essay · 6 min", title: "A placeholder essay title about design systems" },
  { slug: "essay-two", meta: "Essay · 8 min", title: "A placeholder essay title about AI and craft" },
  { slug: "essay-three", meta: "Essay · 5 min", title: "A placeholder essay title about team ratios" },
  { slug: "essay-four", meta: "Essay · 7 min", title: "A placeholder essay title about watching users" },
];

export const doors = [
  { kicker: "For hiring managers", title: "Let's <em>talk</em>", line: "A short line inviting a conversation about a role.", href: "/resume/", cta: "See resume" },
  { kicker: "For founders and teams", title: "Work <em>together</em>", line: "A short line describing consulting engagements.", href: "/consulting/", cta: "See consulting" },
];
