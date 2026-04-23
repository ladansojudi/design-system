"use client";

import type React from "react";
import {
  RefreshCw, Link2, BarChart2, Sparkles,
  TrendingUp, TrendingDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type Trend = { direction: "up" | "down"; value: string; label: string };

type StatCardProps = {
  icon:        React.ComponentType<{ size?: number; className?: string }>;
  title:       string;
  metric:      string;
  description?: string;
  trend?:      Trend;
};

// ── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({ icon: Icon, title, metric, description, trend }: StatCardProps) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl px-5 py-4 bg-s4e-surface-app flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Icon size={14} className="text-s4e-text-disabled shrink-0" />
        <span className="text-[12px] font-medium text-s4e-text-secondary">{title}</span>
      </div>

      {/* Metric */}
      <div className="text-[32px] font-bold leading-none text-s4e-text-primary tracking-tight">
        {metric}
      </div>

      {/* Trend or description */}
      {trend && (
        <div className={cn(
          "flex items-center gap-1 text-[12px] font-medium",
          trend.direction === "up" ? "text-s4e-scale-green-600" : "text-s4e-scale-red-600",
        )}>
          {trend.direction === "up"
            ? <TrendingUp size={13} />
            : <TrendingDown size={13} />
          }
          <span>{trend.value}</span>
          <span className="font-normal text-s4e-text-disabled">{trend.label}</span>
        </div>
      )}
      {description && !trend && (
        <p className="text-[12px] text-s4e-text-disabled leading-relaxed">{description}</p>
      )}
    </div>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function StatCardShowcase() {
  return (
    <div className="space-y-10">

      {/* With trend */}
      <div>
        <SectionTitle>With Trend</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              icon={Link2}
              title="Total URL"
              metric="816"
              trend={{ direction: "down", value: "-23%", label: "from last month" }}
            />
            <StatCard
              icon={BarChart2}
              title="Total Unique Requests"
              metric="1,091"
              trend={{ direction: "up", value: "+12%", label: "from last month" }}
            />
          </div>
        </div>
      </div>

      {/* With description */}
      <div>
        <SectionTitle>With Description</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              icon={RefreshCw}
              title="Total Crawler Started"
              metric="329"
              description="Number of crawlers initiated since beginning."
            />
            <StatCard
              icon={Sparkles}
              title="Enrichments"
              metric="14"
              description="Total enrichment records found across crawler scans."
            />
          </div>
        </div>
      </div>

      {/* Combined — 2x2 grid like dashboard */}
      <div>
        <SectionTitle>Dashboard Grid</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <StatCard
              icon={RefreshCw}
              title="Total Crawler Started"
              metric="329"
              description="Number of crawlers initiated since beginning."
            />
            <StatCard
              icon={Link2}
              title="Total URL"
              metric="816"
              trend={{ direction: "down", value: "-23%", label: "from last month" }}
            />
            <StatCard
              icon={BarChart2}
              title="Total Unique Requests"
              metric="816"
              trend={{ direction: "down", value: "-23%", label: "from last month" }}
            />
            <StatCard
              icon={Sparkles}
              title="Enrichments"
              metric="14"
              description="Total enrichment records found across crawler scans."
            />
          </div>
        </div>
      </div>

    </div>
  );
}
