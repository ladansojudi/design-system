"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Switch & Radio
 *
 * Drop this file into your project at components/ui/switch-radio.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

type SwitchVariant = "dark" | "primary";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  checked:   boolean;
  onChange?: (v: boolean) => void;
  variant?:  SwitchVariant;
}

const TRACK_ON: Record<SwitchVariant, string> = {
  dark:    "bg-s4e-neutral-grey-800",
  primary: "bg-s4e-btn-primary-600",
};

const TRACK_ON_HOVER: Record<SwitchVariant, string> = {
  dark:    "hover:bg-s4e-neutral-grey-900",
  primary: "hover:bg-s4e-btn-primary-700",
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
      : cn("bg-s4e-neutral-grey-300", !disabled && "hover:bg-s4e-neutral-grey-400");

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange?.(!checked)}
        className={cn(
          "relative w-9 h-[22px] rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-s4e-brand-primary-500",
          track,
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out",
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
  ({ value, onChange, name, disabled, className, children, ...props }, ref) => {
    return (
      <RadioGroupContext.Provider value={{ value, onChange, name, disabled }}>
        <div
          ref={ref}
          role="radiogroup"
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
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-s4e-brand-primary-500",
          checked
            ? "border-s4e-neutral-grey-800"
            : "border-s4e-neutral-grey-400 hover:border-s4e-neutral-grey-600",
          disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer",
          !children && className,
        )}
        {...(!children ? props : {})}
      >
        {checked && (
          <span className="w-2 h-2 rounded-full bg-s4e-neutral-grey-800 transition-transform scale-100" />
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
            "text-[13px]",
            disabled ? "text-s4e-text-disabled" : "text-s4e-text-primary",
          )}
        >
          {children}
        </span>
      </label>
    );
  },
);
Radio.displayName = "Radio";
