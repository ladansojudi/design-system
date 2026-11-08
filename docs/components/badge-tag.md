---
title: Badge · Tag
slug: badge-tag
category: Atom
status: stable
source: components/ui/badge-tag.tsx
styleguide: /styleguide/badge-tag
figma: TBD
apg: N/A (static content)
---

# Badge · Tag

A small pill that labels an object with a status (**Badge**) or a category (**Tag**). It's the same primitive; Badge shows a status dot by default.

## Overview

### When to use
- **Badge:** the status of an item ("Active", "Failed", "Pending").
- **Tag:** a classification or metadata ("Production", "API", "EU").

### When not to use
- Vulnerability severity → [Severity Badge](./severity-badge.md), which has the canonical severity colours.
- Counts on navigation or icons → a count bubble (see Filter Bar's `count`).
- Anything clickable → a button or a filter pill ([Filter Bar](./filter-bar.md)).

## Anatomy

```
╭──────────────╮
│ ① ● ② Label  │
╰──────────────╯
```

1. **Dot** (optional, 7px): left or right.
2. **Label**: 12px / 500.

## Variants

| `color` | Meaning |
|---|---|
| `success` | Healthy, completed, passed |
| `warning` | Needs attention, degraded |
| `error` | Failed, blocked |
| `info` | Informational, in progress |
| `primary` | Brand / highlighted |
| `neutral` | Default, inactive, archived |

`outlined` swaps the filled tint for a 1px border, for use on tinted surfaces.

## States
Static. No hover, focus or disabled states.

## Content guidelines
- 1–2 words, sentence case. Status: adjective or past participle ("Running", "Failed").
- Use the same word for the same state everywhere. Keep a shared status vocabulary.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Pair colour with a word | Rely on colour alone (WCAG 1.4.1) |
| Limit to 1–2 badges per row | Stack 4 badges in a table cell |

## Accessibility
- Renders a `<span>`, read as plain text. The dot is `aria-hidden`.
- If the badge sits next to an ambiguous value, add context with visually hidden text ("Status: Failed").
- Contrast: label colours (`*-600` / `*-700` on `*-50`) are chosen to pass 4.5:1.

## Design tokens

| Role | Token |
|---|---|
| Filled bg | `s4e-scale-{green,yellow,red,blue}-50`, `s4e-brand-primary-50`, `s4e-neutral-grey-100` |
| Label | `s4e-scale-*-600` (yellow `-700`), `s4e-brand-primary-600`, `s4e-text-secondary` |
| Dot | `s4e-scale-*-500`, `s4e-brand-primary-500`, `s4e-neutral-grey-400` |
| Outlined border | `s4e-scale-*-300`, `s4e-brand-primary-200`, `s4e-neutral-divider-10` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Color | `color` | Success · Warning · Error · Info · Primary · Neutral |
| Dot | `showDot` | true / false (Badge default true, Tag default false) |
| Dot position | `dotPosition` | Left · Right |
| Outlined | `outlined` | true / false |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `color` | `"warning" \| "error" \| "success" \| "neutral" \| "info" \| "primary"` | `"neutral"` | Colour family |
| `showDot` | `boolean` | Badge `true` / Tag `false` | Status dot |
| `dotPosition` | `"left" \| "right"` | `"left"` | Dot side |
| `outlined` | `boolean` | `false` | Border instead of fill |
| …rest | `HTMLAttributes<HTMLSpanElement>` | — | Forwarded |

Exports: `Badge`, `Tag` (`TagProps = BadgeProps`).

## Examples

```tsx
<Badge color="success">Active</Badge>
<Badge color="error">Failed</Badge>
<Tag color="info">Production</Tag>
<Tag outlined>EU</Tag>
```

## Known gaps
- [ ] The `color` prop name shadows the HTML `color` attribute. Consider `tone` for consistency with Banner, Checkbox and Spinner.
- [ ] No size scale (`sm` for tables).
- [ ] No removable-tag variant (✕ button with an accessible name).

## Related
- [Severity Badge](./severity-badge.md) · [Filter Bar](./filter-bar.md)
