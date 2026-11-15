---
title: Cards
slug: cards
category: Organism
status: stable
source: components/ui/cards.tsx
styleguide: /styleguide/cards
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=12-50
apg: N/A
---

# Cards

The container for dashboard content. `Card` and its parts are the base; `StatCard` is a ready-made preset for one number. Summaries and alerts are composed from the parts (see the styleguide page), not separate components.

## Overview

### When to use
- **StatCard:** a single KPI, with a trend or a one-line description.
- **Card parts:** any other grouped content: a figures list with a View details action, a callout with a count and a next step.

### When not to use
- Charts → [Chart](./chart.md) `ChartCard`.
- Tabular records → [Data Table](./data-table.md).
- A message that stays until resolved → [Alert](./alert.md).

## Anatomy

```
Card
┌──────────────────────────────┐
│ CardHeader: ① CardTitle  ② ⟶ │
│ CardContent: ③ body          │
│ CardFooter: ④ action         │
└──────────────────────────────┘
```

StatCard: ① icon + title · ② value (32px) · ③ trend pill or description.

Shared shell: 12px radius (`rounded-xl`), 1px border, `surface-app`, 20px padding.

## States

| Part | State | Behaviour |
|---|---|---|
| Action | Hover / focus | Link-style brand colour |
| Active count dot | Animated pulse | Stops under reduced motion |

## Content guidelines
- Titles are nouns ("Exposure summary"). Values are formatted (`1,204`, `98.2%`).

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep cards in a grid of equal heights | Mix card heights in one row |
| Make only the action clickable | Make the whole card and the inner button both clickable |

## Accessibility
- Card titles are headings (`h3` by default; set `headingLevel`) so dashboard sections are navigable.
- A pulsing status dot is decorative. The count must be text ("3 active").
- Action buttons must describe their target ("View all 3 alerts"), not just "View".

## Design tokens

| Role | Token |
|---|---|
| Shell | `snt-surface-app`, `snt-border-default` |
| Title / value / label | `snt-text-primary` / `snt-text-primary` / `snt-text-secondary` |
| Action | `snt-text-link` (hover `snt-bg-brand-subtle`) |
| Status pill | `snt-border-default` / `snt-severity-high` dot / `snt-text-secondary` |
| Badge | `snt-bg-subtle` / `snt-text-secondary` |

## Design ↔ Code

| Figma component | Code |
|---|---|
| Card / Container | `Card`, `CardHeader`, `CardTitle`, `CardContent`, `CardFooter` |
| Card / Stat | `StatCard` (`icon`, `title`, `value`, `trend`, `description`) |

## API

**Card** (generic container): `Card`, `CardHeader`, `CardTitle` (`as="h2" | "h3" | "h4"`, default h3), `CardDescription`, `CardContent`, `CardFooter`.

**StatCard**

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | **Required** |
| `value` | `string \| number` | **Required** |
| `icon` | `ComponentType` | Optional |
| `trend` | `{ direction: "up" \| "down"; value: string; label?: string; positive?: boolean }` | `positive` says whether the direction is good news (default: up) |
| `description` | `string` | Use instead of `trend` |

## Examples

```tsx
<StatCard icon={Link2} title="Total URLs" value="816"
  trend={{ direction: "down", value: "23%", label: "from last month", positive: true }} />

<Card>
  <CardHeader><CardTitle>Exposure summary</CardTitle></CardHeader>
  <CardContent>…</CardContent>
</Card>
```

## Known gaps
- [ ] No loading (Skeleton) or empty state preset.

## Related
- [Chart](./chart.md) · [Gauge](./gauge.md) · [Badge](./badge-tag.md)
