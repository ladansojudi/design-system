---
title: Search Bar
slug: search-bar
category: Molecule
status: stable
source: components/ui/search-bar.tsx
styleguide: /styleguide/search-bar
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=6-164
apg: N/A (native input, role="searchbox")
---

# Search Bar

A text input dedicated to searching or filtering content, with a search icon and a clear button.

## Overview

### When to use
- Free-text search across a page, table or the whole product.

### When not to use
- Form data entry → [Text Field](./text-field.md).
- Combined with filter pills → use `FilterSearch` inside [Filter Bar](./filter-bar.md).
- Global navigation search → the ⌘K command palette.

## Anatomy

```
┌──────────────────────────────────────┐
│ ① 🔍  ② Search…                ③ ✕   │
└──────────────────────────────────────┘
```

1. **Search icon**: decorative; turns brand colour while focused.
2. **Input**: placeholder "Search…".
3. **Clear button**: visible when there's a value and `clearable`; `aria-label="Clear search"`.

## Variants

| `variant` | Use for |
|---|---|
| `default` | On page surfaces: bordered field |
| `ghost` | Inside toolbars / headers: grey-filled, no visible border until focused |

## States

| State | Visual |
|---|---|
| Default | `default`: border `neutral-divider-10` on `surface-app`; `ghost`: `neutral-grey-100` fill |
| Focus | Brand-500 border + 2px brand/20 ring, icon turns brand (`focus-within`) |
| Filled | Clear button shown |
| Disabled | Muted text, `not-allowed` |

## Content guidelines
- Placeholder names the scope: "Search assets", "Search findings by CVE".
- Show the result count near the results ("12 results"), not in the input.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Debounce (~250ms) remote searches | Fire a request on every keystroke |
| Keep the query in the URL (`?q=`) | Lose the query on reload |

## Accessibility

| Key | Action |
|---|---|
| `Escape` | Should clear the query (recommended) |
| `Enter` | Submit (if it isn't live filtering) |

- Use `type="search"` (implicit `role="searchbox"`) and give it a name: `aria-label="Search assets"` when there's no visible label.
- Wrap it in `<search>` / `role="search"` when it's the page's main search.
- Announce result-count changes in a polite live region.

## Design tokens

| Role | Token |
|---|---|
| Border | `snt-border-default` |
| Ghost fill | `snt-bg-subtle` |
| Surface | `snt-surface-app` |
| Icon / clear | `snt-text-secondary` → focus `snt-brand-primary-500` |
| Text / placeholder | `snt-text-primary` / `snt-text-secondary` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Variant | `variant` | Default · Ghost |
| Clearable | `clearable` | true / false |
| State = Disabled | `disabled` | true / false |

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Controlled value |
| `onChange` | `(value: string) => void` | — | Called with the string (not the event) |
| `onClear` | `() => void` | — | Called by ✕ |
| `clearable` | `boolean` | `true` | Shows ✕ when filled |
| `variant` | `"default" \| "ghost"` | `"default"` | Style |
| `placeholder` | `string` | `"Search…"` | — |
| …rest | `InputHTMLAttributes` | — | Forwarded to `<input>` |

## Examples

```tsx
<SearchBar aria-label="Search assets" placeholder="Search assets" value={q} onChange={setQ} onClear={() => setQ("")} />
```

## Known gaps
- [ ] Renders `type="text"`, not `type="search"`, and has no accessible name unless the consumer passes `aria-label`.
- [ ] `Escape` doesn't clear the input.
- [ ] No size scale (`sm` for toolbars). `FilterSearch` duplicates a 32px version.

## Related
- [Filter Bar](./filter-bar.md) · [Text Field](./text-field.md) · [Data Table](./data-table.md)
