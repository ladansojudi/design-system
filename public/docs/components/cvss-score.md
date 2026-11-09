---
title: CVSS Score
slug: cvss-score
category: Atom
status: beta
source: components/ui/cvss-score.tsx
styleguide: /styleguide/cvss-score
figma: TBD
apg: N/A
---

# CVSS Score

A CVSS base score with its qualitative rating and, when given the vector string, each metric in plain words.

## Overview

### When to use
- The standardised score of a known vulnerability on its detail page.
- Explaining a score to people who don't read vector strings.

### When not to use
- Your own contextual risk rating — use [Severity Badge](./severity-badge.md).
- Dense table cells — show the score only, keep the breakdown for detail views.

## Variants

Ratings follow CVSS v3 bands: None 0.0 · Low 0.1–3.9 · Medium 4.0–6.9 · High 7.0–8.9 · Critical 9.0–10.0.
With `vector`, v3.0 / v3.1 metrics (AV, AC, PR, UI, S, C, I, A) are translated; others are shown as written.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Show the vector on detail pages | Round scores (always one decimal) |
| Name the CVSS version | Present CVSS alone as priority — check KEV / EPSS |

## Accessibility

- Rating is written next to the score (not colour alone).
- Metrics are a `dl` of name–value pairs. The raw vector stays visible and selectable.

## Design tokens

Ratings reuse the severity scale: `snt-scale-{purple,red,yellow,green}-50` background, `-600` / `yellow-700` text, `-500` 3px left border; None uses `snt-bg-subtle`.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `score` | `number` | — | Base score 0.0–10.0 |
| `vector` | `string` | — | CVSS vector string |
| `showMetrics` | `boolean` | `true` | Metric list when a vector is given |

Also exported: `cvssRating(score)`, `parseCvssVector(vector)`, `CvssRating`, `CvssMetric`. No `"use client"`.

## Examples

```tsx
import { CvssScore } from "@/components/ui/cvss-score";

<CvssScore score={9.8} vector="CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H" />
<CvssScore score={6.1} />
```

## Known gaps
- [ ] CVSS v4.0-only metrics are shown with raw codes.
- [ ] Not in the Figma library yet.

## Related
- [CVE Tag](./cve-tag.md) · [Severity Badge](./severity-badge.md)
