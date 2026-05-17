import { colorGroups, type ColorEntry } from "@/components/styleguide/color-data";

export type Theme = "light" | "dark";

export type Swatch = {
  step:    string;
  hex:     string;
  rgb:     [number, number, number];
  alpha:   number;
  name:    string;
  isBase:  boolean;
  isAlpha: boolean;
};

export type Palette = {
  name:        string;
  slug:        string;
  description: string;
  base:        Swatch;
  swatches:    Swatch[];
};

// ── Color math ────────────────────────────────────────────────────────────

const hexCache = new Map<string, [number, number, number] | null>();

export function parseHex(input: string): [number, number, number] | null {
  if (hexCache.has(input)) return hexCache.get(input)!;
  const v = input.trim().toLowerCase();
  let result: [number, number, number] | null = null;

  if (v.startsWith("#")) {
    const h = v.slice(1);
    if (h.length === 3) {
      result = [
        parseInt(h[0] + h[0], 16),
        parseInt(h[1] + h[1], 16),
        parseInt(h[2] + h[2], 16),
      ];
    } else if (h.length === 6) {
      result = [
        parseInt(h.slice(0, 2), 16),
        parseInt(h.slice(2, 4), 16),
        parseInt(h.slice(4, 6), 16),
      ];
    }
  } else if (v.startsWith("rgba(") || v.startsWith("rgb(")) {
    const m = v.match(/\d+(?:\.\d+)?/g);
    if (m && m.length >= 3) {
      result = [Number(m[0]), Number(m[1]), Number(m[2])];
    }
  }

  hexCache.set(input, result);
  return result;
}

function srgbToLinear(v: number): number {
  const c = v / 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function luminance([r, g, b]: [number, number, number]): number {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function contrast(a: [number, number, number], b: [number, number, number]): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

export function fontFor(rgb: [number, number, number]): "#ffffff" | "#000000" {
  return contrast(rgb, [255, 255, 255]) > contrast(rgb, [0, 0, 0])
    ? "#ffffff"
    : "#000000";
}

export function rgbToHsl([r, g, b]: [number, number, number]): [number, number, number] {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if      (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0));
    else if (max === gn) h = ((bn - rn) / d + 2);
    else                 h = ((rn - gn) / d + 4);
    h *= 60;
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)];
}

export function formatHsl([h, s, l]: [number, number, number]): string {
  return `hsl(${h}, ${s}%, ${l}%)`;
}

export type WcagKey = "aaa" | "aa" | "aal" | "fail";

export function wcagKey(ratio: number): WcagKey {
  if (ratio >= 7)   return "aaa";
  if (ratio >= 4.5) return "aa";
  if (ratio >= 3)   return "aal";
  return "fail";
}

export function wcagLabel(ratio: number): string {
  if (ratio >= 7)   return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3)   return "AA-Lg";
  return "Fail";
}

// ── Palette transformation ────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s*\/\s*/g, "-")
    .replace(/\s+/g, "-");
}

function stepFromName(group: string, entryName: string): { step: string; isBase: boolean } {
  const tail = entryName.includes("/")
    ? entryName.slice(entryName.lastIndexOf("/") + 1)
    : entryName;
  if (group === "Neutral / Grey") {
    return { step: tail.replace(/^Grey-?/i, ""), isBase: tail === "500" };
  }
  const stripped = tail.replace(/^(Primary|Secondary|Blue|Green|Yellow|Red|Purple|Category|Divider)-?/i, "");
  const isNumeric = /^\d+$/.test(stripped);
  return {
    step:   isNumeric ? stripped : tail,
    isBase: isNumeric && stripped === "500",
  };
}

function parseAlpha(input: string): number {
  const v = input.trim().toLowerCase();
  if (v.startsWith("rgba(")) {
    const m = v.match(/\d+(?:\.\d+)?/g);
    if (m && m.length >= 4) return Number(m[3]);
  }
  return 1;
}

