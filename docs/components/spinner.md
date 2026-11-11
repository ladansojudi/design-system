---
title: Spinner
slug: spinner
category: Atom
status: alpha
source: components/ui/spinner.tsx
styleguide: /styleguide/spinner
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=7-124
apg: N/A (role="status")
---

# Spinner

An indeterminate loading indicator for short waits when the shape of the result is unknown.

## Overview

### When to use
- Short waits (< ~3s) inside a button, a small panel, or an inline region.
- When the content's layout isn't known in advance.

### When not to use
- Loading a page or card whose layout is known → [Skeleton](./skeleton.md). It reduces perceived wait time and layout shift.
- Long operations with measurable progress → a progress bar (not built yet).
- Inside a Button → use `<Button loading>`, which renders its own spinner.

## Anatomy

A single ring with a transparent segment (`border-t-transparent`), rotating with `animate-spin`.

## Variants

| `tone` | Use on |
|---|---|
| `primary` *(default)* | Light surfaces |
| `neutral` | Dense / secondary areas |
| `white` | Solid brand or dark surfaces |

## Sizes

| Size | Diameter | Stroke | Use for |
|---|---|---|---|
| `xs` | 12px | 2px | Inline with 12px text |
| `sm` | 16px | 2px | Inline with 14px text, table cells |
| `md` *(default)* | 24px | 2.5px | Cards, panels |
| `lg` | 36px | 3px | Empty regions, full-panel loading |

## States
Single state. When reduced motion is on, the global rule stops the rotation, so pair the spinner with visible text for long waits.

## Content guidelines
- Override the `label` with something specific: "Loading findings", not "Loading".
- If a wait exceeds ~3s, add visible text ("Still working… large scans can take a minute").

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Show one spinner per region | Put a spinner on every row |
| Delay showing it by ~300ms to avoid flicker | Flash a spinner for 50ms loads |

## Accessibility
- `role="status"` with `aria-label={label}`, so assistive tech announces "Loading" politely.
- Mark the region being loaded `aria-busy="true"` while the spinner is visible.
- `prefers-reduced-motion` is respected globally (`app/globals.css`).

## Design tokens

| Role | Token |
|---|---|
| Ring (primary / neutral / white) | `snt-brand-primary-500` / `snt-text-disabled` / `snt-text-white` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Size | `size` | XS · SM · MD · LG |
| Tone | `tone` | Primary · Neutral · White |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"xs" \| "sm" \| "md" \| "lg"` | `"md"` | Diameter |
| `tone` | `"primary" \| "neutral" \| "white"` | `"primary"` | Colour |
| `label` | `string` | `"Loading"` | Accessible name |
| …rest | `HTMLAttributes<HTMLSpanElement>` | — | Forwarded |

## Examples

```tsx
<div aria-busy={loading}>
  {loading ? <Spinner label="Loading findings" /> : <FindingsList />}
</div>
```

## Known gaps
- [ ] Alpha: the size scale (12 / 16 / 24 / 36) doesn't match Button's internal spinner (13 / 14 / 16). Unify them so Button can reuse `Spinner`.
- [ ] The `neutral` tone uses `text-disabled` (2.27:1). That's acceptable for a decorative ring, but it fails 3:1 for non-text UI if the spinner is the only indicator.
- [ ] No built-in delay prop.

## Related
- [Skeleton](./skeleton.md) · [Button](./button.md)
