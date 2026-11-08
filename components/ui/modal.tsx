"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — Modal
 *
 * Drop this file into your project at components/ui/modal.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react (for the close icon)
 */

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"]), [contenteditable="true"]';

type ModalContextValue = {
  titleId:        string;
  descriptionId:  string;
  setHasTitle:       (v: boolean) => void;
  setHasDescription: (v: boolean) => void;
};

const ModalContext = React.createContext<ModalContextValue | null>(null);

const noopSubscribe = () => () => {};

export interface ModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open:          boolean;
  onOpenChange:  (open: boolean) => void;
  size?:         Size;
  closeOnBackdrop?: boolean;
  closeOnEscape?:   boolean;
}

export const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      open,
      onOpenChange,
      size = "sm",
      closeOnBackdrop = true,
      closeOnEscape   = true,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // true on the client only — portals can't render during SSR.
    const mounted = React.useSyncExternalStore(noopSubscribe, () => true, () => false);
    const [hasTitle, setHasTitle]       = React.useState(false);
    const [hasDescription, setHasDesc]  = React.useState(false);
    const panelRef                      = React.useRef<HTMLDivElement>(null);
    const backdropRef                   = React.useRef<HTMLDivElement>(null);
    React.useImperativeHandle(ref, () => panelRef.current as HTMLDivElement);

    const autoId        = React.useId();
    const titleId       = `${autoId}-title`;
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
        const nodes = Array.from(
          panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((el) => el.offsetParent !== null || el === document.activeElement);
        if (nodes.length === 0) {
          e.preventDefault();
          panelRef.current.focus();
          return;
        }
        const first = nodes[0];
        const last  = nodes[nodes.length - 1];
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

    // Initial focus, focus restore and body scroll lock.
    React.useEffect(() => {
      if (!open || !mounted) return;
      const previouslyFocused = document.activeElement as HTMLElement | null;
      const panel = panelRef.current;
      const target =
        panel?.querySelector<HTMLElement>("[data-autofocus], [autofocus]") ??
        panel?.querySelector<HTMLElement>(FOCUSABLE) ??
        panel;
      target?.focus();

      const { overflow } = document.body.style;
      document.body.style.overflow = "hidden";

      // Make everything outside the dialog inert, so screen-reader virtual
      // cursors and pointer clicks can't reach the page behind it.
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

    const context = React.useMemo<ModalContextValue>(
      () => ({ titleId, descriptionId, setHasTitle, setHasDescription: setHasDesc }),
      [titleId, descriptionId],
    );

    if (!mounted || !open) return null;

    return createPortal(
      <div
        ref={backdropRef}
        className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={closeOnBackdrop ? () => onOpenChange(false) : undefined}
      >
        <ModalContext.Provider value={context}>
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={hasTitle && !props["aria-label"] ? titleId : undefined}
            aria-describedby={hasDescription ? descriptionId : undefined}
            tabIndex={-1}
            className={cn(
              "relative w-full bg-snt-surface-app border border-snt-border-default rounded-xl shadow-xl focus:outline-none",
              SIZE_CLASS[size],
              className,
            )}
            onClick={(e) => e.stopPropagation()}
            {...props}
          >
            {children}
          </div>
        </ModalContext.Provider>
      </div>,
      document.body,
    );
  },
);
Modal.displayName = "Modal";

export interface ModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onClose?: () => void;
  showClose?: boolean;
}

export const ModalHeader = React.forwardRef<HTMLDivElement, ModalHeaderProps>(
  ({ className, children, onClose, showClose = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between px-5 py-3.5 border-b border-snt-border-default",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="w-7 h-7 rounded-md hover:bg-snt-bg-subtle flex items-center justify-center text-snt-text-secondary hover:text-snt-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring"
          >
            <X size={15} aria-hidden />
          </button>
        )}
      </div>
    );
  },
);
ModalHeader.displayName = "ModalHeader";

export type ModalTitleProps = React.HTMLAttributes<HTMLSpanElement>;

export const ModalTitle = React.forwardRef<HTMLSpanElement, ModalTitleProps>(
  ({ className, children, id, ...props }, ref) => {
    const ctx = React.useContext(ModalContext);
    React.useLayoutEffect(() => {
      if (!ctx || id) return;
      ctx.setHasTitle(true);
      return () => ctx.setHasTitle(false);
    }, [ctx, id]);
    return (
      <span
        ref={ref}
        id={id ?? ctx?.titleId}
        className={cn("text-snt-14 font-semibold text-snt-text-primary", className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);
ModalTitle.displayName = "ModalTitle";

export type ModalDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, children, id, ...props }, ref) => {
    const ctx = React.useContext(ModalContext);
    React.useLayoutEffect(() => {
      if (!ctx || id) return;
      ctx.setHasDescription(true);
      return () => ctx.setHasDescription(false);
    }, [ctx, id]);
    return (
      <p
        ref={ref}
        id={id ?? ctx?.descriptionId}
        className={cn("text-snt-14 text-snt-text-secondary leading-relaxed", className)}
        {...props}
      >
        {children}
      </p>
    );
  },
);
ModalDescription.displayName = "ModalDescription";

export interface ModalBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  scrollable?: boolean;
}

export const ModalBody = React.forwardRef<HTMLDivElement, ModalBodyProps>(
  ({ className, children, scrollable = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "px-5 py-5",
          scrollable && "max-h-[60vh] overflow-y-auto",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalBody.displayName = "ModalBody";

export interface ModalFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  bordered?: boolean;
}

export const ModalFooter = React.forwardRef<HTMLDivElement, ModalFooterProps>(
  ({ className, children, bordered = false, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex justify-end gap-2",
          bordered
            ? "px-5 py-3.5 border-t border-snt-border-default"
            : "px-5 pb-4",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);
ModalFooter.displayName = "ModalFooter";
