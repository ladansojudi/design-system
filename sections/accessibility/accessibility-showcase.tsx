"use client";

import type React from "react";
import { ContrastTable as LiveContrastTable } from "@/components/styleguide/a11y-docs";
import { cn } from "@/lib/utils";

// ── Section title (matches the existing component-docs pattern) ───────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span aria-hidden className="hidden">▶▶</span>
      <h3 className="text-snt-16 font-semibold text-snt-text-primary">{children}</h3>
    </div>
  );
}

// ── Contrast ratios (computed live from the tokens, not typed in) ─────────

function ContrastRatios() {
  return (
    <div>
      <SectionTitle>Contrast ratios</SectionTitle>
      <p className="mb-4 text-snt-14 text-snt-text-secondary">
        Computed from the tokens in the current theme — switch to dark mode to check it too.
        Disabled text is exempt from WCAG contrast, so it is not listed.
      </p>
      <LiveContrastTable
        rows={[
          { label: "Primary text",      fg: "text-primary",   bg: "surface-app",     min: 4.5 },
          { label: "Secondary text",    fg: "text-secondary", bg: "surface-app",     min: 4.5 },
          { label: "Link",              fg: "text-link",      bg: "surface-app",     min: 4.5 },
          { label: "Error text",        fg: "text-error",     bg: "bg-error-subtle", min: 4.5 },
          { label: "Success text",      fg: "text-success",   bg: "bg-success-subtle", min: 4.5 },
          { label: "Strong border",     fg: "border-strong",  bg: "surface-app",     min: 3 },
          { label: "Focus ring",        fg: "focus-ring",     bg: "surface-app",     min: 3 },
        ]}
      />
    </div>
  );
}

// ── Severity is never color alone ─────────────────────────────────────────

type Severity = {
  label: string;
  dotClass: string;
  textClass: string;
};

const severities: Severity[] = [
  { label: "Info",     dotClass: "bg-snt-severity-info",     textClass: "text-snt-severity-info-text"   },
  { label: "Low",      dotClass: "bg-snt-severity-low",      textClass: "text-snt-severity-low-text"  },
  { label: "Medium",   dotClass: "bg-snt-severity-medium",   textClass: "text-snt-severity-medium-text" },
  { label: "High",     dotClass: "bg-snt-severity-high",     textClass: "text-snt-severity-high-text"    },
  { label: "Critical", dotClass: "bg-snt-severity-critical", textClass: "text-snt-severity-critical-text" },
];

function SeverityNotColorAlone() {
  return (
    <div>
      <SectionTitle>Severity is never color alone</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl px-6 py-5 space-y-5">
        <p className="text-[14px] text-snt-text-secondary leading-relaxed max-w-2xl">
          Color is never the only signal. Every severity badge pairs its color with a
          shape (the dot) and a written label, so the level is readable for users with
          low vision, color-blindness, or in print and grayscale exports.
        </p>
        <div className="flex flex-wrap gap-2">
          {severities.map((s) => (
            <span
              key={s.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-snt-neutral-divider-10 bg-snt-surface-row"
            >
              <span className={cn("inline-block w-2 h-2 rounded-full shrink-0", s.dotClass)} />
              <span className={cn("text-[12px] font-medium", s.textClass)}>{s.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Keyboard navigation ───────────────────────────────────────────────────

const keyboardRows: { component: string; keys: string }[] = [
  { component: "Data table",     keys: "↑ ↓ navigate · Enter open · Space select" },
  { component: "Sidebar nav",    keys: "Tab move · Enter / Space activate" },
  { component: "Modal",          keys: "Escape close · focus trapped inside" },
  { component: "Select",         keys: "↑ ↓ options · Enter select · Escape close" },
  { component: "Dropdown menu",           keys: "Enter / Space / ↓ open · ↑ ↓ items · type-ahead · Escape close" },
  { component: "Drawer",         keys: "Escape close · focus trapped inside" },
  { component: "CommandPalette", keys: "⌘K open · ↑ ↓ results · Enter activate" },
];

function KeyboardTable() {
  return (
    <div>
      <SectionTitle>Keyboard navigation</SectionTitle>
      <div className="border border-snt-neutral-divider-10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto snt-scrollbar-hide">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="bg-snt-surface-table-header">
              <tr className="text-left">
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-snt-text-disabled w-48">
                  Component
                </th>
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-snt-text-disabled">
                  Keys
                </th>
              </tr>
            </thead>
            <tbody>
              {keyboardRows.map((row) => (
                <tr
                  key={row.component}
                  className="border-t border-snt-neutral-divider-10 hover:bg-snt-surface-row-hover transition-colors duration-75"
                >
                  <td className="py-2.5 px-4">
                    <span className="text-[12px] font-medium text-snt-text-primary">{row.component}</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="font-mono text-[12px] text-snt-text-secondary">{row.keys}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────

export function AccessibilityShowcase() {
  return (
    <div className="space-y-10">
      <ContrastRatios />
      <SeverityNotColorAlone />
      <KeyboardTable />
    </div>
  );
}
