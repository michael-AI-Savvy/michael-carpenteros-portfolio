import { useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import projectAiChatbot from "@/assets/project-ai-chatbot.png";
import projectUpwork from "@/assets/project-upwork.png";
import projectAutoDm from "@/assets/project-auto-dm.jpg";
import projectN8nSamples from "@/assets/project-n8n-samples.png";
import projectFinalOutput from "@/assets/project-final-output.png";
import projectGenerator from "@/assets/project-generator.png";
import projectCeipalAts from "@/assets/project-ceipal-ats.png";
import projectCeipalCombine from "@/assets/project-ceipal-combine.png";
import projectZapierChatbot from "@/assets/project-zapier-chatbot.png";

const projects = [
  {
    title: "Webhook AI Agent with Memory",
    category: "AI Chatbot",
    desc: "n8n webhook-triggered AI agent powered by Google Gemini with conversational memory. Conditionally responds to incoming requests, fetches reference documents, and makes outbound HTTP calls to deliver context-aware replies.",
    tags: ["n8n", "Google Gemini", "Webhook", "AI Agent"],
    image: projectAiChatbot,
  },
  {
    title: "Asana → Xero → Sheets Sync",
    category: "Process Automation",
    desc: "Make.com scenario triggered by completed Asana tasks. Calls the Xero API, routes data through iterators and aggregators to Google Sheets, uploads attachments back to Asana, and clears stale rows — keeping project finances in sync end to end.",
    tags: ["Make.com", "Asana", "Xero", "Google Sheets"],
    image: projectUpwork,
  },
  {
    title: "Instagram Comment-to-DM Lead Capture",
    category: "Chatbot Marketing",
    desc: "ManyChat flow that listens for comments on an Instagram post, offers a free guide via DM, captures the user's email, and runs delayed follow-ups when no email is provided — turning organic engagement into qualified leads.",
    tags: ["ManyChat", "Instagram", "Email Capture", "Lead Gen"],
    image: projectAutoDm,
  },
  {
    title: "Messenger AI Assistant with Docs Lookup",
    category: "AI Chatbot",
    desc: "Zapier Zap triggered by new Facebook Messenger messages. Conditional Paths either pull contextual content from Google Docs and generate a ChatGPT reply, or route to a direct Messenger response — automating customer Q&A at scale.",
    tags: ["Zapier", "Messenger", "ChatGPT", "Google Docs"],
    image: projectZapierChatbot,
  },
  {
    title: "Ceipal ATS to Google Sheets Sync",
    category: "Process Automation",
    desc: "Scheduled n8n workflow that authenticates with Ceipal, pulls placements and sales manager details, normalizes and de-duplicates the records, and appends or updates rows in Google Sheets for live recruiting reporting.",
    tags: ["n8n", "Ceipal", "Google Sheets", "Data Sync"],
    image: projectCeipalAts,
  },
  {
    title: "AI Video Generator & YouTube Publisher",
    category: "Process Automation",
    desc: "Scheduled n8n pipeline that uses Google Gemini to generate scripts, triggers a video render, polls until completion, converts the asset, and publishes the finished video directly to YouTube — fully hands-off content production.",
    tags: ["n8n", "Gemini", "Video AI", "YouTube API"],
    image: projectGenerator,
  },
  {
    title: "AI Invoice Agent with Discord & Email",
    category: "AI Chatbot",
    desc: "n8n AI agent combining Google Gemini and OpenAI with structured output parsing. Pulls invoices on a schedule, loops through results, and conditionally creates Discord channels for review or sends email notifications based on invoice status.",
    tags: ["n8n", "AI Agent", "OpenAI", "Discord"],
    image: projectN8nSamples,
  },
  {
    title: "Ceipal Placements Merge & Enrichment",
    category: "Process Automation",
    desc: "n8n workflow that authenticates with Ceipal on a schedule, fetches placements and confirmations in parallel, merges the streams, and enriches each record with applicant detail via custom JavaScript transformations.",
    tags: ["n8n", "Ceipal", "API Integration", "JavaScript"],
    image: projectCeipalCombine,
  },
];

export function Projects() {
  const [selected, setSelected] = useState<(typeof projects)[number] | null>(null);

  return (
    <section id="projects" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                03 / Work
              </span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">
              Key <span className="text-gradient">Projects</span>
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            A selection of automation systems, AI agents, and integrations
            built for real businesses. Click any card to view the workflow.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <button
              key={p.title}
              type="button"
              onClick={() => setSelected(p)}
              className="group relative overflow-hidden rounded-2xl border border-border card-gradient text-left transition-all hover:border-primary/50 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative aspect-video overflow-hidden border-b border-border/60 bg-background/40">
                <img
                  src={p.image}
                  alt={`${p.title} workflow preview`}
                  loading="lazy"
                  className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
                <div className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground backdrop-blur-sm opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-3 w-3" />
                  View
                </div>
              </div>

              <div className="relative p-7">
                <div className="flex items-center justify-between gap-4">
                  <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:rotate-12" />
                </div>

                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-foreground md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border/60 bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
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
                <DialogTitle className="mt-3 font-display text-2xl">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selected.desc}
                </DialogDescription>
              </DialogHeader>
              <div className="overflow-hidden border-t border-border bg-background/40">
                <img
                  src={selected.image}
                  alt={`${selected.title} workflow`}
                  className="h-auto w-full object-contain"
                />
              </div>
              <div className="flex flex-wrap gap-2 px-6 pb-6">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border/60 bg-background/40 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
