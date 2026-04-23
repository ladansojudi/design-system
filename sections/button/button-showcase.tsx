"use client";

import { Globe } from "lucide-react";
import { cn } from "@/lib/utils";

type State = "Enabled" | "Hover" | "Disabled";
type Size = "Small" | "Medium";
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
      Enabled:  "bg-s4e-btn-neutral-700 text-white",
      Hover:    "bg-s4e-btn-neutral-800 text-white",
      Disabled: "bg-s4e-btn-neutral-700 text-white opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-btn-neutral-600 text-s4e-btn-neutral-700 bg-transparent",
      Hover:    "border border-s4e-btn-neutral-700 text-s4e-btn-neutral-800 bg-s4e-btn-neutral-100",
      Disabled: "border border-s4e-btn-neutral-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-btn-neutral-700",
      Hover:    "text-s4e-btn-neutral-800 bg-s4e-btn-neutral-100",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Primary",
    contained: {
      Enabled:  "bg-s4e-btn-primary-600 text-white",
      Hover:    "bg-s4e-btn-primary-700 text-white",
      Disabled: "bg-s4e-btn-primary-600 text-white opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-btn-primary-600 text-s4e-btn-primary-600 bg-transparent",
      Hover:    "border border-s4e-btn-primary-700 text-s4e-btn-primary-700 bg-s4e-btn-primary-50",
      Disabled: "border border-s4e-btn-neutral-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-btn-primary-600",
      Hover:    "text-s4e-btn-primary-700 bg-s4e-btn-primary-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Success",
    contained: {
      Enabled:  "bg-s4e-btn-success-600 text-white",
      Hover:    "bg-s4e-btn-success-700 text-white",
      Disabled: "bg-s4e-btn-success-600 text-white opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-btn-success-600 text-s4e-btn-success-600 bg-transparent",
      Hover:    "border border-s4e-btn-success-700 text-s4e-btn-success-700 bg-s4e-btn-success-50",
      Disabled: "border border-s4e-btn-neutral-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-btn-success-600",
      Hover:    "text-s4e-btn-success-700 bg-s4e-btn-success-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Warning",
    contained: {
      Enabled:  "bg-s4e-btn-warning-600 text-white",
      Hover:    "bg-s4e-btn-warning-700 text-white",
      Disabled: "bg-s4e-btn-warning-600 text-white opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-btn-warning-600 text-s4e-btn-warning-600 bg-transparent",
      Hover:    "border border-s4e-btn-warning-700 text-s4e-btn-warning-700 bg-s4e-btn-warning-50",
      Disabled: "border border-s4e-btn-neutral-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-btn-warning-600",
      Hover:    "text-s4e-btn-warning-700 bg-s4e-btn-warning-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
  {
    name: "Error",
    contained: {
      Enabled:  "bg-s4e-btn-error-600 text-white",
      Hover:    "bg-s4e-btn-error-700 text-white",
      Disabled: "bg-s4e-btn-error-600 text-white opacity-40 cursor-not-allowed",
    },
    outlined: {
      Enabled:  "border border-s4e-btn-error-600 text-s4e-btn-error-600 bg-transparent",
      Hover:    "border border-s4e-btn-error-700 text-s4e-btn-error-700 bg-s4e-btn-error-50",
      Disabled: "border border-s4e-btn-neutral-300 text-s4e-text-disabled bg-transparent opacity-40 cursor-not-allowed",
    },
    text: {
      Enabled:  "text-s4e-btn-error-600",
      Hover:    "text-s4e-btn-error-700 bg-s4e-btn-error-50",
      Disabled: "text-s4e-text-disabled opacity-40 cursor-not-allowed",
    },
  },
];

const SIZE_CLASSES: Record<ButtonType, Record<Size, string>> = {
  contained: { Small: "h-7 px-3 text-xs", Medium: "h-9 px-4 text-sm" },
  outlined:  { Small: "h-7 px-3 text-xs", Medium: "h-9 px-4 text-sm" },
  text:      { Small: "px-2 py-1 text-xs rounded-md", Medium: "px-2.5 py-1.5 text-sm rounded-md" },
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
  const iconSize = size === "Small" ? 13 : 15;

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
        </PropertyRow>
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
    </div>
  );
}
