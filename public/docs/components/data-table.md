---
title: Data Table
slug: data-table
category: Organism
status: stable
source: components/ui/data-table.tsx
styleguide: /styleguide/data-table
figma: TBD
apg: https://www.w3.org/WAI/ARIA/apg/patterns/table/
---

# Data Table

A composable card that lists findings (threat, asset, date, severity) with a header, column headers, rows and a pagination footer.

## Overview

### When to use
- Lists of findings or threats where users scan, compare and page through records.

### When not to use
- Fewer than ~5 items with rich content → a list of [Cards](./cards.md).
- Key/value details of one record → a description list.
- Arbitrary columns. This table currently has a **fixed threat-row schema** (see Known gaps).

## Anatomy

```
┌──────────────────────────────────────────────────────────────┐
│ ① Title  [badge]  ⓘ          description…        View all → │  DataTableHeader
├──────────────────────────────────────────────────────────────┤
│ ② THREATS ⓘ        ASSET ⓘ          DATE      SEVERITY        │  DataTableColumnHeaders
│ ③ SQL injection    example.com      12 Jun    ▮ High          │  DataTableRow
│   …                                                          │  DataTableBody (scroll)
├──────────────────────────────────────────────────────────────┤
│ ④ Row per page: 10 ▾          1–10 of 120        ‹  ›        │  DataTableFooter
└──────────────────────────────────────────────────────────────┘
```

Grid: `1fr 1fr 90px 80px`, gap 12px. Column headers are 11px uppercase.

## States

| Part | State | Behaviour |
|---|---|---|
| Body | `scroll` | Fixed-height, scrollable body with `minWidth` for horizontal scroll |
| Row | Hover | Row highlight |
| Header info | Hover | Tooltip with column / widget explanation |
| Table | Loading | Use [Skeleton](./skeleton.md) rows (not built in) |
| Table | Empty | Use [Empty State](./empty-state.md) `size="sm"` inside the body |

## Content guidelines
- Column headers: 1 word, uppercase is applied by CSS. Write them in sentence case in code.
- Dates: relative for < 7 days ("2 days ago"), absolute after that ("12 Jun 2026"). Show the full timestamp on hover.
- Truncate long asset names in the middle (`api.…example.com`), not at the end.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Sort by severity by default | Default-sort by an internal ID |
| Pair the table with a [Filter Bar](./filter-bar.md) | Put filters inside column headers on mobile |

## Accessibility

**Pattern:** [APG — Table](https://www.w3.org/WAI/ARIA/apg/patterns/table/)

- CSS-grid `<div>`s carry ARIA table roles: `DataTableBody` is `role="table"` (named by the header title via `aria-labelledby`), with `row`, `columnheader` and `cell` inside. Screen readers can navigate by row and column.
- Header and column info icons are focusable buttons (`aria-label="About <column>"`). The tooltip opens on hover **and** focus and closes on Escape.
- Row info icons only reveal truncated text on hover and are `aria-hidden`. The full text is already in the cell.
- The footer is `role="navigation"` labelled "Pagination", with "Previous page" / "Next page" labels; the range label is a polite live region.
- Severity uses colour + text ✅.

## Design tokens

| Role | Token |
|---|---|
| Card border / surface | `s4e-border-default` / `s4e-surface-app` |
| Row hover / button hover | `s4e-bg-subtle` |
| Header text / body text | `s4e-text-secondary` / `s4e-text-primary` |
| Badge / link | `s4e-brand-primary-500/600` |
| Severity tints | `s4e-scale-{purple,red,yellow}-50/500/600` |
| Tooltip | `s4e-neutral-grey-900` / `s4e-text-inverse`, `shadow-s4e-lg` |

## Design ↔ Code

| Figma part | Component |
|---|---|
| Header | `DataTableHeader` (`title`, `description`, `badge`, `viewAllLabel`, `tooltip`) |
| Column header row | `DataTableColumnHeaders` (labels + tooltips) |
| Row | `DataTableRow` (`threat`, `asset`, `date`, `severity`) |
| Footer | `DataTableFooter` (`perPage`, `rangeLabel`) |

## API

| Component | Props |
|---|---|
| `DataTable` | div attrs (card wrapper) |
| `DataTableHeader` | `title: string`, `description: string`, `badge?`, `viewAllLabel?`, `onViewAll?`, `tooltip?` |
| `DataTableBody` | `scroll?: boolean`, `minWidth?: number` |
| `DataTableColumnHeaders` | `threatsLabel?`, `threatsTooltip?`, `assetLabel?`, `assetTooltip?`, `dateLabel?`, `severityLabel?` |
| `DataTableRow` | `threat: string`, `asset: string`, `date: string`, `severity: "high" \| "critical"` |
| `DataTableFooter` | `perPage?: number`, `rangeLabel?: string`, `onPrev?`, `onNext?` |

## Examples

```tsx
<DataTable>
  <DataTableHeader title="Top threats" description="Last 30 days" onViewAll={openAll} />
  <DataTableBody>
    <DataTableColumnHeaders />
    {rows.map((r) => <DataTableRow key={r.id} {...r} />)}
  </DataTableBody>
  <DataTableFooter rangeLabel="1–10 of 120" onPrev={prev} onNext={next} />
</DataTable>
```

## Known gaps
- [ ] Fixed 4-column threat schema. `severity` only accepts `high | critical`. A generic `columns` / `cells` API (or TanStack Table) is needed for reuse.
- [ ] No sorting, selection (with [Checkbox](./checkbox.md)), loading or empty states built in.
- [ ] The "Rows per page" button doesn't open anything yet.
- [ ] The default header tooltip text is placeholder copy.

## Related
- [Filter Bar](./filter-bar.md) · [Severity Badge](./severity-badge.md) · [Empty State](./empty-state.md) · [Skeleton](./skeleton.md)
