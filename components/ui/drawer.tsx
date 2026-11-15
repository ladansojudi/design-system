"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn, inheritTheme } from "@/lib/utils";

/**
 * sentinel/ui — Drawer
 *
 * Drop this file into your project at components/ui/drawer.tsx.
 *
 * A side panel for details and edits that keep the page behind in context:
 * a finding's detail, filters, an asset's history. Same dialog behaviour as
 * Modal: focus trap, Escape, focus restore, scroll lock, inert page.
 *
 * Requires:
 *   • Tailwind CSS v4, lucide-react
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css (incl. the drawer animation) from the Theming page.
 */

type Side = "right" | "left";
type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = { sm: "max-w-sm", md: "max-w-md", lg: "max-w-2xl" };

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

type DrawerContextValue = {
  titleId: string;
  descriptionId: string;
  setHasTitle: (v: boolean) => void;
  setHasDescription: (v: boolean) => void;
};
const DrawerContext = React.createContext<DrawerContextValue | null>(null);
const noopSubscribe = () => () => {};

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: Side;
  size?: Size;
  closeOnBackdrop?: boolean;
  closeOnEscape?: boolean;
}

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>(
  (
    { open, onOpenChange, side = "right", size = "md", closeOnBackdrop = true, closeOnEscape = true, className, children, ...props },
    ref,
  ) => {
    const mounted = React.useSyncExternalStore(noopSubscribe, () => true, () => false);
    const [hasTitle, setHasTitle] = React.useState(false);
    const [hasDescription, setHasDesc] = React.useState(false);
    const panelRef = React.useRef<HTMLDivElement>(null);
    const backdropRef = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => panelRef.current as HTMLDivElement);

    const autoId = React.useId();
    const titleId = `${autoId}-title`;
    const descriptionId = `${autoId}-description`;

    // Escape to close + Tab focus trap.
    React.useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape" && closeOnEscape) {
          e.stopPropagation();
          onOpenChange(false);
          return;
        }
        if (e.key !== "Tab" || !panelRef.current) return;
        const nodes = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null || el === document.activeElement,
        );
        if (nodes.length === 0) {
          e.preventDefault();
          panelRef.current.focus();
          return;
        }
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !panelRef.current.contains(active))) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, closeOnEscape, onOpenChange]);

    // Initial focus, focus restore, scroll lock, inert page.
    React.useEffect(() => {
      if (!open || !mounted) return;
      const previouslyFocused = document.activeElement as HTMLElement | null;
      inheritTheme(previouslyFocused, backdropRef.current);
      const panel = panelRef.current;
      const target =
        panel?.querySelector<HTMLElement>("[data-autofocus], [autofocus]") ??
        panel?.querySelector<HTMLElement>(FOCUSABLE) ??
        panel;
      target?.focus();

      const { overflow } = document.body.style;
      document.body.style.overflow = "hidden";
      const inerted = Array.from(document.body.children).filter(
        (el): el is HTMLElement => el instanceof HTMLElement && el !== backdropRef.current && !el.inert,
      );
      inerted.forEach((el) => { el.inert = true; });

      return () => {
        inerted.forEach((el) => { el.inert = false; });
        document.body.style.overflow = overflow;
        previouslyFocused?.focus?.();
      };
    }, [open, mounted]);

    const context = React.useMemo<DrawerContextValue>(
      () => ({ titleId, descriptionId, setHasTitle, setHasDescription: setHasDesc }),
      [titleId, descriptionId],
    );

    if (!mounted || !open) return null;

    return createPortal(
      <div
        ref={backdropRef}
        className="fixed inset-0 z-modal bg-black/50 backdrop-blur-sm"
        onClick={closeOnBackdrop ? () => onOpenChange(false) : undefined}
      >
        <DrawerContext.Provider value={context}>
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={hasTitle && !props["aria-label"] ? titleId : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            tabIndex={-1}
            className={cn(
              "absolute inset-y-0 flex w-full flex-col bg-snt-surface-app shadow-snt-2xl focus:outline-none",
              side === "right" ? "right-0 border-l snt-drawer-right" : "left-0 border-r snt-drawer-left",
              "border-snt-border-default",
              SIZE_CLASS[size],
              className,
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </DrawerContext.Provider>
      </div>,
      document.body,
    );
  },
);
Drawer.displayName = "Drawer";

export interface DrawerHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  showClose?: boolean;
}

export const DrawerHeader = React.forwardRef<HTMLDivElement, DrawerHeaderProps>(
  ({ className, children, onClose, showClose = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex shrink-0 items-start justify-between gap-4 border-b border-snt-border-default px-5 py-4", className)}
      {...props}
    >
      <div className="min-w-0">{children}</div>
      {showClose && onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex size-7 shrink-0 items-center justify-center rounded-md text-snt-text-secondary transition-colors hover:bg-snt-bg-subtle hover:text-snt-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
        >
          <X size={15} aria-hidden />
        </button>
      )}
    </div>
  ),
);
DrawerHeader.displayName = "DrawerHeader";

export const DrawerTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, children, id, ...props }, ref) => {
    const ctx = React.useContext(DrawerContext);
    React.useLayoutEffect(() => {
      if (!ctx || id) return;
      ctx.setHasTitle(true);
      return () => ctx.setHasTitle(false);
    }, [ctx, id]);
    return (
      <h2 ref={ref} id={id ?? ctx?.titleId} className={cn("text-snt-16 font-semibold text-snt-text-primary", className)} {...props}>
        {children}
      </h2>
    );
  },
);
DrawerTitle.displayName = "DrawerTitle";

export const DrawerDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, id, ...props }, ref) => {
    const ctx = React.useContext(DrawerContext);
    React.useLayoutEffect(() => {
      if (!ctx || id) return;
      ctx.setHasDescription(true);
      return () => ctx.setHasDescription(false);
    }, [ctx, id]);
    return (
      <p ref={ref} id={id ?? ctx?.descriptionId} className={cn("mt-1 text-snt-14 leading-relaxed text-snt-text-secondary", className)} {...props}>
        {children}
      </p>
    );
  },
);
DrawerDescription.displayName = "DrawerDescription";

export const DrawerBody = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("min-h-0 flex-1 overflow-y-auto px-5 py-5", className)} {...props} />
  ),
);
DrawerBody.displayName = "DrawerBody";

export const DrawerFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex shrink-0 justify-end gap-2 border-t border-snt-border-default px-5 py-3.5", className)}
      {...props}
    />
  ),
);
DrawerFooter.displayName = "DrawerFooter";
