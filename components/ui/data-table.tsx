"use client";

import * as React from "react";
import { Info, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — DataTable
 *
 * Drop this file into your project at components/ui/data-table.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type Severity = "high" | "critical";

const SEVERITY_STYLES: Record<Severity, { label: string; bg: string; accent: string; text: string }> = {
  high: {
    label:  "High",
    bg:     "bg-s4e-scale-red-50",
    accent: "border-l-[3px] border-s4e-scale-red-500",
    text:   "text-s4e-scale-red-600",
  },
  critical: {
    label:  "Critical",
    bg:     "bg-s4e-scale-purple-50",
    accent: "border-l-[3px] border-s4e-scale-purple-500",
    text:   "text-s4e-scale-purple-600",
  },
};

export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {}

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "border border-s4e-neutral-divider-10 rounded-xl bg-s4e-surface-app overflow-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
DataTable.displayName = "DataTable";

export interface DataTableHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title:         string;
  description:   string;
  badge?:        string;
  viewAllLabel?: string;
  onViewAll?:    () => void;
  tooltip?:      string;
}

export const DataTableHeader = React.forwardRef<HTMLDivElement, DataTableHeaderProps>(
  (
    {
      title,
      description,
      badge,
      viewAllLabel,
      onViewAll,
      tooltip = "Shortcut info about the widget — typically explains what powers this data.",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-5 py-3 bg-s4e-neutral-grey-100 border-b border-s4e-neutral-divider-10 rounded-t-xl",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[14px] font-semibold text-s4e-text-primary">{title}</span>
          <InfoTooltip text={tooltip} />
        </div>
        <span className="text-[12px] text-s4e-text-disabled truncate flex-1 min-w-0">{description}</span>
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-s4e-scale-yellow-50 text-s4e-scale-yellow-700 text-[11px] font-medium shrink-0">
            <span className="w-[6px] h-[6px] rounded-full bg-s4e-scale-yellow-500" />
            {badge}
          </span>
        )}
        {viewAllLabel && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-[12px] font-medium text-s4e-brand-primary-500 hover:text-s4e-brand-primary-600 transition-colors shrink-0 underline underline-offset-2"
          >
            {viewAllLabel}
          </button>
        )}
      </div>
    );
  },
);
DataTableHeader.displayName = "DataTableHeader";

export interface DataTableBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  scroll?:    boolean;
  minWidth?:  number;
}

export const DataTableBody = React.forwardRef<HTMLDivElement, DataTableBodyProps>(
  ({ scroll = true, minWidth = 560, className, children, ...props }, ref) => {
    const inner = (
      <div
        ref={ref}
        style={scroll ? { minWidth } : undefined}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    );
    return scroll ? (
      <div className="overflow-x-auto s4e-scrollbar-hide">{inner}</div>
    ) : (
      inner
    );
  },
);
DataTableBody.displayName = "DataTableBody";

const GRID_COLS = "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_90px_80px] gap-3";

export interface DataTableColumnHeadersProps extends React.HTMLAttributes<HTMLDivElement> {
  threatsLabel?:        string;
  threatsTooltip?:      string;
  assetLabel?:          string;
  assetTooltip?:        string;
  dateLabel?:           string;
  severityLabel?:       string;
}

export const DataTableColumnHeaders = React.forwardRef<HTMLDivElement, DataTableColumnHeadersProps>(
  (
    {
      threatsLabel    = "Threats",
      threatsTooltip  = "Name of the detected threat, finding or CVE.",
      assetLabel      = "Asset",
      assetTooltip    = "The domain, IP or service the threat was found on.",
      dateLabel       = "Date",
      severityLabel   = "Severity",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(GRID_COLS, "px-5 py-2.5 border-b border-s4e-neutral-divider-10", className)}
        {...props}
      >
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide">{threatsLabel}</span>
          <InfoTooltip text={threatsTooltip} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide">{assetLabel}</span>
          <InfoTooltip text={assetTooltip} />
        </div>
        <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide text-right">{dateLabel}</span>
        <span className="text-[11px] font-medium text-s4e-text-disabled uppercase tracking-wide text-right">{severityLabel}</span>
      </div>
    );
  },
);
DataTableColumnHeaders.displayName = "DataTableColumnHeaders";

