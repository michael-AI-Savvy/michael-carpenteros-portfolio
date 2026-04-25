import { Workflow, Bot, BarChart3, Link2 } from "lucide-react";

const highlights = [
  {
    icon: Workflow,
    title: "Workflow Automation & Optimization",
    desc: "Streamlining business processes with n8n, Make.com, and Zapier to eliminate repetitive tasks.",
  },
  {
    icon: Bot,
    title: "AI Chatbots & Integrations",
    desc: "Building intelligent conversational experiences with seamless CRM connectivity.",
  },
  {
    icon: BarChart3,
    title: "KPI Dashboards & Reporting",
    desc: "Creating real-time analytics dashboards for data-driven decision making.",
  },
  {
    icon: Link2,
    title: "CRM & Website Integrations",
    desc: "Connecting HubSpot, Salesforce, Pipedrive to create unified business ecosystems.",
  },
];

export function About() {
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
              Tech-driven problem solver
              <br />
              <span className="text-gradient">passionate about automation.</span>
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                I'm a tech-driven problem solver passionate about automation,
                API integration, and digital optimization. With hands-on
                experience in n8n, Make.com, and Zapier, I design workflows
                that connect platforms, streamline data flow, and reduce
                repetitive manual tasks.
              </p>
              <p>
                I also bring strong expertise in WordPress and Elementor, where
                I create responsive, user-focused websites that integrate
                seamlessly with business systems. My work with CRM platforms
                ensures customer data stays accurate, connected, and actionable
                across different tools.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-primary">
              Core Highlights
            </h3>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-surface-elevated/60"
                >
                  <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                  <div className="relative">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h4 className="mt-4 font-display text-base font-semibold text-foreground">
                      {title}
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
