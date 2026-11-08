"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Select
 *
 * Drop this file into your project at components/ui/select.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react for the Check / ChevronDown icons.
 */

export type SelectOption = {
  value:     string;
  label:     string;
  disabled?: boolean;
};

export type SelectState = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?:       string;
  options:      SelectOption[];
  value?:       string;
  onChange?:    (v: string) => void;
  placeholder?: string;
  state?:       SelectState;
  helperText?:  string;
  errorText?:   string;
  disabled?:    boolean;
}

const BORDER_CLASS: Record<SelectState, string> = {
  Default:  "border-s4e-neutral-grey-300",
  Hover:    "border-s4e-neutral-grey-500",
  Focused:  "border-s4e-brand-primary-600",
  Error:    "border-s4e-scale-red-600",
  Disabled: "border-s4e-neutral-grey-300",
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = "Select…",
      state = "Default",
      helperText,
      errorText,
      disabled = false,
      className,
      id,
      ...props
    },
    forwardedRef,
  ) => {
    const [open, setOpen]            = React.useState(false);
    const [activeIndex, setActive]   = React.useState(-1);
    const innerRef                   = React.useRef<HTMLDivElement>(null);
    const listRef                    = React.useRef<HTMLDivElement>(null);
    const typeahead                  = React.useRef({ query: "", timer: 0 });
    React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLDivElement);

    const autoId    = React.useId();
    const baseId    = id ?? autoId;
    const labelId   = `${baseId}-label`;
    const triggerId = `${baseId}-trigger`;
    const listId    = `${baseId}-listbox`;
    const helperId  = `${baseId}-helper`;
    const optionId  = (i: number) => `${baseId}-option-${i}`;

    React.useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (innerRef.current && !innerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    // Keep the keyboard-highlighted option in view.
    React.useEffect(() => {
      if (!open || activeIndex < 0) return;
      const el = listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(optionId(activeIndex))}`);
      el?.scrollIntoView({ block: "nearest" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, activeIndex]);

    const isError    = state === "Error";
    const isDisabled = disabled || state === "Disabled";
    const isFocused  = state === "Focused" || open;
    const selected   = options.find((o) => o.value === value);
    const message    = isError && errorText ? errorText : helperText;

    const enabledStep = (from: number, dir: 1 | -1) => {
      for (let i = 1; i <= options.length; i++) {
        const next = (from + dir * i + options.length) % options.length;
        if (!options[next].disabled) return next;
      }
      return from;
    };
    const firstEnabled = () => options.findIndex((o) => !o.disabled);
    const lastEnabled  = () => {
      for (let i = options.length - 1; i >= 0; i--) if (!options[i].disabled) return i;
      return -1;
    };

    const openMenu = (index?: number) => {
      const selectedIndex = options.findIndex((o) => o.value === value && !o.disabled);
      setActive(index ?? (selectedIndex >= 0 ? selectedIndex : firstEnabled()));
      setOpen(true);
    };

    const commit = (index: number) => {
      const opt = options[index];
      if (!opt || opt.disabled) return;
      onChange?.(opt.value);
      setOpen(false);
    };

    const onTypeahead = (char: string) => {
      const t = typeahead.current;
      window.clearTimeout(t.timer);
      t.query += char.toLowerCase();
      t.timer = window.setTimeout(() => { t.query = ""; }, 500);
      const start = open ? activeIndex : -1;
      for (let i = 1; i <= options.length; i++) {
        const idx = (start + i) % options.length;
        const opt = options[idx];
        if (!opt.disabled && opt.label.toLowerCase().startsWith(t.query)) {
          if (open) setActive(idx);
          else openMenu(idx);
          return;
        }
      }
    };

    const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (isDisabled) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          if (!open) openMenu();
          else setActive((i) => enabledStep(i, 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          if (!open) openMenu();
          else setActive((i) => enabledStep(i, -1));
          break;
        case "Home":
          if (open) { e.preventDefault(); setActive(firstEnabled()); }
          break;
        case "End":
          if (open) { e.preventDefault(); setActive(lastEnabled()); }
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (open) commit(activeIndex);
          else openMenu();
          break;
        case "Escape":
          if (open) { e.preventDefault(); setOpen(false); }
          break;
        case "Tab":
          setOpen(false);
          break;
        default:
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
            onTypeahead(e.key);
          }
      }
    };

    const borderClass = isError
      ? BORDER_CLASS.Error
      : isFocused
        ? BORDER_CLASS.Focused
        : BORDER_CLASS[state];

    return (
      <div ref={innerRef} className={cn("w-full", className)} {...props}>
        {label && (
          <label
            id={labelId}
            htmlFor={triggerId}
            className={cn(
              "block text-[11px] font-medium mb-1.5",
              isError ? "text-s4e-scale-red-600" : "text-s4e-text-secondary",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <button
            id={triggerId}
            type="button"
            role="combobox"
            disabled={isDisabled}
            onClick={() => (open ? setOpen(false) : openMenu())}
            onKeyDown={onKeyDown}
            aria-haspopup="listbox"
            aria-expanded={open}
            aria-controls={open ? listId : undefined}
            aria-activedescendant={open && activeIndex >= 0 ? optionId(activeIndex) : undefined}
            aria-labelledby={label ? `${labelId} ${triggerId}` : undefined}
            aria-invalid={isError || undefined}
            aria-describedby={message ? helperId : undefined}
            className={cn(
              "w-full flex items-center justify-between gap-2 h-9 px-3 rounded-md text-[14px] text-left transition-colors",
              "border", borderClass, "bg-s4e-surface-row",
              isDisabled
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer hover:border-s4e-neutral-grey-500 focus:outline-none focus:border-s4e-brand-primary-600 focus-visible:ring-2 focus-visible:ring-s4e-brand-primary-500/40",
              isFocused && !isError && "ring-2 ring-s4e-brand-primary-500/20",
            )}
          >
            <span
              className={cn(
                selected ? "text-s4e-text-primary" : "text-s4e-text-secondary",
                "truncate",
              )}
            >
              {selected?.label ?? placeholder}
            </span>
            <ChevronDown
              size={14}
              aria-hidden
              className={cn(
                "shrink-0 text-s4e-text-secondary transition-transform",
                open && "rotate-180",
              )}
            />
          </button>

          {open && !isDisabled && (
            <div
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              className="absolute z-20 left-0 right-0 mt-1.5 max-h-60 overflow-auto rounded-md border border-s4e-neutral-divider-10 bg-s4e-surface-row shadow-s4e-lg"
            >
              {options.map((opt, i) => {
                const isSel    = opt.value === value;
                const isActive = i === activeIndex;
                return (
                  <div
                    key={opt.value}
                    id={optionId(i)}
                    role="option"
                    aria-selected={isSel}
                    aria-disabled={opt.disabled || undefined}
                    // Keep focus on the trigger so keyboard handling stays in one place.
                    onMouseDown={(e) => e.preventDefault()}
                    onMouseEnter={() => !opt.disabled && setActive(i)}
                    onClick={() => commit(i)}
                    className={cn(
                      "w-full flex items-center justify-between gap-2 px-3 py-2 text-[14px] text-left",
                      opt.disabled
                        ? "text-s4e-text-disabled cursor-not-allowed"
                        : "text-s4e-text-primary cursor-pointer",
                      isActive && !opt.disabled && "bg-s4e-surface-row-hover",
                      isSel && !isActive && "bg-s4e-brand-primary-500/8",
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSel && (
                      <Check size={14} aria-hidden className="text-s4e-brand-primary-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {message && (
          <div
            id={helperId}
            className={cn(
              "mt-1 text-[11px] leading-tight",
              isError ? "text-s4e-scale-red-600" : "text-s4e-text-secondary",
            )}
          >
            {message}
          </div>
        )}
      </div>
    );
  },
);
Select.displayName = "Select";
