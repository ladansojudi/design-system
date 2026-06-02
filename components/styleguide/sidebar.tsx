"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobileSidebar } from "@/components/styleguide/mobile-sidebar-provider";
import { navGroups, findGroupForPath } from "@/components/styleguide/nav-data";
import { version as PKG_VERSION } from "@/package.json";

const RELEASE_URL = `https://github.com/ladansojudi/design-system/releases/tag/v${PKG_VERSION}`;
const EXPANDED_KEY = "s4e:sidebar-expanded-groups";

export function Sidebar() {
  const pathname = usePathname();
  const { open, setOpen } = useMobileSidebar();

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on first mount; auto-expand the active group.
  useEffect(() => {
    let next = new Set<string>();
    try {
      const raw = localStorage.getItem(EXPANDED_KEY);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) next = new Set<string>(arr.filter((v) => typeof v === "string"));
      } else {
        const activeGroup = findGroupForPath(pathname);
        if (activeGroup) next.add(activeGroup);
      }
    } catch {}
    setExpanded(next);
    setHydrated(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // When the route changes, ensure the active group is open.
  useEffect(() => {
    const activeGroup = findGroupForPath(pathname);
    if (!activeGroup) return;
    setExpanded((prev) => (prev.has(activeGroup) ? prev : new Set([...prev, activeGroup])));
  }, [pathname]);

  // Close mobile sidebar on navigation.
  useEffect(() => { setOpen(false); }, [pathname, setOpen]);

  // Persist expanded state.
  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(EXPANDED_KEY, JSON.stringify([...expanded])); } catch {}
  }, [expanded, hydrated]);

  const toggleGroup = (label: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
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
          "flex flex-col h-full border-r border-s4e-neutral-divider-10 bg-s4e-neutral-grey-00",
          "fixed inset-y-0 left-0 z-40 w-[260px] transition-transform duration-200 ease-out",
          "md:static md:z-auto md:w-[230px] md:min-w-[230px] md:translate-x-0 md:transition-none",
          open ? "translate-x-0 shadow-xl" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="h-[52px] px-4 flex flex-col justify-center border-b border-s4e-neutral-divider-10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold tracking-tight text-s4e-text-primary">
              Design System
            </span>
            <a
              href={RELEASE_URL}
              target="_blank"
              rel="noreferrer"
              title={`v${PKG_VERSION} — release notes on GitHub`}
              className="inline-flex items-center font-mono text-[9.5px] tracking-tight px-1.5 py-0.5 rounded-[3px] bg-s4e-brand-primary-500/10 text-s4e-brand-primary-500 hover:bg-s4e-brand-primary-500/20 transition-colors"
            >
              v{PKG_VERSION}
            </a>
          </div>
          <div className="mt-0.5 text-[10.5px] text-s4e-text-secondary">
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
                    className="w-full flex items-center justify-between px-4 pt-2.5 pb-1 text-[10px] uppercase tracking-widest text-s4e-text-disabled hover:text-s4e-text-secondary cursor-pointer"
                  >
                    <span>{group.label}</span>
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
                        className={cn(
                          "flex items-center w-full text-[12px] px-4 py-[4px] border-l-2 transition-colors duration-100",
                          isActive
                            ? "text-s4e-brand-primary-500 border-l-s4e-brand-primary-500 bg-s4e-surface-row-hover"
                            : "text-s4e-text-secondary border-l-transparent hover:text-s4e-text-primary hover:bg-s4e-neutral-grey-100",
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-s4e-neutral-divider-10 shrink-0 space-y-1">
          <div className="flex items-center">
            <span className="s4e-pulse-dot inline-block size-[6px] rounded-full bg-s4e-scale-green-500 shrink-0" />
            <span className="ml-2 text-[11px] text-s4e-text-secondary">Work in progress</span>
          </div>
          <a
            href="mailto:ladansojudi2@gmail.com"
            className="block text-[10px] text-s4e-text-disabled hover:text-s4e-brand-primary-500 transition-colors truncate"
          >
            ladansojudi2@gmail.com
          </a>
        </div>
      </aside>
    </>
  );
}
