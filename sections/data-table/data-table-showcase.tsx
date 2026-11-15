"use client";

import type React from "react";
import type { Severity } from "@/components/ui/severity-badge";
import { ExampleCard } from "@/components/styleguide/example-card";
import { DataTable as UIDataTable, DataTableHeader, DataTableBody, DataTableColumnHeaders, DataTableRow, DataTableFooter } from "@/components/ui/data-table";

// ── Types ──────────────────────────────────────────────────────────────────


type Row = {
  id:       number;
  threat:   string;
  asset:    string;
  date:     string;
  severity: Severity;
};

// Long names show how cells truncate; dates are ISO (YYYY-MM-DD), which sorts
// and reads the same everywhere.
const ROWS_LONG: Row[] = [
  { id: 1, threat: "Remote code execution in Apache Log4j 2.14 (CVE-2021-44228)", asset: "payments-api.production.example.com", date: "2026-11-09", severity: "critical" },
  { id: 2, threat: "SQL injection in the /search endpoint via the q parameter",    asset: "storefront.production.example.com",   date: "2026-11-09", severity: "critical" },
  { id: 3, threat: "TLS certificate expires in 6 days on the public load balancer", asset: "lb-eu-west-1.example.com",            date: "2026-11-07", severity: "high" },
  { id: 4, threat: "SSH exposed to the internet with password authentication enabled", asset: "bastion.staging.example.com",       date: "2026-11-08", severity: "high" },
  { id: 5, threat: "Directory listing enabled on a public asset bucket",           asset: "cdn.assets.example.com",              date: "2026-11-05", severity: "medium" },
];

const ROWS_SHORT: Row[] = [
  { id: 1, threat: "SQL Injection",     asset: "api.example.com",     date: "2026-11-09", severity: "critical" },
  { id: 2, threat: "SSL Expiring",      asset: "shop.example.com",    date: "2026-11-09", severity: "high"     },
  { id: 3, threat: "Open Port",         asset: "mail.example.com",    date: "2026-11-07", severity: "high"     },
  { id: 4, threat: "Weak Cipher",       asset: "vpn.example.com",     date: "2026-11-08", severity: "medium"   },
  { id: 5, threat: "Directory Listing", asset: "cdn.example.com",     date: "2026-11-05", severity: "low"      },
];

// ── Tooltip bubble ─────────────────────────────────────────────────────────

// ── Severity badge (table cell) ────────────────────────────────────────────

// ── Table header row ───────────────────────────────────────────────────────

type HeaderProps = {
  title:        string;
  description:  string;
  badge?:       string;
  viewAllLabel?: string;
};

// ── Data table body ────────────────────────────────────────────────────────

// ── Footer / pagination ────────────────────────────────────────────────────

// ── Full table ─────────────────────────────────────────────────────────────

function DataTable({ header, rows }: { header: HeaderProps; rows?: Row[] }) {
  // The shipped DataTable parts — table semantics, keyboard tooltips, labelled pagination.
  return (
    <UIDataTable>
      <DataTableHeader {...header} />
      <DataTableBody>
        <DataTableColumnHeaders />
        {(rows ?? ROWS_LONG).map((r) => (
          <DataTableRow key={r.id} threat={r.threat} asset={r.asset} date={r.date} severity={r.severity} />
        ))}
      </DataTableBody>
      <DataTableFooter perPage={5} rangeLabel="1–5 of 492" />
    </UIDataTable>
  );
}

// ── Section title ──────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

// ── Showcase ───────────────────────────────────────────────────────────────

export function DataTableShowcase() {
  return (
    <div className="space-y-10">

      <div>
        <SectionTitle>Default</SectionTitle>
        <DataTable
          header={{
            title:        "Priority actions",
            description:  "Security issues prioritised by risk growth, not severity alone.",
            badge:        "Live",
            viewAllLabel: "View all",
          }}
        />
      </div>

      <div>
        <SectionTitle>Minimal: no badge, no View all</SectionTitle>
        <DataTable
          header={{
            title:       "All Findings",
            description: "Every active finding across the monitored asset surface.",
          }}
        />
      </div>

    </div>
  );
}

// ── Dev-view Examples (shadcn-style per-variant cards) ────────────────────

export function DataTableExamples() {
  return (
    <div className="space-y-4">
      <ExampleCard
        title="Default"
        density="tall"
        code={`<DataTable>
  <DataTableHeader
    title="Priority actions"
    description="Security issues prioritised by risk growth."
    badge="Live"
    viewAllLabel="View all"
    onViewAll={openAll}
  />
  <DataTableBody>
    <DataTableColumnHeaders />
    {rows.map((r) => <DataTableRow key={r.id} {...r} />)}
  </DataTableBody>
  <DataTableFooter perPage={5} rangeLabel="1–5 of 492" onPrev={prev} onNext={next} />
</DataTable>`}
        preview={
          <div className="w-full">
            <DataTable
              header={{
                title:        "Priority Actions",
                description:  "Security issues prioritized by risk growth, not severity alone.",
                badge:        "Live",
                viewAllLabel: "View all",
              }}
              rows={ROWS_SHORT}
            />
          </div>
        }
      />
      <ExampleCard
        title="Minimal: no badge, no View all"
        density="tall"
        code={`<DataTable>
  <DataTableHeader title="All findings" description="Every active finding across the monitored assets." />
  <DataTableBody>
    <DataTableColumnHeaders />
    {rows.map((r) => <DataTableRow key={r.id} {...r} />)}
  </DataTableBody>
</DataTable>`}
        preview={
          <div className="w-full">
            <DataTable
              header={{
                title:       "All Findings",
                description: "Every active finding across the monitored asset surface.",
              }}
              rows={ROWS_SHORT}
            />
          </div>
        }
      />
    </div>
  );
}
