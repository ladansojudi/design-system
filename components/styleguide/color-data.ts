export type ColorEntry = {
  name: string;
  lightHex: string;
  darkHex: string;
  bgClass: string;
};

export type ColorGroup = {
  name: string;
  description: string;
  colors: ColorEntry[];
};

export const colorGroups: ColorGroup[] = [
  {
    name: "Severity",
    description:
      "Represents security risk levels only. Must never be used for any other purpose.",
    colors: [
      {
        name: "Severity/Info",
        lightHex: "#A8A29E",
        darkHex: "#A8A29E",
        bgClass: "bg-snt-severity-info",
      },
      {
        name: "Severity/Low",
        lightHex: "#1B9E8F",
        darkHex: "#1B9E8F",
        bgClass: "bg-snt-severity-low",
      },
      {
        name: "Severity/Medium",
        lightHex: "#F0AD1D",
        darkHex: "#F0AD1D",
        bgClass: "bg-snt-severity-medium",
      },
      {
        name: "Severity/High",
        lightHex: "#E5532D",
        darkHex: "#E5532D",
        bgClass: "bg-snt-severity-high",
      },
      {
        name: "Severity/Critical",
        lightHex: "#B4136C",
        darkHex: "#B4136C",
        bgClass: "bg-snt-severity-critical",
      },
    ],
  },
  {
    name: "Severity / Subtle",
    description: "Tint behind a severity chip or row. Derived from the severity colour, never from a feedback scale.",
    colors: [
      {
        name: "Severity Subtle/Info",
        lightHex: "#F6F6F5",
        darkHex: "#262525",
        bgClass: "bg-snt-severity-info-subtle",
      },
      {
        name: "Severity Subtle/Low",
        lightHex: "#E8F5F4",
        darkHex: "#0C2423",
        bgClass: "bg-snt-severity-low-subtle",
      },
      {
        name: "Severity Subtle/Medium",
        lightHex: "#FEF7E8",
        darkHex: "#33270E",
        bgClass: "bg-snt-severity-medium-subtle",
      },
      {
        name: "Severity Subtle/High",
        lightHex: "#FCEEEA",
        darkHex: "#311611",
        bgClass: "bg-snt-severity-high-subtle",
      },
      {
        name: "Severity Subtle/Critical",
        lightHex: "#F8E7F0",
        darkHex: "#280B1C",
        bgClass: "bg-snt-severity-critical-subtle",
      },
    ],
  },
  {
    name: "Severity / Border",
    description: "Outline for a severity chip. Derived from the severity colour, never from a feedback scale.",
    colors: [
      {
        name: "Severity Border/Info",
        lightHex: "#DCDAD8",
        darkHex: "#494646",
        bgClass: "bg-snt-severity-info-border",
      },
      {
        name: "Severity Border/Low",
        lightHex: "#A4D8D2",
        darkHex: "#104540",
        bgClass: "bg-snt-severity-low-border",
      },
      {
        name: "Severity Border/Medium",
        lightHex: "#F9DEA5",
        darkHex: "#654B12",
        bgClass: "bg-snt-severity-medium-border",
      },
      {
        name: "Severity Border/High",
        lightHex: "#F5BAAB",
        darkHex: "#612719",
        bgClass: "bg-snt-severity-high-border",
      },
      {
        name: "Severity Border/Critical",
        lightHex: "#E1A1C4",
        darkHex: "#4D0D32",
        bgClass: "bg-snt-severity-critical-border",
      },
    ],
  },
  {
    name: "Severity / Text",
    description: "Text colour on the subtle tint (AA). Derived from the severity colour, never from a feedback scale.",
    colors: [
      {
        name: "Severity Text/Info",
        lightHex: "#726F6D",
        darkHex: "#A8A29E",
        bgClass: "bg-snt-severity-info-text",
      },
      {
        name: "Severity Text/Low",
        lightHex: "#177C71",
        darkHex: "#1B9E8F",
        bgClass: "bg-snt-severity-low-text",
      },
      {
        name: "Severity Text/Medium",
        lightHex: "#8C6615",
        darkHex: "#F0AD1D",
        bgClass: "bg-snt-severity-medium-text",
      },
      {
        name: "Severity Text/High",
        lightHex: "#BC4527",
        darkHex: "#E65C38",
        bgClass: "bg-snt-severity-high-text",
      },
      {
        name: "Severity Text/Critical",
        lightHex: "#B4136C",
        darkHex: "#CB5A98",
        bgClass: "bg-snt-severity-critical-text",
      },
    ],
  },
  {
    name: "Brand / Primary",
    description:
      "Main brand color. Used for buttons, links, active states, and primary CTAs.",
    colors: [
      {
        name: "Brand/Primary-50",
        lightHex: "#EEF0FF",
        darkHex: "#1B1A3F",
        bgClass: "bg-snt-brand-primary-50",
      },
      {
        name: "Brand/Primary-100",
        lightHex: "#E0E3FF",
        darkHex: "#25236A",
        bgClass: "bg-snt-brand-primary-100",
      },
      {
        name: "Brand/Primary-200",
        lightHex: "#C7CCFE",
        darkHex: "#3730A3",
        bgClass: "bg-snt-brand-primary-200",
      },
      {
        name: "Brand/Primary-500",
        lightHex: "#5B5BD6",
        darkHex: "#818CF8",
        bgClass: "bg-snt-brand-primary-500",
      },
      {
        name: "Brand/Primary-600",
        lightHex: "#4F46E5",
        darkHex: "#A5B4FC",
        bgClass: "bg-snt-brand-primary-600",
      },
      {
        name: "Brand/Primary-700",
        lightHex: "#4338CA",
        darkHex: "#C7D2FE",
        bgClass: "bg-snt-brand-primary-700",
      },
      {
        name: "Brand/Primary-800",
        lightHex: "#312E81",
        darkHex: "#E0E7FF",
        bgClass: "bg-snt-brand-primary-800",
      },
    ],
  },
  {
    name: "Scale / Blue",
    description: "Neutral blue tones for informational content and info states.",
    colors: [
      {
        name: "Scale/Blue-50",
        lightHex: "#F7FAFD",
        darkHex: "#18374E",
        bgClass: "bg-snt-scale-blue-50",
      },
      {
        name: "Scale/Blue-100",
        lightHex: "#E8F1F8",
        darkHex: "#234F70",
        bgClass: "bg-snt-scale-blue-100",
      },
      {
        name: "Scale/Blue-200",
        lightHex: "#C9DEEE",
        darkHex: "#2F6893",
        bgClass: "bg-snt-scale-blue-200",
      },
      {
        name: "Scale/Blue-500",
        lightHex: "#7DAFD6",
        darkHex: "#7DAFD6",
        bgClass: "bg-snt-scale-blue-500",
      },
      {
        name: "Scale/Blue-600",
        lightHex: "#2F6893",
        darkHex: "#C9DEEE",
        bgClass: "bg-snt-scale-blue-600",
      },
    ],
  },
  {
    name: "Scale / Green",
    description: "Used for success, completion, and positive states.",
    colors: [
      {
        name: "Scale/Green-50",
        lightHex: "#F1FFDB",
        darkHex: "#192900",
        bgClass: "bg-snt-scale-green-50",
      },
      {
        name: "Scale/Green-100",
        lightHex: "#E8FFC2",
        darkHex: "#294200",
        bgClass: "bg-snt-scale-green-100",
      },
      {
        name: "Scale/Green-200",
        lightHex: "#B7E35D",
        darkHex: "#3F6600",
        bgClass: "bg-snt-scale-green-200",
      },
      {
        name: "Scale/Green-500",
        lightHex: "#63A100",
        darkHex: "#63A100",
        bgClass: "bg-snt-scale-green-500",
      },
      {
        name: "Scale/Green-600",
        lightHex: "#3F6600",
        darkHex: "#B7E35D",
        bgClass: "bg-snt-scale-green-600",
      },
    ],
  },
  {
    name: "Scale / Yellow",
    description: "Used for warnings and situations that require attention.",
    colors: [
      {
        name: "Scale/Yellow-50",
        lightHex: "#FEFAF0",
        darkHex: "#443104",
        bgClass: "bg-snt-scale-yellow-50",
      },
      {
        name: "Scale/Yellow-100",
        lightHex: "#FCEBC5",
        darkHex: "#795706",
        bgClass: "bg-snt-scale-yellow-100",
      },
      {
        name: "Scale/Yellow-200",
        lightHex: "#F8D072",
        darkHex: "#DA9C0B",
        bgClass: "bg-snt-scale-yellow-200",
      },
      {
        name: "Scale/Yellow-500",
        lightHex: "#F5BF40",
        darkHex: "#F5BF40",
        bgClass: "bg-snt-scale-yellow-500",
      },
      {
        name: "Scale/Yellow-600",
        lightHex: "#DA9C0B",
        darkHex: "#F8D072",
        bgClass: "bg-snt-scale-yellow-600",
      },
      {
        name: "Scale/Yellow-700",
        lightHex: "#795706",
        darkHex: "#FCEBC5",
        bgClass: "bg-snt-scale-yellow-700",
      },
    ],
  },
  {
    name: "Scale / Red",
    description: "Used for errors, destructive actions, and danger states.",
    colors: [
      {
        name: "Scale/Red-50",
        lightHex: "#FCF3F2",
        darkHex: "#471510",
        bgClass: "bg-snt-scale-red-50",
      },
      {
        name: "Scale/Red-100",
        lightHex: "#F4D1CD",
        darkHex: "#712219",
        bgClass: "bg-snt-scale-red-100",
      },
      {
        name: "Scale/Red-200",
        lightHex: "#EBAAA3",
        darkHex: "#8E2A1F",
        bgClass: "bg-snt-scale-red-200",
      },
      {
        name: "Scale/Red-500",
        lightHex: "#D13D2E",
        darkHex: "#D13D2E",
        bgClass: "bg-snt-scale-red-500",
      },
      {
        name: "Scale/Red-600",
        lightHex: "#8E2A1F",
        darkHex: "#EBAAA3",
        bgClass: "bg-snt-scale-red-600",
      },
      {
        name: "Scale/Red-700",
        lightHex: "#712219",
        darkHex: "#F4D1CD",
        bgClass: "bg-snt-scale-red-700",
      },
    ],
  },
  {
    name: "Neutral / Grey",
    description:
      "UI backbone. Used for text, backgrounds, borders, and disabled states.",
    colors: [
      {
        name: "Neutral/Grey-00",
        lightHex: "#FFFFFF",
        darkHex: "#09090B",
        bgClass: "bg-snt-neutral-grey-00",
      },
      {
        name: "Neutral/Grey-50",
        lightHex: "#FAFAFA",
        darkHex: "#0E0E10",
        bgClass: "bg-snt-neutral-grey-50",
      },
      {
        name: "Neutral/Grey-100",
        lightHex: "#F4F4F5",
        darkHex: "#18181B",
        bgClass: "bg-snt-neutral-grey-100",
      },
      {
        name: "Neutral/Grey-200",
        lightHex: "#E4E4E7",
        darkHex: "#27272A",
        bgClass: "bg-snt-neutral-grey-200",
      },
      {
        name: "Neutral/Grey-300",
        lightHex: "#D4D4D8",
        darkHex: "#3F3F46",
        bgClass: "bg-snt-neutral-grey-300",
      },
      {
        name: "Neutral/Grey-400",
        lightHex: "#8F8F98",
        darkHex: "#65656F",
        bgClass: "bg-snt-neutral-grey-400",
      },
      {
        name: "Neutral/Grey-500",
        lightHex: "#71717A",
        darkHex: "#8F8F98",
        bgClass: "bg-snt-neutral-grey-500",
      },
      {
        name: "Neutral/Grey-600",
        lightHex: "#52525B",
        darkHex: "#A1A1AA",
        bgClass: "bg-snt-neutral-grey-600",
      },
      {
        name: "Neutral/Grey-800",
        lightHex: "#27272A",
        darkHex: "#F4F4F5",
        bgClass: "bg-snt-neutral-grey-800",
      },
      {
        name: "Neutral/Grey-900",
        lightHex: "#18181B",
        darkHex: "#FAFAFA",
        bgClass: "bg-snt-neutral-grey-900",
      },
    ],
  },
  {
    name: "Neutral / Divider",
    description:
      "Used for visual separation between elements. Lines, borders, and dividers.",
    colors: [
      {
        name: "Neutral/Divider-10",
        lightHex: "rgba(9, 9, 11, 0.08)",
        darkHex: "rgba(255, 255, 255, 0.08)",
        bgClass: "bg-snt-neutral-divider-10",
      },
      {
        name: "Neutral/Divider-20",
        lightHex: "rgba(9, 9, 11, 0.14)",
        darkHex: "rgba(255, 255, 255, 0.14)",
        bgClass: "bg-snt-neutral-divider-20",
      },
    ],
  },
  {
    name: "Surface",
    description:
      "Page, card, and table backgrounds. Creates layered depth in the interface.",
    colors: [
      {
        name: "Surface/App",
        lightHex: "#FFFFFF",
        darkHex: "#09090B",
        bgClass: "bg-snt-surface-app",
      },
      {
        name: "Surface/Page",
        lightHex: "#FAFAFA",
        darkHex: "#0C0C0E",
        bgClass: "bg-snt-surface-page",
      },
      {
        name: "Surface/Row",
        lightHex: "#FFFFFF",
        darkHex: "#09090B",
        bgClass: "bg-snt-surface-row",
      },
      {
        name: "Surface/Row Hover",
        lightHex: "#F4F4F5",
        darkHex: "#18181B",
        bgClass: "bg-snt-surface-row-hover",
      },
      {
        name: "Surface/Table-Header",
        lightHex: "#F4F4F5",
        darkHex: "#111113",
        bgClass: "bg-snt-surface-table-header",
      },
    ],
  },
  {
    name: "Feedback",
    description:
      "Used for informational, success, warning, and error messages. Must never visually resemble severity colors.",
    colors: [
      {
        name: "Feedback/Info",
        lightHex: "#7DAFD6",
        darkHex: "#7DAFD6",
        bgClass: "bg-snt-feedback-info",
      },
      {
        name: "Feedback/Success",
        lightHex: "#63A100",
        darkHex: "#63A100",
        bgClass: "bg-snt-feedback-success",
      },
      {
        name: "Feedback/Warning",
        lightHex: "#E6A200",
        darkHex: "#E6A200",
        bgClass: "bg-snt-feedback-warning",
      },
      {
        name: "Feedback/Alert",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-snt-feedback-alert",
      },
    ],
  },
  {
    name: "Data",
    description:
      "Used in charts and data visualizations to distinguish between categories. Chosen to avoid confusion with severity colors.",
    colors: [
      {
        name: "Data/Category-1",
        lightHex: "#4F46E5",
        darkHex: "#818CF8",
        bgClass: "bg-snt-data-1",
      },
      {
        name: "Data/Category-2",
        lightHex: "#0EA5E9",
        darkHex: "#38BDF8",
        bgClass: "bg-snt-data-2",
      },
      {
        name: "Data/Category-3",
        lightHex: "#8B5CF6",
        darkHex: "#A78BFA",
        bgClass: "bg-snt-data-3",
      },
      {
        name: "Data/Category-4",
        lightHex: "#64748B",
        darkHex: "#94A3B8",
        bgClass: "bg-snt-data-4",
      },
      {
        name: "Data/Category-5",
        lightHex: "#65A30D",
        darkHex: "#A3E635",
        bgClass: "bg-snt-data-5",
      },
      {
        name: "Data/Category-6",
        lightHex: "#BE7C4D",
        darkHex: "#D6A77A",
        bgClass: "bg-snt-data-6",
      },
      {
        name: "Data/Category-7",
        lightHex: "#1E3A8A",
        darkHex: "#93C5FD",
        bgClass: "bg-snt-data-7",
      },
      {
        name: "Data/Category-8",
        lightHex: "#C7D2FE",
        darkHex: "#3730A3",
        bgClass: "bg-snt-data-8",
      },
    ],
  },
  {
    name: "Typography",
    description: "Structural and semantic text colors. Contrast ratios meet WCAG AA standards.",
    colors: [
      {
        name: "Text/Primary",
        lightHex: "#09090B",
        darkHex: "#FAFAFA",
        bgClass: "bg-snt-text-primary",
      },
      {
        name: "Text/Secondary",
        lightHex: "#52525B",
        darkHex: "#A1A1AA",
        bgClass: "bg-snt-text-secondary",
      },
      {
        name: "Text/Disabled",
        lightHex: "#A1A1AA",
        darkHex: "#52525B",
        bgClass: "bg-snt-text-disabled",
      },
      {
        name: "Text/Placeholder",
        lightHex: "#71717A",
        darkHex: "#8F8F98",
        bgClass: "bg-snt-text-placeholder",
      },
      {
        name: "Text/Inverse",
        lightHex: "#FFFFFF",
        darkHex: "#09090B",
        bgClass: "bg-snt-text-inverse",
      },
      {
        name: "Text/On-Accent",
        lightHex: "#FFFFFF",
        darkHex: "#FFFFFF",
        bgClass: "bg-snt-text-on-accent",
      },
      {
        name: "Text/Link",
        lightHex: "#4F46E5",
        darkHex: "#A5B4FC",
        bgClass: "bg-snt-text-link",
      },
      {
        name: "Text/Brand",
        lightHex: "#4F46E5",
        darkHex: "#A5B4FC",
        bgClass: "bg-snt-text-brand",
      },
      {
        name: "Text/Success",
        lightHex: "#2F7D2C",
        darkHex: "#6FD367",
        bgClass: "bg-snt-text-success",
      },
      {
        name: "Text/Warning",
        lightHex: "#8E6800",
        darkHex: "#F5BF40",
        bgClass: "bg-snt-text-warning",
      },
      {
        name: "Text/Error",
        lightHex: "#B0291E",
        darkHex: "#F87171",
        bgClass: "bg-snt-text-error",
      },
      {
        name: "Text/Info",
        lightHex: "#2F6893",
        darkHex: "#67A9DC",
        bgClass: "bg-snt-text-info",
      },
    ],
  },
];
