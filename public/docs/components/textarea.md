---
title: Textarea
slug: textarea
category: Atom
status: stable
source: components/ui/textarea.tsx
styleguide: /styleguide/textarea
figma: TBD
apg: N/A (native <textarea>)
---

# Textarea

A multi-line plain-text input for notes, descriptions and justifications.

## Overview

### When to use
- The answer may need more than one sentence (scan notes, exception justification).

### When not to use
- One-line answers → [Text Field](./text-field.md).
- Formatted text (bold, lists) → [Text Space](./text-space.md).

## Anatomy

```
① Label
┌──────────────────────────────┐
│ ② Value…                     │
│                           ③ ◢│
└──────────────────────────────┘
④ Helper / error text   ⑤ 12/200
```

1. **Label**: a `<label>` tied to the field.
2. **Value / placeholder.**
3. **Resize handle**: vertical only.
4. **Helper / error text**: linked through `aria-describedby`.
5. **Counter** (optional): shown when `showCounter` or `maxLength` is set. It turns warning colour above 90%.

## States

| State | Visual | Behaviour |
|---|---|---|
| Default | Grey border | — |
| Focus | Brand-600 border + 2px brand/20 ring | Real `:focus` styles; `state="focused"` forces them |
| Error | Red border, red helper | `aria-invalid="true"` |
| Near limit | Counter turns `scale-yellow-700` | At more than 90% of `maxLength` |
| Disabled | 40% opacity | Native `disabled` |

## Content guidelines
- Use the helper text to set the expected length ("2–3 sentences on why this is a false positive").
- With `maxLength`, the counter is the hint, so don't repeat "max 200 characters" in the helper.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Size `rows` to the expected answer (default 4) | Use a 1-row textarea as a text field |
| Use `maxLength` when the back end enforces one | Silently truncate on submit |

## Accessibility

| Key | Action |
|---|---|
| `Tab` | Focus the field (Tab doesn't insert a tab character) |
| `Enter` | New line |

- Label, `aria-describedby` and `aria-invalid` are wired automatically.
- The counter is visual only. If the limit matters, mention it in the helper text so screen-reader users hear it too.

## Design tokens

| Role | Token |
|---|---|
| Background | `s4e-surface-row` |
| Border default / focus / error / disabled | `s4e-border-strong` / `s4e-border-focus` / `s4e-border-error` / `s4e-neutral-grey-200` |
| Focus ring | `s4e-focus-ring` @ 20% |
| Text / placeholder / helper | `s4e-text-primary` / `s4e-text-secondary` / `s4e-text-secondary` |
| Counter warning | `s4e-scale-yellow-700` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| State | `state` / `disabled` | Default · Focused · Error · Disabled |
| Counter | `showCounter` / `maxLength` | on / off, number |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Visible label |
| `state` | `"default" \| "focused" \| "error" \| "disabled"` | `"default"` | Visual state / validation |
| `helperText` | `string` | — | Hint |
| `errorText` | `string` | — | Shown when `state="error"` |
| `showCounter` | `boolean` | `false` | Shows the length counter |
| `maxLength` | `number` | — | Native limit; also shows the counter |
| `rows` | `number` | `4` | Initial height |
| …rest | `TextareaHTMLAttributes` | — | Forwarded; `ref` forwarded |

## Examples

```tsx
<Textarea
  label="Justification"
  helperText="Why is this finding a false positive?"
  maxLength={280}
  value={note}
  onChange={(e) => setNote(e.target.value)}
/>
```

## Known gaps
- [ ] The counter only counts controlled `value`. It shows 0 when uncontrolled.
- [ ] No auto-grow option.
- [ ] Counter changes aren't announced. Consider a polite live region near the limit.

## Related
- [Text Field](./text-field.md) · [Text Space](./text-space.md)
