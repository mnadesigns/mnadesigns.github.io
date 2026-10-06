import { aboutPage as p } from "@/data/pages";
import { PageHero, Section, Cards, Prose } from "@/components/organisms/PageParts";
import { Doors } from "@/components/organisms/Doors";
import { Btn } from "@/components/atoms/Buttons";

export const metadata = { title: "About — Your Name" };

export default function About() {
  return (
    <main>
      <PageHero kicker={p.kicker} title={p.title} lead={p.lead}>
        <Btn href="/consulting/">Work with me</Btn>
      </PageHero>
      <Section title="The <em>story</em>"><Prose paragraphs={p.story} /></Section>
      <Section title="How I <em>see</em> it"><Cards items={p.lens} /></Section>
      <Section title="How I <em>work</em>"><Cards items={p.how} four /></Section>
      <Section title="Beyond <em>work</em>"><Prose paragraphs={p.personal} /></Section>
      <Doors />
    </main>
  );
}
