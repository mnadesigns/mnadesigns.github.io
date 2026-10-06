import { aboutPage as p } from "@/data/pages";
import { site } from "@/data/site";
import { PageHero, Section, Cards, Prose } from "@/components/organisms/PageParts";
import { Doors } from "@/components/organisms/Doors";
import { Btn } from "@/components/atoms/Buttons";

export const metadata = { title: "About — Muhammad Naeem" };

export default function About() {
  return (
    <main>
      <PageHero kicker={p.kicker} title={p.title} lead={p.lead}>
        <Btn href={`mailto:${site.email}`}>Get in touch</Btn>
      </PageHero>
      <Section title="The <em>story</em>"><Prose paragraphs={p.story} /></Section>
      <Section title="What I <em>do</em>"><Cards items={p.lens} four /></Section>
      <Section title="By the <em>numbers</em>"><Cards items={p.how} four /></Section>
      <Doors />
    </main>
  );
}
