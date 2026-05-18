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
    utility:   "text-s4e-text-primary",
    textClass: "text-s4e-text-primary",
    surface:   "bg-s4e-surface-row",
    example:   "Settings overview",
    use:       "Default body text, headings, table cells.",
  },
  {
    utility:   "text-s4e-text-secondary",
    textClass: "text-s4e-text-secondary",
    surface:   "bg-s4e-surface-row",
    example:   "Configure how alerts are routed across teams.",
    use:       "Supporting copy, meta, helper labels.",
  },
  {
    utility:   "text-s4e-text-disabled",
    textClass: "text-s4e-text-disabled",
    surface:   "bg-s4e-surface-row",
    example:   "Cannot be edited",
    use:       "Disabled controls, inactive items.",
  },
  {
    utility:   "text-s4e-text-placeholder",
    textClass: "text-s4e-text-placeholder",
    surface:   "bg-s4e-surface-row",
    example:   "your@email.com",
    use:       "Empty input hints — distinct from disabled conceptually.",
  },
  {
    utility:   "text-s4e-text-inverse",
    textClass: "text-s4e-text-inverse",
    surface:   "bg-s4e-neutral-grey-900",
    example:   "View documentation",
    use:       "Text on a surface inverted from the current theme.",
  },
  {
    utility:   "text-s4e-text-on-accent",
    textClass: "text-s4e-text-on-accent",
    surface:   "bg-s4e-brand-primary-600",
    example:   "Continue",
    use:       "Text on a colored / accent surface (buttons, banners).",
  },
];

const SEMANTIC: Row[] = [
  {
    utility:   "text-s4e-text-link",
    textClass: "text-s4e-text-link",
    surface:   "bg-s4e-surface-row",
    example:   "Manage your account →",
    use:       "Interactive text — links, primary CTAs, in-text actions.",
  },
  {
    utility:   "text-s4e-text-brand",
    textClass: "text-s4e-text-brand",
    surface:   "bg-s4e-surface-row",
    example:   "s4e Platform",
    use:       "Branded headlines, feature labels.",
  },
  {
    utility:   "text-s4e-text-success",
    textClass: "text-s4e-text-success",
    surface:   "bg-s4e-surface-row",
    example:   "Account verified",
    use:       "Success messages, positive validation states.",
  },
  {
    utility:   "text-s4e-text-warning",
    textClass: "text-s4e-text-warning",
    surface:   "bg-s4e-surface-row",
    example:   "Quota almost exceeded",
    use:       "Warnings, cautions, quota near-limit.",
  },
  {
    utility:   "text-s4e-text-error",
    textClass: "text-s4e-text-error",
    surface:   "bg-s4e-surface-row",
    example:   "Invalid credentials",
    use:       "Error messages, destructive confirmations, validation failures.",
  },
  {
    utility:   "text-s4e-text-info",
    textClass: "text-s4e-text-info",
    surface:   "bg-s4e-surface-row",
    example:   "New features available",
    use:       "Informational hints, secondary notifications.",
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

function Table({ rows }: { rows: Row[] }) {
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-s4e-surface-table-header">
          <tr className="text-left">
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-72">Example</th>
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-64">Utility</th>
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Use case</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.utility} className="border-t border-s4e-neutral-divider-10">
              <td className="py-2.5 px-4">
                <div className={cn(
                  "inline-flex items-center px-3 py-2 rounded-md ring-1 ring-inset ring-s4e-neutral-divider-10 max-w-full",
                  r.surface,
                )}>
                  <span className={cn("text-[13px] font-medium leading-tight truncate", r.textClass)}>
                    {r.example}
                  </span>
                </div>
              </td>
              <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-brand-primary-500 align-middle">
                {r.utility}
              </td>
              <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary align-middle">
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
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          The structural roles. Pick by the role the text plays in the layout — heading, supporting,
          inactive — not by what looks nice.
        </p>
        <Table rows={STRUCTURAL} />
      </div>

      <div>
        <SectionTitle>Text colors — semantic</SectionTitle>
        <p className="text-[12px] text-s4e-text-secondary leading-relaxed mb-4 max-w-2xl">
          Semantic tokens carry meaning. Reach for them whenever the text communicates state,
          action or feedback — never use a raw scale color (<code className="font-mono text-s4e-text-primary">text-s4e-scale-red-600</code>)
          where a semantic token applies.
        </p>
        <Table rows={SEMANTIC} />
      </div>
    </div>
  );
}
