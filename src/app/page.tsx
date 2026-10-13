import { Hero } from "@/components/organisms/Hero";
import { SkillsStats } from "@/components/organisms/SkillsStats";
import { Chapters } from "@/components/organisms/Chapters";
import { Services } from "@/components/organisms/Services";
import { Breaker } from "@/components/organisms/Breaker";
import { ClientStories } from "@/components/organisms/ClientStories";
import { Writing } from "@/components/organisms/Writing";
import { Doors } from "@/components/organisms/Doors";

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsStats />
      <Chapters />
      <Services />
      <Breaker />
      <ClientStories />
      {/* People (testimonials) hidden until real, approved quotes are supplied */}
      <Writing />
      <Doors />
    </main>
  );
}
