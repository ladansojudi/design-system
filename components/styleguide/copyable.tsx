"use client";

import { useState } from "react";
import { Check, Code, Copy, Palette } from "lucide-react";
import { usePlatform, type Platform } from "@/components/styleguide/platform-provider";
import { useViewMode } from "@/components/styleguide/view-mode-provider";
import { cn } from "@/lib/utils";

const PLATFORM_LABEL: Record<Platform, string> = {
  react: "React",
  swift: "Swift",
  xml:   "Android",
};

/**
 * Wraps any showcase cell with a hover-revealed copy chip. The chip's payload
 * depends on the active View mode (top-bar tabs):
 *   • Design mode → fetches the pre-rendered SVG (svgPath) and copies SVG markup.
 *     Designer pastes into Figma → component arrives as editable vector layers.
 *   • Dev mode    → copies the React JSX snippet (snippets.react).
 *
 * Falls back to JSX if no svgPath is provided (e.g., for compound demos like
 * Button Group where SVG export hasn't been wired yet).
 */
export function Copyable({
  snippets,
  svgPath,
  children,
  className,
}: {
  snippets: Record<Platform, string>;
  svgPath?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const { platform } = usePlatform();
  const { mode }     = useViewMode();
  const [copied, setCopied] = useState(false);

  const isDesign = mode === "design" && !!svgPath;

  const onCopy = async () => {
    let text = snippets[platform];
    if (isDesign && svgPath) {
      try {
        const res = await fetch(svgPath);
        if (res.ok) text = await res.text();
      } catch {
        // Fall back to JSX if fetch fails.
      }
    }
    void navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const title = copied
    ? "Copied"
    : isDesign
      ? "Copy as SVG (paste into Figma)"
      : `Copy ${PLATFORM_LABEL[platform]}`;

  const Icon = isDesign ? Palette : Code;

  return (
    <div className={cn("relative group inline-block", className)}>
      {children}
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Copied" : isDesign ? "Copy SVG" : "Copy code"}
        title={title}
        className={cn(
          "absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-s4e-surface-app border border-s4e-neutral-divider-10 shadow-s4e-xs z-10",
          "flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100",
          "transition-opacity cursor-pointer focus-visible:opacity-100",
          copied ? "opacity-100 text-s4e-scale-green-600" : "opacity-0 group-hover:opacity-100 focus:opacity-100",
        )}
      >
        {copied ? <Check size={11} /> : <Icon size={11} />}
      </button>
    </div>
  );
}
