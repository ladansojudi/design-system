"use client";

import type React from "react";

type Row = {
  utility:  string;
  bgClass:  string;
  use:      string;
};

const STRUCTURAL: Row[] = [
  { utility: "text-s4e-text-primary",     bgClass: "bg-s4e-text-primary",     use: "Default body text, headings, table cells." },
  { utility: "text-s4e-text-secondary",   bgClass: "bg-s4e-text-secondary",   use: "Supporting copy, meta, helper labels." },
  { utility: "text-s4e-text-disabled",    bgClass: "bg-s4e-text-disabled",    use: "Disabled controls, inactive items." },
  { utility: "text-s4e-text-placeholder", bgClass: "bg-s4e-text-placeholder", use: "Empty input hints — distinct from disabled conceptually." },
  { utility: "text-s4e-text-inverse",     bgClass: "bg-s4e-text-inverse",     use: "Text on a surface inverted from the current theme." },
  { utility: "text-s4e-text-on-accent",   bgClass: "bg-s4e-text-on-accent",   use: "Text on a colored / accent surface (buttons, banners)." },
];

const SEMANTIC: Row[] = [
  { utility: "text-s4e-text-link",    bgClass: "bg-s4e-text-link",    use: "Interactive text — links, primary CTAs, in-text actions." },
  { utility: "text-s4e-text-brand",   bgClass: "bg-s4e-text-brand",   use: "Branded headlines, feature labels." },
  { utility: "text-s4e-text-success", bgClass: "bg-s4e-text-success", use: "Success messages, positive validation states." },
  { utility: "text-s4e-text-warning", bgClass: "bg-s4e-text-warning", use: "Warnings, cautions, quota near-limit." },
  { utility: "text-s4e-text-error",   bgClass: "bg-s4e-text-error",   use: "Error messages, destructive confirmations, validation failures." },
  { utility: "text-s4e-text-info",    bgClass: "bg-s4e-text-info",    use: "Informational hints, secondary notifications." },
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
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-12" />
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-64">Utility</th>
            <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">Use case</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.utility} className="border-t border-s4e-neutral-divider-10">
              <td className="py-2.5 px-4">
                <span className={`block w-5 h-5 rounded-full ring-1 ring-inset ring-s4e-neutral-divider-20 ${r.bgClass}`} />
              </td>
              <td className="py-2.5 px-4 font-mono text-[11px] text-s4e-brand-primary-500">{r.utility}</td>
              <td className="py-2.5 px-4 text-[12px] text-s4e-text-secondary">{r.use}</td>
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
