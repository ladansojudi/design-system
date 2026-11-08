---
title: Text Field
slug: text-field
category: Atom
status: stable
source: components/ui/text-field.tsx
styleguide: /styleguide/text-field
figma: TBD
apg: N/A (native <input>)
---

# Text Field

A single-line input for short free text: names, domains, IPs, emails.

## Overview

### When to use
- The answer is one line and can't be picked from a known list.

### When not to use
- Multi-line text → [Textarea](./textarea.md).
- A choice from a known list → [Select](./select.md) (5+ options) or [Radio](./switch-radio.md) (2–5 options).
- Searching or filtering a list → [Search Bar](./search-bar.md).

## Anatomy

```
 filled                         outlined
┌─────────────────────┐        ┌─ ① Label ───────────┐
│ ① Label             │        │ ② Value             │
│ ② Value             │        └─────────────────────┘
└━━━━━━━━━━━━━━━━━━━━━┘ ③       ④ Helper / error text
 ④ Helper / error text
```

1. **Label** (required for a11y): a real `<label>` tied to the input. In `outlined` it floats onto the border when the field is focused or filled.
2. **Input value / placeholder.**
3. **Indicator**: a bottom border (filled) or full border (outlined). It turns brand colour on focus and red on error.
4. **Helper / error text** (optional): read out together with the field via `aria-describedby`.

## Variants

| Variant | Use for |
|---|---|
| `filled` *(default)* | Dense forms and settings panels where fields sit on a white surface |
| `outlined` | Standalone fields, auth screens, fields on a tinted background |

Don't mix variants within a single form.

## States

| State | Visual | Behaviour |
|---|---|---|
| Default | Grey border, secondary-colour label | — |
| Focus | Brand-600 border (2px outlined), label turns brand | Driven by real focus. `state="focused"` only forces the look (docs, screenshots). |
| Filled | Label stays floated (outlined) | Tracked for both controlled and uncontrolled use |
| Error | Red border and label, red helper text | `aria-invalid="true"`; the error text replaces the helper text |
| Disabled | 40% opacity | Native `disabled` |

## Content guidelines
- Label: a short noun phrase in sentence case, no colon ("Target domain").
- Placeholder: an example format only ("example.com"). Never put the label or instructions in the placeholder.
- Error text: say what is wrong and how to fix it ("Enter a domain without https://"), not "Invalid input".
- Mark optional fields "(optional)" rather than marking required ones with `*`, unless most fields are optional.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Always pass `label` (or `aria-label` if there's truly no visible label) | Use the placeholder as the label |
| Validate on blur or submit, then show `errorText` | Show an error while the user is still typing the first time |
| Use `type="email"`, `inputMode`, `autoComplete` | Force the generic keyboard on mobile |

## Accessibility

| Key | Action |
|---|---|
| `Tab` | Focus the input |
| Typing / standard editing keys | Native |

- `<label htmlFor>` is wired automatically through `useId`. A custom `id` you pass is respected.
- Helper and error text are linked with `aria-describedby`; errors set `aria-invalid`.
- Focus is visible: a 2px brand border plus the label colour change.
- Contrast: label, helper and placeholder use `text-secondary` (5.07:1 on white).

## Design tokens

| Role | Token |
|---|---|
| Filled background | `s4e-neutral-grey-100` · error `s4e-scale-red-50` |
| Border default / focus / error / disabled | `s4e-neutral-grey-300` / `s4e-brand-primary-600` / `s4e-scale-red-600` / `s4e-neutral-grey-200` |
| Label | `s4e-text-secondary` · focus `s4e-brand-primary-600` · error `s4e-scale-red-600` |
| Value | `s4e-text-primary` |
| Placeholder / helper | `s4e-text-secondary` |
| Floating label backdrop | `s4e-surface-app` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Variant | `variant` | Filled · Outlined |
| State | `state` / `disabled` | Default · Focused · Error · Disabled |
| Label | `label` | text |
| Helper | `helperText` / `errorText` | text |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Visible label, associated with the input |
| `variant` | `"filled" \| "outlined"` | `"filled"` | Visual style |
| `state` | `"default" \| "focused" \| "error" \| "disabled"` | `"default"` | Forces a visual state. `error` also sets `aria-invalid`. |
| `helperText` | `string` | — | Hint below the field |
| `errorText` | `string` | — | Shown when `state="error"` |
| `disabled` | `boolean` | — | Native disabled |
| …rest | `InputHTMLAttributes` (minus `size`) | — | Forwarded to `<input>`; `ref` forwarded |

## Examples

```tsx
<TextField label="Target domain" placeholder="example.com" helperText="Without https://" />

<TextField
  variant="outlined"
  label="Email"
  type="email"
  autoComplete="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  state={emailError ? "error" : "default"}
  errorText={emailError}
/>
```

## Known gaps
- [ ] The `state` prop mixes "visual override" with "validation". Consider a separate `invalid` boolean and keep `state` docs-only.
- [ ] No leading / trailing adornment slots (icon, unit, clear button).
- [ ] No `required` indicator convention.
- [ ] Hard-coded 11px / 14px font sizes. Move to typography tokens.

## Related
- [Textarea](./textarea.md) · [Select](./select.md) · [Search Bar](./search-bar.md)
