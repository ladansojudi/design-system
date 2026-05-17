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
        lightHex: "#E8F4FD",
        darkHex: "#062C46",
        bgClass: "bg-s4e-brand-primary-50",
      },
      {
        name: "Brand/Primary-100",
        lightHex: "#C7E5FA",
        darkHex: "#09436C",
        bgClass: "bg-s4e-brand-primary-100",
      },
      {
        name: "Brand/Primary-200",
        lightHex: "#8AC8F5",
        darkHex: "#0F69A9",
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
        lightHex: "#0F69A9",
        darkHex: "#8AC8F5",
        bgClass: "bg-s4e-brand-primary-600",
      },
      {
        name: "Brand/Primary-700",
        lightHex: "#09436C",
        darkHex: "#C7E5FA",
        bgClass: "bg-s4e-brand-primary-700",
      },
      {
        name: "Brand/Primary-800",
        lightHex: "#062C46",
        darkHex: "#E8F4FD",
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
        lightHex: "#FEF4F1",
        darkHex: "#81290E",
        bgClass: "bg-s4e-brand-secondary-50",
      },
      {
        name: "Brand/Secondary-100",
        lightHex: "#FADAD1",
        darkHex: "#C23D14",
        bgClass: "bg-s4e-brand-secondary-100",
      },
      {
        name: "Brand/Secondary-200",
        lightHex: "#F5B6A3",
        darkHex: "#E85326",
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
        lightHex: "#E85326",
        darkHex: "#F5B6A3",
        bgClass: "bg-s4e-brand-secondary-600",
      },
      {
        name: "Brand/Secondary-700",
        lightHex: "#C23D14",
        darkHex: "#FADAD1",
        bgClass: "bg-s4e-brand-secondary-700",
      },
      {
        name: "Brand/Secondary-800",
        lightHex: "#81290E",
        darkHex: "#FEF4F1",
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
        lightHex: "#F7FAFD",
        darkHex: "#18374E",
        bgClass: "bg-s4e-scale-blue-50",
      },
      {
        name: "Scale/Blue-100",
        lightHex: "#E8F1F8",
        darkHex: "#234F70",
        bgClass: "bg-s4e-scale-blue-100",
      },
      {
        name: "Scale/Blue-200",
        lightHex: "#C9DEEE",
        darkHex: "#2F6893",
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
        lightHex: "#2F6893",
        darkHex: "#C9DEEE",
        bgClass: "bg-s4e-scale-blue-600",
      },
      {
        name: "Scale/Blue-700",
        lightHex: "#234F70",
        darkHex: "#E8F1F8",
        bgClass: "bg-s4e-scale-blue-700",
      },
      {
        name: "Scale/Blue-800",
        lightHex: "#18374E",
        darkHex: "#F7FAFD",
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
        lightHex: "#F1FFDB",
        darkHex: "#192900",
        bgClass: "bg-s4e-scale-green-50",
      },
      {
        name: "Scale/Green-100",
        lightHex: "#E8FFC2",
        darkHex: "#294200",
        bgClass: "bg-s4e-scale-green-100",
      },
      {
        name: "Scale/Green-200",
        lightHex: "#A5FF14",
        darkHex: "#3F6600",
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
        lightHex: "#3F6600",
        darkHex: "#A5FF14",
        bgClass: "bg-s4e-scale-green-600",
      },
      {
        name: "Scale/Green-700",
        lightHex: "#294200",
        darkHex: "#E8FFC2",
        bgClass: "bg-s4e-scale-green-700",
      },
      {
        name: "Scale/Green-800",
        lightHex: "#192900",
        darkHex: "#F1FFDB",
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
        lightHex: "#FEFAF0",
        darkHex: "#443104",
        bgClass: "bg-s4e-scale-yellow-50",
      },
      {
        name: "Scale/Yellow-100",
        lightHex: "#FCEBC5",
        darkHex: "#795706",
        bgClass: "bg-s4e-scale-yellow-100",
      },
      {
        name: "Scale/Yellow-200",
        lightHex: "#F8D072",
        darkHex: "#DA9C0B",
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
        lightHex: "#DA9C0B",
        darkHex: "#F8D072",
        bgClass: "bg-s4e-scale-yellow-600",
      },
      {
        name: "Scale/Yellow-700",
        lightHex: "#795706",
        darkHex: "#FCEBC5",
        bgClass: "bg-s4e-scale-yellow-700",
      },
      {
        name: "Scale/Yellow-800",
        lightHex: "#443104",
        darkHex: "#FEFAF0",
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
        lightHex: "#FCF3F2",
        darkHex: "#471510",
        bgClass: "bg-s4e-scale-red-50",
      },
      {
        name: "Scale/Red-100",
        lightHex: "#F4D1CD",
        darkHex: "#712219",
        bgClass: "bg-s4e-scale-red-100",
      },
      {
        name: "Scale/Red-200",
        lightHex: "#EBAAA3",
        darkHex: "#8E2A1F",
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
        lightHex: "#8E2A1F",
        darkHex: "#EBAAA3",
        bgClass: "bg-s4e-scale-red-600",
      },
      {
        name: "Scale/Red-700",
        lightHex: "#712219",
        darkHex: "#F4D1CD",
        bgClass: "bg-s4e-scale-red-700",
      },
      {
        name: "Scale/Red-800",
        lightHex: "#471510",
        darkHex: "#FCF3F2",
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
        lightHex: "#F7F2FC",
        darkHex: "#301254",
        bgClass: "bg-s4e-scale-purple-50",
      },
      {
        name: "Scale/Purple-100",
        lightHex: "#DCC9F3",
        darkHex: "#4F1E8A",
        bgClass: "bg-s4e-scale-purple-100",
      },
      {
        name: "Scale/Purple-200",
        lightHex: "#AB7DE3",
        darkHex: "#5D24A3",
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
        lightHex: "#5D24A3",
        darkHex: "#AB7DE3",
        bgClass: "bg-s4e-scale-purple-600",
      },
      {
        name: "Scale/Purple-700",
        lightHex: "#4F1E8A",
        darkHex: "#DCC9F3",
        bgClass: "bg-s4e-scale-purple-700",
      },
      {
        name: "Scale/Purple-800",
        lightHex: "#301254",
        darkHex: "#F7F2FC",
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
        lightHex: "#1F2323",
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
    description: "Structural and semantic text colors. Contrast ratios meet WCAG AA standards.",
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
        name: "Text/Placeholder",
        lightHex: "#A7ADB2",
        darkHex: "#657078",
        bgClass: "bg-s4e-text-placeholder",
      },
      {
        name: "Text/Inverse",
        lightHex: "#FFFFFF",
        darkHex: "#121F28",
        bgClass: "bg-s4e-text-inverse",
      },
      {
        name: "Text/On-Accent",
        lightHex: "#FFFFFF",
        darkHex: "#FFFFFF",
        bgClass: "bg-s4e-text-on-accent",
      },
      {
        name: "Text/Link",
        lightHex: "#1383D4",
        darkHex: "#1383D4",
        bgClass: "bg-s4e-text-link",
      },
      {
        name: "Text/Brand",
        lightHex: "#0F69AA",
        darkHex: "#9ACBE5",
        bgClass: "bg-s4e-text-brand",
      },
      {
        name: "Text/Success",
        lightHex: "#406800",
        darkHex: "#9AD340",
        bgClass: "bg-s4e-text-success",
      },
      {
        name: "Text/Warning",
        lightHex: "#805A00",
        darkHex: "#FFEEC2",
        bgClass: "bg-s4e-text-warning",
      },
      {
        name: "Text/Error",
        lightHex: "#AE2700",
        darkHex: "#FF9B90",
        bgClass: "bg-s4e-text-error",
      },
      {
        name: "Text/Info",
        lightHex: "#2A6898",
        darkHex: "#C4DEF3",
        bgClass: "bg-s4e-text-info",
      },
    ],
  },
];
