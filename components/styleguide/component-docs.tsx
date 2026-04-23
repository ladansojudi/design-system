"use client";

import type React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Shared section title ───────────────────────────────────────────────────

function DocSectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

// ── Anatomy ────────────────────────────────────────────────────────────────

export type AnatomyPart = { label: string; description: string };

export function Anatomy({
  parts,
}: {
  children?: React.ReactNode; // accepted for backwards compat, not rendered
  parts:     AnatomyPart[];
}) {
  return (
    <div>
      <DocSectionTitle>Anatomy</DocSectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
        <ol className="divide-y divide-s4e-neutral-divider-10">
          {parts.map((p, i) => (
            <li key={p.label} className="flex items-start gap-4 px-6 py-3">
              <span className="shrink-0 w-6 h-6 rounded-full bg-s4e-btn-primary-50 text-s4e-brand-primary-500 text-[11px] font-semibold inline-flex items-center justify-center">
                {i + 1}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium text-s4e-text-primary">{p.label}</div>
                <div className="text-[12px] text-s4e-text-disabled mt-0.5">{p.description}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

// ── Use Cases ──────────────────────────────────────────────────────────────

export function UseCases({ items }: { items: string[] }) {
  return (
    <div>
      <DocSectionTitle>Use Cases</DocSectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
        <ul className="space-y-2.5">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13px] text-s4e-text-secondary leading-relaxed">
              <span className="shrink-0 mt-[7px] w-1 h-1 rounded-full bg-s4e-brand-primary-500" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Guidelines (Do & Don't) ────────────────────────────────────────────────

export type Guideline = { type: "do" | "dont"; text: string };

export function Guidelines({ items }: { items: Guideline[] }) {
  return (
    <div>
      <DocSectionTitle>Guidelines</DocSectionTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((g, i) => {
          const isDo = g.type === "do";
          return (
            <div
              key={i}
              className={cn(
                "border rounded-xl px-4 py-3 flex items-start gap-3",
                isDo ? "border-s4e-scale-green-200 bg-s4e-scale-green-50" : "border-s4e-scale-red-200 bg-s4e-scale-red-50",
              )}
            >
              <div className={cn(
                "shrink-0 w-5 h-5 rounded-full flex items-center justify-center",
                isDo ? "bg-s4e-scale-green-500 text-white" : "bg-s4e-scale-red-500 text-white",
              )}>
                {isDo ? <Check size={12} /> : <X size={12} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className={cn(
                  "text-[11px] font-semibold uppercase tracking-widest mb-0.5",
                  isDo ? "text-s4e-scale-green-600" : "text-s4e-scale-red-600",
                )}>
                  {isDo ? "Do" : "Don't"}
                </div>
                <p className="text-[12px] text-s4e-text-primary leading-relaxed">{g.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
