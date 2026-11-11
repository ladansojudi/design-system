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
      className="inline-flex items-center rounded-md border border-snt-neutral-divider-10 bg-snt-neutral-grey-100 p-0.5 gap-0.5"
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
              ? "bg-snt-neutral-grey-00 text-snt-text-primary shadow-sm"
              : "text-snt-text-secondary hover:text-snt-text-primary",
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
    <div className="flex items-center justify-between gap-3 rounded-md bg-snt-btn-neutral-800 px-3 py-1.5">
      <code className="font-mono text-[11px] text-snt-text-white overflow-x-auto snt-scrollbar-hide whitespace-nowrap">
        {code}
      </code>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className={cn(
          "shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium cursor-pointer transition-colors",
          copied
            ? "bg-snt-scale-green-500/15 text-snt-scale-green-600"
            : "text-[#8a8a8a] hover:text-snt-text-white hover:bg-white/5",
        )}
      >
        {copied ? <Check size={10} /> : <Copy size={10} />}
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
