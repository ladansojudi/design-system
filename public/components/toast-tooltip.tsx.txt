"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { CircleCheck, CircleAlert, Lightbulb, Ban, X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Toast & Tooltip
 *
 * Drop this file into your project at components/ui/toast-tooltip.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • lucide-react icons
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

// ── Toast ──────────────────────────────────────────────────────────────────

export type ToastIntent = "success" | "alert" | "info" | "warning";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  intent?:      ToastIntent;
  title?:       string;
  description?: string;
  onDismiss?:   () => void;
  /** Length of the countdown bar in ms (matches auto-dismiss in ToastProvider). */
  duration?:    number;
  /** Freezes the countdown bar (hover / focus in ToastProvider). */
  paused?:      boolean;
}

const TOAST_ICON: Record<ToastIntent, React.ComponentType<{ size?: number; className?: string }>> = {
  success: CircleCheck,
  alert:   Ban,
  info:    Lightbulb,
  warning: CircleAlert,
};

const TOAST_COLOR: Record<ToastIntent, string> = {
  success: "text-snt-feedback-success",
  alert:   "text-snt-feedback-alert",
  info:    "text-snt-feedback-info",
  warning: "text-snt-feedback-warning",
};

const TOAST_BAR: Record<ToastIntent, string> = {
  success: "bg-snt-feedback-success",
  alert:   "bg-snt-feedback-alert",
  info:    "bg-snt-feedback-info",
  warning: "bg-snt-feedback-warning",
};

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      intent = "info",
      title,
      description,
      onDismiss,
      duration = 4000,
      paused = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const Icon = TOAST_ICON[intent];

    return (
      <div
        ref={ref}
        // Failures interrupt; everything else is announced politely.
        role={intent === "alert" ? "alert" : "status"}
        aria-live={intent === "alert" ? "assertive" : "polite"}
        aria-atomic="true"
        className={cn(
          "overflow-hidden bg-snt-surface-app border border-snt-border-default rounded-xl shadow-snt-lg",
          className,
        )}
        {...props}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <Icon size={20} aria-hidden className={cn("shrink-0", TOAST_COLOR[intent])} />
          <div className="flex-1 min-w-0">
            {title && (
              <div className="text-snt-14 font-semibold text-snt-text-primary">{title}</div>
            )}
            {description && (
              <div className="text-snt-12 text-snt-text-secondary">{description}</div>
            )}
            {!title && !description && children}
          </div>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="shrink-0 rounded text-snt-text-secondary hover:text-snt-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
              aria-label="Dismiss"
            >
              <X size={15} aria-hidden />
            </button>
          )}
        </div>
        <div className="h-[3px] w-full bg-snt-bg-subtle">
          <div
            className={cn("h-full toast-timer-bar", TOAST_BAR[intent])}
            style={{ animationDuration: `${duration}ms`, animationPlayState: paused ? "paused" : "running" }}
          />
        </div>
      </div>
    );
  },
);
Toast.displayName = "Toast";

// ── Toast manager ──────────────────────────────────────────────────────────
//
//   <ToastProvider>…app…</ToastProvider>
//   const toast = useToast();
//   toast({ intent: "success", title: "Scan scheduled" });
//
// Toasts stack bottom-right, auto-dismiss after `duration` and pause while
// hovered or focused (WCAG 2.2.1). At most `max` are shown at once.

export interface ToastOptions {
  intent?:      ToastIntent;
  title?:       string;
  description?: string;
  /** Auto-dismiss delay in ms. Default 4000; failures default to 8000. */
  duration?:    number;
}

type ToastEntry = ToastOptions & { id: number };

const ToastContext = React.createContext<((options: ToastOptions) => number) | null>(null);

export function useToast() {
  const toast = React.useContext(ToastContext);
  if (!toast) throw new Error("useToast() must be used inside <ToastProvider>");
  return toast;
}

const noopSubscribe = () => () => {};

