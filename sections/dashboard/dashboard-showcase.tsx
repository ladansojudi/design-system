"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { OverviewTab } from "@/sections/dashboard/overview-tab";
import { DetailsTab } from "@/sections/dashboard/details-tab";
import { ComplianceTab } from "@/sections/dashboard/compliance-tab";
import { AppSidebar } from "@/sections/dashboard/app-sidebar";
import { AppTopbar } from "@/sections/dashboard/app-topbar";
import { ExampleCard } from "@/components/styleguide/example-card";

type Tab = "overview" | "details" | "compliance";

const TABS: { key: Tab; label: string }[] = [
  { key: "overview",   label: "Overview"   },
  { key: "details",    label: "Details"    },
  { key: "compliance", label: "Compliance" },
];

export function DashboardShowcase() {
  const [tab, setTab] = useState<Tab>("overview");

  return (
    <div className="flex rounded-xl border border-snt-neutral-divider-10 bg-snt-surface-page overflow-hidden">
      {/* App sidebar */}
      <AppSidebar />

      {/* Main column */}
      <div className="flex-1 min-w-0 flex flex-col">
        <AppTopbar />

      {/* Page header */}
      <div className="px-5 sm:px-7 pt-6 bg-snt-surface-app">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[22px] font-bold text-snt-text-primary">Dashboard</h2>
          <div className="flex items-center gap-2.5">
            <button type="button" className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-snt-btn-primary-600 text-snt-text-on-accent text-[14px] font-medium hover:bg-snt-btn-primary-700 transition-colors">
              Start a Scan <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20"><ArrowRight size={11} /></span>
            </button>
            <button type="button" className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary hover:bg-snt-neutral-grey-100 transition-colors">
              Scan Reports <span className="text-snt-brand-primary-500">24 new!</span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-snt-brand-primary-500 text-white"><ArrowRight size={11} /></span>
            </button>
            <button type="button" className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary hover:bg-snt-neutral-grey-100 transition-colors">
              Add Asset <span className="text-snt-text-disabled">12 in total</span>
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-snt-brand-primary-500 text-white"><Plus size={11} /></span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-6 mt-5 border-b border-snt-neutral-divider-10 -mx-5 sm:-mx-7 px-5 sm:px-7">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={cn(
                "relative pb-3 text-[14px] font-medium transition-colors",
                tab === t.key ? "text-snt-text-primary" : "text-snt-text-secondary hover:text-snt-text-primary",
              )}
            >
              {t.label}
              {tab === t.key && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-snt-text-primary rounded-full" />}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-5 sm:px-7 py-6">
        {tab === "overview"   && <OverviewTab />}
        {tab === "details"    && <DetailsTab />}
        {tab === "compliance" && <ComplianceTab />}
      </div>
      </div>
    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function DashboardExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Full dashboard layout"
        density="tall"
        code={`<DashboardLayout
  sidebar={<AppSidebar />}
  topbar={<AppTopbar />}
  header={
    <DashboardHeader
      title="Dashboard"
      actions={[
        <Button intent="primary">Start a Scan</Button>,
        <Button variant="outline">Scan Reports</Button>,
        <Button variant="outline">Add Asset</Button>,
      ]}
    />
  }
  tabs={[
    { key: "overview",   label: "Overview",   content: <OverviewTab /> },
    { key: "details",    label: "Details",    content: <DetailsTab /> },
    { key: "compliance", label: "Compliance", content: <ComplianceTab /> },
  ]}
/>`}
        preview={
          <div className="w-full">
            <DashboardShowcase />
          </div>
        }
      />
      <ExampleCard
        title="Page header with action group"
        density="tall"
        code={`<DashboardHeader title="Dashboard">
  <Button intent="primary" trailing={<ArrowRight />}>Start a Scan</Button>
  <Button variant="outline">Scan Reports <Tag>24 new!</Tag></Button>
  <Button variant="outline">Add Asset <Tag tone="muted">12 in total</Tag></Button>
</DashboardHeader>`}
        preview={
          <div className="w-full bg-snt-surface-app rounded-xl border border-snt-neutral-divider-10 px-5 sm:px-7 py-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-[22px] font-bold text-snt-text-primary">Dashboard</h2>
              <div className="flex items-center gap-2.5">
                <span className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-snt-btn-primary-600 text-snt-text-on-accent text-[14px] font-medium">
                  Start a Scan <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/20"><ArrowRight size={11} /></span>
                </span>
                <span className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary">
                  Scan Reports <span className="text-snt-brand-primary-500">24 new!</span>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-snt-brand-primary-500 text-white"><ArrowRight size={11} /></span>
                </span>
                <span className="inline-flex items-center gap-2 h-9 px-3 rounded-lg border border-snt-neutral-divider-10 text-[14px] font-medium text-snt-text-primary">
                  Add Asset <span className="text-snt-text-disabled">12 in total</span>
                  <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-snt-brand-primary-500 text-white"><Plus size={11} /></span>
                </span>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}
