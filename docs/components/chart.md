---
title: Chart
slug: chart
category: Organism
status: stable
source: components/ui/chart.tsx
styleguide: /styleguide/chart
figma: TBD
apg: N/A (see data-viz accessibility notes)
---

# Chart

A dependency-free set of SVG chart primitives in a shared card shell: donut, bar, line and treemap, plus stat blocks.

## Overview

### When to use

| Question the user asks | Use |
|---|---|
| "How is the total split?" (≤ 6 parts) | `DonutChart` + `DonutLegend` |
| "Which category is biggest?" | `BarChart` |
| "How did it change over time?" | `LineChart` |
| "Which areas dominate a hierarchy?" | `TreemapChart` |
| "What's the headline number?" | `StatBlock` |

### When not to use
- A single bounded value → [Gauge](./gauge.md).
- More than ~6 donut segments → use a bar chart.
- Exact values users need to read or copy → [Data Table](./data-table.md).

## Anatomy

```
┌────────────────────────────────────────────────┐
│ ① Title   ② description…      ③ trailing  View all │  ChartCard header
│                                                │
│ ④ chart body (Donut / Bar / Line / Treemap)    │
│ ⑤ legend                                       │
└────────────────────────────────────────────────┘
```

1. **Title** · 2. **Description** (hidden < `sm`) · 3. **Trailing slot** (e.g. a period select) + "View all" · 4. **Chart** · 5. **Legend**.

## Variants
- `BarChart highlightLeader` emphasises the largest bar.
- `LineChart showArea` fills under the line with a gradient (`gradientId` must be unique per page).
- `DonutChart showTotal` shows the sum in the centre.
- `DonutLegend fullWidth` stretches the legend rows.

## Content guidelines
- Title says *what* is measured; description says the period / scope ("Last 30 days").
- Axis labels: rounded, with units (`1.5k`, `40%`). Don't repeat the unit on every tick.
- Colour by **meaning**: severity charts must use the `s4e-severity-*` palette, the same as [Severity Badge](./severity-badge.md).

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Start bar axes at 0 | Truncate the axis to exaggerate differences |
| Label segments directly or with a legend in the same order | Use colour as the only key |
| Keep one chart per card | Put two unrelated charts in one card |

## Accessibility
- `DonutChart`, `BarChart`, `LineChart` and `TreemapChart` render as `role="img"` with an auto-generated `aria-label` that summarises the data ("Total 17: Critical 6, High 11"). Pass your own `aria-label` with the **takeaway** ("Critical findings rose from 4 to 11 over 30 days"). That's better than a list of numbers.
- Provide the underlying numbers as text: the legend values, or a visually hidden `<table>`.
- Non-text contrast: adjacent segments and lines need 3:1 against the background and each other, or a separator stroke.
- Don't animate charts when reduced motion is on.

## Design tokens

| Role | Token |
|---|---|
| Card | `s4e-surface-app`, `s4e-border-default` |
| Text | `s4e-text-primary`, `s4e-text-secondary` |
| Series / accent | `s4e-brand-primary-500/600`, `--s4e-data-*` palette |
| Gridlines / track | `s4e-neutral-grey-100` |
| Severity series | `--s4e-severity-{critical,high,medium,low,info}` |

## Design ↔ Code

| Figma component | Code |
|---|---|
| Chart card | `ChartCard` (`title`, `description`, `viewAll`, `trailing`) |
| Stat | `StatBlock` (`label`, `value`, `accent`) |
| Donut / Bar / Line / Treemap | `DonutChart` · `BarChart` · `LineChart` · `TreemapChart` |

## API

| Component | Key props |
|---|---|
| `ChartCard` | `title: string`, `description?`, `viewAll?: boolean`, `onViewAll?`, `trailing?: ReactNode` |
| `StatBlock` | `label: string`, `value: string`, `accent?: string` |
| `DonutChart` | `data: DonutSegment[]`, `size?: number`, `showTotal?: boolean` |
| `DonutLegend` | `data: DonutSegment[]`, `fullWidth?: boolean` |
| `BarChart` | `data: BarDatum[]`, `max?`, `ticks?: number[]`, `height?` (240), `highlightLeader?` (true) |
| `LineChart` | `linePath: string` (SVG path in a 0–100 viewBox), `yLabels?`, `xLabels?`, `showArea?` (true), `gradientId?` |
| `TreemapChart` | `primary: TreemapBlock[]`, `secondary?: TreemapBlock[]`, `height?` |

## Examples

```tsx
<ChartCard title="Findings by severity" description="Last 30 days" viewAll onViewAll={openFindings}>
  <DonutChart data={segments} showTotal aria-label="42 findings: 6 critical, 11 high, 25 other" />
  <DonutLegend data={segments} />
</ChartCard>
```

## Known gaps
- [ ] `LineChart`'s auto label only knows the axis range, not the values. Always pass a takeaway `aria-label`.
- [ ] `LineChart` takes a pre-computed `linePath` string instead of data points. Designers and devs can't map Figma data to it. Accept `{ x, y }[]` and compute the path.
- [ ] No tooltips or hover values. No responsive resizing beyond CSS width.
- [ ] `recharts` is listed in `package.json` but nothing imports it. Remove it, or adopt it here and drop the hand-rolled SVG.
- [ ] 10px axis labels are below the recommended minimum. Use 11–12px.

## Related
- [Gauge](./gauge.md) · [Cards](./cards.md) · [Severity Badge](./severity-badge.md) · [Data Table](./data-table.md)
