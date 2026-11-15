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
    className: "text-snt-48 font-bold leading-[1.1] tracking-[-0.02em]",
    specs: { size: "48px", weight: "Bold", lineHeight: "1.1", letterSpacing: "-0.02em" },
  },
  {
    name:      "display-md",
    group:     "display",
    example:   "Find threats before they find you.",
    className: "text-snt-32 font-bold leading-[1.15] tracking-[-0.02em]",
    specs: { size: "32px", weight: "Bold", lineHeight: "1.15", letterSpacing: "-0.02em" },
  },

  // ── Heading ───────────────────────────────────────────────────────────
  {
    name:      "heading-h1",
    group:     "heading",
    example:   "Settings overview",
    className: "text-snt-24 font-bold leading-[1.2] tracking-[-0.01em]",
    specs: { size: "24px", weight: "Bold", lineHeight: "1.2", letterSpacing: "-0.01em" },
  },
  {
    name:      "heading-h2",
    group:     "heading",
    example:   "Authentication",
    className: "text-snt-20 font-semibold leading-[1.25]",
    specs: { size: "20px", weight: "SemiBold", lineHeight: "1.25" },
  },
  {
    name:      "heading-h3",
    group:     "heading",
    example:   "Two-factor authentication",
    className: "text-snt-18 font-semibold leading-[1.3]",
    specs: { size: "18px", weight: "SemiBold", lineHeight: "1.3" },
  },
  {
    name:      "heading-h4",
    group:     "heading",
    example:   "SMS verification",
    className: "text-snt-16 font-semibold leading-[1.4]",
    specs: { size: "16px", weight: "SemiBold", lineHeight: "1.4" },
  },
  {
    name:      "heading-h5",
    group:     "heading",
    example:   "Backup codes",
    className: "text-snt-14 font-semibold leading-[1.4]",
    specs: { size: "14px", weight: "SemiBold", lineHeight: "1.4" },
  },

  // ── Body ──────────────────────────────────────────────────────────────
  {
    name:      "body-lg",
    group:     "body",
    example:   "Configure your account to use stronger sign-in protections. Two-factor authentication adds a second layer of security to every sign-in.",
    className: "text-snt-16 font-normal leading-[1.6]",
    specs: { size: "16px", weight: "Regular", lineHeight: "1.6" },
  },
  {
    name:      "body-md",
    group:     "body",
    example:   "Real-time alerts notify you within seconds when a critical finding lands in your environment.",
    className: "text-snt-14 font-normal leading-[1.55]",
    specs: { size: "14px", weight: "Regular", lineHeight: "1.55" },
  },
  {
    name:      "body-sm",
    group:     "body",
    example:   "Manage how your data is processed across regions and retention windows.",
    className: "text-snt-12 font-normal leading-[1.55]",
    specs: { size: "12px", weight: "Regular", lineHeight: "1.55" },
  },

  // ── Label ─────────────────────────────────────────────────────────────
  {
    name:      "label-md",
    group:     "label",
    example:   "Email address",
    className: "text-snt-14 font-medium leading-[1.4]",
    specs: { size: "14px", weight: "Medium", lineHeight: "1.4" },
  },
  {
    name:      "label-sm",
    group:     "label",
    example:   "Status",
    className: "text-snt-11 font-medium leading-[1.4]",
    specs: { size: "11px", weight: "Medium", lineHeight: "1.4" },
  },

  // ── Caption ───────────────────────────────────────────────────────────
  {
    name:      "caption",
    group:     "caption",
    example:   "We will never share your email with third parties.",
    className: "text-snt-12 font-normal leading-[1.4]",
    specs: { size: "12px", weight: "Regular", lineHeight: "1.4" },
  },

  // ── Overline ──────────────────────────────────────────────────────────
  {
    name:      "overline",
    group:     "overline",
    example:   "Critical findings",
    className: "text-snt-10 font-semibold leading-[1.4] tracking-[0.1em] uppercase",
    specs: {
      size: "10px",
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
    example:   "--snt-brand-primary-500",
    className: "text-snt-14 font-normal leading-[1.55] font-mono",
    specs: { size: "14px", weight: "Regular", lineHeight: "1.55", family: "Geist Mono" },
  },
  {
    name:      "code-sm",
    group:     "code",
    example:   "npm install @sentinel/design-system",
    className: "text-snt-12 font-normal leading-[1.55] font-mono",
    specs: { size: "12px", weight: "Regular", lineHeight: "1.55", family: "Geist Mono" },
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
