export type Service = {
  n: string;
  title: string;
  promise: string;
  tools: string[];
  stacks?: string[];
  deliverables: string[];
  addon?: boolean;
};

export const servicesIntro = {
  sub: "Six ways I take an idea from interviews to shipped code, with AI doing the heavy lifting and design judgment steering every step.",
};

export const services: Service[] = [
  {
    n: "01", title: "AI-Driven UX Foundations",
    promise: "Your user interviews turned into a validated product foundation before any UI is designed: insights, architecture, flows and decisions backed by UX laws, behavioral psychology and accessibility standards.",
    tools: ["Claude Code", "Custom UX skills", "Mermaid", "Figma MCP"],
    deliverables: ["Interview insight synthesis", "UX audit findings", "Information architecture and user flow diagrams", "UX law rationale for key decisions", "Accessibility requirements", "Project glossary"],
  },
  {
    n: "02", title: "Two-Way Design System Build",
    promise: "One design system for your SaaS, mobile app and marketing site, built in Figma and code, and kept in sync both ways.",
    tools: ["Claude Code", "Figma MCP", "Mobbin MCP", "GitHub"],
    deliverables: ["Token architecture", "Figma component library", "Coded components", "Two-way sync setup", "Usage guidelines", "Dev handoff notes"],
  },
  {
    n: "03", title: "Reference-Driven Redesign",
    promise: "A proven reference layout, tailored to your brand and goals, handed over as clean code.",
    tools: ["Claude Code", "Figma MCP", "GitHub"],
    deliverables: ["Redesigned pages in Figma", "Structured codebase", "GitHub pull request", "Dev handoff notes"],
  },
  {
    n: "04", title: "Benchmark-Led MVP Sprint",
    promise: "A clickable front end in 2 to 3 weeks, benchmarked and built on a real design system.",
    tools: ["Mobbin MCP", "Figma MCP", "Claude Code", "GitHub"],
    deliverables: ["Competitor benchmark", "User flows", "Starter design system", "Figma screens", "Live coded prototype"],
  },
  {
    n: "05", title: "Motion Design and Implementation",
    promise: "Custom motion designed in Figma and shipped in code exactly as approved.",
    tools: ["Figma AI agent", "Figma MCP", "Claude Code", "GitHub"],
    deliverables: ["Animated Figma frames", "Motion spec", "Implemented animations", "Exported video clips"],
  },
  {
    n: "06", title: "Production-Ready UI Code",
    promise: "Your designs delivered as UI code in your stack, so developers wire up logic instead of rebuilding screens.",
    tools: ["Claude Code", "Figma MCP", "GitHub"],
    stacks: ["Angular", "React", "React Native"],
    deliverables: ["UI code", "GitHub pull request", "Dev handoff notes"],
    addon: true,
  },
];
