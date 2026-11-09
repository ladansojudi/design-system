"use client";

import * as React from "react";
import { Check, Copy, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — MaskedValue
 *
 * Drop this file into your project at components/ui/masked-value.tsx.
 *
 * A secret (API key, token, password) shown masked, with optional reveal and
 * copy. Copy always copies the real value; revealing is a separate choice.
 *
 * Requires:
 *   • Tailwind CSS v4, lucide-react
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export interface MaskedValueProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value: string;
  /** What the secret is, e.g. "API key". Names the buttons for screen readers. */
  label: string;
  /** Characters left visible at the end while masked. */
  visibleChars?: number;
  revealable?: boolean;
  copyable?: boolean;
}

const btn =
  "inline-flex size-7 shrink-0 items-center justify-center rounded-md text-snt-text-secondary transition-colors cursor-pointer " +
  "hover:bg-snt-bg-subtle hover:text-snt-text-primary " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring [&_svg]:size-3.5";

export function MaskedValue({
  value,
  label,
  visibleChars = 4,
  revealable = true,
  copyable = true,
  className,
  ...props
}: MaskedValueProps) {
  const [shown, setShown] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const tail = visibleChars > 0 ? value.slice(-visibleChars) : "";
  const masked = "•".repeat(Math.min(12, Math.max(4, value.length - tail.length))) + tail;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked: nothing to announce */
    }
  };

  return (
    <div
      className={cn(
        "inline-flex h-9 max-w-full items-center gap-1 rounded-md border border-snt-border-default bg-snt-bg-subtle pl-3 pr-1",
        className,
      )}
      {...props}
    >
      <code className="min-w-0 flex-1 truncate font-mono text-snt-12 text-snt-text-primary">
        {shown ? value : <><span aria-hidden>{masked}</span><span className="sr-only">{label}, hidden{tail ? `, ends in ${tail}` : ""}</span></>}
      </code>
      {revealable && (
        <button type="button" className={btn} aria-label={shown ? `Hide ${label}` : `Show ${label}`} aria-pressed={shown} onClick={() => setShown((v) => !v)}>
          {shown ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
        </button>
      )}
      {copyable && (
        <button type="button" className={btn} aria-label={`Copy ${label}`} onClick={copy}>
          {copied ? <Check aria-hidden className="text-snt-text-success" /> : <Copy aria-hidden />}
        </button>
      )}
      <span role="status" className="sr-only">{copied ? `${label} copied` : ""}</span>
    </div>
  );
}
