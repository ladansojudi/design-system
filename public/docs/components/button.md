---
title: Button
slug: button
category: Atom
status: stable
source: components/ui/button.tsx
styleguide: /styleguide/button
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=3-2
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
| Loading | Spinner over the (transparent) label | Width stays put, the label stays readable to screen readers, `aria-busy` is set and the button is disabled — no double submit. |
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
| Primary bg / hover | `snt-btn-primary-600` / `snt-btn-primary-700` |
| Destructive bg / hover | `snt-btn-error-600` / `snt-btn-error-700` |
| Default solid bg / hover | `snt-text-primary` / `snt-neutral-grey-800` |
| Label on solid | `snt-text-on-accent`, `snt-text-inverse` |
| Outline / ghost label | `snt-text-link`, `snt-text-error`, `snt-text-primary` |
| Outline border | `snt-border-strong` |
| Tinted hover | `snt-bg-brand-subtle`, `snt-bg-error-subtle`, `snt-bg-subtle` |
| Focus ring | `snt-focus-ring`, `snt-focus-ring-error`, `snt-neutral-grey-300…500` |
| Ring offset | `snt-surface-app` |

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

Also exported: `buttonVariants({ intent, variant, size, iconOnly })` — the class string, for links that should look like buttons. Button has no `"use client"`, so both work in Server Components.

## Examples

```tsx
import { Button } from "@/components/ui/button";
import { Trash2, Play } from "lucide-react";

<Button>Start scan</Button>
<Button intent="default" variant="outline">Cancel</Button>
<Button intent="destructive"><Trash2 size={14} aria-hidden /> Delete asset</Button>
<Button iconOnly variant="ghost" intent="default" aria-label="Run again"><Play size={16} aria-hidden /></Button>
<Button type="submit" loading={isSaving}>Save changes</Button>

// Navigation that looks like a button — a real link, not a <button>
<Link href="/scans" className={buttonVariants({ intent: "default", variant: "outline" })}>View scans</Link>
```

## Known gaps
- [ ] Hover uses primitive scale tokens (`neutral-grey-800`, `scale-red-50`). Move to semantic `bg-hover-*` tokens.

## Related
- [Spinner](./spinner.md) · [Modal](./modal.md) · [Filter Bar](./filter-bar.md) · [Tooltip](./toast-tooltip.md)
