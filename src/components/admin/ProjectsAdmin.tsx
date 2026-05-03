import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";

interface Project {
  id?: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  image_url: string | null;
  image_key: string | null;
  sort_order: number;
}

const empty: Project = {
  title: "", category: "", description: "", tags: [],
  image_url: "", image_key: "", sort_order: 0,
};

export function ProjectsAdmin() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("projects").select("*").order("sort_order");
    setItems((data ?? []) as Project[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  function update(idx: number, patch: Partial<Project>) {
    setItems((p) => p.map((it, i) => i === idx ? { ...it, ...patch } : it));
  }

  async function save(p: Project) {
    setSaving(p.id ?? "new");
    const payload = { ...p, image_url: p.image_url || null, image_key: p.image_key || null };
    const res = p.id
      ? await supabase.from("projects").update(payload).eq("id", p.id)
      : await supabase.from("projects").insert(payload);
    setSaving(null);
    if (res.error) return toast.error(res.error.message);
    toast.success("Saved");
    load();
  }

  async function remove(id?: string) {
    if (!id) { setItems((p) => p.filter((x) => x.id)); return; }
    if (!confirm("Delete this project?")) return;
    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  }

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  return (
    <div className="space-y-6">
      <button
        onClick={() => setItems((p) => [...p, { ...empty, sort_order: p.length + 1 }])}
        className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
      >
        <Plus className="h-4 w-4" /> Add Project
      </button>

      {items.map((p, i) => (
        <div key={p.id ?? `new-${i}`} className="rounded-xl border border-border bg-surface/40 p-5">
          <div className="grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="Title" value={p.title} onChange={(e) => update(i, { title: e.target.value })} />
            <input className="input" placeholder="Category" value={p.category} onChange={(e) => update(i, { category: e.target.value })} />
          </div>
          <textarea className="input mt-3" rows={3} placeholder="Description" value={p.description} onChange={(e) => update(i, { description: e.target.value })} />
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="Tags (comma separated)" value={p.tags.join(", ")} onChange={(e) => update(i, { tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean) })} />
            <input className="input" type="number" placeholder="Sort order" value={p.sort_order} onChange={(e) => update(i, { sort_order: Number(e.target.value) })} />
          </div>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            <input className="input" placeholder="Image URL (optional)" value={p.image_url ?? ""} onChange={(e) => update(i, { image_url: e.target.value })} />
            <input className="input" placeholder="Image key (built-in asset)" value={p.image_key ?? ""} onChange={(e) => update(i, { image_key: e.target.value })} />
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={() => save(p)} disabled={saving === (p.id ?? "new")} className="btn-primary">
              {saving === (p.id ?? "new") ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
            </button>
            <button onClick={() => remove(p.id)} className="btn-danger"><Trash2 className="h-4 w-4" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
