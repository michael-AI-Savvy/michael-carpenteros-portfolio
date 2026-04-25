import { Mail, Github, Linkedin, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-5xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface/40 p-10 backdrop-blur-md md:p-16">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  04 / Contact
                </span>
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
                Let's automate <br />
                <span className="text-gradient">your next idea.</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Open to consulting, freelance projects, and full-time
                opportunities. Reach out and let's build something that scales.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="mailto:hello@michaelcarpenteros.com"
                className="group flex items-center justify-between rounded-xl border border-border bg-background/50 p-5 transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      Email
                    </div>
                    <div className="font-medium text-foreground">
                      hello@michaelcarpenteros.com
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between rounded-xl border border-border bg-background/50 p-5 transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Linkedin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      LinkedIn
                    </div>
                    <div className="font-medium text-foreground">
                      /in/michaelcarpenteros
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
              </a>

              <a
                href="#"
                className="group flex items-center justify-between rounded-xl border border-border bg-background/50 p-5 transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 text-primary">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-muted-foreground">
                      GitHub
                    </div>
                    <div className="font-medium text-foreground">
                      @mcarpenteros
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Michael Carpenteros. All rights reserved.</div>
          <div className="font-mono">AI Automation & CRM Specialist</div>
        </footer>
      </div>
    </section>
  );
}
