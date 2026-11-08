// Figma library for the design system, plus the page that documents each
// styleguide slug. Node ids come from the Figma file (page ids, "3:2" → "3-2"
// in URLs). Slugs without an entry (site chrome, patterns, prose pages) have
// no Figma counterpart, so the "Open in Figma" action is hidden there.

export const FIGMA_FILE_URL = "https://www.figma.com/design/8o9lKCRex1Bu2mp6zcJxEq/Sentinel-Design-System";

const COVER = "0:1";

export const FIGMA_PAGES: Record<string, string> = {
  // Foundations live as variables / styles; the Cover shows them in light + dark.
  theming:          COVER,
  colors:           COVER,
  typography:       COVER,
  spacing:          COVER,
  shadow:           COVER,
  overview:         COVER,
  icons:            "5:50",
  // Atoms
  button:           "3:2",
  "text-field":     "4:2",
  textarea:         "6:134",
  select:           "6:56",
  checkbox:         "4:56",
  "switch-radio":   "4:126",
  "badge-tag":      "3:58",
  "severity-badge": "3:96",
  alert:            "6:214",
  "toast-tooltip":  "7:50",
  spinner:          "7:124",
  skeleton:         "7:150",
  banner:           "6:267",
  // Molecules
  "search-bar":     "6:164",
  tabs:             "8:50",
  breadcrumb:       "8:71",
  "filter-bar":     "9:50",
  // Organisms
  modal:            "10:50",
  "empty-state":    "11:50",
  cards:            "12:50",
  gauge:            "11:212",
  "data-table":     "13:50",
  chart:            "14:50",
  "text-space":     "15:50",
};

export function figmaUrlFor(slug: string): string | null {
  const node = FIGMA_PAGES[slug];
  return node ? `${FIGMA_FILE_URL}?node-id=${node.replace(":", "-")}` : null;
}
