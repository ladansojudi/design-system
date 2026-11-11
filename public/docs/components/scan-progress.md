---
title: Scan Progress
slug: scan-progress
category: Atom
status: beta
source: components/ui/scan-progress.tsx
styleguide: /styleguide/scan-progress
figma: TBD
apg: N/A
---

# Scan Progress

The stages of a scan or long job and where it is now: done, running, failed or pending.

## Accessibility

Ordered list with an accessible name; the active stage has aria-current="step"; each status is read out; spinner respects reduced motion. Announce completion separately (e.g. Toast).

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `ScanStep[]` | — | `{ label, status, detail? }` |
| `label` | `string` | `"Scan progress"` | Accessible name |

## Examples

```tsx
import { ScanProgress } from "@/components/ui/scan-progress";

<ScanProgress label="Scan of api.example.com" steps={steps} />
```

## Known gaps
- [ ] Not in the Figma library yet.

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/scan-progress`.
