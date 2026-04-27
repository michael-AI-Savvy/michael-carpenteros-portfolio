import { useEffect, useState } from "react";
import { Quote, Star, Send, Loader2, MessageSquarePlus } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Testimonial {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  message: string;
  rating: number;
  created_at: string;
}

const testimonialSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  role: z.string().trim().max(100).optional().or(z.literal("")),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(600, "Message must be less than 600 characters"),
  rating: z.number().int().min(1).max(5),
});

type FormErrors = Partial<Record<keyof z.infer<typeof testimonialSchema>, string>>;

export function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    role: "",
    company: "",
    message: "",
    rating: 5,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    const { data, error } = await supabase
      .from("testimonials")
      .select("id,name,role,company,message,rating,created_at")
      .eq("approved", true)
      .order("created_at", { ascending: false })
      .limit(9);
    if (error) {
      console.error("Failed to load testimonials", error);
    } else {
      setItems((data ?? []) as Testimonial[]);
    }
    setLoading(false);
  }

  const handleField =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((p) => ({ ...p, [field]: e.target.value }));
      if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
    };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = testimonialSchema.safeParse(form);
    if (!parsed.success) {
      const fe: FormErrors = {};
      parsed.error.issues.forEach((i) => {
        const k = i.path[0] as keyof FormErrors;
        if (!fe[k]) fe[k] = i.message;
      });
      setErrors(fe);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.from("testimonials").insert({
      name: parsed.data.name,
      role: parsed.data.role || null,
      company: parsed.data.company || null,
      message: parsed.data.message,
      rating: parsed.data.rating,
    });
    setSubmitting(false);

    if (error) {
      console.error("Submit testimonial error", error);
      toast.error("Couldn't submit your testimonial", {
        description: "Please try again in a moment.",
      });
      return;
    }

    toast.success("Thank you!", {
      description: "Your testimonial was submitted and will appear once approved.",
    });
    setForm({ name: "", role: "", company: "", message: "", rating: 5 });
    setOpen(false);
  }

  return (
    <section id="testimonials" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
              <span className="font-mono text-xs uppercase tracking-widest text-primary">
                03.5 / Testimonials
              </span>
            </div>
            <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
              What people <span className="text-gradient">say</span>
            </h2>
            <p className="mt-4 max-w-xl text-muted-foreground">
              Real feedback from clients and collaborators on the systems
              we've shipped together.
            </p>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="inline-flex items-center gap-2 rounded-lg border border-primary/40 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary/20">
                <MessageSquarePlus className="h-4 w-4" />
                Share your experience
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl">
                  Submit a testimonial
                </DialogTitle>
                <DialogDescription>
                  Share a short note about working with me. It will appear here
                  once approved.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} noValidate className="mt-2 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="t-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Name *
                    </Label>
                    <Input
                      id="t-name"
                      maxLength={100}
                      value={form.name}
                      onChange={handleField("name")}
                      aria-invalid={!!errors.name}
                      placeholder="Jane Doe"
                    />
                    {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="t-role" className="text-xs uppercase tracking-wider text-muted-foreground">
                      Role
                    </Label>
                    <Input
                      id="t-role"
                      maxLength={100}
                      value={form.role}
                      onChange={handleField("role")}
                      placeholder="Founder"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="t-company" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Company
                  </Label>
                  <Input
                    id="t-company"
                    maxLength={100}
                    value={form.company}
                    onChange={handleField("company")}
                    placeholder="Acme Inc."
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">
                    Rating
                  </Label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, rating: n }))}
                        className="rounded p-1 transition-transform hover:scale-110"
                        aria-label={`${n} star${n > 1 ? "s" : ""}`}
                      >
                        <Star
                          className={
                            "h-6 w-6 " +
                            (n <= form.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground")
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="t-message" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Testimonial *
                  </Label>
                  <Textarea
                    id="t-message"
                    rows={5}
                    maxLength={600}
                    value={form.message}
                    onChange={handleField("message")}
                    aria-invalid={!!errors.message}
                    placeholder="Share what stood out about working together…"
                    className="resize-none"
                  />
                  <div className="flex items-center justify-between">
                    {errors.message ? (
                      <p className="text-xs text-destructive">{errors.message}</p>
                    ) : (
                      <span />
                    )}
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {form.message.length}/600
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary-glow glow-sm hover:glow-ring disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting…
                    </>
                  ) : (
                    <>
                      Submit testimonial
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Grid */}
        <div className="mt-12">
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-56 animate-pulse rounded-2xl border border-border bg-surface/40"
                />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface/20 p-12 text-center">
              <Quote className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-4 text-muted-foreground">
                No testimonials yet — be the first to share your experience.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((t) => (
                <article
                  key={t.id}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-surface/40 p-6 backdrop-blur-sm transition-all hover:border-primary/40"
                >
                  <Quote className="h-7 w-7 text-primary/70" />
                  <p className="mt-4 text-sm leading-relaxed text-foreground">
                    "{t.message}"
                  </p>
                  <div className="mt-6 flex items-end justify-between">
                    <div>
                      <div className="font-display text-base font-semibold text-foreground">
                        {t.name}
                      </div>
                      {(t.role || t.company) && (
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {[t.role, t.company].filter(Boolean).join(" · ")}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={
                            "h-3.5 w-3.5 " +
                            (i < t.rating
                              ? "fill-primary text-primary"
                              : "text-muted-foreground/40")
                          }
                        />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
