# Sentinel Component Docs

One Markdown file per component, written for **both designers and developers**.
The styleguide site (`/styleguide/<slug>`) is the visual playground; these files are
the reviewable, versioned source of truth that lives next to the code and changes
in the same pull request as the component.

## Why this format

The structure is distilled from the code-backed design systems that are widely
regarded as the best documented:

| System | What we borrowed |
|---|---|
| [Carbon (IBM)](https://carbondesignsystem.com/components/button/usage/) | Mandatory **Usage · Style · Code · Accessibility** coverage for every component; *when to use / when not to use*; anatomy; universal behaviours; a [documentation template](https://carbondesignsystem.com/contributing/documentation/) for contributors. |
| [Primer (GitHub)](https://primer.style/product/components/button/) | **Implementation status** per platform with links to source, Storybook and Figma; props table with type + default; explicit stance on discouraged props (e.g. `disabled`). |
| [Atlassian Design System](https://atlassian.design/components/button/usage) | **Parts** diagram, short opinionated best-practice rules ("use one primary call to action", "buttons for actions, links for navigation"), **content guidelines** (sentence case, verb + noun labels), "avoid disabling buttons", "never put tooltips on disabled buttons". |
| [WAI-ARIA Authoring Practices (W3C)](https://www.w3.org/WAI/ARIA/apg/patterns/) | Each interactive component links to its **APG pattern** and lists the expected keyboard interaction and ARIA roles / states. |
| Docs-as-code systems ([Sprout](https://design.sprout.ph/en/guide/contributing/component-documentation.html), [Abyss](https://abyss.uhc.com/web/developers/contributors/documentation-guide)) | One Markdown file per component, kept in the repo, with front-matter metadata and a hand-maintained props table. |

Shared principles we follow, regardless of source:

1. **Same template on every page** — readers learn the layout once and can scan.
2. **One concern per section** — usage, anatomy, states, a11y, tokens, API never mix.
3. **Design ↔ Code mapping** — every Figma property maps 1:1 to a prop, so a spec can be implemented without translation.
4. **Interlink** — tokens, related components, APG pattern, source file, Figma.
5. **Honesty about gaps** — each page has a *Known gaps* list so nobody assumes behaviour that isn't built.

## For AI agents

`npm run llms` (also part of `npm run build`) turns these docs into an AI package served from the site root:

| File | What it is |
|---|---|
| `/llms.txt` | Entry point: rules for agents, setup, links to every doc and source file |
| `/llms-full.txt` | Everything in one file: rules, setup, theme CSS, each doc + source (~68k tokens) |
| `/theme.css` | Install-ready tokens (light + dark) and the Tailwind v4 `@theme` mapping |
| `/docs/components/<slug>.md` | These docs, as served files |
| `/sentinel-manifest.json` | Machine-readable manifest: props (types + defaults, from the TS source), status, when to use, tokens, install command |
| `/r/<name>.json` | shadcn registry items — `npx shadcn add @sentinel/<name>` (`npm run registry`) |
| `/AGENTS.template.md` | Rules file for consumer repos (source: `docs/consumer/AGENTS.md`) |

Give an agent the deployed `/llms.txt` URL (or attach `llms-full.txt`) and tell it to follow the rules at the top.

## Lint guardrails

`eslint/eslint-plugin-sentinel.mjs` turns the most common mistakes — by humans or AI — into lint errors. It runs on `components/ui` via `npm run lint:ds` and ships to consumers at `/eslint-plugin-sentinel.mjs`.

| Rule | Level | Catches |
|---|---|---|
| `sentinel/no-hardcoded-colors` | error | `#1383d4`, `rgb(…)`, `bg-red-500`, `bg-[#fff]` instead of `snt-*` tokens |
| `sentinel/icon-only-needs-label` | error | `<Button iconOnly>` without `aria-label` |
| `sentinel/prefer-semantic-tokens` | warn, autofix | `border-snt-neutral-divider-10` → `border-snt-border-default` (and other unambiguous aliases) |
| `sentinel/no-deprecated-components` | warn | importing `Banner` |
| `sentinel/no-arbitrary-values` | warn | `text-[13px]`, `p-[7px]`, `gap-[5px]` — typography and spacing only |

## Semantic tokens

Prefer role-based aliases over scale primitives. They resolve per theme, including nested `[data-snt-theme]` subtrees.

| Role | Token |
|---|---|
| Borders | `snt-border-default` · `snt-border-strong` · `snt-border-focus` · `snt-border-error` |
| Tints | `snt-bg-subtle` · `snt-bg-{brand,info,success,warning,error}-subtle` |
| Focus | `snt-focus-ring` · `snt-focus-ring-error` |
| Text | `snt-text-{primary,secondary,disabled,link,brand,success,warning,error,info,on-accent,inverse}` |
| Surfaces | `snt-surface-{app,page,row,row-hover,table-header}` |
| Font size | `text-snt-{10,11,12,14,16,18,20,24,32,48}` (px; same numbers as the Figma text styles) |

Use `snt-scale-*` / `snt-neutral-*` primitives only where the hue is the meaning (severity, data series).

## Template

New component? Copy [`_template.md`](./_template.md). Every section is required;
write "N/A" with a reason rather than deleting a section.

## Index

| Component | Category | Status | Doc |
|---|---|---|---|
| Button | Atom | stable | [button.md](./button.md) |
| Text Field | Atom | stable | [text-field.md](./text-field.md) |
| Textarea | Atom | stable | [textarea.md](./textarea.md) |
| Checkbox | Atom | beta | [checkbox.md](./checkbox.md) |
| Select | Atom | beta | [select.md](./select.md) |
| Severity Badge | Atom | stable | [severity-badge.md](./severity-badge.md) |
| Switch · Radio | Atom | stable | [switch-radio.md](./switch-radio.md) |
| Toast · Tooltip | Atom | stable | [toast-tooltip.md](./toast-tooltip.md) |
| Badge · Tag | Atom | stable | [badge-tag.md](./badge-tag.md) |
| Alert | Atom | stable | [alert.md](./alert.md) |
| Banner | Atom | deprecated | [banner.md](./banner.md) |
| Spinner | Atom | alpha | [spinner.md](./spinner.md) |
| Skeleton | Atom | beta | [skeleton.md](./skeleton.md) |
| Search Bar | Molecule | stable | [search-bar.md](./search-bar.md) |
| Tabs | Molecule | stable | [tabs.md](./tabs.md) |
| Breadcrumb | Molecule | stable | [breadcrumb.md](./breadcrumb.md) |
| Filter Bar | Molecule | stable | [filter-bar.md](./filter-bar.md) |
| Text Space | Organism | stable | [text-space.md](./text-space.md) |
| Data Table | Organism | stable | [data-table.md](./data-table.md) |
| Cards | Organism | stable | [cards.md](./cards.md) |
| Chart | Organism | stable | [chart.md](./chart.md) |
| Modal | Organism | stable | [modal.md](./modal.md) |
| Empty State | Organism | stable | [empty-state.md](./empty-state.md) |
| Gauge | Organism | stable | [gauge.md](./gauge.md) |

`Sidebar` and `Top Bar` are the styleguide's own chrome and are not distributed, so
they have no component doc.

## Status definitions

| Status | Meaning for designers | Meaning for developers |
|---|---|---|
| **alpha** | Exploratory; may change visually without notice. Don't use in shipped designs. | API may break in any release. |
| **beta** | Visually settled, gaps remain (see *Known gaps*). OK for new work. | API is stable-ish; breaking changes are called out in the CHANGELOG. |
| **stable** | Safe default. | Semver applies — breaking changes only in a major release. |
| **deprecated** | Don't use in new designs. Follow the migration note. | Will be removed in the next major. Migrate. |

## Gaps roll-up

The first docs pass found 9 components that broke WCAG 2.2 AA or the APG keyboard model.
**All 9 are fixed** (see `CHANGELOG.md` → Unreleased): Tabs, Radio, Tooltip, Toast, Checkbox,
Filter Bar, Data Table, Chart and Text Space.

The remaining *Known gaps* on each page are missing features, token debt and API
consistency issues, not accessibility blockers. The most impactful next ones:

| Component | Gap |
|---|---|
| [Data Table](./data-table.md) | Fixed threat schema; no sorting / selection / generic columns |
| [Select](./select.md) | No native form participation (`name` / hidden input); no option groups |
| [Tooltip](./toast-tooltip.md) | Doesn't flip at the viewport edge |
| [Text Space](./text-space.md) | Built on `execCommand`; move to an editor engine before adding mentions or collaboration |

Fixed since the last pass: Select clipping/flip, Modal `inert`, Button `loading` label, the two Card primitives, the Toast manager and its intent colours.

## Keeping docs in sync

- A PR that changes a component's props, states, tokens or behaviour **must** update its doc in the same PR.
- The **API** table mirrors the TypeScript interface in `components/ui/<slug>.tsx`.
- The **Design tokens** table lists only `snt-*` tokens the component actually uses; run
  `grep -oE '(bg|text|border|ring)-snt-[a-z0-9-]+' components/ui/<slug>.tsx | sort -u` to check.
- Close an item in *Known gaps* by deleting it and noting the fix in `CHANGELOG.md`.
