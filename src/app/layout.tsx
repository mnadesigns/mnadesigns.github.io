import type { Metadata } from "next";
import { Inter, Literata } from "next/font/google";
import "./globals.css";
import "./site.css";
import "./landing.css";
import "./sub.css";
import "./pages.css";
import "./consulting.css";
import "./story.css";
import "./work.css";
import { Nav } from "@/components/molecules/Nav";
import { Loader, Cursor } from "@/components/organisms/Effects";
import { Prefetcher } from "@/components/organisms/Prefetcher";

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
  metadataBase: new URL("https://mnadesigns.github.io"),
  title: { default: "Muhammad Naeem | AI Product Leader & Lead Product Designer", template: "%s | Muhammad Naeem" },
  description: "Muhammad Naeem is a Lead Product Designer and AI product leader in Lahore, Pakistan: design systems and products for SaaS, fintech and e-commerce, shipped as production code with AI in the loop.",
  // the thumbnail shown when a link is shared: this one for every page, the work pages set their own (see app/work/[slug]/page.tsx)
  openGraph: { type: "website", siteName: "Muhammad Naeem", images: [{ url: "/images/og/og.jpg", width: 1200, height: 630, alt: "Muhammad Naeem" }] },
  twitter: { card: "summary_large_image", images: ["/images/og/og.jpg"] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <head>
        {/* the display font is fetched with the page, not after the first paint, so headings do not jump when it arrives */}
        <link rel="preload" href="/fonts/Tanker-Regular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        {/* the intro and the scroll reveals do not wait for the scripts: the hero is shown on a timer, and the first screen of reveals is switched on, as soon as the page is parsed (the React components do the same later, harmlessly) */}
        <script dangerouslySetInnerHTML={{ __html: "(function(){var r=matchMedia('(prefers-reduced-motion: reduce)').matches;function go(){document.body.classList.add('loaded');setTimeout(function(){document.body.classList.add('filled')},r?0:1700)}if(r){document.addEventListener('DOMContentLoaded',go)}else{setTimeout(go,650)}document.addEventListener('DOMContentLoaded',function(){if(!('IntersectionObserver' in window))return;var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});document.querySelectorAll('.rv').forEach(function(el){if(el.getBoundingClientRect().top<innerHeight*0.9){el.classList.add('rv-now','in')}else{io.observe(el)}})})})()" }} />
      </head>
      <body>
        <Loader />
        <Nav />
        <Cursor />
        <Prefetcher />
        {children}
      </body>
    </html>
  );
}
