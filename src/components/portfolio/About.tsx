import { useEffect, useState } from "react";
import { Workflow, Bot, BarChart3, Link2, Zap, type LucideIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";

const iconMap: Record<string, LucideIcon> = { Workflow, Bot, BarChart3, Link2, Zap };

interface Highlight { id: string; icon: string; title: string; description: string; details: string; }
interface AboutContent {
  heading: string; headingAccent: string; paragraphs: string[];
}

export function About() {
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [content, setContent] = useState<AboutContent | null>(null);

  useEffect(() => {
    supabase
      .from("about_highlights")
      .select("id,icon,title,description,details")
      .order("sort_order", { ascending: true })
      .then(({ data }) => setHighlights((data ?? []) as Highlight[]));
    supabase
      .from("site_content")
      .select("value")
      .eq("key", "about")
      .maybeSingle()
      .then(({ data }) => data && setContent(data.value as unknown as AboutContent));
  }, []);

  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                01 / About
              </span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
              {content?.heading ?? "Tech-driven problem solver"}
              <br />
              <span className="text-gradient">{content?.headingAccent ?? "passionate about automation."}</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              {(content?.paragraphs ?? []).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
              Core Highlights
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">Click any card to learn more.</p>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {highlights.map((h) => {
                const Icon = iconMap[h.icon] ?? Zap;
                return (
                  <Dialog key={h.id}>
                    <DialogTrigger asChild>
                      <button
                        type="button"
                        className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 text-left backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-surface-elevated/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                      >
                        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                        <div className="relative">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                            <Icon className="h-5 w-5" />
                          </div>
                          <h4 className="mt-4 font-display text-base font-semibold text-foreground">{h.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.description}</p>
                          <span className="mt-4 inline-block text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                            Learn more →
                          </span>
                        </div>
                      </button>
                    </DialogTrigger>
                    <DialogContent className="max-w-lg">
                      <DialogHeader>
                        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <DialogTitle className="font-display text-xl">{h.title}</DialogTitle>
                        <DialogDescription className="pt-2 text-base leading-relaxed text-muted-foreground">
                          {h.details}
                        </DialogDescription>
                      </DialogHeader>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
