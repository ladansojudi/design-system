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
  pagination: {
    importLine: 'import { Pagination } from "@/components/ui/pagination";',
    usage: `<Pagination page={page} pageCount={20} onPageChange={setPage} />`,
    props: [
      { name: "page", type: "number", desc: "Current page, from 1." },
      { name: "pageCount", type: "number", desc: "Total pages." },
      { name: "onPageChange", type: "(page: number) => void", desc: "Called with the new page." },
      { name: "siblingCount", type: "number", def: "1", desc: "Pages each side of the current one." },
    ],
    notes: ["Works in Server Components when given no handler; pass onPageChange from a client component.", "pageRange() is exported if you need the same page list for your own UI."],
    edgeCases: ["pageCount of 1 renders a single disabled-arrows control; hide it yourself if you don't want it."],
  },
  drawer: {
    importLine: 'import { Drawer, DrawerHeader, DrawerTitle, DrawerBody, DrawerFooter } from "@/components/ui/drawer";',
    usage: `<Drawer open={open} onOpenChange={setOpen}>…</Drawer>`,
    props: [
      { name: "open", type: "boolean", desc: "Shown or hidden." },
      { name: "onOpenChange", type: "(open: boolean) => void", desc: "Open / close request." },
      { name: "side", type: '"left" | "right"', def: '"right"', desc: "Edge it slides from." },
      { name: "size", type: '"sm" | "md" | "lg"', def: '"md"', desc: "Maximum width." },
    ],
    notes: ["Client component. Renders in a portal and mirrors the theme of its opener.", "Focus trap, Escape, scroll lock and inert page behave like Modal."],
    edgeCases: ["Two drawers open at once are not supported."],
  },
  "dropdown-menu": {
    importLine: 'import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";',
    usage: `<DropdownMenu><DropdownMenuTrigger>Actions</DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem onSelect={rescan}>Re-run scan</DropdownMenuItem></DropdownMenuContent></DropdownMenu>`,
    props: [
      { name: "align", type: '"start" | "end"', def: '"start"', desc: "DropdownMenuContent: edge it lines up with." },
      { name: "onSelect", type: "() => void", desc: "DropdownMenuItem: called when chosen; menu closes." },
      { name: "destructive", type: "boolean", def: "false", desc: "DropdownMenuItem: red text." },
    ],
    notes: ["Client component; content is portalled to <body> and positioned with fixed coordinates.", "Style DropdownMenuTrigger yourself, e.g. with buttonVariants()."],
    edgeCases: ["Flips above the button when there is no room below; follows scroll and resize."],
  },
  "command-palette": {
    importLine: 'import { CommandPalette } from "@/components/ui/command-palette";',
    usage: `<CommandPalette open={open} onOpenChange={setOpen} items={items} />`,
    props: [
      { name: "items", type: "CommandItem[]", desc: "id, label, onSelect + optional group, hint, icon, keywords." },
      { name: "open", type: "boolean", desc: "Shown or hidden." },
      { name: "onOpenChange", type: "(open: boolean) => void", desc: "Open / close request." },
    ],
    notes: ["Built on Modal. Bind the ⌘K shortcut yourself (see the Code tab).", "Search matches every typed word against label, group and keywords."],
    edgeCases: ["Typing resets the highlight to the first result."],
  },
  "masked-value": {
    importLine: 'import { MaskedValue } from "@/components/ui/masked-value";',
    usage: `<MaskedValue label="API key" value={apiKey} />`,
    props: [
      { name: "value", type: "string", desc: "The secret. Copy always copies it." },
      { name: "label", type: "string", desc: "What it is; names the buttons and the masked text for screen readers." },
      { name: "visibleChars", type: "number", def: "4", desc: "Characters left visible at the end." },
      { name: "revealable", type: "boolean", def: "true", desc: "Show / hide toggle (aria-pressed)." },
      { name: "copyable", type: "boolean", def: "true", desc: "Copy button; \"copied\" is announced." },
    ],
    notes: ["Client component (state + clipboard).", "The secret is in the DOM even while masked — don't render secrets the user may not see."],
    edgeCases: ["Clipboard blocked (insecure context): copy fails silently; nothing is announced."],
  },
  indicator: {
    importLine: 'import { Indicator, defang } from "@/components/ui/indicator";',
    usage: `<Indicator type="ip" value="185.220.101.47" verdict="malicious" />`,
    props: [
      { name: "value", type: "string", desc: "The IOC; copied unchanged." },
      { name: "type", type: '"ip" | "domain" | "url" | "hash" | "email"', desc: "Sets label and icon." },
      { name: "verdict", type: '"malicious" | "suspicious" | "clean" | "unknown"', desc: "Reputation chip." },
      { name: "defang", type: "boolean", def: "false", desc: "Display example[.]com / hxxp." },
      { name: "copyable", type: "boolean", def: "true", desc: "Copy button." },
    ],
    notes: ["Client component (clipboard).", "Hashes over 24 characters are shortened in the middle; the full value is in the title."],
    edgeCases: ["IPv6 isn't shortened; very long values truncate with an ellipsis."],
  },
  "scan-progress": {
    importLine: 'import { ScanProgress, type ScanStep } from "@/components/ui/scan-progress";',
    usage: `<ScanProgress label="Scan of api.example.com" steps={steps} />`,
    props: [
      { name: "steps", type: "{ label; status: \"pending\" | \"active\" | \"done\" | \"failed\"; detail? }[]", desc: "Stages in order." },
      { name: "label", type: "string", def: '"Scan progress"', desc: "Accessible name of the list." },
    ],
    notes: ["No \"use client\".", "Active stage gets aria-current=\"step\"; the spinner respects prefers-reduced-motion."],
    edgeCases: ["Doesn't announce changes — pair with a Toast on completion or failure."],
  },
  "activity-timeline": {
    importLine: 'import { ActivityTimeline, type TimelineItem } from "@/components/ui/activity-timeline";',
    usage: `<ActivityTimeline items={events} />`,
    props: [
      { name: "items", type: "TimelineItem[]", desc: "{ id, title, time, dateTime?, actor?, description?, tone?, icon? }" },
    ],
    notes: ["No \"use client\".", "Renders items in the order given — sort them yourself."],
    edgeCases: ["Hundreds of events: paginate or use DataTable; the list isn't virtualised."],
  },
  "severity-bar": {
    importLine: 'import { SeverityBar } from "@/components/ui/severity-bar";',
    usage: `<SeverityBar counts={{ critical: 3, high: 8, medium: 14, low: 21 }} noun="vulnerabilities" />`,
    props: [
      { name: "counts",     type: "Partial<Record<Severity, number>>", desc: "Findings per severity. Zero or missing severities are left out." },
      { name: "showLegend", type: "boolean", def: "true", desc: "Legend with counts under the bar." },
      { name: "size",       type: '"sm" | "md"', def: '"md"', desc: "Bar thickness: 6 / 10px." },
      { name: "noun",       type: "string", def: '"findings"', desc: "What is counted, used in the accessible summary." },
      { name: "...props",   type: "HTMLAttributes<HTMLDivElement>", desc: "Forwarded to the wrapper." },
    ],
    notes: [
      "No \"use client\": renders in Server Components.",
      "Also exports SEVERITY_ORDER and the Severity type.",
      "Segments use flex-grow with a 4px minimum, so a single finding stays visible.",
    ],
    edgeCases: [
      "All counts zero: renders an empty track and \"No findings\".",
      "Huge totals: proportions stay right; keep the legend so exact numbers are readable.",
    ],
  },
  "finding-status": {
    importLine: 'import { FindingStatus } from "@/components/ui/finding-status";',
    usage: `<FindingStatus status="in-progress" />`,
    props: [
      { name: "status",   type: '"open" | "in-progress" | "resolved" | "accepted-risk" | "false-positive"', desc: "Lifecycle state: sets icon, colour and label." },
      { name: "size",     type: '"sm" | "md"', def: '"md"', desc: "20 / 24px tall." },
      { name: "label",    type: "string", desc: "Overrides the visible label (translation)." },
      { name: "...props", type: "HTMLAttributes<HTMLSpanElement>", desc: "Forwarded to the pill." },
    ],
    notes: [
      "No \"use client\". Also exports FINDING_STATUSES (for filters and selects) and FindingStatusValue.",
      "Not interactive — wrap it in a Select or menu to make status editable.",
    ],
    edgeCases: ["Long translated labels stay on one line (whitespace-nowrap); keep them short."],
  },
  "cvss-score": {
    importLine: 'import { CvssScore, cvssRating, parseCvssVector } from "@/components/ui/cvss-score";',
    usage: `<CvssScore score={9.8} vector="CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H" />`,
    props: [
      { name: "score",       type: "number", desc: "Base score 0.0–10.0, shown with one decimal." },
      { name: "vector",      type: "string", desc: "CVSS vector. v3.0 / v3.1 metrics are translated; unknown ones are shown as written." },
      { name: "showMetrics", type: "boolean", def: "true", desc: "Show the metric list when a vector is given." },
      { name: "...props",    type: "HTMLAttributes<HTMLDivElement>", desc: "Forwarded to the wrapper." },
    ],
    notes: [
      "cvssRating(score) returns \"none\" | \"low\" | \"medium\" | \"high\" | \"critical\" using the v3 bands.",
      "parseCvssVector(vector) returns { version, metrics: { key, name, value }[] }.",
      "No \"use client\".",
    ],
    edgeCases: [
      "CVSS v4.0 vectors: the score and rating are right; v4-only metrics (AT, VC, SC …) are listed with their raw codes.",
      "Scores outside 0–10 aren't clamped — validate upstream.",
    ],
  },
  "cve-tag": {
    importLine: 'import { CveTag, nvdUrl } from "@/components/ui/cve-tag";',
    usage: `<CveTag id="CVE-2021-44228" kev epss={0.944} />`,
    props: [
      { name: "id",       type: "string", desc: "CVE ID, e.g. CVE-2021-44228." },
      { name: "href",     type: "string | false", def: "nvdUrl(id)", desc: "Advisory link (new tab). false renders plain text." },
      { name: "kev",      type: "boolean", def: "false", desc: "Listed in CISA KEV: shows the Exploited tag." },
      { name: "epss",     type: "number", desc: "EPSS probability 0–1, shown as a percentage." },
      { name: "...props", type: "HTMLAttributes<HTMLSpanElement>", desc: "Forwarded to the wrapper." },
    ],
    notes: ["No \"use client\".", "EPSS under 10% is shown with one decimal (3.1%), above that rounded (94%)."],
    edgeCases: ["The ID isn't validated; pass the canonical upper-case form."],
  },
  button: {
    importLine: 'import { Button, buttonVariants } from "@/components/ui/button";',
    usage: `<Button intent="primary" variant="solid" size="md" onClick={startScan}>\n  Start scan\n</Button>`,
    props: [
      { name: "intent",    type: '"primary" | "neutral" | "destructive"', def: '"primary"', desc: 'Meaning of the action. "default" still works as a deprecated alias of "neutral".' },
      { name: "variant",   type: '"solid" | "outline" | "ghost"', def: '"solid"', desc: "Emphasis." },
      { name: "size",      type: '"sm" | "md" | "lg"', def: '"md"', desc: "Height: 32 / 36 / 44px." },
      { name: "loading",   type: "boolean", def: "false", desc: "Spinner over the label. The button stays focusable (aria-disabled, aria-busy) but presses do nothing and it won't submit a form. Width doesn't change." },
      { name: "iconOnly",  type: "boolean", def: "false", desc: "Square button for a single icon. Pass aria-label." },
      { name: "disabled",  type: "boolean", def: "false", desc: "Native disabled. The button leaves the tab order." },
      { name: "type",      type: '"button" | "submit" | "reset"', def: '"button"', desc: 'Defaults to "button" so it never submits a form by accident. Pass "submit" in forms.' },
      { name: "className", type: "string", desc: "Merged with cn(), so your classes win (e.g. w-full)." },
      { name: "ref",       type: "Ref<HTMLButtonElement>", desc: "Forwarded to the <button>." },
      { name: "...props",  type: "ButtonHTMLAttributes", desc: "Every other native attribute: onClick, aria-*, form, name …" },
    ],
    notes: [
      "buttonVariants({ intent, variant, size, iconOnly }) returns the class string. Use it on <Link> or <a> for navigation that should look like a button.",
      "No \"use client\": Button and buttonVariants both work in Server Components.",
      "Icons passed as children are sized by the button (14px with a label; 14 / 16 / 20px icon-only), so you don't need a size prop on the icon.",
      "Icon-only buttons need aria-label. Lucide icons are aria-hidden by default.",
    ],
    edgeCases: [
      "Loading drops onClick and turns type=\"submit\" into type=\"button\" until it ends, so double-clicks and Enter can't send twice.",
      "Long labels don't wrap (whitespace-nowrap). In narrow layouts, shorten the label or add className=\"w-full\".",
      "Toggle buttons: pass aria-pressed. Menu triggers: pass aria-haspopup and aria-expanded.",
    ],
  },
};
