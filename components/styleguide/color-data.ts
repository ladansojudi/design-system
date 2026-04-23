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
        lightHex: "#7DAFD6",
        darkHex: "#7DAFD6",
        bgClass: "bg-s4e-severity-info",
      },
      {
        name: "Severity/Low",
        lightHex: "#63A100",
        darkHex: "#63A100",
        bgClass: "bg-s4e-severity-low",
      },
      {
        name: "Severity/Medium",
        lightHex: "#F5BF40",
        darkHex: "#F5BF40",
        bgClass: "bg-s4e-severity-medium",
      },
      {
        name: "Severity/High",
        lightHex: "#D13D2E",
        darkHex: "#D13D2E",
        bgClass: "bg-s4e-severity-high",
      },
      {
        name: "Severity/Critical",
        lightHex: "#772ED1",
        darkHex: "#772ED1",
        bgClass: "bg-s4e-severity-critical",
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
        lightHex: "#EBF2F7",
        darkHex: "#01324C",
        bgClass: "bg-s4e-brand-primary-50",
      },
      {
        name: "Brand/Primary-100",
        lightHex: "#CDE5F2",
        darkHex: "#024A72",
        bgClass: "bg-s4e-brand-primary-100",
      },
      {
        name: "Brand/Primary-200",
        lightHex: "#9ACBE5",
        darkHex: "#0F69AA",
        bgClass: "bg-s4e-brand-primary-200",
      },
      {
        name: "Brand/Primary-500",
        lightHex: "#1383D4",
        darkHex: "#1383D4",
        bgClass: "bg-s4e-brand-primary-500",
      },
      {
        name: "Brand/Primary-600",
        lightHex: "#0F69AA",
        darkHex: "#9ACBE5",
        bgClass: "bg-s4e-brand-primary-600",
      },
      {
        name: "Brand/Primary-700",
        lightHex: "#024A72",
        darkHex: "#CDE5F2",
        bgClass: "bg-s4e-brand-primary-700",
      },
      {
        name: "Brand/Primary-800",
        lightHex: "#01324C",
        darkHex: "#EBF2F7",
        bgClass: "bg-s4e-brand-primary-800",
      },
    ],
  },
  {
    name: "Brand / Secondary",
    description:
      "Supporting brand color. Used for hover states, secondary buttons, and highlights.",
    colors: [
      {
        name: "Brand/Secondary-50",
        lightHex: "#FFF4F1",
        darkHex: "#82270C",
        bgClass: "bg-s4e-brand-secondary-50",
      },
      {
        name: "Brand/Secondary-100",
        lightHex: "#FFD9CE",
        darkHex: "#9B4F39",
        bgClass: "bg-s4e-brand-secondary-100",
      },
      {
        name: "Brand/Secondary-200",
        lightHex: "#FFAF97",
        darkHex: "#C1674D",
        bgClass: "bg-s4e-brand-secondary-200",
      },
      {
        name: "Brand/Secondary-500",
        lightHex: "#EE7B59",
        darkHex: "#EE7B59",
        bgClass: "bg-s4e-brand-secondary-500",
      },
      {
        name: "Brand/Secondary-600",
        lightHex: "#C1674D",
        darkHex: "#FFAF97",
        bgClass: "bg-s4e-brand-secondary-600",
      },
      {
        name: "Brand/Secondary-700",
        lightHex: "#9B4F39",
        darkHex: "#FFD9CE",
        bgClass: "bg-s4e-brand-secondary-700",
      },
      {
        name: "Brand/Secondary-800",
        lightHex: "#82270C",
        darkHex: "#FFF4F1",
        bgClass: "bg-s4e-brand-secondary-800",
      },
    ],
  },
  {
    name: "Scale / Blue",
    description: "Neutral blue tones for informational content and info states.",
    colors: [
      {
        name: "Scale/Blue-50",
        lightHex: "#F6FBFF",
        darkHex: "#183750",
        bgClass: "bg-s4e-scale-blue-50",
      },
      {
        name: "Scale/Blue-100",
        lightHex: "#E2F2FF",
        darkHex: "#1F5077",
        bgClass: "bg-s4e-scale-blue-100",
      },
      {
        name: "Scale/Blue-200",
        lightHex: "#C4DEF3",
        darkHex: "#2A6898",
        bgClass: "bg-s4e-scale-blue-200",
      },
      {
        name: "Scale/Blue-500",
        lightHex: "#7DAFD6",
        darkHex: "#7DAFD6",
        bgClass: "bg-s4e-scale-blue-500",
      },
      {
        name: "Scale/Blue-600",
        lightHex: "#2A6898",
        darkHex: "#C4DEF3",
        bgClass: "bg-s4e-scale-blue-600",
      },
      {
        name: "Scale/Blue-700",
        lightHex: "#1F5077",
        darkHex: "#E2F2FF",
        bgClass: "bg-s4e-scale-blue-700",
      },
      {
        name: "Scale/Blue-800",
        lightHex: "#183750",
        darkHex: "#F6FBFF",
        bgClass: "bg-s4e-scale-blue-800",
      },
    ],
  },
  {
    name: "Scale / Green",
    description: "Used for success, completion, and positive states.",
    colors: [
      {
        name: "Scale/Green-50",
        lightHex: "#EFF7E5",
        darkHex: "#192800",
        bgClass: "bg-s4e-scale-green-50",
      },
      {
        name: "Scale/Green-100",
        lightHex: "#E2F1CE",
        darkHex: "#284000",
        bgClass: "bg-s4e-scale-green-100",
      },
      {
        name: "Scale/Green-200",
        lightHex: "#9AD340",
        darkHex: "#406800",
        bgClass: "bg-s4e-scale-green-200",
      },
      {
        name: "Scale/Green-500",
        lightHex: "#63A100",
        darkHex: "#63A100",
        bgClass: "bg-s4e-scale-green-500",
      },
      {
        name: "Scale/Green-600",
        lightHex: "#406800",
        darkHex: "#9AD340",
        bgClass: "bg-s4e-scale-green-600",
      },
      {
        name: "Scale/Green-700",
        lightHex: "#284000",
        darkHex: "#E2F1CE",
        bgClass: "bg-s4e-scale-green-700",
      },
      {
        name: "Scale/Green-800",
        lightHex: "#192800",
        darkHex: "#EFF7E5",
        bgClass: "bg-s4e-scale-green-800",
      },
    ],
  },
  {
    name: "Scale / Yellow",
    description: "Used for warnings and situations that require attention.",
    colors: [
      {
        name: "Scale/Yellow-50",
        lightHex: "#FFFBF0",
        darkHex: "#473200",
        bgClass: "bg-s4e-scale-yellow-50",
      },
      {
        name: "Scale/Yellow-100",
        lightHex: "#FFEEC2",
        darkHex: "#805A00",
        bgClass: "bg-s4e-scale-yellow-100",
      },
      {
        name: "Scale/Yellow-200",
        lightHex: "#FFD66D",
        darkHex: "#E6A200",
        bgClass: "bg-s4e-scale-yellow-200",
      },
      {
        name: "Scale/Yellow-500",
        lightHex: "#F5BF40",
        darkHex: "#F5BF40",
        bgClass: "bg-s4e-scale-yellow-500",
      },
      {
        name: "Scale/Yellow-600",
        lightHex: "#E6A200",
        darkHex: "#FFD66D",
        bgClass: "bg-s4e-scale-yellow-600",
      },
      {
        name: "Scale/Yellow-700",
        lightHex: "#805A00",
        darkHex: "#FFEEC2",
        bgClass: "bg-s4e-scale-yellow-700",
      },
      {
        name: "Scale/Yellow-800",
        lightHex: "#473200",
        darkHex: "#FFFBF0",
        bgClass: "bg-s4e-scale-yellow-800",
      },
    ],
  },
  {
    name: "Scale / Red",
    description: "Used for errors, destructive actions, and danger states.",
    colors: [
      {
        name: "Scale/Red-50",
        lightHex: "#FFF0EF",
        darkHex: "#551300",
        bgClass: "bg-s4e-scale-red-50",
      },
      {
        name: "Scale/Red-100",
        lightHex: "#FFC6C2",
        darkHex: "#881F00",
        bgClass: "bg-s4e-scale-red-100",
      },
      {
        name: "Scale/Red-200",
        lightHex: "#FF9B90",
        darkHex: "#AE2700",
        bgClass: "bg-s4e-scale-red-200",
      },
      {
        name: "Scale/Red-500",
        lightHex: "#D13D2E",
        darkHex: "#D13D2E",
        bgClass: "bg-s4e-scale-red-500",
      },
      {
        name: "Scale/Red-600",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-scale-red-600",
      },
      {
        name: "Scale/Red-700",
        lightHex: "#881F00",
        darkHex: "#FFC6C2",
        bgClass: "bg-s4e-scale-red-700",
      },
      {
        name: "Scale/Red-800",
        lightHex: "#551300",
        darkHex: "#FFF0EF",
        bgClass: "bg-s4e-scale-red-800",
      },
    ],
  },
  {
    name: "Scale / Purple",
    description: "Used for critical severity and special emphasis.",
    colors: [
      {
        name: "Scale/Purple-50",
        lightHex: "#F8F2FF",
        darkHex: "#2F1450",
        bgClass: "bg-s4e-scale-purple-50",
      },
      {
        name: "Scale/Purple-100",
        lightHex: "#D9BCFF",
        darkHex: "#4F2187",
        bgClass: "bg-s4e-scale-purple-100",
      },
      {
        name: "Scale/Purple-200",
        lightHex: "#AA73ED",
        darkHex: "#5D21A5",
        bgClass: "bg-s4e-scale-purple-200",
      },
      {
        name: "Scale/Purple-500",
        lightHex: "#772ED1",
        darkHex: "#772ED1",
        bgClass: "bg-s4e-scale-purple-500",
      },
      {
        name: "Scale/Purple-600",
        lightHex: "#5D21A5",
        darkHex: "#AA73ED",
        bgClass: "bg-s4e-scale-purple-600",
      },
      {
        name: "Scale/Purple-700",
        lightHex: "#4F2187",
        darkHex: "#D9BCFF",
        bgClass: "bg-s4e-scale-purple-700",
      },
      {
        name: "Scale/Purple-800",
        lightHex: "#2F1450",
        darkHex: "#F8F2FF",
        bgClass: "bg-s4e-scale-purple-800",
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
        darkHex: "#0F1010",
        bgClass: "bg-s4e-neutral-grey-00",
      },
      {
        name: "Neutral/Grey-50",
        lightHex: "#FCFDFD",
        darkHex: "#131515",
        bgClass: "bg-s4e-neutral-grey-50",
      },
      {
        name: "Neutral/Grey-100",
        lightHex: "#F7F8F8",
        darkHex: "#1D2020",
        bgClass: "bg-s4e-neutral-grey-100",
      },
      {
        name: "Neutral/Grey-200",
        lightHex: "#F4F5F5",
        darkHex: "#444B4B",
        bgClass: "bg-s4e-neutral-grey-200",
      },
      {
        name: "Neutral/Grey-300",
        lightHex: "#DFE2E2",
        darkHex: "#667070",
        bgClass: "bg-s4e-neutral-grey-300",
      },
      {
        name: "Neutral/Grey-400",
        lightHex: "#C9CFCF",
        darkHex: "#949E9E",
        bgClass: "bg-s4e-neutral-grey-400",
      },
      {
        name: "Neutral/Grey-500",
        lightHex: "#949E9E",
        darkHex: "#C9CFCF",
        bgClass: "bg-s4e-neutral-grey-500",
      },
      {
        name: "Neutral/Grey-600",
        lightHex: "#667070",
        darkHex: "#E2E4E4",
        bgClass: "bg-s4e-neutral-grey-600",
      },
      {
        name: "Neutral/Grey-700",
        lightHex: "#444B4B",
        darkHex: "#EFF0F0",
        bgClass: "bg-s4e-neutral-grey-700",
      },
      {
        name: "Neutral/Grey-800",
        lightHex: "#202323",
        darkHex: "#F7F8F8",
        bgClass: "bg-s4e-neutral-grey-800",
      },
      {
        name: "Neutral/Grey-900",
        lightHex: "#131515",
        darkHex: "#FCFDFD",
        bgClass: "bg-s4e-neutral-grey-900",
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
        lightHex: "rgba(0,0,0,0.10)",
        darkHex: "rgba(255,255,255,0.10)",
        bgClass: "bg-s4e-neutral-divider-10",
      },
      {
        name: "Neutral/Divider-20",
        lightHex: "rgba(0,0,0,0.20)",
        darkHex: "rgba(255,255,255,0.20)",
        bgClass: "bg-s4e-neutral-divider-20",
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
        darkHex: "#0F1010",
        bgClass: "bg-s4e-surface-app",
      },
      {
        name: "Surface/Page",
        lightHex: "#FCFDFD",
        darkHex: "#131515",
        bgClass: "bg-s4e-surface-page",
      },
      {
        name: "Surface/Row",
        lightHex: "#FFFFFF",
        darkHex: "#0F1010",
        bgClass: "bg-s4e-surface-row",
      },
      {
        name: "Surface/Row Hover",
        lightHex: "#EBF2F7",
        darkHex: "#01324C",
        bgClass: "bg-s4e-surface-row-hover",
      },
      {
        name: "Surface/Row Visited",
        lightHex: "#FCFDFD",
        darkHex: "#131515",
        bgClass: "bg-s4e-surface-row-visited",
      },
      {
        name: "Surface/Table-Header",
        lightHex: "#F7F8F8",
        darkHex: "#1D2020",
        bgClass: "bg-s4e-surface-table-header",
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
        bgClass: "bg-s4e-feedback-info",
      },
      {
        name: "Feedback/Success",
        lightHex: "#63A100",
        darkHex: "#63A100",
        bgClass: "bg-s4e-feedback-success",
      },
      {
        name: "Feedback/Warning",
        lightHex: "#E6A200",
        darkHex: "#E6A200",
        bgClass: "bg-s4e-feedback-warning",
      },
      {
        name: "Feedback/Alert",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-feedback-alert",
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
        lightHex: "#9ACBE5",
        darkHex: "#0F69AA",
        bgClass: "bg-s4e-data-1",
      },
      {
        name: "Data/Category-2",
        lightHex: "#FFAF97",
        darkHex: "#C1674D",
        bgClass: "bg-s4e-data-2",
      },
      {
        name: "Data/Category-3",
        lightHex: "#C4DEF3",
        darkHex: "#2A6898",
        bgClass: "bg-s4e-data-3",
      },
      {
        name: "Data/Category-4",
        lightHex: "#A7ADB2",
        darkHex: "#A7ADB2",
        bgClass: "bg-s4e-data-4",
      },
      {
        name: "Data/Category-5",
        lightHex: "#0F69AA",
        darkHex: "#9ACBE5",
        bgClass: "bg-s4e-data-5",
      },
      {
        name: "Data/Category-6",
        lightHex: "#C1674D",
        darkHex: "#FFAF97",
        bgClass: "bg-s4e-data-6",
      },
      {
        name: "Data/Category-7",
        lightHex: "#1F5077",
        darkHex: "#E2F2FF",
        bgClass: "bg-s4e-data-7",
      },
      {
        name: "Data/Category-8",
        lightHex: "#394751",
        darkHex: "#F4F6F8",
        bgClass: "bg-s4e-data-8",
      },
      {
        name: "Data/Category-9",
        lightHex: "#CDE5F2",
        darkHex: "#1F5077",
        bgClass: "bg-s4e-data-9",
      },
      {
        name: "Data/Category-10",
        lightHex: "#FFD9CE",
        darkHex: "#9B4F39",
        bgClass: "bg-s4e-data-10",
      },
    ],
  },
  {
    name: "Status",
    description:
      "Represents scan operation states. Indicates workflow progression, not security risk.",
    colors: [
      {
        name: "Status/Ongoing",
        lightHex: "#7DAFD6",
        darkHex: "#7DAFD6",
        bgClass: "bg-s4e-status-ongoing",
      },
      {
        name: "Status/Finished",
        lightHex: "#63A100",
        darkHex: "#63A100",
        bgClass: "bg-s4e-status-finished",
      },
      {
        name: "Status/Not-Accessible",
        lightHex: "#E6A200",
        darkHex: "#E6A200",
        bgClass: "bg-s4e-status-not-accessible",
      },
      {
        name: "Status/Incomplete",
        lightHex: "#E6A200",
        darkHex: "#E6A200",
        bgClass: "bg-s4e-status-incomplete",
      },
      {
        name: "Status/Delayed",
        lightHex: "#E6A200",
        darkHex: "#E6A200",
        bgClass: "bg-s4e-status-delayed",
      },
      {
        name: "Status/Cancelled",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-status-cancelled",
      },
      {
        name: "Status/Timeout",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-status-timeout",
      },
      {
        name: "Status/Error",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-status-error",
      },
      {
        name: "Status/Inaccessible",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-status-inaccessible",
      },
      {
        name: "Status/Too-Many-Inaccessible",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-status-too-many-inaccessible",
      },
    ],
  },
  {
    name: "Typography",
    description: "All typography colors. Contrast ratios meet WCAG AA standards.",
    colors: [
      {
        name: "Text/Primary",
        lightHex: "#121F28",
        darkHex: "#FFFFFF",
        bgClass: "bg-s4e-text-primary",
      },
      {
        name: "Text/Secondary",
        lightHex: "#657078",
        darkHex: "#A7ADB2",
        bgClass: "bg-s4e-text-secondary",
      },
      {
        name: "Text/Disabled",
        lightHex: "#A7ADB2",
        darkHex: "#657078",
        bgClass: "bg-s4e-text-disabled",
      },
      {
        name: "Text/White",
        lightHex: "#FFFFFF",
        darkHex: "#FFFFFF",
        bgClass: "bg-s4e-text-white",
      },
    ],
  },
];
