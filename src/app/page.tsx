import { Hero } from "@/components/organisms/Hero";
import { SkillsStats } from "@/components/organisms/SkillsStats";
import { Chapters } from "@/components/organisms/Chapters";
import { MoreWork } from "@/components/organisms/MoreWork";
import { Services } from "@/components/organisms/Services";
import { Breaker } from "@/components/organisms/Breaker";
import { ClientStories } from "@/components/organisms/ClientStories";
import { Writing } from "@/components/organisms/Writing";
import { Doors } from "@/components/organisms/Doors";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <main>
      <Hero />
      <SkillsStats />
      <Chapters />
      <MoreWork />
      <Services />
      <Breaker />
      <ClientStories />
      {/* People (testimonials) hidden until real, approved quotes are supplied */}
      <Writing />
      <Doors />
    </main>
  );
}
