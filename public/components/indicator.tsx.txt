"use client";

import * as React from "react";
import { AtSign, Check, Copy, Globe, Hash, Link2, Network } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Indicator
 *
 * Drop this file into your project at components/ui/indicator.tsx.
 *
 * An indicator of compromise (IOC): an IP, domain, URL, file hash or email,
 * with its type, a reputation verdict and copy. Long hashes are shortened in
 * the middle; `defang` shows example[.]com so it can't be clicked by mistake.
 * Copy always copies the real value.
 *
 * Requires:
 *   • Tailwind CSS v4, lucide-react
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type IndicatorType = "ip" | "domain" | "url" | "hash" | "email";
export type IndicatorVerdict = "malicious" | "suspicious" | "clean" | "unknown";

const TYPE: Record<IndicatorType, { label: string; icon: React.ComponentType<{ "aria-hidden"?: boolean }> }> = {
  ip:     { label: "IP",     icon: Network },
  domain: { label: "Domain", icon: Globe },
  url:    { label: "URL",    icon: Link2 },
  hash:   { label: "Hash",   icon: Hash },
  email:  { label: "Email",  icon: AtSign },
};

const VERDICT: Record<IndicatorVerdict, { label: string; tone: string }> = {
  malicious:  { label: "Malicious",  tone: "bg-snt-bg-error-subtle text-snt-text-error" },
  suspicious: { label: "Suspicious", tone: "bg-snt-bg-warning-subtle text-snt-text-warning" },
  clean:      { label: "Clean",      tone: "bg-snt-bg-success-subtle text-snt-text-success" },
  unknown:    { label: "Unknown",    tone: "bg-snt-bg-subtle text-snt-text-secondary" },
};

/** example.com → example[.]com, http → hxxp. */
export function defang(value: string) {
  return value.replace(/^http/i, "hxxp").replace(/\./g, "[.]").replace(/@/g, "[@]");
}

function shorten(value: string, max = 24) {
  return value.length <= max ? value : `${value.slice(0, 10)}…${value.slice(-10)}`;
}

export interface IndicatorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  value: string;
  type: IndicatorType;
  verdict?: IndicatorVerdict;
  /** Show the value defanged (example[.]com). Copy still copies the original. */
  defang?: boolean;
  copyable?: boolean;
}

export function Indicator({ value, type, verdict, defang: doDefang = false, copyable = true, className, ...props }: IndicatorProps) {
  const [copied, setCopied] = React.useState(false);
  const t = TYPE[type];
  const Icon = t.icon;
  const display = doDefang && type !== "hash" ? defang(value) : value;
  const short = type === "hash" ? shorten(display) : display;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch { /* clipboard blocked */ }
  };

  return (
    <div className={cn("inline-flex max-w-full items-center gap-2", className)} {...props}>
      <span className="inline-flex h-7 min-w-0 items-center gap-1.5 rounded-md border border-snt-border-default bg-snt-surface-app pl-2 pr-1">
        <span className="flex shrink-0 items-center gap-1 text-snt-11 font-medium uppercase tracking-wide text-snt-text-secondary [&_svg]:size-3">
          <Icon aria-hidden />
          {t.label}
        </span>
        <code title={short !== value ? value : undefined} className="min-w-0 truncate font-mono text-snt-12 text-snt-text-primary">
          {short}
        </code>
        {copyable && (
          <button
            type="button"
            aria-label={`Copy ${t.label.toLowerCase()} ${value}`}
            onClick={copy}
            className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded text-snt-text-secondary hover:bg-snt-bg-subtle hover:text-snt-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring [&_svg]:size-3"
          >
            {copied ? <Check aria-hidden className="text-snt-text-success" /> : <Copy aria-hidden />}
          </button>
        )}
      </span>
      {verdict && (
        <span className={cn("inline-flex h-6 shrink-0 items-center rounded-md px-2 text-snt-12 font-medium ring-1 ring-inset ring-current/15", VERDICT[verdict].tone)}>
          {VERDICT[verdict].label}
        </span>
      )}
      <span role="status" className="sr-only">{copied ? "Copied" : ""}</span>
    </div>
  );
}
