import type { Metadata } from "next";
import { Anton, Inter, Literata } from "next/font/google";
import "./globals.css";
import "./site.css";
import "./landing.css";
import "./sub.css";
import "./pages.css";
import "./consulting.css";
import "./story.css";
import { Nav } from "@/components/molecules/Nav";
import { Loader, Cursor } from "@/components/organisms/Effects";

// Fallbacks for Tanker (display) and General Sans (UI). Swap here once the
// Fontshare files are added (see docs/research/abmcooks/SPEC.md §1).
const display = Anton({ variable: "--font-display", weight: "400", subsets: ["latin"] });
const sans = Inter({ variable: "--font-sans-ui", weight: ["400", "500", "600"], subsets: ["latin"] });
const serif = Literata({
  variable: "--font-serif-body",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Naeem — Senior Product Designer",
  description: "Senior Product Designer and UX Strategist in Lahore with 10+ years of end-to-end product design. Design systems and AI-augmented design workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${serif.variable}`}>
      <body>
        <Loader />
        <Nav />
        <Cursor />
        {children}
      </body>
    </html>
  );
}
