"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn, inheritTheme } from "@/lib/utils";

/**
 * sentinel/ui — DropdownMenu
 *
 * Drop this file into your project at components/ui/dropdown-menu.tsx.
 *
 * A dropdown menu of actions behind a button (row actions, "More", account).
 * Follows the WAI-ARIA menu-button pattern: arrow keys, Home / End,
 * type-ahead, Escape returns focus to the button.
 *
 *   <DropdownMenu>
 *     <DropdownMenuTrigger className={buttonVariants({ intent: "neutral", variant: "outline" })}>Actions</DropdownMenuTrigger>
 *     <DropdownMenuContent>
 *       <DropdownMenuItem onSelect={rescan}>Re-run scan</DropdownMenuItem>
 *       <DropdownMenuSeparator />
 *       <DropdownMenuItem destructive onSelect={remove}>Delete asset</DropdownMenuItem>
 *     </DropdownMenuContent>
 *   </DropdownMenu>
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • snt-* design tokens — grab tokens.css from the Theming page.
 */

type DropdownMenuContextValue = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  focusOnOpenRef: React.RefObject<"first" | "last">;
  menuId: string;
  triggerId: string;
};
const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);
const useDropdownMenu = () => {
  const ctx = React.useContext(DropdownMenuContext);
  if (!ctx) throw new Error("DropdownMenu parts must be used inside <DropdownMenu>");
  return ctx;
};
const noopSubscribe = () => () => {};

const ITEM = '[role="menuitem"]:not([aria-disabled="true"])';

export function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement | null>(null);
  const focusOnOpenRef = React.useRef<"first" | "last">("first");
  const id = React.useId();
  const value = React.useMemo(
    () => ({ open, setOpen, triggerRef, focusOnOpenRef, menuId: `${id}-menu`, triggerId: `${id}-trigger` }),
    [open, id],
  );
  return <DropdownMenuContext.Provider value={value}>{children}</DropdownMenuContext.Provider>;
}

export const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ onClick, onKeyDown, children, ...props }, ref) => {
    const { open, setOpen, triggerRef, focusOnOpenRef, menuId, triggerId } = useDropdownMenu();
    return (
      <button
        ref={(node) => {
          triggerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        id={triggerId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={(e) => {
          onClick?.(e);
          if (e.defaultPrevented) return;
          focusOnOpenRef.current = "first";
          setOpen(!open);
        }}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (e.key === "ArrowDown" || e.key === "ArrowUp") {
            e.preventDefault();
            focusOnOpenRef.current = e.key === "ArrowUp" ? "last" : "first";
            setOpen(true);
          }
        }}
        {...props}
      >
        {children}
      </button>
    );
  },
);
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

export interface DropdownMenuContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Which edge of the button the menu lines up with. */
  align?: "start" | "end";
}

