---
title: Tabs
slug: tabs
category: Molecule
status: stable
source: components/ui/tabs.tsx
styleguide: /styleguide/tabs
figma: TBD
apg: https://www.w3.org/WAI/ARIA/apg/patterns/tabs/
---

# Tabs

Switches between related views of the same object without leaving the page.

## Overview

### When to use
- 2–7 peer views of one entity (Overview · Findings · Assets · Settings).
- The content of each tab makes sense on its own.

### When not to use
- Sequential steps → a stepper (not built yet).
- Navigating to different pages → navigation links (sidebar, breadcrumb).
- Toggling a filter on one dataset → a segmented control or [Filter Bar](./filter-bar.md).
- Comparing content side by side → users can't see two tabs at once.

## Anatomy

```
 ① Overview   Findings   Assets
 ━━━━━━━━━━                       ② active indicator
───────────────────────────────── ③ baseline divider
 ④ Panel content
```

1. **Trigger**: 14px / 500 label.
2. **Active indicator**: 2px brand underline.
3. **Divider**: `neutral-divider-10`, full width.
4. **Panel**: only the active panel is rendered.

## States

| State | Visual |
|---|---|
| Inactive | `text-secondary`, no underline |
| Hover | `text-primary` |
| Active | `text-primary` + brand underline |
| Focus | Inset 2px brand/40 ring (`focus-visible`) |
| Disabled | 50% opacity, not clickable |

## Content guidelines
- 1–2 words, nouns, sentence case. No icons-only tabs.
- Counts may follow the label ("Findings 12"). Keep them in the same trigger.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Keep the tab order stable | Reorder tabs based on data |
| Sync the active tab to the URL for deep links | Lose the selected tab on reload |
| Use one row of tabs | Nest tabs inside tabs |

## Accessibility

**Pattern:** [APG — Tabs](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)

| Key | Action |
|---|---|
| `Tab` | Focus moves to the **active** tab, then into the panel |
| `←` / `→` | Previous / next tab (wrapping) |
| `Home` / `End` | First / last tab |
| `Enter` / `Space` | Activate (if activation is manual) |

- `tablist` (`aria-orientation="horizontal"`), `tab` (`aria-selected`, `aria-controls`), `tabpanel` (`aria-labelledby`, `tabIndex=0`).
- Roving tabindex: only the active tab is a Tab stop. Arrow keys move focus **and** activate (automatic activation).
- Give the `TabsList` an `aria-label` describing the set.

## Design tokens

| Role | Token |
|---|---|
| Inactive / active text | `s4e-text-secondary` / `s4e-text-primary` |
| Indicator / focus ring | `s4e-brand-primary-500` |
| Divider | `s4e-border-default` |

## Design ↔ Code

| Figma property | Code |
|---|---|
| Tab / State = Active | `Tabs value` equals `TabsTrigger value` |
| Tab / Disabled | `TabsTrigger disabled` |

## API

| Component | Prop | Type | Default | Description |
|---|---|---|---|---|
| `Tabs` | `value` | `string` | — | Controlled active tab |
| | `defaultValue` | `string` | `""` | Uncontrolled initial tab |
| | `onValueChange` | `(v: string) => void` | — | Change handler |
| `TabsList` | …`HTMLAttributes` | | | Renders `role="tablist"` |
| `TabsTrigger` | `value` | `string` | — | **Required** |
| `TabsContent` | `value` | `string` | — | **Required**; rendered only when active |

## Examples

```tsx
<Tabs defaultValue="overview">
  <TabsList aria-label="Asset sections">
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="findings">Findings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="findings">…</TabsContent>
</Tabs>
```

## Known gaps
- [ ] The 1.1 CHANGELOG says Tabs uses `@base-ui/react`, but it's a hand-rolled implementation. Correct the CHANGELOG note, or migrate.
- [ ] No manual-activation mode (`activationMode="manual"`) for tabs whose panels are expensive to render.
- [ ] No overflow handling (scroll buttons) for many tabs on narrow screens.

## Related
- [Breadcrumb](./breadcrumb.md) · [Filter Bar](./filter-bar.md)