function toSwatch(group: string, entry: ColorEntry, theme: Theme): Swatch | null {
  const hex = theme === "light" ? entry.lightHex : entry.darkHex;
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const alpha = parseAlpha(hex);
  const { step, isBase } = stepFromName(group, entry.name);
  return {
    step,
    hex,
    rgb,
    alpha,
    name:    entry.name,
    isBase,
    isAlpha: alpha < 1,
  };
}

function pickBase(swatches: Swatch[]): Swatch {
  return swatches.find((s) => s.isBase) ?? swatches[Math.floor(swatches.length / 2)] ?? swatches[0];
}

export function buildPalettes(theme: Theme): Palette[] {
  return colorGroups
    .map((g) => {
      const swatches = g.colors
        .map((c) => toSwatch(g.name, c, theme))
        .filter((s): s is Swatch => s !== null);
      if (swatches.length === 0) return null;
      return {
        name:        g.name,
        slug:        slugify(g.name),
        description: g.description,
        base:        pickBase(swatches),
        swatches,
      };
    })
    .filter((p): p is Palette => p !== null);
}

// ── Semantic role pointers (resolved live against current theme) ──────────

export type RoleChip = { token: string; bgClass: string };

export const SEMANTIC_ROLES: { label: string; chips: RoleChip[] }[] = [
  {
    label: "Surface",
    chips: [
      { token: "Surface/App",        bgClass: "bg-s4e-surface-app" },
      { token: "Surface/Page",       bgClass: "bg-s4e-surface-page" },
      { token: "Surface/Row-Hover",  bgClass: "bg-s4e-surface-row-hover" },
      { token: "Surface/Table-Hdr",  bgClass: "bg-s4e-surface-table-header" },
    ],
  },
  {
    label: "Text",
    chips: [
      { token: "Text/Primary",   bgClass: "bg-s4e-text-primary" },
      { token: "Text/Secondary", bgClass: "bg-s4e-text-secondary" },
      { token: "Text/Disabled",  bgClass: "bg-s4e-text-disabled" },
    ],
  },
  {
    label: "Brand / Primary",
    chips: [
      { token: "Primary-500", bgClass: "bg-s4e-brand-primary-500" },
      { token: "Primary-600", bgClass: "bg-s4e-brand-primary-600" },
      { token: "Primary-200", bgClass: "bg-s4e-brand-primary-200" },
    ],
  },
  {
    label: "Brand / Secondary",
    chips: [
      { token: "Secondary-500", bgClass: "bg-s4e-brand-secondary-500" },
      { token: "Secondary-600", bgClass: "bg-s4e-brand-secondary-600" },
      { token: "Secondary-200", bgClass: "bg-s4e-brand-secondary-200" },
    ],
  },
  {
    label: "Feedback",
    chips: [
      { token: "Feedback/Info",    bgClass: "bg-s4e-feedback-info" },
      { token: "Feedback/Success", bgClass: "bg-s4e-feedback-success" },
      { token: "Feedback/Warning", bgClass: "bg-s4e-feedback-warning" },
      { token: "Feedback/Alert",   bgClass: "bg-s4e-feedback-alert" },
    ],
  },
  {
    label: "Severity",
    chips: [
      { token: "Severity/Info",     bgClass: "bg-s4e-severity-info" },
      { token: "Severity/Low",      bgClass: "bg-s4e-severity-low" },
      { token: "Severity/Medium",   bgClass: "bg-s4e-severity-medium" },
      { token: "Severity/High",     bgClass: "bg-s4e-severity-high" },
      { token: "Severity/Critical", bgClass: "bg-s4e-severity-critical" },
    ],
  },
];

// ── CSS-variable name used in exports for a token ─────────────────────────

export function tokenVar(sw: Swatch): string {
  return "--s4e-" + sw.name
    .replace(/\s*\/\s*/g, "-")
    .replace(/\s+/g, "-")
    .toLowerCase();
}
