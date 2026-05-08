import { useState } from "react";
import { Award, Calendar, Clock, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import certGoogleAi from "@/assets/cert-google-ai.jpg";
import certPython from "@/assets/cert-python.jpg";
import certChatbot from "@/assets/cert-chatbot.jpg";
import certAiMarketing from "@/assets/cert-ai-marketing.jpg";
import certSupplyChain from "@/assets/cert-supply-chain.jpg";

type Certification = {
  title: string;
  shortTitle: string;
  instructor: string;
  date: string;
  length: string;
  issuer: string;
  image: string;
  category: string;
  description: string;
};

const certifications: Certification[] = [
  {
    title: "Google AI Studio Bootcamp: Build Apps, Media & Master Gen AI",
    shortTitle: "Google AI Studio Bootcamp",
    instructor: "Neyamul Hasan, M.Pharm",
    date: "Sept. 4, 2025",
    length: "2 total hours",
    issuer: "Udemy",
    image: certGoogleAi,
    category: "Generative AI",
  },
  {
    title: "Python Programming Mastery: From Beginner to Pro",
    shortTitle: "Python Programming Mastery",
    instructor: "Mehmood Khalil",
    date: "Oct. 2, 2025",
    length: "7 total hours",
    issuer: "Udemy",
    image: certPython,
    category: "Programming",
  },
  {
    title: "Chatbot Development Course — Automate Sales & Support w/ AI",
    shortTitle: "Chatbot Development Course",
    instructor: "Khadin Akbar, Khadin Akbar Support",
    date: "Sept. 20, 2025",
    length: "2 total hours",
    issuer: "Udemy",
    image: certChatbot,
    category: "AI Automation",
  },
  {
    title: "AI Digital Marketing: Master SEO, Ads & Sales",
    shortTitle: "AI Digital Marketing",
    instructor: "MTF Institute of Management, Technology and Finance",
    date: "Sept. 2, 2025",
    length: "3 total hours",
    issuer: "Udemy",
    image: certAiMarketing,
    category: "Marketing",
  },
  {
    title: "Advanced Supply Chain: Master Optimisation & AI Strategies",
    shortTitle: "Advanced Supply Chain & AI",
    instructor: "MTF Institute of Management, Technology and Finance",
    date: "Sept. 2, 2025",
    length: "3 total hours",
    issuer: "Udemy",
    image: certSupplyChain,
    category: "Strategy",
  },
];

export function Certifications() {
  const [selected, setSelected] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="font-mono text-xs uppercase tracking-widest text-primary">
              03 / Credentials
            </span>
          </div>
          <h2 className="mt-6 font-display text-4xl font-bold md:text-5xl">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Continuous learning across AI, automation, and digital strategy.
            Click any card to see the details.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, i) => (
            <button
              key={cert.title}
              onClick={() => setSelected(cert)}
              className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 text-left backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:bg-surface-elevated/60 hover:shadow-elegant focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              style={{
                animation: `fade-in-up 0.6s ease-out ${i * 0.08}s both`,
              }}
            >
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
                    <Award className="h-5 w-5" />
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    {cert.category}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-foreground">
                  {cert.shortTitle}
                </h3>
                <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {cert.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {cert.length}
                  </span>
                </div>
                <div className="mt-5 inline-flex items-center font-mono text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  View certificate →
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl border-border bg-surface/95 backdrop-blur-xl">
          {selected && (
            <>
              <DialogHeader>
                <div className="inline-flex w-fit items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary">
                    {selected.issuer} · {selected.category}
                  </span>
                </div>
                <DialogTitle className="mt-3 font-display text-2xl leading-tight">
                  {selected.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Certificate details for {selected.shortTitle}
                </DialogDescription>
              </DialogHeader>

              <div className="overflow-hidden rounded-xl border border-border">
                <img
                  src={selected.image}
                  alt={`${selected.shortTitle} certificate of completion`}
                  className="h-auto w-full"
                  loading="lazy"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-border bg-background/40 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <User className="h-3.5 w-3.5" /> Instructor
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {selected.instructor}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/40 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" /> Date
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {selected.date}
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-background/40 p-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" /> Length
                  </div>
                  <p className="mt-1 text-sm font-medium text-foreground">
                    {selected.length}
                  </p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
