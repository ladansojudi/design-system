---
title: Switch · Radio
slug: switch-radio
category: Atom
status: stable
source: components/ui/switch-radio.tsx
styleguide: /styleguide/switch-radio
figma: TBD
apg: https://www.w3.org/WAI/ARIA/apg/patterns/switch/ · https://www.w3.org/WAI/ARIA/apg/patterns/radio/
---

# Switch · Radio

**Switch** turns a single setting on or off, effective immediately.
**Radio** picks exactly one option from a small, visible set.

## Overview

### When to use
- **Switch:** a setting that applies the moment it changes ("Continuous scanning").
- **Radio:** 2–5 mutually exclusive options that should all be visible for comparison.

### When not to use
- A choice that only takes effect after "Save" → [Checkbox](./checkbox.md), not a Switch.
- More than ~5 options → [Select](./select.md).
- Multiple selections → [Checkbox](./checkbox.md).

## Anatomy

```
Switch                      Radio group
┌────────●┐ ② Label         ◉ ② Option A
└─────────┘                 ○   Option B
 ① track + thumb            ① circle + dot
```

1. **Switch:** a 36×22 track with a 16px thumb. **Radio:** an 18px circle with an 8px dot.
2. **Label**: pass it as a sibling or child, and always associate it (see Accessibility).

## Variants

| Component | Variant | Use for |
|---|---|---|
| Switch | `dark` *(default)* | Neutral settings lists |
| Switch | `primary` | Brand-emphasised toggles (feature opt-ins) |

## States

| State | Switch | Radio |
|---|---|---|
| Off / unselected | Grey-300 track | Grey-400 border |
| On / selected | Dark or primary track, thumb slides right | Dark border + dot |
| Hover | Track darkens | Border darkens |
| Focus | `focus-visible` 2px brand ring | `focus-visible` 2px brand ring |
| Disabled | 40% opacity | 40% opacity, muted label |

## Content guidelines
- Switch label: describe the setting, not the action ("Email alerts", not "Turn on email alerts"). Don't write "On/Off" next to it; the switch already shows the state.
- Radio options: parallel grammar, similar length, ordered logically. Always pre-select one unless "none" is a valid answer.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Apply a switch change immediately (optimistic UI + toast on failure) | Require "Save" after flipping a switch |
| Give a radio group a visible group label | Show orphan radios without context |

## Accessibility

**Patterns:** [APG Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) · [APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/)

| Key | Switch | Radio group |
|---|---|---|
| `Tab` | Focus the switch | Focus the selected radio (one tab stop for the group) |
| `Space` / `Enter` | Toggle | Select the focused radio |
| `↓` `→` / `↑` `←` | — | Move to the next / previous radio **and** select it |

- Switch: `<button role="switch" aria-checked>`. Label it with `aria-label` / `aria-labelledby`, or a wrapping `<label>`.
- Radio: `role="radiogroup"` with `role="radio"` + `aria-checked`. Give the group `aria-label` / `aria-labelledby`.
- Roving tabindex: the checked radio (or the first one when nothing is checked) is the only Tab stop. Arrow keys wrap and skip disabled radios.

## Design tokens

| Role | Token |
|---|---|
| Switch track off | `s4e-neutral-grey-300` |
| Switch track on (dark / primary) | `s4e-neutral-grey-900` / `s4e-btn-primary-600` (hover `-700`) |
| Radio border / dot | `s4e-neutral-grey-400` → `s4e-neutral-grey-800` |
| Label / disabled | `s4e-text-primary` / `s4e-text-disabled` |
| Focus ring | `s4e-focus-ring` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Switch / State | `checked` | On · Off |
| Switch / Variant | `variant` | Dark · Primary |
| Radio / Selected | `RadioGroup value` = `Radio value` | — |
| Disabled | `disabled` | true / false |

## API

**Switch**

| Prop | Type | Default | Description |
|---|---|---|---|
| `checked` | `boolean` | — | **Required**, controlled |
| `onChange` | `(checked: boolean) => void` | — | Toggle handler |
| `variant` | `"dark" \| "primary"` | `"dark"` | On colour |
| …rest | `ButtonHTMLAttributes` | — | Forwarded to `<button>` |

**RadioGroup**

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Selected value |
| `onChange` | `(value: string) => void` | — | Selection handler |
| `name` | `string` | — | Group name |
| `disabled` | `boolean` | `false` | Disables all radios |

**Radio:** `value`, `checked?`, `onChange?`, …`ButtonHTMLAttributes`.

## Examples

```tsx
<label className="flex items-center gap-3">
  <Switch checked={continuous} onChange={setContinuous} />
  Continuous scanning
</label>

<RadioGroup aria-label="Scan depth" value={depth} onChange={setDepth}>
  <Radio value="light">Light</Radio>
  <Radio value="full">Full</Radio>
</RadioGroup>
```

## Known gaps
- [ ] The switch has no built-in `label` prop, so it's easy to ship unlabeled.
- [ ] The radio group has no `<fieldset>` / `<legend>` option, and `name` isn't used for native form submit.
- [ ] Thumb animation should respect reduced motion. The global rule now covers it.

## Related
- [Checkbox](./checkbox.md) · [Select](./select.md)
