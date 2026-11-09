---
title: Severity Bar
slug: severity-bar
category: Atom
status: beta
source: components/ui/severity-bar.tsx
styleguide: /styleguide/severity-bar
figma: TBD
apg: N/A
---

# Severity Bar

One horizontal bar that splits a set of findings by severity, with an optional legend of counts.

## Overview

### When to use
- Summarise how findings break down by severity for an asset, a scan or a repository.
- Compare risk across table rows (Small size, no legend).

### When not to use
- The severity of a single finding — use [Severity Badge](./severity-badge.md).
- Change over time — use [Chart](./chart.md).

## Variants

| Prop | Values | Notes |
|---|---|---|
| `size` | `sm` (6px) · `md` (10px) | Small for table rows |
| `showLegend` | `true` · `false` | Keep the legend when the bar stands alone |

Segments run Critical → High → Medium → Low → Info. Severities with 0 findings are left out. With no findings the bar is an empty `bg-subtle` track.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep the legend when the bar stands alone | Recolour segments |
| Set `noun` to what is counted ("vulnerabilities") | Use it for non-severity categories |

## Accessibility

- The bar is one `role="img"` with a text summary: "52 findings: 3 critical, 8 high, …".
- The legend repeats every number visibly (WCAG 1.4.1, 1.4.11: Medium and Info hues are under 3:1 on white, but no meaning depends on them alone).
- Not interactive; nothing to focus.

## Design tokens

| Role | Token |
|---|---|
| Segments | `snt-severity-critical` · `-high` · `-medium` · `-low` · `-info` |
| Empty track | `snt-bg-subtle` |
| Legend text | `snt-text-secondary`, counts `snt-text-primary` |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `counts` | `Partial<Record<Severity, number>>` | — | Findings per severity |
| `showLegend` | `boolean` | `true` | Legend under the bar |
| `size` | `"sm" \| "md"` | `"md"` | Bar thickness |
| `noun` | `string` | `"findings"` | Used in the accessible summary |

Also exported: `SEVERITY_ORDER`, `Severity`. No `"use client"`.

## Examples

```tsx
import { SeverityBar } from "@/components/ui/severity-bar";

<SeverityBar counts={{ critical: 3, high: 8, medium: 14, low: 21, info: 6 }} />
<SeverityBar size="sm" showLegend={false} noun="vulnerabilities" counts={asset.bySeverity} />
```

## Known gaps
- [ ] No tooltip per segment.
- [ ] Not in the Figma library yet.

## Related
- [Severity Badge](./severity-badge.md) · [Chart](./chart.md) · [Finding Status](./finding-status.md)
