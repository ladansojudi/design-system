---
title: Finding Status
slug: finding-status
category: Atom
status: beta
source: components/ui/finding-status.tsx
styleguide: /styleguide/finding-status
figma: TBD
apg: N/A
---

# Finding Status

Shows where a finding is in its lifecycle, from Open to Resolved, with an icon and a label for each status.

## Overview

### When to use
- Triage state of a finding, alert or vulnerability: tables, detail headers, activity logs.
- As filter options — the same five statuses.

### When not to use
- How bad a finding is — use [Severity Badge](./severity-badge.md).
- The state of a scan or agent — use [Badge](./badge-tag.md).

## Variants

| `status` | Meaning | Icon | Tone |
|---|---|---|---|
| `open` | Found, not handled | CircleDot | error |
| `in-progress` | Being fixed | CircleDashed | info |
| `resolved` | Fixed and verified | CircleCheck | success |
| `accepted-risk` | Not fixed on purpose, with reason + expiry | ShieldMinus | warning |
| `false-positive` | Not a real issue, kept for audit | CircleSlash | neutral |

Sizes: `md` 24px, `sm` 20px.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Show status next to severity | Invent extra statuses per screen |
| Require a reason and expiry for Accepted risk | Count False positives in risk totals |

## Accessibility

- Plain text label; icon is `aria-hidden`. Every status has a distinct icon shape, not just colour (WCAG 1.4.1).
- Not interactive. To edit status, wrap it in a real control (Select or menu button).

## Design tokens

| Status | Background | Text |
|---|---|---|
| Open | `snt-bg-error-subtle` | `snt-text-error` |
| In progress | `snt-bg-info-subtle` | `snt-text-info` |
| Resolved | `snt-bg-success-subtle` | `snt-text-success` |
| Accepted risk | `snt-bg-warning-subtle` | `snt-text-warning` |
| False positive | `snt-bg-subtle` | `snt-text-secondary` |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `"open" \| "in-progress" \| "resolved" \| "accepted-risk" \| "false-positive"` | — | Lifecycle state |
| `size` | `"sm" \| "md"` | `"md"` | Height |
| `label` | `string` | — | Overrides the visible label |

Also exported: `FINDING_STATUSES`, `FindingStatusValue`. No `"use client"`.

## Examples

```tsx
import { FindingStatus } from "@/components/ui/finding-status";

<FindingStatus status="in-progress" />
<FindingStatus status="resolved" size="sm" />
```

## Known gaps
- [ ] Not in the Figma library yet.

## Related
- [Severity Badge](./severity-badge.md) · [Badge · Tag](./badge-tag.md) · [Data Table](./data-table.md)
