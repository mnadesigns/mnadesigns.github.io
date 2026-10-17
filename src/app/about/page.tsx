import { aboutPage as p } from "@/data/pages";
import { PageHero, Section, Cards, Prose } from "@/components/organisms/PageParts";
import { Doors } from "@/components/organisms/Doors";
import { Btn } from "@/components/atoms/Buttons";

export const metadata = { title: "About", description: "How Muhammad Naeem grew from front-end designer into leading product design: design systems, accessible interfaces and AI-assisted design to code." };

export default function About() {
  return (
    <main>
      <PageHero kicker={p.kicker} title={p.title} lead={p.lead} aside={
        <img className="about-portrait" fetchPriority="high" src="/images/portrait-720.webp" srcSet="/images/portrait-720.webp 720w, /images/portrait-1200.webp 1200w" sizes="(min-width: 1000px) 360px, 100vw" width={1200} height={1200} alt="Engraving-style portrait of Muhammad Naeem" decoding="async" />
      }>
        <Btn href="/consulting/">Work with me</Btn>
      </PageHero>
      <Section title="The <em>story</em>">
        <div className="about-story">
          <Prose paragraphs={p.story} />
          <img className="about-story-img" src="/images/about-story-720.webp" srcSet="/images/about-story-720.webp 720w, /images/about-story-1200.webp 1200w" sizes="(min-width: 1000px) 480px, 100vw" width={1200} height={1200} alt="A designer's desk with a monitor showing user flows and a component library, a laptop with code, a phone, a drawing tablet and a sketchbook of wireframes." loading="lazy" decoding="async" />
        </div>
      </Section>
      <Section title="How I <em>see</em> it"><Cards items={p.lens} /></Section>
      <Section title="How I <em>work</em>"><Cards items={p.how} four /></Section>
      <Section title="Beyond <em>work</em>"><Prose paragraphs={p.personal} /></Section>
      <Doors />
    </main>
  );
}
