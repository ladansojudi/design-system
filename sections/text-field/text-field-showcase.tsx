"use client";

import type React from "react";
import { cn } from "@/lib/utils";

// ── Types ──────────────────────────────────────────────────────────────────

type FieldState = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

// ── Styling maps ───────────────────────────────────────────────────────────

const labelColor: Record<FieldState, string> = {
  Default:  "text-s4e-text-disabled",
  Hover:    "text-s4e-text-secondary",
  Focused:  "text-s4e-brand-primary-600",
  Error:    "text-s4e-scale-red-600",
  Disabled: "text-s4e-text-disabled",
};

const filledStyle: Record<FieldState, string> = {
  Default:  "bg-s4e-neutral-grey-100 border-b-2 border-s4e-neutral-grey-300",
  Hover:    "bg-s4e-neutral-grey-200 border-b-2 border-s4e-neutral-grey-400",
  Focused:  "bg-s4e-neutral-grey-100 border-b-2 border-s4e-brand-primary-600",
  Error:    "bg-s4e-scale-red-50 border-b-2 border-s4e-scale-red-600",
  Disabled: "bg-s4e-neutral-grey-100 border-b-2 border-s4e-neutral-grey-200 opacity-40",
};

const outlinedStyle: Record<FieldState, string> = {
  Default:  "border border-s4e-neutral-grey-300",
  Hover:    "border border-s4e-neutral-grey-500",
  Focused:  "border-2 border-s4e-brand-primary-600",
  Error:    "border border-s4e-scale-red-600",
  Disabled: "border border-s4e-neutral-grey-200 opacity-40",
};

const valueByState: Record<FieldState, string> = {
  Default:  "Value",
  Hover:    "Hovered",
  Focused:  "Value",
  Error:    "Value",
  Disabled: "Value",
};

const STATES: FieldState[] = ["Default", "Hover", "Focused", "Error", "Disabled"];

// ── Field components ───────────────────────────────────────────────────────

function FilledField({ state, hasValue }: { state: FieldState; hasValue: boolean }) {
  return (
    <div className="flex-1 min-w-0">
      <div className={cn("rounded-t-md px-3 py-1.5", filledStyle[state])}>
        <div className={cn("text-[9px] font-medium leading-none mb-0.5", labelColor[state])}>
          Label
        </div>
        <div className="h-[13px] flex items-center text-[11px] text-s4e-text-primary gap-0.5">
          {hasValue ? valueByState[state] : ""}
          {state === "Focused" && (
            <span className="inline-block w-px h-[11px] bg-s4e-brand-primary-600" />
          )}
        </div>
      </div>
      <div className="h-[14px] flex items-start pt-0.5">
        {state === "Error" && (
          <span className="text-[9px] text-s4e-scale-red-600 px-3">Incorrect</span>
        )}
      </div>
    </div>
  );
}

function OutlinedField({ state, hasValue }: { state: FieldState; hasValue: boolean }) {
  const isActive = hasValue || state === "Focused";
  return (
    <div className="flex-1 min-w-0">
      <div className={cn("relative rounded-md px-3 pt-3 pb-1.5", outlinedStyle[state])}>
        <div
          className={cn(
            "absolute text-[9px] font-medium leading-none",
            isActive
              ? cn("-top-[6px] left-2 bg-s4e-surface-app px-1", labelColor[state])
              : "top-1/2 -translate-y-1/2 left-3 text-s4e-text-disabled",
          )}
        >
          Label
        </div>
        <div className="h-[13px] flex items-center text-[11px] text-s4e-text-primary gap-0.5">
          {hasValue ? valueByState[state] : ""}
          {state === "Focused" && (
            <span className="inline-block w-px h-[11px] bg-s4e-brand-primary-600" />
          )}
        </div>
      </div>
      <div className="h-[14px] flex items-start pt-0.5">
        {state === "Error" && (
          <span className="text-[9px] text-s4e-scale-red-600">Incorrect</span>
        )}
      </div>
    </div>
  );
}

// ── Field Card ─────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
      <span className="text-[15px] font-semibold text-s4e-text-primary">{children}</span>
    </div>
  );
}

function FieldCard({ title, variant }: { title: string; variant: "filled" | "outlined" }) {
  const Field = variant === "filled" ? FilledField : OutlinedField;
  return (
    <div>
      <SectionTitle>{title}</SectionTitle>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-4 sm:px-6 py-5">
        {/* Mobile: stacked per state */}
        <div className="sm:hidden space-y-5">
          {STATES.map((s) => (
            <div key={s} className="space-y-2">
              <div className="text-[9px] font-medium uppercase tracking-widest text-s4e-text-disabled">
                {s}
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-s4e-text-disabled">
                  Label
                </div>
                <Field state={s} hasValue={false} />
              </div>
              <div className="flex gap-2 items-start">
                <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-s4e-text-disabled">
                  Value
                </div>
                <Field state={s} hasValue={true} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: 5-column matrix */}
        <div className="hidden sm:block space-y-3">
          {/* State column headers */}
          <div className="flex gap-2">
            <div className="w-10 shrink-0" />
            {STATES.map((s) => (
              <div
                key={s}
                className="flex-1 text-center text-[9px] font-medium uppercase tracking-widest text-s4e-text-disabled"
              >
                {s}
              </div>
            ))}
          </div>

          {/* Empty row */}
          <div className="flex gap-2 items-start">
            <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-s4e-text-disabled">
              Label
            </div>
            {STATES.map((s) => (
              <Field key={s} state={s} hasValue={false} />
            ))}
          </div>

          {/* Value row */}
          <div className="flex gap-2 items-start">
            <div className="w-10 shrink-0 pt-2 text-[9px] font-medium uppercase tracking-widest text-s4e-text-disabled">
              Value
            </div>
            {STATES.map((s) => (
              <Field key={s} state={s} hasValue={true} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main export ────────────────────────────────────────────────────────────

export function TextFieldShowcase() {
  return (
    <div className="space-y-10">
      <FieldCard title="Filled" variant="filled" />
      <FieldCard title="Outlined" variant="outlined" />
    </div>
  );
}