export interface DataTableRowProps extends React.HTMLAttributes<HTMLDivElement> {
  threat:   string;
  asset:    string;
  date:     string;
  severity: Severity;
}

export const DataTableRow = React.forwardRef<HTMLDivElement, DataTableRowProps>(
  ({ threat, asset, date, severity, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          GRID_COLS,
          "items-center px-5 py-3 border-b border-s4e-neutral-divider-10 last:border-b-0 hover:bg-s4e-neutral-grey-100/50 transition-colors",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[14px] text-s4e-text-primary truncate">{threat}</span>
          <InfoTooltip text={threat} />
        </div>
        <div className="flex items-center gap-1.5 min-w-0">
          <span className="text-[14px] text-s4e-text-primary truncate">{asset}</span>
          <InfoTooltip text={asset} />
        </div>
        <span className="text-[12px] text-s4e-text-secondary text-right tabular-nums">{date}</span>
        <div className="flex justify-end">
          <SeverityCell severity={severity} />
        </div>
      </div>
    );
  },
);
DataTableRow.displayName = "DataTableRow";

export interface DataTableFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  perPage?:    number;
  rangeLabel?: string;
  onPrev?:     () => void;
  onNext?:     () => void;
}

export const DataTableFooter = React.forwardRef<HTMLDivElement, DataTableFooterProps>(
  ({ perPage = 3, rangeLabel = "1–3 of 492", onPrev, onNext, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-end gap-4 px-5 py-3 border-t border-s4e-neutral-divider-10",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <span className="text-[12px] text-s4e-text-disabled">Row per page:</span>
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[12px] text-s4e-text-primary hover:text-s4e-brand-primary-500 transition-colors"
          >
            {perPage}
            <ChevronDown size={12} className="text-s4e-text-disabled" />
          </button>
        </div>
        <span className="text-[12px] text-s4e-text-disabled tabular-nums">{rangeLabel}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            className="w-6 h-6 rounded hover:bg-s4e-neutral-grey-100 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
          >
            <ChevronLeft size={13} />
          </button>
          <button
            type="button"
            onClick={onNext}
            className="w-6 h-6 rounded hover:bg-s4e-neutral-grey-100 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    );
  },
);
DataTableFooter.displayName = "DataTableFooter";

function SeverityCell({ severity }: { severity: Severity }) {
  const cfg = SEVERITY_STYLES[severity];
  return (
    <div className={cn("flex items-center justify-center rounded-md px-3 py-1 w-20", cfg.bg, cfg.accent)}>
      <span className={cn("text-[12px] font-medium", cfg.text)}>{cfg.label}</span>
    </div>
  );
}

function InfoTooltip({ text }: { text: string }) {
  const triggerRef = React.useRef<HTMLSpanElement>(null);
  const [show, setShow]     = React.useState(false);
  const [coords, setCoords] = React.useState({ top: 0, left: 0 });

  React.useLayoutEffect(() => {
    if (!show || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top:  rect.top - 8,
      left: rect.left + rect.width / 2,
    });
  }, [show]);

  return (
    <span
      ref={triggerRef}
      className="inline-flex items-center shrink-0"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <Info size={13} className="text-s4e-text-disabled hover:text-s4e-text-primary shrink-0 cursor-help transition-colors" />
      {show && (
        <span
          style={{ top: coords.top, left: coords.left }}
          className="fixed -translate-x-1/2 -translate-y-full w-56 px-3 py-2 rounded-lg bg-s4e-neutral-grey-900 text-s4e-text-inverse text-[11px] leading-relaxed pointer-events-none z-toast shadow-s4e-lg"
        >
          {text}
        </span>
      )}
    </span>
  );
}
