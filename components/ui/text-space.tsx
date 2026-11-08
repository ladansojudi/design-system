"use client";

import * as React from "react";
import {
  Bold, Italic, Underline, Strikethrough,
  Superscript, Subscript,
  List, ListOrdered,
  AlignLeft, AlignCenter, AlignRight,
  Link2, Image as LucideImage,
  Quote, Minus, X, Code,
  ChevronDown, Type,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * s4e/ui — TextSpace
 *
 * Drop this file into your project at components/ui/text-space.tsx.
 *
 * Requires:
 *   • Tailwind CSS v4
 *   • cn() helper at @/lib/utils (clsx + tailwind-merge)
 *   • s4e-* design tokens — grab tokens.css from the Theming page.
 */

export type TextSpaceState = "enabled" | "disabled" | "error";
export type ToolbarSize    = "simple"  | "full";

type IconComponent = React.ComponentType<{ size?: number; className?: string }>;

type ToolItem =
  | { type: "sep" }
  | {
      type:     "icon";
      icon:     IconComponent;
      label:    string;
      /** document.execCommand name. */
      command:  string;
      /** Static argument, or "prompt" to ask the user for a URL. */
      arg?:     string;
      /** Toggle commands expose their state with aria-pressed. */
      toggle?:  boolean;
    };

// Formatting uses document.execCommand: deprecated but still implemented by
// every browser, and dependency-free. Swap for Tiptap / Lexical when the
// product needs a document model (mentions, collaborative editing, …).
const TOOL_ITEMS: ToolItem[] = [
  { type: "icon", icon: Bold,          label: "Bold",           command: "bold",          toggle: true },
  { type: "icon", icon: Italic,        label: "Italic",         command: "italic",        toggle: true },
  { type: "icon", icon: Underline,     label: "Underline",      command: "underline",     toggle: true },
  { type: "icon", icon: Strikethrough, label: "Strikethrough",  command: "strikeThrough", toggle: true },
  { type: "sep" },
  { type: "icon", icon: Superscript,   label: "Superscript",    command: "superscript",   toggle: true },
  { type: "icon", icon: Subscript,     label: "Subscript",      command: "subscript",     toggle: true },
  { type: "sep" },
  { type: "icon", icon: List,          label: "Bulleted list",  command: "insertUnorderedList", toggle: true },
  { type: "icon", icon: ListOrdered,   label: "Numbered list",  command: "insertOrderedList",   toggle: true },
  { type: "icon", icon: Quote,         label: "Quote",          command: "formatBlock", arg: "blockquote" },
  { type: "sep" },
  { type: "icon", icon: AlignLeft,     label: "Align left",     command: "justifyLeft",   toggle: true },
  { type: "icon", icon: AlignCenter,   label: "Align center",   command: "justifyCenter", toggle: true },
  { type: "icon", icon: AlignRight,    label: "Align right",    command: "justifyRight",  toggle: true },
  { type: "sep" },
  { type: "icon", icon: Link2,         label: "Insert link",    command: "createLink",  arg: "prompt" },
  { type: "icon", icon: LucideImage,   label: "Insert image",   command: "insertImage", arg: "prompt" },
  { type: "icon", icon: Code,          label: "Code block",     command: "formatBlock", arg: "pre" },
  { type: "sep" },
  { type: "icon", icon: Minus,         label: "Horizontal rule",   command: "insertHorizontalRule" },
  { type: "icon", icon: X,             label: "Clear formatting",  command: "removeFormat" },
];

const TOGGLE_COMMANDS = TOOL_ITEMS.flatMap((t) => (t.type === "icon" && t.toggle ? [t.command] : []));

function readCommandState(): Record<string, boolean> {
  const state: Record<string, boolean> = {};
  for (const cmd of TOGGLE_COMMANDS) {
    try { state[cmd] = document.queryCommandState(cmd); } catch { state[cmd] = false; }
  }
  return state;
}

function runCommand(item: Extract<ToolItem, { type: "icon" }>) {
  let arg = item.arg;
  if (arg === "prompt") {
    const url = window.prompt(item.command === "createLink" ? "Link URL" : "Image URL", "https://");
    if (!url) return;
    arg = url;
  }
  document.execCommand(item.command, false, arg);
}

export interface TextSpaceToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  size?:     ToolbarSize;
  disabled?: boolean;
  /** Pressed state of toggle commands, keyed by execCommand name. */
  active?:   Record<string, boolean>;
  /** Called after a command runs (TextSpace uses it to sync value + state). */
  onCommand?: () => void;
}

