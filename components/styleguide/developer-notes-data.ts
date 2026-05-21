export type PropRow = { name: string; type: string; def?: string; desc: string };

export type DevNote = {
  /** import statement (aspirational package path for the published library) */
  importLine: string;
  /** a representative usage snippet */
  usage:      string;
  props:      PropRow[];
  notes:      string[];
  /** unusual states the implementation must handle */
  edgeCases:  string[];
};

/**
 * Per-component developer notes. Keyed by the route slug under
 * /styleguide/<slug>. A page with no entry simply hides the section.
 * Props document the intended public API (the showcases implement it inline).
 */
export const DEV_NOTES: Record<string, DevNote> = {
  // ── Atoms ────────────────────────────────────────────────────────────────
  button: {
    importLine: 'import { Button } from "@s4e/ui";',
    usage: `<Button intent="primary" variant="contained" size="md" loading={false}>\n  Start scan\n</Button>`,
    props: [
      { name: "intent",   type: '"default" | "primary" | "success" | "warning" | "error"', def: '"primary"', desc: "Color intent." },
      { name: "variant",  type: '"contained" | "outlined" | "text"', def: '"contained"', desc: "Visual emphasis." },
      { name: "size",     type: '"sm" | "md"', def: '"md"', desc: "Control height (28 / 36px)." },
      { name: "loading",  type: "boolean", def: "false", desc: "Swaps label for a spinner, disables the button." },
      { name: "iconOnly", type: "boolean", def: "false", desc: "Square icon button — requires aria-label." },
    ],
    notes: [
      "Icon-only buttons must receive an aria-label — the icon is invisible to screen readers.",
      "Keep one Primary per screen region; everything else is Outlined or Text.",
      "Loading keeps the box width stable — never resize on state change.",
    ],
    edgeCases: [
      "Very long labels: the button grows; truncate with max-width + ellipsis if it must stay fixed.",
      "Loading + disabled simultaneously: loading already disables, don't double-set or focus is lost.",
      "Button group on overflow: wrap in overflow-x-auto so segments don't break the row.",
    ],
  },
  "text-field": {
    importLine: 'import { TextField } from "@s4e/ui";',
    usage: `<TextField\n  label="Asset name"\n  variant="outlined"\n  state="error"\n  errorText="Required"\n/>`,
    props: [
      { name: "label",     type: "string", desc: "Always-visible field label." },
      { name: "variant",   type: '"filled" | "outlined"', def: '"outlined"', desc: "Surface style." },
      { name: "state",     type: '"default" | "hover" | "focused" | "error" | "disabled"', def: '"default"', desc: "Visual state." },
      { name: "helperText",type: "string", desc: "Caption below the field." },
      { name: "errorText", type: "string", desc: "Replaces helper in error state." },
    ],
    notes: [
      "Never use placeholder as the only label — it disappears on input.",
      "Pair error state with an icon + message, not color alone.",
      "Validate on blur or submit; clear the error as soon as it's fixed.",
    ],
    edgeCases: [
      "Autofilled values: browser autofill can skip the focused style — re-check the floating label.",
      "Long helper text: wraps to a second line; reserve vertical space so layout doesn't jump.",
      "Read-only vs disabled: prefer read-only when the value should stay copyable.",
    ],
  },
  textarea: {
    importLine: 'import { Textarea } from "@s4e/ui";',
    usage: `<Textarea\n  label="Finding description"\n  value={value}\n  onChange={setValue}\n  maxLength={200}\n/>`,
    props: [
      { name: "value",    type: "string", desc: "Controlled value." },
      { name: "onChange", type: "(value: string) => void", desc: "Change callback." },
      { name: "rows",     type: "number", def: "4", desc: "Initial visible rows." },
      { name: "maxLength",type: "number", desc: "Shows a live character counter." },
      { name: "errorText",type: "string", desc: "Error message below the field." },
    ],
    notes: [
      "Use for multi-line input only — single line is Text Field.",
      "Counter turns amber past 90% of maxLength.",
      "Vertical resize is enabled by default.",
    ],
    edgeCases: [
      "Paste over maxLength: clamp the value and surface the counter in its amber state.",
      "Manual resize beyond the card: the parent must allow it or set a max-height.",
      "Empty + required on submit: show errorText and move focus to the field.",
    ],
  },
  checkbox: {
    importLine: 'import { Checkbox } from "@s4e/ui";',
    usage: `<Checkbox\n  checked={all}\n  indeterminate={some}\n  onChange={toggleAll}\n  label="All asset types"\n/>`,
    props: [
      { name: "checked",       type: "boolean", desc: "Checked state." },
      { name: "indeterminate", type: "boolean", def: "false", desc: "Partial state (parent of a mixed group)." },
      { name: "onChange",      type: "(checked: boolean) => void", desc: "Toggle callback." },
      { name: "tone",          type: '"primary" | "neutral"', def: '"primary"', desc: "Fill color when checked." },
      { name: "label",         type: "string", desc: "Clickable label text." },
    ],
    notes: [
      "Use for multi-select; use Radio for mutually-exclusive choices.",
      "The whole label is a click target — more accessible than the 18px box.",
      "Indeterminate is visual only; you manage the parent/child logic.",
    ],
    edgeCases: [
      "Parent toggle with mixed children: render indeterminate, and clicking it should select all.",
      "No label (standalone in a table cell): still requires an aria-label.",
      "Disabled + checked: keep the check visible at 40% opacity, don't hide it.",
    ],
  },
  select: {
    importLine: 'import { Select } from "@s4e/ui";',
    usage: `const [region, setRegion] = useState("eu-west-1");\n\n<Select\n  label="Region"\n  value={region}\n  onChange={setRegion}\n  options={REGIONS}\n/>`,
    props: [
      { name: "options",  type: "{ value: string; label: string; disabled?: boolean }[]", desc: "Selectable entries." },
      { name: "value",    type: "string", desc: "Controlled selected value." },
      { name: "onChange", type: "(value: string) => void", desc: "Selection callback." },
      { name: "state",    type: '"Default" | "Hover" | "Focused" | "Error" | "Disabled"', def: '"Default"', desc: "Visual state." },
      { name: "errorText",type: "string", desc: "Replaces helper text in Error state." },
    ],
    notes: [
      "Closes on outside click, escape, or selection (useEffect mousedown listener).",
      "Prefer Radio for 2–4 always-visible options.",
      "Don't default-select a destructive option.",
    ],
    edgeCases: [
      "Long option labels: truncate the trigger but show the full text in the popover.",
      "Popover near the viewport bottom: flip it upward so it isn't clipped.",
      "Empty options array: disable the trigger and show a 'No options' state.",
    ],
  },
  "severity-badge": {
    importLine: 'import { SeverityBadge } from "@s4e/ui";',
    usage: `<SeverityBadge severity="critical" score={9.8} />`,
    props: [
      { name: "severity", type: '"info" | "low" | "medium" | "high" | "critical"', desc: "Risk level — drives all colors." },
      { name: "score",    type: "number", desc: "Optional CVSS / risk score, right-aligned." },
    ],
    notes: [
      "Severity colors are reserved — never reuse them for unrelated tags.",
      "Exactly one severity per item; never stack badges.",
      "Color is never the only signal — label is always present.",
    ],
    edgeCases: [
      "Unknown / null severity: fall back to a neutral 'Unrated' chip, not a guessed level.",
      "Score of 0 vs missing score: render 0 explicitly; omit the slot when undefined.",
      "Inside a fixed-width table column: keep the badge at w-20 so rows stay aligned.",
    ],
  },
  "switch-radio": {
    importLine: 'import { Switch, Radio } from "@s4e/ui";',
    usage: `<Switch checked={on} onChange={setOn} variant="primary" />\n\n<Radio name="plan" value="pro" checked={plan === "pro"} onChange={setPlan} />`,
    props: [
      { name: "checked",  type: "boolean", desc: "On/selected state." },
      { name: "onChange", type: "(value) => void", desc: "Change callback." },
      { name: "variant",  type: '"dark" | "primary"', def: '"dark"', desc: "Switch track color when on." },
      { name: "disabled", type: "boolean", def: "false", desc: "Inactive state at 40% opacity." },
    ],
    notes: [
      "Switch = takes effect immediately; Checkbox = staged until submit.",
      "Radios share a name and are mutually exclusive within a group.",
      "Both expose role=switch / role=radio with aria-checked.",
    ],
    edgeCases: [
      "Radio group with no default: allow an unselected initial state, validate on submit.",
      "Switch mid-async: show a pending state and roll back if the request fails.",
      "Keyboard: arrow keys move within a radio group, Space toggles a switch.",
    ],
  },
  "toast-tooltip": {
    importLine: 'import { Toast, Tooltip } from "@s4e/ui";',
    usage: `<Tooltip content="Powers this widget" position="top">\n  <InfoIcon />\n</Tooltip>\n\ntoast.success("Scan completed");`,
    props: [
      { name: "content",  type: "ReactNode", desc: "Tooltip body / toast message." },
      { name: "position", type: '"top" | "bottom" | "left" | "right"', def: '"top"', desc: "Tooltip anchor side." },
      { name: "type",     type: '"success" | "alert" | "info" | "warning"', desc: "Toast variant (timer bar)." },
      { name: "duration", type: "number", def: "4000", desc: "Toast auto-dismiss in ms." },
    ],
    notes: [
      "Tooltip bubble uses bg-grey-900 + text-inverse so it flips correctly per theme.",
      "Toasts auto-dismiss after 4s with an animated progress bar.",
      "Tooltips are pointer-events-none so they never block clicks.",
    ],
    edgeCases: [
      "Tooltip inside overflow-hidden: render via fixed positioning to escape clipping.",
      "Stacked toasts: queue them; cap visible count and collapse the rest.",
      "Hover then scroll: dismiss the tooltip on scroll so it doesn't float detached.",
    ],
  },
  "badge-tag": {
    importLine: 'import { Badge } from "@s4e/ui";',
    usage: `<Badge color="primary" showDot dotPosition="left">\n  Active\n</Badge>`,
    props: [
      { name: "color",       type: '"warning" | "error" | "success" | "neutral" | "info" | "primary"', def: '"neutral"', desc: "Semantic color." },
      { name: "showDot",     type: "boolean", def: "true", desc: "Leading status dot." },
      { name: "dotPosition", type: '"left" | "right"', def: '"left"', desc: "Dot side." },
      { name: "outlined",    type: "boolean", def: "false", desc: "Bordered, transparent fill." },
    ],
    notes: [
      "Primary uses brand-primary-* (theme-aware) — not the static btn-* tokens.",
      "Don't reuse severity colors here; badges are status, not risk.",
      "Keep labels to one or two words.",
    ],
    edgeCases: [
      "Long tag text: truncate with a max-width; show full text in a tooltip.",
      "Many tags in a row: wrap and cap with a '+N' overflow chip.",
      "Removable tags: put the × inside the badge and keep a 24px hit target.",
    ],
  },
  alert: {
    importLine: 'import { Alert } from "@s4e/ui";',
    usage: `<Alert variant="warning" title="Quota almost exceeded" dismissible>\n  You have used 9.2 GB of your 10 GB allowance.\n</Alert>`,
    props: [
      { name: "variant",     type: '"info" | "success" | "warning" | "error"', def: '"info"', desc: "Severity + icon + colors." },
      { name: "title",       type: "string", desc: "Optional bold headline." },
      { name: "dismissible", type: "boolean", def: "false", desc: "Shows a close button." },
      { name: "action",      type: "ReactNode", desc: "Inline link/button under the message." },
    ],
    notes: [
      "Alert is persistent — use Toast for transient confirmations.",
      "Colors come from text-* semantic tokens, so dark mode is automatic.",
      "Collapse multiple errors into one Alert with a list; never stack alerts.",
    ],
    edgeCases: [
      "Title only vs body only: both render; don't force an empty line when one is absent.",
      "Dismissed then re-triggered: reset the open state via key when the message changes.",
      "Very long body: keep to one or two sentences and link out for detail.",
    ],
  },
  banner: {
    importLine: 'import { Banner } from "@s4e/ui";',
    usage: `<Banner tone="promo" cta={{ label: "Try it", href: "/ai" }}>\n  AI-assisted vulnerability triage is live for all teams.\n</Banner>`,
    props: [
      { name: "tone",        type: '"neutral" | "promo" | "warning"', def: '"neutral"', desc: "Background color." },
      { name: "cta",         type: "{ label: string; href?: string }", desc: "Optional inline action link." },
      { name: "dismissible", type: "boolean", def: "true", desc: "Close button — omit for must-act banners." },
    ],
    notes: [
      "Render above the app shell; only one banner at a time.",
      "bg + text colors are static (don't theme-flip) so the banner reads identically in both modes.",
      "Don't make billing/outage banners dismissible.",
    ],
    edgeCases: [
      "Long message on mobile: truncate and keep the CTA visible, or wrap to two lines.",
      "Multiple eligible banners: show the single highest-priority one.",
      "Dismiss persistence: remember dismissal per user so it doesn't reappear each load.",
    ],
  },
  spinner: {
    importLine: 'import { Spinner } from "@s4e/ui";',
    usage: `<Spinner size="sm" tone="white" label="Saving" />`,
    props: [
      { name: "size",  type: '"xs" | "sm" | "md" | "lg"', def: '"md"', desc: "12 / 16 / 24 / 36px." },
      { name: "tone",  type: '"primary" | "neutral" | "white"', def: '"primary"', desc: "Ring color." },
      { name: "label", type: "string", def: '"Loading"', desc: "Screen-reader label (sr-only)." },
    ],
    notes: [
      "Always carries an sr-only label for assistive tech.",
      "Don't show for operations under ~300ms.",
      "Use Skeleton instead when you can preserve layout.",
    ],
    edgeCases: [
      "White tone on a light surface: it vanishes — only use it on dark/accent backgrounds.",
      "Indefinite hang: pair with a timeout that surfaces an error state.",
      "Reduced motion: respect prefers-reduced-motion and slow or disable the spin.",
    ],
  },
  skeleton: {
    importLine: 'import { Skeleton } from "@s4e/ui";',
    usage: `<Skeleton className="h-3 w-1/2" />\n<Skeleton className="h-10 w-10 rounded-full" />`,
    props: [
      { name: "className", type: "string", desc: "Shape + size via Tailwind utilities." },
    ],
    notes: [
      "Match the skeleton's shape and count to the real content.",
      "Fill is always neutral grey — never a brand/semantic color.",
      "Don't mix skeletons and spinners in the same surface.",
    ],
    edgeCases: [
      "Unknown row count: render a fixed placeholder count (e.g. 5), not an empty list.",
      "Flash on fast loads: delay showing the skeleton ~150ms to avoid a flicker.",
      "Reduced motion: drop the pulse animation, keep the static placeholder.",
    ],
  },
  shadow: {
    importLine: '// Utility classes — no import needed',
    usage: `<div className="shadow-s4e-md rounded-lg">…</div>`,
    props: [
      { name: "shadow-s4e-xs…2xl", type: "utility", desc: "Six elevation levels mapped to interaction layers." },
    ],
    notes: [
      "One elevation per surface — never stack xs + md to fake depth.",
      "Don't put shadows on fixed chrome (sidebar, tabs); a 1px divider reads cleaner.",
      "Dark mode shadows use a stronger alpha automatically.",
    ],
    edgeCases: [
      "Shadow clipped by overflow-hidden parent: move the shadow to the parent or add padding.",
      "Hover elevation: only raise the shadow if the surface actually moves up.",
    ],
  },
  icons: {
    importLine: 'import { Shield, Info, ArrowRight } from "lucide-react";',
    usage: `<Shield size={16} className="text-s4e-text-secondary" />`,
    props: [
      { name: "size",      type: "number", def: "16", desc: "12 / 14 / 16 / 20 / 24 — stay on the scale." },
      { name: "className", type: "string", desc: "Color via text-* tokens; stroke via Tailwind." },
    ],
    notes: [
      "Match icon size to adjacent text (14px in buttons/inputs, 16px in nav).",
      "Color icons with text-* tokens so they follow the theme.",
      "Decorative icons get aria-hidden; meaningful ones get an aria-label.",
    ],
    edgeCases: [
      "Icon-only control: the parent must carry the aria-label, not the icon.",
      "Mixed stroke weights: keep one Lucide version across a region.",
      "RTL layouts: mirror directional icons (arrows, chevrons).",
    ],
  },

  // ── Molecules ──────────────────────────────────────────────────────────
  "search-bar": {
    importLine: 'import { SearchBar } from "@s4e/ui";',
    usage: `<SearchBar value={query} onChange={setQuery} placeholder="Search…" />`,
    props: [
      { name: "value",       type: "string", desc: "Controlled query." },
      { name: "onChange",    type: "(value: string) => void", desc: "Input callback." },
      { name: "placeholder", type: "string", def: '"Search…"', desc: "Empty hint." },
    ],
    notes: [
      "Debounce the onChange before firing network requests (~250ms).",
      "Show a clear (×) affordance once there's a value.",
      "Leading search icon is decorative (aria-hidden).",
    ],
    edgeCases: [
      "No results: surface an empty state, not a blank list.",
      "Rapid typing: cancel in-flight requests so stale results don't overwrite fresh ones.",
      "Pre-filled query from URL: hydrate value on mount so the field isn't empty.",
    ],
  },
  tabs: {
    importLine: 'import { Tabs } from "@s4e/ui";',
    usage: `<Tabs\n  tabs={[{ id: "all", label: "All" }, { id: "open", label: "Open", badge: 24 }]}\n  active={active}\n  onSelect={setActive}\n/>`,
    props: [
      { name: "tabs",     type: "{ id; label; badge?; disabled? }[]", desc: "Tab definitions." },
      { name: "active",   type: "string", desc: "Selected tab id." },
      { name: "onSelect", type: "(id: string) => void", desc: "Selection callback." },
    ],
    notes: [
      "Active pill uses surface-row (theme-aware), not a hardcoded white.",
      "Keep labels short; counts go in the badge slot.",
      "Roving tabindex — arrow keys move between tabs.",
    ],
    edgeCases: [
      "More tabs than fit: scroll horizontally or collapse into a 'More' menu.",
      "Disabled active tab: never start on a disabled tab — pick the first enabled one.",
      "Deep-linking: sync the active tab to the URL so refresh keeps the view.",
    ],
  },
  breadcrumb: {
    importLine: 'import { Breadcrumb } from "@s4e/ui";',
    usage: `<Breadcrumb items={[\n  { label: "Assets", href: "/assets" },\n  { label: "zero.webappsecurity.com" },\n]} />`,
    props: [
      { name: "items",    type: "{ label: string; href?: string }[]", desc: "Path, root → current." },
      { name: "maxItems", type: "number", desc: "Collapse the middle into … past this count." },
    ],
    notes: [
      "The last item is the current page — not a link.",
      "Collapse long paths with an ellipsis menu, keep first + last.",
      "Use a real nav element with aria-label='Breadcrumb'.",
    ],
    edgeCases: [
      "Single item: render just the current page, no separator.",
      "Very long labels: truncate the middle crumbs, keep the current one readable.",
      "Dynamic depth: don't reflow the layout as crumbs load — reserve the row height.",
    ],
  },
  "filter-bar": {
    importLine: 'import { FilterBar, FilterPill } from "@s4e/ui";',
    usage: `<FilterBar onClear={clearAll}>\n  <FilterPill label="Advanced Security" count={1} active />\n  <FilterPill label="Tags" />\n</FilterBar>`,
    props: [
      { name: "active",  type: "boolean", desc: "Pill is applied (brand-tinted)." },
      { name: "count",   type: "number", desc: "Applied-value badge on the pill." },
      { name: "onClear", type: "() => void", desc: "Clears all active filters." },
    ],
    notes: [
      "Active pills use brand-primary-50 (theme-aware), not the static btn token.",
      "Overflowing pills collapse behind a '+N' button.",
      "Show a 'Clear all' only when at least one filter is active.",
    ],
    edgeCases: [
      "Many active filters: horizontal scroll the bar; keep Clear pinned at the end.",
      "Count of 0: hide the badge rather than showing a '0'.",
      "Narrow viewport: stack search above the pills instead of one row.",
    ],
  },

  // ── Organisms ──────────────────────────────────────────────────────────
  sidebar: {
    importLine: 'import { Sidebar } from "@s4e/ui";',
    usage: `<Sidebar groups={NAV} collapsed={collapsed} onToggle={setCollapsed} />`,
    props: [
      { name: "groups",    type: "{ label; items: NavItem[] }[]", desc: "Grouped navigation." },
      { name: "collapsed", type: "boolean", def: "false", desc: "Icon-only rail mode." },
      { name: "onToggle",  type: "() => void", desc: "Expand/collapse callback." },
    ],
    notes: [
      "Exactly one active item; derive it from the current route.",
      "Collapsed mode shows icons only — keep tooltips for labels.",
      "Footer (plan, status) stays pinned to the bottom.",
    ],
    edgeCases: [
      "Long nav: the list scrolls while logo + footer stay fixed.",
      "Mobile: slide in over a scrim with a focus trap; close on route change.",
      "Active route under a collapsed group: auto-expand that group.",
    ],
  },
  "top-bar": {
    importLine: 'import { TopBar } from "@s4e/ui";',
    usage: `<TopBar testMode actions={<><ScanGenerator /><AskAI /></>} user={user} />`,
    props: [
      { name: "testMode", type: "boolean", def: "false", desc: "Shows the red Test Mode pill." },
      { name: "actions",  type: "ReactNode", desc: "Right-aligned action cluster." },
      { name: "user",     type: "{ name; avatarUrl? }", desc: "Account menu trigger." },
    ],
    notes: [
      "Sticky at z-sticky so it stays above scrolling content.",
      "On mobile it collapses secondary actions behind a menu.",
      "Keep it 52px tall to align with the sidebar logo row.",
    ],
    edgeCases: [
      "Many actions on a narrow screen: overflow into a kebab menu.",
      "Missing avatar: fall back to the user's initial on a neutral circle.",
      "Long product name: truncate, never push the actions off-screen.",
    ],
  },
  "text-space": {
    importLine: 'import { TextSpace } from "@s4e/ui";',
    usage: `<TextSpace toolbar="full" state="default" value={doc} onChange={setDoc} />`,
    props: [
      { name: "toolbar",  type: '"simple" | "full"', def: '"simple"', desc: "Formatting controls shown." },
      { name: "state",    type: '"default" | "disabled" | "error"', def: '"default"', desc: "Editor state." },
      { name: "value",    type: "string", desc: "Rich-text / markdown value." },
    ],
    notes: [
      "Error state uses text-error + scale-red-50 surface (theme-aware).",
      "Sanitize pasted HTML before storing it.",
      "Toolbar actions must have accessible labels.",
    ],
    edgeCases: [
      "Paste from Word/Google Docs: strip foreign styles, keep semantic markup.",
      "Empty + required: show error and focus the editor body.",
      "Very long content: the editor scrolls internally at a fixed max-height.",
    ],
  },
  "data-table": {
    importLine: 'import { DataTable } from "@s4e/ui";',
    usage: `<DataTable\n  columns={columns}\n  rows={rows}\n  header={{ title: "Threats", badge: "24 new", viewAll: true }}\n/>`,
    props: [
      { name: "columns", type: "Column[]", desc: "Column defs (key, label, render, width)." },
      { name: "rows",    type: "Row[]", desc: "Row data." },
      { name: "header",  type: "{ title; description?; badge?; viewAll? }", desc: "Card header config." },
    ],
    notes: [
      "Column headers use the bg-s4e-surface-table-header token (theme-aware).",
      "Wrap in overflow-x-auto for wide tables on small viewports.",
      "Row tooltips render via fixed positioning to escape overflow clipping.",
    ],
    edgeCases: [
      "Empty rows: render an Empty State inside the card, not a bare header.",
      "Huge numbers (100000000): allow horizontal scroll or abbreviate (100M).",
      "Loading: swap rows for Skeleton rows that match the column widths.",
    ],
  },
  cards: {
    importLine: 'import { StatCard, InsightCard } from "@s4e/ui";',
    usage: `<StatCard label="Total Issues" value={266} trend={+3} />`,
    props: [
      { name: "label", type: "string", desc: "Card heading." },
      { name: "value", type: "ReactNode", desc: "Primary metric." },
      { name: "trend", type: "number", desc: "Delta with up/down arrow." },
      { name: "sub",   type: "ReactNode", desc: "Supporting line." },
    ],
    notes: [
      "Keep one primary metric per stat card.",
      "Trend up isn't always good — color by meaning, not direction.",
      "Header uses the grey-100 surface for separation.",
    ],
    edgeCases: [
      "Missing value: show an em-dash, not 0, when data hasn't loaded.",
      "Very large value: use tabular-nums and abbreviate past 6 digits.",
      "Trend of exactly 0: hide the arrow rather than showing a flat 0.",
    ],
  },
  chart: {
    importLine: 'import { Donut, BarChart, AreaChart, Treemap } from "@s4e/ui";',
    usage: `<Donut data={slices} centerValue={total} centerLabel="Total" />`,
    props: [
      { name: "data",        type: "{ label; value; color }[]", desc: "Series — color from --s4e-data-* tokens." },
      { name: "centerValue", type: "ReactNode", desc: "Donut hole metric." },
      { name: "height",      type: "number", desc: "Chart height (area/bar)." },
    ],
    notes: [
      "Use the --s4e-data-* palette so charts recolor with the theme.",
      "Never encode severity in a chart with severity colors — use data colors.",
      "Pair every chart with a legend or center label — the 'so what'.",
    ],
    edgeCases: [
      "All-zero data: render an empty ring/baseline, not a divide-by-zero NaN.",
      "Single slice: the donut shows one full ring — keep the legend for context.",
      "Too many categories: cap at 5–6 and group the rest into 'Other'.",
    ],
  },
  modal: {
    importLine: 'import { Modal } from "@s4e/ui";',
    usage: `<Modal open={open} onClose={close} size="md" title="Confirm scan">\n  …\n</Modal>`,
    props: [
      { name: "open",    type: "boolean", desc: "Visibility." },
      { name: "onClose", type: "() => void", desc: "Backdrop / escape / close callback." },
      { name: "size",    type: '"sm" | "md" | "lg"', def: '"md"', desc: "Max width." },
      { name: "title",   type: "string", desc: "Header title." },
    ],
    notes: [
      "Backdrop uses bg-black/50 (static) so it dims correctly in both themes.",
      "Sits at z-modal (50); toasts (z-toast 60) still surface above it.",
      "Trap focus inside while open; restore it on close.",
    ],
    edgeCases: [
      "Tall content: the body scrolls while header/footer stay fixed.",
      "Nested modals: avoid them — replace content in a single modal instead.",
      "Escape during a pending action: confirm before discarding unsaved input.",
    ],
  },
  "empty-state": {
    importLine: 'import { EmptyState } from "@s4e/ui";',
    usage: `<EmptyState\n  icon={<InboxIcon />}\n  title="No findings yet"\n  action={<Button>Start a scan</Button>}\n/>`,
    props: [
      { name: "icon",   type: "ReactNode", desc: "Single 20–24px icon." },
      { name: "title",  type: "string", desc: "What's empty." },
      { name: "body",   type: "string", desc: "Why, and what to do next." },
      { name: "action", type: "ReactNode", desc: "Primary next step." },
    ],
    notes: [
      "Always offer a next action — empty states are an opportunity, not a dead end.",
      "One icon, one sentence, one action — don't overload.",
      "Distinguish 'no data yet' from 'no results for this filter'.",
    ],
    edgeCases: [
      "Filtered-to-empty: offer a 'Clear filters' action, not 'Create new'.",
      "Error vs empty: an error needs a Retry, not an onboarding CTA.",
      "First-run vs recurring: tailor copy for the very first use.",
    ],
  },
  gauge: {
    importLine: 'import { Gauge } from "@s4e/ui";',
    usage: `<Gauge value={75} max={100} color="purple" />`,
    props: [
      { name: "value", type: "number", desc: "Current value." },
      { name: "max",   type: "number", def: "100", desc: "Scale maximum." },
      { name: "color", type: '"blue" | "green" | "yellow" | "red" | "purple"', def: '"blue"', desc: "Arc color." },
    ],
    notes: [
      "Clamp value to 0…max before rendering.",
      "Pair the dial with the numeric value — the arc alone is imprecise.",
      "Animate the draw with the s4e-gauge-draw keyframes.",
    ],
    edgeCases: [
      "Value above max: clamp to max, don't overshoot the arc.",
      "value === 0: render an empty arc with the knob at the start.",
      "Reduced motion: skip the draw animation, render the final position.",
    ],
  },

  // ── Patterns ─────────────────────────────────────────────────────────────
  dashboard: {
    importLine: '// Composition example — assembled from published components',
    usage: `<AppShell sidebar={<AppSidebar />} topbar={<AppTopbar />}>\n  <Tabs tabs={["Overview", "Details", "Compliance"]}>\n    <DataTable … />\n    <Chart … />\n    <Gauge … />\n  </Tabs>\n</AppShell>`,
    props: [],
    notes: [
      "This screen is composed entirely from design-system components and tokens — zero hardcoded color values.",
      "Every region is labelled with its source component; click a chip to open that component's page.",
      "Charts use the --s4e-data-* tokens so they recolor with the theme.",
    ],
    edgeCases: [
      "Narrow viewport: the app sidebar hides (lg:flex) and the grid collapses to one column.",
      "Wide tables/flow diagram: each scrolls internally so the page layout never breaks.",
      "Empty widgets: every card falls back to its own empty/loading state independently.",
    ],
  },
};
