"use client";

import type React from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

// ── Textarea component ────────────────────────────────────────────────────

type State = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

const STATE_BORDER: Record<State, string> = {
  Default:  "border-s4e-neutral-grey-300",
  Hover:    "border-s4e-neutral-grey-500",
  Focused:  "border-s4e-brand-primary-600 ring-2 ring-s4e-brand-primary-500/20",
  Error:    "border-s4e-scale-red-600",
  Disabled: "border-s4e-neutral-grey-200 opacity-40",
};

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  state = "Default",
  helperText,
  errorText,
  maxLength,
  rows = 4,
  disabled = false,
  showCounter = false,
}: {
  label?:       string;
  value?:       string;
  onChange?:    (v: string) => void;
  placeholder?: string;
  state?:       State;
  helperText?:  string;
  errorText?:   string;
  maxLength?:   number;
  rows?:        number;
  disabled?:    boolean;
  showCounter?: boolean;
}) {
  const isError    = state === "Error";
  const isDisabled = disabled || state === "Disabled";
  const len        = (value ?? "").length;

  return (
    <div className="w-full">
      {label && (
        <label className={cn(
          "block text-[11px] font-medium mb-1.5",
          isError ? "text-s4e-scale-red-600" : "text-s4e-text-secondary",
        )}>
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        value={value}
        disabled={isDisabled}
        maxLength={maxLength}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "block w-full rounded-md px-3 py-2 text-[13px] text-s4e-text-primary placeholder:text-s4e-text-disabled bg-s4e-surface-row",
          "border resize-y transition-colors",
          "focus:outline-none focus:border-s4e-brand-primary-600 focus:ring-2 focus:ring-s4e-brand-primary-500/20",
          STATE_BORDER[state],
          isDisabled && "cursor-not-allowed",
        )}
      />
      <div className="mt-1 flex items-start justify-between gap-2">
        <div className={cn(
          "text-[10.5px] leading-tight flex-1",
          isError ? "text-s4e-scale-red-600" : "text-s4e-text-disabled",
        )}>
          {isError ? errorText : helperText}
        </div>
        {(showCounter || maxLength) && (
          <div className={cn(
            "text-[10.5px] tabular-nums shrink-0",
            maxLength && len > maxLength * 0.9 ? "text-s4e-scale-yellow-700" : "text-s4e-text-disabled",
          )}>
            {len}{maxLength ? `/${maxLength}` : ""}
          </div>
        )}
      </div>
    </div>
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

export function TextareaShowcase() {
  const [note, setNote] = useState("Found exposed credentials in the staging .env file. Reproducible by hitting /api/debug while logged out.");
  const [empty, setEmpty] = useState("");
  const [overLimit, setOverLimit] = useState("This text is intentionally long to demonstrate the counter approaching the soft limit. Keep typing and the counter will turn amber.");

  return (
    <div className="space-y-10">
      <div>
        <SectionTitle>Variants</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Textarea
            label="Finding description"
            value={note}
            onChange={setNote}
            helperText="Markdown is supported."
          />
          <Textarea
            label="Reproduction steps"
            value={empty}
            onChange={setEmpty}
            placeholder="1. Visit …&#10;2. Click …&#10;3. Observe …"
          />
          <Textarea
            label="With counter"
            value={overLimit}
            onChange={setOverLimit}
            maxLength={200}
            helperText="Keep the summary short — full details go in the body below."
          />
          <Textarea
            label="With error"
            value="Too vague"
            state="Error"
            errorText="Add at least 40 characters describing the issue."
          />
        </div>
      </div>

      <div>
        <SectionTitle>States</SectionTitle>
        <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {(["Default", "Hover", "Focused", "Error", "Disabled"] as State[]).map((s) => (
            <Textarea
              key={s}
              label={s}
              rows={3}
              value="Sample value"
              state={s}
              disabled={s === "Disabled"}
              errorText={s === "Error" ? "Required field" : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
