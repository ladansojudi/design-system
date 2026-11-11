"use client";

import * as React from "react";
import { Info, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SeverityBadge, type Severity } from "@/components/ui/severity-badge";

/**
 * sentinel/ui — DataTable
 *
 * Drop this file into your project at components/ui/data-table.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

// Rows use the system's SeverityBadge, so severity looks the same everywhere.
export type DataTableProps = React.HTMLAttributes<HTMLDivElement>;

// Lets DataTableBody (role="table") take its accessible name from the
// DataTableHeader title.
const DataTableContext = React.createContext<{ titleId: string } | null>(null);

export const DataTable = React.forwardRef<HTMLDivElement, DataTableProps>(
  ({ className, children, ...props }, ref) => {
    const titleId = `${React.useId()}-title`;
    const context = React.useMemo(() => ({ titleId }), [titleId]);
    return (
      <DataTableContext.Provider value={context}>
      <div
        ref={ref}
        className={cn(
          "border border-snt-border-default rounded-xl bg-snt-surface-app shadow-snt-xs overflow-hidden",
          className,
        )}
        {...props}
      >
        {children}
      </div>
      </DataTableContext.Provider>
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
    const ctx = React.useContext(DataTableContext);
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-3 px-5 py-3 compact:px-4 compact:py-2 bg-snt-bg-subtle border-b border-snt-border-default rounded-t-xl",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2 shrink-0">
          <span id={ctx?.titleId} className="text-snt-14 font-semibold text-snt-text-primary">{title}</span>
          <InfoTooltip text={tooltip} label={`About ${title}`} />
        </div>
        <span className="text-snt-12 text-snt-text-secondary truncate flex-1 min-w-0">{description}</span>
        {badge && (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-snt-bg-warning-subtle text-snt-scale-yellow-700 text-snt-11 font-medium shrink-0">
            <span aria-hidden className="w-[6px] h-[6px] rounded-full bg-snt-scale-yellow-500" />
            {badge}
          </span>
        )}
        {viewAllLabel && (
          <button
            type="button"
            onClick={onViewAll}
            className="text-snt-12 font-medium text-snt-brand-primary-500 hover:text-snt-brand-primary-600 transition-colors shrink-0 underline underline-offset-2"
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
    const ctx = React.useContext(DataTableContext);
    const inner = (
      <div
        ref={ref}
        role="table"
        aria-labelledby={props["aria-label"] ? undefined : ctx?.titleId}
        style={scroll ? { minWidth } : undefined}
        className={cn(className)}
        {...props}
      >
        {children}
      </div>
    );
    return scroll ? (
      <div className="overflow-x-auto snt-scrollbar-hide">{inner}</div>
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
        role="row"
        className={cn(GRID_COLS, "px-5 py-2.5 compact:px-4 compact:py-1.5 border-b border-snt-border-default", className)}
        {...props}
      >
        <div role="columnheader" className="flex items-center gap-1.5">
          <span className="text-snt-11 font-medium text-snt-text-secondary uppercase tracking-wide">{threatsLabel}</span>
          <InfoTooltip text={threatsTooltip} label={`About ${threatsLabel}`} />
        </div>
        <div role="columnheader" className="flex items-center gap-1.5">
          <span className="text-snt-11 font-medium text-snt-text-secondary uppercase tracking-wide">{assetLabel}</span>
          <InfoTooltip text={assetTooltip} label={`About ${assetLabel}`} />
        </div>
        <span role="columnheader" className="text-snt-11 font-medium text-snt-text-secondary uppercase tracking-wide text-right">{dateLabel}</span>
        <span role="columnheader" className="text-snt-11 font-medium text-snt-text-secondary uppercase tracking-wide text-right">{severityLabel}</span>
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
        role="row"
        className={cn(
          GRID_COLS,
          "items-center px-5 py-3 compact:px-4 compact:py-1.5 border-b border-snt-border-default last:border-b-0 hover:bg-snt-bg-subtle/50 transition-colors",
          className,
        )}
        {...props}
      >
        <div role="cell" className="flex items-center gap-1.5 min-w-0">
          <span className="text-snt-14 text-snt-text-primary truncate">{threat}</span>
          {/* Hover-only reveal of truncated text — AT already reads the full cell. */}
          <InfoTooltip text={threat} />
        </div>
        <div role="cell" className="flex items-center gap-1.5 min-w-0">
          <span className="text-snt-14 text-snt-text-primary truncate">{asset}</span>
          <InfoTooltip text={asset} />
        </div>
        <span role="cell" className="text-snt-12 text-snt-text-secondary text-right tabular-nums">{date}</span>
        <div role="cell" className="flex justify-end">
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
        role="navigation"
        aria-label="Pagination"
        className={cn(
          "flex items-center justify-end gap-4 px-5 py-3 compact:px-4 compact:py-2 border-t border-snt-border-default",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-2">
          <span className="text-snt-12 text-snt-text-secondary" aria-hidden>Rows per page:</span>
          <button
            type="button"
            aria-label={`Rows per page: ${perPage}`}
            className="inline-flex items-center gap-1 text-snt-12 text-snt-text-primary hover:text-snt-brand-primary-500 transition-colors"
          >
            {perPage}
            <ChevronDown size={12} aria-hidden className="text-snt-text-secondary" />
          </button>
        </div>
        <span className="text-snt-12 text-snt-text-secondary tabular-nums" aria-live="polite">{rangeLabel}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onPrev}
            aria-label="Previous page"
            className="w-6 h-6 rounded hover:bg-snt-bg-subtle flex items-center justify-center text-snt-text-secondary hover:text-snt-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
          >
            <ChevronLeft size={13} aria-hidden />
          </button>
          <button
            type="button"
            onClick={onNext}
            aria-label="Next page"
            className="w-6 h-6 rounded hover:bg-snt-bg-subtle flex items-center justify-center text-snt-text-secondary hover:text-snt-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
          >
            <ChevronRight size={13} aria-hidden />
          </button>
        </div>
      </div>
    );
  },
);
DataTableFooter.displayName = "DataTableFooter";

