# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] — 2026-06-01

### Added

- **Copy chips** on 13 component variants (Button + 12 atoms · 151 cells total). Hover-revealed chips emit the React JSX for the exact variant. Per-platform snippets (Swift / Android XML) are generated and retained in the source for future re-enablement, but the global platform toggle was removed in pre-release to align with shadcn's React-first philosophy — see Changed.
- **Installation panel** on every component page. Two tabs:
  - **CLI** — `npx @s4e/ui add <name>` (aspirational placeholder).
  - **Manual** — full syntax-highlighted source code with Copy and Download.
- **Standalone copy-paste-ready components** at `components/ui/<slug>.tsx` for 13 atoms + 4 molecules + 7 organisms (24 components total). Dependency-light (`react` + `cn` + optional `lucide-react`), `forwardRef`'d, matches the chip-snippet API contract. Exceptions, all clearly noted in the per-file header:
  - `Tabs` uses `@base-ui/react` for accessibility / keyboard / aria handling.
  - `Modal` uses `react-dom`'s `createPortal` (built-in).
  - All other components: zero third-party deps beyond `lucide-react` icons.
- **Organism coverage**: Cards (InsightCard / AlertCard), Empty State, Text Space (+ Toolbar), Gauge, Data Table (composable: Header / Body / ColumnHeaders / Row / Footer), Modal (composable: Header / Title / Description / Body / Footer), Chart (ChartCard, StatBlock, DonutChart, DonutLegend, BarChart, LineChart, TreemapChart — each chart kind is raw SVG, no recharts dependency).
- **Site-chrome organisms** intentionally skipped from Installation: `Sidebar` and `Top Bar` are this styleguide's own chrome, not portable.
- **Component source export pipeline** (`scripts/export-components.js`) — copies `components/ui/*.tsx` to `public/components/<slug>.tsx.txt` at build time. Wired into `prebuild`.
- **Theming** page at `/styleguide/theming` — single source of truth for tokens. Explains the `--s4e-<category>-<role>-<scale>` convention, the `[data-s4e-theme]` light/dark wiring, the three flavors of tokens (semantic theme-aware / static / scale primitives), how to customize, a live side-by-side light + dark preview, AND the install-once panel with the complete token bundle (~141 tokens) per platform (CSS / Swift / XML). Component pages link here from the Installation footer.
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
