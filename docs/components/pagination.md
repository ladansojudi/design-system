---
title: Pagination
slug: pagination
category: Molecule
status: beta
source: components/ui/pagination.tsx
styleguide: /styleguide/pagination
figma: TBD
apg: N/A
---

# Pagination

Moves between pages of a long list; always shows the first, last and current pages with their neighbours.

## Accessibility

Native buttons in a nav landmark. The current page has `aria-current="page"`, buttons are named "Page N", and the arrows are disabled (not removed) at the ends. Announce the result of a page change in a live region.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `page` | `number` | — | Current page, from 1 |
| `pageCount` | `number` | — | Total pages |
| `onPageChange` | `(page: number) => void` | — | Called with the new page |
| `siblingCount` | `number` | `1` | Pages each side of the current one |
| `size` | `"sm" \| "md"` | `"md"` | Button size |
| `label` | `string` | `"Pagination"` | Accessible name |

## Examples

```tsx
import { Pagination } from "@/components/ui/pagination";

<Pagination page={page} pageCount={20} onPageChange={setPage} />
```

## Known gaps
- [ ] Not in the Figma library yet.

## Related
- [Data table](./data-table.md)

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/pagination`.
