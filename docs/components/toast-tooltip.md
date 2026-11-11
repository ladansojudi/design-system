---
title: Toast · Tooltip
slug: toast-tooltip
category: Atom
status: stable
source: components/ui/toast-tooltip.tsx
styleguide: /styleguide/toast-tooltip
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=7-50
apg: https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/ · https://www.w3.org/WAI/ARIA/apg/patterns/alert/
---

# Toast · Tooltip

**Toast** is a brief, non-blocking confirmation of something that just happened.
**Tooltip** is a short label or hint that appears on hover or focus of a control.

## Overview

### When to use
- **Toast:** confirming the result of a user action ("Scan started", "Report exported").
- **Tooltip:** naming an icon-only button, or giving a one-line definition of a term.

### When not to use
- Errors that block progress, or anything the user must act on → [Alert](./alert.md) or [Modal](./modal.md). Toasts disappear.
- System-wide announcements → [Banner](./banner.md) / [Alert](./alert.md).
- Essential information, or interactive content (links, buttons) → not a tooltip. Use inline text or a popover.
- Disabled controls → tooltips can't be reached on disabled elements (Atlassian guidance).

## Anatomy

```
Toast                                   Tooltip
┃ ① ✓  ② Title                 ④ ✕       ┌─────────────────┐
┃      ③ Description                     │ ① Content       │
└ intent bar                             └────────▼────────┘ ② arrow
```

Toast: ① intent icon · ② title · ③ description · ④ dismiss button, with a coloured left bar.
Tooltip: ① content (max width 224px) · ② arrow toward the trigger.

## Variants

| Toast `intent` | Use for |
|---|---|
| `success` | Action completed |
| `info` *(default)* | Neutral status ("Export is being prepared") |
| `warning` | Completed with caveats |
| `alert` | Action failed but can be retried |

| Tooltip `position` | `top` *(default)* · `bottom` · `left` · `right` |
|---|---|

## States

| Component | State | Behaviour |
|---|---|---|
| Toast | Visible | With `ToastProvider`: auto-dismisses after `duration` (4s; failures 8s), pauses on hover / focus, always dismissible, max 3 stacked bottom-right |
| Tooltip | Hidden → visible | Shows on hover (after `delay`, 300ms) and immediately on keyboard focus. Hides on `Escape`, blur or mouse leave. `open` forces it visible for docs. |

## Content guidelines
- Toast title: past tense, ≤ 6 words ("Scan scheduled"). The description is optional and one sentence.
- Tooltip: ≤ 1 short sentence, no ending period for fragments. Never repeat the visible label.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Show one toast at a time and stack the rest | Use a toast for errors that need a fix |
| Use a tooltip to name icon-only buttons | Put links or buttons inside a tooltip |

## Accessibility

**Patterns:** [APG Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/) · [APG Alert](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)

| Key | Action |
|---|---|
| `Tab` to trigger | Tooltip appears |
| `Escape` | Tooltip hides (WCAG 1.4.13 "dismissible") |

- Toast: `role="status"` + `aria-live="polite"` for success / info / warning; `role="alert"` + `aria-live="assertive"` for `alert`. `aria-atomic` reads it as one message. For reliable announcements, render toasts into a viewport that's already mounted.
- Tooltip bubble: `role="tooltip"` with an `id`. A single element child automatically gets `aria-describedby` pointing to it.
- Toast dismiss button has `aria-label="Dismiss"`.

## Design tokens

| Role | Token |
|---|---|
| Toast surface / border | `snt-surface-app` / `snt-border-default` |
| Toast intent bar + icon | `snt-feedback-success` · `-info` · `-warning` · `-alert` |
| Toast title / description | `snt-text-primary` / `snt-text-secondary` |
| Tooltip bg / text | `snt-neutral-grey-900` / `snt-text-inverse` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Toast / Intent | `intent` | Success · Info · Warning · Alert |
| Tooltip / Position | `position` | Top · Bottom · Left · Right |

## API

**Toast**

| Prop | Type | Default | Description |
|---|---|---|---|
| `intent` | `"success" \| "alert" \| "info" \| "warning"` | `"info"` | Colour + icon |
| `title` | `string` | — | Heading |
| `description` | `string` | — | Body |
| `onDismiss` | `() => void` | — | Shows the ✕ button when set |

**ToastProvider / useToast**

```tsx
import { ToastProvider, useToast } from "@/components/ui/toast-tooltip";
import { Button } from "@/components/ui/button";

// Once, around the app (e.g. in app/layout.tsx)
export function Providers({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>;
}

// Anywhere inside it
export function ScheduleScan() {
  const toast = useToast();
  return (
    <Button onClick={() => toast({ intent: "success", title: "Scan scheduled", description: "Runs daily at 02:00" })}>
      Schedule scan
    </Button>
  );
}
```

| Option | Type | Default |
|---|---|---|
| `intent` | `"success" \| "alert" \| "info" \| "warning"` | `"info"` |
| `title` / `description` | `string` | — |
| `duration` | `number` (ms) | 4000 (8000 for `alert`) |

**Tooltip**

| Prop | Type | Default | Description |
|---|---|---|---|
| `content` | `string` | — | **Required** text |
| `position` | `"top" \| "bottom" \| "left" \| "right"` | `"top"` | Placement |
| `open` | `boolean` | — | Forces visibility (docs / screenshots) |
| `delay` | `number` | `300` | Hover delay in ms |
| `children` | `ReactNode` | — | The trigger |

## Examples

```tsx
<Toast intent="success" title="Scan scheduled" description="Runs daily at 02:00" onDismiss={close} />

<Tooltip content="Re-run scan">
  <Button iconOnly variant="ghost" intent="neutral" aria-label="Re-run scan"><RotateCw size={16} aria-hidden /></Button>
</Tooltip>
```

## Known gaps
- [ ] The tooltip doesn't flip or collide with the viewport.

## Related
- [Alert](./alert.md) · [Banner](./banner.md) · [Button](./button.md)
