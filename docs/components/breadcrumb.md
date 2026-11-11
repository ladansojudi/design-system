---
title: Breadcrumb
slug: breadcrumb
category: Molecule
status: stable
source: components/ui/breadcrumb.tsx
styleguide: /styleguide/breadcrumb
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=8-71
apg: https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/
---

# Breadcrumb

Shows where the current page sits in the hierarchy and lets users jump back up.

## Overview

### When to use
- Pages two or more levels deep (Assets / example.com / Finding #123).

### When not to use
- Flat, top-level pages.
- Showing step progress in a flow → a stepper.
- Showing browsing history. Breadcrumbs reflect hierarchy, not history.

## Anatomy

```
① Assets  ② •  ① example.com  ② •  ③ Finding #123
```

1. **Item**: a link to an ancestor page.
2. **Separator**: "•" by default, `aria-hidden`.
3. **Current page**: not a link, `aria-current="page"`.

## States

| State | Visual |
|---|---|
| Link | `text-primary` |
| Hover | `brand-primary-500`, underlined |
| Visited | `text-secondary` |
| Current | `text-secondary`, not interactive |
| Focus | Should show a visible ring (see Known gaps) |

## Content guidelines
- Use the destination page's title as the label, shortened if needed.
- Truncate the middle items on mobile (`Assets / … / Finding`), never the first or last.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Start at the section root | Start with "Home" when the logo already links home |
| Keep the current page as the last item | Make the current item a link to itself |

## Accessibility

**Pattern:** [APG — Breadcrumb](https://www.w3.org/WAI/ARIA/apg/patterns/breadcrumb/)

- `<nav aria-label="Breadcrumb">` landmark. ✅
- The current item has `aria-current="page"`. ✅
- Separators are `aria-hidden`. ✅
- APG recommends wrapping items in an ordered list (`<ol><li>`) so screen readers announce "list, 3 items". See Known gaps.

## Design tokens

| Role | Token |
|---|---|
| Link / hover | `snt-text-primary` / `snt-brand-primary-500` |
| Current / visited / separator | `snt-text-secondary` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Item / State | `isCurrent`, `visited` | Default · Current · Visited |
| Separator | `BreadcrumbSeparator children` | "•" (default) or custom |

## API

| Component | Prop | Type | Description |
|---|---|---|---|
| `Breadcrumb` | …`HTMLAttributes<HTMLElement>` | | `<nav>` wrapper |
| `BreadcrumbItem` | `href` | `string` | Link target |
| | `isCurrent` | `boolean` | Renders a `<span aria-current="page">` |
| | `visited` | `boolean` | Visited styling |
| `BreadcrumbSeparator` | `children` | `ReactNode` | Defaults to "•" |

## Examples

```tsx
<Breadcrumb>
  <BreadcrumbItem href="/assets">Assets</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem href="/assets/example.com">example.com</BreadcrumbItem>
  <BreadcrumbSeparator />
  <BreadcrumbItem isCurrent>Finding #123</BreadcrumbItem>
</Breadcrumb>
```

## Known gaps
- [ ] No `<ol>/<li>` list semantics.
- [ ] Links have no `focus-visible` style.
- [ ] Renders a plain `<a>`. No `asChild` for Next `<Link>` client-side navigation.
- [ ] No built-in collapse / ellipsis for long paths.

## Related
- [Tabs](./tabs.md)
