---
title: Gauge
slug: gauge
category: Organism
status: stable
source: components/ui/gauge.tsx
styleguide: /styleguide/gauge
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=11-212
apg: https://www.w3.org/WAI/ARIA/apg/patterns/meter/
---

# Gauge

A semicircular meter that shows a single value against a known maximum, such as a security score.

## Overview

### When to use
- One headline value on a bounded scale (Security score 72 / 100, coverage %).

### When not to use
- Comparing several values → a bar chart ([Chart](./chart.md)).
- Values without a meaningful maximum → a big-number `StatBlock` ([Chart](./chart.md)).
- Task progress over time → a progress bar.

## Anatomy

```
     ╭─ ① ticks ─╮
   ╭──────────────╮
  │ ② track ③ fill │
        ④ 72 / 100
```

1. **Ticks**: light / dark per colour.
2. **Track**: `*-100`.
3. **Fill**: `*-500`, proportional to `value / max`.
4. **Value label**: 14px bold value + 12px secondary "/ max".

## Variants

| `color` | Suggested meaning |
|---|---|
| `blue` *(default)* | Neutral metric |
| `green` | Good (e.g. score ≥ 80) |
| `yellow` | Fair |
| `red` | Poor |
| `purple` | Critical-related metric |

Pick the colour from **thresholds** documented with the metric, not by eye. Write the threshold table next to the screen spec.

## Content guidelines
- Always show the number. The arc alone isn't enough.
- Put the metric name above or below the gauge ("Security score").

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use one gauge per card | Line up 6 gauges to compare values |
| Clamp `value` to `[0, max]` | Render negative or overflow values |

## Accessibility

**Pattern:** [APG — Meter](https://www.w3.org/WAI/ARIA/apg/patterns/meter/)

- Today: the `<svg>` has `role="img"` and `aria-label="72 out of 100"`. ✅ It's announced.
- Better: `role="meter"` with `aria-valuenow`, `aria-valuemin` and `aria-valuemax`, plus `aria-labelledby` pointing to the metric name, so screen readers say "Security score, 72".
- Colour isn't the only signal; the number is always visible ✅.

## Design tokens

| Role | Token |
|---|---|
| Track | `snt-scale-{blue,green,yellow,red,purple}-100` |
| Fill | `snt-scale-*-500` |
| Ticks | `snt-scale-*-200` / `snt-scale-*-600` |
| Value / max | `snt-text-primary` / `snt-text-secondary` |

## Design ↔ Code

| Figma property | Prop |
|---|---|
| Color | `color` |
| Value / Max | `value`, `max` |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `number` | — | **Required** |
| `max` | `number` | `100` | Upper bound |
| `color` | `"blue" \| "green" \| "yellow" \| "red" \| "purple"` | `"blue"` | Fill colour |
| …rest | `HTMLAttributes<HTMLDivElement>` | — | Forwarded |

## Examples

```tsx
<div>
  <h3 id="score-label" className="text-[12px] text-snt-text-secondary">Security score</h3>
  <Gauge value={72} max={100} color={score >= 80 ? "green" : score >= 50 ? "yellow" : "red"} />
</div>
```

## Known gaps
- [ ] Use `role="meter"` + `aria-value*` and accept an accessible label prop.
- [ ] No threshold API (`thresholds={{ 50: "yellow", 80: "green" }}`), so colour logic is duplicated across screens.
- [ ] No size prop.

## Related
- [Chart](./chart.md) · [Cards](./cards.md)
