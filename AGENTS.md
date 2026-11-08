<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# S4E Design System — rules for agents

This repo is both the **design system** (tokens + components) and the **styleguide site** that documents it. Know which is which before you edit.

## Sources of truth

| What | Where | Notes |
|---|---|---|
| Components | `components/ui/<slug>.tsx` | The real, distributable components. Fix bugs and add features **here**. |
| Tokens | `app/globals.css` | `--s4e-*` CSS variables (light + dark) and the Tailwind `@theme` mapping. |
| Component docs | `docs/components/<slug>.md` | Usage, accessibility, API, known gaps. Update in the same change as the component. |
| Styleguide demos | `sections/<slug>/` | **Not** the components — legacy showcase copies that render the site. Don't copy code from here into product code. |
| Generated files | `public/components/`, `public/tokens/`, `public/svg/`, `public/llms*.txt`, `public/theme.css`, `public/docs/` | Produced by `npm run export`. Never edit by hand. |

## When you change a component

1. Edit `components/ui/<slug>.tsx`.
2. Update `docs/components/<slug>.md` (API table, states, accessibility, known gaps).
3. Run `npm run export` (regenerates the public copies and the AI package) and `npm run lint:ds` — it must pass. (`npm run lint` also covers the styleguide site, which still has pre-existing React-hooks errors.)
4. Add a line to `CHANGELOG.md` under **Unreleased**.

## Styling rules (enforced by `eslint/eslint-plugin-s4e.mjs`; tests in `eslint/eslint-plugin-s4e.test.mjs`)

- **No hard-coded colours.** Use `s4e-*` token utilities (`bg-s4e-surface-app`, `text-s4e-text-secondary`). Hex/rgb literals in class names or styles are lint errors.
- **Semantic tokens first.** Borders → `border-s4e-border-default` / `-strong` / `-focus` / `-error`. Tints → `bg-s4e-bg-subtle`, `bg-s4e-bg-{brand,info,success,warning,error}-subtle`. Focus → `ring-s4e-focus-ring`. Text → `text-s4e-text-*`. Reach for `s4e-scale-*` / `s4e-neutral-*` primitives only when the hue itself is the meaning (severity, data series).
- **States are lowercase** (`state="error"`), colour families are `tone` (not `color`).
- **Accessibility is part of the API.** Icon-only buttons need `aria-label`; form fields need `label`; charts need a takeaway `aria-label`.
- **Deprecated:** `Banner` — use a full-width `Alert` instead.

## Consuming the system from another project

Point the agent at `/llms.txt` (entry point) or `/llms-full.txt` (everything in one file) on the deployed styleguide, and copy the snippet in `docs/components/README.md → For AI agents`.
