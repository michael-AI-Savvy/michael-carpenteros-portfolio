import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, LogOut, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProjectsAdmin } from "@/components/admin/ProjectsAdmin";
import { SkillsAdmin } from "@/components/admin/SkillsAdmin";
import { CertificationsAdmin } from "@/components/admin/CertificationsAdmin";
import { StatsAdmin } from "@/components/admin/StatsAdmin";
import { HighlightsAdmin } from "@/components/admin/HighlightsAdmin";
import { SiteContentAdmin } from "@/components/admin/SiteContentAdmin";
import { TestimonialsAdmin } from "@/components/admin/TestimonialsAdmin";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/login" });
      return;
    }
    setChecked(true);
  }, [user, loading, navigate]);

  if (loading || !checked) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  if (!isAdmin) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md rounded-2xl border border-border bg-surface/50 p-8 text-center backdrop-blur-md">
          <h1 className="font-display text-2xl font-bold">Access Denied</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account ({user?.email}) is not an admin yet. Use the Lovable Cloud → Database panel to add a row to the
            <code className="mx-1 rounded bg-background px-1 py-0.5 font-mono text-xs">user_roles</code>
            table with your user ID and role <code className="mx-1 rounded bg-background px-1 py-0.5 font-mono text-xs">admin</code>.
          </p>
          <p className="mt-3 font-mono text-xs text-primary">Your user ID: {user?.id}</p>
          <button
            onClick={async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); }}
            className="mt-6 inline-flex items-center gap-2 rounded-md border border-border bg-background/50 px-4 py-2 text-sm hover:bg-surface"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
              <ArrowLeft className="h-4 w-4" /> Back to site
            </Link>
            <h1 className="font-display text-xl font-bold">Content Admin</h1>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              toast.success("Signed out");
              navigate({ to: "/login" });
            }}
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface/40 px-3 py-1.5 text-sm hover:bg-surface"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <Tabs defaultValue="projects">
          <TabsList className="flex w-full flex-wrap">
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="highlights">About Highlights</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="content">Hero / About / Contact</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          </TabsList>
          <TabsContent value="projects" className="mt-6"><ProjectsAdmin /></TabsContent>
          <TabsContent value="skills" className="mt-6"><SkillsAdmin /></TabsContent>
          <TabsContent value="certifications" className="mt-6"><CertificationsAdmin /></TabsContent>
          <TabsContent value="highlights" className="mt-6"><HighlightsAdmin /></TabsContent>
          <TabsContent value="stats" className="mt-6"><StatsAdmin /></TabsContent>
          <TabsContent value="content" className="mt-6"><SiteContentAdmin /></TabsContent>
          <TabsContent value="testimonials" className="mt-6"><TestimonialsAdmin /></TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
