---
title: Filter Bar
slug: filter-bar
category: Molecule
status: stable
source: components/ui/filter-bar.tsx
styleguide: /styleguide/filter-bar
figma: TBD
apg: N/A (composed of buttons + input; see notes)
---

# Filter Bar

A horizontal toolbar that combines search, filter pills and view actions above a table or list.

## Overview

### When to use
- Above a [Data Table](./data-table.md) or list where users narrow the results by several dimensions.

### When not to use
- One filter → just a [Select](./select.md) or [Search Bar](./search-bar.md).
- Switching between unrelated views → [Tabs](./tabs.md).

## Anatomy

```
┌──────────────────────────────────────────────────────────────────────┐
│ ① 🔍 Search…  │ ② [Severity ▾] [Status 2 ✕] ③ [+3]  ④ Clear │ ⑤ ⬇ ⚙ │
└──────────────────────────────────────────────────────────────────────┘
```

1. **FilterSearch**: 32px search input.
2. **FilterPill**: opens a filter. When `active` it's brand-tinted, shows a `count` and a ✕ clear.
3. **FilterOverflow**: "+N" for collapsed pills.
4. **FilterClear**: resets all filters.
5. **FilterAction**: export, columns, settings. Can be icon-only.

`FilterBarGroup` arranges parts (`grow` takes the remaining space). `FilterBarDivider` is a vertical rule (`aria-hidden`).

## States

| Part | State | Visual |
|---|---|---|
| Pill | Default | Divider border, `text-secondary`, chevron |
| Pill | Hover | `neutral-grey-300` border, `text-primary` |
| Pill | Active | `brand-primary-500` border / text, `brand-primary-50` bg, count bubble, ✕ |
| Action | Muted / disabled | Secondary text / `text-disabled`, `not-allowed` |
| Bar | Overflow | Scrolls horizontally on small screens |

## Content guidelines
- Pill label = the dimension ("Severity"), not the value. Show the value count in the bubble.
- Keep "Clear" visible only when at least one filter is active.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Reflect active filters in the URL | Reset filters on navigation |
| Show the result count after filtering | Leave users guessing whether a filter applied |

## Accessibility
- Wrap it in `role="toolbar"` + `aria-label="Filters"` if arrow-key navigation between controls is implemented. Otherwise a `<div>` with natural Tab order is fine.
- Pills that open a menu: `aria-haspopup` + `aria-expanded`. Active pills: `aria-pressed` or a state in the label.
- `FilterAction iconOnly` gets `aria-label={label}` automatically.
- An active pill's clear ✕ is a **sibling** button (`aria-label="Clear <label>"`) inside the pill's visual container, never nested inside the pill button. `className` styles the container; other props go to the main button.
- Announce result-count changes in a polite live region.

## Design tokens

| Role | Token |
|---|---|
| Bar / pill border | `s4e-neutral-divider-10` (hover `s4e-neutral-grey-300`) |
| Surface | `s4e-surface-app` |
| Active pill | `s4e-brand-primary-500`, `s4e-brand-primary-50` |
| Count bubble | `s4e-brand-primary-500` / `s4e-text-on-accent` |
| Clear | `s4e-scale-red-600` (hover `-700`) |
| Text | `s4e-text-primary`, `s4e-text-secondary`, `s4e-text-disabled` |

## Design ↔ Code

| Figma part / property | Component / prop |
|---|---|
| Pill / Active | `FilterPill active` |
| Pill / Count | `FilterPill count` |
| Action / Icon only | `FilterAction iconOnly` |
| Action / Muted | `FilterAction muted` |
| +N | `FilterOverflow count` |

## API

| Component | Props |
|---|---|
| `FilterBar` | `HTMLAttributes<HTMLDivElement>` |
| `FilterBarGroup` | `grow?: boolean` |
| `FilterPill` | `label: string`, `icon?`, `count?: number`, `active?: boolean`, `onClear?: () => void`, …button attrs |
| `FilterSearch` | `value?: string`, `onChange?: (v: string) => void`, …input attrs |
| `FilterAction` | `icon` (required), `label: string`, `iconOnly?`, `muted?`, …button attrs |
| `FilterClear` | button attrs; `children` defaults to "Clear" |
| `FilterOverflow` | `count: number` |
| `FilterBarDivider` | div attrs |

## Examples

```tsx
<FilterBar>
  <FilterBarGroup grow>
    <FilterSearch aria-label="Search findings" value={q} onChange={setQ} />
  </FilterBarGroup>
  <FilterPill label="Severity" active count={2} onClear={clearSeverity} aria-haspopup="menu" />
  <FilterPill label="Status" />
  <FilterClear onClick={clearAll} />
  <FilterBarDivider />
  <FilterAction icon={Download} label="Export" iconOnly aria-label="Export" />
</FilterBar>
```

## Known gaps
- [ ] No popover / menu for pills. Consumers must build the dropdown.
- [ ] `FilterSearch` duplicates [Search Bar](./search-bar.md). Use a Search Bar `size="sm"` instead.

## Related
- [Search Bar](./search-bar.md) · [Data Table](./data-table.md) · [Select](./select.md)
