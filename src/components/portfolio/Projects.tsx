import { useEffect, useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { resolveImage } from "@/lib/portfolio-assets";

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image_url: string | null;
  image_key: string | null;
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    supabase
      .from("projects")
      .select("id,title,category,description,tags,image_url,image_key")
      .order("sort_order", { ascending: true })
      .then(({ data }) => setProjects((data ?? []) as Project[]));
  }, []);

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">03 / Work</span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">
              Key <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A selection of automation systems, AI agents, and integrations built for real businesses. Click any card to view the workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => {
            const img = resolveImage(p.image_url, p.image_key);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelected(p)}
                className="group relative overflow-hidden rounded-2xl border border-border card-gradient text-left transition-all hover:border-primary/50 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="relative aspect-video overflow-hidden border-b border-border/60 bg-background/40">
                  {img && (
                    <img src={img} alt={`${p.title} workflow preview`} loading="lazy"
                      className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                  <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" /> View
                  </div>
                </div>
                <div className="relative p-7">
                  <div className="flex items-center justify-between gap-4">
                    <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                      {p.category}
                    </span>
                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:rotate-12" />
                  </div>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">{p.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{p.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-md border border-border/60 bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-5xl border-border bg-background p-0">
          {selected && (
            <>
              <DialogHeader className="px-6 pt-6">
                <span className="w-fit rounded-full bg-primary/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                  {selected.category}
                </span>
                <DialogTitle className="mt-3 font-display text-2xl">{selected.title}</DialogTitle>
                <DialogDescription className="text-muted-foreground">{selected.description}</DialogDescription>
              </DialogHeader>
              {resolveImage(selected.image_url, selected.image_key) && (
                <div className="overflow-hidden border-t border-border bg-background/40">
                  <img src={resolveImage(selected.image_url, selected.image_key)!} alt={`${selected.title} workflow`} className="h-auto w-full object-contain" />
                </div>
              )}
              <div className="flex flex-wrap gap-2 px-6 pb-6">
                {selected.tags.map((t) => (
                  <span key={t} className="rounded-md border border-border/60 bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground">{t}</span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
