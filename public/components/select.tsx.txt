"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Select
 *
 * Drop this file into your project at components/ui/select.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react for the Check / ChevronDown icons.
 */

export type SelectOption = {
  value:     string;
  label:     string;
  disabled?: boolean;
};

export type SelectState = "default" | "hover" | "focused" | "error" | "disabled";
/** @deprecated Use the lowercase values — every other component uses lowercase states. */
export type LegacySelectState = "Default" | "Hover" | "Focused" | "Error" | "Disabled";

export interface SelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  label?:       string;
  options:      SelectOption[];
  value?:       string;
  onChange?:    (v: string) => void;
  placeholder?: string;
  state?:       SelectState | LegacySelectState;
  helperText?:  string;
  errorText?:   string;
  disabled?:    boolean;
}

const BORDER_CLASS: Record<SelectState, string> = {
  default:  "border-snt-border-strong",
  hover:    "border-snt-neutral-grey-500",
  focused:  "border-snt-border-focus",
  error:    "border-snt-border-error",
  disabled: "border-snt-border-strong",
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  (
    {
      label,
      options,
      value,
      onChange,
      placeholder = "Select…",
      state: stateProp = "default",
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
    const triggerRef                 = React.useRef<HTMLButtonElement>(null);
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
        const target = e.target as Node;
        if (innerRef.current && !innerRef.current.contains(target) && !listRef.current?.contains(target)) {
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

    const state      = stateProp.toLowerCase() as SelectState;
    // Place the portalled listbox under the trigger — or above it when there
    // isn't room below — and keep it there while the page scrolls or resizes.
    React.useLayoutEffect(() => {
      if (!open) return;
      const place = () => {
        const trigger = triggerRef.current, list = listRef.current;
        if (!trigger || !list) return;
        const rect   = trigger.getBoundingClientRect();
        const gap    = 6;
        const below  = window.innerHeight - rect.bottom - gap;
        const above  = rect.top - gap;
        const wanted = Math.min(list.scrollHeight, 240);
        const flip   = below < wanted && above > below;
        const room   = Math.max(120, Math.min(240, flip ? above : below));
        list.style.left      = `${rect.left}px`;
        list.style.width     = `${rect.width}px`;
        list.style.maxHeight = `${room}px`;
        list.style.top       = flip ? `${rect.top - gap - Math.min(wanted, room)}px` : `${rect.bottom + gap}px`;
        // Carry a nested theme (e.g. a dark preview panel) into the portal.
        const themed = trigger.closest<HTMLElement>("[data-snt-theme]");
        if (themed) list.setAttribute("data-snt-theme", themed.dataset.sntTheme ?? "");
      };
      place();
      window.addEventListener("resize", place);
      window.addEventListener("scroll", place, true);
      return () => {
        window.removeEventListener("resize", place);
        window.removeEventListener("scroll", place, true);
      };
    }, [open]);

    const isError    = state === "error";
    const isDisabled = disabled || state === "disabled";
    const isFocused  = state === "focused" || open;
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
      ? BORDER_CLASS.error
      : isFocused
        ? BORDER_CLASS.focused
        : BORDER_CLASS[state];

    return (
      <div ref={innerRef} className={cn("w-full", className)} {...props}>
        {label && (
          <label
            id={labelId}
            htmlFor={triggerId}
            className={cn(
              "block text-snt-11 font-medium mb-1.5",
              isError ? "text-snt-text-error" : "text-snt-text-secondary",
            )}
          >
            {label}
          </label>
        )}
        <div className="relative">
          <button
            ref={triggerRef}
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
              "w-full flex items-center justify-between gap-2 h-9 px-3 rounded-md text-snt-14 text-left transition-colors",
              "border", borderClass, "bg-snt-surface-row",
              isDisabled
                ? "opacity-40 cursor-not-allowed"
                : "cursor-pointer hover:border-snt-neutral-grey-500 focus:outline-none focus:border-snt-border-focus focus-visible:ring-2 focus-visible:ring-snt-focus-ring/40",
              isFocused && !isError && "ring-2 ring-snt-focus-ring/20",
            )}
          >
            <span
              className={cn(
                selected ? "text-snt-text-primary" : "text-snt-text-secondary",
                "truncate",
              )}
            >
              {selected?.label ?? placeholder}
            </span>
            <ChevronDown
              size={14}
              aria-hidden
              className={cn(
                "shrink-0 text-snt-text-secondary transition-transform",
                open && "rotate-180",
              )}
            />
          </button>

          {open && !isDisabled && createPortal(
            <div
              ref={listRef}
              id={listId}
              role="listbox"
              aria-labelledby={label ? labelId : undefined}
              // Portalled to <body> so overflow:hidden parents can't clip it;
              // z-toast keeps it above modals. Position is set in the layout effect.
              className="fixed z-toast top-0 left-0 overflow-auto rounded-md border border-snt-border-default bg-snt-surface-row shadow-snt-lg"
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
                      "w-full flex items-center justify-between gap-2 px-3 py-2 text-snt-14 text-left",
                      opt.disabled
                        ? "text-snt-text-disabled cursor-not-allowed"
                        : "text-snt-text-primary cursor-pointer",
                      isActive && !opt.disabled && "bg-snt-surface-row-hover",
                      isSel && !isActive && "bg-snt-brand-primary-500/8",
                    )}
                  >
                    <span className="truncate">{opt.label}</span>
                    {isSel && (
                      <Check size={14} aria-hidden className="text-snt-brand-primary-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>,
            document.body,
          )}
        </div>
        {message && (
          <div
            id={helperId}
            className={cn(
              "mt-1 text-snt-11 leading-tight",
              isError ? "text-snt-text-error" : "text-snt-text-secondary",
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
