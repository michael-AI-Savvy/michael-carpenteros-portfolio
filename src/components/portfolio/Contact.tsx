import { useState } from "react";
import { Mail, Linkedin, ArrowRight, Send, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.134 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .nonempty({ message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email" })
    .max(255, { message: "Email must be less than 255 characters" }),
  subject: z
    .string()
    .trim()
    .nonempty({ message: "Subject is required" })
    .max(150, { message: "Subject must be less than 150 characters" }),
  message: z
    .string()
    .trim()
    .nonempty({ message: "Message is required" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type FormErrors = Partial<Record<keyof z.infer<typeof contactSchema>, string>>;

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as keyof FormErrors;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      });
      setErrors(fieldErrors);
      toast.error("Please fix the errors in the form.");
      return;
    }

    setSubmitting(true);
    const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (!formspreeEndpoint) {
      const mailto = new URL("mailto:michaelcarpenteros@gmail.com");
      mailto.searchParams.set("subject", result.data.subject);
      mailto.searchParams.set(
        "body",
        `Name: ${result.data.name}\nEmail: ${result.data.email}\n\n${result.data.message}`,
      );
      window.location.href = mailto.toString();
      setSubmitting(false);
      return;
    }

    try {
      const res = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.error("Contact send failed", res.status, body);
        toast.error("Couldn't send your message", {
          description: "Please try again in a moment, or email me directly.",
        });
        return;
      }

      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll reply as soon as I can.",
      });
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      console.error("Contact send error", err);
      toast.error("Network error", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-surface/40 p-8 backdrop-blur-md md:p-12">
          <div className="absolute inset-0 grid-pattern opacity-40" />
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left: Heading + contact links */}
            <div>
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
                <span className="font-mono text-xs uppercase tracking-widest text-primary">
                  04 / Contact
                </span>
              </div>
              <h2 className="mt-6 font-display text-4xl font-bold leading-tight md:text-5xl">
                Let's automate <br />
                <span className="text-gradient">your next idea.</span>
              </h2>
              <p className="mt-5 text-muted-foreground">
                Open to consulting, freelance projects, and full-time
                opportunities. Reach out and let's build something that scales.
              </p>

              <div className="mt-8 space-y-3">
                <a
                  href="mailto:michaelcarpenteros@gmail.com"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "mailto:michaelcarpenteros@gmail.com",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="group flex items-center justify-between rounded-xl border border-border bg-background/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Email
                      </div>
                      <div className="truncate text-sm font-medium text-foreground">
                        michaelcarpenteros@gmail.com
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
                </a>

                <a
                  href="https://www.linkedin.com/in/michael-carpenteros-4462b213a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://www.linkedin.com/in/michael-carpenteros-4462b213a/",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="group flex items-center justify-between rounded-xl border border-border bg-background/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <Linkedin className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        LinkedIn
                      </div>
                      <div className="truncate text-sm font-medium text-foreground">
                        /in/michael-carpenteros-4462b213a
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
                </a>

                <a
                  href="https://wa.me/639154981984"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://wa.me/639154981984",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="group flex items-center justify-between rounded-xl border border-border bg-background/50 p-4 transition-all hover:border-primary/50 hover:bg-primary/5"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <WhatsAppIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        WhatsApp
                      </div>
                      <div className="truncate text-sm font-medium text-foreground">
                        +639154981984
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:text-primary group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right: Contact form */}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border bg-background/60 p-6 backdrop-blur-sm md:p-8"
            >
              <div className="mb-6">
                <h3 className="font-display text-2xl font-semibold text-foreground">
                  Send a message
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill out the form and I'll get back to you within 24 hours.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="contact-name" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Name
                  </Label>
                  <Input
                    id="contact-name"
                    placeholder="Your full name"
                    maxLength={100}
                    value={form.name}
                    onChange={handleChange("name")}
                    aria-invalid={!!errors.name}
                    className="border-border bg-background/40"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="contact-email" className="text-xs uppercase tracking-wider text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    placeholder="you@company.com"
                    maxLength={255}
                    value={form.email}
                    onChange={handleChange("email")}
                    aria-invalid={!!errors.email}
                    className="border-border bg-background/40"
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-4 space-y-1.5">
                <Label htmlFor="contact-subject" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Subject
                </Label>
                <Input
                  id="contact-subject"
                  placeholder="What's this about?"
                  maxLength={150}
                  value={form.subject}
                  onChange={handleChange("subject")}
                  aria-invalid={!!errors.subject}
                  className="border-border bg-background/40"
                />
                {errors.subject && (
                  <p className="text-xs text-destructive">{errors.subject}</p>
                )}
              </div>

              <div className="mt-4 space-y-1.5">
                <Label htmlFor="contact-message" className="text-xs uppercase tracking-wider text-muted-foreground">
                  Message
                </Label>
                <Textarea
                  id="contact-message"
                  placeholder="Tell me about your project, goals, and timeline…"
                  rows={5}
                  maxLength={1000}
                  value={form.message}
                  onChange={handleChange("message")}
                  aria-invalid={!!errors.message}
                  className="resize-none border-border bg-background/40"
                />
                <div className="flex items-center justify-between">
                  {errors.message ? (
                    <p className="text-xs text-destructive">{errors.message}</p>
                  ) : (
                    <span />
                  )}
                  <span className="text-[10px] font-mono text-muted-foreground">
                    {form.message.length}/1000
                  </span>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary-glow glow-sm hover:glow-ring disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Michael Carpenteros. All rights reserved.</div>
          <div className="font-mono">AI Automation & CRM Specialist</div>
        </footer>
      </div>
    </section>
  );
}
