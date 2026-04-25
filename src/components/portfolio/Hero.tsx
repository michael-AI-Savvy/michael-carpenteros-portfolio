import { Github, Linkedin, Mail, ArrowRight, Code2, Braces } from "lucide-react";
import portrait from "@/assets/portrait.jpg";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden grid-pattern">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[600px] w-[600px] rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-3xl" />

      <div className="relative mx-auto grid min-h-screen max-w-7xl grid-cols-1 items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-0">
        {/* Left content */}
        <div className="fade-in-up">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-5 py-2 backdrop-blur-sm">
            <span className="text-sm font-medium text-primary">
              AI Automation | CRM Specialist | Workflow Engineer
            </span>
          </div>

          <h1 className="mt-8 font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Hi, I'm
            <br />
            <span className="text-gradient">Michael Carpenteros</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I design, integrate, and deploy AI-powered systems with n8n,
            Make.com, and Zapier — turning manual workflows into automated
            engines that streamline operations and maximize ROI.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary-glow glow-sm hover:glow-ring"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="rounded-lg border border-border bg-surface/40 px-6 py-3.5 font-semibold text-foreground backdrop-blur-sm transition-colors hover:bg-surface-elevated"
            >
              Contact Me
            </a>
          </div>

          <div className="mt-12 flex items-center gap-3">
            {[
              { icon: Github, label: "GitHub", href: "#" },
              { icon: Linkedin, label: "LinkedIn", href: "#" },
              { icon: Mail, label: "Email", href: "#contact" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/50 text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Right portrait */}
        <div className="relative flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-[480px]">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border border-primary/20 spin-slow" />
            <div
              className="absolute inset-4 rounded-full border-2 border-dashed border-primary/30 spin-slow"
              style={{ animationDirection: "reverse", animationDuration: "40s" }}
            />

            {/* Glow */}
            <div className="absolute inset-8 rounded-full bg-primary/20 blur-2xl" />

            {/* Portrait */}
            <div className="absolute inset-8 overflow-hidden rounded-full border-2 border-primary/40 glow-ring">
              <img
                src={portrait}
                alt="Michael Carpenteros portrait"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Floating tags */}
            <div className="absolute -top-2 left-12 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary backdrop-blur-md float">
              <Code2 className="h-5 w-5" />
            </div>
            <div
              className="absolute top-8 -right-2 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary backdrop-blur-md float"
              style={{ animationDelay: "1.5s" }}
            >
              <Braces className="h-5 w-5" />
            </div>
            <div
              className="absolute -bottom-2 right-16 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary backdrop-blur-md float"
              style={{ animationDelay: "3s" }}
            >
              <span className="font-mono text-sm">{`{ }`}</span>
            </div>

            {/* Available badge */}
            <div className="absolute bottom-6 right-2 flex items-center gap-2 rounded-full bg-background/90 px-4 py-2 backdrop-blur-md border border-primary/30">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
              </span>
              <span className="text-sm font-medium text-foreground">
                Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-muted-foreground/40 p-1.5">
          <div className="h-2 w-1 animate-bounce rounded-full bg-muted-foreground" />
        </div>
      </div>
    </section>
  );
}
