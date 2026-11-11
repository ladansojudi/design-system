---
title: Empty State
slug: empty-state
category: Organism
status: stable
source: components/ui/empty-state.tsx
styleguide: /styleguide/empty-state
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=11-50
apg: N/A
---

# Empty State

Fills a region that has no content yet. It explains why it's empty and what to do next.

## Overview

### When to use
- First use ("No assets yet"), no results ("No findings match these filters"), cleared state ("All caught up"), or a recoverable error ("Couldn't load findings").

### When not to use
- Content is loading → [Skeleton](./skeleton.md).
- A page-level failure with no recovery → an error page.

## Anatomy

```
        ┌────┐
        │ ①  │       icon in tinted circle
        └────┘
     ② No findings yet
  ③ Run your first scan to see…
  ④ [Start scan]  ⑤ [Learn more]
```

1. **Icon** (required): any lucide-compatible component.
2. **Title** (required).
3. **Description** (optional).
4. **Primary action** (optional).
5. **Secondary action** (optional).

## Variants

| `tone` | Use for |
|---|---|
| `neutral` *(default)* | First use, no results |
| `warning` | Partial data, degraded state |
| `alert` | Failed to load (pair it with a retry action) |

## Sizes

| `size` | Icon box / icon | Title | Description | Padding (y) | Use for |
|---|---|---|---|---|---|
| `sm` | 40px / 18px | 14px | 12px | 32px | Inside cards and table bodies |
| `md` *(default)* | 56px / 24px | 15px | 14px | 48px | Full panels, pages |

## Content guidelines
- Title: state the situation plainly ("No findings match these filters").
- Description: one sentence on why, plus the next step.
- Primary action = the most likely next step ("Clear filters", "Start scan").

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Offer a way out (clear filters, create, retry) | Show "No data" with no action |
| Use `size="sm"` inside cards | Put a full-page empty state inside a small widget |

## Accessibility
- The title should be a real heading at the right level for its context (today it's a `<div>`; see Known gaps).
- The icon is decorative and should be `aria-hidden`.
- When the empty state appears after filtering, announce it in a polite live region ("No results").

## Design tokens

| Role | Token |
|---|---|
| Container border / surface | `snt-border-default` / `snt-surface-app` |
| Icon circle (neutral / warning / alert) | `snt-bg-subtle` / `snt-bg-warning-subtle` + `-600` / `snt-bg-error-subtle` + `-600` |
| Title / description | `snt-text-primary` / `snt-text-secondary` |
| Primary action | `snt-brand-primary-500` (hover `-600`) / `snt-text-white` |

## Design ↔ Code

| Figma property | Prop |
|---|---|
| Tone | `tone` = Neutral · Warning · Alert |
| Size | `size` = SM · MD |
| Primary / secondary button | `primaryAction`, `secondaryAction` |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `ComponentType<{ size?; className? }>` | — | **Required** |
| `title` | `string` | — | **Required** |
| `description` | `string` | — | — |
| `tone` | `"neutral" \| "warning" \| "alert"` | `"neutral"` | — |
| `size` | `"sm" \| "md"` | `"md"` | — |
| `primaryAction` / `secondaryAction` | `{ label: string; icon?: Icon; onClick?: () => void }` | — | Rendered as buttons |

## Examples

```tsx
<EmptyState
  icon={SearchX}
  title="No findings match these filters"
  description="Try removing a filter or widening the date range."
  primaryAction={{ label: "Clear filters", onClick: clearAll }}
/>
```

## Known gaps
- [ ] Title is a `<div>`. Add a `headingLevel` prop (default `h3`).
- [ ] The action buttons are hand-styled instead of reusing [Button](./button.md), so they drift from the button tokens and lack `focus-visible`.
- [ ] The icon isn't `aria-hidden`.

## Related
- [Skeleton](./skeleton.md) · [Data Table](./data-table.md) · [Alert](./alert.md)