export function DropdownMenuContent({ align = "start", className, children, onKeyDown, ...props }: DropdownMenuContentProps) {
  const { open, setOpen, triggerRef, focusOnOpenRef, menuId, triggerId } = useDropdownMenu();
  const mounted = React.useSyncExternalStore(noopSubscribe, () => true, () => false);
  const menuRef = React.useRef<HTMLDivElement>(null);
  const typeahead = React.useRef({ text: "", timer: 0 });

  const close = React.useCallback(
    (restoreFocus: boolean) => {
      setOpen(false);
      if (restoreFocus) triggerRef.current?.focus();
    },
    [setOpen, triggerRef],
  );

  // Place under the button (or above when there's no room), follow scroll / resize.
  React.useLayoutEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    const trigger = triggerRef.current;
    if (!menu || !trigger) return;
    inheritTheme(trigger, menu);
    const place = () => {
      const r = trigger.getBoundingClientRect();
      const gap = 4;
      const height = menu.offsetHeight;
      const below = window.innerHeight - r.bottom - gap - 8;
      const flip = below < height && r.top > below;
      menu.style.minWidth = `${r.width}px`;
      menu.style.top = `${flip ? Math.max(8, r.top - gap - height) : r.bottom + gap}px`;
      if (align === "end") {
        menu.style.left = "auto";
        menu.style.right = `${Math.max(8, window.innerWidth - r.right)}px`;
      } else {
        menu.style.right = "auto";
        menu.style.left = `${Math.min(r.left, window.innerWidth - menu.offsetWidth - 8)}px`;
      }
    };
    place();
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    return () => {
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
    };
  }, [open, align, triggerRef]);

  // Focus the first / last item on open; close on outside press.
  React.useEffect(() => {
    if (!open) return;
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(ITEM) ?? []);
    (focusOnOpenRef.current === "last" ? items[items.length - 1] : items[0])?.focus();
    const onDown = (e: MouseEvent) => {
      const t = e.target as Node;
      if (menuRef.current?.contains(t) || triggerRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, focusOnOpenRef, setOpen, triggerRef]);

  if (!mounted || !open) return null;

  const onMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    const items = Array.from(menuRef.current?.querySelectorAll<HTMLElement>(ITEM) ?? []);
    const at = items.indexOf(document.activeElement as HTMLElement);
    const move = (i: number) => { e.preventDefault(); items[(i + items.length) % items.length]?.focus(); };
    switch (e.key) {
      case "ArrowDown": return move(at + 1);
      case "ArrowUp":   return move(at - 1);
      case "Home":      return move(0);
      case "End":       return move(items.length - 1);
      case "Escape":    e.preventDefault(); e.stopPropagation(); return close(true);
      case "Tab":       return close(false);
    }
    // Type-ahead: jump to the next item whose label starts with what was typed.
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const ta = typeahead.current;
      window.clearTimeout(ta.timer);
      ta.text += e.key.toLowerCase();
      ta.timer = window.setTimeout(() => { ta.text = ""; }, 500);
      const hit = [...items.slice(at + 1), ...items.slice(0, at + 1)].find((el) =>
        (el.textContent ?? "").trim().toLowerCase().startsWith(ta.text),
      );
      hit?.focus();
    }
  };

  return createPortal(
    <div
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-labelledby={triggerId}
      tabIndex={-1}
      onKeyDown={onMenuKeyDown}
      className={cn(
        "fixed z-modal min-w-40 overflow-y-auto rounded-lg border border-snt-border-default bg-snt-surface-app p-1 shadow-snt-md focus:outline-none",
        className,
      )}
      style={{ maxHeight: "min(20rem, 80vh)" }}
      {...props}
    >
      <DropdownMenuCloseContext.Provider value={() => close(true)}>{children}</DropdownMenuCloseContext.Provider>
    </div>,
    document.body,
  );
}

const DropdownMenuCloseContext = React.createContext<() => void>(() => {});

export interface DropdownMenuItemProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> {
  onSelect?: () => void;
  /** Red text: an action that destroys something. */
  destructive?: boolean;
  /** Right-aligned hint, e.g. "⌘E". Not a binding — you wire the shortcut. */
  shortcut?: string;
}

export const DropdownMenuItem = React.forwardRef<HTMLButtonElement, DropdownMenuItemProps>(
  ({ onSelect, destructive, shortcut, disabled, className, children, onClick, ...props }, ref) => {
    const close = React.useContext(DropdownMenuCloseContext);
    return (
      <button
        ref={ref}
        type="button"
        role="menuitem"
        tabIndex={-1}
        aria-disabled={disabled || undefined}
        onClick={(e) => {
          onClick?.(e);
          if (disabled || e.defaultPrevented) return;
          onSelect?.();
          close();
        }}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-1.5 text-left text-snt-14 transition-colors focus:outline-none [&_svg]:size-4 [&_svg]:shrink-0",
          destructive
            ? "text-snt-text-error focus:bg-snt-bg-error-subtle"
            : "text-snt-text-primary focus:bg-snt-bg-subtle",
          disabled && "cursor-not-allowed opacity-40",
          className,
        )}
        {...props}
      >
        <span className="flex flex-1 items-center gap-2">{children}</span>
        {shortcut && <span className="font-mono text-snt-12 text-snt-text-secondary">{shortcut}</span>}
      </button>
    );
  },
);
DropdownMenuItem.displayName = "DropdownMenuItem";

export function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div role="separator" className={cn("-mx-1 my-1 h-px bg-snt-border-default", className)} />;
}

export function DropdownMenuLabel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div role="presentation" className={cn("px-2.5 pb-1 pt-2 text-snt-11 font-medium uppercase tracking-wide text-snt-text-secondary", className)}>{children}</div>;
}
