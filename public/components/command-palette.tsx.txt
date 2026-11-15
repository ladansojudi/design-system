"use client";

import * as React from "react";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

/**
 * sentinel/ui — CommandPalette
 *
 * Drop this file into your project at components/ui/command-palette.tsx.
 * Depends on components/ui/modal.tsx.
 *
 * A searchable list of commands and destinations ("Go to Scans", "Re-run scan").
 * You own the shortcut that opens it (usually ⌘K) — see the docs for a snippet.
 *
 *   <CommandPalette open={open} onOpenChange={setOpen} items={[
 *     { id: "scans", label: "Go to Scans", group: "Navigate", onSelect: () => router.push("/scans") },
 *   ]} />
 *
 * Requires: Tailwind CSS v4, cn() at @/lib/utils, snt-* tokens.
 */

export interface CommandItem {
  id: string;
  label: string;
  group?: string;
  /** Right-aligned hint, e.g. "G S". */
  hint?: string;
  icon?: React.ReactNode;
  /** Extra words that should match the search but aren't shown. */
  keywords?: string[];
  onSelect: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandItem[];
  placeholder?: string;
  emptyLabel?: string;
  /** Accessible name of the dialog. */
  label?: string;
}

function matches(item: CommandItem, query: string) {
  const hay = [item.label, item.group ?? "", ...(item.keywords ?? [])].join(" ").toLowerCase();
  return query.toLowerCase().split(/\s+/).filter(Boolean).every((w) => hay.includes(w));
}

export function CommandPalette({
  open,
  onOpenChange,
  items,
  placeholder = "Type a command or search…",
  emptyLabel = "No results found.",
  label = "Command palette",
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const listRef = React.useRef<HTMLUListElement>(null);
  const id = React.useId();
  const listId = `${id}-list`;

  const results = React.useMemo(() => items.filter((i) => matches(i, query)), [items, query]);
  const current = Math.min(active, Math.max(results.length - 1, 0));

  React.useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [current, results]);

  const choose = (item: CommandItem | undefined) => {
    if (!item) return;
    onOpenChange(false);
    item.onSelect();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(results.length ? (current + 1) % results.length : 0); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(results.length ? (current - 1 + results.length) % results.length : 0); }
    else if (e.key === "Home") { e.preventDefault(); setActive(0); }
    else if (e.key === "End") { e.preventDefault(); setActive(Math.max(results.length - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); choose(results[current]); }
  };

  return (
    <Modal
      open={open}
      onOpenChange={(v) => { if (!v) { setQuery(""); setActive(0); } onOpenChange(v); }}
      size="lg"
      aria-label={label}
      className="overflow-hidden p-0"
    >
      <div className="border-b border-snt-border-default">
        <input
          data-autofocus
          role="combobox"
          aria-expanded="true"
          aria-controls={listId}
          aria-activedescendant={results[current] ? `${id}-${results[current].id}` : undefined}
          aria-autocomplete="list"
          aria-label={label}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="h-12 w-full bg-transparent px-4 text-snt-14 text-snt-text-primary placeholder:text-snt-text-secondary focus:outline-none"
        />
      </div>

      <ul ref={listRef} id={listId} role="listbox" aria-label="Results" className="max-h-80 overflow-y-auto p-1.5">
        {results.map((item, i) => {
          const heading = item.group && item.group !== results[i - 1]?.group ? item.group : null;
          return (
            <React.Fragment key={item.id}>
              {heading && (
                <li role="presentation" className="px-2.5 pb-1 pt-2 text-snt-11 font-medium uppercase tracking-wide text-snt-text-secondary">
                  {heading}
                </li>
              )}
              <li
                id={`${id}-${item.id}`}
                role="option"
                aria-selected={i === current}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(item)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md px-2.5 py-2 text-snt-14 text-snt-text-primary [&_svg]:size-4 [&_svg]:shrink-0",
                  i === current && "bg-snt-bg-subtle",
                )}
              >
                {item.icon}
                <span className="flex-1 truncate">{item.label}</span>
                {item.hint && <span className="font-mono text-snt-12 text-snt-text-secondary">{item.hint}</span>}
              </li>
            </React.Fragment>
          );
        })}
        {results.length === 0 && (
          <li role="presentation" className="px-3 py-8 text-center text-snt-14 text-snt-text-secondary">{emptyLabel}</li>
        )}
      </ul>

      <div className="flex items-center gap-4 border-t border-snt-border-default px-4 py-2 text-snt-12 text-snt-text-secondary">
        <span><kbd className="font-mono">↑↓</kbd> navigate</span>
        <span><kbd className="font-mono">↵</kbd> select</span>
        <span><kbd className="font-mono">esc</kbd> close</span>
      </div>
      <div aria-live="polite" className="sr-only">{results.length} results</div>
    </Modal>
  );
}
