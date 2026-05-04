const skills = [
  "n8n",
  "Make.com",
  "Zapier",
  "GoHighLevel",
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "ManyChat",
  "ChatGPT API",
  "Google Gemini",
  "JavaScript",
  "WordPress",
  "Elementor",
  "API Integration",
  "Webhooks",
];

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              02 / Stack
            </span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">
            Technical <span className="text-gradient">Skills</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            The tools and platforms I use to build automation systems that
            scale.
          </p>
        </div>

        <div className="mt-14 flex flex-wrap justify-center gap-3">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-surface/60 px-5 py-2.5 font-mono text-sm text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
              style={{
                animation: `fade-in-up 0.6s ease-out ${i * 0.04}s both`,
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
