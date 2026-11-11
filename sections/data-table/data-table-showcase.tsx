"use client";

import type React from "react";
import { ExampleCard } from "@/components/styleguide/example-card";
import { DataTable as UIDataTable, DataTableHeader, DataTableBody, DataTableColumnHeaders, DataTableRow, DataTableFooter } from "@/components/ui/data-table";

// ── Types ──────────────────────────────────────────────────────────────────

type Severity = "high" | "critical";

type Row = {
  id:       number;
  threat:   string;
  asset:    string;
  date:     string;
  severity: Severity;
};

const ROWS_LONG: Row[] = [
  { id: 1, threat: "Oorem ipsum dolor sit amet, dolore eu fugiat nulla pariatur.", asset: "Morem ipsum dolor sit amet, dolore eu fugiat nulla pariatur.", date: "19.09.2024", severity: "high" },
  { id: 2, threat: "Oorem ipsum dolor sit amet, dolore eu fugiat nulla pariatur.", asset: "Morem ipsum dolor sit amet, dolore eu fugiat nulla pariatur.", date: "19.09.2024", severity: "high" },
  { id: 3, threat: "Eorem ipsum dolor sit amet, ut labore et dolore magna aliqua.",  asset: "Sorem ipsum dolor sit amet, ut labore et dolore magna aliqua.", date: "17.09.2024", severity: "high" },
  { id: 4, threat: "lorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris nisi ut aliquip.", asset: "Dorem ipsum dolor sit amet, quis nostrud exercitation ullamco laboris.", date: "18.09.2024", severity: "critical" },
  { id: 5, threat: "Jorem ipsum dolor sit amet, consectetur adipiscing elit.",       asset: "Vorem ipsum dolor sit amet, consectetur adipiscing elit.",          date: "15.09.2024", severity: "critical" },
];

const ROWS_SHORT: Row[] = [
  { id: 1, threat: "SQL Injection",          asset: "api.example.com",      date: "19.09.2024", severity: "critical" },
  { id: 2, threat: "SSL Expiring",           asset: "zero.webapp.com", date: "19.09.2024", severity: "high"     },
  { id: 3, threat: "Open Port",              asset: "prod.mail.io",    date: "17.09.2024", severity: "high"     },
  { id: 4, threat: "Weak Cipher",            asset: "vpn.onuraktas.com", date: "18.09.2024", severity: "critical" },
  { id: 5, threat: "Directory Listing",      asset: "cdn.onuraktas.com", date: "15.09.2024", severity: "high"     },
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
      <DataTableFooter perPage={3} rangeLabel="1–3 of 492" />
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
        <SectionTitle>Full — Badge + View all</SectionTitle>
        <DataTable
          header={{
            title:        "Forem ipsum",
            description:  "Korem ipsum dolor sit amet, consectetur adipiscing elit.",
            badge:        "Yorem",
            viewAllLabel: "Korem",
          }}
        />
      </div>

      <div>
        <SectionTitle>Short Text Rows</SectionTitle>
        <p className="text-[11px] text-snt-text-disabled mb-3">
          When threat / asset names are short, the info icon sticks right at the end of the sentence instead of the cell edge.
        </p>
        <DataTable
          header={{
            title:        "Priority Actions",
            description:  "Security issues prioritized by risk growth, not severity alone.",
            viewAllLabel: "View all",
          }}
          rows={ROWS_SHORT}
        />
      </div>

      <div>
        <SectionTitle>No Badge</SectionTitle>
        <DataTable
          header={{
            title:        "Priority Actions",
            description:  "Security issues prioritized by risk growth, not severity alone.",
            viewAllLabel: "View all",
          }}
        />
      </div>

      <div>
        <SectionTitle>No View All</SectionTitle>
        <DataTable
          header={{
            title:       "Recently Detected",
            description: "New findings since the last scan cycle.",
            badge:       "Live",
          }}
        />
      </div>

      <div>
        <SectionTitle>Minimal — Title + Description only</SectionTitle>
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
        title="Full — Badge + View all"
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
  <DataTableFooter rangeLabel="1–3 of 492" onPrev={prev} onNext={next} />
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
        title="Minimal — Title + Description only"
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
