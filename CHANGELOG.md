# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

- The site opens on Get started → Introduction: `/` redirects there and the logo and breadcrumb root link straight to it. The separate landing page was removed.

- Favicon, SVG icon and Apple touch icon are the Ladan Sojudi portfolio mark (from ladan-sojudi.vercel.app).

### Changed — Severity badge redesign

- Severity badge is now a signal-bar badge: four bars filled to the level (Critical 4 … Low 1, Info a ring) on a neutral surface with a hairline ring, label always written out, optional mono score. Uses the `snt-severity-*` tokens shared with charts. New `size` prop (sm 24px / md 28px); width follows the label instead of a fixed 160px. No "use client". API otherwise unchanged.
- The new look is used everywhere severity appears: Data table rows render `SeverityBadge` (and now accept all five levels, not just high / critical), CVSS score shows the signal bars next to the score, and the Modal, Data table, Severity badge and dashboard mocks use the real component. Registry items now list the components they import (Data table, CVSS score → Severity badge), so `shadcn add` installs them together.

### Fixed — component pages checked against the code

- Code tab → API reference is generated from the manifest (props, types and defaults extracted from components/ui), with the usage snippet and known gaps from each doc. The old hand-written reference (wrong package, props and sizes on most pages) is gone, except reviewed gotchas.
- Specs → Properties is generated from the same source; 15 pages listed props that don't exist.
- Code examples rewritten to the real APIs: Breadcrumb (`BreadcrumbItem isCurrent`), Filter bar (`FilterSearch`, `FilterAction`, `FilterClear`, `FilterOverflow`), Modal (`onOpenChange` + Modal parts), Data table (composable parts), Text space (`toolbarSize`).
- All 92 code examples (page Code tabs and docs) compile against the real components; the Toast doc example became a proper component.
- Colour tables now name the tokens each component's code actually uses (110 entries moved from old primitives to semantic tokens); rows for states or parts a component doesn't have were removed (Text field / Textarea hover, Modal icon and footer colours).
- Sizing tables corrected against the code: Checkbox 18px, Switch track 36×22, Modal widths 384 / 448 / 672 and radius 14px, radii updated after the crisp refresh, Gauge 170px, Text space writing area 96px.
- Usage text no longer describes variants that don't exist (Gauge, Modal); tooltip delay stated as the real 300ms.
- Badge is exactly 24px and Severity badge 32px tall, matching their specs; Text field sizing table describes filled / outlined (it has no size prop); badge border and modal backdrop token names fixed.

### Changed — crisp visual refresh

- Radius scale is now 6 / 8 / 10 / 14px (sm / md / lg / xl), from 4.8 / 6 / 8.4.
- New shadow tokens `--snt-shadow-control` (inputs, outline buttons) and `--snt-shadow-raised` (solid buttons, with a top highlight), light and dark.
- Buttons press down 1px (not with reduced motion); outline buttons sit on `surface-app`. Cards, charts and data tables get `shadow-snt-xs`. Tinted badges and security chips get a 1px inner ring in their text colour.
- Applied across the rest: Textarea, Text space, Checkbox, Filter bar (bar, pills, search) and Empty state actions use the control / raised shadows; Toast `shadow-snt-lg`, Modal `shadow-snt-2xl`, Switch thumb `shadow-snt-sm`; Alert radius lg; the active pill tab gets a hairline ring.

### Added — security components and density

- New **Security** group: Severity bar, CVSS score (with vector breakdown, `cvssRating`, `parseCvssVector`), CVE tag (KEV + EPSS), Finding status, Indicator (IOC with verdict, copy and `defang`), Masked value, Scan progress. New Activity timeline in Data display. All beta, with docs and registry items.
- Component pages use a four-tab template — Usage · Specs · Code · Accessibility — with live contrast tables computed from the tokens. Button is migrated; older pages keep Design / Dev until they are reviewed.
- Every component page now uses the four-tab template. Older pages get their Accessibility tab from the docs (`docs/components/<slug>.md` → Accessibility, rendered by `DocA11y`), and the breadcrumb reads Components. Sidebar and Top bar (no code component yet) keep a single view.
- Compact density: `data-snt-density="compact"` on any container tightens Button, Select, SearchBar, TextField, FilterBar and DataTable.
- Patterns is hidden from the nav until there are enough security patterns; the home page shows Accessibility in its place.

