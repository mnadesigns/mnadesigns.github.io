import type { Metadata } from "next";
import { Inter, Literata } from "next/font/google";
import "./globals.css";
import "./site.css";
import "./landing.css";
import "./sub.css";
import "./pages.css";
import "./consulting.css";
import "./story.css";
import { Nav } from "@/components/molecules/Nav";
import { Loader, Cursor } from "@/components/organisms/Effects";
import { BoomEffect } from "@/components/organisms/BoomEffect";

// Display font: Tanker (Indian Type Foundry, ITF Free Font License), self-hosted unmodified from
// public/fonts via @font-face in globals.css. UI font: Inter stands in for General Sans.
const sans = Inter({ variable: "--font-sans-ui", weight: ["400", "500", "600"], subsets: ["latin"] });
const serif = Literata({
  variable: "--font-serif-body",
  weight: ["400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your Name — Your headline goes here",
  description: "Placeholder portfolio description.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <Loader />
        <Nav />
        <Cursor />
        <BoomEffect />
        {children}
      </body>
    </html>
  );
}
