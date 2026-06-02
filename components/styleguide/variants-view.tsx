"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared building blocks for the Preview / Code toggle on showcase variant
 * matrices. Each showcase owns a `useState<"preview" | "code">` and wires it
 * to <ViewToggle/>. When in "code" mode, <CodeLine/> renders a single-line
 * JSX snippet with a Copy button under the corresponding variant.
 */

export type View = "preview" | "code";

export function ViewToggle({ view, onChange }: { view: View; onChange: (v: View) => void }) {
  return (
    <div
      className="inline-flex items-center rounded-md border border-s4e-neutral-divider-10 bg-s4e-neutral-grey-100 p-0.5 gap-0.5"
      role="tablist"
      aria-label="Variant display mode"
    >
      {(["preview", "code"] as View[]).map((v) => (
        <button
          key={v}
          type="button"
          role="tab"
          aria-selected={view === v}
          onClick={() => onChange(v)}
          className={cn(
            "px-2.5 py-1 text-[11px] rounded font-medium transition-colors duration-100 capitalize",
            view === v
              ? "bg-s4e-neutral-grey-00 text-s4e-text-primary shadow-sm"
              : "text-s4e-text-secondary hover:text-s4e-text-primary",
          )}
        >
          {v}
        </button>
      ))}
    </div>
  );
}

export function CodeLine({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="flex items-center justify-between gap-3 rounded-md bg-s4e-btn-neutral-800 px-3 py-1.5">
      <code className="font-mono text-[11px] text-s4e-text-white overflow-x-auto s4e-scrollbar-hide whitespace-nowrap">
        {code}
      </code>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors",
          copied
            ? "bg-s4e-scale-green-500/15 text-s4e-scale-green-600"
            : "text-[#8a8a8a] hover:text-s4e-text-white hover:bg-white/5",
        )}
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
