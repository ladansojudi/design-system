"use client";

import type React from "react";
import { cn } from "@/lib/utils";

// ── Section title (matches the existing component-docs pattern) ───────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Contrast ratios ───────────────────────────────────────────────────────

type Level = "pass" | "warn";

const contrastRows: { token: string; background: string; ratio: string; level: string; status: Level }[] = [
  { token: "--text-primary",   background: "--bg-base",      ratio: "16.8:1", level: "AAA",                status: "pass" },
  { token: "--text-secondary", background: "--bg-surface",   ratio: "5.2:1",  level: "AA",                 status: "pass" },
  { token: "--text-muted",     background: "--bg-surface",   ratio: "2.4:1",  level: "Captions only ⚠",   status: "warn" },
  { token: "--critical-text",  background: "--critical-bg",  ratio: "4.6:1",  level: "AA",                 status: "pass" },
  { token: "--low-text",       background: "--low-bg",       ratio: "4.8:1",  level: "AA",                 status: "pass" },
  { token: "--text-mono",      background: "--bg-card",      ratio: "5.1:1",  level: "AA",                 status: "pass" },
];

function ContrastTable() {
  return (
    <div>
      <SectionTitle>Contrast ratios</SectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto s4e-scrollbar-hide">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="bg-s4e-surface-table-header">
              <tr className="text-left">
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">
                  Token
                </th>
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">
                  Background
                </th>
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">
                  Ratio
                </th>
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">
                  Level
                </th>
              </tr>
            </thead>
            <tbody>
              {contrastRows.map((row) => (
                <tr
                  key={row.token + row.background}
                  className="border-t border-s4e-neutral-divider-10 hover:bg-s4e-surface-row-hover transition-colors duration-75"
                >
                  <td className="py-2.5 px-4">
                    <span className="font-mono text-[12px] text-s4e-text-secondary">{row.token}</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="font-mono text-[12px] text-s4e-text-secondary">{row.background}</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="font-mono text-[12px] text-s4e-text-primary">{row.ratio}</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span
                      className={cn(
                        "text-[12px] font-medium",
                        row.status === "pass"
                          ? "text-s4e-scale-green-600"
                          : "text-s4e-scale-yellow-700",
                      )}
                    >
                      {row.level}
                    </span>
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

// ── Severity is never color alone ─────────────────────────────────────────

type Severity = {
  label: string;
  dotClass: string;
  textClass: string;
};

const severities: Severity[] = [
  { label: "Info",     dotClass: "bg-s4e-severity-info",     textClass: "text-s4e-scale-blue-600"   },
  { label: "Low",      dotClass: "bg-s4e-severity-low",      textClass: "text-s4e-scale-green-600"  },
  { label: "Medium",   dotClass: "bg-s4e-severity-medium",   textClass: "text-s4e-scale-yellow-700" },
  { label: "High",     dotClass: "bg-s4e-severity-high",     textClass: "text-s4e-scale-red-600"    },
  { label: "Critical", dotClass: "bg-s4e-severity-critical", textClass: "text-s4e-scale-purple-600" },
];

function SeverityNotColorAlone() {
  return (
    <div>
      <SectionTitle>Severity is never color alone</SectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-5">
        <p className="text-[13px] text-s4e-text-secondary leading-relaxed max-w-2xl">
          Color is never the only signal. Every severity badge pairs its color with a
          shape (the dot) and a written label, so the level is readable for users with
          low vision, color-blindness, or in print and grayscale exports.
        </p>
        <div className="flex flex-wrap gap-2">
          {severities.map((s) => (
            <span
              key={s.label}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-row"
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
  { component: "Dropdown",       keys: "↑ ↓ options · Enter select · Escape close" },
  { component: "CommandPalette", keys: "⌘K open · ↑ ↓ results · Enter activate" },
];

function KeyboardTable() {
  return (
    <div>
      <SectionTitle>Keyboard navigation</SectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        <div className="overflow-x-auto s4e-scrollbar-hide">
          <table className="w-full min-w-[420px] text-sm">
            <thead className="bg-s4e-surface-table-header">
              <tr className="text-left">
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled w-48">
                  Component
                </th>
                <th className="py-2.5 px-4 text-[10px] uppercase tracking-widest font-medium text-s4e-text-disabled">
                  Keys
                </th>
              </tr>
            </thead>
            <tbody>
              {keyboardRows.map((row) => (
                <tr
                  key={row.component}
                  className="border-t border-s4e-neutral-divider-10 hover:bg-s4e-surface-row-hover transition-colors duration-75"
                >
                  <td className="py-2.5 px-4">
                    <span className="text-[12px] font-medium text-s4e-text-primary">{row.component}</span>
                  </td>
                  <td className="py-2.5 px-4">
                    <span className="font-mono text-[12px] text-s4e-text-secondary">{row.keys}</span>
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
      <ContrastTable />
      <SeverityNotColorAlone />
      <KeyboardTable />
    </div>
  );
}
