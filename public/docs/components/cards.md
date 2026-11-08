---
title: Cards
slug: cards
category: Organism
status: stable
source: components/ui/cards.tsx
styleguide: /styleguide/cards
figma: TBD
apg: N/A
---

# Cards

Dashboard cards that summarise a topic and lead to a next step. There are two presets: **InsightCard** (a key/value list) and **AlertCard** (an active-issue callout).

## Overview

### When to use
- **InsightCard:** a compact summary of 3–6 metrics with an optional "view more" action.
- **AlertCard:** highlighting active issues that need attention, with a count and a CTA.

### When not to use
- Charts → [Chart](./chart.md) `ChartCard`.
- Tabular records → [Data Table](./data-table.md).
- A generic container. There's also `components/ui/card.tsx` (shadcn); see Known gaps.

## Anatomy

```
InsightCard                       AlertCard
┌──────────────────────────┐      ┌──────────────────────────────┐
│ ① Title                  │      │ ① Title       ② ● 3 active   │
│ ② Label ........ Value   │      │ ③ Alert title  [badge]       │
│   Label ........ Value   │      │ ④ Description…               │
│ ③ Action →               │      │ ⑤ [Action]                   │
└──────────────────────────┘      └──────────────────────────────┘
```

InsightCard: ① title · ② rows (12px label / 14px semibold value) · ③ optional action.
AlertCard: ① title · ② pulsing active count · ③ alert title + optional badge · ④ description · ⑤ action.

Shared shell: 12px radius (`rounded-xl`), 1px divider border, `surface-app`, 20px padding.

## States

| Part | State | Behaviour |
|---|---|---|
| Action | Hover / focus | Link-style brand colour |
| Active count dot | Animated pulse | Stops under reduced motion |

## Content guidelines
- Titles are nouns ("Exposure summary"). Values are formatted (`1,204`, `98.2%`).
- AlertCard description: what happened + the impact in one sentence.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep cards in a grid of equal heights | Mix card heights in one row |
| Make only the action clickable | Make the whole card and the inner button both clickable |

## Accessibility
- Card titles should be headings (`h3`) so dashboard sections are navigable. Today they're `<span>`s.
- The pulsing dot is decorative. The count must be text ("3 active").
- Action buttons must describe their target ("View all 3 alerts"), not just "View".

## Design tokens

| Role | Token |
|---|---|
| Shell | `s4e-surface-app`, `s4e-border-default` |
| Title / value / label | `s4e-text-primary` / `s4e-text-primary` / `s4e-text-secondary` |
| Action | `s4e-brand-primary-500` (hover `-600`) |
| Active pill | `s4e-bg-error-subtle` / `s4e-scale-red-500` / `s4e-text-error` |
| Badge | `s4e-bg-subtle` / `s4e-text-secondary` |

## Design ↔ Code

| Figma component | Code |
|---|---|
| Card / Insight | `InsightCard` (`title`, `rows`, `actionLabel`) |
| Card / Alert | `AlertCard` (`title`, `activeCount`, `alertTitle`, `alertBadge`, `description`, `action`) |

## API

**InsightCard**

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | **Required** |
| `rows` | `{ label: string; value: string \| number }[]` | **Required** |
| `actionLabel` | `string` | Shows the action when set |
| `onActionClick` | `() => void` | — |

**AlertCard**

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | **Required** |
| `activeCount` | `number` | **Required** |
| `alertTitle` | `string` | **Required** |
| `alertBadge` | `string` | Optional badge |
| `description` | `string` | **Required** |
| `action` | `string` | **Required** CTA label |
| `onActionClick` | `() => void` | — |

## Examples

```tsx
<InsightCard
  title="Exposure summary"
  rows={[{ label: "Open ports", value: 14 }, { label: "Expired certs", value: 2 }]}
  actionLabel="View details"
  onActionClick={open}
/>
```

## Known gaps
- [ ] **Two card systems.** `card.tsx` (shadcn, uses `bg-card` / `text-card-foreground`) and `cards.tsx` (s4e tokens) coexist. Pick one generic `Card` primitive on s4e tokens and build InsightCard / AlertCard on it.
- [ ] Titles aren't headings. There's no `headingLevel` prop.
- [ ] No loading (Skeleton) or empty state preset.

## Related
- [Chart](./chart.md) · [Gauge](./gauge.md) · [Badge](./badge-tag.md)
