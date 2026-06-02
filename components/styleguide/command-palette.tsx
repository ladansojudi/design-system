"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { navGroups } from "@/components/styleguide/nav-data";

// ── Compact Search trigger (Atlassian-style) ───────────────────────────────

export function SearchTrigger() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search"
        className={cn(
          "group inline-flex items-center gap-2 h-9 px-3 rounded-md cursor-pointer transition-colors",
          "text-s4e-text-secondary hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-s4e-brand-primary-500/30",
        )}
      >
        <Search size={15} />
        <span className="text-[14px] font-medium">Search</span>
      </button>

      {open && <CommandPaletteModal onClose={() => setOpen(false)} />}
    </>
  );
}

// ── Modal — two-column: results (scroll) + categories (jump) ──────────────

function CommandPaletteModal({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef  = useRef<HTMLDivElement>(null);
  const groupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  useEffect(() => { setMounted(true); }, []);
  useEffect(() => { inputRef.current?.focus(); }, []);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return navGroups;
    return navGroups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (i) => i.label.toLowerCase().includes(q) || i.slug.toLowerCase().includes(q),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [query]);

  const flatItems = useMemo(
    () => filtered.flatMap((g) => g.items.map((i) => ({ ...i, group: g.label }))),
    [filtered],
  );

  useEffect(() => { setActiveIndex(0); }, [query]);
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, flatItems.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = flatItems[activeIndex];
        if (item) {
          router.push(`/styleguide/${item.slug}`);
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, flatItems, onClose, router]);

  const jumpToGroup = (label: string) => {
    const el = groupRefs.current[label];
    if (!el || !listRef.current) return;
    listRef.current.scrollTo({ top: el.offsetTop - 8, behavior: "smooth" });
  };

  if (!mounted) return null;

  let runningIndex = -1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search palette"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4 bg-black/30 animate-in fade-in duration-100"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "w-full max-w-[860px] flex flex-col overflow-hidden",
          "bg-s4e-surface-app rounded-lg",
          "border border-s4e-neutral-divider-10",
          "shadow-[0_24px_60px_rgba(9,30,66,0.18),_0_4px_12px_rgba(9,30,66,0.08)]",
          "max-h-[68vh]",
        )}
      >
        {/* Input bar */}
        <div className="flex items-center gap-3 px-5 border-b border-s4e-neutral-divider-10 shrink-0">
          <Search size={18} className="text-s4e-text-secondary shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search components, foundations, patterns…"
            className="flex-1 h-14 bg-transparent text-[15px] text-s4e-text-primary placeholder:text-s4e-text-disabled focus:outline-none"
          />
          <button
            type="button"
            onClick={onClose}
            className="text-[11px] font-mono text-s4e-text-disabled px-2 py-1 rounded-[4px] border border-s4e-neutral-divider-10 hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100 transition-colors cursor-pointer shrink-0"
          >
            Esc
          </button>
        </div>

        {/* Two-column body */}
        <div className="flex flex-1 min-h-0">
          {/* Left — scrollable results */}
          <div ref={listRef} className="flex-1 min-w-0 overflow-y-auto py-2">
            {flatItems.length === 0 ? (
              <EmptyState query={query} />
            ) : (
              filtered.map((group) => (
                <div
                  key={group.label}
                  ref={(el) => { groupRefs.current[group.label] = el; }}
                  className={cn(
                    "mb-1.5 last:mb-0 transition-colors",
                    hoveredCategory === group.label && "bg-s4e-brand-primary-500/5",
                  )}
                >
                  <div className="px-5 pt-3 pb-1.5 text-[10.5px] uppercase tracking-[0.08em] text-s4e-text-disabled font-semibold">
                    {group.label}
                  </div>
                  {group.items.map((item) => {
                    runningIndex += 1;
                    const idx = runningIndex;
                    const active = idx === activeIndex;
                    return (
                      <button
                        key={item.slug}
                        type="button"
                        data-index={idx}
                        onMouseEnter={() => setActiveIndex(idx)}
                        onClick={() => { router.push(`/styleguide/${item.slug}`); onClose(); }}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 px-5 py-2 text-left cursor-pointer transition-colors duration-75",
                          active
                            ? "bg-s4e-brand-primary-500/8 text-s4e-text-primary"
                            : "text-s4e-text-secondary hover:bg-s4e-neutral-grey-100",
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={cn(
                              "inline-flex items-center justify-center w-5 h-5 rounded-[4px] shrink-0 transition-colors",
                              active
                                ? "bg-s4e-brand-primary-500/15 text-s4e-brand-primary-500"
                                : "bg-s4e-neutral-grey-100 text-s4e-text-disabled",
                            )}
                          >
                            <ArrowRight size={11} />
                          </span>
                          <span className={cn("text-[13.5px] truncate", active ? "font-medium text-s4e-text-primary" : "font-normal")}>
                            {item.label}
                          </span>
                        </div>
                        <span className="text-[10.5px] font-mono text-s4e-text-disabled truncate hidden sm:inline-block">
                          /{item.slug}
                        </span>
                        {active && <CornerDownLeft size={13} className="text-s4e-brand-primary-500 shrink-0 ml-2" />}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
          </div>

          {/* Right — categories (Atlassian-style sidebar) */}
          <div className="hidden md:flex flex-col w-[200px] shrink-0 border-l border-s4e-neutral-divider-10 bg-s4e-neutral-grey-100/40 py-3">
            <div className="px-4 pb-2 text-[10.5px] uppercase tracking-[0.08em] text-s4e-text-disabled font-semibold">
              Categories
            </div>
            <div className="flex flex-col">
              {filtered.map((group) => (
                <button
                  key={group.label}
                  type="button"
                  onClick={() => jumpToGroup(group.label)}
                  onMouseEnter={() => setHoveredCategory(group.label)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group flex items-center justify-between px-4 py-1.5 text-left cursor-pointer transition-colors hover:bg-s4e-surface-app"
                >
                  <span className="text-[12.5px] font-medium text-s4e-text-secondary group-hover:text-s4e-text-primary capitalize">
                    {group.label.toLowerCase()}
                  </span>
                  <span className="text-[11px] font-mono text-s4e-text-disabled">
                    {group.items.length}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-auto px-4 pt-3 border-t border-s4e-neutral-divider-10 mt-3">
              <div className="text-[10px] text-s4e-text-disabled">
                {flatItems.length} {flatItems.length === 1 ? "result" : "results"}
              </div>
            </div>
          </div>
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-5 py-2.5 border-t border-s4e-neutral-divider-10 bg-s4e-neutral-grey-100/50 shrink-0">
          <Hint k="↑↓" text="Navigate" />
          <Hint k="↵"  text="Open" />
          <Hint k="esc" text="Close" />
        </div>
      </div>
    </div>,
    document.body,
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="px-5 py-14 text-center">
      <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-s4e-neutral-grey-100 mb-3">
        <Search size={16} className="text-s4e-text-disabled" />
      </div>
      <p className="text-[13.5px] text-s4e-text-primary font-medium">
        No matches for &ldquo;{query}&rdquo;
      </p>
      <p className="mt-1 text-[12px] text-s4e-text-disabled">
        Try a different keyword or browse the sidebar.
      </p>
    </div>
  );
}

function Hint({ k, text }: { k: string; text: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[10.5px] text-s4e-text-disabled">
      <kbd className="font-mono px-1.5 py-[1px] rounded-[3px] border border-s4e-neutral-divider-10 bg-s4e-surface-app text-[10px] min-w-[18px] text-center">
        {k}
      </kbd>
      {text}
    </span>
  );
}
