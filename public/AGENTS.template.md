# UI: Sentinel Design System

This project's UI is built with the **Sentinel Design System**. Follow these rules for every UI change.

## Before you write UI code

1. Read the rules and component index: https://<your-styleguide-domain>/llms.txt
2. Look up the component you need in the manifest (props, defaults, when to use): https://<your-styleguide-domain>/sentinel-manifest.json
3. If it isn't installed yet, add it from the registry — never hand-write a copy:
   ```bash
   npx shadcn add @sentinel/<name>
   ```
   (`components.json` → `"registries": { "@sentinel": "https://<your-styleguide-domain>/r/{name}.json" }`; the theme is `@sentinel/theme`.)

## Rules

- Use existing components from `components/ui/` before writing new markup. Don't restyle them from scratch.
- No hard-coded colours or font sizes. Use `snt-*` token utilities: `bg-snt-surface-app`, `text-snt-text-secondary`, `border-snt-border-default`, `bg-snt-bg-error-subtle`, `ring-snt-focus-ring`, `text-snt-14`.
- Prefer semantic tokens (`border-*`, `bg-*-subtle`, `text-*`, `surface-*`, `focus-ring`) over `snt-scale-*` primitives; primitives are for severity and data-series colours only.
- States are lowercase (`state="error"`); colour families are `tone`.
- Accessibility is part of the API: `label` on fields, `aria-label` on icon-only buttons, `RadioGroup` and `TabsList`, a takeaway `aria-label` on charts.
- Don't use deprecated components (`Banner` → full-width `Alert`).
- Vulnerability severity is always `SeverityBadge` — never a generic badge.

## Before you finish

Run the linter and fix every `sentinel/*` error. The plugin (`eslint-plugin-sentinel.mjs`, from https://<your-styleguide-domain>/eslint-plugin-sentinel.mjs) is configured in `eslint.config.mjs` with `sentinel.configs.recommended`.
