import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — ActivityTimeline
 *
 * Drop this file into your project at components/ui/activity-timeline.tsx.
 *
 * A vertical, time-ordered list of events: an attack timeline, an audit log,
 * the history of a finding. No "use client".
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export type TimelineTone = "neutral" | "info" | "success" | "warning" | "error";

export type TimelineItem = {
  id: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Visible time, e.g. "14:02" or "2 min ago". */
  time: string;
  /** Machine-readable time (ISO 8601) for <time dateTime>. */
  dateTime?: string;
  actor?: string;
  tone?: TimelineTone;
  /** Optional icon inside the marker; replaces the dot. */
  icon?: React.ReactNode;
};

const DOT: Record<TimelineTone, string> = {
  neutral: "bg-snt-neutral-grey-400",
  info:    "bg-snt-scale-blue-500",
  success: "bg-snt-scale-green-500",
  warning: "bg-snt-scale-yellow-500",
  error:   "bg-snt-scale-red-500",
};

export interface ActivityTimelineProps extends React.HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
}

export function ActivityTimeline({ items, className, ...props }: ActivityTimelineProps) {
  return (
    <ol className={cn("relative", className)} {...props}>
      {items.map((item, i) => (
        <li key={item.id} className="relative flex gap-3 pb-6 last:pb-0">
          {i < items.length - 1 && (
            <span aria-hidden className="absolute bottom-0 left-[11px] top-6 w-px bg-snt-border-default" />
          )}
          <span aria-hidden className="relative flex size-6 shrink-0 items-center justify-center rounded-full bg-snt-surface-app text-snt-text-secondary [&_svg]:size-3.5">
            {item.icon ?? <span className={cn("size-2.5 rounded-full ring-4 ring-snt-surface-app", DOT[item.tone ?? "neutral"])} />}
          </span>
          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-3">
              <p className="text-snt-14 font-medium text-snt-text-primary">{item.title}</p>
              <time dateTime={item.dateTime} className="shrink-0 text-snt-12 tabular-nums text-snt-text-secondary">{item.time}</time>
            </div>
            {item.actor && <p className="text-snt-12 text-snt-text-secondary">{item.actor}</p>}
            {item.description && <div className="mt-1 text-snt-14 leading-relaxed text-snt-text-secondary">{item.description}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}
