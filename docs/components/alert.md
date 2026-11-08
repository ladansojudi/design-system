---
title: Alert
slug: alert
category: Atom
status: stable
source: components/ui/alert.tsx
styleguide: /styleguide/alert
figma: TBD
apg: https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Alert

An inline message tied to a page or section. It communicates a status that persists until the condition changes or the user dismisses it.

## Overview

### When to use
- A form or section-level error ("3 fields need attention").
- A persistent warning about the current context ("This asset hasn't been scanned in 30 days").
- A success message that should stay visible after a page change.

### When not to use
- Transient feedback on an action → [Toast](./toast-tooltip.md).
- Product-wide announcements at the top of the app → [Banner](./banner.md) (deprecated). Use a full-width Alert at the top of the layout instead.
- Field-level errors → the field's `errorText`.

## Anatomy

```
┌───────────────────────────────────────────────┐
│ ① ⓘ  ② Title                          ⑤ ✕     │
│       ③ Description text…                     │
│       ④ [Action]                              │
└───────────────────────────────────────────────┘
```

1. **Icon**: fixed per variant (Info, CheckCircle2, AlertTriangle, XCircle).
2. **Title** (optional).
3. **Description**: `children`.
4. **Action** (optional): a link or small button.
5. **Dismiss** (optional): `aria-label="Dismiss"`.

## Variants

| `variant` | Use for |
|---|---|
| `info` *(default)* | Neutral context, tips |
| `success` | Confirmation that persists |
| `warning` | Potential problem, still possible to continue |
| `error` | Something failed or is blocking |

## States

| State | Behaviour |
|---|---|
| Visible | Stays until dismissed or the condition clears |
| Dismissed | Removed; `onDismiss` fires. Persist the dismissal if it shouldn't come back. |

## Content guidelines
- Title: a short summary ("Scan failed"). Description: cause + next step ("The target refused connections. Check the firewall allow-list.").
- Keep the action label a verb ("Retry scan", "View logs").

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Place the alert next to what it's about | Stack several alerts. Combine them into one with a list. |
| Make `error` alerts non-dismissible while the error persists | Let users dismiss an unresolved blocking error |

## Accessibility

**Pattern:** [APG — Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

- Root has `role="alert"` (assertive live region). Screen readers interrupt to read it **when it's inserted**.
- `role="alert"` is right for `error` / `warning` that appear in response to an action. For `info` / `success`, or alerts present on page load, `role="status"` is less disruptive.
- The dismiss button is a native `<button>` with `aria-label`. Move focus somewhere sensible after dismissal.
- The icon is decorative; the variant meaning should also appear in the title text.

## Design tokens

| Role | Token |
|---|---|
| Background | `s4e-scale-{blue,green,yellow,red}-50` |
| Border | `s4e-scale-*-200` |
| Text / icon | `s4e-text-info`, `s4e-text-success`, `s4e-text-warning`, `s4e-text-error` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Variant | `variant` | Info · Success · Warning · Error |
| Title | `title` | text / none |
| Dismissible | `dismissible` | true / false |
| Action | `action` | slot |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"info" \| "success" \| "warning" \| "error"` | `"info"` | Colour + icon |
| `title` | `ReactNode` | — | Heading |
| `children` | `ReactNode` | — | Description |
| `action` | `ReactNode` | — | Action slot |
| `dismissible` | `boolean` | `false` | Shows ✕ |
| `onDismiss` | `() => void` | — | Called on ✕ |
| …rest | `HTMLAttributes<HTMLDivElement>` | — | Forwarded |

## Examples

```tsx
<Alert variant="error" title="Scan failed" action={<Button size="sm" variant="outline" intent="destructive">Retry</Button>}>
  The target refused connections. Check the firewall allow-list.
</Alert>
```

## Known gaps
- [ ] `role="alert"` is hard-coded for every variant. Add a `live` prop or use `status` for info / success.
- [ ] No full-width / page-level layout option to replace Banner.

## Related
- [Toast](./toast-tooltip.md) · [Banner](./banner.md) · [Empty State](./empty-state.md)
