"use client";

import type React from "react";
import { useState } from "react";
import { Check, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Checkbox primitive ────────────────────────────────────────────────────

type Tone = "primary" | "neutral";

function Checkbox({
  checked,
  indeterminate = false,
  onChange,
  disabled = false,
  tone = "primary",
  label,
  description,
  id,
}: {
  checked:        boolean;
  indeterminate?: boolean;
  onChange?:      (v: boolean) => void;
  disabled?:      boolean;
  tone?:          Tone;
  label?:         string;
  description?:   string;
  id?:            string;
}) {
  const filled = checked || indeterminate;
  const fillClass = filled
    ? tone === "primary"
      ? "bg-s4e-btn-primary-600 border-s4e-btn-primary-600"
      : "bg-s4e-btn-neutral-800 border-s4e-btn-neutral-800"
    : "border-s4e-neutral-grey-400 bg-s4e-surface-row";

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start gap-2.5 group",
        disabled ? "cursor-not-allowed opacity-40" : "cursor-pointer",
      )}
    >
      <span className="relative inline-flex items-center justify-center mt-[1px]">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span
          aria-hidden
          className={cn(
            "w-[18px] h-[18px] rounded-[3px] border-2 flex items-center justify-center transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-offset-1 peer-focus-visible:ring-s4e-brand-primary-500",
            fillClass,
            !disabled && !filled && "group-hover:border-s4e-neutral-grey-600",
          )}
        >
          {indeterminate
            ? <Minus size={12} className="text-s4e-text-on-accent" />
            : checked && <Check size={12} className="text-s4e-text-on-accent" />
          }
        </span>
      </span>
      {(label || description) && (
        <span className="flex-1 min-w-0">
          {label && (
            <span className={cn(
              "block text-[13px] leading-tight",
              disabled ? "text-s4e-text-disabled" : "text-s4e-text-primary",
            )}>
              {label}
            </span>
          )}
          {description && (
            <span className="block text-[11px] text-s4e-text-disabled mt-0.5 leading-snug">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}

// ── Showcase ──────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

function PropertyRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-8 py-4 border-b border-s4e-neutral-divider-10 last:border-b-0">
      <span className="w-20 shrink-0 pt-1 text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-6">{children}</div>
    </div>
  );
}

const ITEMS = ["Firewalls", "Endpoints", "Containers", "Cloud services"];

export function CheckboxShowcase() {
  const [single, setSingle] = useState(true);
  const [list,   setList]   = useState<Record<string, boolean>>({
    Firewalls: true, Endpoints: false, Containers: true, "Cloud services": false,
  });
  const all  = ITEMS.every((i) => list[i]);
  const some = !all && ITEMS.some((i) => list[i]);

  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>States</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
          <PropertyRow label="Variants">
            <Checkbox checked={false}                 onChange={() => {}} />
            <Checkbox checked={single} onChange={setSingle} />
            <Checkbox checked={false} indeterminate onChange={() => {}} />
            <Checkbox checked tone="neutral" onChange={() => {}} />
          </PropertyRow>
          <PropertyRow label="Disabled">
            <Checkbox checked={false} disabled />
            <Checkbox checked        disabled />
            <Checkbox checked={false} indeterminate disabled />
          </PropertyRow>
        </div>
      </div>

      <div>
        <SectionTitle>With label · description</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-4">
          <Checkbox
            checked={single}
            onChange={setSingle}
            label="Enable real-time alerts"
            description="Notifies you within seconds when a new critical finding lands."
          />
          <Checkbox checked={false} onChange={() => {}} label="Subscribe to weekly digest" />
          <Checkbox checked disabled label="Account already verified" />
        </div>
      </div>

      <div>
        <SectionTitle>Indeterminate parent (multi-select pattern)</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 space-y-3">
          <Checkbox
            checked={all}
            indeterminate={some}
            onChange={(v) =>
              setList(Object.fromEntries(ITEMS.map((i) => [i, v])))
            }
            label="All asset types"
          />
          <div className="pl-6 space-y-2 border-l border-s4e-neutral-divider-10">
            {ITEMS.map((item) => (
              <Checkbox
                key={item}
                checked={list[item]}
                onChange={(v) => setList((prev) => ({ ...prev, [item]: v }))}
                label={item}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
