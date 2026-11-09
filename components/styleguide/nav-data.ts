import type { ComponentStatus } from "@/components/styleguide/page-header";

// Site information architecture. Top-level sections (the header nav);
// the sidebar shows only the groups of the section you're in. Components are
// grouped by what they do — the way Carbon, Atlassian and Primer group them —
// not by atomic size.

export type NavItem = {
  slug: string;
  label: string;
  /** Only set when not stable, so the menu stays quiet. */
  status?: ComponentStatus;
  /** One line for index cards. */
  description?: string;
};
export type NavGroup = { label: string; items: NavItem[]; status?: ComponentStatus };

// Patterns (/styleguide/dashboard) is hidden from the nav until there are
// enough security patterns to fill the section; the page still resolves.
export type SectionId = "get-started" | "foundations" | "components";
export type NavSection = {
  id: SectionId;
  label: string;
  /** Landing page of the section (header link). */
  href: string;
  groups: NavGroup[];
};

export const sections: NavSection[] = [
  {
    id: "get-started",
    label: "Get started",
    href: "/styleguide/overview",
    groups: [
      {
        label: "Get started",
        items: [
          { slug: "overview",         label: "Introduction" },
          { slug: "ai",               label: "Built for AI" },
          { slug: "principles",       label: "Design principles" },
          { slug: "contribution",     label: "Contributing" },
          { slug: "component-status", label: "Component status" },
        ],
      },
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    href: "/styleguide/colors",
    groups: [
      {
        label: "Styles",
        items: [
          { slug: "colors",     label: "Colors & tokens" },
          { slug: "typography", label: "Typography" },
          { slug: "spacing",    label: "Spacing & grid" },
          { slug: "shadow",     label: "Shadow" },
          { slug: "icons",      label: "Icons" },
        ],
      },
      {
        label: "Guidelines",
        items: [
          { slug: "accessibility",   label: "Accessibility" },
          { slug: "theming",         label: "Theming" },
          { slug: "layout-behavior", label: "Layout & behavior" },
        ],
      },
    ],
  },
  {
    id: "components",
    label: "Components",
    href: "/styleguide/components",
    groups: [
      {
        label: "Components",
        items: [{ slug: "components", label: "All components" }],
      },
      {
        // Sentinel's own domain components — the reason it isn't a generic system.
        label: "Security",
        items: [
          { slug: "severity-badge", label: "Severity badge", description: "A finding's severity, Critical to Info, with an optional score." },
          { slug: "severity-bar",   label: "Severity bar",   status: "beta", description: "Splits a set of findings by severity in one bar." },
          { slug: "cvss-score",     label: "CVSS score",     status: "beta", description: "A CVSS score with its rating and the vector in plain words." },
          { slug: "cve-tag",        label: "CVE tag",        status: "beta", description: "A CVE ID with exploit signals: KEV and EPSS." },
          { slug: "finding-status", label: "Finding status", status: "beta", description: "Where a finding is in its lifecycle, Open to Resolved." },
          { slug: "indicator",      label: "Indicator",      status: "beta", description: "An IOC — IP, domain, URL, hash — with verdict and copy." },
          { slug: "masked-value",   label: "Masked value",   status: "beta", description: "A secret shown masked, with reveal and copy." },
          { slug: "scan-progress",  label: "Scan progress",  status: "beta", description: "The stages of a scan and where it is now." },
        ],
      },
      {
        label: "Actions",
        items: [
          { slug: "button", label: "Button", description: "Starts an action on the current page: save, run a scan, delete." },
        ],
      },
      {
        label: "Forms",
        items: [
          { slug: "text-field",   label: "Text field",     description: "Single-line input for short text: names, domains, IPs." },
          { slug: "textarea",     label: "Textarea",       description: "Multi-line plain text for notes and descriptions." },
          { slug: "select",       label: "Select",         status: "beta", description: "Picks one value from a list of options." },
          { slug: "checkbox",     label: "Checkbox",       status: "beta", description: "Turns an option on or off, or picks several items." },
          { slug: "switch-radio", label: "Switch · Radio", description: "A setting that applies at once, or one choice from a few." },
          { slug: "search-bar",   label: "Search bar",     description: "Searches or filters content, with a clear button." },
          { slug: "text-space",   label: "Text space",     description: "Rich-text composer for reports and comments." },
        ],
      },
      {
        label: "Feedback",
        items: [
          { slug: "alert",         label: "Alert",           description: "A message about a page or section that stays until resolved." },
          { slug: "toast-tooltip", label: "Toast · Tooltip", description: "Brief confirmations, and short hints on hover or focus." },
          { slug: "spinner",       label: "Spinner",         status: "alpha", description: "Indeterminate loading for short waits." },
          { slug: "skeleton",      label: "Skeleton",        status: "beta",  description: "Placeholder that mirrors content while it loads." },
          { slug: "empty-state",   label: "Empty state",     description: "Explains why a region is empty and what to do next." },
          { slug: "banner",        label: "Banner",          status: "deprecated", description: "Replaced by a full-width Alert." },
        ],
      },
      {
        label: "Data display",
        items: [
          { slug: "badge-tag",      label: "Badge · Tag",    description: "Labels an object with a status or a category." },
          { slug: "cards",          label: "Cards",          description: "Dashboard cards that summarise a topic and lead to a next step." },
          { slug: "data-table",     label: "Data table",     description: "Lists findings with headers, rows and pagination." },
          { slug: "chart",          label: "Chart",          description: "Donut, bar, line and treemap charts in a shared card." },
          { slug: "gauge",          label: "Gauge",          description: "One value against a maximum, like a security score." },
          { slug: "activity-timeline", label: "Activity timeline", status: "beta", description: "Time-ordered events: incidents and audit trails." },
        ],
      },
      {
        label: "Navigation",
        items: [
          { slug: "tabs",       label: "Tabs",       description: "Switches between views of the same object." },
          { slug: "breadcrumb", label: "Breadcrumb", description: "Shows where a page sits and links back up." },
          { slug: "filter-bar", label: "Filter bar", description: "Search, filters and view actions above a table." },
          { slug: "sidebar",    label: "Sidebar",    description: "Primary app navigation, expanded or collapsed." },
          { slug: "top-bar",    label: "Top bar",    description: "Persistent header with search, alerts and account." },
        ],
      },
      {
        label: "Overlays",
        items: [
          { slug: "modal", label: "Modal", description: "A dialog that asks for a decision or focused input." },
        ],
      },
    ],
  },
];

/** Every group, in order — for search and index pages. */
export const navGroups: NavGroup[] = sections.flatMap((s) => s.groups);

/** Component groups only, without the "All components" index link. */
export const componentGroups: NavGroup[] = sections
  .find((s) => s.id === "components")!
  .groups.filter((g) => g.label !== "Components");

function slugOf(pathname: string | null): string | undefined {
  return pathname?.match(/^\/styleguide\/([^/?#]+)/)?.[1];
}

export function sectionForPath(pathname: string | null): NavSection | undefined {
  const slug = slugOf(pathname);
  if (!slug) return undefined;
  return sections.find((s) => s.groups.some((g) => g.items.some((i) => i.slug === slug)));
}

export function findGroupForPath(pathname: string | null): string | undefined {
  const slug = slugOf(pathname);
  return navGroups.find((g) => g.items.some((i) => i.slug === slug))?.label;
}
