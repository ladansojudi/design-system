"use client";

import type React from "react";
import { cn } from "@/lib/utils";

type Row = {
  utility:  string;
  textClass: string;
  surface:  string;   // bg utility for the sample card
  example:  string;
  use:      string;
};

const STRUCTURAL: Row[] = [
  {
    utility:   "text-snt-text-primary",
    textClass: "text-snt-text-primary",
    surface:   "bg-snt-surface-row",
    example:   "Settings overview",
    use:       "Default body text, headings, table cells.",
  },
  {
    utility:   "text-snt-text-secondary",
    textClass: "text-snt-text-secondary",
    surface:   "bg-snt-surface-row",
    example:   "Configure how alerts are routed across teams.",
    use:       "Supporting copy, meta, helper labels.",
  },
  {
    utility:   "text-snt-text-disabled",
    textClass: "text-snt-text-disabled",
    surface:   "bg-snt-surface-row",
    example:   "Cannot be edited",
    use:       "Disabled controls, inactive items.",
  },
  {
    utility:   "text-snt-text-placeholder",
    textClass: "text-snt-text-placeholder",
    surface:   "bg-snt-surface-row",
    example:   "your@email.com",
    use:       "Empty input hints — distinct from disabled conceptually.",
  },
  {
    utility:   "text-snt-text-inverse",
    textClass: "text-snt-text-inverse",
    surface:   "bg-snt-neutral-grey-900",
    example:   "View documentation",
    use:       "Text on a surface inverted from the current theme.",
  },
  {
    utility:   "text-snt-text-on-accent",
    textClass: "text-snt-text-on-accent",
    surface:   "bg-snt-brand-primary-600",
    example:   "Continue",
    use:       "Text on a colored / accent surface (buttons, banners).",
  },
];

const SEMANTIC: Row[] = [
  {
    utility:   "text-snt-text-link",
    textClass: "text-snt-text-link",
    surface:   "bg-snt-surface-row",
    example:   "Manage your account →",
    use:       "Interactive text — links, primary CTAs, in-text actions.",
  },
  {
    utility:   "text-snt-text-brand",
    textClass: "text-snt-text-brand",
    surface:   "bg-snt-surface-row",
    example:   "Threat overview",
    use:       "Branded headlines, feature labels.",
  },
  {
    utility:   "text-snt-text-success",
    textClass: "text-snt-text-success",
    surface:   "bg-snt-surface-row",
    example:   "Account verified",
    use:       "Success messages, positive validation states.",
  },
  {
    utility:   "text-snt-text-warning",
    textClass: "text-snt-text-warning",
    surface:   "bg-snt-surface-row",
    example:   "Quota almost exceeded",
    use:       "Warnings, cautions, quota near-limit.",
  },
  {
    utility:   "text-snt-text-error",
    textClass: "text-snt-text-error",
    surface:   "bg-snt-surface-row",
    example:   "Invalid credentials",
    use:       "Error messages, destructive confirmations, validation failures.",
  },
  {
    utility:   "text-snt-text-info",
    textClass: "text-snt-text-info",
    surface:   "bg-snt-surface-row",
    example:   "New features available",
    use:       "Informational hints, secondary notifications.",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <span className="text-[15px] font-semibold text-snt-text-primary">{children}</span>
    </div>
  );
}

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-snt-surface-table-header">
          <tr className="text-left">
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-snt-text-disabled w-72">Example</th>
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-snt-text-disabled w-64">Utility</th>
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-snt-text-disabled">Use case</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.utility} className="border-t border-snt-neutral-divider-10">
              <td className="py-2.5 px-4">
                <div className={cn(
                  "inline-flex items-center px-3 py-2 rounded-md ring-1 ring-inset ring-snt-neutral-divider-10 max-w-full",
                  r.surface,
                )}>
                  <span className={cn("text-[14px] font-medium leading-tight truncate", r.textClass)}>
                    {r.example}
                  </span>
                </div>
              </td>
              <td className="py-2.5 px-4 font-mono text-[11px] text-snt-brand-primary-500 align-middle">
                {r.utility}
              </td>
              <td className="py-2.5 px-4 text-[12px] text-snt-text-secondary align-middle">
                {r.use}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function TextColors() {
  return (
    <div className="space-y-8">
      <div>
        <SectionTitle>Text colors — structural</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          The structural roles. Pick by the role the text plays in the layout — heading, supporting,
          inactive — not by what looks nice.
        </p>
        <Table rows={STRUCTURAL} />
      </div>

      <div>
        <SectionTitle>Text colors — semantic</SectionTitle>
        <p className="text-[12px] text-snt-text-secondary leading-relaxed mb-4 max-w-2xl">
          Semantic tokens carry meaning. Reach for them whenever the text communicates state,
          action or feedback — never use a raw scale color (<code className="font-mono text-snt-text-primary">text-snt-scale-red-600</code>)
          where a semantic token applies.
        </p>
        <Table rows={SEMANTIC} />
      </div>
    </div>
  );
}
