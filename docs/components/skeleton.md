---
title: Skeleton
slug: skeleton
category: Atom
status: beta
source: components/ui/skeleton.tsx
styleguide: /styleguide/skeleton
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=7-150
apg: N/A (decorative)
---

# Skeleton

A pulsing placeholder that mirrors the shape of content while it loads.

## Overview

### When to use
- Loading cards, tables, lists or charts whose layout is known.
- First load of a page section, to avoid layout shift (CLS).

### When not to use
- Short inline waits or unknown layouts → [Spinner](./spinner.md).
- Background refreshes of content that's already shown. Keep the stale content and show a subtle indicator instead.

## Anatomy
A single `<span class="block">` with the `snt-pulse-dot` animation and `rounded-md`. Shape it with `className`:

| Shape | Recipe |
|---|---|
| Line | `h-3 w-48` |
| Block | `h-16 w-48` |
| Avatar | `h-10 w-10 rounded-full` |

## States
Single state. The pulse stops under `prefers-reduced-motion`.

## Content guidelines
- Match the real layout: same count of lines, similar widths, the last line shorter.
- Don't show a skeleton for more than ~10s. Switch to an error or empty state.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Compose skeletons to match the final component | Use a single giant grey box for a whole page |
| Swap to real content in one step | Replace skeleton pieces one by one, which looks jittery |

## Accessibility
- Each skeleton is `aria-hidden`, so it's invisible to assistive tech.
- Announce loading on the container instead: `aria-busy="true"`, plus a visually hidden "Loading findings…" `role="status"` message.

## Design tokens

| Role | Token |
|---|---|
| Fill | `snt-neutral-grey-200` |

## Design ↔ Code

| Figma property | Code |
|---|---|
| Shape = Line / Block / Avatar | `className` recipes above |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Size and shape |
| …rest | `HTMLAttributes<HTMLSpanElement>` | — | Forwarded; `ref` → `<span>` |

## Examples

```tsx
<div aria-busy="true" className="space-y-2">
  <span className="sr-only" role="status">Loading findings…</span>
  <Skeleton className="h-3 w-64" />
  <Skeleton className="h-3 w-56" />
  <Skeleton className="h-3 w-40" />
</div>
```

## Known gaps
- [ ] No preset shape props (`variant="line" | "block" | "circle"`). Designers' Figma variants have no 1:1 prop.
- [ ] No composed presets (SkeletonCard, SkeletonTableRow).

## Related
- [Spinner](./spinner.md) · [Data Table](./data-table.md) · [Cards](./cards.md)
