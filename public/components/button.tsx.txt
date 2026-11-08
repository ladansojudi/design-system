import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Button
 *
 * Drop this file into your project at components/ui/button.tsx.
 *
 * No "use client": Button has no hooks, so it renders in Server Components and
 * buttonVariants() can style links on the server.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

type Intent  = "default" | "primary" | "destructive";
type Variant = "solid"   | "outline" | "ghost";
type Size    = "sm"      | "md"      | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  intent?:   Intent;
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  iconOnly?: boolean;
}

const BASE =
  "inline-flex items-center justify-center font-medium rounded-md select-none whitespace-nowrap " +
  "transition-colors cursor-pointer " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-snt-surface-app " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-8 px-3 text-snt-14 gap-1",
  md: "h-9 px-4 text-snt-14 gap-2",
  lg: "h-11 px-5 text-snt-14 gap-2",
};

const ICON_ONLY_SIZE: Record<Size, string> = {
  sm: "w-8 h-8 p-0",
  md: "w-9 h-9 p-0",
  lg: "w-11 h-11 p-0",
};

const VARIANT_CLASS: Record<Intent, Record<Variant, string>> = {
  default: {
    solid:
      "bg-snt-text-primary text-snt-text-inverse " +
      "hover:bg-snt-neutral-grey-800 " +
      "focus-visible:ring-snt-neutral-grey-500",
    outline:
      "border border-snt-border-strong text-snt-text-primary bg-transparent " +
      "hover:bg-snt-bg-subtle " +
      "focus-visible:ring-snt-neutral-grey-400",
    ghost:
      "text-snt-text-primary bg-transparent " +
      "hover:bg-snt-bg-subtle " +
      "focus-visible:ring-snt-neutral-grey-300",
  },
  primary: {
    solid:
      "bg-snt-btn-primary-600 text-snt-text-on-accent " +
      "hover:bg-snt-btn-primary-700 " +
      "focus-visible:ring-snt-focus-ring",
    outline:
      "border border-snt-text-link text-snt-text-link bg-transparent " +
      "hover:bg-snt-bg-brand-subtle " +
      "focus-visible:ring-snt-focus-ring",
    ghost:
      "text-snt-text-link bg-transparent " +
      "hover:bg-snt-bg-brand-subtle " +
      "focus-visible:ring-snt-focus-ring",
  },
  destructive: {
    solid:
      "bg-snt-btn-error-600 text-snt-text-on-accent " +
      "hover:bg-snt-btn-error-700 " +
      "focus-visible:ring-snt-focus-ring-error",
    outline:
      "border border-snt-text-error text-snt-text-error bg-transparent " +
      "hover:bg-snt-bg-error-subtle " +
      "focus-visible:ring-snt-focus-ring-error",
    ghost:
      "text-snt-text-error bg-transparent " +
      "hover:bg-snt-bg-error-subtle " +
      "focus-visible:ring-snt-focus-ring-error",
  },
};

const SPINNER_PX: Record<Size, number> = { sm: 13, md: 14, lg: 16 };

// While loading, the label stays in the layout (no width jump) and in the
// accessibility tree (opacity, not visibility); the spinner sits on top.
const LABEL_GAP: Record<Size, string> = { sm: "gap-1", md: "gap-2", lg: "gap-2" };

function Spinner({ size }: { size: number }) {
  return (
    <span
      aria-hidden
      className="inline-block rounded-full animate-spin border-2 border-current/30 border-t-current"
      style={{ width: size, height: size }}
    />
  );
}

/**
 * Button classes for elements that must not be a <button> — e.g. a Next
 * <Link> or <a> that navigates but should look like a button:
 *   <Link href="/scans" className={buttonVariants({ variant: "outline" })}>View scans</Link>
 */
export function buttonVariants({
  intent   = "primary",
  variant  = "solid",
  size     = "md",
  iconOnly = false,
}: Pick<ButtonProps, "intent" | "variant" | "size" | "iconOnly"> = {}) {
  return cn(BASE, iconOnly ? ICON_ONLY_SIZE[size] : SIZE_CLASS[size], VARIANT_CLASS[intent][variant]);
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      intent   = "primary",
      variant  = "solid",
      size     = "md",
      loading  = false,
      iconOnly = false,
      disabled,
      className,
      children,
      type,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type ?? "button"}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        className={cn(buttonVariants({ intent, variant, size, iconOnly }), loading && "relative", className)}
        {...props}
      >
        {loading ? (
          <>
            <span className={cn("inline-flex items-center opacity-0", LABEL_GAP[size])}>{children}</span>
            <span className="absolute inset-0 flex items-center justify-center">
              <Spinner size={SPINNER_PX[size]} />
            </span>
          </>
        ) : children}
      </button>
    );
  },
);
Button.displayName = "Button";
