---
title: Indicator
slug: indicator
category: Atom
status: beta
source: components/ui/indicator.tsx
styleguide: /styleguide/indicator
figma: TBD
apg: N/A
---

# Indicator

An indicator of compromise (IP, domain, URL, hash, email) with type, reputation verdict and copy. Optional defanging (example[.]com).

## Accessibility

client: clipboard. Type is written out; copy button names the value; hashes are shortened with the full value in title and copy.

## API

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | The IOC |
| `type` | `"ip" \| "domain" \| "url" \| "hash" \| "email"` | — | Label and icon |
| `verdict` | `"malicious" \| "suspicious" \| "clean" \| "unknown"` | — | Reputation |
| `defang` | `boolean` | `false` | Display defanged |
| `copyable` | `boolean` | `true` | Copy |

## Examples

```tsx
import { Indicator } from "@/components/ui/indicator";

<Indicator type="ip" value="185.220.101.47" verdict="malicious" />
```

## Known gaps
- [ ] Not in the Figma library yet.

Full usage guidance, do / don't and specs: the styleguide page `/styleguide/indicator`.