export function ToastProvider({ children, max = 3 }: { children: React.ReactNode; max?: number }) {
  const [toasts, setToasts] = React.useState<ToastEntry[]>([]);
  const nextId = React.useRef(0);
  const isClient = React.useSyncExternalStore(noopSubscribe, () => true, () => false);

  const dismiss = React.useCallback((id: number) => setToasts((all) => all.filter((t) => t.id !== id)), []);
  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = ++nextId.current;
      setToasts((all) => [...all, { ...options, id }].slice(-max));
      return id;
    },
    [max],
  );

  return (
    <ToastContext.Provider value={toast}>
      {children}
      {isClient && createPortal(
        <section
          aria-label="Notifications"
          className="fixed bottom-4 right-4 z-toast flex w-[360px] max-w-[calc(100vw-2rem)] flex-col gap-2"
        >
          {toasts.map((t) => (
            <ManagedToast key={t.id} entry={t} onDismiss={() => dismiss(t.id)} />
          ))}
        </section>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}

function ManagedToast({ entry, onDismiss }: { entry: ToastEntry; onDismiss: () => void }) {
  const duration = entry.duration ?? (entry.intent === "alert" ? 8000 : 4000);
  const [paused, setPaused] = React.useState(false);
  const remaining = React.useRef(duration);

  React.useEffect(() => {
    if (paused) return;
    const started = Date.now();
    const timer = window.setTimeout(onDismiss, remaining.current);
    return () => {
      window.clearTimeout(timer);
      remaining.current -= Date.now() - started;
    };
  }, [paused, onDismiss]);

  return (
    <Toast
      intent={entry.intent}
      title={entry.title}
      description={entry.description}
      duration={duration}
      paused={paused}
      onDismiss={onDismiss}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    />
  );
}

// ── Tooltip ────────────────────────────────────────────────────────────────

type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  content:    string;
  position?:  TooltipPosition;
  /** Force the bubble open (docs / screenshots). Omit for hover + focus behaviour. */
  open?:      boolean;
  /** Hover delay in ms before showing. */
  delay?:     number;
}

const BUBBLE_POS: Record<TooltipPosition, string> = {
  top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left:   "right-full top-1/2 -translate-y-1/2 mr-2",
  right:  "left-full top-1/2 -translate-y-1/2 ml-2",
};

const ARROW_POS: Record<TooltipPosition, string> = {
  top:    "top-full left-1/2 -translate-x-1/2",
  bottom: "bottom-full left-1/2 -translate-x-1/2",
  left:   "left-full top-1/2 -translate-y-1/2",
  right:  "right-full top-1/2 -translate-y-1/2",
};

const ARROW_BORDER: Record<TooltipPosition, string> = {
  top:    "border-t-snt-neutral-grey-900 border-b-transparent border-x-transparent",
  bottom: "border-b-snt-neutral-grey-900 border-t-transparent border-x-transparent",
  left:   "border-l-snt-neutral-grey-900 border-r-transparent border-y-transparent",
  right:  "border-r-snt-neutral-grey-900 border-l-transparent border-y-transparent",
};

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      content,
      position = "top",
      open: forcedOpen,
      delay = 300,
      className,
      children,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const tooltipId          = React.useId();
    const [shown, setShown]  = React.useState(false);
    const timer              = React.useRef<number>(0);
    const open               = forcedOpen ?? shown;

    const show = (immediate = false) => {
      window.clearTimeout(timer.current);
      if (immediate) setShown(true);
      else timer.current = window.setTimeout(() => setShown(true), delay);
    };
    const hide = () => {
      window.clearTimeout(timer.current);
      setShown(false);
    };
    React.useEffect(() => () => window.clearTimeout(timer.current), []);

    // Describe the trigger by the tooltip. A single element child gets
    // aria-describedby merged in; anything else relies on the wrapper.
    const trigger = React.isValidElement<{ "aria-describedby"?: string }>(children)
      ? React.cloneElement(children, {
          "aria-describedby": cn(children.props["aria-describedby"], tooltipId) || undefined,
        })
      : children;

    return (
      <div
        ref={ref}
        className={cn("relative inline-flex", className)}
        onMouseEnter={(e) => { show(); onMouseEnter?.(e); }}
        onMouseLeave={(e) => { hide(); onMouseLeave?.(e); }}
        onFocus={(e) => { show(true); onFocus?.(e); }}
        onBlur={(e) => { hide(); onBlur?.(e); }}
        onKeyDown={(e) => {
          // WCAG 1.4.13 — dismissible without moving pointer or focus.
          if (e.key === "Escape" && open) hide();
          onKeyDown?.(e);
        }}
        {...props}
      >
        {trigger}
        <div
          id={tooltipId}
          role="tooltip"
          hidden={!open}
          className={cn(
            "absolute z-50 w-56 px-3 py-2 rounded-xl text-snt-12 text-snt-text-inverse leading-relaxed pointer-events-none",
            "bg-snt-neutral-grey-900",
            BUBBLE_POS[position],
          )}
        >
          {content}
          <div
            aria-hidden
            className={cn(
              "absolute border-4",
              ARROW_POS[position],
              ARROW_BORDER[position],
            )}
          />
        </div>
      </div>
    );
  },
);
Tooltip.displayName = "Tooltip";
