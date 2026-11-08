---
title: Severity Badge
slug: severity-badge
category: Atom
status: stable
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
┌──────────────────────┐
│ ① High        ② 8.1  │
└──────────────────────┘
```

1. **Label**: fixed text per severity (always shown; colour is never the only signal).
2. **Score** (optional): right-aligned at 80% opacity.

Width is fixed at 160px (`w-40`) so columns align in tables.

## Variants

| `severity` | Colour family | Typical CVSS |
|---|---|---|
| `critical` | Purple | 9.0–10.0 |
| `high` | Red | 7.0–8.9 |
| `medium` | Yellow | 4.0–6.9 |
| `low` | Green | 0.1–3.9 |
| `info` | Blue | 0.0 |

The order and colours are product-wide conventions. Don't recolour them per screen.

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
- Contrast: `*-600` / `*-700` text on `*-50` passes 4.5:1.

## Design tokens

| Role | Token |
|---|---|
| Background | `snt-scale-{purple,red,yellow,green,blue}-50` |
| Accent | `snt-scale-*-500` |
| Text | `snt-scale-*-600` (yellow `-700`) |
| Data-viz equivalent | `--snt-severity-{critical,high,medium,low,info}` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Severity | `severity` | Critical · High · Medium · Low · Info |
| Show score | `score` | number / unset |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `severity` | `"critical" \| "high" \| "medium" \| "low" \| "info"` | — | **Required** |
| `score` | `number` | — | Optional numeric score |
| …rest | `HTMLAttributes<HTMLDivElement>` | — | Forwarded |

## Examples

```tsx
<SeverityBadge severity="critical" />
<SeverityBadge severity="high" score={8.1} aria-label="Severity high, score 8.1" />
```

## Known gaps
- [ ] The fixed `w-40` width doesn't adapt to narrow columns. Add a `size="sm"` / auto-width option.
- [ ] Uses primitive `scale-*` tokens. It should use the semantic `snt-severity-*` tokens so chart and badge colours can't drift apart.
- [ ] No compact dot-only variant for dense lists (it would need hidden text).

## Related
- [Badge · Tag](./badge-tag.md) · [Data Table](./data-table.md) · [Chart](./chart.md)
