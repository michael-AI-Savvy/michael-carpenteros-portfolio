import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

interface Stat { id?: string; value: string; label: string; sort_order: number; }

export function StatsAdmin() {
  const [items, setItems] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("stats").select("*").order("sort_order");
    setItems((data ?? []) as Stat[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  function update(i: number, patch: Partial<Stat>) {
    setItems((p) => p.map((it, idx) => idx === i ? { ...it, ...patch } : it));
  }

  async function save(s: Stat) {
    const res = s.id
      ? await supabase.from("stats").update(s).eq("id", s.id)
      : await supabase.from("stats").insert(s);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved"); load();
  }

  async function remove(id?: string) {
    if (!id) { setItems((p) => p.filter((x) => x.id)); return; }
    const { error } = await supabase.from("stats").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  return (
    <div className="space-y-4">
      <button onClick={() => setItems((p) => [...p, { value: "", label: "", sort_order: p.length + 1 }])} className="btn-primary">
        <Plus className="h-4 w-4" /> Add Stat
      </button>
      {items.map((s, i) => (
        <div key={s.id ?? `new-${i}`} className="grid gap-3 rounded-xl border border-border bg-surface/40 p-4 md:grid-cols-[1fr_2fr_100px_auto_auto]">
          <input className="input" placeholder="Value (e.g. 8+)" value={s.value} onChange={(e) => update(i, { value: e.target.value })} />
          <input className="input" placeholder="Label" value={s.label} onChange={(e) => update(i, { label: e.target.value })} />
          <input className="input" type="number" placeholder="Sort" value={s.sort_order} onChange={(e) => update(i, { sort_order: Number(e.target.value) })} />
          <button onClick={() => save(s)} className="btn-primary"><Save className="h-4 w-4" /></button>
          <button onClick={() => remove(s.id)} className="btn-danger"><Trash2 className="h-4 w-4" /></button>
        </div>
      ))}
    </div>
  );
}
