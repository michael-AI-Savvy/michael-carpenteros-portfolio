import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "AI Chatbot with Document Processing",
    category: "AI Chatbot",
    desc: "Built intelligent n8n webhook-triggered chatbot using Google Gemini AI for automated document analysis and instant HTTP responses with conditional logic.",
    tags: ["n8n", "Google Gemini", "Webhooks", "Document AI"],
  },
  {
    title: "Project Management Integration Hub",
    category: "Process Automation",
    desc: "Seamless Make.com workflow connecting Asana task management with Xero accounting and Google Sheets for real-time project tracking and financial reporting.",
    tags: ["Make.com", "Asana", "Xero", "Google Sheets"],
  },
  {
    title: "ManyChat Auto-DM Funnel",
    category: "Chatbot Marketing",
    desc: "Complex ManyChat automation with conditional branching, personalized messaging sequences, and email integration for lead nurturing and customer engagement.",
    tags: ["ManyChat", "Messenger", "Email", "Lead Nurturing"],
  },
  {
    title: "Zapier AI Chatbot Assistant",
    category: "AI Chatbot",
    desc: "Intelligent Zapier workflow integrating Facebook Messenger with ChatGPT and Google Docs for context-aware automated responses and document conversations.",
    tags: ["Zapier", "ChatGPT", "Messenger", "Google Docs"],
  },
  {
    title: "AI Agent Document Workflow",
    category: "AI Chatbot",
    desc: "Advanced n8n automation with JavaScript code execution, AI agent orchestration, and Google Gemini integration for intelligent document processing.",
    tags: ["n8n", "AI Agent", "JavaScript", "Gemini"],
  },
  {
    title: "Social Media Content Generator",
    category: "Process Automation",
    desc: "Automated n8n workflow for scheduled Facebook and YouTube Reels creation. JWT auth, AI-powered video generation, and multi-platform publishing.",
    tags: ["n8n", "Video AI", "YouTube API", "Social Media"],
  },
  {
    title: "AI Agent with Multi-Model Integration",
    category: "AI Chatbot",
    desc: "Advanced n8n AI agent featuring Google Gemini, OpenAI chat models, structured output parsing, Discord channel creation, and email notifications.",
    tags: ["n8n", "AI Agent", "OpenAI", "Discord"],
  },
  {
    title: "Ceipal ATS Data Sync Automation",
    category: "Process Automation",
    desc: "Comprehensive n8n workflow integrating Ceipal ATS with Google Sheets. Scheduled extraction, XML parsing, JS transformations, and duplicate removal.",
    tags: ["n8n", "Ceipal ATS", "Sheets", "JavaScript"],
  },
];

export function Projects() {
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
            built for real businesses.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <article
              key={p.title}
              className="group relative overflow-hidden rounded-2xl border border-border card-gradient p-7 transition-all hover:border-primary/50 hover:-translate-y-1"
            >
              <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-primary">
                    {p.category}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all group-hover:text-primary group-hover:rotate-12" />
                </div>

                <h3 className="mt-5 font-display text-2xl font-semibold leading-tight text-foreground">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
