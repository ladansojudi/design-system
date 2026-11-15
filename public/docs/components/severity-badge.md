---
title: Severity Badge
slug: severity-badge
category: Atom
status: beta
source: components/ui/severity-badge.tsx
styleguide: /styleguide/severity-badge
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=3-96
apg: N/A (static content)
---

# Severity Badge

The canonical way to show a finding's severity (Critical → Info), optionally with its numeric score (e.g. CVSS).

## Overview

### When to use
- Any time a vulnerability, threat or finding's severity is shown: tables, cards, detail headers.

### When not to use
- Generic statuses (Active, Failed) → [Badge](./badge-tag.md).
- Aggregate severity charts → [Chart](./chart.md), which uses the same `snt-severity-*` palette.

## Anatomy

```
┌─────────────────────────┐
│ ① ▂▄▆█  ② High  ③ 8.1   │
└─────────────────────────┘
```

1. **Signal bars**: four bars filled to the level (Critical 4, High 3, Medium 2, Low 1); Info is a ring. Bar count and colour carry the level together.
2. **Label**: severity name, always written out (colour is never the only signal).
3. **Score** (optional): mono, one decimal.

Width is fixed per size, so every badge in a column is the same size: `sm` 24px tall, 96px wide (128px with a score); `md` 28px tall, 112px wide (144px with a score). The score sits at the right edge, so scores line up too.

## Variants

| `severity` | Colour family | Typical CVSS |
|---|---|---|
| `critical` | Magenta · 4 bars | 9.0–10.0 |
| `high` | Orange-red · 3 bars | 7.0–8.9 |
| `medium` | Amber · 2 bars | 4.0–6.9 |
| `low` | Teal · 1 bar | 0.1–3.9 |
| `info` | Grey · ring | 0.0 |

The order and colours are product-wide conventions. Don't recolour them per screen. Severity is its own palette: none of these values is shared with the feedback colours (success, warning, error, info) or sits close to the brand colour. `npm run lint:ds` checks this.

## States
Static.

## Content guidelines
- Labels are fixed ("Critical", "High", …). Don't localise them ad hoc or abbreviate them ("Crit").
- Show the score with one decimal place.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Sort tables by severity, then score | Sort severity alphabetically |
| Use the same badge in every surface | Recreate severity colours with a generic Badge |

## Accessibility
- The label text carries the meaning, so it passes WCAG 1.4.1 (use of colour).
- When the score is shown, give screen readers context: `aria-label="Severity high, score 8.1"` on the root, or visually hidden text.
- Bars are `aria-hidden`; the label is plain text on a neutral surface (`text-primary` on `surface-app`). Light hues (Medium, Info) are under 3:1 as graphics, which is allowed because the label and the bar count carry the meaning.

## Design tokens

| Role | Token |
|---|---|
| Filled bars / Info ring | `snt-severity-{critical,high,medium,low,info}` (the same tokens charts use) |
| Empty bars | `snt-border-default` |
| Container | `snt-surface-app`, ring `snt-border-default` |
| Label / score | `snt-text-primary` / `snt-text-secondary` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Severity | `severity` | Critical · High · Medium · Low · Info |
| Show score | `score` | number / unset |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `severity` | `"critical" \| "high" \| "medium" \| "low" \| "info"` | — | **Required** |
| `score` | `number` | — | Optional numeric score, shown with one decimal |
| `size` | `"sm" \| "md"` | `"md"` | 24 / 28px tall |
| …rest | `HTMLAttributes<HTMLDivElement>` | — | Forwarded |

## Examples

```tsx
<SeverityBadge severity="critical" />
<SeverityBadge severity="high" score={8.1} aria-label="Severity high, score 8.1" />
```

## Known gaps
- [ ] Not redrawn in the Figma library yet (still the old left-bar design).
- [ ] No compact dot-only variant for dense lists (it would need hidden text).

## Related
- [Badge · Tag](./badge-tag.md) · [Data Table](./data-table.md) · [Chart](./chart.md)
