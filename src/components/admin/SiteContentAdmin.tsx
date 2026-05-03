import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Save, Loader2 } from "lucide-react";

type Hero = { badge: string; name: string; tagline: string; available: boolean };
type About = { heading: string; headingAccent: string; paragraphs: string[] };
type Contact = {
  heading: string; headingAccent: string; intro: string;
  email: string; linkedin: string; linkedinLabel: string; github: string;
};

export function SiteContentAdmin() {
  const [hero, setHero] = useState<Hero | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_content").select("key,value");
      const m = Object.fromEntries((data ?? []).map((r: any) => [r.key, r.value]));
      setHero(m.hero ?? null); setAbout(m.about ?? null); setContact(m.contact ?? null);
      setLoading(false);
    })();
  }, []);

  async function save(key: string, value: any) {
    const { error } = await supabase.from("site_content").upsert({ key, value });
    if (error) return toast.error(error.message);
    toast.success(`${key} saved`);
  }

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  return (
    <div className="space-y-8">
      {hero && (
        <section className="rounded-xl border border-border bg-surface/40 p-5">
          <h3 className="font-display text-lg font-semibold">Hero</h3>
          <div className="mt-4 grid gap-3">
            <input className="input" placeholder="Badge" value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
            <input className="input" placeholder="Name" value={hero.name} onChange={(e) => setHero({ ...hero, name: e.target.value })} />
            <textarea className="input" rows={3} placeholder="Tagline" value={hero.tagline} onChange={(e) => setHero({ ...hero, tagline: e.target.value })} />
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={hero.available} onChange={(e) => setHero({ ...hero, available: e.target.checked })} />
              Show "Available" badge
            </label>
          </div>
          <button onClick={() => save("hero", hero)} className="btn-primary mt-4"><Save className="h-4 w-4" /> Save Hero</button>
        </section>
      )}

      {about && (
        <section className="rounded-xl border border-border bg-surface/40 p-5">
          <h3 className="font-display text-lg font-semibold">About</h3>
          <div className="mt-4 grid gap-3">
            <input className="input" placeholder="Heading" value={about.heading} onChange={(e) => setAbout({ ...about, heading: e.target.value })} />
            <input className="input" placeholder="Heading accent (gradient)" value={about.headingAccent} onChange={(e) => setAbout({ ...about, headingAccent: e.target.value })} />
            <textarea className="input" rows={6} placeholder="One paragraph per line" value={about.paragraphs.join("\n\n")} onChange={(e) => setAbout({ ...about, paragraphs: e.target.value.split("\n\n").filter(Boolean) })} />
          </div>
          <button onClick={() => save("about", about)} className="btn-primary mt-4"><Save className="h-4 w-4" /> Save About</button>
        </section>
      )}

      {contact && (
        <section className="rounded-xl border border-border bg-surface/40 p-5">
          <h3 className="font-display text-lg font-semibold">Contact</h3>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="Heading" value={contact.heading} onChange={(e) => setContact({ ...contact, heading: e.target.value })} />
            <input className="input" placeholder="Heading accent" value={contact.headingAccent} onChange={(e) => setContact({ ...contact, headingAccent: e.target.value })} />
            <textarea className="input md:col-span-2" rows={3} placeholder="Intro" value={contact.intro} onChange={(e) => setContact({ ...contact, intro: e.target.value })} />
            <input className="input" placeholder="Email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            <input className="input" placeholder="LinkedIn URL" value={contact.linkedin} onChange={(e) => setContact({ ...contact, linkedin: e.target.value })} />
            <input className="input" placeholder="LinkedIn label" value={contact.linkedinLabel} onChange={(e) => setContact({ ...contact, linkedinLabel: e.target.value })} />
            <input className="input" placeholder="GitHub" value={contact.github} onChange={(e) => setContact({ ...contact, github: e.target.value })} />
          </div>
          <button onClick={() => save("contact", contact)} className="btn-primary mt-4"><Save className="h-4 w-4" /> Save Contact</button>
        </section>
      )}
    </div>
  );
}
