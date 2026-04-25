const stats = [
  { value: "8+", label: "AI Automations Built" },
  { value: "80%", label: "Process Optimization" },
  { value: "8+", label: "Happy Clients" },
  { value: "300%", label: "Average ROI Increase" },
];

export function Stats() {
  return (
    <section className="relative border-y border-border/50 bg-surface/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground md:text-base">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
