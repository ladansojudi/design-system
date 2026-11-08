"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SentinelMark } from "@/components/styleguide/logo";
import { useMobileSidebar } from "@/components/styleguide/mobile-sidebar-provider";
import { navGroups, findGroupForPath } from "@/components/styleguide/nav-data";
import type { ComponentStatus } from "@/components/styleguide/page-header";
import { version as PKG_VERSION } from "@/package.json";

const RELEASE_URL = `https://github.com/ladansojudi/design-system/releases/tag/v${PKG_VERSION}`;
const EXPANDED_KEY = "snt:sidebar-expanded-groups";

// ── Expanded-groups store (localStorage + same-tab change listeners) ──────
const expandedListeners = new Set<() => void>();
function subscribeExpanded(cb: () => void) {
  expandedListeners.add(cb);
  window.addEventListener("storage", cb);
  return () => { expandedListeners.delete(cb); window.removeEventListener("storage", cb); };
}
function readExpanded(): string | null {
  try { return localStorage.getItem(EXPANDED_KEY); } catch { return null; }
}
function parseExpanded(raw: string | null): Set<string> {
  try {
    const arr = raw ? JSON.parse(raw) : [];
    return new Set(Array.isArray(arr) ? arr.filter((v): v is string => typeof v === "string") : []);
  } catch { return new Set(); }
}
function writeExpanded(next: Set<string>) {
  try { localStorage.setItem(EXPANDED_KEY, JSON.stringify([...next])); } catch {}
  expandedListeners.forEach((l) => l());
}

// Dot + label per status, for the nav markers. `stable` is intentionally absent:
// stable items show no marker, so only the in-flux / notable ones stand out.
const STATUS_DOT: Record<Exclude<ComponentStatus, "stable">, { dot: string; label: string }> = {
  alpha:      { dot: "bg-snt-scale-yellow-500",  label: "alpha" },
  beta:       { dot: "bg-snt-brand-primary-500", label: "beta" },
  deprecated: { dot: "bg-snt-scale-red-500",     label: "deprecated" },
};

export function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useMobileSidebar();

  // Expanded groups live in localStorage (read via useSyncExternalStore, so the
  // server render and hydration agree). The active page's group is always
  // shown open unless the user collapsed it while on this page.
  const raw = useSyncExternalStore(subscribeExpanded, readExpanded, () => null);
  const stored = useMemo(() => parseExpanded(raw), [raw]);
  const activeGroup = findGroupForPath(pathname);
  const [collapsedOn, setCollapsedOn] = useState<string | null>(null);
  const expanded = useMemo(() => {
    const next = new Set(stored);
    if (activeGroup && collapsedOn !== pathname) next.add(activeGroup);
    return next;
  }, [stored, activeGroup, collapsedOn, pathname]);

  // Close mobile sidebar on navigation.
  useEffect(() => { setOpen(false); }, [pathname, setOpen]);

  const toggleGroup = (label: string) => {
    const next = new Set(stored);
    if (expanded.has(label)) {
      next.delete(label);
      if (label === activeGroup) setCollapsedOn(pathname);
    } else {
      next.add(label);
      if (label === activeGroup) setCollapsedOn(null);
    }
    writeExpanded(next);
  };

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
        />
      )}
      <aside
        className={cn(
          "flex flex-col h-full border-r border-snt-neutral-divider-10 bg-snt-neutral-grey-00",
          "fixed inset-y-0 left-0 z-40 w-[260px] transition-transform duration-200 ease-out",
          "md:static md:z-auto md:w-[230px] md:min-w-[230px] md:translate-x-0 md:transition-none",
          open ? "translate-x-0 shadow-xl" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="h-[52px] px-4 flex flex-col justify-center border-b border-snt-neutral-divider-10 shrink-0">
          <div className="flex items-center gap-2">
            <Link href="/styleguide/overview" className="flex items-center gap-1.5 text-[13px] font-semibold tracking-tight text-snt-text-primary">
              <SentinelMark size={16} />
              Sentinel
            </Link>
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noreferrer"
              title={`v${PKG_VERSION} — release notes on GitHub`}
              className="inline-flex items-center font-mono text-[9.5px] tracking-tight px-1.5 py-0.5 rounded-[3px] bg-snt-brand-primary-500/10 text-snt-brand-primary-500 hover:bg-snt-brand-primary-500/20 transition-colors"
            >
              v{PKG_VERSION}
            </a>
          </div>
          <div className="mt-0.5 text-[10.5px] text-snt-text-secondary">
            by Laden Sojudi
          </div>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 min-h-0">
          <nav className="py-1">
            {navGroups.map((group) => {
              const isOpen = expanded.has(group.label);
              return (
                <div key={group.label}>
                  <button
                    type="button"
                    onClick={() => toggleGroup(group.label)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between px-4 pt-2.5 pb-1 text-[10px] uppercase tracking-widest text-snt-text-disabled hover:text-snt-text-secondary cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {group.label}
                      {group.status && group.status !== "stable" && (
                        <span className="inline-flex items-center gap-1 normal-case tracking-normal font-normal text-[9px] text-snt-text-disabled">
                          <span className={cn("size-[5px] rounded-full", STATUS_DOT[group.status].dot)} />
                          {STATUS_DOT[group.status].label}
                        </span>
                      )}
                    </span>
                    <ChevronDown
                      size={12}
                      className={cn("transition-transform duration-150", isOpen ? "rotate-0" : "-rotate-90")}
                    />
                  </button>
                  {isOpen && group.items.map((item) => {
                    const href = `/styleguide/${item.slug}`;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={item.slug}
                        href={href}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "mx-2 flex items-center rounded-md text-[12px] px-2 py-[5px] transition-colors duration-100",
                          isActive
                            ? "bg-snt-bg-subtle text-snt-text-primary font-medium"
                            : "text-snt-text-secondary hover:text-snt-text-primary hover:bg-snt-bg-subtle",
                        )}
                      >
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.status && item.status !== "stable" && (
                          <span
                            title={STATUS_DOT[item.status].label}
                            className="ml-2 flex items-center gap-1 shrink-0"
                          >
                            <span className={cn("size-[6px] rounded-full", STATUS_DOT[item.status].dot)} />
                            <span className="text-[9px] tracking-wide text-snt-text-disabled">
                              {STATUS_DOT[item.status].label}
                            </span>
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-snt-neutral-divider-10 shrink-0 space-y-1">
          <div className="flex items-center">
            <span className="snt-pulse-dot inline-block size-[6px] rounded-full bg-snt-scale-green-500 shrink-0" />
            <span className="ml-2 text-[11px] text-snt-text-secondary">Work in progress</span>
          </div>
          <a
            href="mailto:ladansojudi2@gmail.com"
            className="block text-[10px] text-snt-text-disabled hover:text-snt-brand-primary-500 transition-colors truncate"
          >
            ladansojudi2@gmail.com
          </a>
        </div>
      </aside>
    </>
  );
}