function SeverityCell({ severity }: { severity: Severity }) {
  return <SeverityBadge severity={severity} size="sm" className="ml-auto" />;
}

// With a `label`, the icon is a focusable button that shows the tooltip on
// hover *and* focus (Escape hides it). Without one it's a decorative,
// mouse-only reveal for text that assistive tech can already read.
function InfoTooltip({ text, label }: { text: string; label?: string }) {
  const triggerRef = React.useRef<HTMLElement>(null);
  const tooltipId  = React.useId();
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

  const bubble = show && (
    <span
      id={tooltipId}
      role={label ? "tooltip" : undefined}
      style={{ top: coords.top, left: coords.left }}
      className="fixed -translate-x-1/2 -translate-y-full w-56 px-3 py-2 rounded-lg bg-snt-neutral-grey-900 text-snt-text-inverse text-snt-11 leading-relaxed pointer-events-none z-toast shadow-snt-lg"
    >
      {text}
    </span>
  );
  const icon = (
    <Info size={13} aria-hidden className="text-snt-text-secondary hover:text-snt-text-primary shrink-0 cursor-help transition-colors" />
  );

  if (!label) {
    return (
      <span
        ref={triggerRef as React.RefObject<HTMLSpanElement>}
        aria-hidden
        className="inline-flex items-center shrink-0"
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        {icon}
        {bubble}
      </span>
    );
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      type="button"
      aria-label={label}
      aria-describedby={show ? tooltipId : undefined}
      className="inline-flex items-center shrink-0 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onFocus={() => setShow(true)}
      onBlur={() => setShow(false)}
      onKeyDown={(e) => { if (e.key === "Escape") setShow(false); }}
    >
      {icon}
      {bubble}
    </button>
  );
}
