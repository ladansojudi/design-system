---
title: Masked Value
slug: masked-value
category: Atom
status: beta
source: components/ui/masked-value.tsx
styleguide: /styleguide/masked-value
figma: TBD
apg: N/A
---

# Masked Value

A secret — API key, token, password — shown masked, with reveal and copy.

## Accessibility

client: state + clipboard. While masked, screen readers hear "<label>, hidden, ends in <tail>". Reveal is a toggle with aria-pressed; buttons are named from label; "copied" is announced in a polite live region.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | The secret |
| `label` | `string` | — | Names buttons and masked text |
| `visibleChars` | `number` | `4` | Visible tail |
| `revealable` | `boolean` | `true` | Show / hide |
| `copyable` | `boolean` | `true` | Copy |

## Examples

```tsx
import { MaskedValue } from "@/components/ui/masked-value";

<MaskedValue label="API key" value={apiKey} />
```

## Known gaps
- [ ] Not in the Figma library yet.

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/masked-value`.
