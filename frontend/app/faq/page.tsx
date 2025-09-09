"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function FAQPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1">
          {/* Left 40% */}
          <div className="w-2/5 p-8 bg-muted">
            <h1 className="text-3xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-muted-foreground">
              Here you'll find answers to the most common questions about using the platform.
            </p>
          </div>

          {/* Right 60% */}
          <div className="w-3/5 p-8 space-y-6 overflow-y-auto">
            <div>
              <h2 className="text-xl font-semibold">How do I add a new project?</h2>
              <p className="text-muted-foreground">
                Use the "Add Project" button on the dashboard to create a new project. Fill out the form and submit.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Can I invite team members?</h2>
              <p className="text-muted-foreground">
                Yes, navigate to the "Team" section in the sidebar and click "Create Team" to manage members.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Where do I manage tasks?</h2>
              <p className="text-muted-foreground">
                Go to the "Tasks" section or use the "Add Task" button on the dashboard to manage them.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Need more help?</h2>
              <p className="text-muted-foreground">
                Contact our support team by clicking the button below.
              </p>
              <button className="mt-2 px-4 py-2 border rounded text-sm hover:bg-accent">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
