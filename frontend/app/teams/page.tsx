"use client";

import { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

interface TeamItem {
  id: string;
  name: string;
  description?: string;
  users: Array<{ name?: string; email?: string }>;
  project?: { name?: string } | string;
}

export default function TeamsPage() {
  const [teams, setTeams] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/teams`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        if (!res.ok)
          throw new Error(data?.error || data?.msg || "Failed to fetch teams");
        setTeams(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch teams");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-semibold">Teams</h1>
              </div>
              <div className="px-4 lg:px-6">
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {!loading && !error && (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {teams.map((t) => (
                      <div key={t.id} className="rounded-md border p-4">
                        <div className="font-medium">{t.name}</div>
                        {t.project && (
                          <div className="text-sm text-neutral-600 dark:text-neutral-400">
                            Project:{" "}
                            {typeof t.project === "string"
                              ? t.project
                              : t.project?.name}
                          </div>
                        )}
                        <div className="mt-2 text-sm">
                          Members:{" "}
                          {t.users?.map((u) => u.name || u.email).join(", ")}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
