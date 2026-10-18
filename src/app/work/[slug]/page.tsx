/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";
import { stories } from "@/data/pages";
import { storyPages } from "@/data/storyPages";
import { workDetails } from "@/data/workDetails";
import { BtnSec } from "@/components/atoms/Buttons";
import { WorkStory } from "@/components/organisms/WorkStory";
import { WorkCopy } from "@/components/organisms/WorkCopy";
import { MediaLightbox } from "@/components/organisms/MediaLightbox";
import { WorkCarousel } from "@/components/organisms/WorkCarousel";
import { WorkVideo } from "@/components/organisms/WorkVideo";
import { WorkFilmBox } from "@/components/organisms/WorkFilmBox";
import { ContactBanner } from "@/components/organisms/ContactBanner";
import { MoreByMna } from "@/components/organisms/MoreByMna";
import { Doors } from "@/components/organisms/Doors";

// the Figma logo in its own colours, and a globe for the live site
const FigmaLogo = () => (
  <svg className="wk-ico" viewBox="0 0 38 57" aria-hidden="true">
    <path fill="#F24E1E" d="M19 0H9.5a9.5 9.5 0 0 0 0 19H19V0z" />
    <path fill="#FF7262" d="M19 0h9.5a9.5 9.5 0 0 1 0 19H19V0z" />
    <path fill="#A259FF" d="M19 19H9.5a9.5 9.5 0 0 0 0 19H19V19z" />
    <path fill="#1ABCFE" d="M28.5 19a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19z" />
    <path fill="#0ACF83" d="M9.5 38H19v9.5A9.5 9.5 0 1 1 9.5 38z" />
  </svg>
);
const GlobeIcon = () => (
  <svg className="wk-ico" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="8" cy="8" r="6.2" /><path d="M1.8 8h12.4M8 1.8c1.8 1.8 2.7 3.9 2.7 6.2S9.8 12.4 8 14.2C6.2 12.4 5.3 10.3 5.3 8S6.2 3.6 8 1.8z" />
  </svg>
);

export function generateStaticParams() {
  return stories.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stories.find((x) => x.slug === slug);
  return { title: s?.name ?? "Work", description: storyPages[slug]?.desc };
}

export default async function WorkDetails({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = stories.find((x) => x.slug === slug);
  if (!s) notFound();
  const p = storyPages[slug];
  const d = workDetails[slug] ?? {};
  const own = (d.media?.length ?? 0) > 0; // media set in workDetails replaces the slides and the story images
  const slides = !own && (slug === "sred-io" || slug === "quodarca");
  const stats = [p.stakesBig, ...p.stakesSupporting].slice(0, 4); // the numbers of the work, shown in the hero
  const images = own ? [] : [...new Set([...p.shots, ...p.chapters.flatMap((c) => (c.image ? [c.image] : []))])];
  return (
    <main>
      <div className="wk-col">
        <header className="shell wk-head">
          <Link href="/stories/" className="wk-back"><span>←</span> All work</Link>
          <h1 className="wk-title">{s.name}</h1>
          <dl className="wk-stats">
            {stats.map((x) => <div className="wk-stat" key={x.l}><dt>{x.v}</dt><dd>{x.l}</dd></div>)}
          </dl>
          {(d.figma || d.live) && (
            <div className="wk-links">
              {d.figma && <BtnSec href={d.figma} className="wk-btn">
                <FigmaLogo />Figma file
              </BtnSec>}
              {d.live && <BtnSec href={d.live} className="wk-btn">
                <GlobeIcon />Live site
              </BtnSec>}
            </div>
          )}
        </header>

        <MediaLightbox>
          {slides && <WorkFilmBox slug={slug} controls />}
          {(d.media ?? []).map((m) => m.type === "scene" && m.scene ? <WorkFilmBox key={m.src} slug={slug} scene={m.scene} controls /> : m.type === "carousel" && m.slides ? <WorkCarousel key={m.src} slides={m.slides} label={m.label} /> : m.type === "story" && m.story ? <WorkStory key={m.src} story={m.story} /> : m.type === "copy" && m.copy ? <WorkCopy key={m.src} copy={m.copy} /> : m.type === "slides" ? <WorkFilmBox key={m.src} slug={slug} count={m.count} controls /> : m.type === "video" ? <WorkVideo key={m.src} src={m.src} poster={m.poster} alt={m.alt} /> : (
            <div className="wk-item" key={m.src} role="button" tabIndex={0} aria-label={`View ${m.alt} full size`}>
              <img src={m.src} alt={m.alt} width={1920} height={1080} loading="lazy" />
            </div>
          ))}
          {images.map((src) => <div className="wk-item" key={src} role="button" tabIndex={0} aria-label={`View ${s.name} design full size`}><img src={src} alt={`${s.name} design`} width={1920} height={1080} loading="lazy" /></div>)}
        </MediaLightbox>

        <div className="wk-dark">
          <ContactBanner />
          <MoreByMna current={slug} />
        </div>
      </div>
      <Doors />
    </main>
  );
}
