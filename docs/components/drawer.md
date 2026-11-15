---
title: Drawer
slug: drawer
category: Molecule
status: beta
source: components/ui/drawer.tsx
styleguide: /styleguide/drawer
figma: TBD
apg: N/A
---

# Drawer

A panel that slides in from the left or right edge for details or a short form, built like Modal.

## Accessibility

`role="dialog"` + `aria-modal`, named by `DrawerTitle`. Focus is trapped and restored, the page is inert, Escape closes it. Slide-in is skipped with reduced motion.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Shown or hidden |
| `onOpenChange` | `(open: boolean) => void` | — | Open / close request |
| `side` | `"left" \| "right"` | `"right"` | Edge |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | Maximum width |
| `closeOnBackdrop` | `boolean` | `true` | Click outside closes |
| `closeOnEscape` | `boolean` | `true` | Escape closes |

## Examples

```tsx
import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from "@/components/ui/drawer";

<Drawer open={open} onOpenChange={setOpen}>
  <DrawerHeader onClose={() => setOpen(false)}><DrawerTitle>Finding</DrawerTitle></DrawerHeader>
  <DrawerBody>…</DrawerBody>
</Drawer>
```

## Known gaps
- [ ] Not in the Figma library yet.

## Related
- [Modal](./modal.md)

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/drawer`.
