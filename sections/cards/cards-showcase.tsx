"use client";

import type React from "react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { InsightCard, AlertCard } from "@/components/ui/cards";

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

// ── 1. Insight Card ────────────────────────────────────────────────────────

// ── 2. Alert Card ──────────────────────────────────────────────────────────

// ── Showcase ───────────────────────────────────────────────────────────────

export function CardsShowcase() {
  return (
    <div className="space-y-10">

      {/* Insight Card */}
      <div>
        <SectionTitle>Insight Card</SectionTitle>
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
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
        <div className="border border-snt-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
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
