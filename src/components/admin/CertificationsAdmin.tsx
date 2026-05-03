import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

interface Cert {
  id?: string; title: string; short_title: string; instructor: string;
  issue_date: string; length: string; issuer: string; category: string;
  image_url: string | null; image_key: string | null; sort_order: number;
}

const empty: Cert = {
  title: "", short_title: "", instructor: "", issue_date: "", length: "",
  issuer: "", category: "", image_url: "", image_key: "", sort_order: 0,
};

export function CertificationsAdmin() {
  const [items, setItems] = useState<Cert[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("certifications").select("*").order("sort_order");
    setItems((data ?? []) as Cert[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  function update(i: number, patch: Partial<Cert>) {
    setItems((p) => p.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  }

  async function save(c: Cert) {
    const payload = { ...c, image_url: c.image_url || null, image_key: c.image_key || null };
    const res = c.id
      ? await supabase.from("certifications").update(payload).eq("id", c.id)
      : await supabase.from("certifications").insert(payload);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved"); load();
  }

  async function remove(id?: string) {
    if (!id) { setItems((p) => p.filter((x) => x.id)); return; }
    if (!confirm("Delete certification?")) return;
    const { error } = await supabase.from("certifications").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  return (
    <div className="space-y-6">
      <button onClick={() => setItems((p) => [...p, { ...empty, sort_order: p.length + 1 }])} className="btn-primary">
        <Plus className="h-4 w-4" /> Add Certification
      </button>
      {items.map((c, i) => (
        <div key={c.id ?? `new-${i}`} className="rounded-xl border border-border bg-surface/40 p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="Full title" value={c.title} onChange={(e) => update(i, { title: e.target.value })} />
            <input className="input" placeholder="Short title" value={c.short_title} onChange={(e) => update(i, { short_title: e.target.value })} />
            <input className="input" placeholder="Instructor" value={c.instructor ?? ""} onChange={(e) => update(i, { instructor: e.target.value })} />
            <input className="input" placeholder="Issuer" value={c.issuer ?? ""} onChange={(e) => update(i, { issuer: e.target.value })} />
            <input className="input" placeholder="Issue date" value={c.issue_date ?? ""} onChange={(e) => update(i, { issue_date: e.target.value })} />
            <input className="input" placeholder="Length (e.g. 2 hours)" value={c.length ?? ""} onChange={(e) => update(i, { length: e.target.value })} />
            <input className="input" placeholder="Category" value={c.category ?? ""} onChange={(e) => update(i, { category: e.target.value })} />
            <input className="input" type="number" placeholder="Sort" value={c.sort_order} onChange={(e) => update(i, { sort_order: Number(e.target.value) })} />
            <input className="input" placeholder="Image URL" value={c.image_url ?? ""} onChange={(e) => update(i, { image_url: e.target.value })} />
            <input className="input" placeholder="Image key" value={c.image_key ?? ""} onChange={(e) => update(i, { image_key: e.target.value })} />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => save(c)} className="btn-primary"><Save className="h-4 w-4" /> Save</button>
            <button onClick={() => remove(c.id)} className="btn-danger"><Trash2 className="h-4 w-4" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
