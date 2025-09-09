"use client";

import { useEffect, useState } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";

interface MeResponse {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  profileImage?: string;
}

export default function AccountPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/user`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const data = await res.json();
        if (!res.ok) throw new Error(data?.msg || "Failed to fetch account");
        setMe(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch account"
        );
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
            <div className="flex flex-col gap-6 py-6">
              <div className="px-4 lg:px-6">
                <h1 className="text-2xl font-semibold">Account</h1>
              </div>
              <div className="px-4 lg:px-6">
                {loading && <div>Loading...</div>}
                {error && <div className="text-red-500">{error}</div>}
                {!loading && !error && me && (
                  <div className="max-w-xl rounded-md border p-4">
                    <div className="flex items-center gap-4">
                      <div className="size-16 rounded-full bg-neutral-200 overflow-hidden">
                        {me.profileImage ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={me.profileImage}
                            alt="Profile"
                            className="h-full w-full object-cover"
                          />
                        ) : null}
                      </div>
                      <div>
                        <div className="text-lg font-medium">
                          {me.firstname} {me.lastname}
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          @{me.username}
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-1 text-sm">
                      <div>
                        <span className="font-medium">Email:</span> {me.email}
                      </div>
                      <div>
                        <span className="font-medium">Role:</span> {me.role}
                      </div>
                      <div>
                        <span className="font-medium">User ID:</span> {me.id}
                      </div>
                    </div>
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
