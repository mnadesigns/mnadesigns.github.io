import { Hero } from "@/components/organisms/Hero";
import { Record } from "@/components/organisms/Record";
import { Chapters } from "@/components/organisms/Chapters";
import { Breaker } from "@/components/organisms/Breaker";
import { People } from "@/components/organisms/People";
import { Writing } from "@/components/organisms/Writing";
import { Doors } from "@/components/organisms/Doors";

export default function Home() {
  return (
    <main>
      <Hero />
      <Record />
      <Chapters />
      <Breaker />
      <People />
      <Writing />
      <Doors />
    </main>
  );
}
