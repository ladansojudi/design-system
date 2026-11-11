---
title: Text Space
slug: text-space
category: Organism
status: stable
source: components/ui/text-space.tsx
styleguide: /styleguide/text-space
figma: https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System?node-id=15-50
apg: https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/
---

# Text Space

A rich-text composer (toolbar + writing area) for formatted notes, reports and comments.

> Formatting uses the browser's built-in `execCommand`, so the editor needs no dependencies. It's fine for notes and comments. Move to an editor engine (Tiptap / Lexical) when the product needs a document model (see Known gaps).

## Overview

### When to use
- Long-form content that needs formatting: remediation notes, report summaries, comments with lists or links.

### When not to use
- Plain multi-line text → [Textarea](./textarea.md).
- Single-line input → [Text Field](./text-field.md).

## Anatomy

```
┌────────────────────────────────────────────────────┐
│ ① Font ▾ │ B I U S │ x² x₂ │ • 1. ❝ │ ≡ │ 🔗 🖼 </> │  (toolbar)
├────────────────────────────────────────────────────┤
│ ② Write something awesome…                         │
└────────────────────────────────────────────────────┘
```

1. **Toolbar**: `simple` (formatting tools) or `full` (adds font family, size and style pickers; these are visual placeholders for now).
2. **Writing area**: a `contentEditable` region, 96px minimum height, that grows with content. The placeholder shows while it's empty.

## Variants

| `toolbarSize` | Use for |
|---|---|
| `simple` *(default)* | Comments, short notes |
| `full` | Report authoring |

## States

| `state` | Visual | Behaviour |
|---|---|---|
| `default` | Divider border on `surface-app`; brand border while focused | Editable |
| `error` | `text-error` border, `scale-red-50` bg | `aria-invalid="true"` |
| `disabled` | 40% opacity, toolbar disabled | Not editable, `aria-disabled` |
| Tool pressed | Grey tint + primary icon colour | `aria-pressed="true"`, follows the caret |

## Content guidelines
- The placeholder should suggest the content ("Describe the remediation steps…"), not "Write something awesome…" in production.
- Give it a `label` even when a visible heading is nearby, or point `aria-labelledby` at that heading.

## Do / Don't

| ✅ Do | ❌ Don't |
|---|---|
| Sanitize the HTML from `onChange` before storing or rendering it | Render user HTML with `dangerouslySetInnerHTML` unsanitized |
| Use Textarea when formatting isn't needed | Default to rich text everywhere |

## Accessibility

**Pattern:** [APG — Toolbar](https://www.w3.org/WAI/ARIA/apg/patterns/toolbar/)

| Key | Action |
|---|---|
| `Tab` | Toolbar (one stop) → writing area |
| `←` / `→`, `Home` / `End` | Move between toolbar buttons |
| `Enter` / `Space` | Run the focused tool |
| `⌘B` / `⌘I` / `⌘U` | Native browser formatting shortcuts in the writing area |

- Writing area: `role="textbox"`, `aria-multiline="true"`, named by `label` (or `aria-labelledby`), with `aria-invalid` on error and `aria-disabled` when disabled.
- Toolbar: `role="toolbar"` + `aria-label="Formatting"` with a roving tabindex. Every button has an `aria-label`; toggles (bold, lists, alignment…) expose `aria-pressed`, synced to the caret position.
- Tool buttons keep the editor's selection (`mousedown` doesn't steal focus).
- The font / size / style pickers in the `full` toolbar are visual placeholders and are hidden from assistive tech.

## Design tokens

| Role | Token |
|---|---|
| Border / surface / focus | `snt-border-default` / `snt-surface-app` / `snt-brand-primary-500` |
| Toolbar hover / pressed | `snt-bg-subtle` |
| Icons / placeholder | `snt-text-secondary` (pressed `snt-text-primary`) |
| Text / links | `snt-text-primary` / `snt-text-link` |
| Error | `snt-text-error`, `snt-bg-error-subtle` |

## Design ↔ Code

| Figma property | Prop | Values |
|---|---|---|
| Toolbar | `toolbarSize` | Simple · Full |
| State | `state` | Default · Error · Disabled |

## API

| Component | Prop | Type | Default |
|---|---|---|---|
| `TextSpace` | `toolbarSize` | `"simple" \| "full"` | `"simple"` |
| | `state` | `"default" \| "disabled" \| "error"` | `"default"` (`"enabled"` is a deprecated alias) |
| | `placeholder` | `string` | `"Write something awesome…"` |
| | `label` | `string` | — (falls back to `placeholder`) |
| | `defaultValue` | `string` (HTML) | `""` |
| | `onChange` | `(html: string) => void` | — |
| `TextSpaceToolbar` | `size` | `"simple" \| "full"` | `"simple"` |
| | `disabled` | `boolean` | — |
| | `active` | `Record<string, boolean>` | `{}` |
| | `onCommand` | `() => void` | — |

## Examples

```tsx
<TextSpace
  label="Remediation notes"
  placeholder="Describe the remediation steps…"
  onChange={(html) => setNotes(html)}
/>
```

The output is raw HTML. **Sanitize it** (e.g. DOMPurify) before storing or rendering it anywhere else.

## Known gaps
- [ ] Built on `document.execCommand`, which is deprecated. It's fine today, but move to Tiptap / Lexical before adding mentions, collaborative editing or structured output.
- [ ] It's uncontrolled (`defaultValue`). There's no controlled `value` prop.
- [ ] Link and image tools use `window.prompt`. Replace them with a small popover form.
- [ ] Font family / size / style pickers in the `full` toolbar don't work yet.
- [ ] No helper / error-text API (unlike Textarea).

## Related
- [Textarea](./textarea.md) · [Text Field](./text-field.md)
