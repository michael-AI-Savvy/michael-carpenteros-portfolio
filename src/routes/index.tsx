import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Stats } from "@/components/portfolio/Stats";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { Testimonial } from "@/components/portfolio/Testimonial";
import { Contact } from "@/components/portfolio/Contact";
import { ScrollBackground } from "@/components/portfolio/ScrollBackground";
import { Reveal } from "@/components/portfolio/Reveal";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <ScrollBackground />
      <Nav />
      <Hero />
      <Reveal><Stats /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Skills /></Reveal>
      <Reveal><Projects /></Reveal>
      <Reveal><Certifications /></Reveal>
      <Reveal><Testimonial /></Reveal>
      <Reveal><Contact /></Reveal>
    </main>
  );
}
