import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 8, suffix: "+", label: "AI Automations Built" },
  { value: 80, suffix: "%", label: "Process Optimization" },
  { value: 8, suffix: "+", label: "Happy Clients" },
  { value: 300, suffix: "%", label: "Average ROI Increase" },
];

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  delay: number;
}

function CountUp({ target, suffix, active }: { target: number; suffix: string; active: boolean }) {
  const [n, setN] = useState(0);
  const prevTarget = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const from = prevTarget.current;
    const to = target;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setN(Math.round(from + (to - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else prevTarget.current = to;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);

  return (
    <span>
      {n}
      {suffix}
    </span>
  );
}

function StatCard({ value, suffix, label, delay }: StatProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.3 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group text-center transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="font-display text-4xl font-bold text-gradient md:text-5xl transition-transform duration-300 group-hover:scale-110">
        <CountUp target={value} suffix={suffix} active={visible} />
      </div>
      <div className="mt-2 text-sm text-muted-foreground md:text-base">{label}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-border/50 bg-surface/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={s.label} {...s} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}