// role="toolbar" with a roving tabindex: one Tab stop, ← → Home End move
// between buttons (APG Toolbar).
export const TextSpaceToolbar = React.forwardRef<HTMLDivElement, TextSpaceToolbarProps>(
  ({ size = "simple", disabled, active = {}, onCommand, className, onKeyDown, ...props }, ref) => {
    const [focusIndex, setFocusIndex] = React.useState(0);
    const buttonsRef = React.useRef<(HTMLButtonElement | null)[]>([]);
    const tools = TOOL_ITEMS.filter((t): t is Extract<ToolItem, { type: "icon" }> => t.type === "icon");

    const move = (next: number) => {
      const i = (next + tools.length) % tools.length;
      setFocusIndex(i);
      buttonsRef.current[i]?.focus();
    };

    let toolIndex = -1;

    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Formatting"
        aria-disabled={disabled || undefined}
        onKeyDown={(e) => {
          onKeyDown?.(e);
          if (e.defaultPrevented) return;
          if (e.key === "ArrowRight") { e.preventDefault(); move(focusIndex + 1); }
          if (e.key === "ArrowLeft")  { e.preventDefault(); move(focusIndex - 1); }
          if (e.key === "Home")       { e.preventDefault(); move(0); }
          if (e.key === "End")        { e.preventDefault(); move(tools.length - 1); }
        }}
        className={cn(
          "flex items-center flex-wrap gap-0.5 px-3 py-1.5 border-b border-s4e-neutral-divider-10",
          disabled && "opacity-40 pointer-events-none",
          className,
        )}
        {...props}
      >
        {/* Font pickers are visual placeholders — hidden from AT until built. */}
        {size === "full" && (
          <span aria-hidden className="flex items-center">
            <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
              <Type size={12} className="text-s4e-text-secondary" />
              <ChevronDown size={10} className="text-s4e-text-secondary" />
            </span>
            <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
              16px <ChevronDown size={10} className="text-s4e-text-secondary" />
            </span>
            <span className="flex items-center gap-0.5 text-[11px] text-s4e-text-secondary pr-1">
              Normal <ChevronDown size={10} className="text-s4e-text-secondary" />
            </span>
            <span className="w-px h-4 bg-s4e-neutral-divider-10 mx-1" />
          </span>
        )}
        {size === "simple" && (
          <span aria-hidden className="text-[11px] text-s4e-text-secondary mr-1.5">Font</span>
        )}
        {TOOL_ITEMS.map((item, i) => {
          if (item.type === "sep") {
            return <div key={i} role="separator" aria-orientation="vertical" className="w-px h-4 bg-s4e-neutral-divider-10 mx-0.5" />;
          }
          const index = ++toolIndex;
          const Icon  = item.icon;
          const pressed = item.toggle ? !!active[item.command] : undefined;
          return (
            <button
              key={i}
              ref={(el) => { buttonsRef.current[index] = el; }}
              type="button"
              aria-label={item.label}
              aria-pressed={pressed}
              title={item.label}
              tabIndex={index === focusIndex ? 0 : -1}
              disabled={disabled}
              // Keep the editor's selection when clicking a tool.
              onMouseDown={(e) => e.preventDefault()}
              onFocus={() => setFocusIndex(index)}
              onClick={() => { runCommand(item); onCommand?.(); }}
              className={cn(
                "p-1 rounded hover:bg-s4e-neutral-grey-100 disabled:pointer-events-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-brand-primary-500",
                pressed && "bg-s4e-neutral-grey-100",
              )}
            >
              <Icon size={13} className={pressed ? "text-s4e-text-primary" : "text-s4e-text-secondary"} />
            </button>
          );
        })}
      </div>
    );
  },
);
TextSpaceToolbar.displayName = "TextSpaceToolbar";

