"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — Modal
 *
 * Drop this file into your project at components/ui/modal.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 *   • lucide-react (for the close icon)
 */

type Size = "sm" | "md" | "lg";

const SIZE_CLASS: Record<Size, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-2xl",
};

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
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => { setMounted(true); }, []);

    React.useEffect(() => {
      if (!open || !closeOnEscape) return;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onOpenChange(false);
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [open, closeOnEscape, onOpenChange]);

    if (!mounted || !open) return null;

    return createPortal(
      <div
        className="fixed inset-0 z-modal flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={closeOnBackdrop ? () => onOpenChange(false) : undefined}
        role="dialog"
        aria-modal="true"
      >
        <div
          ref={ref}
          className={cn(
            "relative w-full bg-s4e-surface-app border border-s4e-neutral-divider-10 rounded-xl shadow-xl",
            SIZE_CLASS[size],
            className,
          )}
          onClick={(e) => e.stopPropagation()}
          {...props}
        >
          {children}
        </div>
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
          "flex items-center justify-between px-5 py-3.5 border-b border-s4e-neutral-divider-10",
          className,
        )}
        {...props}
      >
        {children}
        {showClose && onClose && (
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-md hover:bg-s4e-neutral-grey-100 flex items-center justify-center text-s4e-text-disabled hover:text-s4e-text-primary transition-colors"
          >
            <X size={15} />
          </button>
        )}
      </div>
    );
  },
);
ModalHeader.displayName = "ModalHeader";

export interface ModalTitleProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const ModalTitle = React.forwardRef<HTMLSpanElement, ModalTitleProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn("text-[14px] font-semibold text-s4e-text-primary", className)}
        {...props}
      >
        {children}
      </span>
    );
  },
);
ModalTitle.displayName = "ModalTitle";

export interface ModalDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

export const ModalDescription = React.forwardRef<HTMLParagraphElement, ModalDescriptionProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-[13px] text-s4e-text-disabled leading-relaxed", className)}
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
            ? "px-5 py-3.5 border-t border-s4e-neutral-divider-10"
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
