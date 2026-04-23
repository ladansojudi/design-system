import type { Metadata } from "next";
import { ArrowRight, Link2, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/styleguide/page-header";
import { CardsShowcase } from "@/sections/cards/cards-showcase";
import { StatCardShowcase } from "@/sections/stat-card/stat-card-showcase";
import { Anatomy, UseCases, Guidelines } from "@/components/styleguide/component-docs";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export const metadata: Metadata = {
  title: "Cards — s4e Design System",
};

export default function Page() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-10 max-w-4xl mx-auto space-y-8">
      <PageHeader
        category="Organisms"
        title="Cards"
        description="Content surfaces for dashboards — Stat Card for single metrics, Insight and Alert Cards for structured content."
      />

      <Tabs defaultValue="insight-alert" className="gap-8">
        <TabsList>
          <TabsTrigger value="insight-alert">Insight & Alert</TabsTrigger>
          <TabsTrigger value="stat-card">Stat Card</TabsTrigger>
        </TabsList>

        <TabsContent value="insight-alert" className="space-y-10">
          <CardsShowcase />

          <Anatomy
            parts={[
              { label: "Header bar",  description: "Grey-100 strip with card title on the left and an active-count pill on the right." },
              { label: "Pulse dot",   description: "Animated red dot that signals an actionable alert is live." },
              { label: "Body",        description: "Primary content area — alert title + description or metric rows." },
              { label: "Action link", description: "Text-style link with arrow that directs the user to the fix or detail view." },
            ]}
          >
            <div className="w-80 rounded-xl overflow-hidden border border-s4e-neutral-divider-10 bg-s4e-surface-app">
              <div className="flex items-center justify-between px-4 py-2 bg-s4e-neutral-grey-100 border-b border-s4e-neutral-divider-10">
                <span className="text-[12px] font-semibold text-s4e-text-primary">Attention Needed</span>
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-s4e-scale-red-50 text-[11px] font-semibold text-s4e-scale-red-600">
                  <span className="s4e-pulse-dot w-[6px] h-[6px] rounded-full bg-s4e-scale-red-500 shrink-0" />
                  2 Active
                </span>
              </div>
              <div className="px-4 py-4 space-y-4">
                <div>
                  <div className="text-[13px] font-semibold text-s4e-text-primary">Security Blind Spots</div>
                  <p className="text-[12px] text-s4e-text-disabled leading-relaxed">Assets excluded from scheduled scans.</p>
                </div>
                <button type="button" className="flex items-center gap-1 text-[12px] font-medium text-s4e-brand-primary-500">
                  Review Assets
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </Anatomy>

          <UseCases
            items={[
              "Use Insight Card to summarise a metric cluster (risk score + dimensions) with a View Details action.",
              "Use Alert Card for items requiring user attention — blind spots, expiring certificates, failed scans.",
              "Combine both types side-by-side on dashboards to balance status and action.",
            ]}
          />

          <Guidelines
            items={[
              { type: "do",   text: "Use the pulse dot only for live, unresolved alerts — not for static info." },
              { type: "dont", text: "Don't stack more than 3 alert cards; collapse older ones into a list." },
              { type: "do",   text: "Keep Insight rows to a maximum of five so the card stays scannable." },
              { type: "dont", text: "Don't put call-to-action buttons inside Insight Cards; they're informational." },
            ]}
          />
        </TabsContent>

        <TabsContent value="stat-card" className="space-y-10">
          <StatCardShowcase />

          <Anatomy
            parts={[
              { label: "Icon + title",         description: "12px glyph and a short metric name that together label the card." },
              { label: "Metric",               description: "Large numeric value (32px, bold) — the primary information on the card." },
              { label: "Trend / description",  description: "Optional comparison vs previous period, or short helper sentence." },
            ]}
          >
            <div className="w-60 border border-s4e-neutral-divider-10 rounded-xl px-5 py-4 bg-s4e-surface-app flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Link2 size={14} className="text-s4e-text-disabled" />
                <span className="text-[12px] font-medium text-s4e-text-secondary">Total URL</span>
              </div>
              <div className="text-[32px] font-bold leading-none text-s4e-text-primary tracking-tight">816</div>
              <div className="flex items-center gap-1 text-[12px] font-medium text-s4e-scale-red-600">
                <TrendingDown size={13} />
                <span>-23%</span>
                <span className="font-normal text-s4e-text-disabled">from last month</span>
              </div>
            </div>
          </Anatomy>

          <UseCases
            items={[
              "Place at the top of an overview page to surface KPIs at a glance.",
              "Group 3 to 4 stat cards in a single row for dashboard summaries.",
              "Use the trend variant when the delta vs. a previous period is meaningful.",
              "Use the description variant when the number needs a one-line explanation.",
            ]}
          />

          <Guidelines
            items={[
              { type: "do",   text: "Keep the metric short — format large numbers with thousand separators (1,091)." },
              { type: "dont", text: "Don't mix trend and description on the same card; pick one." },
              { type: "do",   text: "Color trends green for positive outcomes and red for negative regardless of direction." },
              { type: "dont", text: "Don't put charts inside a stat card; escalate to an Insight Card instead." },
            ]}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
