---
title: Select
slug: select
category: Atom
status: beta
source: components/ui/select.tsx
styleguide: /styleguide/select
figma: TBD
apg: https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/
---

# Select

A single-choice dropdown that picks one value from a list of options.

## Overview

### When to use
- One choice from 5–15 known options (severity, region, scan profile).

### When not to use
- 2–4 options that should all be visible → [Radio](./switch-radio.md).
- More than ~15 options, or the user needs to type to search → a searchable combobox (not built yet).
- Several selections → a checkbox list or multi-select (not built yet).
- Triggering actions (Edit, Delete) → a menu (not built yet), not a select.

## Anatomy

```
① Label
┌──────────────────────────┐
│ ② Selected value     ③ ▾ │  ← trigger (role="combobox")
└──────────────────────────┘
┌──────────────────────────┐
│ ④ Option             ⑤ ✓ │  ← listbox
│   Option (disabled)      │
└──────────────────────────┘
⑥ Helper / error text
```

1. **Label**: `<label>` tied to the trigger.
2. **Value / placeholder.**
3. **Chevron**: rotates when open.
4. **Option**: highlighted by keyboard or hover (`surface-row-hover`).
5. **Selected check.**
6. **Helper / error text.**

## States

| State | Visual | Behaviour |
|---|---|---|
| Default | Grey border | — |
| Hover | `neutral-grey-500` border | — |
| Focus | Brand border + `focus-visible` ring | — |
| Open | Brand border + soft ring, listbox below | Closes on outside click, Escape, Tab or selection |
| Error | Red border, label and helper | `aria-invalid` |
| Disabled | 40% opacity | Not focusable |
| Option disabled | `text-disabled` | Skipped by arrow keys and typeahead |

## Content guidelines
- Placeholder: "Select…" or a specific prompt ("Select severity"). It isn't a valid value.
- Order options logically: by severity, frequency or alphabet. Say which in the design.
- Keep option labels short. Long labels truncate.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Pre-select a sensible default when one exists | Force a choice the user doesn't care about |
| Use Radio when there are ≤4 options | Hide 2 options behind a dropdown |

## Accessibility

**Pattern:** [APG — Select-only combobox](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/)

| Key | Closed | Open |
|---|---|---|
| `↓` / `↑` | Open, highlight the selected (or first) option | Move the highlight, skipping disabled options, wrapping around |
| `Enter` / `Space` | Open | Select the highlighted option and close |
| `Home` / `End` | — | First / last enabled option |
| `Escape` | — | Close without changing the value |
| `Tab` | Move focus | Close and move focus |
| Printable char | Open and jump to the first match | Typeahead (500ms buffer) |

- Focus stays on the trigger. The highlighted option is exposed with `aria-activedescendant`.
- The trigger has `aria-expanded`, `aria-controls`, `aria-labelledby` (label + value) and `aria-describedby` (helper).
- Options are `role="option"` with `aria-selected` / `aria-disabled`.

## Design tokens

| Role | Token |
|---|---|
| Trigger / listbox bg | `s4e-surface-row` |
| Option hover / active | `s4e-surface-row-hover` |
| Selected option tint / check | `s4e-brand-primary-500` @ 8% / `s4e-brand-primary-500` |
| Border default / hover / focus / error | `s4e-neutral-grey-300` / `-500` / `s4e-brand-primary-600` / `s4e-scale-red-600` |
| Listbox border / shadow | `s4e-neutral-divider-10` / `shadow-s4e-lg` |
| Value / placeholder / helper | `s4e-text-primary` / `s4e-text-secondary` / `s4e-text-secondary` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| State | `state` | Default · Hover · Focused · Error · Disabled |
| Label / Helper | `label`, `helperText`, `errorText` | text |
| Placeholder | `placeholder` | text |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `options` | `{ value: string; label: string; disabled?: boolean }[]` | — | **Required** |
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Called on selection |
| `label` | `string` | — | Visible label |
| `placeholder` | `string` | `"Select…"` | Shown when there's no value |
| `state` | `"Default" \| "Hover" \| "Focused" \| "Error" \| "Disabled"` | `"Default"` | Visual state |
| `helperText` / `errorText` | `string` | — | Messages |
| `disabled` | `boolean` | `false` | Disables the trigger |
| …rest | `HTMLAttributes<HTMLDivElement>` | — | Applied to the wrapper; `ref` → wrapper |

## Examples

```tsx
<Select
  label="Severity"
  placeholder="Select severity"
  value={severity}
  onChange={setSeverity}
  options={[
    { value: "critical", label: "Critical" },
    { value: "high", label: "High" },
    { value: "medium", label: "Medium" },
    { value: "low", label: "Low" },
  ]}
/>
```

## Known gaps
- [ ] `state` values are PascalCase (`"Error"`), unlike every other component (`"error"`). Normalise in the next major.
- [ ] The listbox is absolutely positioned. It can be clipped by `overflow: hidden` parents and doesn't flip near the viewport edge. Portal + collision handling (or `@base-ui/react` Select) needed.
- [ ] No `name` / hidden input, so it doesn't participate in native `<form>` submit.
- [ ] No option groups, icons or descriptions.

## Related
- [Radio](./switch-radio.md) · [Text Field](./text-field.md) · [Filter Bar](./filter-bar.md)
