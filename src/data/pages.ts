// Placeholder content for sub-pages. Replace with your own; layout does not depend on exact wording.
const lorem = "Placeholder paragraph. Replace this with your own writing. It is here so the layout, line length and rhythm match the design exactly.";

export const aboutPage = {
  kicker: "About",
  title: "A short <em>headline</em> about you",
  lead: "Two sentences that introduce who you are and what you care about.",
  story: [lorem, lorem, lorem],
  lens: [
    { n: "01", t: "First principle", d: "One sentence describing how you think about the work." },
    { n: "02", t: "Second principle", d: "One sentence describing how you think about the work." },
    { n: "03", t: "Third principle", d: "One sentence describing how you think about the work." },
  ],
  how: [
    { n: "01", t: "Understand", d: "How you start a project and what you look for first." },
    { n: "02", t: "Shape", d: "How you turn findings into direction." },
    { n: "03", t: "Build", d: "How you work with teams to ship it." },
    { n: "04", t: "Measure", d: "How you know it worked." },
  ],
  personal: [lorem, lorem],
};

export const consultingPage = {
  eyebrow: "Consulting · Currently available",
  poster: { line1: "Your headline", op: "×", line2: "goes here" },
  desc: "One sentence describing who you help and how.",
  descEm: "Service one. Service two. Service three. Service four.",
  ticker: ["Service One", "Service Two", "Service Three", "Service Four", "Service Five", "Service Six"],
  problemsLabel: "If you are nodding at any of these",
  problems: [
    "A common problem your clients have.",
    "Another problem that slows their team down.",
    "A third problem that keeps coming back.",
    "A fourth problem nobody has time to fix.",
  ],
  closer: "I have solved each of these.",
  closerSub: "Yours is next.",
  servicesKicker: "The services",
  servicesHeading: "Four things I do.",
  services: [
    { n: "01", t: "Service One", d: "A one or two sentence description of what this service delivers and why it matters to the client." },
    { n: "02", t: "Service Two", d: "A one or two sentence description of what this service delivers and why it matters." },
    { n: "03", t: "Service Three", d: "A one or two sentence description of what this service delivers and why it matters." },
    { n: "04", t: "Service Four", d: "A one or two sentence description of what this service delivers and why it matters." },
  ],
  processKicker: "The engagement",
  processHeading: "How it actually runs.",
  process: [
    { n: "01", t: "Discovery", d: "A short line about how the first phase works." },
    { n: "02", t: "Shape", d: "A short line about how the scope gets locked." },
    { n: "03", t: "Build", d: "A short line about how the work gets done." },
    { n: "04", t: "Scale", d: "A short line about optional ongoing support." },
  ],
  testiKicker: "What they said",
  testiHeading: "Trusted by people.",
  testimonials: [
    { by: "Person One", role: "Title, Company", text: "A testimonial about the consulting work, specific and short, in the client's own words." },
    { by: "Person Two", role: "Title, Company", text: "Another testimonial about the engagement and its result." },
    { by: "Person Three", role: "Title, Company", text: "A third, shorter testimonial." },
  ],
  engageKicker: "Engagement shapes",
  engageHeading: "Four ways to work together.",
  engage: [
    { tag: "For specific problems", t: "Project", fit: "A scoped engagement with a fixed outcome.", range: "4 – 12 weeks", fill: 60, price: "$00k", note: "Fixed scope", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project" },
    { tag: "For ongoing support", t: "Retainer", fit: "A monthly engagement for steady access.", range: "3+ months", fill: 85, price: "$0k", note: "Per month", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project", featured: true, badge: "Most popular" },
    { tag: "For teams", t: "Workshop", fit: "A focused session to upskill a team.", range: "1 – 2 days", fill: 20, price: "$0k", note: "Per session", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project" },
    { tag: "For leaders", t: "Advisory", fit: "Occasional strategic guidance on call.", range: "Flexible", fill: 40, price: "$000", note: "Per hour", inc: ["What is included, line one", "What is included, line two"], scope: "A short description of the scope", cta: "Start a project" },
  ],
  cta: { eyebrow: "Currently available for new clients", l1: "Let's build", acc: "something", l3: "together.", sub: "A short line inviting people to get in touch.", foot: "Based in City · Working with teams worldwide" },
};

export const resumePage = {
  name: "Your Name",
  title: "Your Title · Your Specialty",
  contact: ["City, Country", "hello@example.com", "linkedin.com/in/yourname"],
  summary: lorem,
  experience: [
    { company: "Company One", role: "Role Title", meta: "2022 – Present", desc: "One line describing the company.", bullets: [lorem, lorem, lorem] },
    { company: "Company Two", role: "Role Title", meta: "2019 – 2022", desc: "One line describing the company.", bullets: [lorem, lorem] },
    { company: "Company Three", role: "Role Title", meta: "2015 – 2019", desc: "One line describing the company.", bullets: [lorem, lorem] },
  ],
  consulting: [
    { name: "Client One", meta: "2024", desc: "One line describing the engagement." },
    { name: "Client Two", meta: "2023", desc: "One line describing the engagement." },
  ],
  expertise: [
    { cat: "Design", items: "Product design, design systems, prototyping, research" },
    { cat: "Leadership", items: "Hiring, mentoring, roadmaps, stakeholder management" },
    { cat: "Strategy", items: "Product strategy, positioning, experimentation" },
    { cat: "Tools", items: "Figma, Notion, Linear, Claude" },
  ],
  education: [{ school: "University Name", degree: "Degree, Field", year: "2011 – 2015" }],
};

export const storiesIndex = {
  lede: "A short line explaining that each project below is told in full: the stakes, the decisions and the result.",
  stats: [
    { v: "30+", l: "Products shipped" },
    { v: "8", l: "Years" },
    { v: "3", l: "Companies" },
    { v: "6M+", l: "Users" },
  ],
  features: [
    { slug: "project-one", eyebrow: "Company One · 2022", name: "Project One", sub: "A one-line summary of this project and its result.", metrics: [{ v: "4M+", l: "Users" }, { v: "700K", l: "Waitlist" }], cap: "Company One" },
    { slug: "project-two", eyebrow: "Company Two · 2021", name: "Project Two", sub: "A one-line summary of this project and its result.", metrics: [{ v: "$10M", l: "Raised" }, { v: "0 to 1", l: "Product" }], cap: "Company Two" },
    { slug: "project-three", eyebrow: "Company Three · 2019", name: "Project Three", sub: "A one-line summary of this project and its result.", metrics: [{ v: "Fortune 500", l: "Clients" }], cap: "Company Three" },
  ],
  moreSub: "Smaller engagements and earlier work.",
  more: [
    { slug: "project-one", name: "Project Four", v: "120K", l: "Monthly users", line: "A one-line summary of this project." },
    { slug: "project-two", name: "Project Five", v: "35%", l: "Conversion lift", line: "A one-line summary of this project." },
    { slug: "project-three", name: "Project Six", v: "9", l: "Markets", line: "A one-line summary of this project." },
  ],
  footer: "More <em>coming</em>.",
};

export const pods = [
  { channel: "Podcast Name", title: "Episode title goes here", date: "Month 2026" },
  { channel: "Talk Name", title: "Talk title goes here", date: "Month 2025" },
];

export const stories = [
  { slug: "project-one", name: "Project One", co: "Company One", line: "A one-line summary of this project and its result.", feature: true },
  { slug: "project-two", name: "Project Two", co: "Company Two", line: "A one-line summary of this project and its result.", feature: true },
  { slug: "project-three", name: "Project Three", co: "Company Three", line: "A one-line summary of this project and its result.", feature: true },
];

export const storyPage = {
  secondary: "A short secondary line",
  desc: "Two sentences describing the project, your role and the outcome.",
  stakesBig: { v: "4M+", l: "Users" },
  stakesSupporting: [
    { v: "$10M", l: "Raised" },
    { v: "18", l: "Months" },
    { v: "12", l: "Team size" },
    { v: "3", l: "Markets" },
  ],
  stakesHeading: "What was <span class=\"accent\">at stake</span>",
  stakesParas: [lorem, lorem],
  arc: ["Brief", "Build", "Launch", "Scale"],
  storyHeading: "How it came together",
  storySub: "A short italic line introducing the chapters below.",
  chapters: [
    { n: "01", d: "Month Year", t: "The brief", ps: [lorem, lorem], pull: "A short pull quote that captures the turning point." },
    { n: "02", d: "Month Year", t: "The approach", ps: [lorem, lorem] },
    { n: "03", d: "Month Year", t: "The build", ps: [lorem, lorem], image: true },
    { n: "04", d: "Month Year", t: "The result", ps: [lorem] },
  ],
  serviceEyebrow: "What it means for you",
  serviceHeading: "The work, applied",
  serviceLede: "One or two sentences connecting this project to the kind of work you do for clients.",
  cases: [
    { t: "Case one", p: lorem },
    { t: "Case two", p: lorem },
  ],
  nextKicker: "Next story",
};

export const essaysIndex = [
  { slug: "essay-one", title: "A placeholder essay title about design systems", meta: "Essay · 6 min", date: "Jan 2026" },
  { slug: "essay-two", title: "A placeholder essay title about AI and craft", meta: "Essay · 8 min", date: "Feb 2026" },
  { slug: "essay-three", title: "A placeholder essay title about team ratios", meta: "Essay · 5 min", date: "Mar 2026" },
  { slug: "essay-four", title: "A placeholder essay title about watching users", meta: "Essay · 7 min", date: "Apr 2026" },
];

export const articleBody = [
  { p: lorem }, { p: lorem }, { h: "A section heading" }, { p: lorem }, { p: lorem }, { h: "Another section heading" }, { p: lorem },
];

