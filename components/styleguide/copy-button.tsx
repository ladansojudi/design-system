"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyButton({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const [copied, setCopied] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      // fallback: ignore
    }
    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1500);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : `Copy ${value}`}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-xs text-s4e-text-secondary hover:text-s4e-text-primary transition-colors duration-100",
        className
      )}
    >
      {copied ? (
        <Check size={11} className="text-s4e-scale-green-500" />
      ) : (
        <Copy size={11} />
      )}
      {copied ? "Copied" : value}
    </button>
  );
}
