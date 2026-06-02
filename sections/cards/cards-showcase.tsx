"use client";

import type React from "react";
import { ArrowRight } from "lucide-react";
import { ExampleCard } from "@/components/styleguide/example-card";

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── 1. Insight Card ────────────────────────────────────────────────────────

type InsightRow = { label: string; value: string | number };

function InsightCard({
  title,
  rows,
}: {
  title: string;
  rows:  InsightRow[];
}) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl px-5 py-5 bg-s4e-surface-app flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-[14px] font-semibold text-s4e-text-primary">{title}</div>
        <button
          type="button"
          className="text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors"
        >
          View Details
        </button>
      </div>

      <div className="space-y-0 divide-y divide-s4e-neutral-divider-10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5">
            <span className="text-[12px] text-s4e-text-secondary">{row.label}</span>
            <span className="text-[14px] font-semibold text-s4e-text-primary">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 2. Alert Card ──────────────────────────────────────────────────────────

function AlertCard({
  title,
  activeCount,
  alertTitle,
  alertBadge,
  description,
  action,
}: {
  title:        string;
  activeCount:  number;
  alertTitle:   string;
  alertBadge?:  string;
  description:  string;
  action:       string;
}) {
  return (
    <div className="rounded-xl overflow-hidden border border-s4e-neutral-divider-10 bg-s4e-surface-app">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-s4e-neutral-grey-100 border-b border-s4e-neutral-divider-10">
        <span className="text-[12px] font-semibold text-s4e-text-primary">{title}</span>
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-s4e-scale-red-50 text-[11px] font-semibold text-s4e-scale-red-600">
          <span className="s4e-pulse-dot w-[6px] h-[6px] rounded-full bg-s4e-scale-red-500 shrink-0" />
          {activeCount} Active
        </span>
      </div>

      {/* Body */}
      <div className="px-4 py-4 space-y-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[14px] font-semibold text-s4e-text-primary">{alertTitle}</span>
            {alertBadge && (
              <span className="px-2 py-0.5 rounded-full bg-s4e-neutral-grey-100 text-[10px] font-medium text-s4e-text-secondary">
                {alertBadge}
              </span>
            )}
          </div>
          <p className="text-[12px] text-s4e-text-disabled leading-relaxed">{description}</p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1 text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors group"
        >
          {action}
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function CardsShowcase() {
  return (
    <div className="space-y-10">

      {/* Insight Card */}
      <div>
        <SectionTitle>Insight Card</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InsightCard
              title="Live Risk Score"
              rows={[
                { label: "Critical Vulnerabilities", value: 0    },
                { label: "Coverage Gaps (Blind Spots)", value: 20   },
                { label: "Highest-risk Asset",          value: 14.6 },
              ]}
            />
            <InsightCard
              title="Critical Issues"
              rows={[
                { label: "22 Apr 2026", value: 13 },
                { label: "16 Apr 2026", value: 13 },
                { label: "08 Apr 2026", value: 11 },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Alert Card */}
      <div>
        <SectionTitle>Alert Card</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <AlertCard
              title="Attention Needed"
              activeCount={2}
              alertTitle="Security Blind Spots"
              alertBadge="20 Assets"
              description="Assets excluded from scheduled scans — potential blind spots in your coverage."
              action="Review Assets"
            />
            <AlertCard
              title="Attention Needed"
              activeCount={1}
              alertTitle="SSL Certificates Expiring"
              alertBadge="3 Assets"
              description="SSL certificates are expiring soon. Renew to avoid service disruption."
              action="View Assets"
            />
          </div>
        </div>
      </div>

    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function CardsExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Insight Card"
        density="tall"
        code={`<InsightCard
  title="Live Risk Score"
  rows={[
    { label: "Critical Vulnerabilities", value: 0 },
    { label: "Coverage Gaps (Blind Spots)", value: 20 },
    { label: "Highest-risk Asset", value: 14.6 },
  ]}
/>`}
        preview={
          <div className="w-80">
            <InsightCard
              title="Live Risk Score"
              rows={[
                { label: "Critical Vulnerabilities", value: 0    },
                { label: "Coverage Gaps (Blind Spots)", value: 20   },
                { label: "Highest-risk Asset",          value: 14.6 },
              ]}
            />
          </div>
        }
      />
      <ExampleCard
        title="Insight Card · Date series"
        density="tall"
        code={`<InsightCard
  title="Critical Issues"
  rows={[
    { label: "22 Apr 2026", value: 13 },
    { label: "16 Apr 2026", value: 13 },
    { label: "08 Apr 2026", value: 11 },
  ]}
/>`}
        preview={
          <div className="w-80">
            <InsightCard
              title="Critical Issues"
              rows={[
                { label: "22 Apr 2026", value: 13 },
                { label: "16 Apr 2026", value: 13 },
                { label: "08 Apr 2026", value: 11 },
              ]}
            />
          </div>
        }
      />
      <ExampleCard
        title="Alert Card"
        density="tall"
        code={`<AlertCard
  title="Attention Needed"
  activeCount={2}
  alertTitle="Security Blind Spots"
  alertBadge="20 Assets"
  description="Assets excluded from scheduled scans — potential blind spots in your coverage."
  action="Review Assets"
/>`}
        preview={
          <div className="w-80">
            <AlertCard
              title="Attention Needed"
              activeCount={2}
              alertTitle="Security Blind Spots"
              alertBadge="20 Assets"
              description="Assets excluded from scheduled scans — potential blind spots in your coverage."
              action="Review Assets"
            />
          </div>
        }
      />
      <ExampleCard
        title="Alert Card · Single active"
        density="tall"
        code={`<AlertCard
  title="Attention Needed"
  activeCount={1}
  alertTitle="SSL Certificates Expiring"
  alertBadge="3 Assets"
  description="SSL certificates are expiring soon. Renew to avoid service disruption."
  action="View Assets"
/>`}
        preview={
          <div className="w-80">
            <AlertCard
              title="Attention Needed"
              activeCount={1}
              alertTitle="SSL Certificates Expiring"
              alertBadge="3 Assets"
              description="SSL certificates are expiring soon. Renew to avoid service disruption."
              action="View Assets"
            />
          </div>
        }
      />
    </div>
  );
}
