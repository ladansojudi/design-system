"use client";

import * as React from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  Superscript, Subscript,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Link2, Image as LucideImage,
  Quote, Minus, X, Code,
  ChevronDown, Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — TextSpace
 *
 * Drop this file into your project at components/ui/text-space.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

export type TextSpaceState = "enabled" | "disabled" | "error";
export type ToolbarSize    = "simple"  | "full";

type ToolItem =
  | { type: "sep" }
  | { type: "icon"; icon: React.ComponentType<{ size?: number; className?: string }> };

const TOOL_ITEMS: ToolItem[] = [
  { type: "icon", icon: Bold },
  { type: "icon", icon: Italic },
  { type: "icon", icon: Underline },
  { type: "icon", icon: Strikethrough },
  { type: "sep" },
  { type: "icon", icon: Superscript },
  { type: "icon", icon: Subscript },
  { type: "sep" },
  { type: "icon", icon: List },
  { type: "icon", icon: ListOrdered },
  { type: "icon", icon: Quote },
  { type: "sep" },
  { type: "icon", icon: AlignLeft },
  { type: "icon", icon: AlignCenter },
  { type: "icon", icon: AlignRight },
  { type: "sep" },
  { type: "icon", icon: Link2 },
  { type: "icon", icon: LucideImage },
  { type: "icon", icon: Code },
  { type: "sep" },
  { type: "icon", icon: Minus },
  { type: "icon", icon: X },
];

function ToolbarBtn({
  icon: Icon,
  disabled,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      tabIndex={-1}
      disabled={disabled}
      className="p-1 rounded hover:bg-s4e-neutral-grey-100 disabled:pointer-events-none"
    >
      <Icon size={13} className="text-s4e-text-secondary" />
    </button>
  );
}

export interface TextSpaceToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?:     ToolbarSize;
  disabled?: boolean;
}

export const TextSpaceToolbar = React.forwardRef<HTMLDivElement, TextSpaceToolbarProps>(
  ({ size = "simple", disabled, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center flex-wrap gap-0.5 px-3 py-1.5 border-b border-s4e-neutral-divider-10",
          disabled && "opacity-40 pointer-events-none",
          className,
        )}
        {...props}
      >
        {size === "full" && (
          <>
            <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
              <Type size={12} className="text-s4e-text-disabled" />
              <ChevronDown size={10} className="text-s4e-text-disabled" />
            </span>
            <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
              16px <ChevronDown size={10} className="text-s4e-text-disabled" />
            </span>
            <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
              Normal <ChevronDown size={10} className="text-s4e-text-disabled" />
            </span>
            <div className="w-px h-4 bg-s4e-neutral-divider-10 mx-1" />
          </>
        )}
        {size === "simple" && (
          <span className="text-[11px] text-s4e-text-secondary mr-1.5">Font</span>
        )}
        {TOOL_ITEMS.map((item, i) =>
          item.type === "sep" ? (
            <div key={i} className="w-px h-4 bg-s4e-neutral-divider-10 mx-0.5" />
          ) : (
            <ToolbarBtn key={i} icon={item.icon} disabled={disabled} />
          ),
        )}
      </div>
    );
  },
);
TextSpaceToolbar.displayName = "TextSpaceToolbar";

export interface TextSpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  toolbarSize?: ToolbarSize;
  state?:       TextSpaceState;
  placeholder?: string;
}

export const TextSpace = React.forwardRef<HTMLDivElement, TextSpaceProps>(
  (
    {
      toolbarSize = "simple",
      state       = "enabled",
      placeholder = "Write something awesome…",
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = state === "disabled";
    const isError    = state === "error";

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border overflow-hidden",
          isError
            ? "border-s4e-text-error bg-s4e-scale-red-50"
            : "border-s4e-neutral-divider-10 bg-s4e-surface-app",
          isDisabled && "opacity-40",
          className,
        )}
        {...props}
      >
        <TextSpaceToolbar size={toolbarSize} disabled={isDisabled} />
        <div
          className={cn(
            "px-4 py-3 h-24 text-[12px]",
            isError ? "text-s4e-text-error" : "text-s4e-text-disabled",
            isDisabled && "cursor-not-allowed",
          )}
        >
          {placeholder}
        </div>
      </div>
    );
  },
);
TextSpace.displayName = "TextSpace";
