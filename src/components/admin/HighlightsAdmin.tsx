import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

interface H {
  id?: string; icon: string; title: string; description: string; details: string; sort_order: number;
}

const empty: H = { icon: "Workflow", title: "", description: "", details: "", sort_order: 0 };

export function HighlightsAdmin() {
  const [items, setItems] = useState<H[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("about_highlights").select("*").order("sort_order");
    setItems((data ?? []) as H[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  function update(i: number, patch: Partial<H>) {
    setItems((p) => p.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  }

  async function save(h: H) {
    const res = h.id
      ? await supabase.from("about_highlights").update(h).eq("id", h.id)
      : await supabase.from("about_highlights").insert(h);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved"); load();
  }

  async function remove(id?: string) {
    if (!id) { setItems((p) => p.filter((x) => x.id)); return; }
    const { error } = await supabase.from("about_highlights").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Available icons: <code className="font-mono text-xs">Workflow, Bot, BarChart3, Link2, Zap</code>
      </p>
      <button onClick={() => setItems((p) => [...p, { ...empty, sort_order: p.length + 1 }])} className="btn-primary">
        <Plus className="h-4 w-4" /> Add Highlight
      </button>
      {items.map((h, i) => (
        <div key={h.id ?? `new-${i}`} className="rounded-xl border border-border bg-surface/40 p-5">
          <div className="grid gap-3 md:grid-cols-[120px_1fr_100px]">
            <input className="input" placeholder="Icon" value={h.icon} onChange={(e) => update(i, { icon: e.target.value })} />
            <input className="input" placeholder="Title" value={h.title} onChange={(e) => update(i, { title: e.target.value })} />
            <input className="input" type="number" placeholder="Sort" value={h.sort_order} onChange={(e) => update(i, { sort_order: Number(e.target.value) })} />
          </div>
          <textarea className="input mt-3" rows={2} placeholder="Short description (card)" value={h.description} onChange={(e) => update(i, { description: e.target.value })} />
          <textarea className="input mt-3" rows={4} placeholder="Full details (modal)" value={h.details} onChange={(e) => update(i, { details: e.target.value })} />
          <div className="mt-4 flex gap-2">
            <button onClick={() => save(h)} className="btn-primary"><Save className="h-4 w-4" /> Save</button>
            <button onClick={() => remove(h.id)} className="btn-danger"><Trash2 className="h-4 w-4" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
