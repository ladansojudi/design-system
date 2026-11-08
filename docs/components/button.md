---
title: Button
slug: button
category: Atom
status: stable
source: components/ui/button.tsx
styleguide: /styleguide/button
figma: TBD
apg: https://www.w3.org/WAI/ARIA/apg/patterns/button/
---

# Button

Buttons trigger an action on the current page: submitting a form, opening a modal, starting a scan.

## Overview

### When to use
- To commit, start or confirm an action ("Start scan", "Save changes").
- To open an overlay that belongs to the current page (modal, drawer).

### When not to use
- To move to another page or URL. Use a link (`<a>` / Next `<Link>`) instead, even if it looks like a button. Assistive tech announces buttons and links differently.
- For a toggle between two states. Use [Switch](./switch-radio.md).
- For a choice between options. Use [Radio](./switch-radio.md), [Select](./select.md) or [Tabs](./tabs.md).

## Anatomy

```
┌──────────────────────────────┐
│ ① [icon]  ② Label  ③ [icon]  │   ④ container
└──────────────────────────────┘
```

1. **Leading icon** (optional): a lucide icon, 14–16px, passed as a child.
2. **Label** (required unless `iconOnly`): verb + noun, sentence case.
3. **Trailing icon** (optional): e.g. `ChevronDown` for a menu trigger.
4. **Container**: carries `intent` × `variant` colours, radius `md` (6px).

## Variants

`intent` sets the meaning and `variant` sets the emphasis. All 9 combinations are supported.

| intent ＼ variant | `solid` (high) | `outline` (medium) | `ghost` (low) |
|---|---|---|---|
| `primary` | The **one** main action in an area | Secondary action next to a primary | Tertiary or inline actions |
| `default` | Neutral strong action (dark UI) | "Cancel", "Back" | Toolbar actions, icon buttons |
| `destructive` | Irreversible delete / revoke, usually inside a confirm modal | Destructive action that isn't the main one | Low-emphasis remove, e.g. in lists |

**Emphasis rule:** at most one `primary solid` per view or modal (Atlassian: "use one primary call to action").

## Sizes

| Size | Height | Padding-x | Gap | Font | Use for |
|---|---|---|---|---|---|
| `sm` | 32px | 12px | 4px | 14px / 500 | Dense tables, filter bars, cards |
| `md` *(default)* | 36px | 16px | 8px | 14px / 500 | Forms, modals, page actions |
| `lg` | 44px | 20px | 8px | 14px / 500 | Hero / empty-state CTA, touch-first screens |

`iconOnly` makes the button square (32 / 36 / 44px). 44px meets the WCAG 2.5.5 target-size recommendation. 32px meets the 2.5.8 AA minimum of 24px.

## States

| State | Visual | Behaviour |
|---|---|---|
| Default | Per intent × variant | — |
| Hover | One step darker bg (`*-700`) or tinted bg for outline / ghost | Pointer cursor |
| Focus (keyboard) | 2px ring + 2px offset in the intent colour | Only on `:focus-visible`, never on mouse click |
| Active / pressed | Inherits hover | — |
| Loading | Label replaced by spinner | `disabled` is set while loading. Double submit is impossible. |
| Disabled | 40% opacity, `not-allowed` cursor | Not focusable. Avoid it when you can (see Do / Don't). |

## Content guidelines
- **Verb + noun**, sentence case: "Start scan", "Delete asset". Not "OK" or "Submit".
- Keep it to 1–3 words. No ending punctuation.
- A destructive label names what is destroyed: "Delete 3 assets", not "Yes".
- Pair labels in modals: primary on the right ("Delete"), `default outline` "Cancel" on the left.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep the button enabled and show a validation message on click | Disable a submit button with no explanation (Atlassian: "avoid disabling buttons") |
| Give every `iconOnly` button an `aria-label` | Rely on the icon or `title` alone |
| Use `destructive` only for irreversible actions | Use red to mean "important" |
| Use one `primary solid` per area | Put two primaries side by side |
| Put a tooltip on an enabled icon button | Put a tooltip on a disabled button, because it can't be reached by keyboard |

## Accessibility

**Pattern:** [WAI-ARIA APG — Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/)

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Move focus to / from the button |
| `Enter` / `Space` | Activate |

- Renders a native `<button>` with `type="button"` by default. Pass `type="submit"` inside forms.
- `iconOnly` requires `aria-label`. The visible icon should be `aria-hidden`.
- For a toggle button, pass `aria-pressed`. For a menu trigger, pass `aria-haspopup` and `aria-expanded`.
- Contrast: label on `btn-primary-600` and `btn-error-600` passes 4.5:1. The focus ring is 3:1 against the surface.

## Design tokens

| Role | Token |
|---|---|
| Primary bg / hover | `s4e-btn-primary-600` / `s4e-btn-primary-700` |
| Destructive bg / hover | `s4e-btn-error-600` / `s4e-btn-error-700` |
| Default solid bg / hover | `s4e-text-primary` / `s4e-neutral-grey-800` |
| Label on solid | `s4e-text-on-accent`, `s4e-text-inverse` |
| Outline / ghost label | `s4e-text-link`, `s4e-text-error`, `s4e-text-primary` |
| Outline border | `s4e-neutral-grey-300` |
| Tinted hover | `s4e-brand-primary-50`, `s4e-scale-red-50`, `s4e-neutral-grey-100` |
| Focus ring | `s4e-brand-primary-500`, `s4e-scale-red-500`, `s4e-neutral-grey-300…500` |
| Ring offset | `s4e-surface-app` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Intent | `intent` | Default · Primary · Destructive |
| Variant | `variant` | Solid · Outline · Ghost |
| Size | `size` | SM · MD · LG |
| State = Loading | `loading` | true / false |
| Icon only | `iconOnly` | true / false |
| State = Disabled | `disabled` | true / false |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `intent` | `"default" \| "primary" \| "destructive"` | `"primary"` | Meaning / colour family |
| `variant` | `"solid" \| "outline" \| "ghost"` | `"solid"` | Emphasis |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Height and padding |
| `loading` | `boolean` | `false` | Shows a spinner and disables the button |
| `iconOnly` | `boolean` | `false` | Square button. Requires `aria-label`. |
| `type` | `"button" \| "submit" \| "reset"` | `"button"` | Native type |
| …rest | `ButtonHTMLAttributes` | — | Forwarded to `<button>`; `ref` forwarded |

## Examples

```tsx
import { Button } from "@/components/ui/button";
import { Trash2, Play } from "lucide-react";

<Button>Start scan</Button>
<Button intent="default" variant="outline">Cancel</Button>
<Button intent="destructive"><Trash2 size={14} aria-hidden /> Delete asset</Button>
<Button iconOnly variant="ghost" intent="default" aria-label="Run again"><Play size={16} aria-hidden /></Button>
<Button type="submit" loading={isSaving}>Save changes</Button>
```

## Known gaps
- [ ] `loading` swaps the label for a spinner, so the width jumps and screen readers lose the label. Keep the label visually hidden, overlay the spinner, and add `aria-busy`.
- [ ] No `asChild` / `href` support for link-styled buttons. Consumers hand-roll `<a>` styling.
- [ ] Hover uses primitive scale tokens (`neutral-grey-800`, `scale-red-50`). Move to semantic `bg-hover-*` tokens.
- [ ] Font size is a hard-coded `text-[14px]`. Should use a typography token.

## Related
- [Spinner](./spinner.md) · [Modal](./modal.md) · [Filter Bar](./filter-bar.md) · [Tooltip](./toast-tooltip.md)
