---
title: Banner
slug: banner
category: Atom
status: deprecated
source: components/ui/banner.tsx
styleguide: /styleguide/banner
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=6-267
apg: N/A
---

# Banner

> **Deprecated.** Don't use Banner in new designs or code. It will be removed in the next major release.
> **Migrate to:** a full-width [Alert](./alert.md) placed at the top of the page layout (for system messages), or an in-content promo card (for marketing). See *Migration* below.

A full-width strip at the top of the app for product-wide announcements, promotions or warnings.

## Why it's deprecated
_Draft rationale, inferred from the code. Confirm with design before publishing._
- It overlaps with Alert (warning) and with in-content cards (promo), which makes it unclear which to use.
- Dark, saturated full-width bars compete with the top bar and with page-level primary actions.
- Its dismiss state isn't persisted, so it reappears on every load.

## Migration

| Banner usage | Replace with |
|---|---|
| `tone="warning"` (maintenance, quota) | `<Alert variant="warning" dismissible>` at the top of the page content |
| `tone="neutral"` (announcement) | `<Alert variant="info" dismissible>` |
| `tone="promo"` (upsell, new feature) | An in-content card or an empty-state slot, not a global bar |

```tsx
// Before
<Banner tone="warning" message="Scheduled maintenance Sunday 02:00 UTC" cta={{ label: "Details", href: "/status" }} />

// After
<Alert variant="warning" dismissible onDismiss={persistDismiss}
  action={<a href="/status">Details</a>}>
  Scheduled maintenance Sunday 02:00 UTC
</Alert>
```

## Anatomy (for reference)

```
┌──────────────────────────────────────────────────────────────┐
│ ① 📣  ② Message                         ③ [CTA]     ④ ✕     │
└──────────────────────────────────────────────────────────────┘
```

① tone icon · ② message · ③ optional CTA link · ④ dismiss (`aria-label="Dismiss"`).

## Variants (for reference)

| `tone` | Background |
|---|---|
| `neutral` *(default)* | `snt-btn-neutral-800` |
| `promo` | `snt-btn-primary-600` |
| `warning` | `snt-scale-yellow-500` |

## Accessibility
- No landmark or live-region role. If it's kept temporarily, wrap it in `<section aria-label="Announcement">`.

## API (for reference)

| Prop | Type | Default |
|---|---|---|
| `tone` | `"neutral" \| "promo" \| "warning"` | `"neutral"` |
| `message` | `ReactNode` | — (required) |
| `cta` | `{ label: string; href?: string }` | — |
| `dismissible` | `boolean` | `true` |
| `onDismiss` | `() => void` | — |

## Related
- [Alert](./alert.md)
