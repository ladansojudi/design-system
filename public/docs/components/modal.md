---
title: Modal
slug: modal
category: Organism
status: stable
source: components/ui/modal.tsx
styleguide: /styleguide/modal
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=10-50
apg: https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
---

# Modal

A dialog that interrupts the current task to request a decision or focused input. It traps focus and blocks interaction with the rest of the page until it closes.

## Overview

### When to use
- Confirming a destructive or irreversible action ("Delete 3 assets?").
- A short, self-contained task that must finish before continuing (rename, quick create).

### When not to use
- Long forms or multi-step flows → a dedicated page.
- Non-blocking information → [Alert](./alert.md) or [Toast](./toast-tooltip.md).
- Content users need to reference while working on the page → a drawer / side panel (not built yet).

## Anatomy

```
░░░░░░░░░░░░░░░░░ ① backdrop ░░░░░░░░░░░░░░░░░
░  ┌─────────────────────────────────────┐   ░
░  │ ② Title                        ③ ✕  │   ░  ModalHeader
░  ├─────────────────────────────────────┤   ░
░  │ ④ Description / body                │   ░  ModalBody
░  │                                     │   ░
░  │              ⑤ [Cancel] [Delete]    │   ░  ModalFooter
░  └─────────────────────────────────────┘   ░
```

1. **Backdrop**: black/50 + blur. Clicking it closes the modal (`closeOnBackdrop`).
2. **Title**: `ModalTitle`, automatically the dialog's accessible name.
3. **Close**: `aria-label="Close"`.
4. **Body**: `ModalDescription` is automatically the accessible description. `scrollable` caps the height at 60vh.
5. **Footer**: right-aligned actions, primary last.

## Sizes

| `size` | Max width | Use for |
|---|---|---|
| `sm` *(default)* | 384px | Confirmations |
| `md` | 448px | Short forms |
| `lg` | 672px | Rich content, previews |

## States

| State | Behaviour |
|---|---|
| Opening | Focus moves to the element with `data-autofocus`, else the first focusable element, else the panel |
| Open | Tab / Shift+Tab are trapped inside; body scroll is locked; every other top-level element is `inert` |
| Closing | Escape (`closeOnEscape`), backdrop click (`closeOnBackdrop`) or ✕ → `onOpenChange(false)` |
| Closed | Focus returns to the element that opened it |

## Content guidelines
- Title is a question or action for confirmations ("Delete 3 assets?").
- The body states the consequence ("This removes all scan history and can't be undone.").
- Button labels repeat the verb ("Delete", not "OK"); the secondary is "Cancel".

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Put `data-autofocus` on the least destructive action for dangerous confirms | Auto-focus "Delete" |
| Set `closeOnBackdrop={false}` when there's unsaved input | Lose typed data on a stray click |
| Keep one modal at a time | Open a modal from a modal |

## Accessibility

**Pattern:** [APG — Dialog (Modal)](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)

| Key | Action |
|---|---|
| `Tab` / `Shift+Tab` | Cycle through focusable elements inside the modal only |
| `Escape` | Close (unless `closeOnEscape={false}`) |

- `role="dialog"` + `aria-modal="true"` on the panel.
- `aria-labelledby` → `ModalTitle` and `aria-describedby` → `ModalDescription`, wired automatically. Pass `aria-label` if there's no visible title.
- Focus is restored to the trigger on close.

## Design tokens

| Role | Token |
|---|---|
| Panel / border | `snt-surface-app` / `snt-border-default` |
| Title / description | `snt-text-primary` / `snt-text-secondary` |
| Close hover / focus ring | `snt-bg-subtle` / `snt-focus-ring` |
| Layer | `z-modal` |

## Design ↔ Code

| Figma property | Prop |
|---|---|
| Size | `size` = SM · MD · LG |
| Header / Show close | `ModalHeader showClose` + `onClose` |
| Footer / Bordered | `ModalFooter bordered` |
| Body / Scrollable | `ModalBody scrollable` |

## API

| Component | Prop | Type | Default |
|---|---|---|---|
| `Modal` | `open` | `boolean` | — (required) |
| | `onOpenChange` | `(open: boolean) => void` | — (required) |
| | `size` | `"sm" \| "md" \| "lg"` | `"sm"` |
| | `closeOnBackdrop` | `boolean` | `true` |
| | `closeOnEscape` | `boolean` | `true` |
| `ModalHeader` | `onClose`, `showClose` | `() => void`, `boolean` | —, `true` |
| `ModalTitle` | span attrs | | |
| `ModalDescription` | p attrs | | |
| `ModalBody` | `scrollable` | `boolean` | `false` |
| `ModalFooter` | `bordered` | `boolean` | `false` |

## Examples

```tsx
<Modal open={open} onOpenChange={setOpen}>
  <ModalHeader onClose={() => setOpen(false)}>
    <ModalTitle>Delete 3 assets?</ModalTitle>
  </ModalHeader>
  <ModalBody>
    <ModalDescription>This removes all scan history and can't be undone.</ModalDescription>
  </ModalBody>
  <ModalFooter>
    <Button intent="default" variant="outline" data-autofocus onClick={() => setOpen(false)}>Cancel</Button>
    <Button intent="destructive" onClick={confirmDelete}>Delete</Button>
  </ModalFooter>
</Modal>
```

## Known gaps
- [ ] No enter / exit animation.
- [ ] No alert-dialog variant (`role="alertdialog"`) for destructive confirms.

## Related
- [Button](./button.md) · [Alert](./alert.md)
