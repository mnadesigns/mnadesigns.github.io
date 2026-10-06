import { Hero } from "@/components/organisms/Hero";
import { Record } from "@/components/organisms/Record";
import { Chapters } from "@/components/organisms/Chapters";
import { Breaker } from "@/components/organisms/Breaker";
import { Writing } from "@/components/organisms/Writing";
import { Doors } from "@/components/organisms/Doors";

export default function Home() {
  return (
    <main>
      <Hero />
      <Record />
      <Chapters />
      <Breaker />
      {/* People (testimonials) hidden until real, approved quotes are supplied */}
      <Writing />
      <Doors />
    </main>
  );
}
