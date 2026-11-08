---
title: Checkbox
slug: checkbox
category: Atom
status: beta
source: components/ui/checkbox.tsx
styleguide: /styleguide/checkbox
figma: TBD
apg: https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/
---

# Checkbox

Lets the user turn an independent option on or off, or pick several items from a list.

## Overview

### When to use
- Several independent choices ("Notify by email", "Notify by Slack").
- Selecting rows in a table, including a "select all" header with an indeterminate state.
- A single opt-in that takes effect on submit ("I accept the terms").

### When not to use
- Mutually exclusive choices → [Radio](./switch-radio.md).
- A setting that applies **immediately** → [Switch](./switch-radio.md).

## Anatomy

```
┌──┐
│✓ │ ② Label
└──┘   ③ Description
 ①
```

1. **Box** (18px): empty, checked (✓) or indeterminate (–).
2. **Label**: clicking it toggles the box, because the whole row is a `<label>`.
3. **Description** (optional): secondary explanation.

## Variants

| Tone | Use for |
|---|---|
| `primary` *(default)* | Forms and settings |
| `neutral` | Dense data tables, where brand colour would be noisy |

## States

| State | Visual | Behaviour |
|---|---|---|
| Unchecked | Grey-400 border | — |
| Checked | Filled with tone colour + ✓ | — |
| Indeterminate | Filled + – | Some, but not all, children are selected |
| Hover | Border darkens | — |
| Focus | Brand ring on the box | Native input focus |
| Disabled | Muted label | Native `disabled` |

## Content guidelines
- Phrase the label positively ("Send weekly report", not "Don't send weekly report").
- No ending punctuation unless the label is a full sentence.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Use indeterminate only for a parent of a group | Use indeterminate as a third "unknown" value |
| Make the label clickable (default) | Put a link inside the label that toggles the box when clicked |

## Accessibility

**Pattern:** [APG — Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/)

| Key | Action |
|---|---|
| `Tab` | Focus |
| `Space` | Toggle |

- Built on a visually hidden native `<input type="checkbox">`, so screen readers and forms work natively.
- The label is associated through `htmlFor` / `id`.
- `indeterminate` is set on the native input's DOM property, so screen readers announce "mixed".
- `description` is linked with `aria-describedby`. An `id` is generated when you don't pass one.

## Design tokens

| Role | Token |
|---|---|
| Fill (primary / neutral) | `s4e-btn-primary-600` / `s4e-btn-neutral-800` |
| Empty border / bg | `s4e-neutral-grey-400` / `s4e-surface-row` |
| Check icon | `s4e-text-on-accent` |
| Label / description / disabled | `s4e-text-primary` / `s4e-text-secondary` / `s4e-text-disabled` |
| Focus ring | `s4e-brand-primary-500` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Checked | `checked` | true / false |
| Indeterminate | `indeterminate` | true / false |
| Tone | `tone` | Primary · Neutral |
| Disabled | `disabled` | true / false |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | **Required**, controlled |
| `onChange` | `(checked: boolean) => void` | — | Toggle handler |
| `indeterminate` | `boolean` | `false` | Mixed state |
| `tone` | `"primary" \| "neutral"` | `"primary"` | Fill colour |
| `label` | `string` | — | Visible label |
| `description` | `string` | — | Secondary text |
| `disabled` | `boolean` | `false` | Native disabled |
| …rest | `InputHTMLAttributes` (minus `type`, `onChange`) | — | Forwarded to `<input>` |

## Examples

```tsx
<Checkbox checked={email} onChange={setEmail} label="Email" description="Daily digest at 09:00" />

<Checkbox
  aria-label="Select all rows"
  checked={allSelected}
  indeterminate={someSelected && !allSelected}
  onChange={toggleAll}
  tone="neutral"
/>
```

## Known gaps
- [ ] `checked` is required, so there's no uncontrolled mode.
- [ ] No checkbox-group wrapper with a `<fieldset>` + `<legend>`.

## Related
- [Switch · Radio](./switch-radio.md) · [Data Table](./data-table.md)