### Changed — site structure, modelled on Carbon, Atlassian and Primer

- New home page (`/`): hero with Start designing / Start developing, live product shot, building-block cards, designer and developer paths, Built for AI, footer.
- Global header with Get started · Foundations · Components · Patterns, search (⌘K), Figma, GitHub and a theme toggle. The sidebar now lists only the current section; on mobile it is a drawer that also carries the sections.
- Components are grouped by what they do (Actions, Forms, Feedback, Data display, Navigation, Overlays) instead of atoms / molecules / organisms, and get an index page with live thumbnails.
- Get started → Introduction is now a setup guide for designers (Figma), developers (shadcn registry install) and AI agents (llms.txt), with commands that use the site's real address.

### Changed — Button, fully reviewed

- `intent="default"` is now `intent="neutral"` (the old name still works as a deprecated alias), so the default intent (`primary`) no longer reads like a different value.
- Neutral buttons use the brand focus ring; the grey rings fell below the 3:1 contrast a focus indicator needs.
- Loading keeps the button focusable (`aria-disabled` + `aria-busy`), drops `onClick` and stops a submit button from submitting, instead of `disabled` (which threw keyboard focus away).
- Icons passed as children are sized by the button (14 / 16 / 20px).
- Button page rewritten: examples render the real component, Usage has a "which button" table and Do's and don'ts (Anatomy dropped — nothing a button's parts need explaining), Specs values match the code, colour tables read hex from the live tokens, Dev examples compile as pasted, API reference matches the props. Removed the Button group demo (no such component) and the Swift / Android snippets (no such libraries).
- Removed the "copy as SVG" feature and `public/svg/` (its colours were a stale copy of the old palette). Designers use the Figma library; the copy-code chip now shows in Dev view only.
- Button Specs (Properties, Sizing, Color tokens) is closed by default behind "Show specs", next to an Open in Figma link — designers build from the Figma library.
- Styleguide: `?view=dev` links open in Dev view again; the app shell is now the positioning context, so screen-reader-only text can no longer make the window scroll.

### Changed — styleguide reading order

- Component pages read as a two-level outline: Examples, Usage (When to use, Do's and don'ts) and Specs (Anatomy, Properties, Sizing, Color tokens), with real h2/h3 headings and a nested "On this page" list.
- Dev view runs Installation (shadcn CLI or manual source) → Examples → API reference.
- Calmer Do/Don't cards; leftover Turkish label on the Colors page translated.

### Changed — one source for site and package

- **Styleguide demos render the shipped components.** Every atom and organism showcase in `sections/` now uses `components/ui` (thin wrappers map demo props onto the real API) instead of hand-copied look-alikes. The site can no longer show something the package doesn't ship — this surfaced and removed stale copies (e.g. a Badge copy chip that emitted `<BadgeTag color>`, now `<Badge tone>`).
- **Tabs** gain `variant="pill"` (segmented control) and a `count` chip on `TabsTrigger` — the showcase already displayed both.
- **Cards**: generic `Card`, `CardHeader`, `CardTitle` (`as` h2–h4), `CardDescription`, `CardContent`, `CardFooter`; InsightCard / AlertCard are built on it, titles are real headings (`headingLevel`). The unused shadcn `card.tsx` is removed.
- **Toast**: `ToastProvider` + `useToast()` — stacked bottom-right, auto-dismiss (4s, failures 8s), pause on hover/focus, max 3. Intent colours fixed: `alert` is red (`feedback-alert`), `warning` amber (`feedback-warning`).

### Fixed — component gaps

- **Select** listbox is portalled to `<body>` and placed with collision handling (opens upward near the viewport bottom, follows scroll/resize, carries a nested `data-snt-theme`) — no more clipping inside `overflow: hidden` parents.
- **Modal** marks every other top-level element `inert` while open.
- **Button** `loading` keeps the label in place (no width jump, still read by screen readers) under the spinner and sets `aria-busy`.
- **Lint is clean repo-wide** (`npm run lint`: 0 errors, 0 warnings): effect-driven state replaced with `useSyncExternalStore` / event handlers (sidebar groups, view mode, command palette, install panel), a render-time mutation in the chart demo, and dead code (unused `ThemeToggle`, unused demo helpers).

### Changed — rebrand to Sentinel

- **Sentinel Design System** — now an open design system for cybersecurity products, no longer tied to one product. Every token, utility and theme attribute now uses the `snt` prefix (`--snt-*`, `bg-snt-surface-app`, `data-snt-theme`); the lint plugin is `eslint-plugin-sentinel` (`sentinel/*` rules); registry items are `@sentinel/<name>` (`@sentinel/theme`, `@sentinel/utils`); the manifest is `/sentinel-manifest.json`. Product-specific copy and sample data (domains, platform names) replaced with generic examples.
- **Minimal, corporate visual refresh** — indigo accent (brand 500 darkened to #5b5bd6 for 5.4:1 text contrast), zinc neutrals, quieter surfaces; `border-strong` now maps to `neutral-grey-400`, tuned to ≥3:1 so input and outline-button borders meet WCAG 1.4.11 in both themes. Site typeface Geist + Geist Mono (was Inter + IBM Plex Mono). Neutral hero bands, pill-style sidebar selection with `aria-current`, hidden TOC markers, and a Sentinel shield mark.

### Added

- **Overview page** (`/styleguide/overview`, also `/`) — portfolio-style landing: hero with a live product shot built from the real components, system stats counted from source (components, tokens), Figma / React / AI pillars, and a browsable index. New **Get started** nav group.
- **Built for AI page** (`/styleguide/ai`) — the AI package, shadcn install, lint guardrails.
- **shadcn registry** (`npm run registry`, part of `npm run export`): `registry.json` → `public/r/*.json` via `shadcn build`. `npx shadcn add @sentinel/<name>` installs a component with its theme (`snt-theme`) and `cn()` (`snt-utils`). Verified with a dry-run install into a clean project.
- **Component manifest** `public/sentinel-manifest.json` — props with resolved union types, defaults and deprecations extracted from the TypeScript source, plus status, when to use / not, tokens and install command.
- **Consumer `AGENTS.md` template** (`docs/consumer/AGENTS.md` → `/AGENTS.template.md`).
- **Type scale tokens** `--snt-font-size-{10…48}` → `text-snt-<px>` utilities; all `text-[Npx]` / `text-sm` in `components/ui` migrated. `sentinel/no-arbitrary-values` now covers typography + spacing and is on for `components/ui`.
- **`buttonVariants()`** — Button classes for links (`<Link className={buttonVariants(…)}>`).
- **Open in Figma** links to the real library page for each component (`components/styleguide/figma-data.ts`); docs front-matter `figma:` filled in.

- **Semantic token aliases** in `app/globals.css`: `border-default/strong/focus/error`, `bg-subtle`, `bg-{brand,info,success,warning,error}-subtle`, `focus-ring`, `focus-ring-error` (+ Tailwind utilities). Declared on `:root`, `.dark` and every `[data-snt-theme]` root so nested theme subtrees resolve correctly (this also fixes `--snt-text-brand` inside nested dark previews). 122 primitive usages in `components/ui` migrated to them.
- **`eslint-plugin-sentinel`** (`eslint/`): `no-hardcoded-colors`, `icon-only-needs-label`, `prefer-semantic-tokens` (autofix), `no-deprecated-components`, `no-arbitrary-values`, with RuleTester tests. New `npm run lint:ds` (design-system scope, must pass). Shipped to consumers as `/eslint-plugin-sentinel.mjs` and referenced from `llms.txt`.
- **Root `AGENTS.md` design-system section** — which folder is the source of truth (`components/ui`, not `sections/`), what to update together, and the styling rules.

- **AI package** (`npm run llms`, part of `prebuild`) — makes the system usable by LLMs and coding agents, following the [llms.txt](https://llmstxt.org) convention:
  - `public/llms.txt` — entry point: rules for agents, setup, and a link to every component doc and source file.
  - `public/llms-full.txt` — everything in one file (~68k tokens): rules, setup, theme CSS, and every component doc followed by its source.
  - `public/theme.css` — install-ready tokens for **light and dark** plus the Tailwind v4 `@theme` mapping, extracted from `app/globals.css` without the styleguide-only rules. Verified by compiling it in a clean Tailwind v4 setup against all 24 components (every `snt-*` utility resolves).
  - `public/docs/components/<slug>.md` — the component docs, served alongside the source. Set `SITE_URL` at build time for absolute links.

- **Component docs in the repo** — `docs/components/<slug>.md` for all 24 distributable components, plus a shared `_template.md` and an index. One template for designers and developers, modelled on Carbon, Primer, Atlassian and the WAI-ARIA APG: when to use / not, anatomy, variants, sizes, states, content guidelines, do / don't, accessibility (keyboard + ARIA), design tokens, a Figma property ↔ prop mapping, API, examples, and an honest *Known gaps* list with a high-priority roll-up.

### Changed

- Site branded **Sentinel Design System** (sidebar, breadcrumbs, page titles, metadata). `/` and `/styleguide` open the Overview instead of Colors.
- Empty State `md` title moved from 15px to the 16px scale step.

- **Consistent prop naming** (old names still work, marked `@deprecated`): `Select` states are lowercase (`"error"`, was `"Error"`); `Badge`/`Tag` use `tone` (was `color`); `TextSpace` default state is `"default"` (was `"enabled"`).
- **Error text and borders** in form controls now use `text-snt-text-error` / `border-snt-border-error` instead of `scale-red-600` — slightly brighter red, same AA contrast.

### Fixed

- **`cn()` dropped font sizes** next to colour classes: tailwind-merge treated `text-snt-<n>` as a colour. `lib/utils.ts` now registers the type scale as a font-size group (also shipped as the `snt-utils` registry item).
- **Switch thumb** rendered outside its track (missing `left-0`).
- **Button** no longer declares `"use client"` (no hooks) — usable in Server Components, and `buttonVariants()` works on the server.

- Empty `interface X extends Y {}` props in Breadcrumb, Data Table, Filter Bar and Modal replaced with type aliases (8 lint errors).
- `scripts/*.js` are linted as Node CommonJS (no more `no-require-imports` errors).

- **Accessibility (WCAG 2.2 AA) pass on the distributable components** in `components/ui/`:
  - **TextField / Textarea** — labels are real `<label htmlFor>` elements tied to the field via `useId`; helper / error text is wired with `aria-describedby`, errors set `aria-invalid`. TextField now reacts to real keyboard focus (label colour, border, floating label) — the `state` prop only forces a visual state.
  - **Select** — select-only combobox pattern: label association, `aria-activedescendant`, Arrow / Home / End / Enter / Space / Escape / Tab and type-ahead; disabled options are skipped; visible `focus-visible` ring.
  - **Modal** — `role="dialog"` moved onto the panel and labelled / described by `ModalTitle` / `ModalDescription` automatically; Tab focus trap, initial focus (honours `data-autofocus`), focus restore on close, body scroll lock; close button gets `aria-label`.
  - **Contrast** — secondary copy (helper text, descriptions, table headers, chart axes, icon buttons) moved from `text-disabled` (2.27:1 on white) to `text-secondary` (5.07:1). `text-disabled` is now reserved for genuinely disabled controls. 10.5px helper text bumped to 11px.
- **WCAG / APG fixes from the component docs pass**:
  - **Tabs** — APG keyboard model: roving tabindex, ← → Home End with automatic activation; triggers and panels linked with `aria-controls` / `aria-labelledby`.
  - **RadioGroup** — roving tabindex (the checked radio is the single Tab stop) and arrow-key selection.
  - **Tooltip** — now a real tooltip: shows on hover (300ms `delay`) and on keyboard focus, hides on Escape / blur / mouse leave, `role="tooltip"`, and `aria-describedby` is merged onto the trigger. New `open` prop forces visibility for docs.
  - **Toast** — live region: `role="status"` (polite), or `role="alert"` (assertive) for `intent="alert"`.
  - **Checkbox** — `indeterminate` is set on the native input, so it's announced as "mixed"; `description` is wired with `aria-describedby`; an id is generated when none is passed.
  - **FilterPill** — the clear ✕ is now a sibling button, not nested inside the pill button. `className` now styles the pill container. `FilterAction iconOnly` gets an `aria-label`.
  - **Data Table** — ARIA table roles (`table`, `row`, `columnheader`, `cell`), with the table named by the header title. Info icons in headers are focusable buttons with keyboard tooltips. Pagination is a labelled `navigation` with "Previous page" / "Next page". The copy is now "Rows per page".
  - **Chart** — Donut, Bar, Line and Treemap render as `role="img"` with an auto-generated data summary; pass `aria-label` to override it with the takeaway.
  - **Text Space** — now editable (`contentEditable`, `role="textbox"`, `aria-multiline`), with `label`, `defaultValue` and `onChange(html)`. The toolbar is an APG toolbar (roving tabindex, `aria-label` on every tool, `aria-pressed` on toggles) and its tools actually format text.
- **Badge / Tag outlined border** used `snt-scale-*-300` tokens that don't exist (the scale has no 300 step), so outlined badges had no coloured border. `components/ui/badge-tag.tsx` now uses `-200`. The styleguide showcase copy still has the old classes.
- **Reduced motion** — global `prefers-reduced-motion: reduce` rule disables animations and transitions.

## [1.3.1] — 2026-06-05

### Changed

- **View mode is now URL-driven** — the Design / Dev toggle is reflected in the URL (`?view=dev`), so a chosen mode is shareable, bookmarkable and survives a reload. Implemented with the native History API + `usePathname` instead of `useSearchParams`, so every styleguide page stays statically prerendered (no Suspense bailout / client-side rendering).

## [1.3.0] — 2026-06-05

### Added

- **Real syntax highlighting in Dev mode** — every code block now renders through [Shiki](https://shiki.style) with the VS Code "Dark+" theme (pure-JS engine, no WASM shipped to the client). One shared `<HighlightedCode>` component replaces the five hand-rolled regex highlighters that used to live in Installation, example cards, theming, token export and developer notes.
- **On-this-page TOC** — a sticky "On this page" panel on the right of every component / foundation page (wide screens). Auto-built from each page's section headings via a runtime DOM scan, with an `IntersectionObserver` scrollspy. Works in both Design and Dev mode — a `MutationObserver` re-scans when the view-mode content swaps or async panels (Installation / Developer Notes) finish loading.
- **Hero band** — full-width, faintly brand-tinted header band wrapping the breadcrumb, title, description and page tabs, closed by a full-width divider at the tab baseline. New `<PageHero>` (with a `fluid` option for full-width pages like Dashboard) and `<PageBody>` (content + TOC column) layout primitives, rolled out across all 40 pages.
- **Sidebar status markers** — non-stable nav items now show a small colored dot + label (alpha / beta / deprecated); the PATTERNS group is flagged `alpha` at the section level.
- **"Open in Figma"** — a quiet, in-progress action in every page header's breadcrumb row (disabled placeholder until the Figma files land).

### Changed

- **Top bar** — subtle elevated tint + backdrop blur + soft shadow so the header reads as a distinct bar.
- Dev-mode **Installation / Developer Notes** panels now render inside the page content column (under the same on-this-page TOC) instead of below the whole page.

### Removed

- The five inline regex syntax highlighters, superseded by Shiki.

## [1.2.0] — 2026-06-02

### Added

- **Design / Dev view mode** on every component page — top tab toggle (underline-style) splits each page into a Designer view (visual showcases, anatomy, specs, use cases, guidelines) and a Developer view (per-variant shadcn-style preview + code cards, installation, dev notes). Mode persists per browser session via a global `ViewModeProvider`.
- **Per-component Specs handbook** in Design mode — 24 component pages now have a designer-facing handbook with Instance properties (designer-facing component props with visual swatches), Sizing & spacing (Figma-style annotated SpacingDiagram + per-size dimensions table), and Color tokens (tabbed per intent/group with hex + token name + role).
- **Atlassian-style page header** — breadcrumb (`Design System / <Category> / <Component>`), 28–32px title, subtle status badge with matching border tint, 15px description capped at 640px max-width. Replaces the compact header on every page.
- **Command palette** (`⌘K` / `Ctrl+K`) in the top bar — Atlassian-style two-column modal with grouped results on the left + category quick-jump on the right. Keyboard nav (↑↓ Enter Esc), hover-to-highlight category, instant filter as you type.
- **Collapsible sidebar groups** — FOUNDATIONS / ATOMS / MOLECULES / ORGANISMS / PATTERNS each expand and collapse independently; the group containing the active page auto-opens; state persists in localStorage.
- **Per-component example cards** (shadcn-style) — every page's Dev mode now renders the variants as separate cards with rendered preview + JSX + Copy. Shared `<ExampleCard>` (header / preview / code) used across all 24 components.
- **SVG export for 7 atoms** — Button (9), Badge/Tag (12), Severity Badge (5), Spinner (3), Skeleton (3), Checkbox (3), Switch (2). Designer mode chip now copies SVG markup instead of JSX; pasting into Figma yields editable vector layers (rect + text). Generated by `scripts/export-svg.js`, served from `public/svg/<slug>/<variant>.svg`.
- **Foundations spacing pass** — all 11 Foundations pages (Theming, Colors, Typography, Spacing, Shadow, Icons, Layout, Principles, Accessibility, Contribution, Component Status) adopted the new Atlassian-style hero → 48–64px → content rhythm.
- **`ColorTokenTabs`** — shared underline-tabbed component for the Color tokens section; matches the top-level Design / Dev tab style. Single-group falls back to a plain table.

### Changed

- **Buttons sm gap** dropped from 6px to 4px to fit the 4-step spacing scale (4 / 8 / 12 / 16 / 20 / 24).
- **All component specs** snap to the 4-grid scale — heights, paddings, gaps, and radii are rounded to {4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48}.
- **Hero → tabs spacing** widened from 32px to 48–64px (matching Atlassian); tabs → content stays at 32–40px. Two-altitude rhythm: hero is its own moment, tabs+content sit together.
- **Footer cleanup** in InstallationTabs — internal links now use Next `<Link>` (SPA navigation) instead of plain `<a>`, fixing browser-back from external routes leaving the panel wedged in a stale state.

### Removed

- Top inner-padding badges on the SpacingDiagram (cleaner; only width / height / inner-X / inner-Y annotations remain).

### Added

- **Copy chips** on 13 component variants (Button + 12 atoms · 151 cells total). Hover-revealed chips emit the React JSX for the exact variant. Per-platform snippets (Swift / Android XML) are generated and retained in the source for future re-enablement, but the global platform toggle was removed in pre-release to align with shadcn's React-first philosophy — see Changed.
- **Installation panel** on every component page. Two tabs:
  - **CLI** — `npx @sentinel/ui add <name>` (aspirational placeholder).
  - **Manual** — full syntax-highlighted source code with Copy and Download.
- **Standalone copy-paste-ready components** at `components/ui/<slug>.tsx` for 13 atoms + 4 molecules + 7 organisms (24 components total). Dependency-light (`react` + `cn` + optional `lucide-react`), `forwardRef`'d, matches the chip-snippet API contract. Exceptions, all clearly noted in the per-file header:
  - `Tabs` uses `@base-ui/react` for accessibility / keyboard / aria handling.
  - `Modal` uses `react-dom`'s `createPortal` (built-in).
  - All other components: zero third-party deps beyond `lucide-react` icons.
- **Organism coverage**: Cards (InsightCard / AlertCard), Empty State, Text Space (+ Toolbar), Gauge, Data Table (composable: Header / Body / ColumnHeaders / Row / Footer), Modal (composable: Header / Title / Description / Body / Footer), Chart (ChartCard, StatBlock, DonutChart, DonutLegend, BarChart, LineChart, TreemapChart — each chart kind is raw SVG, no recharts dependency).
- **Site-chrome organisms** intentionally skipped from Installation: `Sidebar` and `Top Bar` are this styleguide's own chrome, not portable.
- **Component source export pipeline** (`scripts/export-components.js`) — copies `components/ui/*.tsx` to `public/components/<slug>.tsx.txt` at build time. Wired into `prebuild`.
- **Theming** page at `/styleguide/theming` — single source of truth for tokens. Explains the `--snt-<category>-<role>-<scale>` convention, the `[data-snt-theme]` light/dark wiring, the three flavors of tokens (semantic theme-aware / static / scale primitives), how to customize, a live side-by-side light + dark preview, AND the install-once panel with the complete token bundle (~141 tokens) per platform (CSS / Swift / XML). Component pages link here from the Installation footer.
- **Master token bundle** at `public/tokens/_all/tokens.{css,swift,xml}` — every color + spacing + radius + border + font + focus ring, in one file per platform.
- **Token Export expansion** — now includes radius, border-width, font-size, font-weight, focus-ring (width + offset) in addition to colors and spacing. Emitted across CSS / Swift / Android XML.
- **TSX / JSX syntax highlighter** for the Installation Manual panel. Line-by-line, mirrors the existing CSS / Swift / XML highlighter style.
- **Dynamic import-line derivation** in the Installation panel — parses `export const X` from the source code; no hardcoded slug → export mapping.
- **Spacing scale** extended with `space-9` (36px), `space-10` (40px), `space-11` (44px) to cover button heights.
- **`CHANGELOG.md`** + release discipline.

### Changed

- **Button component** rewritten in Tailwind/shadcn style: 3 intents (`default` / `primary` / `destructive`) × 3 variants (`solid` / `outline` / `ghost`) × 3 sizes (`sm` / `md` / `lg`). Replaced static `btn-*` tokens with theme-aware semantic tokens (`text-link`, `text-error`) in outline and ghost so dark mode renders correctly.
- **Token export → install-once model** (shadcn-style). The per-component Token Export panel was removed from every component page; tokens now live on the Theming page so developers install them once per project, not once per component. The per-component files at `public/tokens/<slug>/tokens.*` are still generated but no longer surfaced in the UI.
- **`TokenExportTabs`** now accepts optional `slugOverride`, `title`, `badge`, and `intro` props so the same component can power the install-once panel on Theming.
- **React-first scope**. The `[React TSX] [Swift iOS] [Android XML]` toggle was removed from the top bar; copy chips emit React JSX by default. The `PlatformProvider` infrastructure stays in place (always reports `"react"`) so chip data and the toggle can be re-added later without a refactor.
- **Showcase architecture** — `button-showcase.tsx` now consumes the shared `<Copyable>` and global `PlatformProvider` instead of the local copies it had during the prototype phase.

### Removed

- **Per-component Token Export panels** removed from `ContentWrapper`. Replaced by the single `/styleguide/tokens` page (see Changed above).
- Unused shadcn scaffold from `components/ui/button.tsx` (`cva` + `@base-ui/react` dependencies). Replaced with the standalone Button that matches our chip-snippet API.

## [1.0.0] — Pre-release baseline

Initial design system with Foundations (Colors, Typography, Spacing, Icons, Shadow), Atoms, Molecules, Organisms, and Dashboard pattern. Per-component Token Export (CSS / Swift / Android XML), per-component Developer Notes, dark-mode polish, WCAG-aware color presentation, component status pages.

See git history before tag `v1.1.0` for the per-commit detail.

[Unreleased]: https://github.com/ladansojudi/design-system/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/ladansojudi/design-system/releases/tag/v1.1.0
