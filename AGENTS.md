<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Sentinel Design System — rules for agents

This repo is both the **design system** (tokens + components) and the **styleguide site** that documents it. Know which is which before you edit.

## Sources of truth

| What | Where | Notes |
|---|---|---|
| Components | `components/ui/<slug>.tsx` | The real, distributable components. Fix bugs and add features **here**. |
| Tokens | `app/globals.css` | `--snt-*` CSS variables (light + dark) and the Tailwind `@theme` mapping. |
| Component docs | `docs/components/<slug>.md` | Usage, accessibility, API, known gaps. Update in the same change as the component. |
| Styleguide demos | `sections/<slug>/` | Page layouts that render `components/ui` (thin wrappers map demo props onto the real API). Fix component bugs in `components/ui`, not here. |
| Generated files | `public/components/`, `public/tokens/`, `public/llms*.txt`, `public/theme.css`, `public/docs/`, `public/r/`, `public/sentinel-manifest.json`, `public/AGENTS.template.md`, `registry.json` | Produced by `npm run export`. Never edit by hand. |

## When you change a component

1. Edit `components/ui/<slug>.tsx`.
2. Update `docs/components/<slug>.md` (API table, states, accessibility, known gaps).
3. Run `npm run export` (regenerates the public copies and the AI package) and `npm run lint:ds` — it must pass. (`npm run lint` also covers the styleguide site, which still has pre-existing React-hooks errors.)
4. Add a line to `CHANGELOG.md` under **Unreleased**.

## Styling rules (enforced by `eslint/eslint-plugin-sentinel.mjs`; tests in `eslint/eslint-plugin-sentinel.test.mjs`)

- **No hard-coded colours or font sizes.** Use `snt-*` token utilities (`bg-snt-surface-app`, `text-snt-text-secondary`) and the type scale `text-snt-{10,11,12,14,16,18,20,24,32,48}`. Hex/rgb literals are lint errors; `text-[13px]` is a warning.
- **`cn()` knows the type scale.** `lib/utils.ts` teaches tailwind-merge that `text-snt-<n>` is a font size — keep that config if you touch `cn()`, or font sizes get dropped next to `text-snt-text-*` colours.
- **Semantic tokens first.** Borders → `border-snt-border-default` / `-strong` / `-focus` / `-error`. Tints → `bg-snt-bg-subtle`, `bg-snt-bg-{brand,info,success,warning,error}-subtle`. Focus → `ring-snt-focus-ring`. Text → `text-snt-text-*`. Reach for `snt-scale-*` / `snt-neutral-*` primitives only when the hue itself is the meaning (severity, data series).
- **States are lowercase** (`state="error"`), colour families are `tone` (not `color`).
- **Accessibility is part of the API.** Icon-only buttons need `aria-label`; form fields need `label`; charts need a takeaway `aria-label`.
- **Deprecated:** `Banner` — use a full-width `Alert` instead.

## Consuming the system from another project

Point the agent at `/llms.txt` (entry point) or `/llms-full.txt` (everything in one file) on the deployed styleguide, and copy the snippet in `docs/components/README.md → For AI agents`.
