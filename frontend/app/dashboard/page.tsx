"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { DataTable } from "@/components/data-table";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import { CardWithForm } from "@/components/cardWithForm";
import { useState } from "react";
import { TaskForm } from "@/components/TaskForm";
import { TeamForm } from "@/components/TeamForm";

export default function DashboardPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [showTaskPopup, setShowTaskPopup] = useState(false);
  const [showTeamPopup, setShowTeamPopup] = useState(false);

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
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* <SectionCards /> */}

              {/* Action row */}
              <div className="px-4 lg:px-6">
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    className="h-10 px-4"
                    onClick={() => setShowPopup(true)}
                  >
                    Add Project
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 px-4"
                    onClick={() => setShowTaskPopup(true)}
                  >
                    Add Task
                  </Button>
                  <Button
                    variant="outline"
                    className="h-10 px-4"
                    onClick={() => setShowTeamPopup(true)}
                  >
                    Create Team
                  </Button>
                </div>
              </div>

              {/* Popup with form */}
              {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <CardWithForm />
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowPopup(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Task Popup */}
              {showTaskPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <TaskForm onSuccess={() => setShowTaskPopup(false)} />{" "}
                    {/* Replace with <TaskForm /> if using a separate form */}
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowTaskPopup(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {showTeamPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-30">
                  <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                    <TeamForm onSuccess={() => setShowTeamPopup(false)} />{" "}
                    <div className="mt-4 flex justify-end">
                      <Button
                        variant="outline"
                        onClick={() => setShowTeamPopup(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="px-4 lg:px-6">
                {/* <ChartAreaInteractive /> */}
                <Calendar />
              </div>
              <DataTable />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
