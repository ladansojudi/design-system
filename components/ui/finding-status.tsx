import * as React from "react";
import { CircleCheck, CircleDashed, CircleDot, CircleSlash, ShieldMinus } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — FindingStatus
 *
 * Drop this file into your project at components/ui/finding-status.tsx.
 *
 * Where a finding is in its lifecycle. Every status has its own icon as well
 * as a colour, so it never relies on colour alone. No "use client".
 *
 * Requires:
 *   • Tailwind CSS v4, lucide-react
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type FindingStatusValue = "open" | "in-progress" | "resolved" | "accepted-risk" | "false-positive";

type Config = { label: string; icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>; tone: string };

const STATUS: Record<FindingStatusValue, Config> = {
  open:             { label: "Open",           icon: CircleDot,    tone: "bg-snt-bg-error-subtle text-snt-text-error" },
  "in-progress":    { label: "In progress",    icon: CircleDashed, tone: "bg-snt-bg-info-subtle text-snt-text-info" },
  resolved:         { label: "Resolved",       icon: CircleCheck,  tone: "bg-snt-bg-success-subtle text-snt-text-success" },
  "accepted-risk":  { label: "Accepted risk",  icon: ShieldMinus,  tone: "bg-snt-bg-warning-subtle text-snt-text-warning" },
  "false-positive": { label: "False positive", icon: CircleSlash,  tone: "bg-snt-bg-subtle text-snt-text-secondary" },
};

export const FINDING_STATUSES = Object.keys(STATUS) as FindingStatusValue[];

export interface FindingStatusProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: FindingStatusValue;
  /** Override the visible label (e.g. for translation). */
  label?: string;
  size?: "sm" | "md";
}

export function FindingStatus({ status, label, size = "md", className, ...props }: FindingStatusProps) {
  const cfg = STATUS[status];
  const Icon = cfg.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-medium ring-1 ring-inset ring-current/15",
        size === "sm" ? "h-5 px-2 text-snt-11 [&_svg]:size-3" : "h-6 px-2.5 text-snt-12 [&_svg]:size-3.5",
        cfg.tone,
        className,
      )}
      {...props}
    >
      <Icon aria-hidden />
      {label ?? cfg.label}
    </span>
  );
}
