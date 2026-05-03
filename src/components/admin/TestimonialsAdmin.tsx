import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Check, Trash2, Loader2, X } from "lucide-react";

interface T {
  id: string; name: string; role: string | null; company: string | null;
  message: string; rating: number; approved: boolean; created_at: string;
}

export function TestimonialsAdmin() {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
    setItems((data ?? []) as T[]);
    setLoading(false);
  }
  useEffect(() => { void load(); }, []);

  async function approve(id: string, approved: boolean) {
    const { error } = await supabase.from("testimonials").update({ approved }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(approved ? "Approved" : "Unapproved");
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete testimonial?")) return;
    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return toast.error(error.message);
    load();
  }

  if (loading) return <Loader2 className="mx-auto h-6 w-6 animate-spin" />;

  return (
    <div className="space-y-3">
      {items.length === 0 && <p className="text-sm text-muted-foreground">No testimonials yet.</p>}
      {items.map((t) => (
        <div key={t.id} className="rounded-xl border border-border bg-surface/40 p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-semibold">{t.name} <span className="ml-2 text-xs text-muted-foreground">{t.rating}★</span></div>
              <div className="text-xs text-muted-foreground">{[t.role, t.company].filter(Boolean).join(" · ")}</div>
            </div>
            <span className={`rounded-full px-2 py-0.5 text-xs ${t.approved ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
              {t.approved ? "Approved" : "Pending"}
            </span>
          </div>
          <p className="mt-3 text-sm">{t.message}</p>
          <div className="mt-4 flex gap-2">
            {!t.approved ? (
              <button onClick={() => approve(t.id, true)} className="btn-primary"><Check className="h-4 w-4" /> Approve</button>
            ) : (
              <button onClick={() => approve(t.id, false)} className="btn-secondary"><X className="h-4 w-4" /> Unapprove</button>
            )}
            <button onClick={() => remove(t.id)} className="btn-danger"><Trash2 className="h-4 w-4" /> Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
