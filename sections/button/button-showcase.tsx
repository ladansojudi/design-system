"use client";

import { ChevronDown, Download, Globe, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "Enabled" | "Hover" | "Disabled";
type Size = "Small" | "Medium" | "Large";
type IconPos = "none" | "left" | "right";
type ButtonType = "contained" | "outlined" | "text";

type ColorVariant = {
  name: string;
  contained: Record<State, string>;
  outlined: Record<State, string>;
  text: Record<State, string>;
};

const COLOR_VARIANTS: ColorVariant[] = [
  {
    name: "Default",
    contained: {
      Enabled:  "bg-s4e-btn-neutral-700 text-s4e-text-on-accent",
      Hover:    "bg-s4e-btn-neutral-800 text-s4e-text-on-accent",
      Disabled: "bg-s4e-btn-neutral-700 text-s4e-text-on-accent opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-neutral-grey-400 text-s4e-text-primary bg-transparent",
      Hover:    "border border-s4e-neutral-grey-500 text-s4e-text-primary bg-s4e-neutral-grey-100",
      Disabled: "border border-s4e-neutral-grey-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-text-primary",
      Hover:    "text-s4e-text-primary bg-s4e-neutral-grey-100",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Primary",
    contained: {
      Enabled:  "bg-s4e-btn-primary-600 text-s4e-text-on-accent",
      Hover:    "bg-s4e-btn-primary-700 text-s4e-text-on-accent",
      Disabled: "bg-s4e-btn-primary-600 text-s4e-text-on-accent opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-text-link text-s4e-text-link bg-transparent",
      Hover:    "border border-s4e-text-link text-s4e-text-link bg-s4e-brand-primary-50",
      Disabled: "border border-s4e-neutral-grey-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-text-link",
      Hover:    "text-s4e-text-link bg-s4e-brand-primary-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Success",
    contained: {
      Enabled:  "bg-s4e-btn-success-600 text-s4e-text-on-accent",
      Hover:    "bg-s4e-btn-success-700 text-s4e-text-on-accent",
      Disabled: "bg-s4e-btn-success-600 text-s4e-text-on-accent opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-text-success text-s4e-text-success bg-transparent",
      Hover:    "border border-s4e-text-success text-s4e-text-success bg-s4e-scale-green-50",
      Disabled: "border border-s4e-neutral-grey-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-text-success",
      Hover:    "text-s4e-text-success bg-s4e-scale-green-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Warning",
    contained: {
      Enabled:  "bg-s4e-btn-warning-600 text-s4e-text-on-accent",
      Hover:    "bg-s4e-btn-warning-700 text-s4e-text-on-accent",
      Disabled: "bg-s4e-btn-warning-600 text-s4e-text-on-accent opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-text-warning text-s4e-text-warning bg-transparent",
      Hover:    "border border-s4e-text-warning text-s4e-text-warning bg-s4e-scale-yellow-50",
      Disabled: "border border-s4e-neutral-grey-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-text-warning",
      Hover:    "text-s4e-text-warning bg-s4e-scale-yellow-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Error",
    contained: {
      Enabled:  "bg-s4e-btn-error-600 text-s4e-text-on-accent",
      Hover:    "bg-s4e-btn-error-700 text-s4e-text-on-accent",
      Disabled: "bg-s4e-btn-error-600 text-s4e-text-on-accent opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-text-error text-s4e-text-error bg-transparent",
      Hover:    "border border-s4e-text-error text-s4e-text-error bg-s4e-scale-red-50",
      Disabled: "border border-s4e-neutral-grey-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-text-error",
      Hover:    "text-s4e-text-error bg-s4e-scale-red-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
];

const SIZE_CLASSES: Record<ButtonType, Record<Size, string>> = {
  contained: { Small: "h-7 px-3 text-xs", Medium: "h-9 px-4 text-sm", Large: "h-11 px-5 text-[15px]" },
  outlined:  { Small: "h-7 px-3 text-xs", Medium: "h-9 px-4 text-sm", Large: "h-11 px-5 text-[15px]" },
  text:      { Small: "px-2 py-1 text-xs rounded-md", Medium: "px-2.5 py-1.5 text-sm rounded-md", Large: "px-3 py-2.5 text-[15px] rounded-md" },
};

const BASE: Record<ButtonType, string> = {
  contained: "inline-flex items-center gap-1.5 font-medium rounded-lg select-none whitespace-nowrap",
  outlined:  "inline-flex items-center gap-1.5 font-medium rounded-lg select-none whitespace-nowrap",
  text:      "inline-flex items-center gap-1.5 font-medium select-none whitespace-nowrap",
};

function Btn({
  type,
  colorVariant = 1,
  state = "Enabled",
  size = "Medium",
  iconPos = "none",
  label,
}: {
  type: ButtonType;
  colorVariant?: number;
  state?: State;
  size?: Size;
  iconPos?: IconPos;
  label?: string;
}) {
  const cv = COLOR_VARIANTS[colorVariant];
  const colorClass = cv[type][state];
  const sizeClass = SIZE_CLASSES[type][size];
  const iconSize = size === "Small" ? 13 : size === "Large" ? 17 : 15;

  return (
    <button
      type="button"
      tabIndex={-1}
      className={cn(BASE[type], sizeClass, colorClass)}
    >
      {iconPos === "left" && <Globe size={iconSize} />}
      {label ?? "s4e Button"}
      {iconPos === "right" && <Globe size={iconSize} />}
    </button>
  );
}

function PropertyRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-8 py-4 border-b border-s4e-neutral-divider-10 last:border-b-0">
      <span className="w-16 shrink-0 text-[10px] font-medium uppercase tracking-widest text-s4e-text-disabled">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function ButtonCard({
  title,
  type,
}: {
  title: string;
  type: ButtonType;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">{title}</span>
      </div>

      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
        {/* Color */}
        <PropertyRow label="Color">
          {COLOR_VARIANTS.map((cv, i) => (
            <Btn key={cv.name} type={type} colorVariant={i} label={cv.name} />
          ))}
        </PropertyRow>

        {/* States — shown with Primary color */}
        <PropertyRow label="States">
          <Btn type={type} colorVariant={1} state="Enabled"  label="Enabled" />
          <Btn type={type} colorVariant={1} state="Hover"    label="Hover" />
          <Btn type={type} colorVariant={1} state="Disabled" label="Disabled" />
        </PropertyRow>

        {/* Icon */}
        <PropertyRow label="Icon">
          <Btn type={type} colorVariant={1} iconPos="left"  label="Start Icon" />
          <Btn type={type} colorVariant={1} iconPos="right" label="End Icon" />
        </PropertyRow>

        {/* Size */}
        <PropertyRow label="Size">
          <Btn type={type} colorVariant={1} size="Small"  label="Small" />
          <Btn type={type} colorVariant={1} size="Medium" label="Medium" />
          <Btn type={type} colorVariant={1} size="Large"  label="Large" />
        </PropertyRow>
      </div>
    </div>
  );
}

// ── Loading state ─────────────────────────────────────────────────────────

function Spinner({ size = 14, className }: { size?: number; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block rounded-full animate-spin border-2 border-current/30 border-t-current", className)}
      style={{ width: size, height: size }}
    />
  );
}

function LoadingCard() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">Loading State</span>
      </div>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
        <PropertyRow label="Contained">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-s4e-btn-primary-600 text-s4e-text-on-accent text-sm font-medium opacity-90 cursor-wait"
          >
            <Spinner /> Saving
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-s4e-btn-error-600 text-s4e-text-on-accent text-sm font-medium opacity-90 cursor-wait"
          >
            <Spinner /> Deleting
          </button>
        </PropertyRow>
        <PropertyRow label="Outlined">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 h-9 px-4 rounded-lg border border-s4e-btn-primary-600 text-s4e-btn-primary-600 text-sm font-medium opacity-90 cursor-wait"
          >
            <Spinner /> Connecting
          </button>
        </PropertyRow>
        <PropertyRow label="Text">
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 px-2.5 py-1.5 text-s4e-btn-primary-600 text-sm font-medium opacity-90 cursor-wait"
          >
            <Spinner size={12} /> Loading
          </button>
        </PropertyRow>
      </div>
    </div>
  );
}

// ── Icon-only ─────────────────────────────────────────────────────────────

function IconOnlyCard() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">Icon-only Button</span>
      </div>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
        <PropertyRow label="Variant">
          <button type="button" aria-label="Edit"   className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-s4e-btn-neutral-700 text-s4e-text-on-accent hover:bg-s4e-btn-neutral-800 transition-colors cursor-pointer">
            <Pencil size={14} />
          </button>
          <button type="button" aria-label="Edit"   className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-s4e-btn-neutral-600 text-s4e-btn-neutral-700 hover:bg-s4e-btn-neutral-100 transition-colors cursor-pointer">
            <Pencil size={14} />
          </button>
          <button type="button" aria-label="Edit"   className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-s4e-btn-neutral-700 hover:bg-s4e-btn-neutral-100 transition-colors cursor-pointer">
            <Pencil size={14} />
          </button>
          <button type="button" aria-label="Delete" className="inline-flex items-center justify-center w-9 h-9 rounded-lg text-s4e-btn-error-600 hover:bg-s4e-btn-error-50 transition-colors cursor-pointer">
            <Trash2 size={14} />
          </button>
        </PropertyRow>
        <PropertyRow label="Size">
          <button type="button" aria-label="Small"  className="inline-flex items-center justify-center w-7 h-7 rounded-md border border-s4e-btn-neutral-600 text-s4e-btn-neutral-700 hover:bg-s4e-btn-neutral-100 cursor-pointer">
            <Pencil size={12} />
          </button>
          <button type="button" aria-label="Medium" className="inline-flex items-center justify-center w-9 h-9 rounded-lg border border-s4e-btn-neutral-600 text-s4e-btn-neutral-700 hover:bg-s4e-btn-neutral-100 cursor-pointer">
            <Pencil size={14} />
          </button>
          <button type="button" aria-label="Large"  className="inline-flex items-center justify-center w-11 h-11 rounded-lg border border-s4e-btn-neutral-600 text-s4e-btn-neutral-700 hover:bg-s4e-btn-neutral-100 cursor-pointer">
            <Pencil size={16} />
          </button>
        </PropertyRow>
      </div>
    </div>
  );
}

// ── Button group ──────────────────────────────────────────────────────────

function ButtonGroupCard() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">Button Group</span>
      </div>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6">
        <PropertyRow label="Connected">
          <div className="inline-flex rounded-lg overflow-hidden border border-s4e-btn-neutral-600">
            <button type="button" className="px-3 h-9 text-sm font-medium text-s4e-btn-neutral-700 hover:bg-s4e-btn-neutral-100 border-r border-s4e-btn-neutral-600 cursor-pointer">Day</button>
            <button type="button" className="px-3 h-9 text-sm font-medium bg-s4e-btn-neutral-700 text-s4e-text-on-accent cursor-pointer">Week</button>
            <button type="button" className="px-3 h-9 text-sm font-medium text-s4e-btn-neutral-700 hover:bg-s4e-btn-neutral-100 border-l border-s4e-btn-neutral-600 cursor-pointer">Month</button>
          </div>
        </PropertyRow>
        <PropertyRow label="Split">
          <div className="inline-flex rounded-lg overflow-hidden">
            <button type="button" className="inline-flex items-center gap-2 px-4 h-9 rounded-l-lg bg-s4e-btn-primary-600 text-s4e-text-on-accent text-sm font-medium hover:bg-s4e-btn-primary-700 cursor-pointer">
              <Download size={14} /> Export CSV
            </button>
            <button type="button" aria-label="More" className="px-2 h-9 rounded-r-lg bg-s4e-btn-primary-700 text-s4e-text-on-accent hover:bg-s4e-btn-primary-700/90 border-l border-white/15 cursor-pointer">
              <ChevronDown size={14} />
            </button>
          </div>
        </PropertyRow>
        <PropertyRow label="Toolbar">
          <div className="inline-flex rounded-md overflow-hidden border border-s4e-btn-neutral-300">
            <button type="button" aria-label="Edit"   className="px-2.5 py-1.5 hover:bg-s4e-btn-neutral-100 text-s4e-btn-neutral-700 border-r border-s4e-btn-neutral-300 cursor-pointer">
              <Pencil size={13} />
            </button>
            <button type="button" aria-label="Delete" className="px-2.5 py-1.5 hover:bg-s4e-btn-neutral-100 text-s4e-btn-neutral-700 border-r border-s4e-btn-neutral-300 cursor-pointer">
              <Trash2 size={13} />
            </button>
            <button type="button" aria-label="More"   className="px-2.5 py-1.5 hover:bg-s4e-btn-neutral-100 text-s4e-btn-neutral-700 cursor-pointer">
              <MoreHorizontal size={13} />
            </button>
          </div>
        </PropertyRow>
      </div>
    </div>
  );
}

// ── Full width ────────────────────────────────────────────────────────────

function FullWidthCard() {
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-s4e-brand-primary-500 text-[10px]">▶▶</span>
        <span className="text-[15px] font-semibold text-s4e-text-primary">Full Width</span>
      </div>
      <div className="border border-s4e-neutral-divider-10 rounded-xl px-6 py-5">
        <button
          type="button"
          className="block w-full h-10 rounded-lg bg-s4e-btn-primary-600 text-s4e-text-on-accent text-sm font-medium hover:bg-s4e-btn-primary-700 transition-colors cursor-pointer"
        >
          Continue to checkout
        </button>
        <p className="mt-2 text-[11px] text-s4e-text-disabled">
          Use sparingly — full-width buttons make sense on narrow forms and mobile drawers, rarely on desktop dashboards.
        </p>
      </div>
    </div>
  );
}

export function ButtonShowcase() {
  return (
    <div className="space-y-12">
      <ButtonCard title="Contained Button" type="contained" />
      <ButtonCard title="Outlined Button"  type="outlined" />
      <ButtonCard title="Text Button"      type="text" />
      <LoadingCard />
      <IconOnlyCard />
      <ButtonGroupCard />
      <FullWidthCard />
    </div>
  );
}
