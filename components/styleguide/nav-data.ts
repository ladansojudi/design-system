import type { ComponentStatus } from "@/components/styleguide/page-header";

// `status` is optional and only set on items worth flagging in the nav. Stable
// items are left undefined → no marker (keeps the menu quiet). Today these are a
// handful of illustrative examples; the per-page PageHeader remains the source
// of truth for a component's real maturity.
export type NavItem = { slug: string; label: string; status?: ComponentStatus };
// A group can carry its own status when the whole section is at one maturity
// (e.g. PATTERNS is alpha — only just being built out).
export type NavGroup = { label: string; items: NavItem[]; status?: ComponentStatus };

export const navGroups: NavGroup[] = [
  {
    label: "FOUNDATIONS",
    items: [
      { slug: "principles",       label: "Design Principles" },
      { slug: "accessibility",    label: "Accessibility" },
      { slug: "contribution",     label: "Contribution Guide" },
      { slug: "component-status", label: "Component Status" },
      { slug: "theming",          label: "Theming" },
      { slug: "colors",           label: "Colors & Tokens" },
      { slug: "typography",       label: "Typography" },
      { slug: "spacing",          label: "Spacing & Grid" },
      { slug: "shadow",           label: "Shadow" },
      { slug: "icons",            label: "Icons" },
      { slug: "layout-behavior",  label: "Layout & Behavior" },
    ],
  },
  {
    label: "ATOMS",
    items: [
      { slug: "button",         label: "Button" },
      { slug: "text-field",     label: "Text Field" },
      { slug: "textarea",       label: "Textarea" },
      { slug: "checkbox",       label: "Checkbox", status: "beta" },
      { slug: "select",         label: "Select",   status: "beta" },
      { slug: "severity-badge", label: "Severity Badge" },
      { slug: "switch-radio",   label: "Switch · Radio" },
      { slug: "toast-tooltip",  label: "Toast · Tooltip" },
      { slug: "badge-tag",      label: "Badge · Tag" },
      { slug: "alert",          label: "Alert" },
      { slug: "banner",         label: "Banner",   status: "deprecated" },
      { slug: "spinner",        label: "Spinner",  status: "alpha" },
      { slug: "skeleton",       label: "Skeleton", status: "beta" },
    ],
  },
  {
    label: "PATTERNS",
    status: "alpha",
    items: [
      { slug: "dashboard", label: "Dashboard" },
    ],
  },
  {
    label: "MOLECULES",
    items: [
      { slug: "search-bar", label: "Search Bar" },
      { slug: "tabs",       label: "Tabs" },
      { slug: "breadcrumb", label: "Breadcrumb" },
      { slug: "filter-bar", label: "Filter Bar" },
    ],
  },
  {
    label: "ORGANISMS",
    items: [
      { slug: "sidebar",     label: "Sidebar" },
      { slug: "top-bar",     label: "Top Bar" },
      { slug: "text-space",  label: "Text Space" },
      { slug: "data-table",  label: "Data Table" },
      { slug: "cards",       label: "Cards" },
      { slug: "chart",       label: "Chart" },
      { slug: "modal",       label: "Modal" },
      { slug: "empty-state", label: "Empty State" },
      { slug: "gauge",       label: "Gauge" },
    ],
  },
];

export function findGroupForPath(pathname: string | null): string | undefined {
  if (!pathname) return undefined;
  for (const g of navGroups) {
    if (g.items.some((i) => pathname === `/styleguide/${i.slug}`)) return g.label;
  }
  return undefined;
}
