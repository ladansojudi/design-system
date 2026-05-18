export type TypographyGroup = "display" | "heading" | "body" | "label" | "caption" | "overline" | "code";

export type TypographyEntry = {
  name:      string;
  group:     TypographyGroup;
  className: string;
  /** Realistic UI text showing how this style is used in practice. */
  example:   string;
  specs: {
    size:           string;
    weight:         string;
    lineHeight:     string;
    letterSpacing?: string;
    transform?:     string;
    family?:        string;
  };
};

export const typographyScale: TypographyEntry[] = [
  // ── Display ───────────────────────────────────────────────────────────
  {
    name:      "display-lg",
    group:     "display",
    example:   "Security at every layer.",
    className: "text-[48px] font-bold leading-[1.1] tracking-[-0.02em]",
    specs: { size: "48px", weight: "Bold", lineHeight: "1.1", letterSpacing: "-0.02em" },
  },
  {
    name:      "display-md",
    group:     "display",
    example:   "Find threats before they find you.",
    className: "text-[36px] font-bold leading-[1.15] tracking-[-0.02em]",
    specs: { size: "36px", weight: "Bold", lineHeight: "1.15", letterSpacing: "-0.02em" },
  },

  // ── Heading ───────────────────────────────────────────────────────────
  {
    name:      "heading-h1",
    group:     "heading",
    example:   "Settings overview",
    className: "text-[28px] font-bold leading-[1.2] tracking-[-0.01em]",
    specs: { size: "28px", weight: "Bold", lineHeight: "1.2", letterSpacing: "-0.01em" },
  },
  {
    name:      "heading-h2",
    group:     "heading",
    example:   "Authentication",
    className: "text-[22px] font-semibold leading-[1.25]",
    specs: { size: "22px", weight: "SemiBold", lineHeight: "1.25" },
  },
  {
    name:      "heading-h3",
    group:     "heading",
    example:   "Two-factor authentication",
    className: "text-[18px] font-semibold leading-[1.3]",
    specs: { size: "18px", weight: "SemiBold", lineHeight: "1.3" },
  },
  {
    name:      "heading-h4",
    group:     "heading",
    example:   "SMS verification",
    className: "text-[16px] font-semibold leading-[1.4]",
    specs: { size: "16px", weight: "SemiBold", lineHeight: "1.4" },
  },
  {
    name:      "heading-h5",
    group:     "heading",
    example:   "Backup codes",
    className: "text-[14px] font-semibold leading-[1.4]",
    specs: { size: "14px", weight: "SemiBold", lineHeight: "1.4" },
  },

  // ── Body ──────────────────────────────────────────────────────────────
  {
    name:      "body-lg",
    group:     "body",
    example:   "Configure your account to use stronger sign-in protections. Two-factor authentication adds a second layer of security to every sign-in.",
    className: "text-[16px] font-normal leading-[1.6]",
    specs: { size: "16px", weight: "Regular", lineHeight: "1.6" },
  },
  {
    name:      "body-md",
    group:     "body",
    example:   "Real-time alerts notify you within seconds when a critical finding lands in your environment.",
    className: "text-[14px] font-normal leading-[1.55]",
    specs: { size: "14px", weight: "Regular", lineHeight: "1.55" },
  },
  {
    name:      "body-sm",
    group:     "body",
    example:   "Manage how your data is processed across regions and retention windows.",
    className: "text-[13px] font-normal leading-[1.55]",
    specs: { size: "13px", weight: "Regular", lineHeight: "1.55" },
  },

  // ── Label ─────────────────────────────────────────────────────────────
  {
    name:      "label-md",
    group:     "label",
    example:   "Email address",
    className: "text-[13px] font-medium leading-[1.4]",
    specs: { size: "13px", weight: "Medium", lineHeight: "1.4" },
  },
  {
    name:      "label-sm",
    group:     "label",
    example:   "Status",
    className: "text-[11px] font-medium leading-[1.4]",
    specs: { size: "11px", weight: "Medium", lineHeight: "1.4" },
  },

  // ── Caption ───────────────────────────────────────────────────────────
  {
    name:      "caption",
    group:     "caption",
    example:   "We will never share your email with third parties.",
    className: "text-[12px] font-normal leading-[1.4]",
    specs: { size: "12px", weight: "Regular", lineHeight: "1.4" },
  },

  // ── Overline ──────────────────────────────────────────────────────────
  {
    name:      "overline",
    group:     "overline",
    example:   "Critical findings",
    className: "text-[10px] font-semibold leading-[1.4] tracking-[0.1em] uppercase",
    specs: {
      size:           "10px",
      weight:         "SemiBold",
      lineHeight:     "1.4",
      letterSpacing:  "0.1em",
      transform:      "uppercase",
    },
  },

  // ── Code / Mono ───────────────────────────────────────────────────────
  {
    name:      "code-md",
    group:     "code",
    example:   "--s4e-brand-primary-500",
    className: "text-[13px] font-normal leading-[1.55] font-mono",
    specs: { size: "13px", weight: "Regular", lineHeight: "1.55", family: "IBM Plex Mono" },
  },
  {
    name:      "code-sm",
    group:     "code",
    example:   "npm install @s4e/design-system",
    className: "text-[12px] font-normal leading-[1.55] font-mono",
    specs: { size: "12px", weight: "Regular", lineHeight: "1.55", family: "IBM Plex Mono" },
  },
];

export const GROUP_LABELS: Record<TypographyGroup, string> = {
  display:  "Display",
  heading:  "Heading",
  body:     "Body",
  label:    "Label",
  caption:  "Caption",
  overline: "Overline",
  code:     "Code · Mono",
};

export const GROUP_DESCRIPTIONS: Record<TypographyGroup, string> = {
  display:  "Marketing pages, hero sections, large numeric data displays. Used sparingly.",
  heading:  "Page and section hierarchy. Drop one level per nesting depth — never skip.",
  body:     "Long-form reading content. Default to body-md in dense product UI.",
  label:    "Form labels, badges, table column headers — short non-prose UI text.",
  caption:  "Helper text under inputs, meta info, table descriptions.",
  overline: "Small all-caps section markers above titles, category chips.",
  code:     "Tokens, code snippets, hex values, monospaced data.",
};
