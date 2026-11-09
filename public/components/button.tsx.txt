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

type Intent  = "neutral" | "primary" | "destructive";
type Variant = "solid"   | "outline" | "ghost";
type Size    = "sm"      | "md"      | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Meaning of the action. `"default"` is a deprecated alias of `"neutral"`. */
  intent?:   Intent | "default";
  variant?:  Variant;
  size?:     Size;
  loading?:  boolean;
  iconOnly?: boolean;
}

const BASE =
  "inline-flex items-center justify-center font-medium rounded-md select-none whitespace-nowrap " +
  "transition-[color,background-color,box-shadow,transform] cursor-pointer active:translate-y-px motion-reduce:active:translate-y-0 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-snt-surface-app " +
  "disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none " +
  "[&_svg]:shrink-0 [&_svg]:pointer-events-none";

const SIZE_CLASS: Record<Size, string> = {
  sm: "h-8 px-3 text-snt-14 gap-1 [&_svg]:size-3.5 compact:h-7 compact:px-2.5 compact:text-snt-12",
  md: "h-9 px-4 text-snt-14 gap-2 [&_svg]:size-3.5 compact:h-8 compact:px-3",
  lg: "h-11 px-5 text-snt-14 gap-2 [&_svg]:size-4 compact:h-10",
};

// Icons are sized by the button (14 / 14 / 16px), whatever size the icon asks for.
const ICON_ONLY_SIZE: Record<Size, string> = {
  sm: "w-8 h-8 p-0 [&_svg]:size-3.5 compact:size-7",
  md: "w-9 h-9 p-0 [&_svg]:size-4 compact:size-8",
  lg: "w-11 h-11 p-0 [&_svg]:size-5",
};

const VARIANT_CLASS: Record<Intent, Record<Variant, string>> = {
  // Neutral and primary share the brand focus ring: the old grey rings fell
  // below the 3:1 contrast a focus indicator needs.
  neutral: {
    solid:
      "bg-snt-text-primary text-snt-text-inverse shadow-snt-raised " +
      "hover:bg-snt-neutral-grey-800 " +
      "focus-visible:ring-snt-focus-ring",
    outline:
      "border border-snt-border-strong text-snt-text-primary bg-snt-surface-app shadow-snt-control " +
      "hover:bg-snt-bg-subtle " +
      "focus-visible:ring-snt-focus-ring",
    ghost:
      "text-snt-text-primary bg-transparent " +
      "hover:bg-snt-bg-subtle " +
      "focus-visible:ring-snt-focus-ring",
  },
  primary: {
    solid:
      "bg-snt-btn-primary-600 text-snt-text-on-accent shadow-snt-raised " +
      "hover:bg-snt-btn-primary-700 " +
      "focus-visible:ring-snt-focus-ring",
    outline:
      "border border-snt-text-link text-snt-text-link bg-snt-surface-app shadow-snt-control " +
      "hover:bg-snt-bg-brand-subtle " +
      "focus-visible:ring-snt-focus-ring",
    ghost:
      "text-snt-text-link bg-transparent " +
      "hover:bg-snt-bg-brand-subtle " +
      "focus-visible:ring-snt-focus-ring",
  },
  destructive: {
    solid:
      "bg-snt-btn-error-600 text-snt-text-on-accent shadow-snt-raised " +
      "hover:bg-snt-btn-error-700 " +
      "focus-visible:ring-snt-focus-ring-error",
    outline:
      "border border-snt-text-error text-snt-text-error bg-snt-surface-app shadow-snt-control " +
      "hover:bg-snt-bg-error-subtle " +
      "focus-visible:ring-snt-focus-ring-error",
    ghost:
      "text-snt-text-error bg-transparent " +
      "hover:bg-snt-bg-error-subtle " +
      "focus-visible:ring-snt-focus-ring-error",
  },
};

const SPINNER_PX: Record<Size, number> = { sm: 14, md: 14, lg: 16 };

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
 *   <Link href="/scans" className={buttonVariants({ intent: "neutral", variant: "outline" })}>View scans</Link>
 */
export function buttonVariants({
  intent   = "primary",
  variant  = "solid",
  size     = "md",
  iconOnly = false,
}: Pick<ButtonProps, "intent" | "variant" | "size" | "iconOnly"> = {}) {
  const tone: Intent = intent === "default" ? "neutral" : intent;
  return cn(BASE, iconOnly ? ICON_ONLY_SIZE[size] : SIZE_CLASS[size], VARIANT_CLASS[tone][variant]);
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
      onClick,
      ...props
    },
    ref,
  ) => {
    // Loading keeps the button focusable (aria-disabled, not disabled) so
    // keyboard users don't lose their place. Presses do nothing: the click
    // handler is dropped and a submit button stops submitting until it's done.
    return (
      <button
        ref={ref}
        {...props}
        type={loading ? "button" : (type ?? "button")}
        disabled={disabled}
        aria-disabled={loading || undefined}
        aria-busy={loading || undefined}
        onClick={loading ? undefined : onClick}
        className={cn(buttonVariants({ intent, variant, size, iconOnly }), loading && "relative cursor-progress", className)}
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
