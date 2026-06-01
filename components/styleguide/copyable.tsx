"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { usePlatform, type Platform } from "@/components/styleguide/platform-provider";
import { cn } from "@/lib/utils";

const PLATFORM_LABEL: Record<Platform, string> = {
  react: "React",
  swift: "Swift",
  xml:   "Android",
};

/**
 * Wraps any showcase cell with a hover-revealed copy chip. Snippets are
 * provided per-platform (React JSX / Swift / Android XML); the chip emits
 * the snippet matching the global Platform selection (top-bar tabs).
 */
export function Copyable({
  snippets,
  children,
  className,
}: {
  snippets: Record<Platform, string>;
  children: React.ReactNode;
  className?: string;
}) {
  const { platform } = usePlatform();
  const [copied, setCopied] = useState(false);
  const code = snippets[platform];
  const onCopy = () => {
    void navigator.clipboard?.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };
  return (
    <div className={cn("relative group inline-block", className)}>
      {children}
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        title={copied ? "Copied" : `Copy ${PLATFORM_LABEL[platform]}`}
        className={cn(
          "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-s4e-surface-app border border-s4e-neutral-divider-10 shadow-s4e-xs z-10",
          "flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100",
          "transition-opacity cursor-pointer focus-visible:opacity-100",
          copied ? "opacity-100 text-s4e-scale-green-600" : "opacity-0 group-hover:opacity-100 focus:opacity-100",
        )}
      >
        {copied ? <Check size={11} /> : <Copy size={11} />}
      </button>
    </div>
  );
}
