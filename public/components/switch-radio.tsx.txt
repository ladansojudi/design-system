"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Switch & Radio
 *
 * Drop this file into your project at components/ui/switch-radio.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

type SwitchVariant = "dark" | "primary";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked:   boolean;
  onChange?: (v: boolean) => void;
  variant?:  SwitchVariant;
}

const TRACK_ON: Record<SwitchVariant, string> = {
  dark:    "bg-snt-neutral-grey-800",
  primary: "bg-snt-btn-primary-600",
};

const TRACK_ON_HOVER: Record<SwitchVariant, string> = {
  dark:    "hover:bg-snt-neutral-grey-900",
  primary: "hover:bg-snt-btn-primary-700",
};

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      onChange,
      variant = "dark",
      disabled = false,
      className,
      ...props
    },
    ref,
  ) => {
    const track = checked
      ? cn(TRACK_ON[variant], !disabled && TRACK_ON_HOVER[variant])
      : cn("bg-snt-neutral-grey-300", !disabled && "hover:bg-snt-neutral-grey-400");

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative w-9 h-[22px] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-snt-focus-ring",
          track,
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "absolute top-[3px] left-0 w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
            checked ? "translate-x-[18px]" : "translate-x-[3px]",
          )}
        />
      </button>
    );
  },
);
Switch.displayName = "Switch";

// ── Radio ─────────────────────────────────────────────────────────────────

interface RadioGroupContextValue {
  value?:    string;
  onChange?: (v: string) => void;
  name?:     string;
  disabled?: boolean;
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?:    string;
  onChange?: (v: string) => void;
  name?:     string;
  disabled?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ value, onChange, name, disabled, className, children, onKeyDown, ...props }, ref) => {
    const groupRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => groupRef.current as HTMLDivElement);

    const radios = () =>
      Array.from(
        groupRef.current?.querySelectorAll<HTMLButtonElement>('[role="radio"]:not([disabled])') ?? [],
      );

    // Roving tabindex: the checked radio (or the first one when nothing is
    // checked) is the group's single Tab stop.
    React.useLayoutEffect(() => {
      const all = radios();
      if (all.length && !all.some((r) => r.tabIndex === 0)) all[0].tabIndex = 0;
    }, [value]);

    // Arrow keys move focus and selection together (APG Radio Group).
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      onKeyDown?.(e);
      if (e.defaultPrevented) return;
      const all = radios();
      const index = all.indexOf(document.activeElement as HTMLButtonElement);
      if (index < 0) return;
      let next: number | null = null;
      if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % all.length;
      if (e.key === "ArrowUp"   || e.key === "ArrowLeft")  next = (index - 1 + all.length) % all.length;
      if (next === null) return;
      e.preventDefault();
      all[next].focus();
      all[next].click();
    };

    return (
      <RadioGroupContext.Provider value={{ value, onChange, name, disabled }}>
        <div
          ref={groupRef}
          role="radiogroup"
          aria-disabled={disabled || undefined}
          onKeyDown={handleKeyDown}
          className={cn("flex flex-wrap gap-x-6 gap-y-3", className)}
          {...props}
        >
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  },
);
RadioGroup.displayName = "RadioGroup";

export interface RadioProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange" | "value"> {
  value?:    string;
  checked?:  boolean;
  onChange?: () => void;
}

export const Radio = React.forwardRef<HTMLButtonElement, RadioProps>(
  (
    {
      value,
      checked: checkedProp,
      onChange,
      disabled: disabledProp,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const group     = React.useContext(RadioGroupContext);
    const inGroup   = group !== null && value !== undefined;
    const checked   = inGroup ? group!.value === value : !!checkedProp;
    const disabled  = disabledProp ?? group?.disabled ?? false;
    const handleClick = () => {
      if (disabled) return;
      if (inGroup) group!.onChange?.(value!);
      else onChange?.();
    };

    const control = (
      <button
        ref={ref}
        type="button"
        role="radio"
        aria-checked={checked}
        tabIndex={inGroup ? (checked ? 0 : -1) : undefined}
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-snt-focus-ring",
          checked
            ? "border-snt-neutral-grey-800"
            : "border-snt-neutral-grey-400 hover:border-snt-neutral-grey-600",
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
          !children && className,
        )}
        {...(!children ? props : {})}
      >
        {checked && (
          <span className="w-2 h-2 rounded-full bg-snt-neutral-grey-800 transition-transform scale-100" />
        )}
      </button>
    );

    if (!children) return control;

    return (
      <label
        className={cn(
          "flex items-center gap-2.5 group",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          className,
        )}
      >
        {control}
        <span
          className={cn(
            "text-snt-14",
            disabled ? "text-snt-text-disabled" : "text-snt-text-primary",
          )}
        >
          {children}
        </span>
      </label>
    );
  },
);
Radio.displayName = "Radio";
