---
title: Command palette
slug: command-palette
category: Organism
status: beta
source: components/ui/command-palette.tsx
styleguide: /styleguide/command-palette
figma: TBD
apg: N/A
---

# Command palette

A searchable list of commands and destinations opened with a shortcut; built on Modal.

## Accessibility

Combobox input controlling a listbox with `aria-activedescendant`; arrows, Home / End, Enter, Escape. Built on Modal for focus trap and restore. Result count announced politely.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `open` | `boolean` | — | Shown or hidden |
| `onOpenChange` | `(open: boolean) => void` | — | Open / close request |
| `items` | `CommandItem[]` | — | `id`, `label`, `onSelect` + optional `group`, `hint`, `icon`, `keywords` |
| `placeholder` | `string` | `"Type a command or search…"` | Input placeholder |
| `emptyLabel` | `string` | `"No results found."` | Empty text |
| `label` | `string` | `"Command palette"` | Accessible name |

## Examples

```tsx
import { CommandPalette } from "@/components/ui/command-palette";

<CommandPalette open={open} onOpenChange={setOpen} items={items} />
```

## Known gaps
- [ ] Not in the Figma library yet.

## Related
- [Modal](./modal.md)

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/command-palette`.
