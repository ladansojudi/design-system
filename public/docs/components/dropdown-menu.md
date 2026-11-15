---
title: Dropdown menu
slug: dropdown-menu
category: Molecule
status: beta
source: components/ui/dropdown-menu.tsx
styleguide: /styleguide/dropdown-menu
figma: TBD
apg: N/A
---

# Dropdown menu

A dropdown list of actions behind a button, following the WAI-ARIA menu-button pattern.

## Accessibility

`aria-haspopup`, `aria-expanded`, `role=menu` / `menuitem`. Enter / Space / arrows open it, arrows + Home / End + type-ahead move, Escape returns focus to the button, Tab closes.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `align` | `"start" \| "end"` | `"start"` | DropdownMenuContent: edge it lines up with |
| `onSelect` | `() => void` | — | DropdownMenuItem: chosen |
| `destructive` | `boolean` | `false` | DropdownMenuItem: red text |
| `shortcut` | `string` | — | DropdownMenuItem: display-only hint |
| `disabled` | `boolean` | `false` | DropdownMenuItem: can't be chosen |

## Examples

```tsx
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger className={buttonVariants({ intent: "neutral", variant: "outline" })}>Actions</DropdownMenuTrigger>
  <DropdownMenuContent><DropdownMenuItem onSelect={rescan}>Re-run scan</DropdownMenuItem></DropdownMenuContent>
</DropdownMenu>
```

## Known gaps
- [ ] Not in the Figma library yet.

## Related
- [Select](./select.md)

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/dropdown-menu`.
