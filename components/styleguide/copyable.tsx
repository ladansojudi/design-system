"use client";

import { useState } from "react";
import { Check, Code } from "lucide-react";
import { usePlatform, type Platform } from "@/components/styleguide/platform-provider";
import { useViewMode } from "@/components/styleguide/view-mode-provider";
import { cn } from "@/lib/utils";

const PLATFORM_LABEL: Record<Platform, string> = {
  react: "React",
  swift: "Swift",
  xml:   "Android",
};

/**
 * Wraps a showcase cell with a hover-revealed "copy code" chip — Dev view only.
 * In Design view it renders just the children: designers take components from
 * the Figma library ("Open in Figma"), not from the page.
 */
export function Copyable({
  snippets,
  children,
  className,
}: {
  /** React is required; native snippets are optional and fall back to React. */
  snippets: { react: string } & Partial<Record<Platform, string>>;
  children: React.ReactNode;
  className?: string;
}) {
  const { platform } = usePlatform();
  const { mode }     = useViewMode();
  const [copied, setCopied] = useState(false);

  if (mode !== "dev") {
    return <div className={cn("inline-block", className)}>{children}</div>;
  }

  const target = snippets[platform] ? platform : "react";

  const onCopy = () => {
    void navigator.clipboard?.writeText(snippets[target] ?? snippets.react);
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
        title={copied ? "Copied" : `Copy ${PLATFORM_LABEL[target]}`}
        className={cn(
          "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-snt-surface-app border border-snt-border-default shadow-snt-xs z-10",
          "flex items-center justify-center text-snt-text-secondary hover:text-snt-text-primary hover:bg-snt-bg-subtle",
          "transition-opacity cursor-pointer focus-visible:opacity-100",
          copied ? "opacity-100 text-snt-scale-green-600" : "opacity-0 group-hover:opacity-100 focus:opacity-100",
        )}
      >
        {copied ? <Check size={11} aria-hidden /> : <Code size={11} aria-hidden />}
      </button>
    </div>
  );
}