export interface TextSpaceProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  toolbarSize?:  ToolbarSize;
  state?:        TextSpaceState;
  placeholder?:  string;
  /** Accessible name for the editing area. Use `aria-labelledby` for a visible label. */
  label?:        string;
  /** Initial HTML. The editor is uncontrolled — read changes via onChange. */
  defaultValue?: string;
  onChange?:     (html: string) => void;
}

export const TextSpace = React.forwardRef<HTMLDivElement, TextSpaceProps>(
  (
    {
      toolbarSize = "simple",
      state       = "enabled",
      placeholder = "Write something awesome…",
      label,
      defaultValue = "",
      onChange,
      className,
      "aria-labelledby": labelledBy,
      "aria-describedby": describedBy,
      ...props
    },
    ref,
  ) => {
    const isDisabled = state === "disabled";
    const isError    = state === "error";

    const editorRef               = React.useRef<HTMLDivElement>(null);
    const [isEmpty, setIsEmpty]   = React.useState(!defaultValue);
    const [active, setActive]     = React.useState<Record<string, boolean>>({});

    React.useEffect(() => {
      if (editorRef.current) editorRef.current.innerHTML = defaultValue;
      // Only seed once — the editor is uncontrolled after mount.
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const sync = React.useCallback(() => {
      const el = editorRef.current;
      if (!el) return;
      setIsEmpty((el.textContent ?? "").trim() === "" && !el.querySelector("img,hr,li"));
      setActive(readCommandState());
      onChange?.(el.innerHTML);
    }, [onChange]);

    // Reflect bold / italic / … state for the caret position.
    React.useEffect(() => {
      const onSelection = () => {
        if (editorRef.current?.contains(document.getSelection()?.anchorNode ?? null)) {
          setActive(readCommandState());
        }
      };
      document.addEventListener("selectionchange", onSelection);
      return () => document.removeEventListener("selectionchange", onSelection);
    }, []);

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg border overflow-hidden",
          isError
            ? "border-s4e-text-error bg-s4e-scale-red-50"
            : "border-s4e-neutral-divider-10 bg-s4e-surface-app focus-within:border-s4e-brand-primary-500",
          isDisabled && "opacity-40",
          className,
        )}
        {...props}
      >
        <TextSpaceToolbar
          size={toolbarSize}
          disabled={isDisabled}
          active={active}
          onCommand={() => { editorRef.current?.focus(); sync(); }}
        />
        <div className="relative">
          {isEmpty && (
            <span
              aria-hidden
              className={cn(
                "absolute left-4 top-3 text-[12px] pointer-events-none",
                isError ? "text-s4e-text-error" : "text-s4e-text-secondary",
              )}
            >
              {placeholder}
            </span>
          )}
          <div
            ref={editorRef}
            role="textbox"
            aria-multiline="true"
            aria-label={labelledBy ? undefined : (label ?? placeholder)}
            aria-labelledby={labelledBy}
            aria-describedby={describedBy}
            aria-invalid={isError || undefined}
            aria-disabled={isDisabled || undefined}
            contentEditable={!isDisabled}
            suppressContentEditableWarning
            onInput={sync}
            className={cn(
              "px-4 py-3 min-h-24 text-[14px] text-s4e-text-primary outline-none",
              "[&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-5 [&_ol]:pl-5 [&_a]:text-s4e-text-link [&_a]:underline",
              "[&_blockquote]:border-l-2 [&_blockquote]:border-s4e-neutral-divider-10 [&_blockquote]:pl-3",
              "[&_pre]:font-mono [&_pre]:text-[12px] [&_pre]:bg-s4e-neutral-grey-100 [&_pre]:rounded [&_pre]:p-2",
              isDisabled && "cursor-not-allowed",
            )}
          />
        </div>
      </div>
    );
  },
);
TextSpace.displayName = "TextSpace";
