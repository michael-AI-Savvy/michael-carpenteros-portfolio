import { Quote } from "lucide-react";

export function Testimonial() {
  return (
    <section className="relative py-28">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 card-gradient p-12 md:p-16">
          <div className="absolute -top-10 -left-10 h-48 w-48 rounded-full bg-primary/15 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative text-center">
            <Quote className="mx-auto h-10 w-10 text-primary" />
            <blockquote className="mt-8 font-display text-2xl font-medium leading-snug text-foreground md:text-3xl">
              "Automation isn't just about saving time — it's about creating
              <span className="text-gradient"> systems that scale </span>
              your business while you focus on what matters most."
            </blockquote>
            <div className="mt-8 font-mono text-sm uppercase tracking-widest text-muted-foreground">
              — Michael Carpenteros
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
