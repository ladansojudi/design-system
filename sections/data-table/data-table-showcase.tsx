"use client";

import type React from "react";
import { useState } from "react";
import {
  Info, ChevronLeft, ChevronRight, ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
  { id: 1, threat: "SQL Injection",          asset: "api.s4e.io",      date: "19.09.2024", severity: "critical" },
  { id: 2, threat: "SSL Expiring",           asset: "zero.webapp.com", date: "19.09.2024", severity: "high"     },
  { id: 3, threat: "Open Port",              asset: "prod.mail.io",    date: "17.09.2024", severity: "high"     },
  { id: 4, threat: "Weak Cipher",            asset: "vpn.onuraktas.com", date: "18.09.2024", severity: "critical" },
  { id: 5, threat: "Directory Listing",      asset: "cdn.onuraktas.com", date: "15.09.2024", severity: "high"     },
];

const SEVERITY_STYLES: Record<Severity, { label: string; bg: string; accent: string; text: string }> = {
  high: {
    label:  "High",
    bg:     "bg-s4e-scale-red-50",
    accent: "border-l-[3px] border-s4e-scale-red-500",
    text:   "text-s4e-scale-red-600",
  },
  critical: {
    label:  "Critical",
    bg:     "bg-s4e-scale-purple-50",
    accent: "border-l-[3px] border-s4e-scale-purple-500",
    text:   "text-s4e-scale-purple-600",
  },
};

// ── Tooltip bubble ─────────────────────────────────────────────────────────

function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex items-center shrink-0"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Info size={13} className="text-s4e-text-disabled hover:text-s4e-text-primary shrink-0 cursor-help transition-colors" />
      {show && (
        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 px-3 py-2 rounded-lg bg-s4e-neutral-grey-800 text-white text-[11px] leading-relaxed pointer-events-none z-50 shadow-lg">
          {text}
        </span>
      )}
    </span>
  );
}

// ── Severity badge (table cell) ────────────────────────────────────────────

function SeverityCell({ severity }: { severity: Severity }) {
  const cfg = SEVERITY_STYLES[severity];
  return (
    <div className={cn(
      "flex items-center justify-center rounded-md px-3 py-1 w-20",
      cfg.bg, cfg.accent,
    )}>
      <span className={cn("text-[12px] font-medium", cfg.text)}>{cfg.label}</span>
    </div>
  );
}

// ── Table header row ───────────────────────────────────────────────────────

type HeaderProps = {
  title:        string;
  description:  string;
  badge?:       string;
  viewAllLabel?: string;
};

function TableTopHeader({ title, description, badge, viewAllLabel }: HeaderProps) {
  return (
    <div className="flex items-center gap-3 px-5 py-3 bg-s4e-neutral-grey-100 border-b border-s4e-neutral-divider-10 rounded-t-xl">
      <div className="flex items-center gap-2 shrink-0">
        <span className="text-[14px] font-semibold text-s4e-text-primary">{title}</span>
        <InfoTooltip text="Shortcut info about the widget — typically explains what powers this data." />
      </div>
      <span className="text-[12px] text-s4e-text-disabled truncate flex-1 min-w-0">{description}</span>
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-s4e-scale-yellow-50 text-s4e-scale-yellow-700 text-[11px] font-medium shrink-0">
          <span className="w-[6px] h-[6px] rounded-full bg-s4e-scale-yellow-500" />
          {badge}
        </span>
      )}
      {viewAllLabel && (
        <button
          type="button"
          className="text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors shrink-0 underline underline-offset-2"
        >
          {viewAllLabel}
        </button>
      )}
    </div>
  );
}

// ── Data table body ────────────────────────────────────────────────────────

function TableBody({ rows }: { rows: Row[] }) {
  return (
    <div>
      {/* Column headers */}
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_90px_80px] gap-3 px-5 py-2.5 border-b border-s4e-neutral-divider-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide">Threats</span>
          <InfoTooltip text="Name of the detected threat, finding or CVE." />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide">Asset</span>
          <InfoTooltip text="The domain, IP or service the threat was found on." />
        </div>
        <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide text-right">Date</span>
        <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide text-right">Severity</span>
      </div>

      {/* Rows */}
      {rows.slice(0, 5).map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_90px_80px] gap-3 items-center px-5 py-3 border-b border-s4e-neutral-divider-10 last:border-b-0 hover:bg-s4e-neutral-grey-100/50 transition-colors"
        >
          {/* Threat cell — tooltip sticks to the end of the text */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[13px] text-s4e-text-primary truncate">{row.threat}</span>
            <InfoTooltip text={row.threat} />
          </div>
          {/* Asset cell — tooltip sticks to the end of the text */}
          <div className="flex items-center gap-1.5 min-w-0">
            <span className="text-[13px] text-s4e-text-primary truncate">{row.asset}</span>
            <InfoTooltip text={row.asset} />
          </div>
          <span className="text-[12px] text-s4e-text-secondary text-right tabular-nums">{row.date}</span>
          <div className="flex justify-end">
            <SeverityCell severity={row.severity} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Footer / pagination ────────────────────────────────────────────────────

function TableFooter() {
  return (
    <div className="flex items-center justify-end gap-4 px-5 py-3 border-t border-s4e-neutral-divider-10">
      <div className="flex items-center gap-2">
        <span className="text-[12px] text-s4e-text-disabled">Row per page:</span>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-[12px] text-s4e-text-primary hover:text-s4e-brand-primary-500 transition-colors"
        >
          3
          <ChevronDown size={12} className="text-s4e-text-disabled" />
        </button>
      </div>
      <span className="text-[12px] text-s4e-text-disabled tabular-nums">1–3 of 492</span>
      <div className="flex items-center gap-1">
        <button type="button" className="w-6 h-6 rounded hover:bg-s4e-neutral-grey-100 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary transition-colors">
          <ChevronLeft size={13} />
        </button>
        <button type="button" className="w-6 h-6 rounded hover:bg-s4e-neutral-grey-100 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary transition-colors">
          <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}

// ── Full table ─────────────────────────────────────────────────────────────

function DataTable({ header, rows }: { header: HeaderProps; rows?: Row[] }) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl bg-s4e-surface-app overflow-hidden">
      <TableTopHeader {...header} />
      <div className="overflow-x-auto s4e-scrollbar-hide">
        <div className="min-w-[560px]">
          <TableBody rows={rows ?? ROWS_LONG} />
        </div>
      </div>
      <TableFooter />
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
        <p className="text-[11px] text-s4e-text-disabled mb-3">
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
