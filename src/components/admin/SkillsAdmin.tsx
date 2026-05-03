import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Trash2, Loader2 } from "lucide-react";

interface Skill { id?: string; name: string; sort_order: number; }

export function SkillsAdmin() {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("skills").select("*").order("sort_order");
    setItems((data ?? []) as Skill[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  async function add() {
    if (!newName.trim()) return;
    const { error } = await supabase.from("skills").insert({ name: newName.trim(), sort_order: items.length + 1 });
    if (error) return toast.error(error.message);
    setNewName("");
    toast.success("Added");
    load();
  }

  async function remove(id?: string) {
    if (!id) return;
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  async function rename(id: string, name: string) {
    const { error } = await supabase.from("skills").update({ name }).eq("id", id);
    if (error) return toast.error(error.message);
  }

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  return (
    <div>
      <div className="flex gap-2">
        <input className="input flex-1" placeholder="New skill" value={newName} onChange={(e) => setNewName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} />
        <button onClick={add} className="btn-primary"><Plus className="h-4 w-4" /> Add</button>
      </div>
      <div className="mt-6 grid gap-2">
        {items.map((s) => (
          <div key={s.id} className="flex items-center gap-2 rounded-md border border-border bg-surface/40 p-2">
            <input
              className="input flex-1"
              defaultValue={s.name}
              onBlur={(e) => e.target.value !== s.name && s.id && rename(s.id, e.target.value)}
            />
            <button onClick={() => remove(s.id)} className="btn-danger"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
