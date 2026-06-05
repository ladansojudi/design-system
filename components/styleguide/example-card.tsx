"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import { HighlightedCode } from "@/components/styleguide/highlighted-code";

export interface ExampleCardProps {
  title:    string;
  code:     string;
  preview:  React.ReactNode;
  /**
   * Vertical padding around the rendered preview. Use "tall" for visually
   * large components (Modal preview, Empty State) and "tight" for short
   * inline atoms (Badge, Tag).
   */
  density?: "tight" | "default" | "tall";
}

const PREVIEW_PAD: Record<NonNullable<ExampleCardProps["density"]>, string> = {
  tight:   "px-6 py-5",
  default: "px-6 py-8",
  tall:    "px-6 py-10",
};

/**
 * shadcn-style example card used inside the Dev mode of each component page.
 * One card per variant: header with title + Copy, rendered preview surface,
 * code block. Designers can ignore (they stay on Design mode); developers
 * see preview + code paired together.
 */
export function ExampleCard({ title, code, preview, density = "default" }: ExampleCardProps) {
  const [copied, setCopied] = useState(false);
  const onCopy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className="border border-s4e-neutral-divider-10 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-4 py-2 bg-s4e-surface-table-header border-b border-s4e-neutral-divider-10">
        <span className="text-[12px] font-medium text-s4e-text-primary">{title}</span>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium cursor-pointer transition-colors",
            copied
              ? "bg-s4e-scale-green-500/15 text-s4e-scale-green-600"
              : "text-s4e-text-secondary hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100",
          )}
        >
          {copied ? <Check size={11} /> : <Copy size={11} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className={cn("flex items-center justify-center border-b border-s4e-neutral-divider-10 bg-s4e-surface-app", PREVIEW_PAD[density])}>
        {preview}
      </div>
      <HighlightedCode code={code} lang="tsx" />
    </div>
  );
}
