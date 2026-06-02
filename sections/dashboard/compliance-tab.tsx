"use client";

import { ChevronDown, MoreHorizontal, Wrench } from "lucide-react";
import { Card, StatCard } from "@/sections/dashboard/card";
import { Inspectable } from "@/sections/dashboard/inspect";

const ASV_FEATURES = [
  "Automated vulnerability scanning and assessment",
  "PCI-DSS compliance validation reports",
  "Security posture analysis and recommendations",
  "Export capabilities for compliance documentation",
];

export function ComplianceTab() {
  return (
    <div className="space-y-5">
      {/* Stat cards */}
      <Inspectable slug="cards" label="Card">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Latest app discovered" value={<span className="text-s4e-brand-primary-500">s4e-web-ng</span>} sub="Most recently discovered application in your inventory." />
        <StatCard label="Total apps" value="87" sub="Applications tracked for this compliance scope." />
        <StatCard label="Total JavaScript files" value="11,428" sub="JavaScript resources observed across all tracked apps." />
        <StatCard label="Unique JavaScript" value="1,295" sub="Unique JS fingerprints to monitor and approve." />
      </div>
      </Inspectable>

      {/* JSentinel */}
      <Inspectable slug="data-table" label="Data Table">
      <Card
        title="JSentinel"
        description="See where JSentinel is enabled and how ASV reporting is configured."
        status={{ label: "Available", tone: "live" }}
      >
        {/* Filters */}
        <div className="flex items-center gap-3 mb-4">
          <input
            type="text"
            placeholder="Label"
            className="h-9 w-56 px-3 rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-row text-[14px] text-s4e-text-primary placeholder:text-s4e-text-disabled outline-none focus:border-s4e-brand-primary-500"
          />
          <button type="button" className="inline-flex items-center gap-2 h-9 px-3 rounded-md border border-s4e-neutral-divider-10 text-[14px] text-s4e-text-secondary hover:text-s4e-text-primary">
            Date <ChevronDown size={14} />
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto s4e-scrollbar-hide">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="bg-s4e-surface-table-header">
              <tr className="text-left">
                {["Apps", "Build Version", "Created At", "Files", "Action"].map((h, i) => (
                  <th key={i} className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-t border-s4e-neutral-divider-10">
                  <td className="py-2.5 px-4">
                    <span className="inline-flex items-center gap-2 text-[14px] text-s4e-text-primary">
                      <ChevronDown size={13} className="text-s4e-text-disabled" />
                      s4e-web-ng
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-[14px] text-s4e-text-secondary tabular-nums">3.21.0</td>
                  <td className="py-2.5 px-4 text-[14px] text-s4e-text-secondary tabular-nums">30 Sep 2025 18:36</td>
                  <td className="py-2.5 px-4 text-[14px] text-s4e-text-secondary tabular-nums">323</td>
                  <td className="py-2.5 px-4">
                    <button type="button" aria-label="Actions" className="text-s4e-text-disabled hover:text-s4e-text-primary">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-end gap-2 pt-3 text-[11px] text-s4e-text-disabled">
          Row per page: 3 · 1–3 of 492 ‹ ›
        </div>
      </Card>
      </Inspectable>

      {/* ASV Reports — empty / coming soon */}
      <Inspectable slug="empty-state" label="Empty State">
      <Card title="ASV Reports">
        <div className="flex flex-col items-start gap-3">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-s4e-brand-primary-50 text-s4e-brand-primary-500">
            <Wrench size={18} />
          </span>
          <p className="text-[14px] text-s4e-text-secondary leading-relaxed max-w-2xl">
            Automated Security Validation (ASV) reports are currently under development. This feature will provide
            comprehensive security assessments and compliance documentation for PCI-DSS requirements.
          </p>
          <div>
            <div className="text-[12px] font-semibold text-s4e-text-primary mb-2">Expected features:</div>
            <ul className="space-y-1.5">
              {ASV_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[12px] text-s4e-text-secondary">
                  <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-s4e-brand-primary-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
      </Inspectable>
    </div>
  );
}
