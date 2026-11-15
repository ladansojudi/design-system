"use client";

import { useState } from "react";
import { deltaE } from "@/lib/color";
import { cn } from "@/lib/utils";

// Severity colours mean something, so a brand colour must not look like one.
// Same rule as `npm run lint:ds` (scripts/check-tokens.js): CIEDE2000 >= 15.
const MIN = 15;
const SEVERITIES: { id: string; label: string; hex: string }[] = [
  { id: "critical", label: "Critical", hex: "#b4136c" },
  { id: "high",     label: "High",     hex: "#e5532d" },
  { id: "medium",   label: "Medium",   hex: "#f0ad1d" },
  { id: "low",      label: "Low",      hex: "#1b9e8f" },
  { id: "info",     label: "Info",     hex: "#a8a29e" },
];

export function BrandCheck() {
  const [value, setValue] = useState("#6d28d9");
  const valid = /^#[0-9a-fA-F]{6}$/.test(value);
  const rows = valid ? SEVERITIES.map((s) => ({ ...s, de: deltaE(value.toLowerCase(), s.hex) })) : [];
  const clash = rows.filter((r) => r.de < MIN);

  return (
    <div className="rounded-xl border border-snt-border-default p-5">
      <label htmlFor="brand-check" className="text-snt-14 font-medium text-snt-text-primary">Your brand colour</label>
      <div className="mt-2 flex items-center gap-3">
        <input
          type="color"
          aria-label="Pick a brand colour"
          value={valid ? value : "#000000"}
          onChange={(e) => setValue(e.target.value)}
          className="size-9 cursor-pointer rounded-md border border-snt-border-default bg-transparent p-0.5"
        />
        <input
          id="brand-check"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          spellCheck={false}
          aria-invalid={!valid}
          className="h-9 w-32 rounded-md border border-snt-border-strong bg-snt-surface-app px-3 font-mono text-snt-14 text-snt-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
        />
      </div>

      {!valid ? (
        <p className="mt-4 text-snt-14 text-snt-text-error">Enter a colour as #rrggbb.</p>
      ) : (
        <>
          <ul className="mt-4 space-y-2">
            {rows.map((r) => (
              <li key={r.id} className="flex items-center gap-3 text-snt-14">
                <span aria-hidden className="size-4 rounded" style={{ backgroundColor: r.hex }} />
                <span className="w-16 text-snt-text-primary">{r.label}</span>
                <span className="w-20 font-mono tabular-nums text-snt-text-secondary">ΔE {r.de.toFixed(0)}</span>
                <span
                  className={cn(
                    "rounded px-1.5 py-0.5 text-snt-12 font-medium",
                    r.de < MIN ? "bg-snt-bg-error-subtle text-snt-text-error" : "bg-snt-bg-success-subtle text-snt-text-success",
                  )}
                >
                  {r.de < MIN ? "Too close" : "OK"}
                </span>
              </li>
            ))}
          </ul>
          <p role="status" className="mt-4 text-snt-14 leading-relaxed text-snt-text-secondary">
            {clash.length
              ? `This colour is too close to ${clash.map((c) => c.label).join(", ")}. People could read your brand colour as a severity. Pick another hue.`
              : `Far enough from every severity colour (ΔE ${MIN} or more). Test the dark theme's brand colour too.`}
          </p>
        </>
      )}
      <p className="mt-3 text-snt-12 text-snt-text-secondary">
        <code className="font-mono">npm run lint:ds</code> runs the same check on the real tokens, in light and dark.
      </p>
    </div>
  );
}
