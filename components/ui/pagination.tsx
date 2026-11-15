import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Pagination
 *
 * Drop this file into your project at components/ui/pagination.tsx.
 *
 * Page controls for a table or list: previous, page numbers with "…" gaps,
 * next. Controlled: you own `page`. No "use client" — it renders in Server
 * Components; pass `onPageChange` from a client component.
 *
 * Requires:
 *   • Tailwind CSS v4, lucide-react
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

export interface PaginationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** Current page, 1-based. */
  page: number;
  pageCount: number;
  onPageChange?: (page: number) => void;
  /** Page numbers shown on each side of the current page. */
  siblingCount?: number;
  size?: "sm" | "md";
  /** Accessible name of the navigation landmark. */
  label?: string;
}

const range = (from: number, to: number) => Array.from({ length: Math.max(0, to - from + 1) }, (_, i) => from + i);

/** The page numbers to show, with "…" where pages are skipped. */
export function pageRange(page: number, pageCount: number, siblingCount = 1): (number | "…")[] {
  const slots = siblingCount * 2 + 5; // first, last, current, two gaps
  if (pageCount <= slots) return range(1, pageCount);
  const left = Math.max(page - siblingCount, 1);
  const right = Math.min(page + siblingCount, pageCount);
  const gapLeft = left > 2;
  const gapRight = right < pageCount - 1;
  const edge = 3 + 2 * siblingCount;
  if (!gapLeft && gapRight) return [...range(1, edge), "…", pageCount];
  if (gapLeft && !gapRight) return [1, "…", ...range(pageCount - edge + 1, pageCount)];
  return [1, "…", ...range(left, right), "…", pageCount];
}

const BASE =
  "inline-flex items-center justify-center rounded-md font-medium tabular-nums transition-colors cursor-pointer select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring " +
  "disabled:opacity-40 disabled:cursor-not-allowed";

export function Pagination({
  page,
  pageCount,
  onPageChange,
  siblingCount = 1,
  size = "md",
  label = "Pagination",
  className,
  ...props
}: PaginationProps) {
  const current = Math.min(Math.max(1, page), Math.max(1, pageCount));
  const dim = size === "sm" ? "h-8 min-w-8 px-2 text-snt-12" : "h-9 min-w-9 px-2.5 text-snt-14";
  const go = (p: number) => onPageChange?.(Math.min(Math.max(1, p), pageCount));

  return (
    <nav aria-label={label} className={className} {...props}>
      <ul className="flex items-center gap-1">
        <li>
          <button
            type="button"
            aria-label="Previous page"
            disabled={current <= 1}
            onClick={() => go(current - 1)}
            className={cn(BASE, dim, "text-snt-text-secondary hover:bg-snt-bg-subtle hover:text-snt-text-primary [&_svg]:size-4")}
          >
            <ChevronLeft aria-hidden />
          </button>
        </li>
        {pageRange(current, pageCount, siblingCount).map((item, i) =>
          item === "…" ? (
            <li key={`gap-${i}`} aria-hidden className={cn("inline-flex items-center justify-center text-snt-text-secondary", dim)}>
              …
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                aria-label={`Page ${item}`}
                aria-current={item === current ? "page" : undefined}
                onClick={() => go(item)}
                className={cn(
                  BASE,
                  dim,
                  item === current
                    ? "bg-snt-text-primary text-snt-text-inverse shadow-snt-raised"
                    : "text-snt-text-secondary hover:bg-snt-bg-subtle hover:text-snt-text-primary",
                )}
              >
                {item}
              </button>
            </li>
          ),
        )}
        <li>
          <button
            type="button"
            aria-label="Next page"
            disabled={current >= pageCount}
            onClick={() => go(current + 1)}
            className={cn(BASE, dim, "text-snt-text-secondary hover:bg-snt-bg-subtle hover:text-snt-text-primary [&_svg]:size-4")}
          >
            <ChevronRight aria-hidden />
          </button>
        </li>
      </ul>
    </nav>
  );
}
