"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMobileSidebar } from "@/components/styleguide/mobile-sidebar-provider";
import { sections, sectionForPath } from "@/components/styleguide/nav-data";
import type { ComponentStatus } from "@/components/styleguide/page-header";
import { version as PKG_VERSION } from "@/package.json";

const RELEASE_URL = `https://github.com/ladansojudi/design-system/releases/tag/v${PKG_VERSION}`;

// Stable items show no marker, so only the in-flux ones stand out.
const STATUS: Record<Exclude<ComponentStatus, "stable">, string> = {
  alpha:      "bg-snt-scale-yellow-500",
  beta:       "bg-snt-brand-primary-500",
  deprecated: "bg-snt-scale-red-500",
};

/**
 * Section navigation. On desktop it lists the groups of the section you're in
 * (the header switches sections). On mobile it is a drawer that also carries
 * the section links, since the header nav is hidden there. `mobileOnly` is for
 * pages without a sidebar (the home page), which still need the drawer.
 */
export function Sidebar({ mobileOnly = false }: { mobileOnly?: boolean }) {
  const pathname = usePathname();
  const { open, setOpen } = useMobileSidebar();
  const section = sectionForPath(pathname);

  // Close the mobile drawer on navigation.
  useEffect(() => { setOpen(false); }, [pathname, setOpen]);

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="fixed inset-0 top-14 z-30 bg-black/40 md:hidden"
        />
      )}
      <aside
        aria-label="Section navigation"
        className={cn(
          "flex flex-col border-r border-snt-border-default bg-snt-surface-app",
          "fixed bottom-0 left-0 top-14 z-40 w-[272px] transition-transform duration-200 ease-out",
          open ? "translate-x-0 shadow-snt-xl" : "-translate-x-full",
          mobileOnly
            ? "md:hidden"
            : "md:static md:z-auto md:w-[248px] md:min-w-[248px] md:translate-x-0 md:transition-none md:shadow-none",
        )}
      >
        <ScrollArea className="flex-1 min-h-0">
          {/* Sections — mobile only; on desktop they live in the header. */}
          <nav aria-label="Sections" className="border-b border-snt-border-default px-3 py-3 md:hidden">
            <ul className="space-y-0.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link
                    href={s.href}
                    aria-current={s.id === section?.id ? "true" : undefined}
                    className={cn(
                      "block rounded-md px-3 py-2 text-snt-14 font-medium",
                      s.id === section?.id ? "bg-snt-bg-subtle text-snt-text-primary" : "text-snt-text-secondary hover:bg-snt-bg-subtle hover:text-snt-text-primary",
                    )}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {section && (
            <nav aria-label={section.label} className="px-3 py-5">
              {section.groups.map((group) => (
                <div key={group.label} className="mb-6 last:mb-0">
                  <h2 className="mb-1.5 flex items-center gap-2 px-3 text-snt-12 font-semibold text-snt-text-primary">
                    {group.label}
                    {group.status && group.status !== "stable" && (
                      <span className="text-snt-11 font-normal text-snt-text-secondary">{group.status}</span>
                    )}
                  </h2>
                  <ul className="space-y-px">
                    {group.items.map((item) => {
                      const href = `/styleguide/${item.slug}`;
                      const isActive = pathname === href;
                      return (
                        <li key={item.slug}>
                          <Link
                            href={href}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                              "flex items-center rounded-md px-3 py-1.5 text-snt-14 transition-colors",
                              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-snt-focus-ring",
                              isActive
                                ? "bg-snt-bg-subtle font-medium text-snt-text-primary"
                                : "text-snt-text-secondary hover:bg-snt-bg-subtle hover:text-snt-text-primary",
                            )}
                          >
                            <span className="flex-1 truncate">{item.label}</span>
                            {item.status && item.status !== "stable" && (
                              <span className="ml-2 flex shrink-0 items-center gap-1.5 text-snt-11 text-snt-text-secondary">
                                <span aria-hidden className={cn("size-1.5 rounded-full", STATUS[item.status])} />
                                {item.status}
                              </span>
                            )}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </nav>
          )}
        </ScrollArea>

        <div className="shrink-0 border-t border-snt-border-default px-6 py-3 text-snt-12 text-snt-text-secondary">
          <a href={RELEASE_URL} target="_blank" rel="noreferrer" className="font-mono hover:text-snt-text-primary">
            v{PKG_VERSION}
          </a>
          <span aria-hidden> · </span>
          by Laden Sojudi
        </div>
      </aside>
    </>
  );
}
