import { ToolIcon } from "./ToolIcons";

// The icon in front of a tool chip in the services section. Claude, Figma and MCP use the shared tool logos; GitHub is its logo mark (Simple Icons, CC0);
// Mobbin and Mermaid use their own logos; the stack of icons, and the Figma AI agent and custom UX skills use the AI-stars icon. Logos are trademarks of their owners and only say which tool is used.
const GITHUB = "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12";

// The AI-stars icon: one large four-point star with two small ones, used for the Figma AI agent and the custom UX skills.
function AiStars({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d="M10 2l2.2 6.3L18.5 10.5l-6.3 2.2L10 19l-2.2-6.3L1.5 10.5l6.3-2.2z" /><path d="M19 13l.9 2.1L22 16l-2.1.9L19 19l-.9-2.1L16 16l2.1-.9z" /><path d="M19.5 2l.6 1.4L21.5 4l-1.4.6L19.5 6l-.6-1.4L17.5 4l1.4-.6z" /></svg>;
}

export function ServiceToolIcon({ tool, className }: { tool: string; className?: string }) {
  if (tool === "Claude Code") return <ToolIcon name="claude" className={className} />;
  if (tool === "Figma AI agent") return <AiStars className={className} />;
  if (tool === "Figma MCP") return <ToolIcon name="figma" className={className} />;
  if (tool === "GitHub") return <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d={GITHUB} /></svg>;
  // Mermaid's own mark (from its website favicon), without the pink square, so it is white like the other icons
  if (tool === "Mermaid") return <svg className={className} viewBox="70 100 350 290" fill="currentColor" aria-hidden="true" focusable="false"><path d="M407.48,111.18C335.587,108.103 269.573,152.338 245.08,220C220.587,152.338 154.573,108.103 82.68,111.18C80.285,168.229 107.577,222.632 154.74,254.82C178.908,271.419 193.35,298.951 193.27,328.27L193.27,379.13L296.9,379.13L296.9,328.27C296.816,298.953 311.255,271.42 335.42,254.82C382.596,222.644 409.892,168.233 407.48,111.18Z" /></svg>;
  // Mobbin's own logo mark (its favicon), used as a mask so it takes the colour of the text
  if (tool === "Mobbin MCP") return <span className={className} aria-hidden="true" style={{ display: "inline-block", backgroundColor: "currentColor", WebkitMaskImage: "url(/images/brands/mobbin.png)", maskImage: "url(/images/brands/mobbin.png)", WebkitMaskSize: "contain", maskSize: "contain", WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat", WebkitMaskPosition: "center", maskPosition: "center" }} />;
  return <AiStars className={className} />;
}
